# 04_functions.phpでCSSを読み込む

## 目的

WordPressテーマで、`style.css` を画面に反映させるための作業を整理する。

## 最初に見る結論

WordPressでは、HTMLの `<head>` に直接 `<link>` を書くのではなく、`functions.php` でCSSを登録して読み込む。

普通のHTMLなら、CSS読み込みは次のように書く。

```html
<link rel="stylesheet" href="style.css">
```

WordPressテーマでは、基本は `wp_enqueue_style()` を使う。

## この回でやること

`⑥CSSファイル読込編` は、確認だけではなく実作業がある回。

1. `functions.php` を作る
2. `functions.php` にCSS読み込みコードを書く
3. `style.css` が画面に反映されるか確認する

## 作る場所

```text
wp-content/themes/blog/functions.php
```

作業前が次の形なら、

```text
blog/
├── index.php
├── style.css
├── header.php
├── footer.php
└── sidebar.php
```

この回で次の形にする。

```text
blog/
├── index.php
├── style.css
├── header.php
├── footer.php
├── sidebar.php
└── functions.php
```

## 書くコード

```php
<?php

function my_enqueue_styles() {
  wp_enqueue_style('ress', '//unpkg.com/ress/dist/ress.min.css', array(), false, 'all');
  wp_enqueue_style('style', get_stylesheet_uri(), array('ress'), false, 'all');
}
add_action('wp_enqueue_scripts', 'my_enqueue_styles');
```

## コードの意味

`wp_enqueue_style('ress', '//unpkg.com/ress/dist/ress.min.css', array(), false, 'all');`

これは、リセットCSSの `ress` を読み込む指定。

`wp_enqueue_style('style', get_stylesheet_uri(), array('ress'), false, 'all');`

これは、テーマ直下の `style.css` を読み込む指定。

`array('ress')` があるので、`ress` を先に読み込んでから `style.css` を読む順番になる。

## フックとして見る

```php
add_action('wp_enqueue_scripts', 'my_enqueue_styles');
```

これは、WordPressがCSS / JSを読み込むタイミングになったら、`my_enqueue_styles` を実行してね、という予約。

`function my_enqueue_styles() { ... }` だけだと、処理の箱を作っただけで、まだ実行されない。

`add_action()` でWordPress側の決まったタイミングに引っかけることで、CSS読み込み処理が実行される。

近い感覚としては、JavaScriptのイベント登録に似ている。

```js
button.addEventListener("click", 関数);
```

`addEventListener` が「クリックされたら関数を実行してね」なら、WordPressの `add_action` は「このタイミングが来たら関数を実行してね」に近い。

詳しくは [functions.phpとフック](../基礎/05_functions.phpとフック.md) に戻す。

## VS Codeスニペット

基本的な使い分けはここに置く。

スニペットが反応しない場合や、まとめて `php.json` に入れる場合は [WordPressスニペット運用](./開発環境/02_WordPressスニペット運用.md) を見る。

`functions.php` の先頭に `<?php` がまだない新規ファイル用。

```json
"WordPress enqueue styles with php tag": {
  "prefix": "wpenqfull",
  "body": [
    "<?php",
    "",
    "// CSS読み込み用の関数を作る",
    "function my_enqueue_styles() {",
    "",
    "  // ress.css を先に読み込む",
    "  wp_enqueue_style('ress', '//unpkg.com/ress/dist/ress.min.css', array(), false, 'all');",
    "",
    "  // style.css を ress の後に読み込む",
    "  wp_enqueue_style('style', get_stylesheet_uri(), array('ress'), false, 'all');",
    "}",
    "",
    "// WordPressのCSS/JS読み込みタイミングで my_enqueue_styles を実行する",
    "add_action('wp_enqueue_scripts', 'my_enqueue_styles');"
  ],
  "description": "WordPress enqueue CSS with PHP tag"
}
```

すでに `<?php` があるファイルへ追記する用。

```json
"WordPress enqueue styles no php tag": {
  "prefix": "wpenq",
  "body": [
    "// CSS読み込み用の関数を作る",
    "function my_enqueue_styles() {",
    "",
    "  // ress.css を先に読み込む",
    "  wp_enqueue_style('ress', '//unpkg.com/ress/dist/ress.min.css', array(), false, 'all');",
    "",
    "  // style.css を ress の後に読み込む",
    "  wp_enqueue_style('style', get_stylesheet_uri(), array('ress'), false, 'all');",
    "}",
    "",
    "// WordPressのCSS/JS読み込みタイミングで my_enqueue_styles を実行する",
    "add_action('wp_enqueue_scripts', 'my_enqueue_styles');"
  ],
  "description": "WordPress enqueue CSS without PHP tag"
}
```

おすすめ運用:

- 新規 `functions.php` に最初から入れる: `wpenqfull`
- すでに `<?php` があるファイルに追加する: `wpenq`

`functions.php` では、`<?php` はファイル先頭に1回だけでよい。

## 反映されないときに見る場所

1. `functions.php` がテーマフォルダ直下にあるか
2. `wp_enqueue_style()` が書かれているか
3. `add_action('wp_enqueue_scripts', 'my_enqueue_styles');` があるか
4. `header.php` 側に `wp_head()` があるか
5. DevToolsでCSSが404になっていないか

## 自分の頭に残すこと

- `⑥CSSファイル読込編` は、`functions.php` を作ってCSS読み込みを書く回。
- `style.css` にCSSを書くだけでは、読み込まれていなければ画面に反映されない。
- `function` は処理の箱を作る。
- `wp_enqueue_style()` はCSS読み込み内容を書く。
- `add_action()` はWordPressのタイミングに処理を予約する。
- スニペットは時短用。反映されない原因を切り分けるため、`wp_head()` / `wp_footer()` / `functions.php` の役割は読めるようにする。
