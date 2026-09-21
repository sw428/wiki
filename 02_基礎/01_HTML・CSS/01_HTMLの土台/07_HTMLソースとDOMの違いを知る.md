# 07_HTMLソースとDOMの違いを知る

## このページの役割

[HTMLからDOMツリーが作られる基本](./06_HTMLからDOMツリーが作られる.md)では、HTMLソースをブラウザが解析するとDOMツリーが作られることを確認した。

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

先ほどのようにブラウザが`tbody`を補ったからといって、

```text
ソースにtbodyがない
↓
HTMLが必ず間違っている
```

とは判断できない。

HTMLでは、要素によって開始タグや終了タグを省略できる場合がある。

重要なのは、HTMLソースとDOMの違いを見ただけで、元のHTMLが不正だと決めないこと。

## DevToolsでは現在のDOMを見る

HTMLファイルに書いたコードと、ブラウザの開発者ツールで確認した構造が違って見える場合がある。Elementsパネルなどに表示されるのは、元のHTMLソースではなく現在のDOM。

現在のDOMには、HTMLパーサーが作った構造に加えて、JavaScriptによる変更が反映されている場合もある。ソースと違うときは、`tbody`のようなパーサーによる補完か、読み込み後のDOM操作かを分けて確認する。

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

一方、JavaScriptから、

```js
element.appendChild(node);
```

のようなDOM APIを使って現在のDOMへノードを直接追加する処理まで、常に同じ補完が起こるという意味ではない。HTML文字列の解析と、DOM APIによる変更は分けて考える。

DOM APIによる取得や変更は[DOMとイベント](../../02_JS/02_DOMとイベント.md)で扱う。

## 一言でいうと

ブラウザはHTMLソースを構文規則に従って解析してDOMを作るため、HTMLソースに書いた構造と作られたDOMが必ず一対一になるとは限らない。

## 仕様の確認先

- [HTML Standard - Parsing HTML documents](https://html.spec.whatwg.org/multipage/parsing.html)
- [HTML Standard - Optional tags](https://html.spec.whatwg.org/multipage/syntax.html#optional-tags)
