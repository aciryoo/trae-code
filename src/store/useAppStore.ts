import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  timestamp: number;
}

interface AppState {
  // API 配置
  gptApiUrl: string;
  gptApiKey: string;
  doubaoApiUrl: string;
  doubaoApiKey: string;
  
  // 图片生成相关
  imagePrompt: string;
  imageSize: string;
  imageStyle: string;
  generatedImages: GeneratedImage[];
  isGeneratingImage: boolean;
  imageError: string | null;
  
  // 视频生成相关
  selectedImage: string | null;
  videoDuration: number;
  isGeneratingVideo: boolean;
  generatedVideoUrl: string | null;
  videoError: string | null;
  
  // Actions
  setGptApiUrl: (url: string) => void;
  setGptApiKey: (key: string) => void;
  setDoubaoApiUrl: (url: string) => void;
  setDoubaoApiKey: (key: string) => void;
  setImagePrompt: (prompt: string) => void;
  setImageSize: (size: string) => void;
  setImageStyle: (style: string) => void;
  setSelectedImage: (url: string | null) => void;
  setVideoDuration: (duration: number) => void;
  setIsGeneratingImage: (isGenerating: boolean) => void;
  setIsGeneratingVideo: (isGenerating: boolean) => void;
  setImageError: (error: string | null) => void;
  setVideoError: (error: string | null) => void;
  setGeneratedVideoUrl: (url: string | null) => void;
  addGeneratedImage: (url: string, prompt: string) => void;
  clearGeneratedImages: () => void;
  resetVideoGeneration: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      gptApiUrl: '',
      gptApiKey: '',
      doubaoApiUrl: '',
      doubaoApiKey: '',
      imagePrompt: '',
      imageSize: '1024x1024',
      imageStyle: 'vivid',
      generatedImages: [],
      isGeneratingImage: false,
      imageError: null,
      selectedImage: null,
      videoDuration: 5,
      isGeneratingVideo: false,
      generatedVideoUrl: null,
      videoError: null,
      
      setGptApiUrl: (url) => set({ gptApiUrl: url }),
      setGptApiKey: (key) => set({ gptApiKey: key }),
      setDoubaoApiUrl: (url) => set({ doubaoApiUrl: url }),
      setDoubaoApiKey: (key) => set({ doubaoApiKey: key }),
      setImagePrompt: (prompt) => set({ imagePrompt: prompt }),
      setImageSize: (size) => set({ imageSize: size }),
      setImageStyle: (style) => set({ imageStyle: style }),
      setSelectedImage: (url) => set({ selectedImage: url }),
      setVideoDuration: (duration) => set({ videoDuration: duration }),
      setIsGeneratingImage: (isGenerating) => set({ isGeneratingImage: isGenerating }),
      setIsGeneratingVideo: (isGenerating) => set({ isGeneratingVideo: isGenerating }),
      setImageError: (error) => set({ imageError: error }),
      setVideoError: (error) => set({ videoError: error }),
      setGeneratedVideoUrl: (url) => set({ generatedVideoUrl: url }),
      
      addGeneratedImage: (url, prompt) => set((state) => ({
        generatedImages: [
          {
            id: Date.now().toString(),
            url,
            prompt,
            timestamp: Date.now()
          },
          ...state.generatedImages
        ]
      })),
      
      clearGeneratedImages: () => set({ generatedImages: [] }),
      
      resetVideoGeneration: () => set({
        generatedVideoUrl: null,
        videoError: null,
        isGeneratingVideo: false
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
