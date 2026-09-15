# 04_baseで相対URLの基準を変える

`base`要素は、文書内の相対URLを解決するときの基準を変える。CSSや画像など一つの参照先だけを変える要素ではないため、通常の静的サイトでは必要が明確な場合だけ使う。

## 相対URL全体の基準になる

```html
<head>
  <base href="https://example.com/docs/">
</head>
<body>
  <a href="guide.html">ガイド</a>
</body>
```

この`guide.html`は、文書自体のURLではなく`base`のURLを基準に解決される。

```txt
guide.html
-> https://example.com/docs/guide.html
```

影響するのは`a`だけではない。`link`、`script`、`img`などの相対URLも同じ文書基準URLを使う。

## ページ内リンクにも影響する

```html
<base href="https://example.com/docs/">
<a href="#usage">使い方へ</a>
```

`#usage`も基準URLに対して解決されるため、現在のHTML内を移動するだけとは限らない。CSS・JavaScript・画像は読めるのにページ内リンクだけ想定外の場所へ移動する、といった混乱にもつながる。

## 複数書いて使い分けない

文書の基準URLには、DOMツリー順で最初に現れる`href`付き`base`が使われる。複数の`base`を置いて、後ろの参照だけ別基準に切り替える用途には使わない。

通常の静的サイトでは、各HTMLファイルの位置を基準に相対パスを書くほうが影響範囲を追いやすい。外部から埋め込むHTMLなど、文書全体のURL基準を変える必要がある場合に、すべての参照先を確認して採用する。

## 一言でいうと

`base`は一つのリンクではなく文書全体の相対URL基準を変えるため、影響範囲を確認できる場合だけ使う。

## 仕様確認先

- [HTML Standard - The `base` element](https://html.spec.whatwg.org/multipage/semantics.html#the-base-element)
- [HTML Standard - Document base URLs](https://html.spec.whatwg.org/multipage/urls-and-fetching.html#document-base-urls)
