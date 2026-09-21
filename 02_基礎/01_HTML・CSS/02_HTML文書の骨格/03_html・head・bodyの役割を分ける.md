# 03_html・head・bodyの役割を分ける

## このページの役割

HTML文書の基本構造として使う、

```text
html

head

body
```

の役割を区別する。

## `html`は文書全体の根になる

HTML文書全体は、`html`要素の中に入る。

```html
<html lang="ja">
  <head>
    ...
  </head>
  <body>
    ...
  </body>
</html>
```

`html`にある`lang`の役割は[langで文書の言語を示す](./04_langで文書の言語を示す.md)で確認する。

構造だけを見ると、

```text
html
├─ head
└─ body
```

となる。

`html`は、HTML文書全体をまとめる一番外側の要素として見る。

## `head`には文書を支える情報を書く

`head`には、ページ本文そのものではなく、文書についての情報や外部ファイルの読み込みを書く。

たとえば、

```html
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>ページタイトル</title>
  <link rel="stylesheet" href="css/style.css">
  <script src="js/menu.js" defer></script>
</head>
```

のような内容が入る。

`description`、favicon、`canonical`、`alternate`なども、目的に応じて`head`へ置く。基本形へ一律に追加せず、その情報が誰に何を伝えるのか確認して使う。

ここでは、それぞれの詳しい役割までは扱わない。

## `body`にはページの内容を書く

`body`には、ページの内容になる要素を書く。

```html
<body>
  <h1>料金案内</h1>
  <p>料金について紹介します。</p>
</body>
```

見出し、文章、画像、リンク、ボタンなど、ページを構成する内容は基本的に`body`の中へ書く。

`body`の中にあることは、常に画面へ見えていることを意味しない。CSSやJavaScriptによって非表示になる場合も、文書内容としては`body`に置く。

## `head`と`body`を分けて読む

HTML文書を見るときは、

```text
head
→ 文書を支える情報

body
→ ページの内容
```

と分けて考える。

たとえば、

```html
<title>料金案内</title>
```

は文書の名前を示す情報なので`head`に入り、

```html
<h1>料金案内</h1>
```

はページ本文の見出しなので`body`に入る。

見た目が似ていても役割は別。

## 基本形では明示して書く

HTMLでは、条件によって`html`、`head`、`body`のタグを省略できる場合がある。

ただし、HTML文書の構造を読み取りやすくするため、このWikiの基本形では省略せずに書く。

## 一言でいうと

`html`は文書全体、`head`は文書を支える情報、`body`はページの内容をまとめる。

## 仕様確認先

- [HTML Standard - The `html` element](https://html.spec.whatwg.org/multipage/semantics.html#the-html-element)
- [HTML Standard - The `head` element](https://html.spec.whatwg.org/multipage/semantics.html#the-head-element)
- [HTML Standard - The `body` element](https://html.spec.whatwg.org/multipage/sections.html#the-body-element)
