# 18_連絡先をaddressで表す

## このページの役割

`address`は、郵便住所を書くためだけの要素ではない。

このページでは、

- どんな情報を`address`で表すか
- 郵便住所との違い
- ページ全体と記事内でどう使い分けるか

を整理する。

## この範囲の芯

判断するのは、

> この情報は、最も近い`article`またはページ全体に関係する連絡先か

という点。

たとえば、サイト運営者の連絡先なら次のように書ける。

```html
<address>
  <a href="mailto:info@example.com">
    info@example.com
  </a>
</address>
```

`address`は、

```text
郵便住所を書く箱
```

ではなく、

```text
関係する人や組織への連絡先情報
```

として考える。

## 郵便住所だからaddressではない

たとえば、

```text
東京都○○区○○1-2-3
```

という文字列があっても、それだけで`address`になるわけではない。

その住所が、

```text
会社への連絡先
店舗への連絡先
記事を書いた人への連絡先
```

として示されているなら、`address`に含められる。

```html
<address>
  ABC株式会社<br>
  東京都○○区○○1-2-3
</address>
```

一方、文章の中で場所そのものを説明しているだけなら、`address`を使う理由にはならない。

```html
<p>
  イベントは東京都○○区○○1-2-3で開催します。
</p>
```

ここでは開催場所を説明しているのであって、そのページや記事に関係する連絡先として示しているわけではない。

## 郵便住所以外も入れられる

`address`に入る連絡先は、郵便住所だけではない。

```html
<address>
  <p>ABC株式会社</p>
  <p>
    メール:
    <a href="mailto:info@example.com">
      info@example.com
    </a>
  </p>
  <p>
    電話:
    <a href="tel:+81312345678">
      03-1234-5678
    </a>
  </p>
</address>
```

ここでは、

```text
会社名
メールアドレス
電話番号
```

を、その組織への連絡先情報としてまとめている。

## 最も近いarticleまたはページ全体の連絡先になる

`address`が表す対象は、周囲の構造によって決まる。

`article`の外側にある場合は、ページ全体に関係する連絡先として扱う。

```html
<footer>
  <address>
    <a href="mailto:info@example.com">
      info@example.com
    </a>
  </address>
</footer>
```

ここでは、

```text
footer
→ ページ全体に関する末尾情報

address
→ ページ側の運営者などへの連絡先
```

となる。

`footer`に入っているから`address`になるのではなく、内容が連絡先なので`address`を使う。

## article内ではその記事に関係する連絡先になる

`article`の中に`address`がある場合は、最も近い`article`に関係する連絡先を表す。

```html
<article>
  <h2>HTMLの基本</h2>
  <p>記事本文です。</p>

  <footer>
    <address>
      執筆者:
      <a href="mailto:writer@example.com">
        writer@example.com
      </a>
    </address>
  </footer>
</article>
```

ここでは、

```text
article
→ 一つの記事

address
→ その記事に関係する人への連絡先
```

という関係になる。

```text
誰の連絡先か
```

だけでなく、

```text
ページ全体とarticleのどちらに関係する連絡先か
```

を周囲の構造から確認する。

## 連絡先ではない情報まで入れない

会社情報をすべて`address`へ入れるわけではない。

```html
<address>
  設立: 2020年
  資本金: 1000万円
  従業員数: 20名
</address>
```

これらは会社情報ではあっても、連絡先ではない。

`address`には、

```text
関係する人や組織へ連絡するための情報
```

を中心に入れる。

## addressはsectionやdivの代わりではない

連絡先を含む範囲がページ内の一つの章なら、見出しを持つ`section`でまとめられる。

```html
<section>
  <h2>お問い合わせ</h2>
  <address>
    <a href="mailto:info@example.com">
      info@example.com
    </a>
  </address>
</section>
```

一方、配置のための外側の箱が必要なだけなら、`div`を使える。

```html
<div>
  <address>
    ...
  </address>
</div>
```

```text
section
→ 連絡先を含む章

address
→ 連絡先情報

div
→ 意味を追加しない配置用のまとまり
```

と役割を分ける。

## 見た目でaddressを選ばない

ブラウザの既定スタイルによって、`address`が斜体で表示されることがある。

しかし、

```text
斜体にしたい
→ address
```

ではない。

既定の斜体が不要なら、CSSで調整する。

```css
address {
  font-style: normal;
}
```

HTMLでは、連絡先を表しているかで判断する。

## 住所内の改行とは別に考える

郵便住所を表示するとき、次のように改行したくなることがある。

```text
東京都○○区
○○1-2-3
```

ただし、

```text
addressを使うか
```

と、

```text
br・p・ulのどれで中身を分けるか
```

は別の判断。

このページでは連絡先かどうかまでを決め、住所内の改行・段落・一覧は[住所内の改行と段落を分ける](./19_住所内の改行と段落を分ける.md)で扱う。

## 判断するときの見方

`address`を使うか迷ったら、次の順で見る。

```text
1. この情報は連絡先か
   ↓
   Yesならaddressを検討する

2. 郵便住所というだけか
   ↓
   それだけではaddressにしない

3. 最も近いarticleがあるか
   ↓
   あればそのarticleに関係する連絡先
   なければページ全体に関係する連絡先

4. 章や配置用の箱も必要か
   ↓
   section・divとは別に判断する
```

## このページのまとめ

- `address`は郵便住所専用の要素ではない
- 最も近い`article`またはページ全体に関係する連絡先を表す
- 郵便住所も、連絡先として使われているなら含められる
- メールアドレスや電話番号なども連絡先になる
- 場所を説明しているだけの住所には、必ずしも`address`を使わない
- 会社情報など、連絡先ではない情報まで入れない
- `section`・`div`・`address`は別々の役割を持つ
- 見た目ではなく、誰に関係する連絡先かで判断する

## 仕様の確認先

- [HTML Standard - The `address` element](https://html.spec.whatwg.org/multipage/sections.html#the-address-element)
