import { useState } from 'react'
import Sidebar from './components/Sidebar'
import ProjectList from './components/ProjectList'
import ChatInterface from './components/ChatInterface'
import CodeEditor from './components/CodeEditor'
import Preview from './components/Preview'
import Settings from './components/Settings'

function App() {
  const [currentView, setCurrentView] = useState('home')

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <ProjectList onSelectProject={() => setCurrentView('chat')} />
      case 'chat':
        return <ChatInterface />
      case 'editor':
        return <CodeEditor />
      case 'preview':
        return <Preview />
      case 'settings':
        return <Settings />
      default:
        return <ProjectList onSelectProject={() => setCurrentView('chat')} />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      <main className="flex-1 overflow-hidden lg:ml-0 md:ml-0 sm:ml-0">
        <div className="h-full pt-14 lg:pt-0 md:pt-0 sm:pt-0 px-0 lg:px-0 md:px-0 sm:px-0">
          {renderView()}
        </div>
      </main>
    </div>
  )
}

export default App
