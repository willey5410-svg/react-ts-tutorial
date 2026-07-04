import { useState } from 'react'

interface AskClaudeButtonProps {
  chapterNumber: number
  chapterTitle: string
}

export function AskClaudeButton({ chapterNumber, chapterTitle }: AskClaudeButtonProps) {
  const [copied, setCopied] = useState(false)

  async function handleClick() {
    const question = `React / TypeScript チュートリアルの第${chapterNumber}章「${chapterTitle}」について質問があります。\n\n[ここにわからない箇所を書いてください]`

    try {
      await navigator.clipboard.writeText(question)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // クリップボードが使えない環境では、Claude側で直接入力してもらう
    }

    window.open('https://claude.ai/new', '_blank', 'noopener,noreferrer')
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="mb-6 flex items-center gap-2 rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-2 text-sm font-medium text-indigo-700 transition hover:bg-indigo-100 dark:border-indigo-800 dark:bg-indigo-950/40 dark:text-indigo-300 dark:hover:bg-indigo-950/70"
    >
      <span aria-hidden="true">💬</span>
      {copied ? '質問文をコピーしました。Claudeに貼り付けてください' : 'わからない箇所をClaudeに質問する'}
    </button>
  )
}
