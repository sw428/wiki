# 07_headerの担当範囲を決める

## このページの役割

`header`は、ページの一番上に置くための要素ではない。

このページでは、

- `header`が何をまとめる要素なのか
- ページ全体の`header`と`article`内の`header`の違い
- `nav`や見出しとどう組み合わせるか

を整理する。

## この範囲の芯

`header`は、**その範囲の導入やナビゲーションをまとめるための要素**。

たとえばページ全体なら、

```html
<header>
  <a href="/">サイト名</a>

  <nav>
    <ul>
      <li><a href="/about/">会社情報</a></li>
      <li><a href="/service/">サービス</a></li>
    </ul>
  </nav>
</header>
```

ここでは、

```text
header
→ ページ全体の導入やナビゲーションをまとめる

a
→ サイトトップへの移動

nav
→ 主要なナビゲーション
```

という関係になる。

## ページ上部だからheaderではない

`header`という名前から、

```text
画面の上にある
→ header
```

と判断しない。

大事なのは配置ではなく役割。

```html
<div class="top-banner">
  キャンペーン実施中
</div>
```

これが単なる装飾や告知エリアなら、ページ上部にあっても必ず`header`になるわけではない。

逆に、ページの途中にある`article`の中でも、その記事の導入部分なら`header`を使える。

```html
<article>
  <header>
    <h2>新サービスを公開しました</h2>
    <time datetime="2026-09-22">2026年9月22日</time>
  </header>

  <p>新しいサービスについて説明します。</p>
</article>
```

つまり、

```text
画面上の位置
≠ headerを使う理由
```

となる。

## ページ全体のheader

ページ全体の`header`では、サイトやページの導入に関係する内容をまとめる。

たとえば、

```html
<header>
  <a href="/">サイト名</a>

  <nav aria-label="サイト内">
    ...
  </nav>
</header>
```

のように、

- サイト名
- ロゴ
- ページタイトル
- メインナビゲーション

などが入ることがある。

ただし、これらを全部必ず入れるという意味ではない。

そのページで何が導入情報になるかによって決まる。

## articleの中にもheaderを置ける

`header`はページ全体専用ではない。

```html
<article>
  <header>
    <h2>HTMLの基本</h2>
    <p>2026年9月22日公開</p>
  </header>

  <p>HTMLについて解説します。</p>
</article>
```

ここでは、

```text
article
→ 一つの記事

header
→ その記事の導入情報
```

という関係になる。

ページ全体の`header`と役割の考え方は同じで、

> どの範囲に対する導入なのか

が違う。

## sectionの中にもheaderを置ける

必要であれば、`section`の導入をまとめるために`header`を使うこともできる。

```html
<section>
  <header>
    <h2>料金プラン</h2>
    <p>3つのプランから選べます。</p>
  </header>

  ...
</section>
```

この場合、

```text
section
→ 「料金プラン」という章

header
→ その章の導入部分
```

になる。

ただし、見出しだけしかないなら、必ず`header`で囲む必要はない。

```html
<section>
  <h2>料金プラン</h2>
  ...
</section>
```

これでも十分。

`header`は、導入情報をひとまとまりとして扱いたいときに使う。

## headerとh1〜h6は役割が違う

`header`は見出しそのものではない。

```html
<header>
  <h1>サービス紹介</h1>
  <p>提供サービスについて紹介します。</p>
</header>
```

ここでは、

```text
header
→ 導入情報をまとめる範囲

h1
→ 見出し
```

という別々の役割を持つ。

そのため、

```text
header
= 見出し
```

ではない。

見出しだけなら、`header`を使わずに`h1`だけ置くこともできる。

## headerとnavは役割が違う

`header`の中に`nav`が入ることは多い。

```html
<header>
  <a href="/">サイト名</a>

  <nav>
    <ul>
      <li><a href="/about/">会社情報</a></li>
      <li><a href="/service/">サービス</a></li>
    </ul>
  </nav>
</header>
```

ただし、

```text
header
→ 導入やナビゲーションをまとめる範囲

nav
→ ナビゲーションそのもの
```

なので、役割は同じではない。

`header`があるから`nav`が不要になるわけではない。

## headerの中に入るものは固定ではない

よくある構造として、

```text
ロゴ
サイト名
見出し
概要
公開日
著者情報
ナビゲーション
```

などがある。

ただし、

```text
headerにはロゴとnavを必ず入れる
```

というルールではない。

大事なのは、

> その範囲を理解したり利用したりするための導入情報か

という役割。

## headerをレイアウト用の箱にしない

たとえば、

```html
<header class="header">
  ...
</header>
```

にCSSを指定してレイアウトすること自体は問題ない。

ただし、

```text
上部を横並びにしたい
↓
headerを使う
```

という順番では考えない。

先に、

```text
この範囲はページの導入部分である
↓
headerを使う
↓
必要なレイアウトをCSSで指定する
```

と考える。

意味がなく、単に横並び用の箱が必要なら`div`を使うこともある。

## headerは複数存在できる

ページ全体に`header`が一つあり、さらに各`article`にも`header`がある、という構造も作れる。

```html
<header>
  <a href="/">サイト名</a>
</header>

<main>
  <article>
    <header>
      <h2>記事A</h2>
    </header>

    ...
  </article>

  <article>
    <header>
      <h2>記事B</h2>
    </header>

    ...
  </article>
</main>
```

この場合、

```text
最初のheader
→ ページ全体に対する導入

article内のheader
→ それぞれの記事に対する導入
```

となる。

`header`は1ページに1つだけという要素ではない。

ただし、`header`を別の`header`や`footer`、`address`の内側へ入れ子にはしない。

## 判断するときの見方

`header`を使うか迷ったら、

```text
この範囲は、
ページ・記事・章などの導入情報を
ひとまとまりにしているか
```

を見る。

さらに、

```text
このheaderは何に対するheaderなのか
```

を確認する。

```text
ページ全体
article
section
```

など、担当する範囲が分かれば判断しやすい。

単に画面上部にあるだけなら、`header`を使う理由にはならない。

## このページのまとめ

- `header`はその範囲の導入やナビゲーションをまとめる
- ページ上部にあるから`header`になるわけではない
- ページ全体だけでなく`article`や`section`にも使える
- `header`は1ページに複数存在できるが、別の`header`や`footer`などの内側へ入れ子にはしない
- `header`と見出しは別の役割
- `header`と`nav`も別の役割
- 見出しだけなら必ず`header`で囲む必要はない
- 判断するときは「何に対する導入なのか」を見る

## 仕様の確認先

- [HTML Standard - The header element](https://html.spec.whatwg.org/multipage/sections.html#the-header-element)
