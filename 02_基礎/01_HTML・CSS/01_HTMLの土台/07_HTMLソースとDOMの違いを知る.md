# 07_HTMLソースとDOMの違いを知る

## このページの役割

HTMLソースをブラウザが解析するとDOMツリーが作られる。

ただし、

```text
HTMLソースに書いた構造
=
完成したDOMの構造
```

とは限らない。

このページでは、HTMLパーサーが構文規則に従ってDOMを作ることで、ソースには直接書いていない構造がDOMに現れる場合があることを確認する。

## HTMLソースとDOMは別のもの

たとえば、HTMLファイルに次のように書いたとする。

```html
<p>こんにちは</p>
```

HTMLソースは、ファイルに書かれている文字列。

ブラウザはそのHTMLソースを解析して、DOMツリーを作る。

```text
HTMLソース
↓
HTMLパーサーが解析する
↓
DOM
```

通常は書いたHTMLから対応するDOMを考えられるが、両者が必ず一対一になるわけではない。

## ブラウザが構造を補うことがある

たとえば、次のHTMLを書く。

```html
<table>
  <tr>
    <td>内容</td>
  </tr>
</table>
```

HTMLソースには`tbody`を書いていない。

しかし、ブラウザがHTMLを解析して作ったDOMでは、次のような構造になる。

```html
<table>
  <tbody>
    <tr>
      <td>内容</td>
    </tr>
  </tbody>
</table>
```

構造として見ると、

```text
HTMLソース

table
└─ tr
   └─ td
```

から、

```text
DOM

table
└─ tbody
   └─ tr
      └─ td
```

となる。

HTMLソースに直接書いていなかった`tbody`がDOMに存在している。

## HTMLパーサーが構文規則に従ってDOMを作る

ブラウザはHTMLソースを単純に、

```text
開始タグを見つける
↓
そのまま同じ形のノードを作る
```

だけで処理しているわけではない。

HTMLの構文規則に従ってソースを解析し、DOMツリーを組み立てる。

その過程で、必要に応じて構造が補われることがある。

そのため、

```text
ソースに書いてあるもの
```

と、

```text
ブラウザ内部に完成したDOM
```

を分けて考える必要がある。

## DOMに追加されたからHTMLが不正とは限らない

先ほどの例では、HTMLソースに`tbody`を書いていなかった。

```html
<table>
  <tr>
    <td>内容</td>
  </tr>
</table>
```

それでもDOMでは`tbody`が現れる。

```html
<table>
  <tbody>
    <tr>
      <td>内容</td>
    </tr>
  </tbody>
</table>
```

このようにブラウザが構造を補ったからといって、

```text
ソースにtbodyがない
↓
HTMLが必ず間違っている
```

とは判断できない。

HTMLでは、要素によって開始タグや終了タグを省略できる場合がある。

重要なのは、HTMLソースとDOMの違いを見ただけで、元のHTMLが不正だと決めないこと。

## DevToolsでは完成したDOMを見ることがある

HTMLファイルに書いたコードと、ブラウザの開発者ツールで確認した構造が違って見える場合がある。

たとえば、

```html
<table>
  <tr>
    <td>内容</td>
  </tr>
</table>
```

と書いていても、ブラウザ側では`tbody`を含むDOMとして確認できることがある。

```text
HTMLファイル
↓
HTMLソース

ブラウザが解析
↓
DOM

DevToolsで確認
↓
完成したDOMの構造
```

そのため、ソースコードとDevToolsの表示が違う場合は、

```text
ブラウザのHTMLパーサーによって
DOM構造が補われていないか
```

も確認する。

## HTMLパーサーの話とDOM操作は分ける

ここで扱っているのは、

```text
HTML文字列
↓
HTMLパーサー
↓
DOM
```

という解析時の話。

JavaScriptから、

```js
element.appendChild(node);
```

のようなDOM APIを使ってノードを直接追加する処理まで、常に同じ補完が起こるという意味ではない。

```text
HTMLソースを解析してDOMを作る
```

ことと、

```text
完成したDOMへ
JavaScriptからノードを追加する
```

ことは分けて考える。

DOM APIによる取得や変更はJavaScript側で扱う。

## 06との違い

06では、

```text
HTMLソース
↓
解析
↓
ElementやTextなどのノード
↓
DOMツリー
```

という基本の流れを確認した。

この07では、その先の、

```text
書いたHTMLソース
↓
解析
↓
完成したDOM

両者の構造が
完全には一致しない場合がある
```

という点だけを扱う。

## このページでは扱わないこと

```text
HTMLからDOMツリーが作られる基本
→ 06_HTMLからDOMツリーが作られる

HTMLのタグ・要素の基本
→ 03_タグ・内容・要素を区別する

JavaScriptでDOMを取得・変更する方法
→ JavaScript側

ブラウザが表示を作る工程全体
→ ブラウザ挙動を扱う章
```

HTMLからDOMツリーが作られる基本は[HTMLからDOMツリーが作られる](./06_HTMLからDOMツリーが作られる.md)、タグと要素の基本は[タグ・内容・要素を区別する](./03_タグ・内容・要素を区別する.md)、DOMの取得と変更は[DOMとイベント](../../02_JS/02_DOMとイベント.md)、表示工程全体は[ブラウザが表示を作る基本フロー](../07_ブラウザ挙動と表示のズレ/01_ブラウザが表示を作る基本フロー.md)で扱う。

このページでは、HTMLパーサーによってHTMLソースと完成したDOMの構造が異なる場合があることまで扱う。

## 一言でいうと

ブラウザはHTMLソースを構文規則に従って解析してDOMを作るため、HTMLソースに書いた構造と完成したDOMが必ず一対一になるとは限らない。

## 仕様の確認先

- [HTML Standard - Parsing HTML documents](https://html.spec.whatwg.org/multipage/parsing.html)
- [HTML Standard - Optional tags](https://html.spec.whatwg.org/multipage/syntax.html#optional-tags)
