# 02_HTMLがDOMツリーになる流れ

HTMLソースをブラウザが解析すると、要素や文字をノードとして持つDOMツリーが作られる。CSSやJavaScriptが扱うのは、この構造。

## HTMLソースからDOMツリーが作られる

```txt
HTMLソース
-> HTMLパーサーが解析する
-> DOMツリー
   └─ Document
      ├─ DocumentType
      └─ Element
         ├─ Element
         │  └─ Text
         └─ Text
```

DOMには、`Document`、`DocumentType`、`Element`、`Text`、`Comment`など複数種類のノードがある。最初からすべてを暗記するのではなく、要素の中に別の要素や文字が入るツリーだと捉える。

## 要素の中の文字もノードになる

```html
<p>こんにちは <strong>重要</strong></p>
```

DOMツリーは、要点だけ抜き出すと次のように見られる。

```txt
p要素
├─ Text「こんにちは 」
└─ strong要素
   └─ Text「重要」
```

`こんにちは`の後ろの空白もTextノードの内容に含まれる。タグ間の改行やインデントもTextノードになる場合がある。画面上で空白がどうまとめられるかは[HTMLの空白と疑似要素を整える](../08_インラインと行の仕組み/05_HTMLの空白と疑似要素を整える.md)で扱う。

## HTMLソースと完成したDOMは同じとは限らない

HTMLパーサーは、構文規則に従って要素を補うことがある。たとえばHTMLソースを解析するとき、`table`の直下に`tr`が現れると`tbody`が補われる。

```html
<table>
  <tr>
    <td>内容</td>
  </tr>
</table>
```

完成したDOMでは次の構造になる。

```html
<table>
  <tbody>
    <tr>
      <td>内容</td>
    </tr>
  </tbody>
</table>
```

これは「ソース文字列とDOMは常に一対一」という理解を修正する例。`tbody`の開始タグは条件によって省略できるため、補完されたことだけで元のHTMLが不正とは決めない。

また、これはHTMLパーサーが文字列を解析する場合の話。`appendChild()`などのDOM APIでノードを直接追加する操作まで、常に同じ補完が入るという意味ではない。

## JavaScriptはDOMを探して操作する

```js
document.querySelector(".button");
```

この処理はHTMLファイルの文字列を直接検索するのではなく、現在のDOMツリーから条件に合う要素を探す。CSSセレクタも、文書ツリー内の対象要素を選ぶために使われる。

画面ができるまでのDOM、CSSOM、box tree、layout、paintの流れは[ブラウザが表示を作る基本フロー](../07_ブラウザ挙動と表示のズレ/01_ブラウザが表示を作る基本フロー.md)へ進む。JavaScriptによる取得と変更は[DOMとイベント](../../02_JS/02_DOMとイベント.md)で扱う。

## 一言でいうと

ブラウザはHTMLソースを解析してノードのツリーを作り、CSSとJavaScriptはその構造を対象にする。

## 仕様確認先

- [DOM Standard - Introduction to the DOM](https://dom.spec.whatwg.org/#introduction-to-the-dom)
- [DOM Standard - Node tree](https://dom.spec.whatwg.org/#concept-node-tree)
- [HTML Standard - Parsing HTML documents](https://html.spec.whatwg.org/multipage/parsing.html)
- [HTML Standard - Optional tags](https://html.spec.whatwg.org/multipage/syntax.html#optional-tags)
