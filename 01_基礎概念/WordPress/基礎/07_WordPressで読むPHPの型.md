# 07_WordPressで読むPHPの型

## 目的

WordPressテーマ制作で、PHPをどの深さまで理解すればよいかを整理する。

## 最初に見る結論

入口では、PHPを言語として深く覚えるより、WordPressでよく使う決まった型を読めることが大事。

目標は「PHPを全部手打ちできる」ではなく、次の状態。

- GPTやスニペットが出したPHPの役割を読める
- 壊れている場所を分類できる
- よく使う型をHTMLのどこに差すか分かる

## まず読めればよい型

ヘッダーやフッターを読み込む。

```php
<?php get_header(); ?>
<?php get_footer(); ?>
<?php get_sidebar(); ?>
```

WordPressがCSSやJSなどを差し込む場所を作る。

```php
<?php wp_head(); ?>
<?php wp_footer(); ?>
```

トップページやサイト内リンクのURLを出す。

```php
<?php echo esc_url(home_url('/')); ?>
```

テーマ内の画像やファイルへのパスを出す。

```php
<?php echo esc_url(get_theme_file_uri('img/common/logo.svg')); ?>
```

サイト名や説明文を出す。

```php
<?php bloginfo('name'); ?>
<?php bloginfo('description'); ?>
```

表示する関数と、値を返す関数を分ける。

```php
<?php bloginfo('name'); ?>
<?php echo esc_html(get_bloginfo('name')); ?>
```

`bloginfo()` は、その場で表示する関数。

`get_bloginfo()` は、値を取得して返す関数。

そのため、HTMLへ出したいときは `echo` を付ける。

同じように、`get_theme_file_uri()` や `home_url()` も値を返す関数なので、表示や属性値に入れるときは `echo` とエスケープを組み合わせる。

```php
<?php echo esc_url(home_url('/')); ?>
<?php echo esc_url(get_theme_file_uri('img/common/logo.svg')); ?>
```

ざっくり覚えるなら、次の区別でよい。

| 種類 | 例 | 見方 |
| --- | --- | --- |
| 表示する関数 | `bloginfo()` / `the_title()` / `the_content()` / `the_permalink()` | `echo` は基本いらない |
| 値を返す関数 | `get_bloginfo()` / `get_theme_file_uri()` / `home_url()` / `get_permalink()` | 表示したいなら `echo` |

リンク先とテーマ内ファイルは分ける。

```php
<a href="<?php echo esc_url(home_url('/')); ?>">
  <img src="<?php echo esc_url(get_theme_file_uri('img/common/logo.svg')); ?>" alt="Travel Blog">
</a>
```

- `home_url('/')`: トップページやカテゴリ、固定ページなど、サイト内のURLを作る
- `get_theme_file_uri('img/common/logo.svg')`: テーマフォルダ内の画像・CSS・JSなどのファイルURLを作る
- `alt="Travel Blog"`: 画像が表示できないときの代替テキスト。通常表示する文字ではない

たとえば `home_url('/category/news/')` の `'/category/news/'` はPHPの文字列。
VS Code上で茶色やオレンジ系に色分けされていても正常。

投稿を順番に表示する。

```php
<?php if (have_posts()) : ?>
  <?php while (have_posts()) : the_post(); ?>

    <h2><?php the_title(); ?></h2>
    <div><?php the_content(); ?></div>

  <?php endwhile; ?>
<?php endif; ?>
```

## PHP記号の見方

HTMLの中でPHPを使うときは、`<?php ... ?>` で囲む。

```php
<title><?php bloginfo('name'); ?></title>
```

これは次のように見る。

- `<title>`: HTML
- `<?php`: ここからPHP
- `bloginfo('name');`: PHPの処理
- `?>`: PHPを終えてHTMLへ戻る
- `</title>`: HTML

`functions.php` のように中身がほぼPHPだけのファイルでは、最初に一回だけ `<?php` を書けばよい。

```php
<?php

function my_enqueue_styles() {
  // ...
}
```

最後の `?>` は書かないことが多い。余計な空白や改行が出るのを避けるため。

## PHPはHTMLを作ってからブラウザへ渡す

WordPressの `.php` ファイルは、ブラウザがそのまま読む完成HTMLではない。

Local / XAMPP / MAMP / レンタルサーバーなどのPHP実行環境が先にPHPを処理し、その結果として作られたHTMLがブラウザへ渡る。

流れは次のように見る。

1. ブラウザでWordPressページを開く
2. Localやサーバーへリクエストが行く
3. サーバー側でPHPが実行される
4. WordPressがHTMLを組み立てる
5. ブラウザへ処理後のHTMLが返る

たとえば次のコードは、JavaScriptではなくPHPの条件分岐でHTMLタグを切り替えている。

```php
<?php $html_tag = (is_home() || is_front_page()) ? 'h1' : 'div'; ?>
<<?php echo $html_tag; ?> class="site-title wrapper">
```

トップページなら、ブラウザへ届くHTMLは次のようになる。

```html
<h1 class="site-title wrapper">
```

下層ページなら、次のようになる。

```html
<div class="site-title wrapper">
```

ここで大事なのは、条件分岐できる理由が「PHPファイルの中にJavaScriptが入っているから」ではないこと。

PHPがサーバー側で先に動き、条件に応じて出すHTMLを変えられるから、ページごとに `h1` / `div` のような出力を切り替えられる。

## 最低限のPHP語彙

- `<?php ... ?>`: PHPを書く場所
- `echo`: 表示する
- `if`: 条件分岐
- `while`: 繰り返し
- `function`: 処理の箱
- `add_action`: WordPressのタイミングに処理を登録する

## GPT変換でよい部分

次のような置き換えは、GPTやスニペットの補助を使ってよい。

```html
<img src="img/common/logo.svg" alt="Travel Blog">
```

```php
<img src="<?php echo esc_url(get_theme_file_uri('img/common/logo.svg')); ?>" alt="Travel Blog">
```

```html
<a href="/contact/">CONTACT</a>
```

```php
<a href="<?php echo esc_url(home_url('/contact/')); ?>">CONTACT</a>
```

ただし、出てきたコードが「画像パス」「URL」「投稿ループ」「条件分岐」のどれかは読めるようにする。

## 自分で読めないと詰まりやすい場所

- `functions.php` でCSSが読み込めていない
- 画像パスが間違って表示されない
- `wp_head()` / `wp_footer()` がなくてCSSやJSが効かない
- ループの位置が違って投稿が出ない
- 固定ページと投稿ページで使われるテンプレートが違う

## 実践側

- [ケース_CodeJump WordPress初期構築・バックアップ・スニペット判断](../../../02_実践/ケース検証/WordPress/01_ケース_CodeJump_WordPress初期構築・バックアップ・スニペット判断.md)
- [静的HTMLからWordPress化する流れ](../制作/06_静的HTMLからWordPress化する流れ.md)
- [WordPressスニペット運用](../制作/開発環境/02_WordPressスニペット運用.md)

## 自分の頭に残すこと

- PHP職人のように全部手打ちする力より、WordPressで使う型を読める力が先。
- HTML/CSS/BEMで作ったものを、必要な場所だけWordPress関数へ置き換える。
- GPTやスニペットを使う前提でも、出力の役割を分類できることは必要。
- ページURLは `home_url()`、テーマ内ファイルURLは `get_theme_file_uri()` で分ける。
