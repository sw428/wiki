# 05_data属性に独自データを持たせる

`data-*`は、標準のHTML属性では表せないページ固有のデータ、状態、注釈などを要素へ持たせるための属性。ブラウザ標準の意味や動作を追加するものではない。

## HTMLへページ固有の値を置く

```html
<button type="button" data-tab="news">
  お知らせ
</button>
```

この`data-tab`は、ページ内のタブ切り替え処理が`news`という値を読むための独自データ。標準の意味を持つ属性がある場合は、同じ目的を`data-*`で作り直さない。

たとえばボタンの開閉状態を支援技術へ伝えるなら`data-open`だけでは足りず、実際のUIに応じて`aria-expanded`などの標準属性も必要になる。

## JavaScriptでは`dataset`から読める

```js
const tabName = button.dataset.tab;
```

ハイフンで区切った名前は、`dataset`ではキャメルケースになる。

```html
<blockquote data-machine-learning="workshop">
  ...
</blockquote>
```

```js
const value = blockquote.dataset.machineLearning;
```

`dataset`から取得する値は文字列。数値や真偽値として使う場合は、文字列を必要な型へ変換し、値の候補を処理側で決める。

```html
<button data-count="3">追加</button>
```

```js
const count = Number(button.dataset.count);
```

## 独自データだけに依存させない

`data-*`と関連するCSSやJavaScriptが無視されても、ページの主要な内容や操作目的が分からなくならない形を保つ。利用者へ見せる情報は本文にも書き、要素の意味・名前・状態は適切なHTML要素や標準属性で表す。

JavaScriptから取得して処理する流れは[DOMとイベント](../../../02_JS/02_DOMとイベント.md)、属性セレクタで要素を選ぶ確認は[セレクタと構造依存](../../14_セレクタと構造依存/01_セレクタが選ぶ要素を確認する.md)へ進む。

## 一言でいうと

`data-*`はページ固有のデータを持たせる接続口であり、標準の意味やブラウザ動作の代わりにはしない。

## 仕様確認先

- [HTML Standard - Custom data attributes](https://html.spec.whatwg.org/multipage/dom.html#custom-data-attribute)
- [HTML Standard - `dataset`](https://html.spec.whatwg.org/multipage/dom.html#dom-dataset-dev)
