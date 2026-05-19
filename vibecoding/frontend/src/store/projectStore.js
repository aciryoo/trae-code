import { create } from 'zustand'

const useProjectStore = create((set, get) => ({
  projects: [],
  currentProject: null,
  currentAgent: 'product',
  messages: [],
  codeFiles: [],
  
  addProject: (project) => {
    const newProject = {
      id: Date.now().toString(),
      name: project.name,
      description: project.description || '',
      status: 'draft',
      createdAt: new Date().toISOString(),
      lastModifiedAt: new Date().toISOString(),
    }
    set(state => ({
      projects: [...state.projects, newProject],
      currentProject: newProject,
    }))
  },
  
  selectProject: (projectId) => {
    const project = get().projects.find(p => p.id === projectId)
    if (project) {
      set({ currentProject: project })
      get().loadProjectData(projectId)
    }
  },
  
  loadProjectData: (projectId) => {
    set({
      messages: getMockMessages(projectId),
      codeFiles: getMockCodeFiles(projectId),
    })
  },
  
  setCurrentAgent: (agentType) => {
    set({ currentAgent: agentType })
  },
  
  sendMessage: async (message) => {
    const { currentAgent, currentProject } = get()
    const newMessage = {
      id: Date.now().toString(),
      agentType: currentAgent,
      userMessage: message,
      agentResponse: '',
      timestamp: new Date().toISOString(),
      isLoading: true,
    }
    
    set(state => ({
      messages: [...state.messages, newMessage],
    }))
    
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const response = getAgentResponse(currentAgent, message)
    
    set(state => ({
      messages: state.messages.map(m => 
        m.id === newMessage.id 
          ? { ...m, agentResponse: response, isLoading: false }
          : m
      ),
    }))
    
    if (currentAgent === 'dev') {
      updateCodeFiles(currentProject.id, message, response)
    }
  },
  
  updateCodeFile: (filePath, content) => {
    set(state => ({
      codeFiles: state.codeFiles.map(f => 
        f.path === filePath ? { ...f, content, updatedAt: new Date().toISOString() } : f
      ),
    }))
  },
  
  updateProjectStatus: (status) => {
    set(state => ({
      currentProject: state.currentProject ? { ...state.currentProject, status, lastModifiedAt: new Date().toISOString() } : null,
      projects: state.projects.map(p => 
        p.id === state.currentProject?.id ? { ...p, status, lastModifiedAt: new Date().toISOString() } : p
      ),
    }))
  },
  
  deleteProject: (projectId) => {
    set(state => ({
      projects: state.projects.filter(p => p.id !== projectId),
      currentProject: state.currentProject?.id === projectId ? null : state.currentProject,
    }))
  },
}))

const getMockMessages = (projectId) => {
  return [
    {
      id: '1',
      agentType: 'product',
      userMessage: '我想创建一个待办事项应用',
      agentResponse: '好的！我来帮您分析需求。待办事项应用通常包含以下核心功能：\n\n1. **任务管理**：创建、编辑、删除任务\n2. **分类管理**：按类别或项目组织任务\n3. **状态追踪**：待办、进行中、已完成\n4. **优先级设置**：高、中、低优先级\n5. **搜索过滤**：快速查找任务\n\n请问您还有其他特定需求吗？',
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      isLoading: false,
    },
    {
      id: '2',
      agentType: 'product',
      userMessage: '还需要支持任务提醒和数据导出功能',
      agentResponse: '收到！已添加以下功能需求：\n\n6. **任务提醒**：设置截止日期和提醒通知\n7. **数据导出**：支持导出为CSV或JSON格式\n\n我已经为您整理了完整的需求文档，接下来可以开始设计界面了。',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      isLoading: false,
    },
  ]
}

const getMockCodeFiles = (projectId) => {
  return [
    {
      id: '1',
      projectId,
      path: 'src/App.jsx',
      content: `import { useState } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [inputValue, setInputValue] = useState('')

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, { id: Date.now(), text: inputValue, completed: false }])
      setInputValue('')
    }
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto py-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          待办事项
        </h1>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
              placeholder="添加新任务..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={addTodo}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              添加
            </button>
          </div>
          
          <ul className="space-y-3">
            {todos.map(todo => (
              <li
                key={todo.id}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="w-5 h-5 text-blue-600 rounded"
                />
                <span className="flex-1">
                  {todo.text}
                </span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  删除
                </button>
              </li>
            ))}
          </ul>
          
          {todos.length === 0 && (
            <p className="text-center text-gray-400 py-8">暂无任务</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2',
      projectId,
      path: 'src/App.css',
      content: `* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}
`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '3',
      projectId,
      path: 'src/main.jsx',
      content: `import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]
}

