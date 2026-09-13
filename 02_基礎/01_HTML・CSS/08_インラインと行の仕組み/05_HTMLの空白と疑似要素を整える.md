# 05_HTMLの空白と疑似要素を整える

HTMLの改行やインデント、疑似要素、Flexの `gap`は、すべて同じ「空白」ではない。どの段階で生まれた間隔かを分ける。

## 文字と、それを包む要素を区別する

```html
<p class="lead">Hello</p>
```

- `p.lead`は要素。
- `Hello`は、その要素の子として存在するテキストノード。
- CSSは `.lead`要素へ指定する。
- 色や文字サイズなどの値が、結果としてテキストの描画に使われる。

「親要素」という言葉だけでは対象が曖昧になることがある。文字の配置を調べるときは、まずテキストノードを直接包む要素を見つける。その外側は、幅やFlex・Gridなどの配置を確認するときに分けて見る。

詳細な用語の区別は[テキストノードとCSS適用境界](../../../05_参照/テキストノードとCSS適用境界.md)で確認できる。

## 疑似要素は内容の前後に生成される

```html
<li class="trail__item">
  現在のページ
</li>
```

```css
.trail__item::before {
  content: ">";
}
```

概念上の内容順は次のようになる。

```text
::before
→ 元からある要素・テキスト
→ ::after
```

疑似要素は内容の前後に生成され、その要素の行内レイアウトやFlexなどの規則に従って配置される。「直前の文字のベースライン終端から描画される」とは考えない。

## white-spaceは空白と折り返しを扱う

`white-space: normal`と `nowrap`は、どちらも通常の連続空白やソース上の改行を折り畳む。主な違いは自動折り返しである。

| 値 | 連続空白・改行 | 自動折り返し |
| --- | --- | --- |
| `normal` | 折り畳む | 許可する |
| `nowrap` | 折り畳む | 許可しない |

`nowrap`はHTMLの空白文字をDOMから削除する指定ではない。

## Flexでは見た目の間隔をCSSで指定する

Flexコンテナの子要素はflex itemになる。要素で包まれていないテキストも匿名のflex itemに包まれるが、空白だけのテキストは描画されない。

```css
.trail__item {
  display: flex;
  white-space: nowrap;
}

.trail__item + .trail__item::before {
  margin-inline: 6px;
  content: ">";
}
```

- FlexにしてもDOMから改行文字が削除されるわけではない。
- ソース上の改行やインデントを、見た目の間隔として利用しない。
- 必要な距離は `gap`や疑似要素のmarginで指定する。
- `white-space: nowrap`は項目内の折り返しを止める。親一覧の `flex-wrap`とは役割が違う。
- `align-items: center`は文字と記号の高さが異なるときに検討する。

パンくずでは、一覧側を `flex-wrap: wrap`、各項目を `white-space: nowrap`にすると、文字の途中ではなく項目単位で次の行へ送りやすい。

## 仕様確認先

- [CSS Text Module Level 3 - White Space and Wrapping](https://www.w3.org/TR/css-text-3/#white-space-property)
- [CSS Flexible Box Layout Module Level 1 - Flex Items](https://www.w3.org/TR/css-flexbox-1/#flex-items)
