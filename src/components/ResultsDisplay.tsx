import React from 'react';
import { useAppStore } from '../store/useAppStore';
import { Download, Image, Video } from 'lucide-react';

export default function ResultsDisplay() {
  const {
    generatedImageUrl,
    generatedVideoUrl
  } = useAppStore();

  const handleDownload = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!generatedImageUrl && !generatedVideoUrl) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 mb-6">生成结果</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {generatedImageUrl && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Image className="w-5 h-5 text-blue-500" />
                <h3 className="font-semibold text-gray-700">生成的图像</h3>
              </div>
              <button
                onClick={() => handleDownload(generatedImageUrl, 'generated-image.png')}
                className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm"
              >
                <Download className="w-4 h-4" />
                下载
              </button>
            </div>
            <div className="rounded-lg overflow-hidden border border-gray-200 aspect-square bg-gray-50">
              <img 
                src={generatedImageUrl} 
                alt="Generated Image" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {generatedVideoUrl && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Video className="w-5 h-5 text-green-500" />
                <h3 className="font-semibold text-gray-700">生成的视频</h3>
              </div>
              <button
                onClick={() => handleDownload(generatedVideoUrl, 'generated-video.mp4')}
                className="flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors text-sm"
              >
                <Download className="w-4 h-4" />
                下载
              </button>
            </div>
            <div className="rounded-lg overflow-hidden border border-gray-200 aspect-video bg-gray-50">
              <video 
                src={generatedVideoUrl} 
                controls 
                className="w-full h-full"
                poster={generatedImageUrl}
              >
                您的浏览器不支持视频播放。
              </video>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