const getAgentResponse = (agentType, message) => {
  const responses = {
    product: {
      default: '感谢您的需求反馈！我已经更新了需求文档。以下是当前的功能清单：\n\n1. 任务管理（CRUD）\n2. 分类管理\n3. 状态追踪\n4. 优先级设置\n5. 搜索过滤\n6. 任务提醒\n7. 数据导出\n\n请问您还需要添加其他功能吗？',
      '需求': '好的，我来帮您梳理需求。请详细描述您想要的功能...',
      '功能': '已记录功能需求，正在更新需求文档...',
      '用户故事': '我来帮您编写用户故事...',
    },
    ui: {
      default: '收到！我来帮您设计界面。待办事项应用的UI设计要点：\n\n**配色方案**：\n- 主色调：蓝色系（专业、清爽）\n- 辅助色：绿色（完成状态）、红色（删除操作）\n\n**布局设计**：\n- 单页应用，卡片式布局\n- 响应式设计，支持移动端\n- 简洁的操作按钮\n\n**组件规划**：\n- TodoList - 任务列表\n- TodoItem - 单个任务\n- AddTodo - 添加任务表单\n- FilterBar - 筛选栏\n\n需要我进一步细化某个组件的设计吗？',
      '设计': '好的，我来帮您设计界面细节...',
      '组件': '我来帮您设计组件规范...',
      '样式': '已更新样式规范文档...',
    },
    dev: {
      default: '好的！我来帮您实现代码。根据需求，我将创建以下文件结构：\n\n\`\`\`\nsrc/\n├── App.jsx          # 主应用组件\n├── App.css          # 应用样式\n├── main.jsx         # 入口文件\n├── components/\n│   ├── TodoList.jsx\n│   ├── TodoItem.jsx\n│   └── AddTodo.jsx\n└── store/\n    └── todoStore.js\n\`\`\`\n\n我已经为您生成了基础代码，您可以在代码编辑器中查看和修改。',
      '实现': '正在为您实现代码...',
      '代码': '已更新代码实现...',
      '修复': '收到！我来帮您修复这个问题...',
    },
    test: {
      default: '收到！我来帮您进行测试验证。\n\n**测试用例规划**：\n\n1. **单元测试**：\n   - TodoItem组件渲染测试\n   - 状态管理逻辑测试\n\n2. **集成测试**：\n   - 添加任务功能测试\n   - 完成任务功能测试\n   - 删除任务功能测试\n\n3. **E2E测试**：\n   - 用户完整操作流程测试\n\n**测试覆盖率目标**：80%以上\n\n是否需要我生成具体的测试代码？',
      '测试': '好的，我来帮您编写测试用例...',
      'bug': '收到！我来帮您分析和修复这个Bug...',
      '验证': '正在进行测试验证...',
    },
  }

  const agentResponses = responses[agentType]
  for (const [keyword, response] of Object.entries(agentResponses)) {
    if (message.includes(keyword)) {
      return response
    }
  }
  return agentResponses.default
}

const updateCodeFiles = (projectId, message, response) => {
  const store = useProjectStore.getState()
  if (message.includes('提醒')) {
    const updatedContent = store.codeFiles.find(f => f.path === 'src/App.jsx')?.content || ''
    const newContent = updatedContent.replace(
      'const [todos, setTodos] = useState([])',
      `const [todos, setTodos] = useState([])
  const [reminders, setReminders] = useState({})

  const setReminder = (id, date) => {
    setReminders({ ...reminders, [id]: date })
    const reminderTime = new Date(date) - new Date()
    if (reminderTime > 0) {
      setTimeout(() => {
        alert(\`提醒：您有一个任务即将到期！\`)
      }, reminderTime)
    }
  }`
    )
    store.updateCodeFile('src/App.jsx', newContent)
  }
}

export default useProjectStore
