import axios from 'axios';

interface GenerateImageRequest {
  prompt: string;
  size?: string;
  style?: string;
  apiUrl: string;
  apiKey: string;
}

interface GenerateImageResponse {
  success: boolean;
  imageUrl?: string;
  error?: string;
}

export async function generateImage(request: GenerateImageRequest): Promise<GenerateImageResponse> {
  try {
    const response = await axios.post(
      request.apiUrl,
      {
        prompt: request.prompt,
        size: request.size || '1024x1024',
        style: request.style || 'vivid',
        n: 1
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${request.apiKey}`
        },
        timeout: 60000
      }
    );

    if (response.data && response.data.data && response.data.data.length > 0) {
      return {
        success: true,
        imageUrl: response.data.data[0].url || response.data.data[0].b64_json
      };
    }

    return {
      success: false,
      error: 'Invalid response from image generation service'
    };
  } catch (error: any) {
    console.error('Image generation error:', error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data?.error?.message || error.message || 'Failed to generate image'
    };
  }
}
