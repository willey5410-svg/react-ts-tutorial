import type { ReactNode } from 'react'

interface CalloutProps {
  variant?: 'info' | 'warning' | 'qa'
  title?: string
  children: ReactNode
}

const styles = {
  info: 'border-sky-300 bg-sky-50 dark:border-sky-700 dark:bg-sky-950/30',
  warning:
    'border-rose-300 bg-rose-50 dark:border-rose-700 dark:bg-rose-950/30',
  qa: 'border-violet-300 bg-violet-50 dark:border-violet-700 dark:bg-violet-950/30',
}

const defaultTitles = {
  info: 'メモ',
  warning: 'よくあるエラー',
  qa: 'つまずきポイントQ&A',
}

export function Callout({ variant = 'info', title, children }: CalloutProps) {
  return (
    <div className={`my-4 rounded-lg border p-4 text-sm ${styles[variant]}`}>
      <p className="mb-1 font-bold">{title ?? defaultTitles[variant]}</p>
      <div className="leading-relaxed [&>p]:mb-2 [&>p:last-child]:mb-0">
        {children}
      </div>
    </div>
  )
}
