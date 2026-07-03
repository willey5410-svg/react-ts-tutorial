import { ChapterLayout } from '../components/ChapterLayout'
import { Playground } from '../components/Playground'
import { Exercise } from '../components/Exercise'
import { Callout } from '../components/Callout'
import { Term } from '../components/Term'

const demoFiles = {
  '/App.tsx': `import { useState } from "react";
import { TaskList } from "./TaskList";
import type { Task } from "./types";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "牛乳を買う", done: false },
    { id: 2, title: "レポート提出", done: true },
  ]);

  function handleToggle(id: number) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }

  return (
    <div>
      <h1>タスク一覧</h1>
      <TaskList tasks={tasks} onToggle={handleToggle} />
    </div>
  );
}
`,
  '/types.ts': `export interface Task {
  id: number;
  title: string;
  done: boolean;
}
`,
  '/TaskList.tsx': `import type { Task } from "./types";
import { TaskItem } from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: number) => void;
}

export function TaskList({ tasks, onToggle }: TaskListProps) {
  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} />
      ))}
    </ul>
  );
}
`,
  '/TaskItem.tsx': `import type { Task } from "./types";

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
}

export function TaskItem({ task, onToggle }: TaskItemProps) {
  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={task.done}
          onChange={() => onToggle(task.id)}
        />
        {task.title}
      </label>
    </li>
  );
}
`,
}

const exerciseFiles = {
  '/App.tsx': `import { useState } from "react";
import { TaskList } from "./TaskList";
import type { Task } from "./types";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "牛乳を買う", done: false },
    { id: 2, title: "レポート提出", done: true },
  ]);

  function handleToggle(id: number) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }

  // 1. handleDelete という関数を作ってください
  //    tasks から id が一致するタスクを取り除いた新しい配列を setTasks してください
  //    ヒント: tasks.filter((task) => task.id !== id)

  return (
    <div>
      <h1>タスク一覧</h1>
      {/* 2. TaskList に onDelete={handleDelete} を渡してください */}
      <TaskList tasks={tasks} onToggle={handleToggle} />
    </div>
  );
}
`,
  '/types.ts': `export interface Task {
  id: number;
  title: string;
  done: boolean;
}
`,
  '/TaskList.tsx': `import type { Task } from "./types";
import { TaskItem } from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: number) => void;
  // 3. onDelete: (id: number) => void; を props に追加してください
}

export function TaskList({ tasks, onToggle }: TaskListProps) {
  return (
    <ul>
      {tasks.map((task) => (
        // 4. TaskItem に onDelete を渡してください
        <TaskItem key={task.id} task={task} onToggle={onToggle} />
      ))}
    </ul>
  );
}
`,
  '/TaskItem.tsx': `import type { Task } from "./types";

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
  // 5. onDelete: (id: number) => void; を props に追加してください
}

export function TaskItem({ task, onToggle }: TaskItemProps) {
  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={task.done}
          onChange={() => onToggle(task.id)}
        />
        {task.title}
      </label>
      {/* 6. onDelete(task.id) を呼び出す削除ボタンを追加してください */}
    </li>
  );
}
`,
}

const exerciseSolutionFiles = {
  '/App.tsx': `import { useState } from "react";
import { TaskList } from "./TaskList";
import type { Task } from "./types";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "牛乳を買う", done: false },
    { id: 2, title: "レポート提出", done: true },
  ]);

  function handleToggle(id: number) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }

  function handleDelete(id: number) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  return (
    <div>
      <h1>タスク一覧</h1>
      <TaskList tasks={tasks} onToggle={handleToggle} onDelete={handleDelete} />
    </div>
  );
}
`,
  '/TaskList.tsx': `import type { Task } from "./types";
import { TaskItem } from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export function TaskList({ tasks, onToggle, onDelete }: TaskListProps) {
  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  );
}
`,
  '/TaskItem.tsx': `import type { Task } from "./types";

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={task.done}
          onChange={() => onToggle(task.id)}
        />
        {task.title}
      </label>
      <button onClick={() => onDelete(task.id)}>削除</button>
    </li>
  );
}
`,
}

export default function Chapter06Split() {
  return (
    <ChapterLayout id="06-split" number={6} title="コンポーネント分割">
      <p>
        1つのコンポーネントに全部のJSXを詰め込んでいくと、すぐに読みづらくなります。
        意味のあるかたまりごとに、別のコンポーネントに切り出しましょう。ここで、
        これから育てていく「タスク管理アプリ」の基本の形を作ります。
      </p>

      <h2 className="mt-6 mb-2 text-lg font-bold">ファイルを分ける</h2>
      <p>
        <code>App.tsx</code>・<code>TaskList.tsx</code>・<code>TaskItem.tsx</code>{' '}
        ・<code>types.ts</code> の4つのファイルに分割しました。上のタブを切り替えて、
        それぞれの中身を見比べてみてください。
      </p>
      <p>
        <code>Task</code> という
        <Term definition="複数のファイルで使う型を1箇所にまとめて定義したもの">
          型定義
        </Term>
        を <code>types.ts</code> にまとめておくと、複数のファイルから同じ形を参照できます。
      </p>
      <Playground
        files={demoFiles}
        visibleFiles={['/App.tsx', '/TaskList.tsx', '/TaskItem.tsx', '/types.ts']}
        activeFile="/App.tsx"
        editorHeight={380}
      />

      <Callout variant="qa">
        <p>
          <strong>Q. onToggle はなぜ App の中で定義するの？</strong>
          <br />
          タスクの一覧（state）を持っているのは <code>App</code> だけです。
          <code>TaskItem</code> は自分がどのタスクなのかしか知らないので、
          「クリックされたことをAppに伝える」ための関数を props として受け取ります。
          この「子から親に出来事を伝える」ためにコールバック関数をpropsで渡すパターンは、
          Reactでとてもよく使われます。
        </p>
      </Callout>

      <Exercise
        task={`各ファイルのコメントの指示に従って、
タスクを削除する機能（onDelete）を追加してください。
App → TaskList → TaskItem の順で props をバケツリレーのように渡していきます。`}
        files={exerciseFiles}
        solutionFiles={exerciseSolutionFiles}
        visibleFiles={['/App.tsx', '/TaskList.tsx', '/TaskItem.tsx', '/types.ts']}
        activeFile="/App.tsx"
        hints={[
          'onDelete の型は onToggle と同じ (id: number) => void です。3箇所すべてに同じ形で追加します。',
          'handleDelete の中身は setTasks(tasks.filter((task) => task.id !== id)) です。',
        ]}
        editorHeight={400}
      />
    </ChapterLayout>
  )
}
