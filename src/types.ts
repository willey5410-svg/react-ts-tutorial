export type ChapterPart = 'basic' | 'advanced'

export interface ChapterMeta {
  id: string
  number: number
  title: string
  part: ChapterPart
  summary: string
}
