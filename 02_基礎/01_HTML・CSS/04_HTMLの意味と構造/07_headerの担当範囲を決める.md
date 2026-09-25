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

## 位置ではなく、担当する範囲を見る

`header`はページ上部専用ではなく、ページ、`article`、`section`など、それぞれの範囲に対して使える。

```html
<article>
  <header>
    <h2>新サービスを公開しました</h2>
    <time datetime="2026-09-22">2026年9月22日</time>
  </header>

  <p>新しいサービスについて説明します。</p>
</article>
```

この`header`は、画面上の位置ではなく、記事の見出しと公開日を導入情報としてまとめている。

ページ全体の`header`ならサイト名や主要なナビゲーション、`section`の`header`なら章の見出しや概要が入ることがある。中身は固定せず、**何に対する導入なのか**で判断する。

見出ししかない場合は、必ず`header`で囲む必要はない。

```html
<section>
  <h2>料金プラン</h2>
  ...
</section>
```

## 見出しやnavとは役割を分ける

`header`は導入情報をまとめる範囲であり、見出しやナビゲーションそのものではない。

```html
<header>
  <h1>サービス紹介</h1>

  <nav aria-label="サイト内">
    ...
  </nav>
</header>
```

```text
header
→ 導入情報をまとめる範囲

h1
→ その範囲の見出し

nav
→ その中のナビゲーション
```

`header`があることを理由に、見出しや`nav`を省略しない。

## 見た目を整える箱とは分ける

ページ上部にある告知や、横並びにするための箱が、必ず`header`になるわけではない。

```text
その範囲の導入情報をまとめる
→ header

配置や装飾のためだけにまとめる
→ divを検討する
```

`header`にclassを付けてCSSでレイアウトすることはできる。先に役割から要素を選び、その後で見た目を指定する。

## headerは一つに限らない

ページ全体と各`article`に、それぞれの`header`を置くことができる。

```html
<header>
  <a href="/">サイト名</a>
</header>

<main>
  <article>
    <header>
      <h2>記事タイトル</h2>
    </header>
    ...
  </article>
</main>
```

最初の`header`はページ全体、内側の`header`は記事を担当する。`header`は1ページに1つだけという要素ではない。

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
- `header`、見出し、`nav`はそれぞれ役割が違う
- 見出しだけなら必ず`header`で囲む必要はない
- 判断するときは「何に対する導入なのか」を見る

## 仕様の確認先

- [HTML Standard - The header element](https://html.spec.whatwg.org/multipage/sections.html#the-header-element)
