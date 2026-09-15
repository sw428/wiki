# 01_最小のHTML文書を作る

HTMLファイルを新しく作るときは、まず文書情報を置く`head`と、ページ本文を置く`body`を分ける。最初からすべての要素を暗記せず、見本のどこを変更するか分かればよい。

## 最小の基本形

通常の日本語のレスポンシブサイトでは、次の形から始められる。

```html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>ページタイトル</title>
    <link rel="stylesheet" href="css/style.css">
    <script src="js/menu.js" defer></script>
  </head>
  <body>
    <h1>ページの主見出し</h1>
  </body>
</html>
```

この例は、次の四つに分けて読む。

```txt
<!DOCTYPE html>
-> 標準に沿った表示モードへ入るための宣言

<html lang="ja">
-> HTML文書全体の根と、文書の主な言語

<head>
-> 文書情報と外部ファイルの読み込み

<body>
-> 見出しや本文など、ページの内容
```

まず変更する場所は、`title`、`body`の内容、CSS・JavaScriptのファイルパス。ブラウザでタイトルと本文が表示され、CSS・JavaScriptが意図したファイルから読み込まれたか確認する。

## DOCTYPEは要素ではなく宣言

```html
<!DOCTYPE html>
```

DOCTYPEはHTML要素ではない。HTMLパーサーはこれをDOCTYPEトークンとして扱い、DOMでは`DocumentType`ノードになる。

現在のHTMLでは、この短いDOCTYPEを文書の先頭に書く。DOCTYPEがない場合や古い形式の一部では、ブラウザが過去のWebページとの互換性を優先するquirks modeに入ることがある。ここでは、通常のCSS仕様に近いno-quirks modeで表示させるための宣言と捉える。

## `html`は文書の根になる

```html
<html lang="ja">
```

`html`要素はHTML文書のルート。中には`head`、続いて`body`を置く。

`lang="ja"`は見た目を変える指定ではなく、文書の主な言語を示す。音声読み上げの発音や翻訳などが言語を判断する手掛かりになる。日本語を主に使うページなら`ja`とし、実際の内容に合わせて値を変える。

HTML構文では`html`、`head`、`body`のタグを省略できる場合があるが、制作中に文書の範囲を読み取りやすくするため、この基本形では明示する。

## `head`と`body`を分ける

| 場所 | 主な内容 |
| --- | --- |
| `head` | 文字エンコーディング、文書タイトル、viewport、CSS・JavaScriptなど |
| `body` | 見出し、段落、画像、リンク、操作部品などページの内容 |

`head`は本文外から文書を支える情報の集まり。`body`は文書の内容を置く場所だが、CSSの`display: none`などにより、中のすべてが常に画面へ見えるとは限らない。

`charset`、`title`、`viewport`は[headに文書情報を書く](./02_headに文書情報を書く.md)、CSSとJavaScriptは[CSSとJavaScriptを読み込む](./03_CSSとJavaScriptを読み込む.md)へ進む。

## 次へ進む目安

見本やAIを使いながら、次を選べればこの入口から先へ進める。

1. ページタイトルを変更する場所。
2. 画面の本文を書く場所。
3. CSSとJavaScriptのパスを変更する場所。
4. ブラウザとDevToolsで読み込み結果を確かめる場所。

タグと要素の読み方が曖昧なら[タグと要素からHTMLを読む](../01_HTMLの土台/01_タグと要素からHTMLを読む.md)へ戻る。次は[HTML属性の基本](../03_HTML属性の基本/01_属性を役割から読み分ける.md)で、`id`や`class`などを確認する。

## 一言でいうと

`head`には文書情報と読み込み、`body`にはページの内容を書き、DOCTYPEと`html`で文書全体を囲む。

## 仕様確認先

- [HTML Standard - Writing HTML documents](https://html.spec.whatwg.org/multipage/syntax.html#writing)
- [HTML Standard - The `html` element](https://html.spec.whatwg.org/multipage/semantics.html#the-html-element)
- [HTML Standard - The `head` element](https://html.spec.whatwg.org/multipage/semantics.html#the-head-element)
- [HTML Standard - The `body` element](https://html.spec.whatwg.org/multipage/sections.html#the-body-element)
