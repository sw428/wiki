# 01_ケース_CodeJump WordPress初期構築・バックアップ・スニペット判断

## 位置づけ

CodeJumpのWordPress学習中に出た、Local環境・バックアップ・Git管理・`header.php` スニペット・WordPress関数の理解をまとめる。

このファイルは完成版の手順書ではなく、作業中の判断を追うための乱書きとして置く。

## 乱書き

貼り付けログから、CodeJump / WordPress学習に関係する部分だけを抽出する。

### バックアップはフォルダだけでは足りない

WordPressは、ファイルとデータベースを分けて見る。

- HTML / CSS / PHP / テーマファイル: フォルダにある
- 投稿記事 / 固定ページ / カテゴリ / ユーザー / 管理画面設定: データベースにある
- 画像 / PDFなど: `wp-content/uploads/` にある

そのため、`wp-content/themes/自分のテーマ名/` だけをコピーしても、記事本文や管理画面設定は戻せない。

サイト全体を戻したいなら、少なくとも次を見る。

```text
wp-content/
wp-config.php
データベース
```

Local環境なら、いったんLocalのExportでサイト全体を残すのが一番簡単。

細かく分けるなら、次の3点セット。

```text
backup/
├── my-theme/       # 自作テーマ
├── uploads/        # 画像・PDFなど
└── database.sql    # 記事・固定ページ・設定など
```

### Git管理は自作テーマだけでよい

学習段階では、WordPress全体をGit管理しなくてよい。

Gitで見る中心は、自分が作ったテーマ。

```text
wp-content/themes/自分のテーマ名/
```

Localなら、たとえば次。

```text
app/public/wp-content/themes/blog/
```

Git管理するもの:

- `style.css`
- `functions.php`
- `index.php`
- `header.php`
- `footer.php`
- `single.php`
- `archive.php`
- `assets/js/`
- `assets/img/`

Git管理しないもの:

- `wp-admin/`
- `wp-includes/`
- `wp-content/uploads/`
- `wp-content/plugins/`
- `wp-config.php`
- データベース

感覚としては、Gitは「自分が書いたコードの履歴管理」。

バックアップは「サイトを復元するための保険」。

ここを混ぜない。

### 学習段階の最低ライン

今は細かい保守運用の管理まで背負わなくてよい。

まずは次の2つで十分。

1. 自作テーマをGit管理する
2. LocalのExportでWordPressサイト全体をバックアップする

「えらい人がやる管理」というより、責任範囲が広い人ほど細かく分ける。

コーダー学習中は、コードが戻せることと、サイト全体を一応保存できることを優先する。

### コーダーの範囲

コーダーの中心は、デザインをWebページとして形にすること。

中心:

- HTML
- CSS / SCSS
- レスポンシブ対応
- BEMなどの命名
- 画像の配置
- 簡単なJavaScript
- WordPressテーマ化
- 自作テーマのGit管理

WordPressコーダーでは、次も入る。

- `header.php`
- `footer.php`
- `index.php`
- `single.php`
- `archive.php`
- `functions.php`
- 投稿一覧の表示
- WordPress関数の使用

ただし、必要なPHPはかなり限定的。

```php
<?php get_header(); ?>
<?php get_footer(); ?>
<?php if (have_posts()) : ?>
<?php while (have_posts()) : the_post(); ?>
<?php the_title(); ?>
<?php the_content(); ?>
<?php endwhile; ?>
<?php endif; ?>
```

DB管理、サーバー移行、セキュリティ監視、障害対応まで行くと、保守運用担当やインフラ寄りの範囲になる。

### 保守と運用

保守は、壊れないように直す・守ること。

運用は、日々使えるように回すこと。

WordPressで見ると、次のように分ける。

- プラグイン更新でエラーを防ぐ: 保守
- 表示崩れを直す: 保守
- ブログ記事を投稿する: 運用
- バナーを差し替える: 運用
- バックアップが取れているか確認する: 保守寄り
- 決まった日にバックアップを取る: 運用寄り

### LocalのWP AdminとOpen site

Localの画面で見る入口は分ける。

- `WP Admin`: WordPress管理画面へ入る
- `Open site`: 実際のサイト表示を見る

`WP Admin` を押すと、WordPressのログイン画面を経由して管理画面に入る。

管理画面では、`外観 > テーマ` から自作テーマを確認・有効化する。

### 403 Forbiddenとapp/public

Localで `WP Admin` を押して403 Forbiddenが出る場合、まず `Open site` が開けるかを見る。

