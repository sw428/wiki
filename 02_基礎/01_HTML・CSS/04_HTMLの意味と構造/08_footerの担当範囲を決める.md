# 08_footerの担当範囲を決める

## このページの役割

`footer`は、ページの一番下に置くための要素ではない。

このページでは、

- `footer`が何をまとめる要素なのか
- ページ全体の`footer`と`article`内の`footer`の違い
- 著者情報や関連リンクをどう考えるか

を整理する。

## この範囲の芯

`footer`は、**その範囲に関する補足情報や締めの情報をまとめるための要素**。

たとえばページ全体なら、

```html
<footer>
  <p>© 2026 Example Inc.</p>

  <nav aria-label="サイト内補助">
    <ul>
      <li><a href="/privacy/">プライバシーポリシー</a></li>
      <li><a href="/contact/">お問い合わせ</a></li>
    </ul>
  </nav>
</footer>
```

ここでは、

```text
footer
→ ページ全体に関する補足・締めの情報

nav
→ その中のナビゲーション
```

という関係になる。

## ページ下部だからfooterではない

`footer`という名前から、

```text
画面の一番下にある
→ footer
```

と判断しない。

大事なのは位置ではなく役割。

```html
<div class="bottom-banner">
  今すぐ申し込む
</div>
```

これが単なる固定CTAや装飾エリアなら、画面下部にあっても必ず`footer`になるわけではない。

逆に、`article`の途中にある要素でも、その記事の補足・締め情報なら`footer`を使える。

```html
<article>
  <h2>新サービスを公開しました</h2>
  <p>...</p>

  <footer>
    <p>投稿者: 山田</p>
  </footer>
</article>
```

つまり、

```text
画面上の位置
≠ footerを使う理由
```

となる。

## ページ全体のfooter

ページ全体の`footer`では、ページやサイト全体に関係する補足情報をまとめる。

たとえば、

```text
著作権表記
運営者情報
問い合わせ
利用規約
プライバシーポリシー
補助的なナビゲーション
```

などが入ることがある。

```html
<footer>
  <p>© 2026 Example Inc.</p>

  <nav aria-label="サイト内補助">
    ...
  </nav>
</footer>
```

ただし、これらを全部必ず入れるという意味ではない。

そのページやサイトで何が締めの情報になるかによって決まる。

## articleの中にもfooterを置ける

`footer`はページ全体専用ではない。

```html
<article>
  <h2>HTMLの基本</h2>
  <p>HTMLについて解説します。</p>

  <footer>
    <p>投稿者: 山田</p>
    <p>最終更新: 2026年9月22日</p>
  </footer>
</article>
```

ここでは、

```text
article
→ 一つの記事

footer
→ その記事に関する締め・補足情報
```

という関係になる。

ページ全体の`footer`と役割の考え方は同じで、

> どの範囲に対するfooterなのか

が違う。

## sectionの中にもfooterを置ける

必要であれば、`section`に関する補足情報をまとめるために`footer`を使うこともできる。

```html
<section>
  <h2>イベント情報</h2>
  <p>...</p>

  <footer>
    <p>申込期限: 2026年10月1日</p>
  </footer>
</section>
```

この場合、

```text
section
→ イベント情報という章

footer
→ その章に関する補足・締め情報
```

となる。

ただし、補足情報が1つあるだけで必ず`footer`で囲む必要はない。

## footerとnavは役割が違う

`footer`の中に`nav`が入ることは多い。

```html
<footer>
  <nav aria-label="サイト内補助">
    <ul>
      <li><a href="/privacy/">プライバシーポリシー</a></li>
      <li><a href="/terms/">利用規約</a></li>
    </ul>
  </nav>
</footer>
```

それぞれ、

```text
footer
→ 補足・締めの情報をまとめる範囲

nav
→ ナビゲーションそのもの
```

なので、役割は同じではない。

`footer`があるから`nav`が不要になるわけではない。

## footerとasideは役割が違う

`aside`も補足的な内容を表すが、`footer`とは見る範囲が違う。

```text
aside
→ 主内容から少し離れた補足内容

footer
→ その範囲に関する締め・補足情報
```

たとえば、

