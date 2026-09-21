# 02_idとclassを使い分ける

`id`は要素を一意に識別し、`class`は要素を一つ以上の分類へ所属させる。どちらもCSSやJavaScriptから使えるが、同じ役割ではない。

## `id`はツリー内で一意にする

```html
<section id="about">
  <h2>概要</h2>
</section>
```

`id`の値は、その要素が属するツリー内のすべてのIDに対して一意でなければならない。値は1文字以上とし、ASCII空白を含めない。

同じ`id`が複数あっても見た目が直ちに壊れない場合はある。しかし、ページ内リンク、JavaScript、フォームラベル、ARIAの参照先が一つに決まらなくなるため、重複を残さない。

### ページ内リンクの移動先にする

```html
<a href="#about">概要へ</a>

<section id="about">
  <h2>概要</h2>
</section>
```

`href`のフラグメント`#about`が、`id="about"`の要素を指す。綴りと大文字・小文字を一致させる。

### JavaScriptから取得する

```html
<button id="menu-button" type="button">メニュー</button>
```

```js
const button = document.getElementById("menu-button");
```

`id`を使うと、DOMから一つの要素を取得できる。複数要素をまとめて扱う処理なら、`class`や別の属性を条件にする。

### `label`と入力欄を関連付ける

```html
<label for="email">メールアドレス</label>
<input id="email" name="email" type="email">
```

`label`の`for`と入力欄の`id`を一致させると、ラベルと入力欄が関連付く。ラベルを操作したとき入力欄へフォーカスでき、入力欄の名前も支援技術へ伝わる。

## `class`は複数要素へ使える分類

```html
<article class="card card--featured">...</article>
<article class="card">...</article>
```

`class`の値は空白で区切られたトークンの集合。この例の最初の`article`は、`card`と`card--featured`という二つのクラスに所属する。

```css
.card {
  padding: 24px;
}
```

```js
const cards = document.querySelectorAll(".card");
```

クラス名にはHTML標準の意味や動作が自動で付かない。制作側がCSSやJavaScriptなどから共通の対象を選ぶために使う。

次に`class`をCSSの対象として使い、色や余白を変えて画面で確認する場合は、[一つの箱を作る](../../05_ボックスとdisplay/01_一つの箱とdisplay.md#htmlとcssをつないで一つの箱を作る)へ進む。そこで`class="notice"`と`.notice`を対応させ、変更後はDevToolsで適用結果を確認する。

クラスを増やすかどうかは、再利用するスタイルや処理の対象を明示する必要があるかで決める。命名の採用方針は[BEMとクラス命名](../../../07_設計/CSS設計/01_BEMとクラス命名.md)、セレクタが実際に選ぶ要素は[セレクタと構造依存](../../14_セレクタと構造依存/01_セレクタが選ぶ要素を確認する.md)で扱う。

## 一言でいうと

`id`は一つの要素を参照する識別子、`class`は複数の要素にも使える分類として分ける。

## 仕様確認先

- [HTML Standard - The `id` attribute](https://html.spec.whatwg.org/multipage/dom.html#the-id-attribute)
- [HTML Standard - The `class` attribute](https://html.spec.whatwg.org/multipage/dom.html#classes)
- [HTML Standard - The `label` element](https://html.spec.whatwg.org/multipage/forms.html#the-label-element)
