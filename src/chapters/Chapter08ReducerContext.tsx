import { ChapterLayout } from '../components/ChapterLayout'
import { Playground } from '../components/Playground'
import { Exercise } from '../components/Exercise'
import { Callout } from '../components/Callout'
import { Term } from '../components/Term'

const demoFiles = {
  '/App.tsx': `import { TaskProvider } from "./TaskContext";
import { TaskList } from "./TaskList";

export default function App() {
  return (
    <TaskProvider>
      <h1>タスク一覧</h1>
      <TaskList />
    </TaskProvider>
  );
}
`,
  '/types.ts': `export interface Task {
  id: number;
  title: string;
  done: boolean;
}

export type TaskAction =
  | { type: "toggle"; id: number }
  | { type: "delete"; id: number };
`,
  '/TaskContext.tsx': `import { createContext, useContext, useReducer, type ReactNode } from "react";
import type { Task, TaskAction } from "./types";

function taskReducer(tasks: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case "toggle":
      return tasks.map((task) =>
        task.id === action.id ? { ...task, done: !task.done } : task
      );
    case "delete":
      return tasks.filter((task) => task.id !== action.id);
    default:
      return tasks;
  }
}

const initialTasks: Task[] = [
  { id: 1, title: "牛乳を買う", done: false },
  { id: 2, title: "レポート提出", done: true },
];

interface TaskContextValue {
  tasks: Task[];
  dispatch: React.Dispatch<TaskAction>;
}

const TaskContext = createContext<TaskContextValue | null>(null);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks);
  return (
    <TaskContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks は TaskProvider の内側で使ってください");
  }
  return context;
}
`,
  '/TaskList.tsx': `import { useTasks } from "./TaskContext";

export function TaskList() {
  const { tasks, dispatch } = useTasks();

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <label>
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => dispatch({ type: "toggle", id: task.id })}
            />
            {task.title}
          </label>
          <button onClick={() => dispatch({ type: "delete", id: task.id })}>
            削除
          </button>
        </li>
      ))}
    </ul>
  );
}
`,
}

const exerciseFiles = {
  ...demoFiles,
  '/App.tsx': `import { TaskProvider } from "./TaskContext";
import { TaskList } from "./TaskList";
import { AddTaskForm } from "./AddTaskForm";

export default function App() {
  return (
    <TaskProvider>
      <h1>タスク一覧</h1>
      <AddTaskForm />
      <TaskList />
    </TaskProvider>
  );
}
`,
  '/types.ts': `export interface Task {
  id: number;
  title: string;
  done: boolean;
}

export type TaskAction =
  | { type: "toggle"; id: number }
  | { type: "delete"; id: number };
  // 1. { type: "add"; title: string } を追加してください
`,
  '/TaskContext.tsx': `import { createContext, useContext, useReducer, type ReactNode } from "react";
import type { Task, TaskAction } from "./types";

function taskReducer(tasks: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case "toggle":
      return tasks.map((task) =>
        task.id === action.id ? { ...task, done: !task.done } : task
      );
    case "delete":
      return tasks.filter((task) => task.id !== action.id);
    // 2. case "add" を追加してください
    //    新しい task ({ id: Date.now(), title: action.title, done: false }) を
    //    配列の末尾に追加した新しい配列を返します
    default:
      return tasks;
  }
}

const initialTasks: Task[] = [
  { id: 1, title: "牛乳を買う", done: false },
  { id: 2, title: "レポート提出", done: true },
];

interface TaskContextValue {
  tasks: Task[];
  dispatch: React.Dispatch<TaskAction>;
}

const TaskContext = createContext<TaskContextValue | null>(null);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks);
  return (
    <TaskContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks は TaskProvider の内側で使ってください");
  }
  return context;
}
`,
  '/AddTaskForm.tsx': `import { useState } from "react";
import { useTasks } from "./TaskContext";

export function AddTaskForm() {
  const [title, setTitle] = useState("");
  const { dispatch } = useTasks();

  function handleAdd() {
    if (title === "") return;
    // 3. dispatch({ type: "add", title }) を呼び出してください
    setTitle("");
  }

  return (
    <div>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <button onClick={handleAdd}>追加</button>
    </div>
  );
}
`,
}

