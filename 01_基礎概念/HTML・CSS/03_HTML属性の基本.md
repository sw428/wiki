# 03_HTML属性の基本

## 目的

- 属性を「タグに書き足すもの」ではなく、HTML要素へ情報・状態・参照・接続先を与えるものとして整理する。
- `id` / `class` / ブール属性 / 列挙型属性 / `role` / `data-*` を、DOM・CSS・JS・A11yとの接続点として読む。

## 属性は開始タグに書く追加情報

属性は、HTML要素の開始タグに書く追加情報。
要素に対して、動作、参照先、状態、ラベル、CSS/JS用のフックなどを与える。

```html
<img src="image.jpg" alt="説明">
<a href="#about">概要へ</a>
<button type="button" class="menu-button" aria-expanded="false">
  メニュー
</button>
```

```txt
属性
-> HTML要素に状態・参照・意味・操作対象を持たせる接続口
```

## まず見る分類

| 分類 | 役割 | 例 |
|---|---|---|
| 参照先 | 外部ファイルや移動先を示す | `src`, `href` |
| 識別 | 要素を特定・分類する | `id`, `class` |
| 状態 | 要素の状態を表す | `required`, `disabled`, `checked`, `aria-expanded` |
| 入力・動作 | 要素の機能を変える | `type`, `autocomplete`, `contenteditable` |
| ラベル・関係 | 要素同士や支援技術向けの関係を作る | `for`, `aria-labelledby`, `aria-controls` |
| 独自データ | JS用の情報をHTMLに持たせる | `data-*` |

## 属性値は基本的に引用符で囲む

属性値にスペースや特殊文字が含まれる場合は、引用符が必要。
読みやすさと事故防止のため、基本は常に引用符で囲む。

```html
<input type="email" autocomplete="email">
<section id="service-about">
```

HTML自体は大文字・小文字を区別しない場面が多い。
ただし、`id` や `class` のように制作者が決める文字列値は大文字・小文字が区別される。

```html
<input type="text">
<input type="TeXt">
```

上の `type` は仕様上、大文字・小文字の差を同じように扱う。

```html
<div id="myId"></div>
<div id="MyID"></div>
```

一方で、上の2つの `id` は別の値として扱われる。

## `id` はページ内で一意の識別子

`id` は、ページ内で一意の識別子。
同じ `id` を複数回使っても見た目がすぐ壊れないことはあるが、リンク、JavaScript、フォーム、ARIAの参照がずれやすい。

主な用途:

- ページ内リンクの移動先
- JavaScriptでの取得
- `label for` によるフォームラベルの関連付け
- `aria-labelledby` / `aria-describedby` などの参照先
- CSSで特定要素を対象にする

### ページ内リンク

```html
<a href="#about">概要へ</a>

<section id="about">
  <h2>概要</h2>
</section>
```

`href="#about"` の `about` と、`id="about"` が対応する。
この対応で、ブラウザは該当位置へスクロールできる。

### JavaScriptで取得する

```html
<button id="menuButton" type="button">メニュー</button>
```

```js
const button = document.getElementById("menuButton");
const sameButton = document.querySelector("#menuButton");
```

`id` はJSから要素を1つ特定するためにも使える。

### `label for` とつなぐ

```html
<label for="email">メールアドレス</label>
<input id="email" type="email" name="email">
```

`label` の `for` と、フォーム部品の `id` を一致させると、ラベルと入力欄が関連付く。
ラベルをクリックしたときに入力欄へフォーカスでき、支援技術にも名前が伝わりやすくなる。

## `class` はCSS/JS用のフック

`class` は、主にCSSやJavaScriptで要素を選択するためのフック。
HTML仕様上の意味というより、制作側の設計やスタイル管理に使う。

```html
<article class="card card--featured">
  ...
</article>
```

```css
.card {
  padding: 24px;
}
```

```js
document.querySelector(".card");
```

`class` は複数付けられる。
ただし、何でも機械的に付ければよいわけではない。
セマンティックHTMLで意味が足りる場合や、親要素のCSSだけで足りる場合は、クラスを増やしすぎない。

## ブール属性は存在すれば `true`

ブール属性は、属性が存在すれば `true` になる。
代表例:

- `required`
- `disabled`
- `checked`
- `selected`
- `readonly`
- `multiple`
- `autofocus`
- `controls`
- `muted`
- `loop`

次の3つは同じ意味として扱われる。

```html
<input required>
<input required="">
<input required="required">
```

ただし、次のように書いても `false` にはならない。

```html
<input required="false">
```

`required="false"` は、`required` 属性が存在しているため `true` として扱われる。
`false` にしたい場合は、属性自体を外す。

```html
<!-- 必須にする -->
<input required>

<!-- requiredではない -->
<input>
```

JSで切り替える場合も、値を書き換えるより属性を追加・削除する。

```js
input.setAttribute("required", "");
input.removeAttribute("required");
```

## 列挙型属性は決められた値から選ぶ

列挙型属性は、決められた値の中から選ぶ属性。

例:

```html
<button type="button">送信しないボタン</button>
<input type="email">
<div contenteditable="true">編集できる領域</div>
<div contenteditable="false">編集できない領域</div>
```

ブール属性と違い、属性が存在するだけで必ず `true` になるとは限らない。
属性ごとに、値がない場合・不正な値の場合の扱いが違う。

