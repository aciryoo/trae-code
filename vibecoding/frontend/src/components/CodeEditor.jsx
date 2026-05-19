import { useState } from 'react'
import Editor from '@monaco-editor/react'
import { FileText, ChevronDown, ChevronRight, Save, RefreshCw } from 'lucide-react'
import useProjectStore from '../store/projectStore'

const CodeEditor = () => {
  const { codeFiles, updateCodeFile, currentProject } = useProjectStore()
  const [expandedFiles, setExpandedFiles] = useState({})
  const [activeFile, setActiveFile] = useState(null)
  const [editedContent, setEditedContent] = useState({})

  const toggleFile = (filePath) => {
    setExpandedFiles(prev => ({
      ...prev,
      [filePath]: !prev[filePath]
    }))
  }

  const selectFile = (file) => {
    setActiveFile(file.path)
    if (!editedContent[file.path]) {
      setEditedContent(prev => ({
        ...prev,
        [file.path]: file.content
      }))
    }
  }

  const handleSave = () => {
    if (activeFile && editedContent[activeFile]) {
      updateCodeFile(activeFile, editedContent[activeFile])
    }
  }

  const handleReset = () => {
    if (activeFile) {
      const file = codeFiles.find(f => f.path === activeFile)
      if (file) {
        setEditedContent(prev => ({
          ...prev,
          [activeFile]: file.content
        }))
      }
    }
  }

  const getFileExtension = (path) => {
    const parts = path.split('.')
    return parts[parts.length - 1] || ''
  }

  const getLanguage = (extension) => {
    const languageMap = {
      js: 'javascript',
      jsx: 'javascriptreact',
      ts: 'typescript',
      tsx: 'typescriptreact',
      css: 'css',
      html: 'html',
      json: 'json',
      md: 'markdown',
    }
    return languageMap[extension] || 'plaintext'
  }

  const renderFileTree = (files, path = '') => {
    const dirs = new Set()
    const fileList = []

    files.forEach(file => {
      const relPath = file.path.replace(path, '')
      const firstPart = relPath.split('/')[0]
      if (relPath.includes('/')) {
        dirs.add(firstPart)
      } else {
        fileList.push(file)
      }
    })

    return (
      <ul className="space-y-1">
        {[...dirs].map(dir => {
          const dirPath = path ? `${path}/${dir}` : dir
          const isExpanded = expandedFiles[dirPath]
          const hasChildren = files.some(f => f.path.startsWith(dirPath + '/'))
          
          if (!hasChildren) return null

          return (
            <li key={dirPath}>
              <button
                onClick={() => toggleFile(dirPath)}
                className="w-full flex items-center gap-1 px-2 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
              >
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                )}
                <span className="font-medium">{dir}</span>
              </button>
              {isExpanded && (
                <ul className="ml-4">
                  {renderFileTree(files.filter(f => f.path.startsWith(dirPath + '/')), dirPath)}
                </ul>
              )}
            </li>
          )
        })}
        
        {fileList.map(file => (
          <li key={file.path}>
            <button
              onClick={() => selectFile(file)}
              className={`w-full flex items-center gap-2 px-2 py-1 text-sm rounded transition-colors ${
                activeFile === file.path
                  ? 'bg-primary-50 text-primary-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span className="truncate">{file.path.replace(path, '')}</span>
            </button>
          </li>
        ))}
      </ul>
    )
  }

  if (!currentProject) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">选择一个项目</h2>
          <p className="text-gray-500">在左侧创建或选择一个项目后，即可查看和编辑代码</p>
        </div>
      </div>
    )
  }

  const activeFileData = codeFiles.find(f => f.path === activeFile)

  return (
    <div className="flex-1 flex h-full">
      <div className="w-64 bg-gray-50 border-r border-gray-200 p-4 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-700">文件结构</h3>
          <span className="text-xs text-gray-400">{codeFiles.length} 个文件</span>
        </div>
        <div className="flex-1 overflow-y-auto">
          {renderFileTree(codeFiles)}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        {activeFile ? (
          <>
            <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">{activeFile}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleReset}
                  className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                  title="重置"
                >
                  <RefreshCw className="w-4 h-4 text-gray-500" />
                </button>
                <button
                  onClick={handleSave}
                  className="btn-primary text-sm px-4 py-1.5 flex items-center gap-1"
                >
                  <Save className="w-4 h-4" />
                  <span>保存</span>
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-hidden">
              <Editor
                height="100%"
                language={getLanguage(getFileExtension(activeFile))}
                theme="light"
                value={editedContent[activeFile] || activeFileData?.content}
                onChange={(value) => {
                  if (value !== undefined) {
                    setEditedContent(prev => ({
                      ...prev,
                      [activeFile]: value
                    }))
                  }
                }}
                options={{
                  minimap: { enabled: true },
                  fontSize: 14,
                  fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                  lineNumbers: 'on',
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                }}
              />
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500">选择一个文件开始编辑</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CodeEditor
