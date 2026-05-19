# VS Code拡張とGit運用メモ（コミット文・文字化け復元）

## 目的

- VS Code拡張の利用手順と、Git運用で事故を減らす最小ルールをまとめる。
- 「使うだけ」と「開発する側」を分け、必要な作業だけを実行できる状態にする。

## AI Commit Message Generator の扱い

### これは何か

- Git変更内容からコミットメッセージを生成し、Source Control入力欄に入れる拡張機能。

### 使うだけの場合

- VS Codeに拡張をインストールする。
- Source Control または Command Palette から `Generate Commit Message` を実行する。
- 通常は `npm install` / `npm run compile` / `npm run package` は不要。

### 開発・改造する場合

- 拡張機能プロジェクトフォルダ内でだけ、次を実行する。
  - `npm install`
  - `npm run compile`
  - `npm run package`

## 影響範囲と安全ルール

- `npm` コマンドは、実行したフォルダに影響する。
- 他人プロジェクトの直下で `npm install` などを実行しない。
- テスト対象リポジトリは、可能ならコピー環境で試す。
- 拡張機能は通常、コミットメッセージ欄への入力が主作用であり、ファイルを勝手に書き換える設計ではない。

## Codex CLI 依存の確認

- 拡張が Codex CLI を使う実装の場合、CLI未設定時はフォールバック動作になることがある。
- まず `codex --version` で利用可否を確認する。
- CLIが使えない場合でも、クラッシュしない設計（graceful fallback）かを確認する。

## コミットメッセージ運用（最小）

- 変更意図が伝わる短文を優先する。
- `update 2 files` のような件数だけの文は避ける。
- 文書・運用整理なら `docs:`、雑務整理なら `chore:` を基本にする。

例:

- `docs: 案件ケースと学習ケースの管理構造を整理`
- `chore: 作業メモを更新`

## 文字化け（UTF-8 / CP932）復旧

### よくある原因

- UTF-8の日本語をShift_JIS（CP932）として読み、`繧` `縺` のように崩れる。

### 復旧の基本順

1. まずバックアップを作る。
2. Git管理ファイルなら `git restore -- <file>` でファイル全体を復元する。
3. 一部だけ戻したい場合は `git restore -p -- <file>` を使う。
4. 特定コミットに戻す場合は `git restore --source=<commit> -- <file>` を使う。

### 補足

- `git restore -- <file>` は「変更箇所だけ」ではなく、指定時点の内容へ丸ごと戻す。
- 復元系作業の前に `git status` / `git diff` で差分確認を行う。

## VS Codeリリースノートの見方

- リリースノートは機能更新の情報であり、個別ファイル復元ログではない。
- 文字化け復旧やGit復元判断は、リリースノートではなく `git status` / `git diff` / `git log` を主参照にする。

### VS Code 1.120（2026-05-13）の実務メモ

- `Agents window` が Stable 化。
- BYOKモデル利用時のトークン使用量表示が改善。
- Markdown差分をプレビュー形式で確認できる機能が追加。
- ターミナルコマンドのリスク判定が追加。
- 長いターミナル出力の圧縮表示が追加。

補足:

- 上記は「作業効率の更新情報」であり、Gitの復元履歴そのものではない。
- 復元判断は引き続き `git status` / `git diff` / `git restore` の実行結果を基準にする。
