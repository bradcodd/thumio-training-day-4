
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { ChatMessage, MessageAuthor, Project } from '../../types';
import { editImage } from '../../services/geminiService';
import { fileToBase64 } from '../../utils/fileUtils';
import { getCroppedImg } from '../../utils/canvasUtils';
import { loadProjects, saveProjects } from '../../services/projectService';
import ChatInterface from '../../components/studio/ChatInterface';
import ImagePreview from '../../components/studio/ImagePreview';
import ProjectsView from '../../components/studio/ProjectsView';
import Header from '../../components/studio/Header';
import TextOverlayModal from '../../components/studio/TextOverlayModal';
import AdjustmentsModal from '../../components/studio/AdjustmentsModal';
import FiltersModal from '../../components/studio/FiltersModal';
import DownloadModal from '../../components/studio/DownloadModal';
import ApiKeySelectionView from '../../components/studio/ApiKeySelectionView';
import FeedbackModal from '../../components/studio/FeedbackModal';
import { Crop, PixelCrop } from 'react-image-crop';

interface ImageState {
  image: string;
  mimeType: string;
}

const StudioPage: React.FC = () => {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      author: MessageAuthor.AI,
      text: "Welcome! To get started, please upload an image on the left.",
    },
  ]);
  const [imageHistory, setImageHistory] = useState<ImageState[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isTextModalOpen, setIsTextModalOpen] = useState<boolean>(false);
  const [isAdjustmentsModalOpen, setIsAdjustmentsModalOpen] = useState<boolean>(false);
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState<boolean>(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState<boolean>(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState<boolean>(false);
  const [isCropping, setIsCropping] = useState<boolean>(false);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [showGrid, setShowGrid] = useState<boolean>(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const [isKeySelected, setIsKeySelected] = useState<boolean>(false);
  const [checkingKey, setCheckingKey] = useState<boolean>(true);

  useEffect(() => {
    const checkKey = async () => {
      // Check if API key is available from environment variable (env)
      const hasEnvKey = process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.length > 0;
      
      // Check if API key is available from AI Studio
      const hasStudioKey = window.aistudio && await window.aistudio.hasSelectedApiKey();
      
      // If either source has a key, bypass the selection dialog
      if (hasEnvKey || hasStudioKey) {
        setIsKeySelected(true);
      }
      setCheckingKey(false);
    };
    checkKey();
  }, []);

  const dummyUser = { name: "brad" };

  useEffect(() => {
    setProjects(loadProjects());
  }, []);

  const currentImageState = imageHistory[historyIndex];
  const currentImage = currentImageState?.image || null;

  const imageMimeType = currentImageState?.mimeType || null;

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < imageHistory.length - 1;

  const handleImageUpload = useCallback(async (file: File) => {
    setIsLoading(true);
    setError(null);
    setCurrentProjectId(null);
    try {
      const base64String = await fileToBase64(file);
      setImageHistory([{ image: base64String, mimeType: file.type }]);
      setHistoryIndex(0);
      setChatHistory(prev => [
        ...prev,
        {
          author: MessageAuthor.AI,
          text: "Great! Your image is loaded. What's the first change you'd like to make?",
        },
      ]);
      // FIX: Added curly braces to the catch block to fix syntax error.
    } catch (err) {
      setError('Failed to upload image. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSendMessage = useCallback(async (text: string, isQuickAction: boolean = false) => {
    if (!text.trim() || !currentImage || !imageMimeType) return;

    if (!isQuickAction) {
      const userMessage: ChatMessage = { author: MessageAuthor.USER, text };
      setChatHistory(prev => [...prev, userMessage]);
    }

    setIsLoading(true);
    setError(null);

    try {
      const { newImageBase64, newMimeType } = await editImage(text, currentImage, imageMimeType);

      const newHistory = imageHistory.slice(0, historyIndex + 1);
      newHistory.push({ image: newImageBase64, mimeType: newMimeType });

      setImageHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);

      let aiResponseText = "Here's the updated image. What's next?";
      if (text.toLowerCase().includes("blur the background")) {
        aiResponseText = "I've blurred the background to make the subject stand out. How does it look?";
      } else if (text.toLowerCase().includes("outer glow")) {
        aiResponseText = "I've added an outer glow to the subject. Does it pop more now?";
      } else if (text.toLowerCase().includes("vignette effect")) {
        aiResponseText = "I've added a vignette to focus attention on the center. What's next?";
      } else if (text.includes("Apply a smart crop")) {
        aiResponseText = "I've applied a smart crop to improve the composition. How does this look?";
      } else if (text.includes("advanced, high-quality background removal")) {
        aiResponseText = "I've performed a high-precision background removal. Check out the clean edges!";
      }



      const aiMessage: ChatMessage = {
        author: MessageAuthor.AI,
        text: aiResponseText,
        image: newImageBase64,
      };
      setChatHistory(prev => [...prev, aiMessage]);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      if (errorMessage.includes('Requested entity was not found.')) {
        setError('Your selected API key is invalid. Please select a valid key to continue.');
        setChatHistory(prev => [...prev, { author: MessageAuthor.AI, text: 'Your selected API key is invalid. Please select a new one.' }]);
        setIsKeySelected(false);
      } else {
        setError(`Failed to edit image: ${errorMessage}`);
        const aiErrorMessage: ChatMessage = {
          author: MessageAuthor.AI,
          text: `Sorry, I couldn't process that request. Please try a different prompt. Error: ${errorMessage}`,
        };
        setChatHistory(prev => [...prev, aiErrorMessage]);
      }
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [currentImage, imageMimeType, imageHistory, historyIndex]);

  const handleAddText = useCallback((prompt: string) => {
    handleSendMessage(prompt);
    setIsTextModalOpen(false);
  }, [handleSendMessage]);

  const handleApplyAdjustments = useCallback((prompt: string) => {
    handleSendMessage(prompt);
    setIsAdjustmentsModalOpen(false);
  }, [handleSendMessage]);

  const handleApplyFilter = useCallback((prompt: string) => {
    handleSendMessage(prompt, true);
    setIsFiltersModalOpen(false);
  }, [handleSendMessage]);

  const handleSmartCrop = useCallback(() => {
    const prompt = "Analyze the image, identify the main subject, and apply a smart crop that follows the rule of thirds, resulting in a compelling 16:9 thumbnail. The final image should be the cropped version of the original.";
    handleSendMessage(prompt, true);
  }, [handleSendMessage]);

  const handleApplyCrop = useCallback(async () => {
    if (!completedCrop || !imgRef.current || !imageMimeType) return;

    try {
      const croppedImageBase64 = await getCroppedImg(imgRef.current, completedCrop, imageMimeType);

      const newHistory = imageHistory.slice(0, historyIndex + 1);
      newHistory.push({ image: croppedImageBase64, mimeType: imageMimeType });

      setImageHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);

      const aiMessage: ChatMessage = {
        author: MessageAuthor.AI,
        text: "I've cropped the image. What would you like to do next?",
      };
      setChatHistory(prev => [...prev, aiMessage]);

    } catch (e) {
      console.error(e);
      setError("Failed to crop the image.");
    } finally {
      setIsCropping(false);
      setCrop(undefined);
      setCompletedCrop(undefined);
    }
  }, [completedCrop, imageMimeType, imageHistory, historyIndex]);

  const handleDownloadSubmit = useCallback(async (filename: string, format: 'png' | 'jpeg', quality: number) => {
    if (!currentImage) return;

    const downloadFilename = `${filename.trim()}.${format === 'jpeg' ? 'jpg' : 'png'}`;

    try {
      const image = new Image();
      await new Promise<void>((resolve, reject) => {
        image.onload = () => resolve();
        image.onerror = (err) => reject(err);
        image.src = currentImage;
      });

      const canvas = document.createElement('canvas');
      canvas.width = 1920; // 1080p width
      canvas.height = 1080; // 1080p height
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        throw new Error("Could not get canvas context for image resizing.");
      }
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

      const mimeType = format === 'jpeg' ? 'image/jpeg' : 'image/png';
      const imageQuality = format === 'jpeg' ? quality / 100 : undefined;
      const downloadUrl = canvas.toDataURL(mimeType, imageQuality);

      // --- Start Download ---
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = downloadFilename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsDownloadModalOpen(false);
      // --- End Download ---

      // --- Save/Update Project (uses original `currentImage`) ---
      if (currentProjectId) {
        setProjects(prevProjects => {
          const updatedProjects = prevProjects.map(p =>
            p.id === currentProjectId
              ? { ...p, name: filename, imageData: currentImage, mimeType: imageMimeType! }
              : p
          );
          saveProjects(updatedProjects);
          return updatedProjects;
        });
      } else {
        const newProject: Project = {
          id: `${Date.now()}-${Math.random()}`,
          name: filename,
          imageData: currentImage,
          mimeType: imageMimeType!,
          createdAt: Date.now()
        };
        setProjects(prev => {
          const updatedProjects = [newProject, ...prev];
          saveProjects(updatedProjects);
          return updatedProjects;
        });
        setCurrentProjectId(newProject.id);
      }
    } catch (err) {
      console.error("Failed to process image for download:", err);
      setError("Failed to process image for download. Please try again.");
      setIsDownloadModalOpen(false);
    }
  }, [currentImage, imageMimeType, currentProjectId]);

  const handleReset = () => {
    setChatHistory([
      {
        author: MessageAuthor.AI,
        text: "Welcome! To get started, please upload an image on the left.",
      },
    ]);
    setImageHistory([]);
    setHistoryIndex(-1);
    setIsLoading(false);
    setError(null);
    setCurrentProjectId(null);
  };

  const handleUndo = useCallback(() => {
    if (canUndo) {
      setHistoryIndex(prev => prev - 1);
    }
  }, [canUndo]);

  const handleRedo = useCallback(() => {
    if (canRedo) {
      setHistoryIndex(prev => prev + 1);
    }
  }, [canRedo]);

  const handleLoadProject = (project: Project) => {
    const imageState = { image: project.imageData, mimeType: project.mimeType };
    setImageHistory([imageState]);
    setHistoryIndex(0);
    setCurrentProjectId(project.id);
    setChatHistory([
      {
        author: MessageAuthor.AI,
        text: `Loaded project "${project.name}". What would you like to do?`,
      },
    ]);
  };

  const handleUpdateProject = (updatedProject: Project) => {
    setProjects(prev => {
      const updatedProjects = prev.map(p => p.id === updatedProject.id ? updatedProject : p);
      saveProjects(updatedProjects);
      return updatedProjects;
    });
  };

  const handleDeleteProject = (projectId: string) => {
    const updatedProjects = projects.filter(p => p.id !== projectId);
    setProjects(updatedProjects);
    saveProjects(updatedProjects);
  };

  const handleToggleGrid = () => {
    setShowGrid(prev => !prev);
  };

  const handleToggleCrop = () => {
    setIsCropping(prev => !prev);
  }

  const handleFeedbackSubmit = useCallback((feedbackData: any) => {
    console.log("Feedback Submitted:", feedbackData);
    setChatHistory(prev => [
      ...prev,
      {
        author: MessageAuthor.AI,
        text: "Thanks for your feedback! We've received it.",
      },
    ]);
    setIsFeedbackModalOpen(false);
  }, []);

  if (checkingKey) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-black text-slate-300">
        <p>Initializing...</p>
      </div>
    );
  }

  if (!isKeySelected) {
    return <ApiKeySelectionView onKeySelected={() => setIsKeySelected(true)} />;
  }

  return (
    <div className="flex flex-col h-screen font-sans bg-black text-slate-200">
      <Header onReset={handleReset} hasImage={!!currentImage} />
      <main className="flex-grow flex flex-col md:flex-row overflow-hidden">
        <div className="w-full md:w-1/2 lg:w-2/3 flex-grow flex items-center justify-center p-0 bg-black h-1/2 md:h-full">
          {!currentImage ? (
            <ProjectsView
              projects={projects}
              onImageUpload={handleImageUpload}
              onLoadProject={handleLoadProject}
              onUpdateProject={handleUpdateProject}
              onDeleteProject={handleDeleteProject}
              isLoading={isLoading}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center p-4 md:p-8">
              <ImagePreview
                imgRef={imgRef}
                imageUrl={currentImage}
                isLoading={isLoading}
                onUndo={handleUndo}
                onRedo={handleRedo}
                canUndo={canUndo}
                canRedo={canRedo}
                onOpenAdjustments={() => setIsAdjustmentsModalOpen(true)}
                onDownloadRequest={() => setIsDownloadModalOpen(true)}
                isCropping={isCropping}
                onToggleCrop={handleToggleCrop}
                onSmartCrop={handleSmartCrop}
                crop={crop}
                onCropChange={setCrop}
                onCropComplete={setCompletedCrop}
                onApplyCrop={handleApplyCrop}
                showGrid={showGrid}
                onToggleGrid={handleToggleGrid}
                onOpenFeedback={() => setIsFeedbackModalOpen(true)}
              />
            </div>
          )}
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 flex flex-col h-1/2 md:h-full bg-gray-950 border-l border-gray-800">
          <ChatInterface
            messages={chatHistory}
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            isImageUploaded={!!currentImage}
            onAddTextRequest={() => setIsTextModalOpen(true)}
            onOpenFiltersRequest={() => setIsFiltersModalOpen(true)}
          />
        </div>
      </main>
      {error && (
        <div className="absolute bottom-4 right-4 bg-red-500 text-white p-3 rounded-lg shadow-lg">
          {error}
        </div>
      )}
      <TextOverlayModal
        isOpen={isTextModalOpen}
        onClose={() => setIsTextModalOpen(false)}
        onSubmit={handleAddText}
      />
      <AdjustmentsModal
        isOpen={isAdjustmentsModalOpen}
        onClose={() => setIsAdjustmentsModalOpen(false)}
        onSubmit={handleApplyAdjustments}
      />
      <FiltersModal
        isOpen={isFiltersModalOpen}
        onClose={() => setIsFiltersModalOpen(false)}
        onSubmit={handleApplyFilter}
        imageUrl={currentImage}
      />
      <DownloadModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
        onSubmit={handleDownloadSubmit}
        username={dummyUser.name}
      />
      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
        onSubmit={handleFeedbackSubmit}
      />
    </div>
  );
};

export default StudioPage;
