import { ChapterLayout } from '../components/ChapterLayout'
import { Playground } from '../components/Playground'
import { Exercise } from '../components/Exercise'
import { Callout } from '../components/Callout'
import { Term } from '../components/Term'

const routerDeps = {
  'react-router-dom': '^7.0.0',
}

const routerFiles = {
  '/App.tsx': `import { MemoryRouter, Routes, Route } from "react-router-dom";
import { TaskListPage } from "./TaskListPage";
import { TaskDetailPage } from "./TaskDetailPage";

export default function App() {
  return (
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route path="/" element={<TaskListPage />} />
        <Route path="/tasks/:id" element={<TaskDetailPage />} />
      </Routes>
    </MemoryRouter>
  );
}
`,
  '/tasks.ts': `export interface Task {
  id: number;
  title: string;
  detail: string;
}

export const tasks: Task[] = [
  { id: 1, title: "牛乳を買う", detail: "スーパーで低脂肪乳を2本" },
  { id: 2, title: "レポート提出", detail: "金曜17時までにメールで提出" },
];
`,
  '/TaskListPage.tsx': `import { Link } from "react-router-dom";
import { tasks } from "./tasks";

export function TaskListPage() {
  return (
    <div>
      <h1>タスク一覧</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <Link to={"/tasks/" + task.id}>{task.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
`,
  '/TaskDetailPage.tsx': `import { useParams } from "react-router-dom";
import { tasks } from "./tasks";

export function TaskDetailPage() {
  const { id } = useParams();
  const task = tasks.find((t) => t.id === Number(id));

  if (!task) return <p>タスクが見つかりません</p>;

  return (
    <div>
      <h1>{task.title}</h1>
      <p>{task.detail}</p>
    </div>
  );
}
`,
}

const exerciseFiles = {
  ...routerFiles,
  '/TaskDetailPage.tsx': `import { useParams } from "react-router-dom";
import { tasks } from "./tasks";

export function TaskDetailPage() {
  const { id } = useParams();
  const task = tasks.find((t) => t.id === Number(id));

  if (!task) return <p>タスクが見つかりません</p>;

  return (
    <div>
      <h1>{task.title}</h1>
      <p>{task.detail}</p>
      {/* 1. <Link to="/">一覧に戻る</Link> を追加してください */}
    </div>
  );
}
`,
}

const exerciseSolutionFiles = {
  '/TaskDetailPage.tsx': `import { Link, useParams } from "react-router-dom";
import { tasks } from "./tasks";

export function TaskDetailPage() {
  const { id } = useParams();
  const task = tasks.find((t) => t.id === Number(id));

  if (!task) return <p>タスクが見つかりません</p>;

  return (
    <div>
      <h1>{task.title}</h1>
      <p>{task.detail}</p>
      <Link to="/">一覧に戻る</Link>
    </div>
  );
}
`,
}

export default function Chapter10Router() {
  return (
    <ChapterLayout id="10-router" number={10} title="React Router でページ遷移">
      <p>
        ここまでは1つの画面の中だけで完結していましたが、実際のアプリでは
        「一覧ページ」「詳細ページ」のように複数の画面を行き来します。React には標準の
        ページ遷移機能がないため、<code>react-router-dom</code> というライブラリを使うのが定番です。
      </p>

      <Callout variant="info">
        <p>
          このプレイグラウンドでは、iframeの中で正しく動かすために{' '}
          <code>BrowserRouter</code> の代わりに <code>MemoryRouter</code>{' '}
          を使っています。実際にデプロイするアプリでは、通常のブラウザURLと連動する{' '}
          <code>BrowserRouter</code> を使います。
        </p>
      </Callout>

      <h2 className="mt-6 mb-2 text-lg font-bold">Routes と Route</h2>
      <p>
        <code>&lt;Route path="/tasks/:id" element=... /&gt;</code>{' '}
        のように、URLのパターンとそこで表示するコンポーネントを対応付けます。
        <code>:id</code> の部分は
        <Term definition="URLの一部を変数として受け取れるようにした書き方">動的パラメータ</Term>
        と呼ばれ、<code>useParams()</code> で読み取れます。
      </p>
      <Playground
        files={routerFiles}
        dependencies={routerDeps}
        visibleFiles={['/App.tsx', '/TaskListPage.tsx', '/TaskDetailPage.tsx', '/tasks.ts']}
        activeFile="/TaskListPage.tsx"
        editorHeight={380}
      />

      <p>
        プレビュー画面でタスク名をクリックすると、詳細ページに切り替わります。
        <code>Link</code> は <code>&lt;a&gt;</code> タグの代わりに使うコンポーネントで、
        ページ全体の再読み込みをせずに画面を切り替えてくれます。
      </p>

      <Callout variant="qa">
        <p>
          <strong>Q. &lt;a href="..."&gt; ではダメなの？</strong>
          <br />
          <code>&lt;a&gt;</code> タグはブラウザにページの再読み込みをさせてしまい、
          Reactアプリの状態がリセットされます。<code>Link</code>{' '}
          はReact Routerの管理下で画面だけを切り替えるので、アプリの状態を保ったまま遷移できます。
        </p>
      </Callout>

      <Exercise
        task="コメントの指示に従って、詳細ページから一覧ページへ戻るリンクを追加してください。"
        files={exerciseFiles}
        solutionFiles={exerciseSolutionFiles}
        dependencies={routerDeps}
        visibleFiles={['/TaskDetailPage.tsx']}
        activeFile="/TaskDetailPage.tsx"
        hints={[
          'react-router-dom から Link をインポートします。',
          '<Link to="/">一覧に戻る</Link> を追加します。',
        ]}
        editorHeight={320}
      />
    </ChapterLayout>
  )
}
