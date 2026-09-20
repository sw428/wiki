# 03_一覧とカードのHTML

複数のカードを並べるときは、一覧全体を表す要素と、1件分の内容を表す要素を分ける。カードの見た目だけでarticleを選ばず、「項目の集まりか」「各項目が独立して読めるか」を順に判断する。

要素選びの基本は[意味からHTML要素を選ぶ](./01_意味からHTML要素を選ぶ.md)。

## 一覧全体と1件分を分ける

順番に意味がない項目の集まりには `ul`、各項目には `li` を使う。その中の1件が単独の記事として成立するなら、`article` でまとめられる。

```html
<section class="news">
  <h2>お知らせ</h2>
  <ul class="news__list">
    <li class="news__item">
      <article class="news-card">
        <h3><a href="/news/open/">新しいサービスを公開しました</a></h3>
        <p>制作支援の内容をご紹介します。</p>
      </article>
    </li>
  </ul>
</section>
```

ここではsectionが「お知らせ」という主題、ulが一覧、liが1項目、articleが独立した内容を担当する。`ul` の直下に `article` を置かず、項目を示す `li` の中へ置く。

見た目だけのカードで、独立した記事として扱わないなら、`li` の中を `div` にするか、`li` 自体にクラスを付ければよい。見出しを付けない配置用のまとまりへ、機械的にsectionを足さない。

既存実装が `div + article` で統一されている場合は、今回の1件だけを無理にリストへ変えない。一覧として読ませる意図と、周囲との整合を確認してから構造を変える。

## 紹介カードも、項目と内容の独立性で考える

```html
<section>
  <h2>サービス紹介</h2>
  <ul class="card-list">
    <li class="card-list__item">
      <article class="card">
        <h3 class="card__title">サービス名</h3>
        <p>サービスの概要が入ります。</p>
      </article>
    </li>
  </ul>
</section>
```

複数のサービスの集まりだからul、一つずつが項目だからliを使う。articleは、その紹介が独立した内容として読める場合の候補。名前だけの箇条書きなら、articleは必要ない。

記事内に見出しがあることと、記事自体へ `aria-labelledby` で名前を付けることは別。通常の記事へ一律に追加せず、名前付けが必要な場合は[アクセシビリティの構造](../../../03_詳細/01_HTML・CSS/01_意味構造とアクセシビリティツリー.md#章の区切りとランドマークは同じではない)を確認する。

## パンくずは、現在地までの順序を表す

パンくずは上位ページから現在地へ進む順序があるので、`nav + ol` を使う。

```html
<nav class="breadcrumb" aria-label="パンくずリスト">
  <ol class="breadcrumb__list">
    <li class="breadcrumb__item"><a href="/">HOME</a></li>
    <li class="breadcrumb__item"><a href="/section/">親ページ</a></li>
    <li class="breadcrumb__item" aria-current="page">現在のページ</li>
  </ol>
</nav>
```

上位ページはリンク、現在地は最後の項目として置く。`aria-current="page"` を使うなら現在地だけに付ける。

区切り記号は視覚上の補助。CSSの文字生成で出す場合は、支援技術で余計に読まれないか確認する。問題があればCSSの線・背景か、`aria-hidden="true"` を付けた装飾要素を使う。[WAIのパンくずパターン](https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/)を参照。

## バナー一覧では、リンクの入れ子を作らない

複数の同種バナーも `ul > li > a` で構成できる。

```html
<ul class="banner-list">
  <li class="banner-list__item">
    <a class="banner-list__link" href="/service/">
      <img class="banner-list__image" src="./img/service.webp" alt="">
      <span class="banner-list__text">サービス案内</span>
    </a>
  </li>
</ul>
```

バナー全体をリンクにする。画像と同じ情報を表示テキストで伝えているなら `alt=""` にできる。画像にしかない情報はaltまたは表示テキストで補う。外側のaの中へ、別のaやbuttonを入れない。

画像の収め方は[バナーの枠と画像を分ける](../15_UI部品の実装判断/05_バナーの枠と画像を分ける.md)、クリックできる範囲は[CTAとナビリンクの操作範囲を作る](../15_UI部品の実装判断/07_CTAとナビリンクの操作範囲を作る.md)で扱う。

## 日付は、表示と機械可読値をそろえる

```html
<time datetime="2026-09-13">2026年9月13日</time>
```

同一記事の日付は、`datetime` と表示内容を一致させる。`20XX-03-01` のような仮値は実コードへ残さない。

SP/PCで表示形式を変えても日付データは同じ値を使う。カンプ上で日付が違う場合は、実装コメントを残して正規データへ統一する。別日付を出し分ける仕様ならtime要素も分けるが、同一記事での運用は原則避ける。

## 一覧の構造を確かめる

一覧全体と1項目を区別し、articleを選んだ場合は「単独で読める内容か」を確認する。横並びや間隔は[レイアウト](../09_レイアウト/01_FlexとGridで子要素を並べる.md)へ分担する。

仕様確認先：[ul](https://html.spec.whatwg.org/multipage/grouping-content.html#the-ul-element)、[article](https://html.spec.whatwg.org/multipage/sections.html#the-article-element)、[time](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-time-element)。
