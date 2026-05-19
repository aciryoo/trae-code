import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  gptApiUrl: string;
  gptApiKey: string;
  doubaoApiUrl: string;
  doubaoApiKey: string;
  prompt: string;
  imageSize: string;
  imageStyle: string;
  videoDuration: number;
  generatedImageUrl: string | null;
  generatedVideoUrl: string | null;
  isGeneratingImage: boolean;
  isGeneratingVideo: boolean;
  currentStep: 'idle' | 'image' | 'video' | 'complete' | 'error';
  errorMessage: string | null;
  setGptApiUrl: (url: string) => void;
  setGptApiKey: (key: string) => void;
  setDoubaoApiUrl: (url: string) => void;
  setDoubaoApiKey: (key: string) => void;
  setPrompt: (prompt: string) => void;
  setImageSize: (size: string) => void;
  setImageStyle: (style: string) => void;
  setVideoDuration: (duration: number) => void;
  setGeneratedImageUrl: (url: string | null) => void;
  setGeneratedVideoUrl: (url: string | null) => void;
  setIsGeneratingImage: (isGenerating: boolean) => void;
  setIsGeneratingVideo: (isGenerating: boolean) => void;
  setCurrentStep: (step: 'idle' | 'image' | 'video' | 'complete' | 'error') => void;
  setErrorMessage: (message: string | null) => void;
  resetResults: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      gptApiUrl: '',
      gptApiKey: '',
      doubaoApiUrl: '',
      doubaoApiKey: '',
      prompt: '',
      imageSize: '1024x1024',
      imageStyle: 'vivid',
      videoDuration: 5,
      generatedImageUrl: null,
      generatedVideoUrl: null,
      isGeneratingImage: false,
      isGeneratingVideo: false,
      currentStep: 'idle',
      errorMessage: null,
      setGptApiUrl: (url) => set({ gptApiUrl: url }),
      setGptApiKey: (key) => set({ gptApiKey: key }),
      setDoubaoApiUrl: (url) => set({ doubaoApiUrl: url }),
      setDoubaoApiKey: (key) => set({ doubaoApiKey: key }),
      setPrompt: (prompt) => set({ prompt }),
      setImageSize: (size) => set({ imageSize: size }),
      setImageStyle: (style) => set({ imageStyle: style }),
      setVideoDuration: (duration) => set({ videoDuration: duration }),
      setGeneratedImageUrl: (url) => set({ generatedImageUrl: url }),
      setGeneratedVideoUrl: (url) => set({ generatedVideoUrl: url }),
      setIsGeneratingImage: (isGenerating) => set({ isGeneratingImage: isGenerating }),
      setIsGeneratingVideo: (isGenerating) => set({ isGeneratingVideo: isGenerating }),
      setCurrentStep: (step) => set({ currentStep: step }),
      setErrorMessage: (message) => set({ errorMessage: message }),
      resetResults: () => set({
        generatedImageUrl: null,
        generatedVideoUrl: null,
        currentStep: 'idle',
        errorMessage: null
      })
    }),
    {
      name: 'app-storage',
      partialize: (state) => ({
        gptApiUrl: state.gptApiUrl,
        gptApiKey: state.gptApiKey,
        doubaoApiUrl: state.doubaoApiUrl,
        doubaoApiKey: state.doubaoApiKey
      })
    }
  )
);
