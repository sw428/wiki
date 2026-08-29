# 02_ケース_ロゴSVGサイズ指定とstaffページ構造判断

## このページの扱い

- cj-pro `02` 制作中に出た、ロゴSVGのサイズ指定、2倍書き出し画像のHTML寸法、フッター住所の改行、ページ構造、BEM/FLOCSS接頭辞の判断をまとめる。
- 案件固有のロゴ名、画像、カンプ数値は正本にせず、再利用できる判断だけを抽出する。
- HTML/CSSの一般原理は基礎概念へ、自分の採用方針は設計ルールへ戻す。

## ケース1_同一SVGロゴのPC/SPサイズ指定

### 現象

- PC/SPで同じSVGロゴを使う。
- PC/SPで縦横比は同じで、違うのは表示幅だけ。
- `width` と `height` を両方CSSで固定するか、`aspect-ratio` を指定するか、`height: auto` に任せるかを確認した。

### 前提条件

- SVG自体が正しい縦横比を持っている。
- HTMLの `width` / `height` 属性は、表示サイズではなく元素材の比率をブラウザへ伝えるために使う。
- Figma上の測定値は、小数、透明余白、計測位置によって素材本来の比率とわずかにズレることがある。

### 採用した形

```html
<h1 class="c-logo">
  <a class="c-logo__link" href="/">
    <img
      class="c-logo__image"
      src="./img/logo.svg"
      alt="サイト名"
      width="199"
      height="25"
    >
  </a>
</h1>
```

```css
.c-logo {
  --logo-width: 358.13px;

  width: min(100%, var(--logo-width));
  margin-inline: auto;
}

.c-logo__link,
.c-logo__image {
  display: block;
}

.c-logo__image {
  width: 100%;
  height: auto;
}

@media (max-width: 767px) {
  .c-logo {
    --logo-width: 268.36px;
  }
}
```

### 判断

- 比率はSVG自身に任せ、表示幅だけCSS変数で制御する。
- `height: auto` にしておけば、PC/SPで表示幅を変えても高さは素材比率から自動計算される。
- CSSで `width` と `height` を両方固定すると、数値が少しズレた時に素材を箱へ押し込む形になり、厳密には変形し得る。
- `aspect-ratio` は、幅と高さを両方固定している場合は基本的に効かない。
- SVGロゴや通常の画像は固有比率を持つため、今回のように同じ比率のまま幅だけ変えるなら、`aspect-ratio` を重複指定しない方が事故点が少ない。
- `.c-logo` が `h1` の場合は、ブラウザ標準の上下マージンが残っていないか確認する。

### 例外

- PC/SPで別比率のロゴを使う場合は、同じ画像を幅だけ変える前提が崩れる。
- 見た目上の余白や切り抜き枠をそろえたい場合は、親に `aspect-ratio` を置くか、別画像・別レイアウトとして扱う。
- カンプ測定値とSVG本体の比率が違う場合は、素材比率を優先するのか、カンプ上の見た目を優先するのかを先に決める。

### カンプ測定値とSVG比率が少し違う場合

- SVGの `viewBox` が示す比率と、カンプ上で測った幅・高さの比率がわずかに違う場合がある。
- 表示幅をCSSで決め、`height: auto` で素材比率から高さを出す。カンプとの差が小さい場合は、計測時の丸めやSVG内の透明余白も確認する。
- `viewBox` はSVG内部の座標範囲であり、カンプ上の表示寸法へ合わせるために変更しない。
- 幅だけを決めて自然比率で表示できるなら、`object-fit` は不要。
- どうしても固定幅・固定高の枠へ全体を収める必要がある場合は `object-fit: contain` を検討できるが、ロゴを切る `cover` は避ける。
- 指定寸法が厳密な要件なら、実装側でロゴを変形・切り抜きせず、素材データまたはカンプのどちらを正とするかデザイン側へ確認する。

## ケース2_staffページのHTML構造とBEM分割

### 現象

- ヘッダー、パンくず、メインビジュアル、スタッフ紹介、フッターを持つページで、どこを `section` にするか、BEMのBlockをどう分けるかを確認した。

### 採用した構造判断

- ページ全体は `header` / `main` / `footer` で大枠を分ける。
- 見出しを持つ「スタッフ紹介」は `section` にする。
- 見出しを持たないメインビジュアルは、無理に `section` にせず `div` で扱ってよい。
- パンくずは階層順なので `nav` + `ol` にする。
- スタッフ一覧は、順番そのものより複数人の集まりであることが中心なので `ul` にする。
- 1人分のスタッフカードは、`li` の中に独立した `staff-card` Blockとして置く。

```html
<section class="staff">
  <h2 class="staff__title">スタッフ紹介</h2>

  <ul class="staff__list">
    <li class="staff__item">
      <article class="staff-card">
        <img class="staff-card__image" src="./img/staff-01.webp" alt="スタッフの写真">
        <h3 class="staff-card__title">名前が入ります</h3>
        <p class="staff-card__text">紹介文が入ります。</p>
      </article>
    </li>
  </ul>
</section>
```

