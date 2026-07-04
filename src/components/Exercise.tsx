import { useState } from 'react'
import { Sandpack, type SandpackPredefinedTemplate } from '@codesandbox/sandpack-react'
import { useTheme } from '../lib/useTheme'

interface ExerciseProps {
  task: string
  files: Record<string, string>
  solutionFiles: Record<string, string>
  hints?: string[]
  visibleFiles?: string[]
  activeFile?: string
  editorHeight?: number
  showConsole?: boolean
  dependencies?: Record<string, string>
  template?: SandpackPredefinedTemplate
}

export function Exercise({
  task,
  files,
  solutionFiles,
  hints = [],
  visibleFiles,
  activeFile,
  editorHeight = 340,
  showConsole = false,
  dependencies,
  template = 'react-ts',
}: ExerciseProps) {
  const [showSolution, setShowSolution] = useState(false)
  const [openHints, setOpenHints] = useState(0)
  const { resolved } = useTheme()

  return (
    <div className="my-6 rounded-lg border-2 border-emerald-300 bg-emerald-50/50 p-4 dark:border-emerald-700 dark:bg-emerald-950/20">
      <div className="mb-3 flex items-center gap-2">
        <span className="rounded bg-emerald-600 px-2 py-0.5 text-xs font-bold text-white">
          練習問題
        </span>
      </div>
      <p className="mb-3 whitespace-pre-line text-sm leading-relaxed">{task}</p>

      <Sandpack
        template={template}
        theme={resolved}
        files={showSolution ? { ...files, ...solutionFiles } : files}
        customSetup={dependencies ? { dependencies } : undefined}
        options={{
          editorHeight,
          visibleFiles,
          activeFile,
          showTabs: (visibleFiles?.length ?? 0) > 1,
          showLineNumbers: true,
          showConsole,
          recompileMode: 'delayed',
          recompileDelay: 300,
        }}
      />

      {hints.length > 0 && (
        <div className="mt-3 space-y-2">
          {hints.slice(0, openHints + 1).map((hint, i) => (
            <p
              key={i}
              className="rounded bg-amber-100 p-2 text-sm dark:bg-amber-950/40"
            >
              <span className="font-semibold">ヒント {i + 1}: </span>
              {hint}
            </p>
          ))}
          {openHints < hints.length - 1 && (
            <button
              type="button"
              onClick={() => setOpenHints((n) => n + 1)}
              className="text-sm font-medium text-amber-700 underline dark:text-amber-400"
            >
              次のヒントを見る
            </button>
          )}
        </div>
      )}

      <button
        type="button"
        onClick={() => setShowSolution((v) => !v)}
        className="mt-3 rounded bg-slate-700 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-800 dark:bg-slate-600 dark:hover:bg-slate-500"
      >
        {showSolution ? '解答例を隠す' : '解答例を見る'}
      </button>
    </div>
  )
}
