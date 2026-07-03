import type { ChapterMeta } from '../types'

export const chapterMetas: ChapterMeta[] = [
  {
    id: '00-prep',
    number: 0,
    title: '準備運動',
    part: 'basic',
    summary: 'React に入る前に、変数・関数・配列・オブジェクトと「コンポーネント」という考え方を言葉で確認します。',
  },
  {
    id: '01-first-component',
    number: 1,
    title: 'はじめてのコンポーネント表示',
    part: 'basic',
    summary: 'JSX の書き方に慣れながら、画面に文字を表示するだけのコンポーネントを作ります。',
  },
  {
    id: '02-types',
    number: 2,
    title: 'TypeScript の型を書いてみる',
    part: 'basic',
    summary: 'string・number・boolean と interface の最小限を、実際に手を動かして覚えます。',
  },
  {
    id: '03-props',
    number: 3,
    title: 'props でデータを渡す',
    part: 'basic',
    summary: '親コンポーネントから子コンポーネントへ、型付きの props でデータを渡します。',
  },
  {
    id: '04-state',
    number: 4,
    title: 'useState で状態を持つ',
    part: 'basic',
    summary: 'クリックのたびに画面が変わる仕組みを、useState を使って作ります。',
  },
  {
    id: '05-events',
    number: 5,
    title: 'イベント処理',
    part: 'basic',
    summary: 'クリックや入力（onClick / onChange）を型付きで扱う方法を学びます。',
  },
  {
    id: '06-split',
    number: 6,
    title: 'コンポーネント分割',
    part: 'basic',
    summary: 'タスク一覧アプリを題材に、TaskList / TaskItem へコンポーネントを分割します。',
  },
  {
    id: '07-forms',
    number: 7,
    title: 'フォームとバリデーション',
    part: 'advanced',
    summary: 'react-hook-form と zod で、タスク追加フォームに入力チェックを付けます。',
  },
  {
    id: '08-reducer-context',
    number: 8,
    title: 'useReducer / Context で状態共有',
    part: 'advanced',
    summary: '複数コンポーネントにまたがるタスクの状態を、useReducer と Context でまとめます。',
  },
  {
    id: '09-query',
    number: 9,
    title: 'TanStack Query でデータ取得',
    part: 'advanced',
    summary: 'サーバー（モックAPI）からタスクを取得し、キャッシュやローディング状態を扱います。',
  },
  {
    id: '10-router',
    number: 10,
    title: 'React Router でページ遷移',
    part: 'advanced',
    summary: 'タスクの一覧ページと詳細ページを、React Router で行き来できるようにします。',
  },
  {
    id: '11-testing',
    number: 11,
    title: 'テストを書いてみる',
    part: 'advanced',
    summary: 'Vitest と Testing Library で、コンポーネントの動作をテストで確かめます。',
  },
  {
    id: '12-deploy',
    number: 12,
    title: '仕上げ・デプロイ',
    part: 'advanced',
    summary: 'ESLint / 型チェックを CI で回す考え方と、Vercel へのデプロイまでを一通り確認します。',
  },
]

export function getChapterMeta(id: string): ChapterMeta | undefined {
  return chapterMetas.find((c) => c.id === id)
}

export function getAdjacentChapters(id: string): {
  prev?: ChapterMeta
  next?: ChapterMeta
} {
  const index = chapterMetas.findIndex((c) => c.id === id)
  if (index === -1) return {}
  return {
    prev: chapterMetas[index - 1],
    next: chapterMetas[index + 1],
  }
}
