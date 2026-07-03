import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { chapterMetas } from '../data/chapters'
import { getCompletedChapters } from '../lib/progress'

export function HomePage() {
  const [completed, setCompleted] = useState<string[]>([])

  useEffect(() => {
    setCompleted(getCompletedChapters())
  }, [])

  const basicChapters = chapterMetas.filter((c) => c.part === 'basic')
  const advancedChapters = chapterMetas.filter((c) => c.part === 'advanced')
  const progress = Math.round((completed.length / chapterMetas.length) * 100)

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">
        React / TypeScript 実践チュートリアル
      </h1>
      <p className="mt-3 text-slate-600 dark:text-slate-300">
        1つの「タスク管理アプリ」を少しずつ育てながら、React と TypeScript を基礎から学びます。
        各章は「解説 → その場で動かせるコード → 練習問題」の3点セットです。
      </p>

      <div className="mt-6 rounded-lg border border-slate-200 p-4 dark:border-slate-700">
        <div className="mb-2 flex items-center justify-between text-sm font-medium">
          <span>全体の進捗</span>
          <span>
            {completed.length} / {chapterMetas.length} 章 完了
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
          <div
            className="h-full rounded-full bg-indigo-600 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <section className="mt-8">
        <h2 className="mb-3 text-lg font-bold text-slate-900 dark:text-slate-50">
          基礎編
        </h2>
        <ChapterList chapters={basicChapters} completed={completed} />
      </section>

      <section className="mt-8">
        <h2 className="mb-1 text-lg font-bold text-slate-900 dark:text-slate-50">
          発展編
        </h2>
        <p className="mb-3 text-sm text-slate-500 dark:text-slate-400">
          基礎編を終えてからで大丈夫です。実務でよく使う要素を1つずつ追加していきます。
        </p>
        <ChapterList chapters={advancedChapters} completed={completed} />
      </section>
    </div>
  )
}

function ChapterList({
  chapters,
  completed,
}: {
  chapters: typeof chapterMetas
  completed: string[]
}) {
  return (
    <ul className="space-y-2">
      {chapters.map((c) => {
        const done = completed.includes(c.id)
        return (
          <li key={c.id}>
            <Link
              to={`/lesson/${c.id}`}
              className="flex items-start gap-3 rounded-lg border border-slate-200 p-3 transition hover:border-indigo-400 hover:bg-indigo-50/50 dark:border-slate-700 dark:hover:border-indigo-500 dark:hover:bg-indigo-950/20"
            >
              <span
                className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  done
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                }`}
              >
                {done ? '✓' : c.number}
              </span>
              <span>
                <span className="block font-semibold text-slate-900 dark:text-slate-50">
                  {c.title}
                </span>
                <span className="block text-sm text-slate-500 dark:text-slate-400">
                  {c.summary}
                </span>
              </span>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
