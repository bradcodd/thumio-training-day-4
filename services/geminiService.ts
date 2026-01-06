
import { GoogleGenAI } from "@google/genai";

const getGoogleGenAI = async () => {
  let API_KEY: string | undefined;

  // First, try to get API key from AI Studio environment
  if (window.aistudio) {
    try {
      API_KEY = await window.aistudio.getApiKey();
    } catch (error) {
      console.warn("Failed to get API key from AI Studio:", error);
    }
  }

  // Fall back to environment variable for local development
  if (!API_KEY) {
    API_KEY = process.env.GEMINI_API_KEY;
  }

  if (!API_KEY) {
    if (window.aistudio) {
      throw new Error("API key not available. Please select an API key using the AI Studio interface.");
    } else {
      throw new Error("API_KEY environment variable not set. Please set GEMINI_API_KEY in your .env file.");
    }
  }

  return new GoogleGenAI({ apiKey: API_KEY });
};

const SYSTEM_INSTRUCTION = "You are a professional YouTube thumbnail editor. Your goal is to make dramatic and eye-catching edits based on user requests. All image outputs must be in a 16:9 aspect ratio. Focus on vibrant colors, high contrast, and clear subjects suitable for YouTube thumbnails. Respond only with the edited image, no extra text.";

export const editImage = async (prompt: string, imageBase64: string, mimeType: string): Promise<{ newImageBase64: string; newMimeType: string }> => {
  try {
    const ai = await getGoogleGenAI();
    //const model = 'gemini-2.5-flash-image';
    const model = 'gemini-2.5-flash-image';
    const imagePart = {
      inlineData: {
        data: imageBase64.split(',')[1], // remove the data:mime/type;base64, part
        mimeType: mimeType,
      },
    };

    const textPart = {
      text: prompt,
    };

    const response = await ai.models.generateContent({
      model: model,
      contents: { parts: [imagePart, textPart] },
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        imageConfig: {
          aspectRatio: "16:9",
        }
      }
    });

    if (!response.candidates || response.candidates.length === 0 || !response.candidates[0].content.parts) {
      throw new Error("Invalid response structure from Gemini API.");
    }

    const imageOutputPart = response.candidates[0].content.parts.find(part => part.inlineData);

    if (!imageOutputPart || !imageOutputPart.inlineData) {
      throw new Error("No image data found in the Gemini API response.");
    }

    const newMimeType = imageOutputPart.inlineData.mimeType;
    const newImageData = imageOutputPart.inlineData.data;

    return {
      newImageBase64: `data:${newMimeType};base64,${newImageData}`,
      newMimeType: newMimeType
    };

  } catch (error) {
    console.error("Error editing image with Gemini:", error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to communicate with the AI model.");
  }
};
