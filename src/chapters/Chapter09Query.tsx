import { ChapterLayout } from '../components/ChapterLayout'
import { Playground } from '../components/Playground'
import { Exercise } from '../components/Exercise'
import { Callout } from '../components/Callout'
import { Term } from '../components/Term'

const queryDeps = {
  '@tanstack/react-query': '^5.62.0',
}

const naiveFiles = {
  '/App.tsx': `import { useEffect, useState } from "react";
import { fetchTasks, type Task } from "./api";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTasks().then((data) => {
      setTasks(data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <p>読み込み中...</p>;

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>{task.title}</li>
      ))}
    </ul>
  );
}
`,
  '/api.ts': `export interface Task {
  id: number;
  title: string;
}

// 本来はサーバーへの fetch() ですが、ここでは疑似的なAPIとして再現しています
export function fetchTasks(): Promise<Task[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, title: "牛乳を買う" },
        { id: 2, title: "レポート提出" },
      ]);
    }, 800);
  });
}
`,
}

const queryFiles = {
  '/App.tsx': `import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TaskListView } from "./TaskListView";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TaskListView />
    </QueryClientProvider>
  );
}
`,
  '/TaskListView.tsx': `import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "./api";

export function TaskListView() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  if (isLoading) return <p>読み込み中...</p>;
  if (error) return <p>エラーが発生しました</p>;

  return (
    <ul>
      {data!.map((task) => (
        <li key={task.id}>{task.title}</li>
      ))}
    </ul>
  );
}
`,
  '/api.ts': `export interface Task {
  id: number;
  title: string;
}

export function fetchTasks(): Promise<Task[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, title: "牛乳を買う" },
        { id: 2, title: "レポート提出" },
      ]);
    }, 800);
  });
}
`,
}

const exerciseFiles = {
  ...queryFiles,
  '/TaskListView.tsx': `import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "./api";

export function TaskListView() {
  const { data, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  if (isLoading) return <p>読み込み中...</p>;
  if (error) return <p>エラーが発生しました</p>;

  return (
    <div>
      {/* 1. onClick={() => refetch()} のボタンを追加してください */}
      {/* 2. isFetching が true の間は「更新中...」も表示してください */}
      <ul>
        {data!.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}
`,
}

const exerciseSolutionFiles = {
  '/TaskListView.tsx': `import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "./api";

export function TaskListView() {
  const { data, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  if (isLoading) return <p>読み込み中...</p>;
  if (error) return <p>エラーが発生しました</p>;

  return (
    <div>
      <button onClick={() => refetch()}>更新</button>
      {isFetching && <p>更新中...</p>}
      <ul>
        {data!.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}
`,
}

export default function Chapter09Query() {
  return (
    <ChapterLayout id="09-query" number={9} title="TanStack Query でデータ取得">
      <p>
        サーバーからデータを取ってくるとき、<code>useEffect</code> +{' '}
        <code>fetch</code> の組み合わせをよく見かけます。動きはしますが、
        「読み込み中の状態」「エラー時の表示」「同じデータを何度も取りに行かない工夫（キャッシュ）」を
        自分で全部書くのは大変です。
      </p>
      <Playground files={naiveFiles} editorHeight={280} />

      <Callout variant="warning" title="useEffect + fetch の問題点">
        <p>
          このコードには、読み込み中に画面が切り替わってもリクエストが残る、失敗時の処理がない、
          同じデータを他の画面でも使うたびに再度取得してしまう、といった問題が隠れています。
          これらを1つずつ手で直していくのは現実的ではありません。
        </p>
      </Callout>

      <h2 className="mt-6 mb-2 text-lg font-bold">TanStack Query に任せる</h2>
      <p>
        <Term definition="サーバーから取得したデータの状態管理（読み込み中・エラー・キャッシュ）を肩代わりしてくれるライブラリ">
          TanStack Query
        </Term>
        を使うと、<code>useQuery</code> 1つで読み込み中・エラー・データの3状態がまとめて手に入ります。
        アプリ全体を <code>QueryClientProvider</code> で包む必要があります。
      </p>
      <Playground
        files={queryFiles}
        dependencies={queryDeps}
        visibleFiles={['/App.tsx', '/TaskListView.tsx', '/api.ts']}
        activeFile="/TaskListView.tsx"
        editorHeight={340}
      />

      <Callout variant="qa">
        <p>
          <strong>Q. queryKey とは何？</strong>
          <br />
          データを区別するための名前（キャッシュのラベル）です。同じ <code>queryKey</code>{' '}
          を使っている別のコンポーネントは、再度サーバーに取りに行かず、同じキャッシュ結果を共有します。
        </p>
      </Callout>

      <Exercise
        task="コメントの指示に従って、手動でデータを再取得する「更新」ボタンを追加してください。"
        files={exerciseFiles}
        solutionFiles={exerciseSolutionFiles}
        dependencies={queryDeps}
        visibleFiles={['/TaskListView.tsx', '/api.ts']}
        activeFile="/TaskListView.tsx"
        hints={[
          'useQuery は refetch という関数と isFetching という真偽値も返します。',
          '<button onClick={() => refetch()}>更新</button> と {isFetching && <p>更新中...</p>} を追加します。',
        ]}
        editorHeight={340}
      />
    </ChapterLayout>
  )
}
