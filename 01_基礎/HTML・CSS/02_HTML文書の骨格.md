# 02_HTML文書の骨格

## 目的

- HTMLファイルを書くときの最低限の形を、暗記ではなく役割で理解する。
- `<!DOCTYPE html>`、`html`、`head`、`body`、`meta`、`link`、`script` が何のためにあるかを整理する。
- ページ本文と、本文外でページの解釈・表示・動作を支える情報を分けて見る。

## 最低限の基本形

HTML文書は、まず次の形を基準にする。

```html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="utf-8">
    <title>ページタイトル</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="css/style.css">
    <script src="js/menu.js" defer></script>
  </head>
  <body>
    表示される内容
  </body>
</html>
```

最初は、次の分け方で見る。

```txt
<!DOCTYPE html>
-> ブラウザの表示モードを決める宣言

<html>
-> HTML文書全体の根っこ

<head>
-> 文書情報やCSS・JSなどの読み込み情報

<body>
-> ページの本文となる内容
```

## `<!DOCTYPE html>` は要素ではなく宣言

`<!DOCTYPE html>` はHTML要素ではなく、HTMLソース上のDOCTYPE宣言。ブラウザが解析すると、DOM上では `DocumentType` ノードとして表現される。

役割は、ブラウザに「このHTMLは標準モードで解釈してよい」と伝えること。
省略すると、古いブラウザ互換のための互換モードで解釈される可能性がある。

```txt
doctype
-> ブラウザを標準モードで動かすための宣言
```

## `html lang="ja"` は文書の言語を伝える

```html
<html lang="ja">
```

`lang` は見た目を変える指定ではない。
文書の主な言語を、スクリーンリーダー、検索エンジン、翻訳サービスなどへ伝えるための情報。

```txt
lang
-> 視覚的な変化ではなく、文書の言語情報を与える
```

日本語ページなら、まず `lang="ja"` を基本形にする。

## `head` は本文外からページを支える場所

`head` は、ページ本文ではなく、文書についての情報やCSS・JSなどの読み込み情報を置く場所。

主に入るもの:

- 文字コード
- ページタイトル
- viewport
- description
- CSSリンク
- favicon
- canonical
- alternate
- script

全部を最初から使う必要はない。
ただし、`charset`、`title`、`viewport` は基本セットとして入れておく。

## `charset` は先に書く

```html
<meta charset="utf-8">
```

`charset` は、文字コードを指定するためのもの。
文字化けを避けるため、`head` の最初の方、特に `title` より前に置く。

```txt
charset
-> 文字をどう解釈するかをブラウザへ伝える
```

通常は `utf-8` でよい。

## `title` はブラウザタブなどに使われる

```html
<title>ページタイトル</title>
```

`title` は、ページ本文の見出しではない。
ブラウザのタブや履歴などで使われ、検索結果のタイトルとして利用されることもある文書名。検索エンジンが必ず `title` の内容をそのまま表示するとは限らない。

ページ内の大見出しは、`body` 内で `h1` として書く。

```html
<body>
  <h1>ページの主見出し</h1>
</body>
```

## `viewport` はレスポンシブ対応の入口

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

`viewport` は、スマホ幅などでページをどう表示するかに関わる指定。
これがないと、小さい画面でPC幅のページを縮小表示するような挙動になり、レスポンシブ表示の前提が崩れやすい。

```txt
width=device-width
-> 表示領域の幅を端末幅に合わせる

initial-scale=1
-> 初期ズーム倍率を1にする
```

課題テンプレや通常の静的サイトでは、まずこの形でよい。

## CSSは基本 `head` で読み込む

```html
<link rel="stylesheet" href="css/style.css">
```

外部CSSは、`link rel="stylesheet"` で読み込む。
基本は `head` に置く。

理由は、本文が描画される前にCSSを読み込ませることで、あとからスタイルが当たって再描画される無駄を減らしやすいから。

