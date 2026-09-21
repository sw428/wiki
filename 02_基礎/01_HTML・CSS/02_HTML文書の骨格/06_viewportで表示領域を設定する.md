# 06_viewportで表示領域を設定する

## このページの役割

`viewport`の指定で、スマートフォンなどの小さな画面で使う表示領域の基準を設定する。

レスポンシブサイトでは、次の形を基本にする。

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

## viewportは表示領域の基準になる

ブラウザがWebページを表示するときは、レイアウトを計算するための表示領域を使う。

モバイルブラウザでは、古いPC向けページを表示するために、実際の端末画面より広いレイアウト用viewportを使ってから縮小表示することがある。

レスポンシブサイトでは、

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

を指定して、端末に合った幅を基準にレイアウトできるようにする。

## `width=device-width`は幅の基準を合わせる

```text
width=device-width
```

は、レイアウト用viewportの幅を、その端末でページ表示に使う幅に合わせる指定。

たとえばCSSで、

```css
@media (min-width: 768px) {
  ...
}
```

と書いた場合も、そのviewport幅を基準にmedia queryが判定される。

## `initial-scale=1`は初期倍率を指定する

```text
initial-scale=1
```

は、ページを最初に表示するときの拡大率を1にする指定。

基本形では、

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

のように、幅の指定と合わせて使う。

## viewportだけでレスポンシブになるわけではない

viewportを指定しただけで、ページ全体が自動的にレスポンシブになるわけではない。

```text
viewport
→ レイアウトに使う表示領域の基準を整える

CSS
→ その幅に合わせて実際のレイアウトを変える
```

という役割分担になる。

可変幅、media query、画像サイズなどのCSS側の設計と組み合わせて使う。

## ズームを妨げる指定は基本形に入れない

次のように、利用者のズームを制限する指定もある。

```text
maximum-scale=1

user-scalable=no
```

ただし、利用者が必要に応じて拡大できなくなるため、このWikiの基本形には加えない。

## 一言でいうと

`viewport`は小さな画面で使う表示領域の基準を整える指定で、レスポンシブサイトでは`width=device-width, initial-scale=1`を基本形として使う。

## 仕様確認先

- [CSS Viewport Module Level 1](https://drafts.csswg.org/css-viewport/)
- [W3C WAI - Meta viewport allows for zoom](https://www.w3.org/WAI/standards-guidelines/act/rules/b4f0c3/)
