# 01_最小のHTML文書を作る

## このページの役割

HTMLファイルを新しく作るときの基本形を確認する。

ここでは各行の細かな仕組みをすべて覚えるのではなく、

```text
HTML文書全体はどの形から始めるか

どこを書き換えてページを作るか
```

を確認する。

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

まずは、この形を一つのHTML文書として見る。

CSSやJavaScriptをまだ使わない場合は、対応する`link`または`script`を外してよい。存在しないファイルを見本のまま読み込ませない。

## 大きく分けて読む

最初は次のように分ければよい。

```text
<!DOCTYPE html>
→ HTML文書の先頭に置く宣言

<html>
→ HTML文書全体

<head>
→ 文書についての情報や外部ファイルの読み込み

<body>
→ ページの内容
```

それぞれの詳しい役割は別ページで確認する。文書先頭の宣言は[DOCTYPEの役割を理解する](./02_DOCTYPEの役割を理解する.md)、文書全体・文書情報・本文の区分は[html・head・bodyの役割を分ける](./03_html・head・bodyの役割を分ける.md)で確認する。

## 最初に変更する場所

見本からページを作るときは、まず次を変更する。

```text
title
→ ページのタイトル

body
→ 見出し、文章、画像などページの内容

CSSのパス
→ 読み込むCSSファイル

JavaScriptのパス
→ 読み込むJavaScriptファイル
```

CSSファイルの指定は[CSSを読み込む](./08_CSSを読み込む.md)、JavaScriptファイルの指定は[JavaScriptを読み込む](./09_JavaScriptを読み込む.md)で確認する。

たとえば、

```html
<title>料金案内</title>
```

や、

```html
<body>
  <h1>料金案内</h1>
</body>
```

のようにページに合わせて変更する。

## 書いたらブラウザで確認する

HTMLを書いたら、ブラウザで開いて確認する。

まずは、

```text
ページタイトルが変わっているか

bodyに書いた内容が表示されているか

CSSが読み込まれているか

JavaScriptが必要なら動いているか
```

を確認できればよい。

読み込みに問題がある場合はDevToolsも使って確認する。

## 一言でいうと

HTMLファイルを作るときは基本形から始め、まず`title`、`body`、CSS・JavaScriptの読み込み先をページに合わせて変更する。
