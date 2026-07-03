import { Suspense } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { chapterComponents } from '../chapters'
import { getChapterMeta } from '../data/chapters'

export function LessonPage() {
  const { chapterId } = useParams<{ chapterId: string }>()
  const meta = chapterId ? getChapterMeta(chapterId) : undefined
  const ChapterComponent = chapterId ? chapterComponents[chapterId] : undefined

  if (!meta || !ChapterComponent) {
    return <Navigate to="/" replace />
  }

  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-3xl px-4 py-10 text-slate-500">
          読み込み中...
        </div>
      }
    >
      <ChapterComponent />
    </Suspense>
  )
}
