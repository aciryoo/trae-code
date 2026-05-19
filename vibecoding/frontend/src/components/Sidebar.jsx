import { useState } from 'react'
import { 
  LayoutGrid, 
  MessageSquare, 
  Code, 
  Eye, 
  Settings, 
  Plus,
  ChevronRight,
  Folder
} from 'lucide-react'
import useProjectStore from '../store/projectStore'

const Sidebar = ({ currentView, onViewChange }) => {
  const { projects, currentProject, addProject, selectProject } = useProjectStore()
  const [showNewProjectModal, setShowNewProjectModal] = useState(false)
  const [newProjectName, setNewProjectName] = useState('')
  const [newProjectDesc, setNewProjectDesc] = useState('')

  const handleCreateProject = () => {
    if (newProjectName.trim()) {
      addProject({ name: newProjectName, description: newProjectDesc })
      setNewProjectName('')
      setNewProjectDesc('')
      setShowNewProjectModal(false)
    }
  }

  const navItems = [
    { id: 'home', icon: LayoutGrid, label: '首页' },
    { id: 'chat', icon: MessageSquare, label: '对话' },
    { id: 'editor', icon: Code, label: '代码编辑器' },
    { id: 'preview', icon: Eye, label: '预览' },
    { id: 'settings', icon: Settings, label: '设置' },
  ]

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center">
            <Code className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-gray-900">VibeCoding</h1>
            <p className="text-xs text-gray-500">AI智能开发平台</p>
          </div>
        </div>
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
        
        <div className="space-y-1 max-h-64 overflow-y-auto">
          {projects.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-4">暂无项目</p>
          ) : (
            projects.map(project => (
              <button
                key={project.id}
                onClick={() => selectProject(project.id)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors ${
                  currentProject?.id === project.id 
                    ? 'bg-primary-50 text-primary-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Folder className="w-4 h-4" />
                <span className="text-sm flex-1 truncate">{project.name}</span>
                <ChevronRight className="w-4 h-4 opacity-50" />
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
                  onClick={() => onViewChange(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    currentView === item.id
                      ? 'bg-primary-50 text-primary-600 font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm">{item.label}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      {showNewProjectModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-xl">
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
  )
}

export default Sidebar