たとえば `contenteditable` は、`true` / `false` / `inherit` などの値を持つ列挙型属性として見る。

```html
<div contenteditable="false">編集できない</div>
```

これは、ブール属性のように「存在するからtrue」ではなく、`false` という値が意味を持つ。

### ブール属性と列挙型属性の注意

ブール属性は、値ではなく属性の有無で判定される。
`required="false"` のように書いても `false` にはならず、属性が存在するため `true` 扱いになる。
`false` にしたい場合は属性自体を外す。

一方で、列挙型属性は、決められた値の中から選ぶ属性。
無効な値を指定した場合の扱いは属性ごとに異なる。

```txt
ブール属性
-> 付ける / 外す で状態を表す

列挙型属性
-> 有効な値を確認して指定する
```

迷った場合は、無効な値を入れない。
ブール属性なら不要なときは属性自体を外し、列挙型属性なら正しい値を確認して指定する。

## `role` は意味を足すが、動作は自動で変えない

`role` は、支援技術に意味を伝えるための属性。
ただし、ブラウザの動作やキーボード操作を自動では変えない。

```html
<span role="button">Click Me</span>
```

これは支援技術へ「ボタン」と伝えることはできる。
しかし、`span` が自動で本物の `button` のように動くわけではない。
Enter / Spaceでの実行、フォーカス管理、クリック処理などは自分で実装する必要がある。

基本は、最初から意味と機能を持つHTML要素を使う。

```html
<button type="button">Click Me</button>
```

```txt
roleで後付けするより、
まずネイティブHTML要素を使う
```

## ARIA属性は意味・関係・状態を補う

`aria-*` は、支援技術向けに意味・関係・状態を補う属性。

例:

```html
<button
  type="button"
  aria-controls="site-nav"
  aria-expanded="false"
>
  メニュー
</button>

<nav id="site-nav" aria-hidden="true">
  ...
</nav>
```

- `aria-controls`: どの要素を操作するかを示す
- `aria-expanded`: 開いているか閉じているかを示す
- `aria-hidden`: 支援技術から隠すかどうかを示す

ここでも、属性はHTML要素同士をつなぐ接続口として働く。

## `data-*` は独自データをHTMLに持たせる

`data-*` は、独自データをHTMLに持たせるための属性。
ブラウザ標準の意味や動作を増やすためではなく、主にJavaScriptから使う情報を置く。

```html
<button
  type="button"
  class="tab-button"
  data-tab="news"
>
  お知らせ
</button>
```

JavaScriptでは、`dataset` から取得できる。

```js
const tab = button.dataset.tab;
```

ハイフン区切りの名前は、JS側ではキャメルケースで扱われる。

```html
<blockquote data-machine-learning="workshop">
  ...
</blockquote>
```

```js
const value = blockquote.dataset.machineLearning;
```

## `style` 属性は基本使いすぎない

`style` 属性は、要素に直接CSSを書くための属性。

```html
<p style="color: red;">注意</p>
```

一時的な確認や、その場限りの例では便利。
ただし、通常の制作ではCSSファイルへ分ける方が管理しやすい。

```txt
style属性
-> その要素だけに直接スタイルを当てる
-> 使いすぎると管理が散らばる
```

## `tabindex` はフォーカス順を変えるので慎重に使う

`tabindex` は、キーボードフォーカスに関わる属性。

よく出る値:

- `tabindex="0"`: 通常のタブ順に参加させる
- `tabindex="-1"`: JSなどでフォーカス可能にするが、Tabキーの通常順には入れない
- `tabindex="1"` 以上: 独自のタブ順を作る

`tabindex="1"` 以上は、見た目の順序やソース順と違うフォーカス順を作りやすく、利用者にも保守にも負担が大きい。
基本は避ける。

## 認識

- 属性は、HTML要素に追加情報・機能・参照先・状態・関係を与える。
- `id` はページ内で一意にし、リンク・JS・ラベル・ARIA参照に使う。
- `class` は主にCSS/JSのフックで、制作側の設計に使う。
- ブール属性は存在すれば `true`。`false` にしたいなら属性を外す。
- 列挙型属性は、決められた値の中から選ぶ。
- `role` は意味を伝えるが、動作やキーボード操作は自動で変えない。
- `data-*` はJS用の独自データをHTMLに持たせる。
- 属性は、DOM / CSS / JS / A11y をつなぐ接続点として見る。

## 次に読む

- [01_HTMLの土台](./01_HTMLの土台.md): タグ・要素・属性・テキストノード・DOMの前提
- [04_ボックスとdisplay](./04_ボックスとdisplay.md): 属性を持つHTML要素が画面上でどんな箱として扱われるか
- [09_HTMLの意味と構造](./09_HTMLの意味と構造.md): `role` やARIAを含む意味構造
- [12_セレクタと構造依存](./12_セレクタと構造依存.md): `id` / `class` / 属性セレクタを使うときの構造依存

## 参考

- [web.dev: Attributes](https://web.dev/learn/html/attributes)
- [MDN: HTML attribute reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes)
- [MDN: Boolean attribute](https://developer.mozilla.org/en-US/docs/Glossary/Boolean/HTML)
- [MDN: Use data attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/How_to/Use_data_attributes)
