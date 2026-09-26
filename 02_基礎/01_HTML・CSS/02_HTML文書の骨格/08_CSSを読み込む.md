# 08_CSSを読み込む

## このページの役割

外部CSSファイルをHTMLから読み込む方法を確認する。

基本形は次の形。

```html
<link rel="stylesheet" href="css/style.css">
```

## CSSは`link`で読み込む

外部CSSは、通常`head`の中から読み込む。

```html
<head>
  <link rel="stylesheet" href="css/style.css">
</head>
```

`rel="stylesheet"`は、リンク先のファイルがこのHTML文書へ適用するスタイルシートであることを示す。

`href`には、読み込むCSSファイルの場所を書く。

## `href`にCSSファイルのパスを書く

たとえば、

```text
index.html
css/
└─ style.css
```

[baseで相対URLの基準を変えていない](./11_baseで相対URLの基準を変える.md)構成なら、

```html
<link rel="stylesheet" href="css/style.css">
```

と書く。

CSSが反映されない場合は、まず`href`が正しいファイルを指しているか確認する。

## 複数のCSSを読み込むこともできる

CSSファイルを分けている場合は、`link`を複数書ける。

```html
<link rel="stylesheet" href="css/reset.css">
<link rel="stylesheet" href="css/style.css">
```

reset CSSの上からサイト固有のCSSを適用するような構成では、土台になるCSSを先に、上書きする側を後に読み込む。

ただし、後に書いたCSSが常に優先されるわけではない。

実際にどの指定が使われるかは、[CSSのカスケード](../06_CSSカスケードとDevToolsの見方/04_カスケード全体の優先順位.md)によって決まる。

## 読み込めているか確認する

CSSが反映されないときは、次の順で確認する。

```text
hrefのパス
↓
NetworkでCSSを取得できているか
↓
ElementsのStylesに目的のCSSがあるか
```

まずファイル自体を読み込めているかと、読み込んだCSSの中でどの指定が適用されているかを分けて確認する。適用結果の見方は[DevToolsで適用されたCSSを確認する](../06_CSSカスケードとDevToolsの見方/01_DevToolsで適用されたCSSを確認する.md)で扱う。

## 一言でいうと

外部CSSは`link rel="stylesheet"`で`head`から読み込み、`href`にCSSファイルの場所を指定する。

## 仕様確認先

- [HTML Standard - The `link` element](https://html.spec.whatwg.org/multipage/semantics.html#the-link-element)
- [CSS Cascade Level 6 - Cascade sorting order](https://www.w3.org/TR/css-cascade-6/#cascade-sort)
