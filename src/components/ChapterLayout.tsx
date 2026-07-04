import { useEffect, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { getAdjacentChapters } from '../data/chapters'
import { isChapterCompleted, setChapterCompleted } from '../lib/progress'
import { AskClaudeButton } from './AskClaudeButton'

interface ChapterLayoutProps {
  id: string
  number: number
  title: string
  children: ReactNode
}

export function ChapterLayout({ id, number, title, children }: ChapterLayoutProps) {
  const [completed, setCompleted] = useState(false)
  const { prev, next } = getAdjacentChapters(id)

  useEffect(() => {
    setCompleted(isChapterCompleted(id))
  }, [id])

  function toggleCompleted() {
    const wasCompleted = completed
    setCompleted(!wasCompleted)
    setChapterCompleted(id, !wasCompleted)
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-8">
      <p className="mb-1 text-sm font-medium text-indigo-600 dark:text-indigo-400">
        第{number}章
      </p>
      <h1 className="mb-4 text-2xl font-bold text-slate-900 dark:text-slate-50">
        {title}
      </h1>

      <AskClaudeButton chapterNumber={number} chapterTitle={title} />

      <div className="prose-content text-[15px] leading-relaxed text-slate-800 dark:text-slate-200">
        {children}
      </div>

      <div className="mt-10 flex items-center justify-center border-t border-slate-200 pt-6 dark:border-slate-700">
        <button
          type="button"
          onClick={toggleCompleted}
          className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
            completed
              ? 'bg-emerald-600 text-white hover:bg-emerald-700'
              : 'bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600'
          }`}
        >
          {completed ? '✓ この章は完了しました' : 'この章を完了にする'}
        </button>
      </div>

      <nav className="mt-6 flex items-center justify-between text-sm">
        {prev ? (
          <Link
            to={`/lesson/${prev.id}`}
            className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
          >
            ← 第{prev.number}章 {prev.title}
          </Link>
        ) : (
          <Link
            to="/"
            className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
          >
            ← トップに戻る
          </Link>
        )}
        {next && (
          <Link
            to={`/lesson/${next.id}`}
            className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
          >
            第{next.number}章 {next.title} →
          </Link>
        )}
      </nav>
    </article>
  )
}
