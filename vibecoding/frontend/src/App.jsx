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
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      <main className="flex-1 overflow-hidden">
        {renderView()}
      </main>
    </div>
  )
}

export default App
