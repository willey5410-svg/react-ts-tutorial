# React / TypeScript 実践チュートリアル

React と TypeScript を、初学者向けに基礎から学べる対話式チュートリアルアプリです。
1つの「タスク管理アプリ」を章ごとに機能追加しながら育てていく構成になっています。

各章は「解説 → ブラウザ内で動かせるライブコードエディタ（[Sandpack](https://sandpack.codesandbox.io/)）→ 練習問題（ヒント・解答例つき）」の3点セットです。

## 章立て

### 基礎編
0. 準備運動（変数・関数・配列・オブジェクト、コンポーネントとJSXの説明）
1. はじめてのコンポーネント表示
2. TypeScript の型を書いてみる
3. props でデータを渡す
4. useState で状態を持つ
5. イベント処理
6. コンポーネント分割（タスク管理アプリの土台を作る）

### 発展編
7. フォームとバリデーション（react-hook-form + zod）
8. useReducer / Context で状態共有
9. TanStack Query でデータ取得
10. React Router でページ遷移
11. テストを書いてみる（Vitest風のテストランナー + Testing Library）
12. 仕上げ・デプロイ（Lint / 型チェック / CI / Vercelデプロイ）

進捗は各章末の「この章を完了にする」ボタンでブラウザの localStorage に保存されます。

## セットアップ

```bash
npm install
npm run dev
```

ブラウザで http://localhost:5173 を開きます。

## 技術スタック

- Vite + React 19 + TypeScript
- Tailwind CSS
- React Router
- `@codesandbox/sandpack-react`（ブラウザ内で動くライブコードエディタ・プレビュー）

## スクリプト

```bash
npm run dev     # 開発サーバー
npm run build   # 型チェック + 本番ビルド
npm run lint    # oxlint
```