- `Open site` は開ける / `WP Admin` だけ403: 管理画面側の問題かもしれない
- `Open site` も403: WordPress本体の配置や `app/public` が怪しい

特に `app/public/index.php` がないなら、WordPress本体が正しい場所にない可能性が高い。

WordPressとして最低限必要な形。

```text
app/public/
├── index.php
├── wp-admin/
├── wp-content/
├── wp-includes/
└── wp-config.php
```

`app/public/` に自作テーマフォルダだけ置いても、WordPressサイトとしては成立しない。

自作テーマを置く場所はここ。

```text
app/public/wp-content/themes/自分のテーマ名/
```

### Localで作り直す流れ

`app/public/index.php` がなく、WordPress本体が崩れているなら、学習中はLocalで新規作成し直すのが早い。

流れ:

1. 今の自作テーマフォルダを避難する
2. Localで新しいサイトを作る
3. `app/public/` に `index.php` / `wp-admin` / `wp-content` / `wp-includes` があるか確認する
4. 自作テーマを `app/public/wp-content/themes/` に入れる
5. `WP Admin` に入る
6. `外観 > テーマ` で有効化する

### LocalでCreateが見つからないとき

Localのバージョンや画面幅で表示が違う。

見る場所:

- 左下の `+`
- 左上メニューの `File`
- 左サイドバー下
- 画面下の `Continue` / `Next`

カードをクリックしても反応しない場合、すでに `Create a new site` が選択済みで、右下や下中央の `Continue` を押す段階のことがある。

画面下が見切れているなら、ウィンドウを最大化する。

### header.phpでPHPスニペットが効かない

`header.php` はファイルとしてはPHP。

ただし、カーソル位置によってVS CodeはHTML文脈として扱う。

たとえばここはHTML文脈。

```html
<body>
  <header id="header">
```

ここはPHP文脈。

```php
<?php
  $html_tag = (is_home() || is_front_page()) ? 'h1' : 'div';
?>
```

そのため、`header.php` 全体の言語モードがPHPでも、HTMLスニペットが出ることがある。

WordPress用スニペットをHTML部分でも出したいなら、グローバルスニペットにして `scope` を付ける。

```json
{
  "WordPress bloginfo name": {
    "scope": "php,html",
    "prefix": "wpname",
    "body": [
      "<?php bloginfo('name'); ?>"
    ],
    "description": "WordPress bloginfo name"
  }
}
```

見る順番:

1. VS Code右下の言語モードがPHPか
2. スニペットを `php.json` やグローバルスニペットに入れているか
3. HTML領域でも出したいスニペットに `scope: "php,html"` があるか

### head基本セットはスニペット1単位でよい

`header.php` の先頭に入れる `head` 基本セットは、スニペット1単位にしてよい。

学習用の簡単版。

```json
{
  "WordPress head basic simple": {
    "scope": "php,html",
    "prefix": "wpheadbase",
    "body": [
      "<!DOCTYPE html>",
      "<html lang=\"ja\">",
      "<head>",
      "  <meta charset=\"utf-8\">",
      "  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">",
      "  <title><?php bloginfo('name'); ?></title>",
      "  <meta name=\"description\" content=\"<?php bloginfo('description'); ?>\">",
      "  <link rel=\"icon\" href=\"<?php echo esc_url(get_theme_file_uri('${1:img/common/favicon.ico}')); ?>\">",
      "",
      "  <?php wp_head(); ?>",
      "</head>"
    ],
    "description": "WordPress header.php head basic simple"
  }
}
```

変更余地を持たせるなら、まずはfaviconのパスだけで十分。

```text
${1:img/common/favicon.ico}
```

使い回すなら、安全寄りに次の形も覚える。

```php
<title><?php echo esc_html(get_bloginfo('name')); ?></title>
<meta name="description" content="<?php echo esc_attr(get_bloginfo('description')); ?>">
```

### スニペットの最後のカンマ

スニペットの `body` 配列では、最後の行にはカンマを付けない。

```json
"body": [
  "<!DOCTYPE html>",
  "<html lang=\"ja\">",
  "<head>",
  "</head>"
]
```

`"</head>",` のように最後へカンマを残すと、後ろにまだ行が続く場合はよいが、`body` の最後なら不要。

### echoがいる関数といらない関数

WordPressでは、表示する関数と、値を返す関数を分けて見る。

`bloginfo()` はその場で表示する。

```php
<?php bloginfo('name'); ?>
```

そのため、基本は `echo` しない。

`get_bloginfo()` は値を取得して返す。

