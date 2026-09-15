# 02_headに文書情報を書く

`head`には、ページ本文ではなく文書を識別・解釈・表示するための情報を置く。最初は文字エンコーディング、viewport、文書タイトルの三つを、役割を分けて読む。

```html
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>料金案内 | サイト名</title>
</head>
```

## `charset`は文字の解釈方法を伝える

```html
<meta charset="utf-8">
```

文字エンコーディング宣言は、HTMLファイルのバイト列をどの文字として読むかをブラウザへ伝える。通常はUTF-8を使う。

HTML Standardでは、この宣言を文書の先頭1024バイト以内に完全に収める必要がある。バイト数を毎回数えるのではなく、`head`の開始直後へ置けば条件を満たしやすく、文字化け時にも確認場所が分かりやすい。

HTTPの`Content-Type`ヘッダーなど別の場所から伝わるエンコーディングとの不一致も起こり得る。文字化けを調べるときは、HTMLの`meta`だけでなくサーバーのレスポンスヘッダーとファイルの保存形式も確認する。

## `viewport`は小さな画面の表示領域を設定する

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

モバイルブラウザは、古いPC向けページを扱うため、実際の画面より広いレイアウト用viewportを使ってから縮小表示することがある。レスポンシブサイトでは、上の指定を基本形にする。

```txt
width=device-width
-> レイアウト用viewportの幅を端末側の幅へ合わせる

initial-scale=1
-> 初期の拡大率を1にする
```

これはレスポンシブ対応そのものではない。CSSのmedia queryや可変レイアウトが、意図したviewport幅を基準に働くための入口。

`maximum-scale=1`や`user-scalable=no`で利用者のズームを妨げる指定は、基本形へ加えない。

## `title`は文書を単独でも識別できる名前にする

```html
<title>料金案内 | サイト名</title>
```

`title`要素は文書のタイトルや名前を表し、ブラウザのタブ、履歴、ブックマークなど文書外のUIでも使われる。本文の主見出し`h1`とは役割が違う。

```html
<title>料金案内 | サイト名</title>
```

```html
<body>
  <h1>料金案内</h1>
</body>
```

`title`はページ単独でも内容を識別できる名前にする。通常のWeb文書では`head`内に一つ置き、同じ文書へ複数書かない。

description、favicon、canonical、alternateなども`head`に入ることがあるが、この三つと同時にすべて覚える必要はない。目的が生じたとき、その情報が誰に何を伝えるか確認して追加する。

## 一言でいうと

`charset`は文字、`viewport`は小さな画面の表示領域、`title`は文書の名前を伝える。

## 仕様確認先

- [HTML Standard - The `meta` element](https://html.spec.whatwg.org/multipage/semantics.html#the-meta-element)
- [HTML Standard - The `title` element](https://html.spec.whatwg.org/multipage/semantics.html#the-title-element)
- [CSS Viewport Module Level 1](https://drafts.csswg.org/css-viewport/)
- [W3C WAI - Meta viewport allows for zoom](https://www.w3.org/WAI/standards-guidelines/act/rules/b4f0c3/)
