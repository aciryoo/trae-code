import React from 'react';
import { Sparkles } from 'lucide-react';
import ApiConfig from '../components/ApiConfig';
import GenerationSettings from '../components/GenerationSettings';
import StatusDisplay from '../components/StatusDisplay';
import ResultsDisplay from '../components/ResultsDisplay';
import { useGeneration } from '../hooks/useGeneration';
import { useAppStore } from '../store/useAppStore';

export default function Home() {
  const { startGeneration } = useGeneration();
  const { isGeneratingImage, isGeneratingVideo, resetResults } = useAppStore();
  const isGenerating = isGeneratingImage || isGeneratingVideo;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              AI 图像转视频生成器
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            使用 GPT 图像生成 API 创建图像，然后通过豆包视频生成 API 将图像转换为动态视频
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <ApiConfig />
          </div>

          <div className="lg:col-span-2 space-y-6">
            <GenerationSettings />

            <div className="flex flex-col gap-4">
              <button
                onClick={startGeneration}
                disabled={isGenerating}
                className={`
                  w-full py-4 px-6 rounded-xl font-semibold text-lg text-white
                  flex items-center justify-center gap-2 transition-all duration-200
                  ${isGenerating
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]'
                  }
                `}
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                    处理中...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-6 h-6" />
                    开始生成
                  </>
                )}
              </button>

              <button
                onClick={resetResults}
                className="w-full py-2 px-6 rounded-xl font-medium text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                重置结果
              </button>
            </div>

            <StatusDisplay />
            <ResultsDisplay />
          </div>
        </div>
      </div>
    </div>
  );
}
