# 05_nth-childとnth-of-typeを使い分ける

`:nth-child()`と`:nth-of-type()`は、どちらも同じ親を持つ要素間の順番を条件にする。違いは、すべての子要素を数えるか、同じ型の要素だけを数えるかである。

## 最初に押さえる結論

- `:nth-child()`は、同じ親を持つ要素全体の中で何番目かを見る。
- `:nth-of-type()`は、同じ型の兄弟要素の中で何番目かを見る。HTMLでは通常、同じタグ名ごとの順番になる。
- 通常の書き方では、どちらも「同じクラスを持つ要素だけ」を集めて数えない。
- テキストノードやコメントではなく、要素の兄弟順を数える。
- Flex・Gridの`order`などで見た目の順序を変えても、数えるDOM上の順番は変わらない。

式を暗算する必要はない。HTMLとセレクタを並べ、どの要素を母集団として数えるかを先に確認する。

## `:nth-of-type()`は同じタグ種類を数える

```css
p:nth-of-type(2) {
  color: red;
}
```

```html
<section>
  <h2>タイトル</h2>
  <p>1つ目のp</p>
  <div>途中のdiv</div>
  <p>2つ目のp</p>
</section>
```

赤くなるのは2つ目の`p`である。途中の`div`は`p`ではないため、`p`の順番には入らない。

## `:nth-child()`はすべての子要素を数える

```css
p:nth-child(2) {
  color: red;
}
```

```html
<section>
  <h2>タイトル</h2>
  <p>1つ目のp</p>
</section>
```

この`p`は親の子要素全体の2番目なので一致する。

```html
<section>
  <h2>タイトル</h2>
  <div>説明</div>
  <p>1つ目のp</p>
</section>
```

この`p`は子要素全体では3番目なので、`p:nth-child(2)`には一致しない。

## セレクタを前に書いてもクラス順にはならない

```css
.card:nth-of-type(-n + 2) {
  grid-column: span 3;
}
```

これは「`.card`の中で1〜2番目」ではない。同じタグ種類の兄弟要素の中で1〜2番目にあり、さらに`.card`を持つ要素へ一致する。

```html
<div class="intro">説明</div>
<div class="card">カード1</div>
<div class="card">カード2</div>
<div class="card">カード3</div>
```

- 1番目の`div`: `.intro`
- 2番目の`div`: `.card`のカード1
- 3番目の`div`: `.card`のカード2

この場合に一致するカードはカード1だけである。カード2は`.card`としては2番目でも、`div`としては3番目なので外れる。

## カード一覧では何が混ざるか確認する

```css
.list > .card:nth-child(-n + 2) {
  grid-column: span 3;
}
```

これは、`.list`直下の子要素全体の1〜2番目で、かつ`.card`を持つ要素へ一致する。

```html
<div class="list">
  <article class="card">カード1</article>
  <article class="card">カード2</article>
  <article class="card">カード3</article>
</div>
```

直下にカードだけが並ぶなら、1枚目・2枚目のカード指定として読める。途中へ見出しや広告が入れば、カードの番号と子要素全体の番号がずれる。

## 判断基準

| 見たい順番 | 候補 |
| --- | --- |
| 親の子要素全体の順番 | `:nth-child()` |
| 同じタグ種類の順番 | `:nth-of-type()` |
| 指定した条件へ一致する兄弟内の順番 | [`:nth-child(An+B of S)`](./06_nth-childのof-Sで対象を絞って数える.md) |
| 順番ではなく役割 | [明示クラス](./07_構造依存から明示クラスへ切り替える.md) |

## 仕様確認先

- [Selectors Level 4 - `:nth-child()`](https://www.w3.org/TR/selectors-4/#the-nth-child-pseudo)
- [Selectors Level 4 - `:nth-of-type()`](https://www.w3.org/TR/selectors-4/#the-nth-of-type-pseudo)
- [CSS Flexible Box Layout - Reordering and Accessibility](https://www.w3.org/TR/css-flexbox-1/#order-accessibility)
