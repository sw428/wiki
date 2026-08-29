# 09_HTMLの意味と構造

## 目的

- HTML（意味構造）と CSS（見た目）を分け、デザインツール上の名前ではなく文書内の役割から要素を選べるようにする。

## ルール

- HTMLは文書構造と意味づけを担当する。
- CSSは見た目・配置・装飾を担当する。
- CSSだけで意味は基本的に付与できない（アクセシビリティ/SEOはHTML構造が土台）。
- [DOM](../../03_参照/DOM.md) には要素ノードと [テキストノード](../../03_参照/テキストノード.md) があり、指定反映は [CSS適用境界](../../03_参照/CSS適用境界.md) を分けて見る。

## 役割と座標の切り分け

| 項目 | HTML | CSS / JS |
|---|---|---|
| 主な役割 | 意味・構造 | 見た目・動き |
| 座標・数値処理 | 基本なし（文書順中心） | あり（位置・サイズ計算） |
| 原点意識 | 直接は持たない | レイアウト文脈で持つ |

## 意味的コンテンツと視覚的コンテンツ

| 分類 | 主体 | 例 |
|---|---|---|
| 意味的コンテンツ | HTML | 見出し、段落、`img` の `alt`、リスト構造 |
| 視覚的コンテンツ | CSS | 背景色、余白、背景画像、装飾線 |

### 文字と意味構造を画像へまとめる前に

LPでも、見出し、文章、一覧、リンク、ボタンの意味はHTMLへ残す。デザインを固定したいことだけを理由に、セクション全体を1枚のSVGやラスター画像へまとめない。

- HTMLへ残す: 見出し階層、本文、`ul / li`、リンク先、ボタンの操作。
- SVGや画像へ任せる: ロゴ、アイコン、固定された図版、HTMLで重複している装飾。
- CSSへ任せる: 背景色、余白、単純な線や形、レスポンシブ配置。

SVGを `<img>` で読み込んだ場合、SVG内部の見た目が表示されても、通常のHTML見出し・一覧・リンクとしてページ構造へ置いたことにはならない。変更、折り返し、読み上げ、操作が必要な内容はHTMLを優先する。

#### 画像化の範囲は「LPかどうか」だけで決めない

LPにも、広告やSNSからの流入を主に受けるものと、検索流入や継続的な情報提供を重視するものがある。そのため、「LPだからSEOを意識しない」「LPなら文字を画像化してよい」とは一般化しない。

文字や図形をHTML・CSSで作るか、アウトライン化したSVGなどへ固定するかは、次の優先事項を合わせて判断する。

| 観点 | HTMLテキスト・HTML要素を優先する理由 | 画像・SVGを候補にする場面 |
|---|---|---|
| 意味・検索 | 文書構造や周辺文脈をDOMへ直接残せる | ロゴや固定図版など、見た目自体が内容の一部 |
| アクセシビリティ | 文字の拡大、色調整、読み上げへ対応しやすい | 同等の内容を `alt` や周囲のHTMLで補える固定表現 |
| 操作 | リンク、ボタン、フォームを通常のHTML要素として持てる | 操作を持たない装飾・図版 |
| レスポンシブ | 折り返し、並び替え、部分的な表示変更がしやすい | 常に同じまとまりとして拡大縮小する部品 |
| 更新・保守 | 文言や構造を部分的に修正しやすい | 更新頻度が低く、デザイン再現を固定したい部品 |
| 案件仕様 | 意味と操作を守りながら実装方法を選べる | 指定フォントやアウトライン素材の使用条件がある部品 |

案件仕様でアウトラインSVGの使用が求められる場合でも、その条件は対象部品へ適用する。ページ全体を1枚の画像へまとめる根拠にはしない。

```txt
ページ全体
-> HTMLで意味・構造・操作を持つ

固定されたロゴ・キャッチコピー・装飾図版
-> 優先事項と案件仕様を確認してSVGなどを使う
```

検索への配慮も「画像を使わない」という単純な判断ではない。標準の `img` と文脈に合う `alt` は画像の理解を助けるが、見出し、本文、リンク、フォームなどの役割まで画像へ移さない。

確認先:

