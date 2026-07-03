import { ChapterLayout } from '../components/ChapterLayout'
import { Playground } from '../components/Playground'
import { Exercise } from '../components/Exercise'
import { Callout } from '../components/Callout'
import { Term } from '../components/Term'

const basicPropsFiles = {
  '/App.tsx': `interface GreetingProps {
  name: string;
}

function Greeting({ name }: GreetingProps) {
  return <p>こんにちは、{name} さん！</p>;
}

export default function App() {
  return (
    <div>
      <Greeting name="太郎" />
      <Greeting name="花子" />
    </div>
  );
}
`,
}

const multiPropsFiles = {
  '/App.tsx': `interface TaskCardProps {
  title: string;
  done: boolean;
}

function TaskCard({ title, done }: TaskCardProps) {
  return (
    <p>
      {title}（{done ? "完了" : "未完了"}）
    </p>
  );
}

export default function App() {
  return (
    <div>
      <TaskCard title="牛乳を買う" done={false} />
      <TaskCard title="レポート提出" done={true} />
    </div>
  );
}
`,
}

const exerciseFiles = {
  '/App.tsx': `// 1. ProfileProps という interface を作ってください
//    - name: string
//    - age: number

// 2. その props を受け取る Profile コンポーネントを作り、
//    「太郎（20歳）」のように表示してください

// 3. App から Profile に好きな name と age を渡してください

export default function App() {
  return <div>{/* ここに <Profile ... /> を書く */}</div>;
}
`,
}

const exerciseSolutionFiles = {
  '/App.tsx': `interface ProfileProps {
  name: string;
  age: number;
}

function Profile({ name, age }: ProfileProps) {
  return (
    <p>
      {name}（{age}歳）
    </p>
  );
}

export default function App() {
  return (
    <div>
      <Profile name="太郎" age={20} />
    </div>
  );
}
`,
}

export default function Chapter03Props() {
  return (
    <ChapterLayout id="03-props" number={3} title="props でデータを渡す">
      <p>
        <Term definition="親コンポーネントから子コンポーネントに渡される入力データ">
          props
        </Term>
        は、コンポーネントへの「入力」です。第0章で「コンポーネントは関数」と説明しましたが、
        propsはまさにその関数の引数にあたります。
      </p>

      <h2 className="mt-6 mb-2 text-lg font-bold">1つのpropsを渡す</h2>
      <p>
        下の例では、<code>Greeting</code> コンポーネントが <code>name</code>{' '}
        という props を受け取り、それぞれ違う名前を表示しています。
        <code>{'{ name }: GreetingProps'}</code> の書き方は、interfaceで決めた形の
        オブジェクトから <code>name</code> を取り出す、という意味です。
      </p>
      <Playground files={basicPropsFiles} editorHeight={280} />

      <Callout variant="qa">
        <p>
          <strong>Q. props と state はどう違うの？</strong>
          <br />
          props は「親から渡される、コンポーネント自身では変更できないデータ」です。
          「コンポーネント自身が持つ、変化するデータ」である state は次の章で学びます。
          今の段階では「props = 外から渡される入力」とだけ覚えておけば十分です。
        </p>
      </Callout>

      <h2 className="mt-6 mb-2 text-lg font-bold">複数のpropsを渡す</h2>
      <p>
        propsは1つとは限りません。interfaceに複数のプロパティを書いておけば、
        まとめて渡すことができます。
      </p>
      <Playground files={multiPropsFiles} editorHeight={320} />

      <Exercise
        task="コメントの指示に従って、name と age を受け取る Profile コンポーネントを作り、App から呼び出してください。"
        files={exerciseFiles}
        solutionFiles={exerciseSolutionFiles}
        hints={[
          'TaskCard の例と同じ形です。interfaceのプロパティ名と型だけ変えます。',
          '<Profile name="太郎" age={20} /> のように、文字列は "" で、数値は {} で渡します。',
        ]}
        editorHeight={320}
      />
    </ChapterLayout>
  )
}
