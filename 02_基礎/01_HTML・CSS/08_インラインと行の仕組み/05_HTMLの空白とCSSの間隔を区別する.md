# 05_HTMLの空白とCSSの間隔を区別する

HTMLの改行やインデントによる空白と、CSSの `gap`やmarginで作る間隔は別のものとして扱う。ソース上の空白を見た目の距離へ流用せず、どの段階で間隔が生じたかを分けて確認する。

## HTMLの改行やインデントも文字として存在する

```html
<nav class="trail">
  <a href="/">ホーム</a>
  <a href="/news/">お知らせ一覧</a>
</nav>
```

要素間の改行やインデントは、DOM上では空白文字を持つテキストノードとして存在する。通常の行内レイアウトでは折り畳まれ、一つの空白として見える場合がある。

テキストノードと要素の違いから確認する場合は、[テキストノードとCSS適用境界](../../../05_参照/テキストノードとCSS適用境界.md)へ戻る。

## white-spaceは空白と折り返しを扱う

`white-space: normal`と `nowrap`は、どちらも通常の連続空白やソース上の改行を折り畳む。主な違いは自動折り返しである。

| 値 | 連続空白・改行 | 自動折り返し |
| --- | --- | --- |
| `normal` | 折り畳む | 許可する |
| `nowrap` | 折り畳む | 許可しない |

`nowrap`はHTMLの空白文字をDOMから削除する指定ではない。

## 見た目の間隔はCSSで指定する

Flexコンテナの子要素はflex itemになる。要素で包まれていないテキストも匿名のflex itemに包まれるが、空白だけのテキストは描画されない。DOMから空白文字が削除されたわけではなく、Flexレイアウト上で間隔として描画されないという違いである。

```css
.trail {
  display: flex;
  flex-wrap: wrap;
  gap: 6px 12px;
}

.trail > a {
  white-space: nowrap;
}
```

- FlexにしてもDOMから改行文字が削除されるわけではない。
- ソース上の改行やインデントを、見た目の間隔として利用しない。
- 必要な距離は `gap`や `margin`で指定する。
- `white-space: nowrap`は項目内の折り返しを止める。親一覧の `flex-wrap`とは役割が違う。

パンくずなどでは、一覧側を `flex-wrap: wrap`、各項目を `white-space: nowrap`にすると、文字の途中ではなく項目単位で次の行へ送りやすい。文字と疑似要素を並べて区切り記号を作る場合は、[inline-blockとinline-flexの使い分け](./03_inline-blockとinline-flexを使い分ける.md#疑似要素もpaddingの内側に入る)で配置関係を確認する。

## 仕様確認先

- [CSS Text Module Level 3 - White Space and Wrapping](https://www.w3.org/TR/css-text-3/#white-space-property)
- [CSS Flexible Box Layout Module Level 1 - Flex Items](https://www.w3.org/TR/css-flexbox-1/#flex-items)
