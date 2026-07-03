import { ChapterLayout } from '../components/ChapterLayout'
import { Playground } from '../components/Playground'
import { Exercise } from '../components/Exercise'
import { Callout } from '../components/Callout'
import { Term } from '../components/Term'

const clickFiles = {
  '/App.tsx': `export default function App() {
  function handleClick() {
    alert("クリックされました！");
  }

  return <button onClick={handleClick}>押してみて</button>;
}
`,
}

const inputFiles = {
  '/App.tsx': `import { useState } from "react";

export default function App() {
  const [text, setText] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setText(e.target.value);
  }

  return (
    <div>
      <input value={text} onChange={handleChange} />
      <p>入力中の文字: {text}</p>
    </div>
  );
}
`,
}

const listFiles = {
  '/App.tsx': `import { useState } from "react";

export default function App() {
  const [text, setText] = useState("");
  const [items, setItems] = useState<string[]>([]);

  function handleAdd() {
    if (text === "") return;
    setItems([...items, text]);
    setText("");
  }

  return (
    <div>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="タスクを入力"
      />
      <button onClick={handleAdd}>追加</button>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
`,
}

const exerciseFiles = {
  '/App.tsx': `import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);

  // 1. handleReset という関数を作り、count を 0 に戻す処理を書いてください

  return (
    <div>
      <p>クリック回数: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      {/* 2. handleReset を呼び出す「リセット」ボタンを追加してください */}
    </div>
  );
}
`,
}

const exerciseSolutionFiles = {
  '/App.tsx': `import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);

  function handleReset() {
    setCount(0);
  }

  return (
    <div>
      <p>クリック回数: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={handleReset}>リセット</button>
    </div>
  );
}
`,
}

export default function Chapter05Events() {
  return (
    <ChapterLayout id="05-events" number={5} title="イベント処理">
      <p>
        ボタンのクリックや、入力欄への文字入力のような「ユーザーの操作」を
        <Term definition="クリックや入力など、ユーザーの操作をきっかけに発生する出来事">
          イベント
        </Term>
        と呼びます。前の章で少し使った <code>onClick</code> を、もう少し詳しく見ていきます。
      </p>

      <h2 className="mt-6 mb-2 text-lg font-bold">onClick</h2>
      <p>
        <code>onClick</code> に関数を渡すと、ボタンが押されたときにその関数が実行されます。
      </p>
      <Playground files={clickFiles} editorHeight={200} />

      <h2 className="mt-6 mb-2 text-lg font-bold">onChange と入力欄</h2>
      <p>
        入力欄（<code>&lt;input&gt;</code>）の中身が変わるたびに呼ばれるのが{' '}
        <code>onChange</code> です。<code>value={'{text}'}</code> と{' '}
        <code>onChange</code> をセットで使い、state と入力欄の中身を常に一致させる書き方を
        「<Term definition="入力欄の値をReactのstateで管理し、常に同期させる書き方">
          制御されたコンポーネント
        </Term>
        」と呼びます。 <code>e: React.ChangeEvent&lt;HTMLInputElement&gt;</code>{' '}
        は「input要素で起きた変化イベント」という型です。
      </p>
      <Playground files={inputFiles} editorHeight={260} />

      <Callout variant="qa">
        <p>
          <strong>Q. onChange の型を毎回書くのは面倒...</strong>
          <br />
          <code>onChange={'{(e) => setText(e.target.value)}'}</code>{' '}
          のようにその場で書く（インラインの矢印関数）場合は、TypeScriptが自動で型を推測してくれるので、
          型を書かなくても大丈夫です。関数を外に出して名前を付けるときだけ、型を書く必要があります。
        </p>
      </Callout>

      <h2 className="mt-6 mb-2 text-lg font-bold">入力と一覧表示を組み合わせる</h2>
      <p>
        ここからは、これから作る「タスク管理アプリ」の元になる形です。入力した文字を配列に追加し、
        <code>map</code> で一覧表示しています。<code>key</code> はReactがリストの各要素を
        区別するための目印で、配列を <code>map</code> するときは必ず指定します。
      </p>
      <Playground files={listFiles} editorHeight={340} />

      <Exercise
        task="コメントの指示に従って、カウントを0に戻す「リセット」ボタンを追加してください。"
        files={exerciseFiles}
        solutionFiles={exerciseSolutionFiles}
        hints={[
          'handleReset の中身は setCount(0) だけです。',
          '<button onClick={handleReset}>リセット</button> を追加します。',
        ]}
        editorHeight={280}
      />
    </ChapterLayout>
  )
}
