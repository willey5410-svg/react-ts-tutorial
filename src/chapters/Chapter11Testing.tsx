import { ChapterLayout } from '../components/ChapterLayout'
import { Playground } from '../components/Playground'
import { Exercise } from '../components/Exercise'
import { Callout } from '../components/Callout'
import { Term } from '../components/Term'

const componentTestDeps = {
  react: '^18.2.0',
  'react-dom': '^18.2.0',
  '@testing-library/react': '^16.0.0',
}

const logicTestFiles = {
  '/taskReducer.ts': `export interface Task {
  id: number;
  title: string;
  done: boolean;
}

export type TaskAction =
  | { type: "toggle"; id: number }
  | { type: "add"; title: string };

export function taskReducer(tasks: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case "toggle":
      return tasks.map((task) =>
        task.id === action.id ? { ...task, done: !task.done } : task
      );
    case "add":
      return [...tasks, { id: Date.now(), title: action.title, done: false }];
    default:
      return tasks;
  }
}
`,
  '/taskReducer.test.ts': `import { taskReducer, type Task } from "./taskReducer";

const sampleTasks: Task[] = [
  { id: 1, title: "牛乳を買う", done: false },
  { id: 2, title: "レポート提出", done: true },
];

describe("taskReducer", () => {
  test("toggle は指定した id の done を反転する", () => {
    const result = taskReducer(sampleTasks, { type: "toggle", id: 1 });
    expect(result[0].done).toBe(true);
    expect(result[1].done).toBe(true); // 他のタスクは変わらない
  });

  test("add は新しいタスクを配列の末尾に追加する", () => {
    const result = taskReducer(sampleTasks, { type: "add", title: "洗濯する" });
    expect(result.length).toBe(3);
    expect(result[2].title).toBe("洗濯する");
    expect(result[2].done).toBe(false);
  });
});
`,
}

const componentTestFiles = {
  '/Counter.tsx': `import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}
`,
  '/Counter.test.tsx': `import { render, screen, fireEvent } from "@testing-library/react";
import { Counter } from "./Counter";

describe("Counter", () => {
  test("初期表示は count: 0", () => {
    render(<Counter />);
    expect(screen.getByText("count: 0")).toBeTruthy();
  });

  test("ボタンを押すと count が増える", () => {
    render(<Counter />);
    const button = screen.getByText("+1");
    fireEvent.click(button);
    expect(screen.getByText("count: 1")).toBeTruthy();
  });
});
`,
}

const exerciseFiles = {
  '/taskReducer.ts': `export interface Task {
  id: number;
  title: string;
  done: boolean;
}

export type TaskAction =
  | { type: "toggle"; id: number }
  | { type: "add"; title: string }
  | { type: "delete"; id: number };

export function taskReducer(tasks: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case "toggle":
      return tasks.map((task) =>
        task.id === action.id ? { ...task, done: !task.done } : task
      );
    case "add":
      return [...tasks, { id: Date.now(), title: action.title, done: false }];
    case "delete":
      return tasks.filter((task) => task.id !== action.id);
    default:
      return tasks;
  }
}
`,
  '/taskReducer.test.ts': `import { taskReducer, type Task } from "./taskReducer";

const sampleTasks: Task[] = [
  { id: 1, title: "牛乳を買う", done: false },
  { id: 2, title: "レポート提出", done: true },
];

describe("taskReducer", () => {
  test("toggle は指定した id の done を反転する", () => {
    const result = taskReducer(sampleTasks, { type: "toggle", id: 1 });
    expect(result[0].done).toBe(true);
  });

  // 1. "delete は指定した id のタスクを取り除く" というテストを追加してください
  //    taskReducer(sampleTasks, { type: "delete", id: 1 }) の結果、
  //    配列の長さが1になり、残っているのは id: 2 のタスクであることを確認します
});
`,
}

