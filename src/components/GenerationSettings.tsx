import React from 'react';
import { useAppStore } from '../store/useAppStore';
import { Settings, Image as ImageIcon, Video } from 'lucide-react';

export default function GenerationSettings() {
  const {
    prompt,
    setPrompt,
    imageSize,
    setImageSize,
    imageStyle,
    setImageStyle,
    videoDuration,
    setVideoDuration
  } = useAppStore();

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center gap-2 mb-6">
        <Settings className="w-5 h-5 text-purple-600" />
        <h2 className="text-xl font-bold text-gray-800">生成设置</h2>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            提示词 (Prompt)
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="描述你想要生成的图像..."
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <ImageIcon className="w-4 h-4" />
              图像尺寸
            </label>
            <select
              value={imageSize}
              onChange={(e) => setImageSize(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="1024x1024">1024x1024</option>
              <option value="1024x1792">1024x1792 (竖版)</option>
              <option value="1792x1024">1792x1024 (横版)</option>
              <option value="512x512">512x512</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              图像风格
            </label>
            <select
              value={imageStyle}
              onChange={(e) => setImageStyle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="vivid">Vivid (生动)</option>
              <option value="natural">Natural (自然)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <Video className="w-4 h-4" />
              视频时长 (秒)
            </label>
            <select
              value={videoDuration}
              onChange={(e) => setVideoDuration(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value={3}>3 秒</option>
              <option value={5}>5 秒</option>
              <option value={10}>10 秒</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
