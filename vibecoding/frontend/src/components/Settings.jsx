import { useState } from 'react'
import { User, Bell, Palette, Shield, Database, Globe, Save, RotateCcw } from 'lucide-react'

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile')
  const [settings, setSettings] = useState({
    profile: {
      name: '开发者',
      email: 'developer@example.com',
      avatar: '',
    },
    notifications: {
      email: true,
      push: true,
      marketing: false,
    },
    appearance: {
      theme: 'light',
      fontSize: 'medium',
      sidebarCollapsed: false,
    },
    privacy: {
      analytics: true,
      shareData: false,
    },
    api: {
      apiKey: 'sk-xxxxxxxxxxxxxxxxxxxxxxxx',
      rateLimit: 1000,
    },
  })

  const tabs = [
    { id: 'profile', icon: User, label: '个人资料' },
    { id: 'notifications', icon: Bell, label: '通知设置' },
    { id: 'appearance', icon: Palette, label: '外观' },
    { id: 'privacy', icon: Shield, label: '隐私' },
    { id: 'api', icon: Database, label: 'API设置' },
  ]

  const handleSave = () => {
    alert('设置已保存！')
  }

  const handleReset = () => {
    setSettings({
      profile: {
        name: '开发者',
        email: 'developer@example.com',
        avatar: '',
      },
      notifications: {
        email: true,
        push: true,
        marketing: false,
      },
      appearance: {
        theme: 'light',
        fontSize: 'medium',
        sidebarCollapsed: false,
      },
      privacy: {
        analytics: true,
        shareData: false,
      },
      api: {
        apiKey: 'sk-xxxxxxxxxxxxxxxxxxxxxxxx',
        rateLimit: 1000,
      },
    })
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-gray-400" />
              </div>
              <button className="btn-secondary">更换头像</button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">用户名</label>
                <input
                  type="text"
                  value={settings.profile.name}
                  onChange={(e) => setSettings(prev => ({ ...prev, profile: { ...prev.profile, name: e.target.value } }))}
                  className="input-field"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
                <input
                  type="email"
                  value={settings.profile.email}
                  onChange={(e) => setSettings(prev => ({ ...prev, profile: { ...prev.profile, email: e.target.value } }))}
                  className="input-field"
                />
              </div>
            </div>
          </div>
        )
      
      case 'notifications':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">邮件通知</h4>
                <p className="text-sm text-gray-500">接收重要更新和消息</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications.email}
                  onChange={(e) => setSettings(prev => ({ ...prev, notifications: { ...prev.notifications, email: e.target.checked } }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">推送通知</h4>
                <p className="text-sm text-gray-500">浏览器推送通知</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications.push}
                  onChange={(e) => setSettings(prev => ({ ...prev, notifications: { ...prev.notifications, push: e.target.checked } }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">营销邮件</h4>
                <p className="text-sm text-gray-500">接收产品更新和促销信息</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications.marketing}
                  onChange={(e) => setSettings(prev => ({ ...prev, notifications: { ...prev.notifications, marketing: e.target.checked } }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </div>
        )
      
      case 'appearance':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">主题</label>
              <div className="grid grid-cols-3 gap-3">
                {['light', 'dark', 'system'].map(theme => (
                  <button
                    key={theme}
                    onClick={() => setSettings(prev => ({ ...prev, appearance: { ...prev.appearance, theme } }))}
                    className={`p-4 rounded-lg border-2 transition-colors ${
                      settings.appearance.theme === theme
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-sm font-medium capitalize">{theme === 'light' ? '浅色' : theme === 'dark' ? '深色' : '跟随系统'}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">字体大小</label>
              <div className="grid grid-cols-3 gap-3">
                {['small', 'medium', 'large'].map(size => (
                  <button
                    key={size}
                    onClick={() => setSettings(prev => ({ ...prev, appearance: { ...prev.appearance, fontSize: size } }))}
                    className={`p-4 rounded-lg border-2 transition-colors ${
                      settings.appearance.fontSize === size
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-sm font-medium capitalize">{size === 'small' ? '小' : size === 'medium' ? '中' : '大'}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )
      
      case 'privacy':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">使用分析</h4>
                <p className="text-sm text-gray-500">帮助我们改进产品</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.privacy.analytics}
                  onChange={(e) => setSettings(prev => ({ ...prev, privacy: { ...prev.privacy, analytics: e.target.checked } }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">共享匿名数据</h4>
                <p className="text-sm text-gray-500">用于研究和改进目的</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.privacy.shareData}
                  onChange={(e) => setSettings(prev => ({ ...prev, privacy: { ...prev.privacy, shareData: e.target.checked } }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </div>
        )
      
      case 'api':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">API Key</label>
              <input
                type="text"
                value={settings.api.apiKey}
                onChange={(e) => setSettings(prev => ({ ...prev, api: { ...prev.api, apiKey: e.target.value } }))}
                className="input-field font-mono"
                readOnly
              />
              <button className="btn-secondary mt-2">重新生成</button>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">请求限制</label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="100"
                  max="5000"
                  step="100"
                  value={settings.api.rateLimit}
                  onChange={(e) => setSettings(prev => ({ ...prev, api: { ...prev.api, rateLimit: parseInt(e.target.value) } }))}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                />
                <span className="text-sm font-medium text-gray-700 w-20 text-right">{settings.api.rateLimit}/小时</span>
              </div>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Globe className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-blue-900">API 文档</span>
              </div>
              <p className="text-sm text-blue-700">访问我们的API文档了解更多信息</p>
            </div>
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-4xl mx-auto px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">设置</h1>
            <p className="text-gray-500 mt-1">管理您的账户和偏好设置</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={handleReset} className="btn-secondary flex items-center gap-2">
              <RotateCcw className="w-4 h-4" />
              <span>重置</span>
            </button>
            <button onClick={handleSave} className="btn-primary flex items-center gap-2">
              <Save className="w-4 h-4" />
              <span>保存设置</span>
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          <div className="w-48 shrink-0">
            <nav className="space-y-1">
              {tabs.map(tab => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary-50 text-primary-600 font-medium'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm">{tab.label}</span>
                  </button>
                )
              })}
            </nav>
          </div>

          <div className="flex-1">
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                {tabs.find(t => t.id === activeTab)?.label}
              </h2>
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
