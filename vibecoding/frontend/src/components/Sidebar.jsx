import { useState } from 'react'
import { 
  LayoutGrid, 
  MessageSquare, 
  Code, 
  Eye, 
  Settings, 
  Plus,
  ChevronRight,
  Folder,
  Menu,
  X
} from 'lucide-react'
import useProjectStore from '../store/projectStore'

const Sidebar = ({ currentView, onViewChange }) => {
  const { projects, currentProject, addProject, selectProject } = useProjectStore()
  const [showNewProjectModal, setShowNewProjectModal] = useState(false)
  const [newProjectName, setNewProjectName] = useState('')
  const [newProjectDesc, setNewProjectDesc] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleCreateProject = () => {
    if (newProjectName.trim()) {
      addProject({ name: newProjectName, description: newProjectDesc })
      setNewProjectName('')
      setNewProjectDesc('')
      setShowNewProjectModal(false)
    }
  }

  const handleNavClick = (viewId) => {
    onViewChange(viewId)
    setSidebarOpen(false)
  }

  const navItems = [
    { id: 'home', icon: LayoutGrid, label: '首页' },
    { id: 'chat', icon: MessageSquare, label: '对话' },
    { id: 'editor', icon: Code, label: '代码' },
    { id: 'preview', icon: Eye, label: '预览' },
    { id: 'settings', icon: Settings, label: '设置' },
  ]

  return (
    <>
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-white shadow-lg rounded-lg p-2"
      >
        <Menu className="w-6 h-6 text-gray-700" />
      </button>

      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 lg:w-64 md:w-56 sm:w-48
        bg-white border-r border-gray-200 h-screen flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center">
              <Code className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-bold text-gray-900">VibeCoding</h1>
              <p className="text-xs text-gray-500">AI智能开发</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-700">项目</span>
            <button
              onClick={() => setShowNewProjectModal(true)}
              className="w-7 h-7 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center hover:bg-primary-100 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-1 max-h-48 overflow-y-auto">
            {projects.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-4">暂无项目</p>
            ) : (
              projects.map(project => (
                <button
                  key={project.id}
                  onClick={() => {
                    selectProject(project.id)
                    setSidebarOpen(false)
                  }}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors text-sm ${
                    currentProject?.id === project.id 
                      ? 'bg-primary-50 text-primary-600' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Folder className="w-4 h-4 shrink-0" />
                  <span className="truncate">{project.name}</span>
                </button>
              ))
            )}
          </div>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {navItems.map(item => {
              const Icon = item.icon
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                      currentView === item.id
                        ? 'bg-primary-50 text-primary-600 font-medium'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                    <span className="text-sm">{item.label}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        {showNewProjectModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-xl">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">创建新项目</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">项目名称</label>
                  <input
                    type="text"
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                    className="input-field"
                    placeholder="输入项目名称"
                    autoFocus
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">项目描述</label>
                  <textarea
                    value={newProjectDesc}
                    onChange={(e) => setNewProjectDesc(e.target.value)}
                    className="input-field"
                    placeholder="输入项目描述（可选）"
                    rows={3}
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setShowNewProjectModal(false)}
                    className="flex-1 btn-secondary"
                  >
                    取消
                  </button>
                  <button
                    onClick={handleCreateProject}
                    disabled={!newProjectName.trim()}
                    className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    创建
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Sidebar
