interface CodeBlockProps {
  code: string
  filename?: string
}

export function CodeBlock({ code, filename }: CodeBlockProps) {
  return (
    <div className="my-4 overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700">
      {filename && (
        <div className="border-b border-slate-200 bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
          {filename}
        </div>
      )}
      <pre className="overflow-x-auto bg-slate-900 p-4 text-sm text-slate-100">
        <code>{code}</code>
      </pre>
    </div>
  )
}
