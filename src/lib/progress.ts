const STORAGE_KEY = 'react-ts-tutorial:completed-chapters'

function readCompleted(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function getCompletedChapters(): string[] {
  return readCompleted()
}

export function isChapterCompleted(id: string): boolean {
  return readCompleted().includes(id)
}

export function setChapterCompleted(id: string, completed: boolean): string[] {
  const current = readCompleted()
  const next = completed
    ? Array.from(new Set([...current, id]))
    : current.filter((c) => c !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  return next
}
