import { useAppStore } from '../store/useAppStore';
import axios from 'axios';

export function useGeneration() {
  const store = useAppStore();

  const generateImage = async () => {
    try {
      store.setCurrentStep('image');
      store.setIsGeneratingImage(true);
      store.setErrorMessage(null);

      const response = await axios.post('/api/generate/image', {
        prompt: store.prompt,
        size: store.imageSize,
        style: store.imageStyle,
        apiUrl: store.gptApiUrl,
        apiKey: store.gptApiKey
      });

      if (response.data.success && response.data.imageUrl) {
        store.setGeneratedImageUrl(response.data.imageUrl);
        return response.data.imageUrl;
      } else {
        throw new Error(response.data.error || 'Failed to generate image');
      }
    } catch (error: any) {
      const errorMsg = error.response?.data?.error || error.message || 'Failed to generate image';
      store.setErrorMessage(errorMsg);
      store.setCurrentStep('error');
      throw error;
    } finally {
      store.setIsGeneratingImage(false);
    }
  };

  const generateVideo = async (imageUrl: string) => {
    try {
      store.setCurrentStep('video');
      store.setIsGeneratingVideo(true);

      const response = await axios.post('/api/generate/video', {
        imageUrl,
        apiUrl: store.doubaoApiUrl,
        apiKey: store.doubaoApiKey,
        duration: store.videoDuration
      });

      if (response.data.success && response.data.videoUrl) {
        store.setGeneratedVideoUrl(response.data.videoUrl);
        store.setCurrentStep('complete');
        return response.data.videoUrl;
      } else {
        throw new Error(response.data.error || 'Failed to generate video');
      }
    } catch (error: any) {
      const errorMsg = error.response?.data?.error || error.message || 'Failed to generate video';
      store.setErrorMessage(errorMsg);
      store.setCurrentStep('error');
      throw error;
    } finally {
      store.setIsGeneratingVideo(false);
    }
  };

  const startGeneration = async () => {
    try {
      store.resetResults();
      
      if (!store.prompt.trim()) {
        store.setErrorMessage('Please enter a prompt');
        store.setCurrentStep('error');
        return;
      }
      
      if (!store.gptApiUrl || !store.gptApiKey) {
        store.setErrorMessage('Please configure GPT image API');
        store.setCurrentStep('error');
        return;
      }
      
      if (!store.doubaoApiUrl || !store.doubaoApiKey) {
        store.setErrorMessage('Please configure Doubao video API');
        store.setCurrentStep('error');
        return;
      }

      const imageUrl = await generateImage();
      await generateVideo(imageUrl);
    } catch (error) {
      console.error('Generation failed:', error);
    }
  };

  return {
    generateImage,
    generateVideo,
    startGeneration
  };
}
