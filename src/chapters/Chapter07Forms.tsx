import { ChapterLayout } from '../components/ChapterLayout'
import { Playground } from '../components/Playground'
import { Exercise } from '../components/Exercise'
import { Callout } from '../components/Callout'
import { Term } from '../components/Term'

const formDeps = {
  'react-hook-form': '^7.54.0',
  zod: '^3.24.0',
  '@hookform/resolvers': '^3.9.0',
}

const rhfFiles = {
  '/App.tsx': `import { useForm } from "react-hook-form";

interface FormValues {
  title: string;
}

export default function App() {
  const { register, handleSubmit } = useForm<FormValues>();

  function onSubmit(data: FormValues) {
    alert("送信されたタスク: " + data.title);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("title")} placeholder="タスク名" />
      <button type="submit">追加</button>
    </form>
  );
}
`,
}

const zodFiles = {
  '/App.tsx': `import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(1, "タスク名を入力してください"),
});

type FormValues = z.infer<typeof schema>;

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  function onSubmit(data: FormValues) {
    alert("送信されたタスク: " + data.title);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("title")} placeholder="タスク名" />
      {errors.title && <p style={{ color: "red" }}>{errors.title.message}</p>}
      <button type="submit">追加</button>
    </form>
  );
}
`,
}

const exerciseFiles = {
  '/App.tsx': `import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// 1. title に加えて、priority という項目を schema に追加してください
//    z.enum(["low", "medium", "high"]) を使います
const schema = z.object({
  title: z.string().min(1, "タスク名を入力してください"),
});

type FormValues = z.infer<typeof schema>;

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  function onSubmit(data: FormValues) {
    alert(JSON.stringify(data));
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("title")} placeholder="タスク名" />
      {errors.title && <p style={{ color: "red" }}>{errors.title.message}</p>}

      {/* 2. <select {...register("priority")}> で low/medium/high の
             <option> を3つ用意してください */}

      <button type="submit">追加</button>
    </form>
  );
}
`,
}

const exerciseSolutionFiles = {
  '/App.tsx': `import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(1, "タスク名を入力してください"),
  priority: z.enum(["low", "medium", "high"]),
});

type FormValues = z.infer<typeof schema>;

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  function onSubmit(data: FormValues) {
    alert(JSON.stringify(data));
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("title")} placeholder="タスク名" />
      {errors.title && <p style={{ color: "red" }}>{errors.title.message}</p>}

      <select {...register("priority")}>
        <option value="low">low</option>
        <option value="medium">medium</option>
        <option value="high">high</option>
      </select>

      <button type="submit">追加</button>
    </form>
  );
}
`,
}

export default function Chapter07Forms() {
  return (
    <ChapterLayout id="07-forms" number={7} title="フォームとバリデーション">
      <p>
        ここからは発展編です。項目が増えるフォームを <code>useState</code>{' '}
        だけで管理すると、項目ごとに state と onChange を書く必要がありコードが増えていきます。
        実務では <code>react-hook-form</code> というライブラリで、フォームの値をまとめて管理するのが定番です。
      </p>

      <h2 className="mt-6 mb-2 text-lg font-bold">react-hook-form の基本</h2>
      <p>
        <code>register("title")</code> を入力欄にスプレッド（<code>{'{...register("title")}'}</code>
        ）するだけで、その入力欄の値がフォームに登録されます。<code>handleSubmit</code>{' '}
        に渡した関数が、送信時に全ての値をまとめて受け取ります。
      </p>
      <Playground files={rhfFiles} dependencies={formDeps} editorHeight={240} />

      <h2 className="mt-6 mb-2 text-lg font-bold">zod でバリデーションを書く</h2>
      <p>
        <Term definition="値の形やルールを定義し、それに合っているか検証するライブラリ">
          zod
        </Term>
        を使うと「titleは1文字以上の文字列」のようなルールを1箇所にまとめて書けます。
        <code>zodResolver(schema)</code> を <code>useForm</code> に渡すだけで、
        react-hook-form が自動的にそのルールでチェックしてくれます。
      </p>
      <Playground files={zodFiles} dependencies={formDeps} editorHeight={300} />

      <Callout variant="qa">
        <p>
          <strong>Q. z.infer&lt;typeof schema&gt; って何？</strong>
          <br />
          zodのスキーマから、TypeScriptの型を自動生成する機能です。バリデーションのルールと
          型定義を二重に書かなくて済むので、実務でもよく使われる書き方です。
        </p>
      </Callout>

      <Exercise
        task="コメントの指示に従って、優先度（priority）を選択するフィールドを追加してください。"
        files={exerciseFiles}
        solutionFiles={exerciseSolutionFiles}
        dependencies={formDeps}
        hints={[
          'schema に priority: z.enum(["low", "medium", "high"]) を追加します。',
          '<select {...register("priority")}> の中に <option value="low">low</option> のような要素を3つ並べます。',
        ]}
        editorHeight={340}
      />
    </ChapterLayout>
  )
}
