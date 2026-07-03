import { ChapterLayout } from '../components/ChapterLayout'
import { Playground } from '../components/Playground'
import { Exercise } from '../components/Exercise'
import { Callout } from '../components/Callout'
import { Term } from '../components/Term'

const helloFiles = {
  '/App.tsx': `export default function App() {
  return <p>こんにちは、React!</p>;
}
`,
}

const nestFiles = {
  '/App.tsx': `export default function App() {
  return (
    <div>
      <h1>自己紹介</h1>
      <p>名前: 太郎</p>
      <p>趣味: 読書</p>
    </div>
  );
}
`,
}

const classNameFiles = {
  '/App.tsx': `export default function App() {
  return (
    <div>
      <h1 className="title">スタイル付きの見出し</h1>
      <p>HTMLの class は、JSXでは className と書きます。</p>
    </div>
  );
}
`,
}

const exerciseFiles = {
  '/App.tsx': `export default function App() {
  return (
    <div>
      {/* ここに <h1> で好きなタイトルを書いてください */}

      {/* ここに <p> を2つ使って、自己紹介の文章を書いてください */}
    </div>
  );
}
`,
}

const exerciseSolutionFiles = {
  '/App.tsx': `export default function App() {
  return (
    <div>
      <h1>私のプロフィール</h1>
      <p>名前: 花子</p>
      <p>好きな食べ物: ラーメン</p>
    </div>
  );
}
`,
}

export default function Chapter01FirstComponent() {
  return (
    <ChapterLayout id="01-first-component" number={1} title="はじめてのコンポーネント表示">
      <p>
        <code>App.tsx</code> というファイルの中にある{' '}
        <code>function App() {'{ ... }'}</code> が、画面全体を作っている
        <Term definition="画面の一部分を作る、再利用可能な部品としての関数">コンポーネント</Term>
        です。この中の <code>return</code> の後に書かれているのが、
        画面に表示される内容（<Term definition="JavaScript/TypeScriptの中にHTMLのようなタグを書ける記法">JSX</Term>）です。
      </p>

      <p>まずは文字を1つ表示するだけの、最も単純な例です。右側のプレビューに文字が表示されているのを確認してください。</p>
      <Playground files={helloFiles} editorHeight={200} />

      <Callout variant="qa">
        <p>
          <strong>Q. 画面が真っ白になった / エラーが出た</strong>
          <br />
          タグの閉じ忘れ（<code>&lt;p&gt;</code> に対する <code>&lt;/p&gt;</code>{' '}
          の書き忘れ）が一番多い原因です。エディタ下の赤いエラーメッセージに、
          問題のある行番号が出ているので確認しましょう。
        </p>
      </Callout>

      <h2 className="mt-6 mb-2 text-lg font-bold">タグを入れ子にする</h2>
      <p>
        HTMLと同じように、タグの中に別のタグを入れる（入れ子にする）ことができます。ただし
        <code>return</code> の直後は、必ず1つの要素で全体を囲む必要があります。下の例では{' '}
        <code>&lt;div&gt;</code> で全体を囲んでいます。
      </p>
      <Playground files={nestFiles} editorHeight={260} />

      <h2 className="mt-6 mb-2 text-lg font-bold">className</h2>
      <p>
        HTMLでは <code>class="title"</code> と書く部分を、JSXでは{' '}
        <code>className="title"</code> と書きます。<code>class</code>{' '}
        はJavaScriptの別の意味を持つ単語（予約語）なので、名前がずらしてあります。
      </p>
      <Playground files={classNameFiles} editorHeight={220} />

      <Exercise
        task={`空になっている <div> の中に、
・<h1> で好きなタイトルを1つ
・<p> で自己紹介の文章を2つ
を書いて、右側のプレビューに表示してみてください。`}
        files={exerciseFiles}
        solutionFiles={exerciseSolutionFiles}
        hints={[
          '「入れ子にする」の例のコードを参考にして、同じ形でタグを書いてみましょう。',
          '<h1>ここにテキスト</h1> のように、開始タグと終了タグで文字を挟みます。',
        ]}
        editorHeight={260}
      />
    </ChapterLayout>
  )
}