### BEM判断

- `.staff__item` の中へカード内部の全要素を詰め込まない。
- スタッフ1人分が別ページや別セクションでも使える可能性があるなら、`staff-card` を独立Blockとして分ける。
- DOMの深さをそのままクラス名へ写さない。

```css
/* 避ける */
.staff__list-item-card-image {}
.staff__list-item-card-title {}

/* 採用 */
.staff__list {}
.staff__item {}
.staff-card {}
.staff-card__image {}
.staff-card__title {}
```

## ケース3_共通部分を `c-` にする場合の接頭辞

### 現象

- 共通部品を `c-` にするなら、それ以外の接頭辞をどう分けるか確認した。

### 採用した判断

| 接頭辞 | 用途 | 例 |
|---|---|---|
| `l-` | ページ全体の骨組み、配置の器 | `l-header`, `l-main`, `l-footer`, `l-inner` |
| `c-` | 複数箇所でそのまま再利用できる部品 | `c-logo`, `c-button`, `c-breadcrumb` |
| `p-` | そのページや案件固有のまとまり | `p-hero`, `p-staff`, `p-staff-card` |
| `u-` | 単一目的の補助クラス | `u-hidden-sp`, `u-text-center` |
| `js-` | JavaScript取得用の目印 | `js-menu-button` |
| `is-` / `has-` | 状態 | `is-open`, `is-active`, `has-error` |

### 判断基準

- 別ページへそのまま移しても使えるなら `c-`。
- そのページの文脈に強く依存するなら `p-`。
- ヘッダー、フッター、インナーなどの大枠や配置なら `l-`。
- 最初から何でも `c-` にせず、現時点で本当に共通かどうかで分ける。
- `p-staff-card` が後から複数ページで共通利用されるようになったら、その時点で `c-staff-card` へ昇格する。

## ケース4_`.l-page` と `.l-inner` の責務分離

### 現象

- カンプ上でページ全体の外枠が同じ幅に見えるため、すべてを `.l-inner` で統一してよいか確認した。
- 白いサイト領域の外側にグレー背景が見えるような、ページ全体の最大幅を持つデザインを想定した。

### 採用した判断

- `.l-page`: サイト全体の最大幅、中央寄せ、ページ背景を担当する。
- `.l-inner`: 各Block内部の共通横幅、左右の安全余白、中央寄せを担当する。
- `.l-inner` をページ全体の外枠として使わない。
- カンプが1600px幅で作られているだけなら、必ず `max-width: 1600px` をCSSへ入れるとは限らない。
- 外側に明確なグレー領域を出す仕様なら、`.l-page` に最大幅を持たせる。

```css
body {
  margin: 0;
  background-color: #eee;
}

.l-page {
  width: 100%;
  max-width: 1600px;
  min-height: 100vh;
  margin-inline: auto;
  background-color: #fff;
}

.l-inner {
  width: min(calc(100% - 40px), 1000px);
  margin-inline: auto;
}
```

```html
<div class="l-page">
  <header class="header">
    <div class="header__inner l-inner">
      ...
    </div>
  </header>

  <main>
    <div class="hero">
      ...
    </div>

    <section class="staff">
      <div class="staff__inner l-inner">
        ...
      </div>
    </section>
  </main>

  <footer class="footer">
    <div class="footer__inner l-inner">
      ...
    </div>
  </footer>
</div>
```

### 責務の見方

- `body`: ブラウザ画面全体の背景
- `.l-page`: サイト全体の外枠
- `.l-inner`: 中身の共通幅
- `hero`: `.l-page` 幅いっぱいに使うメインビジュアル
- `staff__inner l-inner`: staffセクション内の本文幅

## ケース5_親Blockと子Blockの配置責務

### 採用した判断

- 親Blockは、直下の子要素や子Block同士の配置を決める。
- 子Blockは、自分自身の内部構造を管理する。
- カード一覧の列数を変えるなら、カード本体ではなく一覧側を触る。
- カード内部の画像位置や本文配置を変えるなら、カード本体側を触る。

```css
.staff__list {
  display: grid;
  gap: 40px 20px;
}

.staff-card {
  /* カード内部だけ */
}
```

重要なのは、命名方式そのものよりも、修正するときに変更範囲を予測できること。

## ケース6_SPファーストで作ってからリファクタリングする

### 採用した進め方

1. SPを最後まで作る。
2. PCへ拡張する。
3. 完成したCSSを見返す。
4. 変更しにくい場所だけ境界を直す。

### 見返すポイント

- 同じ幅指定が何度も出ていないか
- 同じボタン構造が複数出ていないか
- 外側余白を子Block自身が持っていないか
- 1クラスに背景、幅、配置、文字装飾が集中していないか
- 名前を見ても責務が分からない箇所がないか

