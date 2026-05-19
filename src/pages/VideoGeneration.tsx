import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Video, Settings, Download, Image, Sparkles } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { useGeneration } from '../hooks/useGeneration';

export default function VideoGeneration() {
  const navigate = useNavigate();
  const {
    selectedImage,
    setSelectedImage,
    videoDuration,
    setVideoDuration,
    isGeneratingVideo,
    generatedVideoUrl,
    videoError,
    doubaoApiUrl,
    doubaoApiKey,
    generatedImages,
    resetVideoGeneration
  } = useAppStore();
  const { generateVideo } = useGeneration();

  const handleGenerate = async () => {
    if (!doubaoApiUrl || !doubaoApiKey) {
      alert('请先在设置中配置豆包视频生成 API');
      navigate('/settings');
      return;
    }
    
    if (!selectedImage) {
      alert('请先选择一张图片');
      return;
    }
    
    await generateVideo();
  };

  const handleDownload = (url: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = 'generated-video.mp4';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">视频生成</h1>
        <p className="text-gray-600">选择一张图片，让 AI 为您生成动态视频</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左侧配置区域 */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4">视频参数</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  视频时长
                </label>
                <select
                  value={videoDuration}
                  onChange={(e) => setVideoDuration(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value={3}>3 秒</option>
                  <option value={5}>5 秒</option>
                  <option value={10}>10 秒</option>
                </select>
              </div>

              <button
                onClick={handleGenerate}
                disabled={isGeneratingVideo || !selectedImage}
                className={`
                  w-full py-3 px-4 rounded-lg font-semibold text-white
                  flex items-center justify-center gap-2 transition-all duration-200
                  ${isGeneratingVideo || !selectedImage
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 hover:shadow-md'
                  }
                `}
              >
                {isGeneratingVideo ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                    正在生成...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    生成视频
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

          {videoError && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 font-medium">出错了</p>
              <p className="text-red-600 text-sm">{videoError}</p>
            </div>
          )}
        </div>

        {/* 右侧内容区域 */}
        <div className="lg:col-span-2 space-y-6">
          {/* 已选图片预览 */}
          {selectedImage && (
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">已选择的图片</h3>
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="w-full h-full object-contain"
                />
              </div>
              <button
                onClick={() => {
                  setSelectedImage(null);
                  resetVideoGeneration();
                }}
                className="text-sm text-red-600 hover:text-red-700"
              >
                更换图片
              </button>
            </div>
          )}

          {/* 视频结果 */}
          {generatedVideoUrl && (
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">生成的视频</h3>
                <button
                  onClick={() => handleDownload(generatedVideoUrl)}
                  className="flex items-center gap-1 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  下载视频
                </button>
              </div>
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <video
                  src={generatedVideoUrl}
                  controls
                  className="w-full h-full"
                  poster={selectedImage}
                >
                  您的浏览器不支持视频播放
                </video>
              </div>
            </div>
          )}

          {/* 历史图片选择 */}
          {!selectedImage && generatedImages.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">选择一张图片</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {generatedImages.map((image) => (
                  <div
                    key={image.id}
                    onClick={() => setSelectedImage(image.url)}
                    className="aspect-square rounded-lg overflow-hidden border-2 border-transparent hover:border-blue-500 cursor-pointer transition-all duration-200"
                  >
                    <img
                      src={image.url}
                      alt={image.prompt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 提示信息 */}
          {!selectedImage && generatedImages.length === 0 && (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center border border-gray-100">
              <div className="mb-4">
                <Image className="w-16 h-16 mx-auto text-gray-300" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                请先选择一张图片
              </h3>
              <p className="text-gray-500 mb-4">
                您可以先去“图片生成”页面生成一张图片，然后回来选择它
              </p>
              <button
                onClick={() => navigate('/')}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg hover:from-blue-600 hover:to-green-600 transition-colors"
              >
                去生成图片
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
