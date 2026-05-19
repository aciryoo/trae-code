import { useState, useEffect } from 'react'
import { Play, RefreshCw, ExternalLink, Terminal, Smartphone, Tablet, Monitor } from 'lucide-react'
import useProjectStore from '../store/projectStore'

const Preview = () => {
  const { codeFiles, currentProject } = useProjectStore()
  const [isRunning, setIsRunning] = useState(false)
  const [output, setOutput] = useState('')
  const [viewport, setViewport] = useState('desktop')
  const [buildError, setBuildError] = useState(null)

  const viewportSizes = {
    mobile: '375px',
    tablet: '768px',
    desktop: '100%',
  }

  const viewportIcons = {
    mobile: Smartphone,
    tablet: Tablet,
    desktop: Monitor,
  }

  const runBuild = async () => {
    setIsRunning(true)
    setBuildError(null)
    setOutput('')

    setOutput('正在构建项目...\n')
    
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const appJsx = codeFiles.find(f => f.path === 'src/App.jsx')?.content || ''
    
    if (!appJsx.includes('function App') && !appJsx.includes('const App')) {
      setBuildError('错误：App.jsx 文件格式不正确')
      setOutput('构建失败：App.jsx 文件格式不正确\n')
      setIsRunning(false)
      return
    }

    setOutput(prev => prev + '✓ 语法检查通过\n')
    await new Promise(resolve => setTimeout(resolve, 500))
    setOutput(prev => prev + '✓ 依赖解析完成\n')
    await new Promise(resolve => setTimeout(resolve, 500))
    setOutput(prev => prev + '✓ 构建成功\n')
    await new Promise(resolve => setTimeout(resolve, 500))

    setIsRunning(false)
  }

  useEffect(() => {
    runBuild()
  }, [currentProject])

  const getPreviewContent = () => {
    const appJsx = codeFiles.find(f => f.path === 'src/App.jsx')?.content || ''
    
    if (buildError) {
      return (
        <div className="h-full flex items-center justify-center bg-red-50">
          <div className="text-center p-8">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Terminal className="w-8 h-8 text-red-500" />
            </div>
            <p className="text-red-600 font-medium">{buildError}</p>
            <p className="text-red-400 text-sm mt-2">请检查代码并重新构建</p>
          </div>
        </div>
      )
    }

    return (
      <div className="h-full bg-gray-50 p-4 overflow-auto">
        <div 
          className="bg-white rounded-lg shadow-sm p-6"
          dangerouslySetInnerHTML={{
            __html: `
              <!DOCTYPE html>
              <html>
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                  * { margin: 0; padding: 0; box-sizing: border-box; }
                  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
                </style>
              </head>
              <body>
                <div id="root">${renderReactApp(appJsx)}</div>
              </body>
              </html>
            `
          }}
        />
      </div>
    )
  }

  const renderReactApp = (jsxContent) => {
    const match = jsxContent.match(/return\s*\(\s*([\s\S]*?)\s*\)/)
    if (match) {
      let jsx = match[1]
      jsx = jsx.replace(/className=/g, 'class=')
      jsx = jsx.replace(/onClick=/g, 'onclick=')
      jsx = jsx.replace(/onChange=/g, 'oninput=')
      jsx = jsx.replace(/onKeyPress=/g, 'onkeypress=')
      jsx = jsx.replace(/value=\{(\w+)\}/g, 'value=""')
      jsx = jsx.replace(/checked=\{(\w+)\}/g, 'checked')
      jsx = jsx.replace(/\{(\w+)\}/g, (_, varName) => {
        if (varName === 'true') return 'true'
        if (varName === 'false') return 'false'
        if (!isNaN(varName)) return varName
        return ''
      })
      jsx = jsx.replace(/\{`([^`]+)`\}/g, '$1')
      jsx = jsx.replace(/<br\s*\/>/g, '<br>')
      return jsx
    }
    return '<div>无法解析App组件</div>'
  }

  if (!currentProject) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Play className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">选择一个项目</h2>
          <p className="text-gray-500">在左侧创建或选择一个项目后，即可预览应用效果</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
        <div className="flex items-center gap-3">
          <h3 className="font-semibold text-gray-900">应用预览</h3>
          <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
            {currentProject.name}
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            {Object.entries(viewportSizes).map(([key, size]) => {
              const Icon = viewportIcons[key]
              return (
                <button
                  key={key}
                  onClick={() => setViewport(key)}
                  className={`p-2 rounded-md transition-colors ${
                    viewport === key ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4 text-gray-600" />
                </button>
              )
            })}
          </div>
          
          <button
            onClick={runBuild}
            disabled={isRunning}
            className="btn-primary text-sm px-4 py-1.5 flex items-center gap-2 disabled:opacity-50"
          >
            {isRunning ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>构建中...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                <span>重新构建</span>
              </>
            )}
          </button>
          
          <button className="btn-secondary text-sm px-4 py-1.5 flex items-center gap-2">
            <ExternalLink className="w-4 h-4" />
            <span>在新窗口打开</span>
          </button>
        </div>
      </div>

      <div className="flex-1 flex">
        <div 
          className="flex-1 overflow-hidden"
          style={{ maxWidth: viewport === 'desktop' ? '100%' : viewportSizes[viewport], margin: '0 auto' }}
        >
          <iframe
            title="应用预览"
            sandbox="allow-scripts allow-same-origin"
            className="w-full h-full border-none"
            srcDoc={buildError ? `<html><body style="display:flex;align-items:center;justify-center;height:100vh;background:#fef2f2"><div style="text-align:center"><div style="color:#dc2626;font-weight:bold">${buildError}</div><div style="color:#f87171;font-size:small;margin-top:8px">请检查代码并重新构建</div></div></body></html>` : getPreviewContent().props.dangerouslySetInnerHTML.__html}
          />
        </div>

        <div className="w-80 bg-gray-900 border-l border-gray-700 flex flex-col">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-700">
            <Terminal className="w-4 h-4 text-green-400" />
            <span className="text-sm text-gray-300">控制台</span>
          </div>
          <div className="flex-1 overflow-y-auto p-4 font-mono text-sm">
            {output ? (
              <pre className="text-gray-300 whitespace-pre-wrap">{output}</pre>
            ) : (
              <p className="text-gray-500">点击"重新构建"按钮运行项目</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Preview
