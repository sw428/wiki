# 01_contenteditable属性とcontentEditableプロパティを区別する

主な基礎：[ブール属性と列挙型属性を区別する](../../02_基礎/01_HTML・CSS/03_HTML属性の基本/04_ブール属性と列挙型属性を区別する.md)。`contenteditable`のHTML属性と、JavaScriptから扱う`contentEditable`プロパティで使える値が違う理由を確認する。

## HTML属性では`inherit`を書かない

HTMLの`contenteditable`属性は列挙型属性で、次のキーワードを使う。

```html
<div contenteditable="true">編集できる</div>
<div contenteditable="false">編集できない</div>
<div contenteditable="plaintext-only">書式なしで編集できる</div>
```

属性を省略した場合と無効な値を指定した場合は、どちらも親の編集可否を継承するInherit状態になる。

```html
<div contenteditable="inherit">...</div>
```

ただし、`inherit`はHTML属性へ書ける有効なキーワードではない。この指定は無効な値としてInherit状態になるだけなので、継承させたい場合は`contenteditable`属性自体を省略する。

## DOMプロパティでは`"inherit"`を扱える

JavaScriptから使う`element.contentEditable`プロパティは、次の文字列を取得・設定できる。

```text
"true"
"plaintext-only"
"false"
"inherit"
```

このプロパティへ`"inherit"`を設定すると、HTMLの`contenteditable`属性が取り除かれる。

```js
element.contentEditable = "inherit";
```

つまり、同じ機能に関係していても、

```text
HTML属性の有効なキーワード
≠
DOMプロパティが受け取る文字列
```

となる場合がある。

## どちらを確認しているか分ける

HTMLを書くときは、`contenteditable`属性で有効なキーワードと、省略時・不正値の状態を確認する。

JavaScriptから変更するときは、`contentEditable`プロパティが受け取る値と、その設定がHTML属性へどう反映されるかを確認する。

属性とDOMプロパティは名前が似ていても、値と操作結果を同じ規則で判断しない。

## 一言でいうと

HTMLの`contenteditable`属性では`inherit`を有効な値として書かず、JavaScriptの`contentEditable`プロパティでは`"inherit"`を設定すると属性が取り除かれる。

## 仕様確認先

- [HTML Standard - The `contenteditable` attribute](https://html.spec.whatwg.org/multipage/interaction.html#the-contenteditable-attribute)