```txt
link rel="stylesheet"
-> HTMLと外部CSSファイルをつなぐ
```

reset CSSとサイト固有CSSを分ける場合は、土台を先、上書きする側を後に置く。

```html
<link rel="stylesheet" href="css/reset.css">
<link rel="stylesheet" href="css/style.css">
```

同じカスケード条件なら、後に位置する宣言が勝つ。これはダウンロード完了の速さではなく、HTMLからリンクした順番で決まる。詳しい確認方法は [CSSカスケードとDevToolsの見方](./15_CSSカスケードとDevToolsの見方.md) で扱う。

## JSは `defer` または `body` の最後で扱いやすくする

```html
<script src="js/menu.js" defer></script>
```

`script` はJavaScriptを読み込むための要素。

外部JSへ `defer` を付けると、HTMLの解析と並行してファイルを取得し、HTMLの解析完了後に実行できる。
そのため、ハンバーガーメニューのように、JS側でDOM要素を取得して操作する処理と相性がよい。

```txt
deferなし
-> scriptの位置によっては、対象要素が作られる前にJSが走ることがある

deferあり
-> HTML解析と並行して外部JSを取得する
-> HTML解析後に実行される
-> DOMContentLoadedより前に実行される
-> querySelector / getElementById で要素を取りやすい
```

ただし、方法は `defer` だけではない。
古典的には、`script` を `</body>` の直前に置く方法もある。

```html
<body>
  表示される内容

  <script src="js/menu.js"></script>
</body>
```

これは、先に本文のHTMLを読ませてからJSを読み込むため、JS実行時には対象要素がすでにDOM上に存在しやすい。

整理すると、次の2パターンが基本。

```txt
head内に置く
-> deferを付ける

body閉じタグ直前に置く
-> 対象HTMLを先に読ませてからJSを読む
```

メニュー開閉など、HTML上にある要素をJSで操作する場合は、まず `head` の `defer` 付き外部JS、または `</body>` 直前の外部JSとして考える。

## `base` は初心者は基本触らない

```html
<base href="https://example.com/">
```

`base` は、相対URLの基準を変える要素。
ただし影響範囲が広く、アンカーリンクやCSS/JS/画像の相対パスにも関わる。

そのため、初学者の静的サイト制作では基本的に使わなくてよい。

```txt
base
-> 相対URLの基準を変える
-> 影響が広いので、必要が分かるまで触らない
```

## 認識

- HTML文書は、`doctype`、`html`、`head`、`body` を基本骨格として見る。
- `head` はページ本文ではないが、ページの解釈・表示・検索・読み込みを支える。
- `body` はページの本文となる内容を置く場所。中のすべてが必ず見えるとは限らない。
- `charset`、`title`、`viewport` は基本セット。
- CSSは `link rel="stylesheet"` で `head` から読み込む。
- DOM操作をする外部JSは、`head` に置くなら `defer`、または `</body>` 直前に置く。
- `base` は便利そうに見えて影響が広いので、必要が分かるまで使わない。

## 次に読む

- [01_HTMLの土台](./01_HTMLの土台.md): タグ・要素・属性・テキストノード・DOMの前提
- [03_HTML属性の基本](./03_HTML属性の基本.md): `id` / `class` / `role` / `data-*` など属性の基本
- [04_ボックスとdisplay](./04_ボックスとdisplay.md): HTML要素が画面上でどんな箱として扱われるか
- [09_HTMLの意味と構造](./09_HTMLの意味と構造.md): 本文内の見出し・section・footerなどの意味構造

## 一言でいうと

`head` は文書情報と読み込み、`body` は本文、`defer` はHTML解析を妨げず解析後にJSを実行するための基本形。

## 参考

- [web.dev: Document structure](https://web.dev/learn/html/document-structure)
- [HTML Standard - The `script` element](https://html.spec.whatwg.org/multipage/scripting.html#the-script-element)
