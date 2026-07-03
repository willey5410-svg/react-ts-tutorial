import { ChapterLayout } from '../components/ChapterLayout'
import { Playground } from '../components/Playground'
import { Exercise } from '../components/Exercise'
import { Callout } from '../components/Callout'
import { Term } from '../components/Term'

const annotationFiles = {
  '/App.tsx': `const userName: string = "太郎";
const userAge: number = 20;
const isAdmin: boolean = false;

console.log(userName, userAge, isAdmin);

export default function App() {
  return <p>{userName} さんは {userAge} 歳です</p>;
}
`,
}

const errorFiles = {
  '/App.tsx': `const userAge: number = 20;

// 下の行のコメントを外すと、エディタに赤い波線が出ます
// const userAge2: number = "20"; // ← 文字列を number に入れようとしている

export default function App() {
  return <p>年齢: {userAge}</p>;
}
`,
}

const interfaceFiles = {
  '/App.tsx': `interface Task {
  id: number;
  title: string;
  done: boolean;
}

const task: Task = {
  id: 1,
  title: "牛乳を買う",
  done: false,
};

export default function App() {
  return (
    <p>
      #{task.id} {task.title}（{task.done ? "完了" : "未完了"}）
    </p>
  );
}
`,
}

const exerciseFiles = {
  '/App.tsx': `// 1. Book という interface を作ってください
//    - title: string
//    - price: number
//    - inStock: boolean

// 2. Book 型に合う値を book という変数に代入してください

// 3. book.title と book.price を使って画面に表示してください

export default function App() {
  return <p>ここに本の情報を表示してください</p>;
}
`,
}

const exerciseSolutionFiles = {
  '/App.tsx': `interface Book {
  title: string;
  price: number;
  inStock: boolean;
}

const book: Book = {
  title: "はじめてのTypeScript",
  price: 2400,
  inStock: true,
};

export default function App() {
  return (
    <p>
      {book.title} - {book.price}円
    </p>
  );
}
`,
}

export default function Chapter02Types() {
  return (
    <ChapterLayout id="02-types" number={2} title="TypeScript の型を書いてみる">
      <p>
        TypeScriptは、JavaScriptに「これは文字列」「これは数値」という
        <Term definition="変数や値がどんな種類のデータかを示すラベル">型</Term>
        の情報を追加した言語です。型を書いておくと、間違った種類の値を入れようとしたときに、
        実行する前にエディタが教えてくれます。
      </p>

      <h2 className="mt-6 mb-2 text-lg font-bold">基本の型注釈</h2>
      <p>
        変数名の後ろに <code>: 型名</code> を書くことを型注釈と呼びます。まずは
        <code>string</code>（文字列）・<code>number</code>（数値）・
        <code>boolean</code>（true/false）の3つを覚えれば十分です。
      </p>
      <Playground files={annotationFiles} editorHeight={220} />

      <p>
        コード中のコメントを外してみてください。文字列 <code>"20"</code> を{' '}
        <code>number</code> の変数に入れようとすると、エディタが赤い波線でエラーを教えてくれます。
        これがTypeScriptの一番の役割です。
      </p>
      <Playground files={errorFiles} editorHeight={200} />

      <Callout variant="warning">
        <p>
          エラーが出ても壊れたわけではありません。「型が合っていないので直してください」という
          お知らせです。赤い波線にカーソルを合わせる（または下のエラー欄を読む）と、
          何が間違っているかの説明が表示されます。
        </p>
      </Callout>

      <h2 className="mt-6 mb-2 text-lg font-bold">interface でオブジェクトの形を決める</h2>
      <p>
        <Term definition="オブジェクトがどんなプロパティを持つべきかを定義する仕組み">
          interface
        </Term>
        を使うと、「このオブジェクトは必ずこのプロパティを持つ」という形を決められます。
        後で出てくる <code>props</code>（コンポーネントへの入力）も、この仕組みで型を付けます。
      </p>
      <Playground files={interfaceFiles} editorHeight={280} />

      <Exercise
        task={`コメントの指示に従って、Book という interface を定義し、
それに合う値を作って画面に表示してください。`}
        files={exerciseFiles}
        solutionFiles={exerciseSolutionFiles}
        hints={[
          'Task の例とほぼ同じ形です。プロパティ名と型だけ変えれば大丈夫です。',
          'interface Book { title: string; price: number; inStock: boolean; } のように書きます。',
        ]}
        editorHeight={320}
      />
    </ChapterLayout>
  )
}
