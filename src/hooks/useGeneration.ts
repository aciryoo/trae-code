import { useAppStore } from '../store/useAppStore';
import axios from 'axios';

export function useGeneration() {
  const store = useAppStore();

  const generateImage = async () => {
    try {
      store.setIsGeneratingImage(true);
      store.setImageError(null);

      const response = await axios.post('/api/generate/image', {
        prompt: store.imagePrompt,
        size: store.imageSize,
        style: store.imageStyle,
        apiUrl: store.gptApiUrl,
        apiKey: store.gptApiKey
      });

      if (response.data.success && response.data.imageUrl) {
        store.addGeneratedImage(response.data.imageUrl, store.imagePrompt);
        return response.data.imageUrl;
      } else {
        throw new Error(response.data.error || 'Failed to generate image');
      }
    } catch (error: any) {
      const errorMsg = error.response?.data?.error || error.message || 'Failed to generate image';
      store.setImageError(errorMsg);
      throw error;
    } finally {
      store.setIsGeneratingImage(false);
    }
  };

  const generateVideo = async () => {
    if (!store.selectedImage) {
      store.setVideoError('请先选择一张图片');
      return;
    }

    try {
      store.setIsGeneratingVideo(true);
      store.setVideoError(null);

      const response = await axios.post('/api/generate/video', {
        imageUrl: store.selectedImage,
        apiUrl: store.doubaoApiUrl,
        apiKey: store.doubaoApiKey,
        duration: store.videoDuration
      });

      if (response.data.success && response.data.videoUrl) {
        store.setGeneratedVideoUrl(response.data.videoUrl);
        return response.data.videoUrl;
      } else {
        throw new Error(response.data.error || 'Failed to generate video');
      }
    } catch (error: any) {
      const errorMsg = error.response?.data?.error || error.message || 'Failed to generate video';
      store.setVideoError(errorMsg);
      throw error;
    } finally {
      store.setIsGeneratingVideo(false);
    }
  };

  return {
    generateImage,
    generateVideo
  };
}
