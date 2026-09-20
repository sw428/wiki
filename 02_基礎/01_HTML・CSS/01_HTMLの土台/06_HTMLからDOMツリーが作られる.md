# 06_HTMLからDOMツリーが作られる

## このページの役割

HTMLファイルに書いた内容をブラウザが解析すると、ブラウザ内部にDOMツリーが作られる。

このページでは、

```text
HTMLソース
↓
ブラウザが解析する
↓
要素や文字がノードになる
↓
親子関係を持ったDOMツリーになる
```

という基本の流れを確認する。

HTMLソースと完成したDOMが異なる場合については、次の[07_HTMLソースとDOMの違いを知る](./07_HTMLソースとDOMの違いを知る.md)で扱う。

## HTMLソースをブラウザが解析する

たとえば、HTMLファイルに次のように書いたとする。

```html
<p>こんにちは</p>
```

ブラウザは、この文字列をそのまま一枚の文章として扱うのではない。

HTMLを解析して、ブラウザ内部で扱える構造を作る。

```text
HTMLソース
↓
HTMLパーサーが解析する
↓
DOMツリー
```

DOMは、HTMLから作られた文書構造をノードのツリーとして表したもの。

## DOMでは要素がElementノードになる

HTMLソースでは、

```html
<p>こんにちは</p>
```

全体を`p`要素として読んだ。

DOMでは、この`p`要素がElementノードとして表される。

```text
p Element
```

HTMLソースで見ていた要素が、ブラウザ内部ではDOMを構成するノードの1つになる。

## 文字もTextノードになる

DOMになるのはHTML要素だけではない。

```html
<p>こんにちは</p>
```

この中の、

```text
こんにちは
```

という文字もDOMではTextノードになる。

構造は次のように見られる。

```text
p Element
└─ Text「こんにちは」
```

つまり、

```text
HTMLソースとして見る
こんにちは
→ p要素の内容

DOMとして見る
こんにちは
→ Textノード
```

という違いがある。

## ElementとTextにも親子関係がある

次のDOMでは、

```text
p Element
└─ Text「こんにちは」
```

`p`のElementノードが親で、`こんにちは`のTextノードが子になる。

```text
p Element
→ Textノードの親

Text「こんにちは」
→ p Elementの子
```

ここで親になるのは`p`タグではない。

```text
<p>
```

はHTMLソースに書かれた開始タグ。

DOM上で親になっているのは、HTMLを解析して作られた`p`のElementノード。

```text
HTMLソース
<p>こんにちは</p>

↓ 解析

DOM
p Element
└─ Text「こんにちは」
```

タグ・内容・要素の区別と、DOM上のノードは分けて考える。

## 要素の中に要素がある場合

次のHTMLを見る。

```html
<p>こんにちは <strong>重要</strong></p>
```

HTMLソースとしては、`p`要素の中に文字と`strong`要素が入っている。

DOMでは、要点だけ抜き出すと次のようになる。

```text
p Element
├─ Text「こんにちは 」
└─ strong Element
   └─ Text「重要」
```

ここでは`p`の子として、

```text
Text「こんにちは 」
strong Element
```

の2つがある。

さらに`strong`の子として、

```text
Text「重要」
```

がある。

## DOMには複数種類のノードがある

DOMにはElementやText以外にも複数種類のノードがある。

代表的なものには、

```text
Document
DocumentType
Element
Text
Comment
```

などがある。

最初からすべて暗記する必要はない。

この段階では、

```text
HTML要素
→ Elementノード

文字
→ Textノード
```

としてDOMツリーの中に入ることを理解すればよい。

## DOMツリーは階層として読む

HTMLが入れ子になっていると、DOMも階層を持つ。

たとえば、

```html
<section>
  <h2>料金</h2>
  <p>月額料金です。</p>
</section>
```

要点だけ見ると、

```text
section Element
├─ h2 Element
│  └─ Text「料金」
└─ p Element
   └─ Text「月額料金です。」
```

となる。

[04_要素の入れ子と親子関係を読む](./04_要素の入れ子と親子関係を読む.md)で確認した要素同士の入れ子に加えて、DOMでは文字もTextノードとしてツリーに入る。

## 空白や改行もTextノードになることがある

文字として扱われるのは、画面上で目立つ文章だけではない。

たとえば、

```html
<p>こんにちは <strong>重要</strong></p>
```

では、`こんにちは`の後ろにある空白もTextノードの内容に含まれる。

また、HTMLソース内の改行やインデントがTextノードになる場合もある。

画面上で空白がどのように表示されるかは、[HTMLの空白と疑似要素を整える](../08_インラインと行の仕組み/05_HTMLの空白と疑似要素を整える.md)で確認する。

## CSSやJavaScriptは文書構造を対象にする

ブラウザがHTMLからDOMを作ることで、CSSのセレクタやJavaScriptは文書内の要素を構造として扱えるようになる。

たとえばJavaScriptでは、

```js
document.querySelector(".button");
```

のように、現在のDOMから条件に合う要素を探す。

ここでは、取得方法や変更方法までは扱わない。

重要なのは、

```text
JavaScriptがHTMLファイルの文字列を
直接探しているわけではない

↓

作られたDOMツリーを対象にする
```

という点。

## このページでは扱わないこと

```text
HTML要素の入れ子
→ 04_要素の入れ子と親子関係を読む

HTMLソースと完成したDOMの違い
→ 07_HTMLソースとDOMの違いを知る

DOMから要素を取得・変更する方法
→ JavaScript側

DOM・CSSOM・layout・paintまで含む表示工程
→ ブラウザ挙動を扱う章
```

HTMLソースと完成したDOMの違いは[HTMLソースとDOMの違いを知る](./07_HTMLソースとDOMの違いを知る.md)、DOMから要素を取得・変更する方法は[DOMとイベント](../../02_JS/02_DOMとイベント.md)、画面が作られるまでの工程は[ブラウザが表示を作る基本フロー](../07_ブラウザ挙動と表示のズレ/01_ブラウザが表示を作る基本フロー.md)で扱う。

このページでは、HTMLが解析されてDOMツリーになり、要素と文字がノードとして階層を作るところまで扱う。

## 一言でいうと

ブラウザはHTMLソースを解析し、要素をElementノード、文字をTextノードなどとして持つDOMツリーを作る。

## 仕様の確認先

- [DOM Standard - Introduction to the DOM](https://dom.spec.whatwg.org/#introduction-to-the-dom)
- [DOM Standard - Node tree](https://dom.spec.whatwg.org/#concept-node-tree)
- [HTML Standard - Parsing HTML documents](https://html.spec.whatwg.org/multipage/parsing.html)
