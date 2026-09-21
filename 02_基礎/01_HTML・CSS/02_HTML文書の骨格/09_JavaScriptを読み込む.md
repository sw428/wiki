# 09_JavaScriptを読み込む

## このページの役割

HTML文書から外部JavaScriptファイルを読み込む基本形を扱う。

JavaScriptの取得・実行タイミングは、[scriptの読み込みと実行タイミングを知る](./10_scriptの読み込みと実行タイミングを知る.md)で扱う。

## `script`要素でJavaScriptを読み込む

外部JavaScriptファイルは、`script`要素の`src`属性で指定する。

```html
<script src="js/main.js"></script>
```

```text
script
└─ JavaScriptを読み込む要素

src
└─ 読み込むJavaScriptファイルの場所
```

たとえば、次の構成を見る。

```text
project/
├─ index.html
└─ js/
   └─ main.js
```

`index.html`から`main.js`を読み込むには、次のように書く。

```html
<script src="js/main.js"></script>
```

## 基本的には外部ファイルへ分ける

JavaScriptはHTML内へ直接書くこともできる。

```html
<script>
  console.log("Hello");
</script>
```

このWikiの基本形では、JavaScriptを別ファイルへ分けて読み込む。

```html
<script src="js/main.js"></script>
```

HTMLの文書構造とJavaScriptの処理を別ファイルとして管理できる。

## `src`はJavaScriptファイルへのパス

```html
<script src="js/main.js"></script>
```

`src`には、JavaScriptファイルの場所を指定する。

[baseで基準URLを変えていない](./11_baseで相対URLの基準を変える.md)通常の文書では、現在のHTMLファイルのURLを基準に`js/main.js`を探す。

たとえば、

```text
project/
├─ index.html
├─ css/
│  └─ style.css
└─ js/
   └─ main.js
```

なら、次のパスでCSSとJavaScriptを読み込める。

```html
<link rel="stylesheet" href="css/style.css">
<script src="js/main.js"></script>
```

## `script`を書く位置や属性で動作が変わる

`script`要素は、書く位置や属性によって、HTMLの解析とJavaScriptの実行タイミングが変わる。

たとえば、このWikiの基本形では次のように書く。

```html
<head>
  <script src="js/main.js" defer></script>
</head>
```

このページでは、`script`と`src`によって外部ファイルを指定するところまで扱う。`defer`の役割や属性を付けない場合との違いは、次のページで分けて確認する。

## 一言でいうと

外部JavaScriptは`script`要素で読み込み、`src`属性にJavaScriptファイルの場所を指定する。
