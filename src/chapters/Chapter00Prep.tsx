import { ChapterLayout } from '../components/ChapterLayout'
import { Playground } from '../components/Playground'
import { Exercise } from '../components/Exercise'
import { Callout } from '../components/Callout'
import { Term } from '../components/Term'

const varFiles = {
  '/App.tsx': `export default function App() {
  const name = "太郎";
  const age = 20;

  console.log(name);
  console.log(age);

  return <p>コンソール（下の Console タブ）を見てみましょう</p>;
}
`,
}

const funcFiles = {
  '/App.tsx': `function add(a: number, b: number) {
  return a + b;
}

const result = add(3, 4);
console.log(result);

export default function App() {
  return <p>結果: {result}</p>;
}
`,
}

const arrayObjectFiles = {
  '/App.tsx': `const fruits = ["りんご", "みかん", "ぶどう"];
console.log(fruits[0]);
console.log(fruits.length);

const person = {
  name: "太郎",
  age: 20,
};
console.log(person.name);

export default function App() {
  return <p>コンソールを確認してください</p>;
}
`,
}

const exerciseFiles = {
  '/App.tsx': `function multiply(a: number, b: number) {
  // ここに a * b を返す処理を書いてください
}

const prices = [100, 200, 300];
// prices の合計を計算して total に代入してください
const total = 0;

console.log(multiply(4, 5)); // 20 になってほしい
console.log(total); // 600 になってほしい

export default function App() {
  return <p>コンソールで答え合わせをしましょう</p>;
}
`,
}

const exerciseSolutionFiles = {
  '/App.tsx': `function multiply(a: number, b: number) {
  return a * b;
}

const prices = [100, 200, 300];
const total = prices[0] + prices[1] + prices[2];

console.log(multiply(4, 5)); // 20 になってほしい
console.log(total); // 600 になってほしい

export default function App() {
  return <p>コンソールで答え合わせをしましょう</p>;
}
`,
}

export default function Chapter00Prep() {
  return (
    <ChapterLayout id="00-prep" number={0} title="準備運動">
      <p>
        この章では React にまだ触れません。React も TypeScript も、結局は
        「プログラミングの基本部品」の組み合わせでできています。まずはその部品の名前と役割を確認しましょう。
      </p>

      <h2 className="mt-6 mb-2 text-lg font-bold">変数</h2>
      <p>
        <Term definition="値に名前をつけて、後から使い回せるようにする仕組み">変数</Term>
        は、データに名前をつけておく箱のようなものです。<code>const</code>{' '}
        は「後から変更しない値」、<code>let</code> は「後から変更する値」に使います。
      </p>
      <Playground files={varFiles} showConsole editorHeight={220} />

      <h2 className="mt-6 mb-2 text-lg font-bold">関数</h2>
      <p>
        <Term definition="いくつかの処理をまとめて、名前をつけて呼び出せるようにしたもの">関数</Term>
        は「入力を受け取って、何かの処理をして、結果を返すもの」です。同じ処理を何度も書かずに済むように使います。
      </p>
      <Playground files={funcFiles} showConsole editorHeight={240} />

      <h2 className="mt-6 mb-2 text-lg font-bold">配列とオブジェクト</h2>
      <p>
        複数のデータをまとめて扱うとき、順番が意味を持つなら
        <Term definition="[要素1, 要素2, ...] の形で複数の値をまとめたもの">配列</Term>
        、名前(キー)で値を管理したいなら
        <Term definition="{ キー: 値 } の形でデータをまとめたもの">オブジェクト</Term>
        を使います。
      </p>
      <Playground files={arrayObjectFiles} showConsole editorHeight={260} />

      <h2 className="mt-6 mb-2 text-lg font-bold">コンポーネントとは</h2>
      <p>
        React では、画面の部品（ボタン、カード、一覧など）を
        <Term definition="画面の一部分を作る、再利用可能な部品としての関数">コンポーネント</Term>
        という単位で作ります。実は「入力（props）を受け取って、画面の見た目（JSX）を返す関数」に過ぎません。関数の話がそのまま繋がっています。
      </p>

      <h2 className="mt-6 mb-2 text-lg font-bold">JSXとは</h2>
      <p>
        <Term definition="JavaScript/TypeScriptの中にHTMLのようなタグを書ける記法">JSX</Term>
        は、TypeScriptのコードの中に <code>{'<p>こんにちは</p>'}</code>{' '}
        のようなHTMLに似たタグを直接書ける記法です。次の章から実際に書いていきます。
      </p>

      <Callout variant="info" title="開発者ツールの使い方">
        <p>
          このチュートリアルのコードエディタには「Console」というタブがあります。
          <code>console.log(...)</code> と書くと、そこに実行結果が表示されます。
          エラーが起きたときも、まずこのConsoleタブに書かれている内容を読むのがコツです。
        </p>
      </Callout>

      <Exercise
        task={`multiply 関数の中身と、total の計算を完成させてください。
console.log の結果がコメントの通りになれば正解です。`}
        files={exerciseFiles}
        solutionFiles={exerciseSolutionFiles}
        hints={[
          'multiply は add 関数の例と同じ形です。掛け算の記号は * です。',
          'total は prices[0] + prices[1] + prices[2] のように、配列の要素を足し算します。',
        ]}
        showConsole
        editorHeight={320}
      />
    </ChapterLayout>
  )
}
