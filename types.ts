// FIX: Replaced anonymous type with a named interface `AIStudio` for `window.aistudio`
// to resolve conflicting global declarations, as indicated by the compiler error.
declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
    getApiKey: () => Promise<string>;
  }
  interface Window {
    // FIX: Made `aistudio` optional to resolve conflicting global declarations.
    aistudio?: AIStudio;
  }
}

export enum MessageAuthor {
  USER = 'user',
  AI = 'ai',
}

export type ChatMessage = {
  author: MessageAuthor;
  text?: string;
  image?: string; // base64 string
};

export interface Project {
  id: string;
  name: string;
  imageData: string;
  mimeType: string;
  createdAt: number;
}