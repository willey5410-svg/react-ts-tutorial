import { useTheme } from '../lib/useTheme'

export function ThemeToggle() {
  const { resolved, setTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={() => setTheme(resolved === 'dark' ? 'light' : 'dark')}
      aria-label={resolved === 'dark' ? 'ライトモードに切り替える' : 'ダークモードに切り替える'}
      title={resolved === 'dark' ? 'ライトモードに切り替える' : 'ダークモードに切り替える'}
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
    >
      {resolved === 'dark' ? '☀️' : '🌙'}
    </button>
  )
}