const exerciseSolutionFiles = {
  '/taskReducer.test.ts': `import { taskReducer, type Task } from "./taskReducer";

const sampleTasks: Task[] = [
  { id: 1, title: "牛乳を買う", done: false },
  { id: 2, title: "レポート提出", done: true },
];

describe("taskReducer", () => {
  test("toggle は指定した id の done を反転する", () => {
    const result = taskReducer(sampleTasks, { type: "toggle", id: 1 });
    expect(result[0].done).toBe(true);
  });

  test("delete は指定した id のタスクを取り除く", () => {
    const result = taskReducer(sampleTasks, { type: "delete", id: 1 });
    expect(result.length).toBe(1);
    expect(result[0].id).toBe(2);
  });
});
`,
}

export default function Chapter11Testing() {
  return (
    <ChapterLayout id="11-testing" number={11} title="テストを書いてみる">
      <p>
        「動かして目で確認したから大丈夫」というやり方は、アプリが大きくなるほど通用しなくなります。
        新しい機能を追加したときに、前に直したはずのバグが復活していないかを毎回手で確認するのは
        現実的ではありません。そこで
        <Term definition="コードが期待通りに動くことを、自動で確認するためのコード">
          テストコード
        </Term>
        を書きます。
      </p>

      <h2 className="mt-6 mb-2 text-lg font-bold">ロジックのテスト</h2>
      <p>
        最初にテストすべきは、画面の見た目ではなく「データをどう変換するか」というロジックです。
        第8章で作った <code>taskReducer</code> を例に、<code>describe</code>・
        <code>test</code>・<code>expect</code>{' '}
        を使ったテストの書き方を見てみましょう。下のプレビューでは、実行結果として
        緑（成功）・赤（失敗）のテスト結果が表示されます。
      </p>
      <Playground
        files={logicTestFiles}
        template="test-ts"
        visibleFiles={['/taskReducer.ts', '/taskReducer.test.ts']}
        activeFile="/taskReducer.test.ts"
        editorHeight={380}
      />

      <Callout variant="qa">
        <p>
          <strong>Q. describe と test の違いは？</strong>
          <br />
          <code>describe</code> は関連するテストをまとめるグループ名、<code>test</code>{' '}
          は1つ1つの具体的な確認項目です。<code>expect(実際の値).toBe(期待する値)</code>{' '}
          という形で、期待通りかどうかを表明します。
        </p>
      </Callout>

      <h2 className="mt-6 mb-2 text-lg font-bold">コンポーネントのテスト</h2>
      <p>
        画面の部品（コンポーネント）も、<code>@testing-library/react</code>{' '}
        を使うとテストできます。<code>render</code> で仮想的に描画し、
        <code>screen.getByText</code> で表示されている文字を探し、
        <code>fireEvent.click</code> でクリックを疑似的に発生させます。
      </p>
      <Playground
        files={componentTestFiles}
        template="test-ts"
        dependencies={componentTestDeps}
        visibleFiles={['/Counter.tsx', '/Counter.test.tsx']}
        activeFile="/Counter.test.tsx"
        editorHeight={380}
      />

      <Callout variant="warning" title="テストを書きすぎない">
        <p>
          全部を100%テストしようとする必要はありません。「壊れたら困る、複雑な計算やロジック」を
          優先してテストし、単純な見た目の確認まで無理に自動化しなくても実務としては十分です。
        </p>
      </Callout>

      <Exercise
        task={`taskReducer.test.ts のコメントの指示に従って、
delete アクションのテストケースを追加してください。`}
        files={exerciseFiles}
        solutionFiles={exerciseSolutionFiles}
        template="test-ts"
        visibleFiles={['/taskReducer.ts', '/taskReducer.test.ts']}
        activeFile="/taskReducer.test.ts"
        hints={[
          '上のtoggleのテストと同じ形で、test("...", () => { ... }) を追加します。',
          'taskReducer(sampleTasks, { type: "delete", id: 1 }) の結果の length と、残った要素の id を確認します。',
        ]}
        editorHeight={380}
      />
    </ChapterLayout>
  )
}
