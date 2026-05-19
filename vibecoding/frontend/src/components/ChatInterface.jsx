import { useState, useRef, useEffect } from 'react'
import { Send, Bot, Sparkles, Palette, Code2, Bug } from 'lucide-react'
import useProjectStore from '../store/projectStore'

const ChatInterface = () => {
  const { currentAgent, setCurrentAgent, messages, sendMessage, currentProject } = useProjectStore()
  const [inputMessage, setInputMessage] = useState('')
  const messagesEndRef = useRef(null)

  const agents = [
    { id: 'product', name: '产品', icon: Sparkles, color: 'bg-blue-100 text-blue-600', description: '需求分析' },
    { id: 'ui', name: 'UI', icon: Palette, color: 'bg-purple-100 text-purple-600', description: '界面设计' },
    { id: 'dev', name: '开发', icon: Code2, color: 'bg-green-100 text-green-600', description: '代码开发' },
    { id: 'test', name: '测试', icon: Bug, color: 'bg-orange-100 text-orange-600', description: '测试验证' },
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (inputMessage.trim() && currentProject) {
      sendMessage(inputMessage.trim())
      setInputMessage('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  if (!currentProject) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Bot className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">选择一个项目开始对话</h2>
          <p className="text-gray-500">在左侧创建或选择一个项目后，即可与智能体进行对话</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="p-3 sm:p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900">与智能体对话</h2>
          <span className="px-2 sm:px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs hidden sm:inline">
            {currentProject.name}
          </span>
        </div>
        
        <div className="flex gap-1.5 sm:gap-2 flex-wrap">
          {agents.map(agent => {
            const Icon = agent.icon
            return (
              <button
                key={agent.id}
                onClick={() => setCurrentAgent(agent.id)}
                className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2 rounded-lg transition-all duration-200 text-xs sm:text-sm ${
                  currentAgent === agent.id
                    ? `${agent.color} ring-2 ring-offset-2 ring-current`
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="font-medium">{agent.name}</span>
              </button>
            )
          })}
        </div>
        
        <p className="text-xs text-gray-500 mt-2 sm:mt-3 hidden sm:block">
          {agents.find(a => a.id === currentAgent)?.description}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-3 sm:p-4 bg-gray-50">
        <div className="max-w-4xl mx-auto space-y-3 sm:space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <div className="w-16 h-16 sm:w-16 sm:h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bot className="w-8 h-8 text-primary-600" />
              </div>
              <p className="text-gray-500 text-sm sm:text-base">开始与 {agents.find(a => a.id === currentAgent)?.name} 对话吧！</p>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">输入您的需求，智能体将为您提供帮助</p>
            </div>
          ) : (
            messages.map(message => (
              <div key={message.id} className="flex gap-2 sm:gap-3">
                {message.agentResponse ? (
                  <>
                    <div className="flex flex-col items-end flex-1 max-w-[85%] sm:max-w-[70%]">
                      <div className="message-bubble-user">
                        <p className="text-sm whitespace-pre-wrap">{message.userMessage}</p>
                      </div>
                      <span className="text-xs text-gray-400 mt-1">
                        {new Date(message.timestamp).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    
                    <div className="flex flex-col flex-1 max-w-[85%] sm:max-w-[70%]">
                      <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                        {(() => {
                          const agent = agents.find(a => a.id === message.agentType)
                          const Icon = agent?.icon
                          return Icon ? (
                            <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full ${agent.color} flex items-center justify-center`}>
                              <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            </div>
                          ) : null
                        })()}
                        <span className="text-xs font-medium text-gray-600">
                          {agents.find(a => a.id === message.agentType)?.name}
                        </span>
                      </div>
                      <div className="message-bubble-agent">
                        {message.isLoading ? (
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                          </div>
                        ) : (
                          <pre className="text-xs sm:text-sm whitespace-pre-wrap font-sans">{message.agentResponse}</pre>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-end flex-1 max-w-[85%] sm:max-w-[70%]">
                    <div className="message-bubble-user">
                      <p className="text-sm whitespace-pre-wrap">{message.userMessage}</p>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="p-3 sm:p-4 border-t border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-2 sm:gap-3">
            <div className="flex-1 relative">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={`向 ${agents.find(a => a.id === currentAgent)?.name} 输入...`}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none text-sm"
                rows={2}
              />
            </div>
            <button
              onClick={handleSend}
              disabled={!inputMessage.trim()}
              className="btn-primary px-4 sm:px-6 flex items-center gap-1.5 sm:gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">发送</span>
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2 text-center hidden sm:block">
            按 Enter 发送，Shift + Enter 换行
          </p>
        </div>
      </div>
    </div>
  )
}

export default ChatInterface
