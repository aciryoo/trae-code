import axios from 'axios';

interface GenerateVideoRequest {
  imageUrl: string;
  apiUrl: string;
  apiKey: string;
  duration?: number;
}

interface GenerateVideoResponse {
  success: boolean;
  videoUrl?: string;
  error?: string;
}

export async function generateVideo(request: GenerateVideoRequest): Promise<GenerateVideoResponse> {
  try {
    const response = await axios.post(
      request.apiUrl,
      {
        image: request.imageUrl,
        duration: request.duration || 5
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${request.apiKey}`
        },
        timeout: 120000
      }
    );

    if (response.data) {
      let videoUrl = response.data.video_url || response.data.videoUrl || response.data.url;
      if (!videoUrl && response.data.data) {
        videoUrl = response.data.data.video_url || response.data.data.videoUrl || response.data.data.url;
      }
      
      if (videoUrl) {
        return {
          success: true,
          videoUrl: videoUrl
        };
      }
    }

    return {
      success: false,
      error: 'Invalid response from video generation service'
    };
  } catch (error: any) {
    console.error('Video generation error:', error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data?.error?.message || error.message || 'Failed to generate video'
    };
  }
}