```php
<?php echo get_bloginfo('name'); ?>
```

表示したいなら `echo` が必要。

ざっくり覚えるなら次。

- `the_` 系 / `bloginfo()`: 表示する
- `get_` 系: 値を返す
- 返ってきた値をHTMLに出すなら `echo`

例:

```php
<?php bloginfo('name'); ?>
<?php the_title(); ?>
<?php the_content(); ?>
<?php the_permalink(); ?>
```

```php
<?php echo get_bloginfo('name'); ?>
<?php echo get_theme_file_uri('img/logo.svg'); ?>
<?php echo home_url('/'); ?>
```

属性値やURLとして使うなら、`esc_html()` / `esc_attr()` / `esc_url()` も合わせて考える。

### Javaの戻り値との対応

WordPressの `get_` 系は、Javaでいう「戻り値があるメソッド」に近い。

Javaでは、戻り値がある場合はメソッド名の前に型を書く。

```java
String getName() {
    return "blog";
}
```

値を表示したいなら、出力処理に入れる。

```java
System.out.println(getName());
```

戻り値がない場合は `void`。

```java
void showName() {
    System.out.println("blog");
}
```

WordPressの理解に寄せると、まずは次でよい。

- `get_` 系: 値を返す
- `echo get_...`: 値を画面に出す
- `bloginfo()` / `the_` 系: 関数の中で表示まで行う

### LocalでWordPress本体を作れた後

LocalでWordPress本体を作成できたら、管理画面に入れる状態になる。

この段階では、まだ自作テーマがなくてもよい。

順番は次のように見る。

1. LocalでWordPress本体を作る
2. WordPressの管理画面へ入れることを確認する
3. `wp-content/themes/` の中に自作テーマフォルダを作る
4. `style.css` と `index.php` を置く
5. 管理画面の `外観 > テーマ` でテーマを有効化する
6. `header.php` / `footer.php` / `functions.php` を増やしていく

最低限テーマとして認識させるなら、まずはこの形。

```text
wp-content/
└── themes/
    └── blog/
        ├── style.css
        └── index.php
```

`style.css` にはテーマ名を書く。

```css
@charset "UTF-8";
/*
Theme Name: blog
*/
```

`index.php` は、最初は表示確認用の小さい内容でよい。

```php
<?php get_header(); ?>

<main>
  <p>WordPressテーマ作成中</p>
</main>

<?php get_footer(); ?>
```

### blogという名前をそろえる

WordPressには、似た名前が複数ある。

- サイト名
- テーマフォルダ名
- `style.css` の `Theme Name`

全部を `blog` にそろえたいなら、次の3つを見る。

```text
サイト名: 管理画面 > 設定 > 一般 > サイトのタイトル
テーマフォルダ名: wp-content/themes/blog/
テーマ表示名: style.css の Theme Name: blog
```

`<?php bloginfo('name'); ?>` で出るのは、主に管理画面側のサイト名。

`外観 > テーマ` に表示されるテーマ名は、`style.css` の `Theme Name`。

古いテーマフォルダを消したい場合は、先に新しいテーマを有効化して表示確認してからにする。

### 色分けはVS Code側の補助

`echo` や `<?php ?>` に色が付くのは、PHPが実行されているからではない。

VS Codeや拡張機能が、コードを文法として見分けて色分けしている。

つまり、色は実行結果ではなく、読むための目印。

`echo` が白く見える場合でも、必ずしもPHPとして認識されていないという意味ではない。

ただし、HTMLタグと同じ色で見づらいなら、テーマやトークン色の調整を検討してよい。

その場合も、雑に「白い文字全部」や「タグ全体」の色を変えると、HTMLタグ、属性、文字列まで変わる可能性がある。

色を触るなら、VS Codeの `Developer: Inspect Editor Tokens and Scopes` で、`echo` がどのスコープとして扱われているかを確認してから、小さく調整する。

### WordPress初期はスニペットが重要

WordPress初期では、細かいPHP文法を毎回手書きで再現するより、よく使う型をスニペット化して安全に使うことが重要。

たとえば、次のような型は「覚えて毎回手打ちする」より、スニペットで正確に出せる方がよい。

```php
<?php get_header(); ?>
<?php get_footer(); ?>
<?php wp_head(); ?>
<?php wp_footer(); ?>
<?php body_class(); ?>
<?php wp_body_open(); ?>
<?php bloginfo('name'); ?>
<?php echo esc_url(home_url('/')); ?>
<?php echo esc_url(get_theme_file_uri('img/common/logo.svg')); ?>
```