最初から未来の全変更を予測して完璧に分けるのではなく、一度作る、変更しにくい場所を発見する、境界を直すという反復を設計経験として扱う。

## ケース7_2倍書き出し画像とHTML寸法

### 現象

- 画像ファイルのピクセル寸法、カンプ上の表示寸法、HTMLの `width` / `height` のどれを基準にするか混線した。
- カンプ上では正方形の画像を `210 × 210px` で表示し、支給画像は `400 × 400px` だった。

### 判断

- 2倍書き出しは画質・解像度の話であり、最終表示寸法を決めるものではない。
- 正確な2倍書き出しで、1倍時の基準表示寸法も決まっているなら、ファイル寸法を2で割った値をHTML寸法の目安にできる。
- ただし、`400 ÷ 210` は約1.9であり、今回の素材はカンプ寸法に対する正確な2倍画像ではない。
- カンプ上で `210 × 210px` を基準に表示するなら、HTMLには `width="210" height="210"` を書き、実際の可変表示はCSSと親幅で決める。
- `width="400" height="400"` でも比率は同じだが、CSSが効かない場合の基準寸法が素材の400pxになる。表示意図が210pxと分かっている今回のケースでは、210を基準にする方が読み取りやすい。

```html
<img
  class="staff-card__image"
  src="./img/staff-01.webp"
  alt="スタッフの写真"
  width="210"
  height="210"
>
```

```css
.staff-card__image {
  display: block;
  width: 100%;
  height: auto;
}
```

### PC/SPで別画像を使う場合

- PC/SPで画像の比率が違う場合は、最大のPC画像寸法を両方へ流用しない。
- `<source>` とフォールバックの `<img>` に、それぞれ選択画像の基準寸法と比率を伝える。
- CSSで枠比率を固定して切り抜く場合は、HTML寸法とは別に `aspect-ratio` と `object-fit` の責務を決める。

## ケース8_フッター住所の `br` と `p`

### 現象

- 1つの連絡先を複数行に見せる時、住所、郵便番号、電話・FAXを1行ずつ `p` にするか、`br` で改行するかを確認した。

### 判断

- `address` は、最も近い `article` または `body` に対する連絡先情報であることを示す。`address` 自体が各行を段落へ分けるわけではない。
- `p` は段落を表す。住所の各行を独立した段落として扱う理由がある場合に使う。
- `br` は同じ内容の中の改行を表す。1つの所在地を郵便番号、住所、建物名などで改行する用途に合う。
- `p` の既定マージンは見た目上の差であり、`p` を選ぶ意味上の理由にはしない。余白はCSSで調整する。
- 今回のような単純な所在地と連絡先のまとまりは、行ごとに独立した段落へ分けず、`address` 内を `br` で改行する形を採用した。

```html
<div class="footer__company">
  <p class="footer__company-name">会社名</p>

  <address class="footer__address">
    〒000-0000<br>
    東京都○○区○○0-0-0<br>
    TEL 00-0000-0000　FAX 00-0000-0000
  </address>
</div>
```

### 例外

- 複数の連絡手段を項目として反復させる場合は、`ul > li` などの一覧構造も候補になる。
- 郵便上の住所であっても、ページや記事の連絡先ではない任意の所在地には、機械的に `address` を使わない。

## 基礎概念へ戻した内容

- `01_基礎/HTML・CSS/10_メディア設計（img・video・object-fit・aspect-ratio）.md`
  - 同一SVGロゴは、HTML属性で素材比率、CSS変数で表示幅、`height: auto` で高さ自動計算に分ける判断を追記。
  - 2倍書き出し画像では、ファイル寸法、HTMLの基準寸法、CSS上の表示寸法を分ける説明を補足。
  - SVGの `viewBox`、自然比率、`object-fit`、カンプ測定差の確認先を補足。
- `01_基礎/HTML・CSS/09_HTMLの意味と構造.md`
  - staff一覧の `section + ul/li + article`、パンくずの `ol`、見出しなしheroの `div` 判断を追記。
  - `address` 内で、同じ連絡先の改行には `br`、別段落には `p` を使う区別を追記。
- `01_基礎/HTML・CSS/07_レイアウト.md`
  - `.l-page` と `.l-inner` の責務分離を追記。
- `01_基礎/設計/CSS設計/01_BEMとクラス命名.md`
  - DOM階層を長いElement名へ写さず、再利用できるカードを独立Block化する判断を追記。
- `01_基礎/設計/CSS設計/00_CSS設計整理マップ.md`
  - `l-` / `c-` / `p-` / `u-` / `js-` / `is-` / `has-` の接頭辞運用、`.l-page` / `.l-inner` の境界、親Blockと子Blockの配置責務を追記。
- `01_基礎/HTML・CSS/13_デザインパターンとCSS固定判断.md`
  - ロゴ素材とカンプの比率差を、実装側の変形・切り抜きで吸収せず、必要なら素材・デザイン側へ確認する判断を追記。
