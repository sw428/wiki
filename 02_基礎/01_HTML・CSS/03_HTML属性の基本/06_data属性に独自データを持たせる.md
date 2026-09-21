# 06_data属性に独自データを持たせる

`data-*`は、HTML標準の属性では表せない、ページ固有のデータを要素へ持たせるために使う。

```html
<button type="button" data-tab="news">
  お知らせ
</button>
```

この`data-tab="news"`は、ページ内の処理で使う独自の情報。

`data-*`自体が、要素へHTML標準の意味や動作を追加するわけではない。

## ページ固有のデータを持たせる

`data-*`の`*`部分には、用途に合わせた名前を付けられる。

```html
<button type="button" data-tab="news">お知らせ</button>
<button type="button" data-tab="event">イベント</button>
```

この例では、それぞれのボタンへ、

```text
news
event
```

という値を持たせている。

JavaScriptはこの値を読み取り、どのタブを表示するか判断できる。

## JavaScriptでは`dataset`から読む

`data-*`に保存した値は、JavaScriptから`dataset`を使って取得できる。

```html
<button type="button" data-tab="news">
  お知らせ
</button>
```

```js
const tabName = button.dataset.tab;
```

この場合、`tabName`には文字列の`"news"`が入る。

JavaScriptから要素を取得して処理する流れは、[DOMとイベント](../../02_JS/02_DOMとイベント.md)で扱う。

## ハイフンを含む名前はキャメルケースになる

HTML側で複数の単語をハイフンでつないだ場合、

```html
<div data-user-name="taro"></div>
```

JavaScriptの`dataset`ではキャメルケースで参照する。

```js
const name = element.dataset.userName;
```

つまり、

```text
data-user-name
↓
dataset.userName
```

のように対応する。

## `dataset`から取得する値は文字列

`data-*`に数値のような値を書いても、`dataset`から取得した値は文字列になる。

```html
<button type="button" data-count="3">追加</button>
```

```js
const count = button.dataset.count;
```

この`count`は数値の`3`ではなく、文字列の`"3"`。

数値として使う場合は、必要な型へ変換する。

```js
const count = Number(button.dataset.count);
```

真偽値などを扱う場合も、文字列をそのままJavaScriptの真偽値として考えず、処理側で値の意味を決める。

## 標準の要素や属性の代わりには使わない

HTMLにその意味を表す要素や標準化された属性がある場合は、`data-*`で作り直さない。

たとえば、開閉状態を支援技術へ伝える必要がある場合、

```html
<button type="button" data-open="true">
```

だけでは、その状態は支援技術へ伝わらない。

開閉状態は、実際のUIに合わせて`aria-expanded`で表す。

```html
<button type="button" aria-expanded="true">
```

同じ開閉状態を`data-open`にも重複して持たせる必要がなければ、`aria-expanded`を状態の正本として使う。`data-*`は、標準の要素や属性では表せない別の処理用データが必要な場合に加える。

## `data-*`だけに意味を依存させない

`data-*`は、主にCSSやJavaScriptなど制作側の処理とHTMLをつなぐために使う。

利用者へ見せる重要な情報や、要素の意味・名前・状態そのものを`data-*`だけに持たせない。

```text
HTML標準の意味・状態
→ HTML要素や標準化された属性

ページ固有の処理用データ
→ data-*
```

CSSから`data-*`を持つ要素を選ぶ方法は、[セレクタが選ぶ要素を確認する](../14_セレクタと構造依存/01_セレクタが選ぶ要素を確認する.md)で扱う。

## 一言でいうと

`data-*`は、HTML標準では表せないページ固有のデータを要素へ持たせ、JavaScriptから`dataset`で読み取るために使う。

## 仕様確認先

- [HTML Standard - Custom data attributes](https://html.spec.whatwg.org/multipage/dom.html#custom-data-attribute)
- [HTML Standard - `dataset`](https://html.spec.whatwg.org/multipage/dom.html#dom-dataset-dev)