スニペットの目的は、暗記を避けることだけではない。

- 打ち間違いを減らす
- WordPress特有の型を固定する
- `esc_url()` などの安全処理を忘れにくくする
- PHP文法への認知負荷を下げる
- HTMLからWordPress化する作業に集中する
- 変更範囲を小さく保つ

### WordPress学習は切り分けが先

WordPressは、HTML/CSSや資格学習と学習の質が違う。

HTML/CSSでは、ボックスモデル、レイアウト、余白、レスポンシブなど、基礎概念と状況判断が重要になる。

CSSでは、プロパティをスニペットで出せても、結局は次を判断する必要がある。

- 親に指定するか、子に指定するか
- `flex` か `grid` か
- `gap` か `margin` か
- 幅を固定するか、流動させるか
- カンプのどこを再現対象にするか

一方でWordPressでは、決まったテンプレート構造に、決まった型を正しく組み込むことが重要になる。

独自に想像して処理を増やすより、まず次を守る。

- 触ってよい範囲を見極める
- WordPress本体を不用意に触らない
- テーマ、管理画面、プラグイン、Local環境を混同しない
- 変更範囲を小さく保つ
- どこを変えた結果、何が変わったかを追えるようにする

WordPressでは、言語理解よりも環境理解・境界線・優先順位・リスク管理が先。

PHPを0から自由に書く力より、まずWordPressの決まった型を読んで正しく置けることが重要。

### PHPを0から手書きできる人はいる

PHPを0から手書きできる人はいる。

たとえば次のような人。

- PHPでWebアプリを作る人
- Laravelなどのフレームワークを使う人
- WordPressテーマやプラグインを深く作る人
- 既存テーマを大きく改修する人
- フォーム処理、DB処理、会員機能などを書く人

ただし、WordPressテーマ制作の最初で必要なのは、PHPを自由に書く力そのものではない。

最初は次でよい。

```text
レベル1: HTMLをWordPressテンプレートに変換できる
レベル2: if / 変数 / echo / ループが読める
レベル3: WP_Query、カスタム投稿、カスタムフィールドを扱う
レベル4: プラグインや独自機能をPHPで書く
```

今はレベル1から2を狙う。

HTML/CSSを壊さず、WordPressのテーマ構造へ変換できることを優先する。

## 一般化できる判断

- WordPressでは「テーマコード」「uploads」「データベース」を分けると、Git管理とバックアップの違いが見えやすい。
- CodeJumpのWordPress学習では、最初から保守運用全体を背負わず、自作テーマGit + Local Exportで十分。
- `header.php` はPHPファイルだが、HTML領域ではHTML文脈になるため、スニペットの出方はカーソル位置に左右される。
- `bloginfo()` と `get_bloginfo()` の違いは、PHP全体の深掘りより先に「表示する関数 / 値を返す関数」として覚えると実用的。
- WordPressでは、知識の一貫性よりも、仕事に直結する境界線・優先順位・変更範囲の把握が重要。
- CSSは状況判断、WordPressは型・配置場所・責任範囲の切り分けが重要。
- WordPress初期では、スニペットは暗記回避ではなく、壊さず正確に作業するための道具として扱う。

## 基礎概念への反映先

- `01_基礎概念/WordPress/基礎/01_WordPress学習の優先順位.md`
  - WordPress学習では、環境理解・境界線・優先順位・スニペット活用を先に見る。
- `01_基礎概念/WordPress/制作/07_バックアップとGit管理.md`
  - 自作テーマはGit、WordPress全体はバックアップという分け方。
  - Local Export / uploads / database.sql の最低構成。
- `01_基礎概念/WordPress/制作/01_テーマ作成手順.md`
  - LocalでWordPress本体を作ることと、自作テーマを作ることを分ける。
  - サイト名、テーマフォルダ名、`Theme Name` の違いを残す。
- `01_基礎概念/WordPress/制作/開発環境/01_PHP Intelephense.md`
  - 色分けはVS Code側の補助であり、PHPの実行とは別。
- `01_基礎概念/WordPress/基礎/07_WordPressで読むPHPの型.md`
  - `bloginfo()` / `get_bloginfo()` / `home_url()` / `get_theme_file_uri()` の表示と取得の違い。
- `01_基礎概念/PHP/04_関数.md`
  - 関数の戻り値と `echo` の基本整理。
- `01_基礎概念/WordPress/制作/開発環境/02_WordPressスニペット運用.md`
  - `header.php` のHTML文脈と `scope: "php,html"` の扱い。
