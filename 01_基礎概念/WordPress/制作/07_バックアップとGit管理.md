# 07_バックアップとGit管理

## 目的

WordPress制作で、何をGitで管理し、何をバックアップで守るかを分けて整理する。

## 最初に見る結論

学習中やテーマ制作中心なら、まずは次の分け方でよい。

- 自作テーマ: Gitで管理する
- WordPressサイト全体: LocalのExportなどでバックアップする
- 記事・固定ページ・設定: データベースをバックアップする
- 画像・PDFなど: `uploads` をバックアップする

Gitは「自分が書いたコードの履歴管理」。

バックアップは「サイトを復元するための保険」。

この2つを同じものとして扱わない。

## 自作テーマの場所

LocalでWordPressサイトを作った場合、WordPress本体はだいたい次にある。

```text
app/public/
```

自作テーマを置く場所は、その中の `wp-content/themes/`。

```text
app/public/wp-content/themes/自分のテーマ名/
```

たとえばテーマ名が `blog` なら、Git管理する中心はここ。

```text
app/public/wp-content/themes/blog/
```

中身の例:

```text
blog/
├── index.php
├── style.css
├── functions.php
├── header.php
├── footer.php
├── single.php
├── archive.php
└── assets/
    ├── css/
    ├── js/
    └── img/
```

`app/public/blog/` のように、WordPress本体の直下へ自作テーマを直接置かない。

## Git管理するもの

基本は、自作テーマフォルダだけでよい。

```text
wp-content/themes/自分のテーマ名/
```

Git管理してよいもの:

- `style.css`
- `functions.php`
- `index.php`
- `header.php`
- `footer.php`
- `single.php`
- `archive.php`
- `assets/js/`
- `assets/img/`
- `screenshot.png`

最初は、WordPressルート全体をGit管理しようとしなくてよい。

## Git管理しないもの

次のものは、基本的にGitHubへ上げない。

```text
wp-admin/
wp-includes/
wp-content/uploads/
wp-content/plugins/
wp-config.php
データベース
```

理由:

- `wp-admin` / `wp-includes`: WordPress本体なので再インストールできる
- `uploads`: 画像やPDFが増え続ける
- `plugins`: プラグイン管理と混ざりやすい
- `wp-config.php`: DB接続情報などが入るため公開NG
- データベース: Gitではなく、エクスポートやバックアップで守る

## バックアップするもの

WordPressでは、ファイルだけでは記事や設定を守れない。

記事本文、固定ページ、カテゴリ、ユーザー情報、管理画面の設定などは、フォルダではなくデータベースに入っている。

最低限のバックアップセットは次の3つ。

```text
backup/
├── my-theme/     # 自作テーマ
├── uploads/      # 画像・PDFなど
└── database.sql  # 記事・固定ページ・設定など
```

Local環境で一番簡単なのは、LocalのExportでサイト全体を書き出すこと。

細かく分けて管理するなら、次のように見る。

- 自作テーマ: GitHub
- `uploads`: フォルダコピー
- データベース: LocalのExportまたはAdminer / phpMyAdminで `.sql` 保存

## 学習段階の最低運用

今の段階では、最初から細かい保守運用の管理まで背負わなくてよい。

まずはこれで十分。

1. `wp-content/themes/自分のテーマ名/` をGit管理する
2. LocalのExportでWordPressサイト全体をバックアップする

この状態なら、コードが壊れたときはGitで戻せる。

WordPressサイト全体を残したいときは、LocalのExportから戻せる。

## コーダーの責任範囲

コーダーの中心は、見た目とページ構造を実装すること。

WordPress制作では、主に次を担当する。

- HTML / CSS / SCSS
- レスポンシブ対応
- 基本的なJavaScript
- WordPressテーマ化
- テーマファイルのGit管理
- 軽い表示崩れ修正

次のような作業は、保守・運用まで任されている場合に広がる範囲。

- WordPress全体のバックアップ
- データベースのエクスポート
- `uploads` 管理
- サーバー移行
- 本番反映
- セキュリティ監視

保守は、壊れないように直す・守ること。

運用は、日々使えるように更新し続けること。

## 判断基準

- 自分が書いたテーマコードを守りたい: Git
- 画像や記事も含めてサイトを戻したい: バックアップ
- 記事や固定ページを守りたい: データベースのエクスポート
- 画像やPDFを守りたい: `uploads` のコピー
- 学習中に迷った: 自作テーマをGit、サイト全体をLocal Export

## 関連

- [ケース_CodeJump WordPress初期構築・バックアップ・スニペット判断](../../../02_実践/ケース検証/WordPress/01_ケース_CodeJump_WordPress初期構築・バックアップ・スニペット判断.md)
- [テーマ作成手順](./01_テーマ作成手順.md)
- [静的HTMLからWordPress化する流れ](./06_静的HTMLからWordPress化する流れ.md)
