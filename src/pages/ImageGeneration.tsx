import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Settings, Download, Video } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { useGeneration } from '../hooks/useGeneration';

export default function ImageGeneration() {
  const navigate = useNavigate();
  const {
    imagePrompt,
    setImagePrompt,
    imageSize,
    setImageSize,
    imageStyle,
    setImageStyle,
    generatedImages,
    isGeneratingImage,
    imageError,
    gptApiUrl,
    gptApiKey,
    setSelectedImage,
    clearGeneratedImages
  } = useAppStore();
  const { generateImage } = useGeneration();

  const handleGenerate = async () => {
    if (!gptApiUrl || !gptApiKey) {
      alert('请先在设置中配置 GPT 图像生成 API');
      navigate('/settings');
      return;
    }
    
    if (!imagePrompt.trim()) {
      alert('请输入提示词');
      return;
    }
    
    await generateImage();
  };

  const handleSelectForVideo = (url: string) => {
    setSelectedImage(url);
    navigate('/video');
  };

  const handleDownload = (url: string, id: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `generated-image-${id}.png`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">图片生成</h1>
        <p className="text-gray-600">使用 AI 生成精美图片，然后可以转换为视频</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左侧配置区域 */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4">生成参数</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  提示词
                </label>
                <textarea
                  value={imagePrompt}
                  onChange={(e) => setImagePrompt(e.target.value)}
                  placeholder="描述您想要生成的图像..."
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  图像尺寸
                </label>
                <select
                  value={imageSize}
                  onChange={(e) => setImageSize(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="1024x1024">1024x1024 (正方形)</option>
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="vivid">Vivid (生动)</option>
                  <option value="natural">Natural (自然)</option>
                </select>
              </div>

              <button
                onClick={handleGenerate}
                disabled={isGeneratingImage}
                className={`
                  w-full py-3 px-4 rounded-lg font-semibold text-white
                  flex items-center justify-center gap-2 transition-all duration-200
                  ${isGeneratingImage
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 hover:shadow-md'
                  }
                `}
              >
                {isGeneratingImage ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                    正在生成...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    生成图片
                  </>
                )}
              </button>

              <button
                onClick={() => navigate('/settings')}
                className="w-full py-2 px-4 rounded-lg font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
              >
                <Settings className="w-4 h-4" />
                配置 API
              </button>
            </div>
          </div>

          {imageError && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 font-medium">出错了</p>
              <p className="text-red-600 text-sm">{imageError}</p>
            </div>
          )}
        </div>

        {/* 右侧结果展示 */}
        <div className="lg:col-span-2">
          {generatedImages.length > 0 && (
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">已生成的图片</h2>
              <button
                onClick={clearGeneratedImages}
                className="text-sm text-gray-500 hover:text-red-600"
              >
                清空全部
              </button>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {generatedImages.map((image) => (
              <div
                key={image.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
              >
                <div className="aspect-square bg-gray-100">
                  <img
                    src={image.url}
                    alt={image.prompt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {image.prompt}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSelectForVideo(image.url)}
                      className="flex-1 flex items-center justify-center gap-1 py-2 px-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg hover:from-green-600 hover:to-blue-600 transition-colors text-sm"
                    >
                      <Video className="w-4 h-4" />
                      生成视频
                    </button>
                    <button
                      onClick={() => handleDownload(image.url, image.id)}
                      className="flex items-center justify-center gap-1 py-2 px-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                    >
                      <Download className="w-4 h-4" />
                      下载
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {generatedImages.length === 0 && !isGeneratingImage && (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center border border-gray-100">
              <div className="mb-4">
                <Sparkles className="w-16 h-16 mx-auto text-gray-300" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                还没有生成的图片
              </h3>
              <p className="text-gray-500">
                在左侧输入提示词并点击"生成图片"开始创作吧！
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
