import React from 'react';
import { useAppStore } from '../store/useAppStore';
import { CheckCircle2, Clock, AlertCircle, Image, Video } from 'lucide-react';

export default function StatusDisplay() {
  const {
    currentStep,
    isGeneratingImage,
    isGeneratingVideo,
    errorMessage
  } = useAppStore();

  const steps = [
    { id: 'idle', label: '准备就绪', icon: Clock },
    { id: 'image', label: '生成图像中', icon: Image },
    { id: 'video', label: '生成视频中', icon: Video },
    { id: 'complete', label: '完成', icon: CheckCircle2 }
  ];

  const getCurrentStepIndex = () => {
    if (currentStep === 'idle') return 0;
    if (currentStep === 'image') return 1;
    if (currentStep === 'video') return 2;
    if (currentStep === 'complete') return 3;
    if (currentStep === 'error') return 0;
    return 0;
  };

  const currentStepIndex = getCurrentStepIndex();

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 mb-6">处理进度</h2>
      
      <div className="relative">
        <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-500"
            style={{ 
              width: currentStepIndex === 0 ? '0%' : 
                     currentStepIndex === 1 ? '33%' : 
                     currentStepIndex === 2 ? '66%' : '100%'
            }}
          />
        </div>

        <div className="flex justify-between relative z-10">
          {steps.map((step, index) => {
            const isActive = index <= currentStepIndex && currentStep !== 'error';
            const isCurrent = index === currentStepIndex;
            const isError = currentStep === 'error';
            const Icon = step.icon;

            return (
              <div key={step.id} className="flex flex-col items-center">
                <div 
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300
                    ${(isActive && !isError)
                      ? 'bg-gradient-to-br from-blue-500 to-green-500 border-transparent text-white'
                      : isError
                        ? 'bg-red-500 border-transparent text-white'
                        : 'bg-white border-gray-300 text-gray-400'
                    }
                    ${isCurrent && !isError ? 'scale-110 shadow-lg' : ''}
                  `}
                >
                  {isActive && !isError && index < currentStepIndex ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </div>
                <span 
                  className={`
                    mt-2 text-sm font-medium
                    ${isActive && !isError ? 'text-gray-800' : 'text-gray-400'}
                  `}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {errorMessage && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-red-800 font-medium">出错了</p>
            <p className="text-red-600 text-sm mt-1">{errorMessage}</p>
          </div>
        </div>
      )}

      {(isGeneratingImage || isGeneratingVideo) && (
        <div className="mt-6 flex items-center justify-center gap-2 text-gray-600">
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-300 border-t-blue-500" />
          <span>
            {isGeneratingImage ? '正在生成图像...' : '正在生成视频...'}
          </span>
        </div>
      )}
    </div>
  );
}
