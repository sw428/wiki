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

## HTML整形運用（Prettier と VS Code標準の分担）

- `bracketSpacing` は JS / JSON / JSX の `{}` 内スペース設定であり、HTML空要素の `/>` には影響しない。
- HTMLで `/>` を使わない方針を優先するなら、HTMLは VS Code標準フォーマッターに分担する。
- CSS / SCSS / JS は引き続き Prettier を使う分担で問題ない。

```json
{
  "[html]": {
    "editor.defaultFormatter": "vscode.html-language-features",
    "editor.formatOnSave": true
  },
  "html.format.wrapLineLength": 120,
  "html.format.wrapAttributes": "auto",
  "html.format.endWithNewline": true
}
```

- `head` と `body` を保存時フォーマットで分離することはできない。
- `body` だけ整形したい場合は `Format Selection` を使う。
- 属性を常に縦並びにしたい時だけ `html.format.wrapAttributes: "force-expand-multiline"` を使う。

## `/>` 一括置換の安全ルール

- 全ファイル対象の ` />` -> `>` 一斉置換は行わない。
- 置換対象は `*.html` のみに限定する。
- HTML内にインラインSVGがある場合は、置換前に `<svg>...</svg>` ブロックを目視確認する。
- `.svg` ファイルは置換対象に含めない。

## GitHub Pages の確認順（公開運用）

1. `Settings -> Pages` で公開元ブランチを確認する
2. `Actions` でデプロイ成否（緑チェック）を確認する
3. 公開URLで反映確認し、必要なら `Ctrl + F5` でキャッシュを外す

補足:
- `dev_sub` に push しても、Pages の公開元が `main` のままなら公開反映されない。
- `dev_sub` を公開元にしたい場合は、`Settings -> Pages` 側で Source branch を切り替える。

## VS Codeの問題巡回ショートカット

- 問題（エラー/警告）の巡回は `F8`（次）/ `Shift + F8`（前）を基本に統一する。
- `F4` は文脈やキーバインドで役割が変わりやすいため、問題巡回の主軸にはしない。
- 連打自体は問題ないが、修正後に `Problems` 件数が更新されたかを確認する。
- 行番号へ直接飛ぶ必要がある時は `Ctrl + G` を併用する。

## コミットメッセージ運用（最小）

- 変更意図が伝わる短文を優先する。
- `update 2 files` のような件数だけの文は避ける。
- 文書・運用整理なら `docs:`、雑務整理なら `chore:` を基本にする。
- 接頭辞は変更全体の主目的で決める。文書更新が中心なら、整理・統合を含んでいても `docs:` を優先する。
- `refactor:` は、挙動を変えずに実装コードの内部構造を整理した変更へ使う。
- 箇条書きは全ファイルを列挙せず、重複する変更をまとめて3〜5項目程度に絞る。

例:

- `docs: 案件ケースと学習ケースの管理構造を整理`
- `docs: CSS設計ガイドラインとポートフォリオ文書を統合`
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
