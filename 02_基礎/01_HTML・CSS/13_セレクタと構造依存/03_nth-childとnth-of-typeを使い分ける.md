# 03_nth-childとnth-of-typeを使い分ける

`:nth-child()`と`:nth-of-type()`は、どちらも同じ親を持つ要素間の順番を条件にする。違いは、すべての要素を数えるか、同じ型の要素だけを数えるかである。

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
.c-blog-card:nth-of-type(-n + 2) {
  grid-column: span 3;
}
```

これは「`.c-blog-card`の中で1〜2番目」ではない。同じタグ種類の兄弟要素の中で1〜2番目にあり、さらに`.c-blog-card`を持つ要素へ一致する。

```html
<div class="intro">説明</div>
<div class="c-blog-card">カード1</div>
<div class="c-blog-card">カード2</div>
<div class="c-blog-card">カード3</div>
```

- 1番目の`div`: `.intro`
- 2番目の`div`: `.c-blog-card`のカード1
- 3番目の`div`: `.c-blog-card`のカード2

この場合に一致するカードはカード1だけである。カード2は`.c-blog-card`としては2番目でも、`div`としては3番目なので外れる。

## カード一覧では何が混ざるか確認する

```css
.blog-articles__list > .c-blog-card:nth-child(-n + 2) {
  grid-column: span 3;
}
```

これは、`.blog-articles__list`直下の子要素全体の1〜2番目で、かつ`.c-blog-card`を持つ要素へ一致する。

```html
<div class="blog-articles__list">
  <article class="c-blog-card">カード1</article>
  <article class="c-blog-card">カード2</article>
  <article class="c-blog-card">カード3</article>
</div>
```

直下にカードだけが並ぶなら、1枚目・2枚目のカード指定として読める。途中へ見出しや広告が入れば、カードの番号と子要素全体の番号がずれる。

## `of S`を書いた`:nth-child()`は先に対象を絞る

Selectors Level 4には、次の書き方がある。

```css
:nth-child(-n + 2 of .c-blog-card) {
  grid-column: span 3;
}
```

これは、同じ親を持つ兄弟のうち`.c-blog-card`へ一致する要素に絞り、その一覧の1〜2番目を選ぶ。次の2つは数え方が違う。

```css
/* 子要素全体の1〜2番目で、かつカード */
.c-blog-card:nth-child(-n + 2) {}

/* カードへ絞った一覧の1〜2番目 */
:nth-child(-n + 2 of .c-blog-card) {}
```

この章で「`:nth-child()`は子要素全体を数える」と説明するときは、`of S`を省略した通常形を指す。`of S`を採用する場合は、対象ブラウザーの対応条件も確認する。

## 判断基準

| 見たい順番 | 候補 |
| --- | --- |
| 親の子要素全体の順番 | `:nth-child()` |
| 同じタグ種類の順番 | `:nth-of-type()` |
| 指定した条件へ一致する兄弟内の順番 | `:nth-child(An+B of S)` |
| 順番ではなく「大きいカード」などの役割 | 明示クラス |

W3C Selectors Level 4では、`:nth-child(An+B of S)`を`S`へ一致する兄弟要素の一覧、`:nth-of-type()`を同じ型の兄弟要素間の位置として定義している。

## 仕様で確認する

- [Selectors Level 4 - `:nth-child()`](https://www.w3.org/TR/selectors-4/#the-nth-child-pseudo)
- [Selectors Level 4 - `:nth-of-type()`](https://www.w3.org/TR/selectors-4/#the-nth-of-type-pseudo)
- [CSS Flexible Box Layout - Reordering and Accessibility](https://www.w3.org/TR/css-flexbox-1/#order-accessibility)

## 次に判断すること

途中へ別要素が入った時も同じ見た目・意味にしたいかを確認する。構造変更で意図がずれるなら、[構造依存から明示クラスへ切り替える](./04_構造依存から明示クラスへ切り替える.md)へ進む。

## 一言でいうと

`of S`のない`:nth-child()`は子要素全体、`:nth-of-type()`は同じタグ種類を数える。クラスへ絞って数える`of S`構文とは分けて読む。
