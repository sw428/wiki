# 03_idとclassを使い分ける

`id`は一つの要素を識別し、`class`は複数の要素にも使える分類を付ける。

どちらもCSSやJavaScriptから利用できるが、同じ目的で使うものではない。

## `id`は一つの要素を識別する

```html
<section id="about">
  <h2>概要</h2>
</section>
```

`id`は、その要素を他の要素と区別して参照するための識別子。

同じツリー内では、同じ`id`を複数の要素へ付けない。値は空にせず、ASCII空白を含めない。

```html
<section id="about">...</section>
<section id="about">...</section>
```

同じ`id`が複数あっても、見た目がすぐに壊れるとは限らない。

しかし、ページ内リンク、JavaScript、フォーム、ARIAなどから参照したとき、意図した対象を一つに決められなくなる。

## `id`を別の場所から参照する

### ページ内リンク

```html
<a href="#about">概要へ</a>

<section id="about">
  <h2>概要</h2>
</section>
```

`href="#about"`は、`id="about"`の要素を参照する。

### JavaScript

```html
<button id="menu" type="button">メニュー</button>
```

```js
const button = document.getElementById("menu");
```

`id`は、JavaScriptから特定の要素を参照するときにも使える。

### `label`と入力欄

```html
<label for="email">メールアドレス</label>
<input id="email" name="email" type="email">
```

`label`の`for`と入力欄の`id`を一致させると、二つの要素を関連付けられる。

ラベルの文字が入力欄の名前として支援技術へ伝わり、多くの環境ではラベルを操作すると対応する入力欄へフォーカスしたり、コントロールを操作したりできる。

## `class`は要素を分類する

```html
<article class="card featured">...</article>
<article class="card">...</article>
```

`class`は、一つ以上の分類へ要素を所属させる。

同じ`class`を複数の要素へ付けることができ、一つの要素へ複数の`class`を付けることもできる。

`class`属性の値には、クラス名を空白で区切って並べる。

この例では、最初の`article`は、

```text
card
featured
```

という二つのクラスに所属している。

## `class`をCSSやJavaScriptから使う

CSSでは、同じ分類へ共通のスタイルを指定できる。

```css
.card {
  padding: 24px;
}
```

JavaScriptでは、同じ分類に属する要素をまとめて取得できる。

```js
const cards = document.querySelectorAll(".card");
```

`class`自体にはHTML上の意味や動作はなく、CSSやJavaScriptから共通の対象を選ぶための分類として使う。

`class`をCSSの対象として使う最小例は[一つの箱を作る](../05_ボックスとdisplay/01_一つの箱とdisplay.md#htmlとcssをつないで一つの箱を作る)で確認する。クラス名の採用方針は[BEMとクラス命名](../../07_設計/CSS設計/01_BEMとクラス命名.md)、セレクタが実際に選ぶ要素は[セレクタが選ぶ要素を確認する](../14_セレクタと構造依存/01_セレクタが選ぶ要素を確認する.md)で扱う。

## `id`と`class`を選ぶ

一つの要素を識別して参照する必要があるなら、`id`を使う。

```html
<h2 id="title">お知らせ</h2>
```

複数の要素を同じ分類として扱うなら、`class`を使う。

```html
<article class="card">...</article>
<article class="card">...</article>
<article class="card">...</article>
```

判断するときは、

- 一つの要素を参照したいか
- 複数の要素を同じ対象として扱いたいか

を見る。

## 仕様確認先

- [HTML Standard - The `id` attribute](https://html.spec.whatwg.org/multipage/dom.html#the-id-attribute)
- [HTML Standard - The `class` attribute](https://html.spec.whatwg.org/multipage/dom.html#classes)
- [HTML Standard - The `label` element](https://html.spec.whatwg.org/multipage/forms.html#the-label-element)
