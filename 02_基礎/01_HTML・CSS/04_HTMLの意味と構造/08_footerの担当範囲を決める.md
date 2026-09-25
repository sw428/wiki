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

## 位置ではなく、担当する範囲を見る

`footer`はページ下部専用ではなく、ページ、`article`、`section`など、それぞれの範囲に対して使える。

```html
<article>
  <h2>新サービスを公開しました</h2>
  <p>...</p>

  <footer>
    <p>投稿者: 山田</p>
    <time datetime="2026-09-22">2026年9月22日更新</time>
  </footer>
</article>
```

この`footer`は、画面上の位置ではなく、記事に関する著者と更新情報をまとめている。

ページ全体なら著作権表記、運営者情報、利用規約へのリンクなど、`section`ならその章に関する補足が入ることがある。中身は固定せず、**何に対する補足・締めなのか**で判断する。

補足が一つあるだけなら、必ず`footer`で囲む必要はない。

## footerの中の要素とは役割を分ける

`footer`の中に`nav`や`address`が入っても、それぞれの役割は変わらない。

```html
<footer>
  <nav aria-label="サイト内補助">
    ...
  </nav>

  <address>
    お問い合わせ:
    <a href="mailto:info@example.com">info@example.com</a>
  </address>
</footer>
```

```text
footer
→ 補足・締めの情報をまとめる範囲

nav
→ その中のナビゲーション

address
→ その内容に関係する連絡先
```

`footer`があることを理由に、`nav`や`address`を省略しない。表示する日付は[日付をtimeで表す](./15_日付をtimeで表す.md)、連絡先は[連絡先をaddressで表す](./18_連絡先をaddressで表す.md)で詳しく扱う。

## asideやheaderとの違い

似て見える要素とは、担当で分ける。

```text
aside
→ 主内容から少し離れた補足内容

header
→ その範囲の導入情報

footer
→ その範囲に関する補足・締め情報
```

関連記事なら`aside`、記事の見出しや概要なら`header`、記事の著者や更新情報なら`footer`、というように内容との関係を見る。

## 見た目を整える箱とは分ける

画面下部の固定CTAや、下部を配置するための箱が、必ず`footer`になるわけではない。

```text
その範囲の補足・締め情報をまとめる
→ footer

配置や装飾のためだけにまとめる
→ divを検討する
```

`footer`にclassを付けてCSSでレイアウトすることはできる。先に役割から要素を選び、その後で見た目を指定する。

## footerは一つに限らない

ページ全体と各`article`に、それぞれの`footer`を置くことができる。

```html
<main>
  <article>
    <h2>記事タイトル</h2>
    <p>...</p>

    <footer>
      <p>投稿者: 山田</p>
    </footer>
  </article>
</main>

<footer>
  <p>© 2026 Example Inc.</p>
</footer>
```

内側の`footer`は記事、最後の`footer`はページ全体を担当する。`footer`は1ページに1つだけという要素ではない。

ただし、`footer`を別の`footer`や`header`、`address`の内側へ入れ子にはしない。

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
- `footer`、`nav`、`address`、`aside`はそれぞれ役割が違う
- 著者情報や連絡先が入っても、必ず`footer`になるわけではない
- `header`は導入、`footer`は締めという役割で見る
- 判断するときは「何に対するfooterなのか」を見る

## 仕様の確認先

- [HTML Standard - The footer element](https://html.spec.whatwg.org/multipage/sections.html#the-footer-element)