const exerciseSolutionFiles = {
  '/types.ts': `export interface Task {
  id: number;
  title: string;
  done: boolean;
}

export type TaskAction =
  | { type: "toggle"; id: number }
  | { type: "delete"; id: number }
  | { type: "add"; title: string };
`,
  '/TaskContext.tsx': `import { createContext, useContext, useReducer, type ReactNode } from "react";
import type { Task, TaskAction } from "./types";

function taskReducer(tasks: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case "toggle":
      return tasks.map((task) =>
        task.id === action.id ? { ...task, done: !task.done } : task
      );
    case "delete":
      return tasks.filter((task) => task.id !== action.id);
    case "add":
      return [...tasks, { id: Date.now(), title: action.title, done: false }];
    default:
      return tasks;
  }
}

const initialTasks: Task[] = [
  { id: 1, title: "牛乳を買う", done: false },
  { id: 2, title: "レポート提出", done: true },
];

interface TaskContextValue {
  tasks: Task[];
  dispatch: React.Dispatch<TaskAction>;
}

const TaskContext = createContext<TaskContextValue | null>(null);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks);
  return (
    <TaskContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks は TaskProvider の内側で使ってください");
  }
  return context;
}
`,
  '/AddTaskForm.tsx': `import { useState } from "react";
import { useTasks } from "./TaskContext";

export function AddTaskForm() {
  const [title, setTitle] = useState("");
  const { dispatch } = useTasks();

  function handleAdd() {
    if (title === "") return;
    dispatch({ type: "add", title });
    setTitle("");
  }

  return (
    <div>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <button onClick={handleAdd}>追加</button>
    </div>
  );
}
`,
}

export default function Chapter08ReducerContext() {
  return (
    <ChapterLayout id="08-reducer-context" number={8} title="useReducer / Context で状態共有">
      <p>
        第6章では、タスクの操作関数を <code>App → TaskList → TaskItem</code>{' '}
        と props でバケツリレーしていました。階層が深くなると、途中のコンポーネントは
        使わないのに props を受け取って渡すだけの中継ぎになってしまいます。この問題を解決するのが
        <Term definition="コンポーネントツリーのどこからでも直接データにアクセスできる仕組み">
          Context
        </Term>
        です。
      </p>

      <h2 className="mt-6 mb-2 text-lg font-bold">useReducer で操作をまとめる</h2>
      <p>
        タスクの操作が「切り替え」「削除」「追加」と増えてくると、<code>useState</code>{' '}
        の更新処理があちこちに散らばりがちです。
        <Term definition="「何をするか(action)」を渡すと、現在の状態から次の状態を計算してくれる関数を使ったstate管理">
          useReducer
        </Term>
        を使うと、「どんな操作が起きたか」を <code>action</code> として渡し、
        <code>taskReducer</code> という1つの関数に更新ロジックを集約できます。
      </p>

      <h2 className="mt-6 mb-2 text-lg font-bold">Context で配る</h2>
      <p>
        <code>createContext</code> でContextを作り、<code>TaskProvider</code>{' '}
        でツリー全体を包みます。中の各コンポーネントは <code>useTasks()</code>{' '}
        （自作のカスタムフック）を呼ぶだけで、propsを一切受け取らずにタスクの状態と{' '}
        <code>dispatch</code> にアクセスできます。
      </p>
      <Playground
        files={demoFiles}
        visibleFiles={['/App.tsx', '/TaskContext.tsx', '/TaskList.tsx', '/types.ts']}
        activeFile="/TaskContext.tsx"
        editorHeight={420}
      />

      <Callout variant="qa">
        <p>
          <strong>Q. Context はどんな時にも使うべき？</strong>
          <br />
          いいえ。1〜2階層のpropsの受け渡しなら、そのままpropsで渡す方がシンプルです。
          「多くのコンポーネントから同じデータに触る必要がある」ときに限って使うのが実務での定石です。
        </p>
      </Callout>

      <Exercise
        task={`各ファイルのコメントの指示に従って、
タスクを追加する "add" アクションを reducer と AddTaskForm に実装してください。`}
        files={exerciseFiles}
        solutionFiles={exerciseSolutionFiles}
        visibleFiles={['/AddTaskForm.tsx', '/TaskContext.tsx', '/types.ts', '/App.tsx']}
        activeFile="/TaskContext.tsx"
        hints={[
          'types.ts の TaskAction に { type: "add"; title: string } を追加します。',
          'taskReducer の add ケースでは [...tasks, { id: Date.now(), title: action.title, done: false }] を返します。',
        ]}
        editorHeight={420}
      />
    </ChapterLayout>
  )
}
