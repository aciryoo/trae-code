import { Folder, Clock, ChevronRight, Play } from 'lucide-react'
import useProjectStore from '../store/projectStore'

const ProjectList = ({ onSelectProject }) => {
  const { projects, selectProject, currentProject } = useProjectStore()

  const statusColors = {
    draft: 'bg-gray-100 text-gray-600',
    developing: 'bg-blue-100 text-blue-600',
    testing: 'bg-yellow-100 text-yellow-600',
    deployed: 'bg-green-100 text-green-600',
  }

  const statusLabels = {
    draft: '草稿',
    developing: '开发中',
    testing: '测试中',
    deployed: '已部署',
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diff = now - date
    
    if (diff < 3600000) {
      return '刚刚'
    } else if (diff < 86400000) {
      return `${Math.floor(diff / 3600000)}小时前`
    } else if (diff < 604800000) {
      return `${Math.floor(diff / 86400000)}天前`
    } else {
      return date.toLocaleDateString('zh-CN')
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8">
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">我的项目</h1>
          <p className="text-gray-500 mt-1 text-sm sm:text-base">管理和创建您的AI驱动项目</p>
        </div>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-12 sm:py-16">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Folder className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">暂无项目</h2>
          <p className="text-gray-500 text-sm sm:text-base">点击左上角菜单创建您的第一个项目</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {projects.map(project => (
            <div
              key={project.id}
              onClick={() => {
                selectProject(project.id)
                onSelectProject && onSelectProject(project)
              }}
              className={`card cursor-pointer hover:shadow-md transition-all duration-200 ${
                currentProject?.id === project.id ? 'ring-2 ring-primary-500' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                  <Folder className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" />
                </div>
                <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${statusColors[project.status]}`}>
                  {statusLabels[project.status]}
                </span>
              </div>
              
              <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">{project.name}</h3>
              <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4 line-clamp-2">{project.description || '暂无描述'}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{formatDate(project.lastModifiedAt)}</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                  <button className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary-600" />
                  </button>
                  <button className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProjectList
