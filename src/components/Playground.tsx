import { Sandpack, type SandpackPredefinedTemplate } from '@codesandbox/sandpack-react'

interface PlaygroundProps {
  files: Record<string, string>
  editorHeight?: number
  visibleFiles?: string[]
  activeFile?: string
  showConsole?: boolean
  dependencies?: Record<string, string>
  template?: SandpackPredefinedTemplate
}

export function Playground({
  files,
  editorHeight = 320,
  visibleFiles,
  activeFile,
  showConsole = false,
  dependencies,
  template = 'react-ts',
}: PlaygroundProps) {
  return (
    <div className="my-4 overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700">
      <Sandpack
        template={template}
        theme="auto"
        files={files}
        customSetup={dependencies ? { dependencies } : undefined}
        options={{
          editorHeight,
          visibleFiles,
          activeFile,
          showTabs: (visibleFiles?.length ?? 0) > 1,
          showLineNumbers: true,
          showConsole,
        }}
      />
    </div>
  )
}
