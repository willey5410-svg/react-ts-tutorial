import { ChapterLayout } from '../components/ChapterLayout'
import { CodeBlock } from '../components/CodeBlock'
import { Callout } from '../components/Callout'
import { Term } from '../components/Term'

const ciYaml = `name: CI
on: [push, pull_request]

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npx tsc --noEmit   # 型チェック
      - run: npm run lint      # ESLint
      - run: npm test          # テスト`

const packageScripts = `{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "test": "vitest run"
  }
}`

export default function Chapter12Deploy() {
  return (
    <ChapterLayout id="12-deploy" number={12} title="仕上げ・デプロイ">
      <p>
        最後に、ここまで書いてきたコードを「壊れていないか自動でチェックする仕組み」と、
        「実際にインターネット上に公開する方法」を確認します。ここまでの章と違い、
        この章は手元で動かして体験する内容ではなく、実際にプロジェクトを作るときの手順の解説です。
      </p>

      <h2 className="mt-6 mb-2 text-lg font-bold">品質を保つ3つのチェック</h2>
      <p>実務では、コードを書くたびに次の3つを確認する習慣をつけます。</p>
      <ul className="my-3 list-disc space-y-1 pl-6">
        <li>
          <strong>型チェック</strong>（<code>tsc --noEmit</code>）— TypeScriptの型に矛盾がないか
        </li>
        <li>
          <strong>Lint</strong>（<code>ESLint</code>）— 書き方のルール違反やありがちなミスがないか
        </li>
        <li>
          <strong>テスト</strong>（<code>Vitest</code> など）— 第11章で書いたようなテストが全て通るか
        </li>
      </ul>
      <p>
        <code>package.json</code> にスクリプトとして登録しておくと、コマンド1つで実行できます。
      </p>
      <CodeBlock code={packageScripts} filename="package.json" />

      <h2 className="mt-6 mb-2 text-lg font-bold">CI（継続的インテグレーション）</h2>
      <p>
        <Term definition="コードをpushするたびに、自動でテストやチェックを実行する仕組み">
          CI
        </Term>
        を設定しておくと、手元で確認し忘れても、GitHubへのpush時に自動でチェックが走ります。
        GitHub Actions を使う場合、以下のようなファイルを{' '}
        <code>.github/workflows/ci.yml</code> に置きます。
      </p>
      <CodeBlock code={ciYaml} filename=".github/workflows/ci.yml" />

      <Callout variant="qa">
        <p>
          <strong>Q. CIが通らないとどうなるの？</strong>
          <br />
          GitHub上のPull Requestに赤い✕マークが表示され、「このチェックが失敗しています」と分かります。
          チームで開発する場合、CIが通らないコードはマージしない、というルールにするのが一般的です。
        </p>
      </Callout>

      <h2 className="mt-6 mb-2 text-lg font-bold">Vercel へのデプロイ</h2>
      <p>
        個人開発でよく使われる、無料で始められるホスティングサービスが{' '}
        <a
          href="https://vercel.com"
          target="_blank"
          rel="noreferrer"
          className="text-indigo-600 underline dark:text-indigo-400"
        >
          Vercel
        </a>{' '}
        です。手順はおおまかに次の通りです。
      </p>
      <ol className="my-3 list-decimal space-y-1 pl-6">
        <li>プロジェクトをGitHubリポジトリにpushする</li>
        <li>Vercelにログインし、そのGitHubリポジトリを選んでインポートする</li>
        <li>
          ビルドコマンド（<code>npm run build</code>）と出力先フォルダ（
          <code>dist</code>）を確認する（Viteプロジェクトなら自動検出されることが多い）
        </li>
        <li>「Deploy」を押すと、数分後に公開URLが発行される</li>
        <li>
          以降は <code>main</code> ブランチにpushするたびに、自動で再デプロイされる
        </li>
      </ol>

      <Callout variant="info">
        <p>
          お疲れさまでした。ここまでで、基礎編（コンポーネント・props・state・イベント）から
          発展編（フォーム・状態管理・データ取得・ルーティング・テスト・デプロイ）まで、
          実務でReact/TypeScriptアプリを作る一通りの流れを体験しました。次は、このチュートリアルで
          作った「タスク管理アプリ」を、自分なりに機能追加しながら育ててみてください。
        </p>
      </Callout>
    </ChapterLayout>
  )
}