```html
<article>
  <h2>記事タイトル</h2>

  <p>本文...</p>

  <aside>
    <h3>関連記事</h3>
    ...
  </aside>

  <footer>
    <p>投稿者: 山田</p>
  </footer>
</article>
```

なら、

```text
aside
→ 記事に関連する補足コンテンツ

footer
→ 記事そのものに関する締め情報
```

と分けられる。

## 著者情報はfooterに入ることがある

記事の著者情報や更新情報は、その記事に関する補足情報なので`footer`に入れられる。

```html
<article>
  <h2>CSSの基本</h2>
  <p>...</p>

  <footer>
    <p>著者: 山田太郎</p>
    <time datetime="2026-09-22">2026年9月22日更新</time>
  </footer>
</article>
```

表示する日付と機械向けの値の対応は、[日付をtimeで表す](./15_日付をtimeで表す.md)で扱う。

ただし、

```text
著者情報
→ 必ずfooter
```

という意味ではない。

その情報が記事のどこでどういう役割を持つかで判断する。

## footerの中にaddressが入ることもある

ページや記事の連絡先情報を示す場合、`footer`の中に`address`を置くこともある。

```html
<footer>
  <address>
    お問い合わせ:
    <a href="mailto:info@example.com">info@example.com</a>
  </address>
</footer>
```

ここでは、

```text
footer
→ ページに関する締め・補足情報

address
→ その内容に関係する連絡先
```

という役割分担になる。

`address`の詳しい判断は、[連絡先をaddressで表す](./18_連絡先をaddressで表す.md)で扱う。

## footerは複数存在できる

ページ全体に`footer`が一つあり、さらに各`article`にも`footer`がある、という構造も作れる。

```html
<main>
  <article>
    <h2>記事A</h2>
    <p>...</p>

    <footer>
      <p>投稿者: A</p>
    </footer>
  </article>

  <article>
    <h2>記事B</h2>
    <p>...</p>

    <footer>
      <p>投稿者: B</p>
    </footer>
  </article>
</main>

<footer>
  <p>© 2026 Example Inc.</p>
</footer>
```

この場合、

```text
article内のfooter
→ それぞれの記事に対する補足・締め情報

最後のfooter
→ ページ全体に対する補足・締め情報
```

となる。

`footer`は1ページに1つだけという要素ではない。

ただし、`footer`を別の`footer`や`header`、`address`の内側へ入れ子にはしない。

## headerとの関係

`header`と`footer`は、単純に、

```text
上 = header
下 = footer
```

という関係ではない。

役割で分けると、

```text
header
→ その範囲の導入やナビゲーションをまとめる

footer
→ その範囲の補足・締め情報をまとめる
```

となる。

どちらも、

> 何に対するheader / footerなのか

を見ることが大事。

## footerをレイアウト用の箱にしない

たとえば、

```html
<footer class="footer">
  ...
</footer>
```

にCSSを指定してレイアウトすること自体は問題ない。

ただし、

```text
ページの一番下を囲みたい
↓
footerを使う
```

という順番では考えない。

先に、

```text
この範囲はページ全体の補足・締め情報である
↓
footerを使う
↓
必要なレイアウトをCSSで指定する
```

と考える。

単に下部のレイアウト用の箱が必要なだけなら、`div`を使うこともある。

## 判断するときの見方

`footer`を使うか迷ったら、

```text
この範囲は、
ページ・記事・章などに関する
補足や締めの情報をまとめているか
```

を見る。

さらに、

```text
このfooterは何に対するfooterなのか
```

を確認する。

```text
ページ全体
article
section
```

など、担当する範囲が分かれば判断しやすい。

単に画面下部にあるだけなら、`footer`を使う理由にはならない。

## このページのまとめ

- `footer`はその範囲に関する補足・締め情報をまとめる
- ページ下部にあるから`footer`になるわけではない
- ページ全体だけでなく`article`や`section`にも使える
- `footer`は1ページに複数存在できるが、別の`footer`や`header`などの内側へ入れ子にはしない
- `footer`と`nav`は別の役割
- `footer`と`aside`も別の役割
- 著者情報や連絡先が入ることもある
- `header`は導入、`footer`は締めという役割で見る
- 判断するときは「何に対するfooterなのか」を見る

## 仕様の確認先

- [HTML Standard - The footer element](https://html.spec.whatwg.org/multipage/sections.html#the-footer-element)
