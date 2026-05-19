import express from 'express';
import { generateImage } from '../services/gptImageService.js';
import { generateVideo } from '../services/doubaoVideoService.js';

const router = express.Router();

router.post('/image', async (req: express.Request, res: express.Response) => {
  try {
    const { prompt, size, style, apiUrl, apiKey } = req.body;

    if (!prompt || !apiUrl || !apiKey) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: prompt, apiUrl, and apiKey are required'
      });
    }

    const result = await generateImage({ prompt, size, style, apiUrl, apiKey });
    res.json(result);
  } catch (error: any) {
    console.error('Image generation route error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

router.post('/video', async (req: express.Request, res: express.Response) => {
  try {
    const { imageUrl, apiUrl, apiKey, duration } = req.body;

    if (!imageUrl || !apiUrl || !apiKey) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: imageUrl, apiUrl, and apiKey are required'
      });
    }

    const result = await generateVideo({ imageUrl, apiUrl, apiKey, duration });
    res.json(result);
  } catch (error: any) {
    console.error('Video generation route error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

export default router;
