# 11_baseで相対URLの基準を変える

## このページの役割

`base`要素を使って、HTML文書内の相対URLを解決するときの基準を変更する方法を扱う。

`base`は通常の静的サイト制作で頻繁に使う要素ではないため、必要になったときに参照できればよい。

## 通常はHTML文書のURLが基準になる

相対URLは、基本的に現在のHTML文書のURLを基準に解決される。

たとえば、

```html
<a href="guide.html">ガイド</a>
```

という記述があり、現在のHTML文書が、

```text
https://example.com/docs/index.html
```

にある場合、

```text
guide.html
↓
https://example.com/docs/guide.html
```

として解決される。

## `base`で基準URLを変更できる

`base`要素の`href`属性を指定すると、その文書内の相対URLを解決するときの基準を変更できる。

```html
<head>
  <base href="https://example.com/docs/">
</head>
```

この状態で、

```html
<a href="guide.html">ガイド</a>
```

と書くと、

```text
guide.html
↓
https://example.com/docs/guide.html
```

として解決される。

現在のHTML文書が別の場所にあっても、相対URLは`base`で指定したURLを基準にする。

## 影響するのは`a`だけではない

`base`は、特定のリンクだけに適用されるものではない。

文書内で相対URLを使っているさまざまな要素に影響する。

```html
<head>
  <base href="https://example.com/assets/">

  <link rel="stylesheet" href="css/style.css">
</head>

<body>
  <img src="img/photo.jpg" alt="">
  <script src="js/main.js"></script>
</body>
```

この場合、それぞれの相対URLは、

```text
css/style.css
↓
https://example.com/assets/css/style.css

img/photo.jpg
↓
https://example.com/assets/img/photo.jpg

js/main.js
↓
https://example.com/assets/js/main.js
```

のように解決される。

## ページ内リンクにも影響する

```html
<head>
  <base href="https://example.com/docs/">
</head>
<body>
  <a href="#usage">使い方へ</a>
</body>
```

`#usage`も基準URLに対して解決されるため、現在のHTML文書内を移動するだけとは限らない。

CSS・JavaScript・画像は読み込めていても、ページ内リンクが想定外の文書へ向く場合がある。`base`を使うときは、フラグメントだけのリンクも確認する。

## `base`は`head`内に書く

`base`要素は`head`内に記述する。

```html
<head>
  <base href="https://example.com/docs/">
</head>
```

文書内で基準URLとして使われるのは、`href`を持つ最初の`base`要素である。

そのため、複数の基準URLを使い分ける目的では使えない。

## 相対URL全体に影響する

`base`を指定すると、文書内の多くの相対URLにまとめて影響する。

そのため、

```html
<base href="https://example.com/docs/">
```

を追加すると、既存の、

```html
<a href="contact.html">お問い合わせ</a>
<img src="img/logo.svg" alt="">
```

などの参照先も変わる可能性がある。

一つの画像やCSSだけ参照先を変更したい場合に使う要素ではない。その場合は、それぞれの`href`や`src`を直接変更する。

## 通常は必要になったときに使う

一般的な静的サイトでは、

```html
<link rel="stylesheet" href="css/style.css">
<img src="img/photo.jpg" alt="">
<script src="js/main.js" defer></script>
```

のように、それぞれの要素でパスを指定すれば十分なことが多い。

`base`は、

```text
文書全体の相対URLの基準を変更したい
```

という明確な理由がある場合に使う。

## 仕様確認先

- [HTML Standard - The `base` element](https://html.spec.whatwg.org/multipage/semantics.html#the-base-element)
- [HTML Standard - Document base URLs](https://html.spec.whatwg.org/multipage/urls-and-fetching.html#document-base-urls)
