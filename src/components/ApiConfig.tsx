import React from 'react';
import { useAppStore } from '../store/useAppStore';
import { Key, Globe } from 'lucide-react';

export default function ApiConfig() {
  const {
    gptApiUrl,
    setGptApiUrl,
    gptApiKey,
    setGptApiKey,
    doubaoApiUrl,
    setDoubaoApiUrl,
    doubaoApiKey,
    setDoubaoApiKey
  } = useAppStore();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <Globe className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-800">GPT 图像生成 API 配置</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              API 端点 URL
            </label>
            <input
              type="text"
              value={gptApiUrl}
              onChange={(e) => setGptApiUrl(e.target.value)}
              placeholder="https://api.openai.com/v1/images/generations"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              API 密钥
            </label>
            <div className="relative">
              <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="password"
                value={gptApiKey}
                onChange={(e) => setGptApiKey(e.target.value)}
                placeholder="sk-..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <Globe className="w-5 h-5 text-green-600" />
          <h2 className="text-xl font-bold text-gray-800">豆包视频生成 API 配置</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              API 端点 URL
            </label>
            <input
              type="text"
              value={doubaoApiUrl}
              onChange={(e) => setDoubaoApiUrl(e.target.value)}
              placeholder="https://ark.cn-beijing.volces.com/api/v3/videos/generations"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              API 密钥
            </label>
            <div className="relative">
              <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="password"
                value={doubaoApiKey}
                onChange={(e) => setDoubaoApiKey(e.target.value)}
                placeholder="..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
