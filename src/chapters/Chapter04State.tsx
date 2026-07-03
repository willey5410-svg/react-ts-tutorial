import { ChapterLayout } from '../components/ChapterLayout'
import { Playground } from '../components/Playground'
import { Exercise } from '../components/Exercise'
import { Callout } from '../components/Callout'
import { Term } from '../components/Term'

const counterFiles = {
  '/App.tsx': `import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>今の数: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}
`,
}

const mistakeFiles = {
  '/App.tsx': `import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);

  function handleClick() {
    // これは動きません（画面が更新されない）
    // count = count + 1;
  }

  return (
    <div>
      <p>今の数: {count}</p>
      <button onClick={handleClick}>+1（まだ動きません）</button>
      <button onClick={() => setCount(count + 1)}>+1（こちらは動きます）</button>
    </div>
  );
}
`,
}

const exerciseFiles = {
  '/App.tsx': `import { useState } from "react";

export default function App() {
  // 1. liked という boolean の state を useState(false) で作ってください
  //    変数名は liked、更新関数は setLiked にしましょう

  return (
    <div>
      {/* 2. liked が true なら "♥ いいね済み"、false なら "♡ いいね" と表示 */}

      {/* 3. ボタンを押すたびに liked の値を反転させる */}
      <button>ボタン</button>
    </div>
  );
}
`,
}

const exerciseSolutionFiles = {
  '/App.tsx': `import { useState } from "react";

export default function App() {
  const [liked, setLiked] = useState(false);

  return (
    <div>
      <p>{liked ? "♥ いいね済み" : "♡ いいね"}</p>
      <button onClick={() => setLiked(!liked)}>ボタン</button>
    </div>
  );
}
`,
}

export default function Chapter04State() {
  return (
    <ChapterLayout id="04-state" number={4} title="useState で状態を持つ">
      <p>
        ここまでの例は、一度画面に表示されたら内容が変わりませんでした。ボタンを押すと
        数字が増える、入力欄に文字を打つと表示が変わる——そんな「変化」を扱うために使うのが
        <Term definition="コンポーネントが自分自身で持つ、変化するデータ">state</Term>
        です。
      </p>

      <h2 className="mt-6 mb-2 text-lg font-bold">useState の基本</h2>
      <p>
        <code>const [count, setCount] = useState(0);</code> という書き方を覚えましょう。
        <code>count</code> は「今の値」、<code>setCount</code> は「値を変更するための関数」です。
        <code>setCount(...)</code> を呼ぶと、Reactが自動的に画面を作り直してくれます
        （これを<Term definition="stateが変わったときにReactが画面を作り直すこと">再レンダリング</Term>
        と呼びます）。
      </p>
      <Playground files={counterFiles} editorHeight={260} />

      <p>
        右側のプレビューで「+1」ボタンを実際に押してみてください。押すたびに数字が増えます。
      </p>

      <Callout variant="warning" title="よくある間違い">
        <p>
          <code>count = count + 1</code> のように直接書き換えても、画面は更新されません。
          必ず <code>setCount(...)</code> のような、useStateが返してくれる更新関数を使ってください。
        </p>
      </Callout>
      <Playground files={mistakeFiles} editorHeight={260} />

      <Callout variant="qa">
        <p>
          <strong>Q. なぜ直接書き換えてはいけないの？</strong>
          <br />
          Reactは「setCountが呼ばれたら再レンダリングする」という仕組みで動いています。
          変数を直接書き換えるだけでは、Reactはその変化に気づけないため、画面が更新されません。
        </p>
      </Callout>

      <Exercise
        task={`コメントの指示に従って、
「いいね」ボタンを押すたびに表示が切り替わるコンポーネントを完成させてください。`}
        files={exerciseFiles}
        solutionFiles={exerciseSolutionFiles}
        hints={[
          'useState(false) で boolean の state を作れます。const [liked, setLiked] = useState(false); です。',
          '反転させるには setLiked(!liked) を使います。三項演算子 liked ? A : B で表示を切り替えます。',
        ]}
        editorHeight={300}
      />
    </ChapterLayout>
  )
}
