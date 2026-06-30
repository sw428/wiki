# 05_functions.phpとフック

## 目的

WordPressテーマで使う `functions.php` と、`add_action()` の考え方を整理する。

## 最初に見る結論

`functions.php` は、テーマ全体で使う設定や読み込み処理を書く場所。

CSSやJSの読み込みも、テンプレートに直接書くのではなく、`functions.php` で登録してWordPressの処理タイミングに引っかける。

## functions.phpとは

`functions.php` は、テーマの補助処理を書くファイル。

例:

- CSS / JSを読み込む
- テーマで使う機能を有効化する
- メニューやウィジェットなどの設定を追加する

`index.php` や `single.php` のように、ページ表示そのものを担当するテンプレートとは役割が違う。

## CSS読み込みの例

```php
<?php

function my_enqueue_styles() {
  wp_enqueue_style('ress', '//unpkg.com/ress/dist/ress.min.css', array(), false, 'all');
  wp_enqueue_style('style', get_stylesheet_uri(), array('ress'), false, 'all');
}
add_action('wp_enqueue_scripts', 'my_enqueue_styles');
```

このコードは、2つに分けて見る。

- `function my_enqueue_styles() { ... }`: CSS読み込み処理の箱を作る
- `add_action('wp_enqueue_scripts', 'my_enqueue_styles');`: WordPressのCSS / JS読み込みタイミングに、その箱を予約する

## フックとは

フックは、WordPressの決まった処理タイミングに、自分の処理を引っかける仕組み。

今回のコードなら、`wp_enqueue_scripts` というタイミングに、`my_enqueue_styles` という関数を引っかけている。

```php
add_action('wp_enqueue_scripts', 'my_enqueue_styles');
```

意味は次のように読む。

> WordPressがCSS / JSを読み込むタイミングになったら、`my_enqueue_styles` を実行してね。

## JavaScriptのイベント登録に近い感覚

JavaScriptで近いのは、イベント登録。

```js
button.addEventListener("click", 関数);
```

これは「ボタンがクリックされたタイミングで関数を実行してね」という意味。

WordPressの `add_action()` も、自分で今すぐ関数を実行するのではなく、WordPress側の決まった流れに処理を予約する。

## おまじないとして覚える範囲

最初は、完全に内部構造まで理解しきらなくてもよい。

ただし、丸暗記だけにすると、CSSが反映されないときに見る場所が分からなくなる。

最低限、次の3つに分けて理解する。

- `function`: 処理の箱を作る
- `wp_enqueue_style()`: CSS読み込み内容を書く
- `add_action()`: WordPressのタイミングに処理を予約する

## 実践側

- [functions.phpでCSSを読み込む](../制作/04_functions.phpでCSSを読み込む.md)

## 自分の頭に残すこと

- `functions.php` は、テーマ全体の補助処理を書く場所。
- フックは、WordPressの決まったタイミングに自分の処理を予約するもの。
- `function` を作っただけでは実行されない。`add_action()` でWordPressの流れに引っかける。