- [Google Search Central - Image SEO Best Practices](https://developers.google.com/search/docs/appearance/google-images)
- [W3C WAI - Images of Text](https://www.w3.org/WAI/tutorials/images/textual/)

#### アウトライン文字とalt

文字をアウトライン化すると、見た目は文字でもHTMLテキストではなく図形になる。可能なら実テキストをHTMLへ置き、CSSで見た目を調整する。

- 画像内にしか文字がない: `alt` に同じ内容を入れる。
- 同じ文字が周囲のHTMLにもある: 装飾画像は `alt=""` にして重複を避ける。
- 画像がリンクやボタンの内容になっている: 見た目の説明ではなく、操作の目的・移動先を伝える。

```html
<h2 class="course-heading">
  <img
    src="./img/course-heading.svg"
    alt="仲間と頑張る グループ講習"
    width="320"
    height="80"
  >
</h2>
```

この例では、画像の代替テキストが見出し内容を伝える。別に同じHTML見出しを置くなら、画像側を装飾として扱い `alt=""` にする。

確認先:

- [W3C WAI - Images Tutorial](https://www.w3.org/WAI/tutorials/images/)
- [W3C WAI - Images of Text](https://www.w3.org/WAI/tutorials/images/textual/)
- [W3C WAI - alt Decision Tree](https://www.w3.org/WAI/tutorials/images/decision-tree/)

## `div` / `span` と意味を持つ要素の違い

`div` と `span` は、意味を持たない汎用要素。
ブラウザは表示できるが、それだけでは「その領域が何なのか」は伝わりにくい。

```html
<div>
  <span>Three words</span>
</div>
```

一方で、次のように書くと、同じ「箱」でも意味が伝わる。

```html
<header>
  <h1>Three words</h1>
  <nav>
    <a href="/">one word</a>
  </nav>
</header>
```

この場合は、次のように読める。

- `header`: ヘッダー領域
- `h1`: 最上位見出し
- `nav`: ナビゲーション
- `a`: リンク

整理すると、次の違い。

```txt
div / span
-> 汎用の箱

header / nav / main / footer / section / h1 / button
-> 意味を持った箱
```

ただし、`div` / `span` が悪いわけではない。
意味を持つ要素が見つからず、配置・グルーピング・装飾のための箱が必要なときに使う。

## HTMLはCSSのためだけに書かない

HTMLは、CSSのセレクタやレイアウト用の箱を作るためだけのものではない。

```txt
HTML
-> 構造と意味

CSS
-> 見た目

JS
-> 状態変化・操作
```

たとえば、次のように書くと、見た目はボタン風にできても、HTML上の意味はただの `div` のまま。

```html
<div class="button">送信</div>
```

操作する部品なら、基本は最初から `button` を使う。

```html
<button type="button">送信</button>
```

`button` は、最初から「ボタン」という意味と操作機能を持っている。
見た目はCSSで整えればよい。

## リンクとボタンは押した結果で分ける

見た目がボタン型でも、押した結果が別ページや別URLへの移動なら `a` を使う。

```html
<a class="staff__more-link" href="./staff/">
  スタッフ一覧を見る
  <span aria-hidden="true">→</span>
</a>
```

`a` や `span` の既定表示が `inline` でも、必ず `p` の中へ置くという意味ではない。閉じた `p` の後ろへ、兄弟要素として `a` を置ける。表示上の改行との関係は [インラインと行の仕組み](./05_インラインと行の仕組み.md#ブロックの後ろにインライン要素を書いた時) で扱う。

この要素は、**ボタンのような見た目をしたリンク**である。背景色、角丸、余白などはCSSで付けられるため、外見を理由に `button` へ変えない。

| 押した結果 | 要素 |
|---|---|
| 別ページ、別URL、同一ページ内の位置へ移動する | `a` |
| フォームを送信する | `button type="submit"` |
| メニューの開閉、表示切替、ダイアログ表示などを実行する | `button type="button"` |

`a` ならリンク先URLを持てるため、新しいタブで開く、リンク先をコピーするなど、リンクとして期待される操作も保てる。ページ移動をJavaScriptだけで `button` に実装しない。

矢印がリンク名へ意味を足さない装飾なら、`aria-hidden="true"` で読み上げ対象から外してよい。単純な矢印なら疑似要素で表示する方法もある。

仕様確認先:

- [HTML Standard - `a` element](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-a-element)
- [HTML Standard - `button` element](https://html.spec.whatwg.org/multipage/form-elements.html#the-button-element)

## DOM / CSSOM / レンダーツリー / AOM の役割

これまでの整理では、画面表示までの流れを次のように見ていた。

```txt
HTML -> DOM
CSS -> CSSOM
DOM + CSSOM -> レンダーツリー
```

セマンティックHTMLでは、ここにAOMの視点を足す。

AOMは Accessibility Object Model の略。
ここでは、スクリーンリーダーなどの支援技術へ意味を伝えるための構造として扱う。

| 構造 | 何を扱うか |
|---|---|
| DOM | 要素・テキスト・属性の構造 |
| CSSOM | CSS指定の構造 |
| レンダーツリー | 画面に描くための構造 |
| AOM / アクセシビリティツリー | 支援技術に意味を伝えるための構造 |

つまり、HTMLはDOMを作るだけでなく、AOM側にも意味を渡す。

```txt
HTML
-> DOMを作る
-> AOMにも意味を渡す

CSS
-> 見た目を変える
-> ただし意味は基本変えない

JS
-> 状態や操作を変える
-> ただし意味を壊さないようにする
```

## A11y / セマンティックHTML / セクショニング / ランドマーク

- A11y（Accessibility）: 使いやすさ全体の設計（読み上げだけではない）
- セマンティックHTML: 要素に正しい意味を持たせる考え方全体
- セクショニングコンテンツ: 文書の区切り（`section` / `article` / `nav` / `aside` など）
- ランドマーク: 支援技術向けの主要領域目印（`main` / `nav` / `aside` / `footer` など）

違いの整理:
- セマンティックHTML = 全体方針
- セクショニング = 章立ての構造
- ランドマーク = 移動の目印

`header`、`main`、`footer`、`nav` は、ただの見た目用の箱ではない。
ランドマークとして扱われ、スクリーンリーダー利用者が「ナビゲーション」「メイン」「フッター」などのページ構造を把握しやすくなる。

つまりセマンティックHTMLは、単にきれいなHTMLを書くためだけではない。

- 人間が読むため
- ブラウザが解釈するため
- 支援技術が読むため
- 検索エンジンが理解するため

の土台になる。

## HTMLの骨組みを役割で切る

HTMLの骨組みを切るときは、見た目で `div` を置くのではなく、その領域が何の役割かで要素を選ぶ。

```html
<div class="header">
  <div class="title">...</div>
  <div class="nav">...</div>
</div>
```

CSSではこの形でも見た目を作れる。
ただし、HTMLとしての意味は弱い。

意味で切るなら、次のように考える。

```html
<header>
  <h1>...</h1>
  <nav>...</nav>
</header>
```

```txt
見た目で箱を置く
-> divが増えやすい

役割で要素を選ぶ
-> HTMLだけでも構造が伝わる
```

### デザインツールのレイヤー名をHTML要素へ直訳しない

Figmaなどのレイヤー名・グループ名は、デザインデータ内の整理や共有には使えるが、HTML要素を指定するものではない。

たとえば、背景写真、ロゴ、キャッチコピー、バッジをまとめたグループが `header` と名付けられていても、それだけでHTMLの `header` にするとは決まらない。

- サイトやページの導入領域としてロゴ・ナビゲーションなどを持つ: `header` を候補にする。
- メインコンテンツ内のファーストビューとして写真と訴求要素をまとめる: `section` など、実際の文書上の役割から選ぶ。
- 単に配置のために素材を束ねている: 意味を追加しない `div` も候補にする。

```txt
Figmaの名前
-> デザインデータ内での整理名

HTML要素
-> 文書内で実際に担当する意味から決める
```

レイヤー名は実装意図を推測する材料にはなるが、最終判断では、その領域が何を導入し、どの範囲に属し、どの操作や見出しを持つかを確認する。

### `header` は場所で意味が変わる

`header` は、いつでもサイト全体のヘッダーという意味ではない。
その範囲の導入・見出し領域を表す。

```html
<header>
  <h1>サイト名</h1>
</header>
```

ページ全体の上にある `header` は、サイトのヘッダーとして扱われやすい。
AOMでは `banner` のようなランドマークになる。

一方で、次の `header` は記事のヘッダー。

```html
<article>
  <header>
    <h2>記事タイトル</h2>
  </header>
</article>
```

```txt
header
-> その範囲の導入・見出し領域
```

ページ全体の `header` と、`article` や `section` 内の `header` は同じ文書内に共存できる。`header` はページに1つだけという要素ではない。

一方、見出しと説明文をCSS上まとめたいだけで、導入領域としての意味を持たせる必要がない場合は `div` でよい。`div` を選ぶ理由は「ページの `header` を1つに制限するため」ではなく、意味を追加しない汎用箱で足りるためである。

仕様確認先: [HTML Standard - `header` element](https://html.spec.whatwg.org/multipage/sections.html#the-header-element)

### `footer` も場所で意味が変わる

`footer` も、いつでもサイト全体のフッターという意味ではない。
その範囲の補足・末尾情報を表す。

```html
<footer>
  <p>&copy; 2026...</p>
</footer>
```

body直下やページ全体の最後にある `footer` は、サイトフッターとして扱われやすい。
AOMでは `contentinfo` のようなランドマークになる。

一方で、次の `footer` は記事のフッター。

```html
<article>
  <footer>
    <p>投稿日: 2026年...</p>
  </footer>
</article>
```

```txt
footer
-> その範囲の補足・末尾情報
```

### `main` は基本1ページに1つ

```html
<main>
  ページの主内容
</main>
```

`main` は、そのページの中心コンテンツを表す。
サイトヘッダー、ナビ、サイドバー、フッターではなく、ページ固有の主内容を入れる。

基本は1ページに1つ。

### `nav` は主要なナビゲーション領域

```html
<nav>
  <a href="/">トップ</a>
  <a href="/about/">私たちについて</a>
</nav>
```

リンクが複数あれば何でも `nav` にするわけではない。
主要なナビゲーションのまとまりに使う。

例:

- グローバルナビ
- ページ内ナビ
- 記事目次

### `aside` は補足情報

```html
<aside>
  関連記事
  広告
  プロフィール
</aside>
```

`aside` は、メイン内容に直接ではなく、間接的・補足的に関係する内容に使う。

例:

- サイドバー
- 関連記事
- 広告
- 補足メモ
- プロフィール

### `article` は独立して再利用できる内容

```html
<article>
  <h2>ブログ記事タイトル</h2>
  <p>本文...</p>
</article>
```

`article` は、単体で切り出しても意味が通る内容に使う。

`article` を使う理由は、画像と本文を横並びにするためではない。カード1件が、見出し、日付、概要、詳細リンクなどを持ち、単独の記事・コンテンツとして成立するために使う。配置だけが目的なら `div` や `li` のクラスでもCSSは適用できる。

例:

- ブログ記事
- ニュース記事
- カード型の記事一覧の1件
- レビュー
- 投稿

判断基準:

```txt
それ単体で別ページ / RSS / SNS に出しても意味が通るか？

通る
-> article候補
```

カードの見た目だけを理由に、すべてを `article` にしない。

```html
<!-- 独立した記事として読める -->
<li class="staff-list__item">
  <article class="staff-card">...</article>
</li>

<!-- 一覧項目ではあるが、独立した記事ではない -->
<li class="staff-card">...</li>
```

### `section` は見出しを持つ意味の区切り

```html
<section>
  <h2>サービス内容</h2>
  <p>...</p>
</section>
```

`section` は、文書内の意味ある区切り。
基本的に見出しとセットで考える。

ただの余白調整や背景色用の箱なら、`section` ではなく `div` でよいこともある。

```txt
section
-> 意味の区切り

div
-> 意味を持たない汎用の箱
```

### 見出し `h1`〜`h6` は大きさではなく階層

```html
<h1>ページタイトル</h1>
<h2>大きな章</h2>
<h3>章の中の小見出し</h3>
```

`h1` は大きい文字、`h2` は少し小さい文字、という意味ではない。

```txt
h1
-> 最上位見出し

h2
-> その下の章

h3
-> さらに下の小見出し
```

見た目を大きくしたいだけなら、HTMLの見出しレベルではなくCSSで調整する。

```css
.heading-large {
  font-size: 32px;
}
```

見出しレベルを飛ばすのは基本避ける。

```html
<!-- あまりよくない -->
<h1>タイトル</h1>
<h4>小見出し</h4>
```

基本は階層に沿って並べる。

```html
<h1>タイトル</h1>
<h2>セクション見出し</h2>
<h3>小見出し</h3>
```

### 制作での判断表

| 作りたいもの | HTML候補 |
|---|---|
| サイト上部 | `header` |
| グローバルナビ | `nav` |
| ページの主内容 | `main` |
| サービス紹介の区切り | `section` |
| ブログ記事1件 | `article` |
| 関連記事・サイドバー | `aside` |
| コピーライト・会社情報 | `footer` |
| ただのレイアウト用の箱 | `div` |

## `role` は後付けできるが、まず適切な要素を使う

`role` を使うと、要素に意味を後付けできる。

```html
<p role="button">Click Me</p>
```

この場合、支援技術には「ボタン」と伝えられる。
ただし、見た目や動作は普通の `p` のまま。
キーボード操作、Enter / Spaceでの実行、フォーカス管理などは自分で補う必要がある。

基本は、最初から意味と機能を持つ要素を使う。

```html
<button type="button">Click Me</button>
```

判断は次の順。

1. その役割を持つHTML要素があるか
2. あるなら、その要素を使う
3. どうしても要素だけで足りない場合に、`role` や `aria-*` で補う

```txt
roleで後付けするより、
最初から意味と機能を持つHTML要素を使う
```

これは実務でかなり重要。

## `p` と `img` の扱い

- [`img`](../../03_参照/置換要素.md) はフレージングコンテンツなので、`p` 内に置くこと自体は仕様上可能。
- ただし「段落本文の一部でない画像」を `p` に入れると意味が曖昧になりやすい。
- 独立した図版として扱うなら `figure` + `figcaption` が適切。
- 下層ページでサイトロゴを `h1` から外しても、ラッパーが自動的に `p` になるわけではない。段落なら `p`、配置・グルーピングなら `div`、ラッパーが不要ならリンクを直接置く形を検討する。

```html
<figure>
  <img src="image.jpg" alt="製品の外観">
  <figcaption>製品Aの正面写真</figcaption>
</figure>
```

## `div` と `figure / figcaption` の違い

- `div` は意味を持たない汎用コンテナ。
- `figure` は「独立した図版」、`figcaption` はその図版説明という意味を持つ。
- ここで変わるのは主に意味づけであり、崩れの主因は多くの場合CSS側（`grid` / `flex` / 幅高さ計算 / 余白）にある。
- 例外として、`figure` の既定マージン未リセットは余白差として見えることがある。

## 見出しレベル（`h2` / `h3` / `h4`）の決め方

- 見出しタグは見た目サイズではなく、文書階層で決める。
- 親見出しがない状態で `h4` から始めるのは原則避ける。
- その文言が章題でないなら、`p` / `span` を使う。

最小判断:
1. 新しい章の主題か  
   主題なら見出しタグ、本文なら `p`。
2. 既存の親階層は何か  
   親が `h2` なら子は `h3`、親が `h3` なら子は `h4`。
3. 見た目はCSSで作る  
   タグの選択と見た目調整を分離する。

## `iframe` 埋め込みの最小判断

- `iframe` は外部コンテンツ（例: YouTubeプレイヤー）をページ内に埋め込む要素。
- `src` は埋め込み対象URL（YouTubeなら `.../embed/<id>`）を指定する。
- `title` は「何の埋め込みか」を伝えるため、内容が分かる文言を付ける。
- `allowfullscreen` は全画面表示の許可。
- `allow` は機能許可の列挙で、媒体要件に合わせて必要最小限にする。

## 開閉UIでのA11y属性の整理

分類を先に分けると混線しにくい。

- 名前付け系: `aria-label` / `aria-labelledby`
- 関係付け系: `id` / `aria-controls` / `aria-labelledby`
- 状態系: `aria-expanded`
- 実表示系: `hidden`

### `hidden` と `aria-expanded` の違い

- `hidden`: 本文側の表示状態（実際に隠す）
- `aria-expanded`: ボタン側の状態（開いているかを伝える）

両方A11yに関係するが、対象要素が違う。

### ハンバーガーメニューでの接続

ハンバーガーメニューでも、ただの `div` をクリック可能にするより、最初から `button` を使う。

```html
<button
  class="hamburger-button"
  type="button"
  aria-controls="sp-nav"
  aria-expanded="false"
>
  メニュー
</button>

<nav id="sp-nav" aria-hidden="true">
  ...
</nav>
```

意味の分解:

- `button`: クリックできる操作部品
- `type="button"`: フォーム送信ではない通常ボタン
- `aria-controls`: どの領域を操作するか
- `aria-expanded`: 開いているか閉じているか
- `nav`: ナビゲーション領域

これは、見た目だけの次のような構造より意味が伝わりやすい。

```html
<div class="hamburger-button"></div>
```

JSで開閉状態を変える場合は、見た目のクラスだけでなく、`aria-expanded` や `aria-hidden` も同じ状態にそろえる。

```txt
見た目の開閉
-> CSSクラスで変える

支援技術へ伝える状態
-> aria-expanded / aria-hidden でそろえる
```

### `article` の `aria-labelledby` は必須か

今のサービスカードUIでは、`article` 内に `h3` があれば
追加の `aria-labelledby` は省略でよいことが多い。

理由:
- 構造把握は `h3` で十分な場面が多い
- ID管理コストが先に増えやすい

一方で、アイコンだけの開閉ボタンは名前が必須。

## 三角アイコンの実装分離（装飾 vs 状態）

- 装飾としての矢印（三角形）は、`::before` / `::after` を優先する。
- JSで状態連動する部品（回転、開閉状態同期など）は、`span` 等の実要素で持つ。

判断軸:
1. 意味を持つか（持たないなら疑似要素）
2. 操作対象か（操作/状態同期が必要なら実要素）
3. 形状が単純か（単純ならCSS border三角、複雑ならSVG）

## 関連記事構造と日時整合の判断

### 関連記事カードの構造判断

- 「一覧として読ませる意図」が強い場合は `section + ul/li + article` を優先。
- 既存実装が `div + article` で統一されている場合は、今回だけ無理に `li` 化しない。
- 判断軸は「意味の明確さ」と「既存との整合」の両方で決める。

### スタッフ一覧のような人物カード構造

- 見出しを持つ「スタッフ紹介」は `section` にする。
- 見出しを持たないメインビジュアルは、無理に `section` にせず `div` でよい。
- スタッフ一覧は複数人の集まりなので `ul > li` にする。
- 1人分のカードが独立して読めるなら、`li` の中を `article` にする。
- `ul` は一覧全体、`li` は一覧の1項目、`article` は独立して読める1件分の内容、と役割を分ける。
- `ul` の直下へ `article` を置かず、一覧項目を示す `li` の中へ置く。
- 独立した記事ではなく、見た目だけのカードなら `li` 内は `div` でよい。
- パンくずは、上位ページから現在地へ進む階層順なので `nav` + `ol` にする。
- 上位ページは移動できるリンクにし、現在地は最後の1項目として置く。
- `aria-current="page"` で現在地を明示する場合は、その項目だけに付ける。
- 区切り記号は視覚上の補助であり、階層の意味はリスト構造とリンク関係で表す。
- 区切りをCSSの文字生成で出す場合は、支援技術で装飾記号が余計に読まれないか確認する。問題があればCSSの線・背景か、`aria-hidden="true"` の実要素へ切り替える。

```html
<nav class="breadcrumb" aria-label="パンくずリスト">
  <ol class="breadcrumb__list">
    <li class="breadcrumb__item"><a href="/">HOME</a></li>
    <li class="breadcrumb__item"><a href="/section/">親ページ</a></li>
    <li class="breadcrumb__item" aria-current="page">現在のページ</li>
  </ol>
</nav>

<div class="hero">
  <img class="hero__image" src="./img/hero.webp" alt="">
</div>

<section class="staff">
  <h2 class="staff__title">スタッフ紹介</h2>

  <ul class="staff__list">
    <li class="staff__item">
      <article class="staff-card">
        <h3 class="staff-card__title">名前が入ります</h3>
      </article>
    </li>
  </ul>
</section>
```

仕様確認先:

- [HTML Standard - `ul` element](https://html.spec.whatwg.org/multipage/grouping-content.html#the-ul-element)
- [HTML Standard - `article` element](https://html.spec.whatwg.org/multipage/sections.html#the-article-element)
- [WAI-ARIA APG - Breadcrumb Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/)

### `time` の表示差分運用

- 同一記事カードなら、`datetime` と表示日付は一致させる。
- `datetime` には `YYYY-MM-DD` などの有効な機械可読値を入れる。`20XX-03-01` のような仮値は実コードへ残さない。
- SP/PCで文字を切り替える場合も、日付データ自体は同じ値を使う。
- カンプ差分で日付が違う場合は、実装コメントを残して正規データへ統一する。
- どうしても別日付を出し分ける仕様なら `time` 要素自体を分けるが、同一記事での運用は原則避ける。

## `div / section / address / ul` の最小判断

連絡先カードで迷いやすい組み合わせを、次の順で判定する。

1. その箱はページの「章」か  
   章なら `section`、ただの配置箱なら `div`。
2. 中身は連絡先情報か  
   連絡先なら `address` を優先。
3. 同じ種類の項目が反復しているか  
   反復しているなら `ul > li` を優先。

実務で多い形:

```html
<div class="contact-info">
  <address class="contact-info__body">
    <ul class="contact-info__list">
      <li class="contact-info__item">...</li>
    </ul>
  </address>
</div>
```

補足:
- `section` を使うなら、基本は見出しをセットで持たせる。
- `address` はブラウザ初期で斜体になることがあるため、`font-style: normal;` で戻す。

### `address` 内の `br` と `p`

`address` は、最も近い `article` または `body` に対する連絡先情報であることを示す要素であり、住所の各行を自動で意味分けする要素ではない。

| 要素 | 意味 | 住所内での使いどころ |
|---|---|---|
| `br` | 同じ内容の中の改行 | 1つの所在地を、郵便番号・住所・建物名などで改行する |
| `p` | 1つの段落 | 内容として別の段落へ分ける理由がある |

`br` は、住所や詩など、改行自体が内容の一部である場合に使う。カンプ上の幅で文章が折り返されているだけなら、HTMLへ `br` を固定せず、通常の折り返しとCSS上の幅に任せる。

```html
<address class="contact-info__address">
  〒000-0000<br>
  東京都○○区○○0-0-0<br>
  ○○ビル3階
</address>
```

見た目を1行ずつにしたいだけなら、各行を機械的に `p` へ分けない。反対に、独立した文章や段落として扱うなら `p` を使う。`p` の既定マージンは表示上の初期値なので、要素選択の理由にはせずCSSで調整する。

また、郵便上の住所なら常に `address` になるわけではない。ページ全体または記事の連絡先である場合に使い、単に本文中で所在地を示すだけなら文脈に合う通常の段落などを選ぶ。

仕様確認先:

- [HTML Standard - `address` element](https://html.spec.whatwg.org/multipage/sections.html#the-address-element)
- [HTML Standard - `br` element](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-br-element)
- [HTML Standard - `p` element](https://html.spec.whatwg.org/multipage/grouping-content.html#the-p-element)

## クラス名はDOMの深さではなく役割で決める

- すべての `div` に機械的にクラスを付ける必要はない。
- CSS・JS・再利用・意味の識別に必要な要素へ付ける。
- `box` / `wrap` / `content` のような形だけの名前より、担当する役割が追える名前を優先する。
- DOMの入れ子を、そのまま長いクラス名へ写さない。
- 同じ見た目でも役割や再利用範囲が違う場合は、別クラスとして扱う余地がある。

判断順:

1. その要素をCSSまたはJSから識別する必要があるか
2. 親の文脈内で何を担当するか
3. 単体で再利用するか、親がないと意味が成立しないか
4. 見た目ではなく役割を名前にできるか

### 画像へクラスを付ける判断

画像も、BEMの形を埋めるためだけに機械的にクラスを付けない。

クラスを付ける主な条件:

- 画像自体へ `width` / `aspect-ratio` / `object-fit` / 角丸などを指定する
- 同じ親の中に複数種類の画像があり、区別が必要
- JSから画像を識別する
- 再利用部品の中で画像の役割を明示したい

親要素の配置だけで完結する場合や、共通の `img` ルールで足りる場合は、画像専用クラスがなくてもよい。

### 装飾アイコンを疑似要素にするか実要素にするか

リンクやボタンの矢印は、意味を持つ本文ではなく装飾として扱うことが多い。
まず「単純な記号で足りるか」「画像素材として扱う必要があるか」を分ける。

#### 疑似要素で足りる場合

- `>` や単純な矢印だけで表現できる
- 画像ファイルとして管理する必要がない
- 状態連動や個別の代替テキストが不要

```css
.button-link::after {
  content: ">";
}
```

#### 実要素にする場合

- SVG / PNG などの支給素材を使う
- アイコンの大きさ、位置、表示条件を個別に調整したい
- JSや状態変化でアイコンを操作する可能性がある

```html
<a class="button-link" href="#">
  一覧へ
  <span class="button-link__arrow">
    <img class="button-link__arrow-image" src="img/arrow.svg" alt="">
  </span>
</a>
```

- 装飾アイコンなら `alt=""` にして読み上げ対象から外す。
- BEMでは、`button-link__arrow` のように「矢印の役割」を名前に出す。
- アイコン画像そのものへサイズ指定が必要なら、画像にもクラスを付ける。

## ナビゲーションはリンクの操作範囲まで設計する

ナビ項目では、文字位置だけでなく `<a>` のクリック範囲を確認する。

```html
<li class="global-nav__item">
  <a class="global-nav__link" href="#">トップ</a>
</li>
```

```css
.global-nav__item {
  border-inline-start: 1px solid #ccc;
}

.global-nav__link {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding-inline: 32px;
}
```

- `text-align: center` は主にインライン内容の横方向配置で、縦中央やクリック範囲を作る指定ではない。
- リンク側へ `padding` / `min-height` を持たせると、文字周辺だけでなく項目全体を操作範囲にできる。
- 通常は内容変化に耐えやすい `padding + min-height` を基準にする。
- カンプ上で各項目の均等幅が明確な場合は、幅指定を追加する。
- 区切り線、ナビ全体の余白、リンクの操作範囲を別責務として分ける。

## バナー一覧

複数の同種バナーは `ul > li > a` で構成する。

```html
<ul class="banner-list">
  <li class="banner-list__item">
    <a class="banner-list__link" href="">
      <img class="banner-list__image" src="" alt="">
      <span class="banner-list__text">リンク先を表す文言</span>
    </a>
  </li>
</ul>
```

- バナー全体を `a` にする。
- 画像と同等の内容をテキストで伝えているなら `alt=""` にする。
- 画像にしかない情報があるなら、`alt` または表示テキストで補う。
- `a` の中に別の `a` や `button` を入れない。

## `footer` の使い分け

- ページ全体の締め情報（著作権、共通リンク、全体連絡先）はグローバル `footer` に置く。
- `article` / `section` 単位の締め情報（投稿情報、タグ、関連リンク）はローカル `footer` を使ってよい。
- フッター内のリンク群が独立ナビなら `nav` を併用し、必要に応じて `aria-label` を付ける。

## 初期認識メモ（確度）

- 確度: 高
  - HTMLとCSSの役割分離を軸に理解しようとした点。
- 確度: 中
  - 意味的/視覚的コンテンツの二分（実務では有効、仕様上はより細かい分類がある）。
- 確度: 要修正
  - 「`p` の中の `img` は基本NG」は強すぎる。文脈に応じて適否を判断する。

## 判断基準

1. その情報は文書意味として残すべきか
2. 装飾だけでよいか
3. 音声読み上げや検索文脈で意味が伝わるか

## 一言でいうと

HTMLは見た目の大きさではなく、文書上の役割・独立性・読み上げ時の意味で要素を選ぶ。

## 参考

- [web.dev: Semantic HTML](https://web.dev/learn/html/semantic-html)
- [web.dev: Headings and sections](https://web.dev/learn/html/headings-and-sections)
