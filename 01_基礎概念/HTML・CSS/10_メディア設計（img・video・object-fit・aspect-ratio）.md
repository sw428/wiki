# 10_メディア設計（img・video・object-fit・aspect-ratio）

## 目的

- 画像/動画でレイアウトを崩さず、CLSを抑えてレスポンシブ対応する。

## この章の担当範囲（06・13との分担）

- この章（10）:
  - `img` / `video` をレイアウト内で安定させる実装
  - `width` / `height` 属性、`aspect-ratio`、`object-fit`
  - CLS対策と崩れ防止パターン
- [06_画像と背景](./06_画像と背景.md):
  - `<img>` と `background-image` の意味差
  - 背景が見えない原因切り分け
  - `SVG` / `PNG` の装飾画像判断
- [13_デザインパターンとCSS固定判断](./13_デザインパターンとCSS固定判断.md):
  - ロゴ、文字入り画像、写真枠、バナー、iframeなど、見た目の型からCSS制御を選ぶ判断

この章では「意味の判断」より、**配置と崩れ防止の実装**に集中する。

## ルール

- 可能な限り、HTML属性 `width` / `height` で比率予約する。
- 表示上の伸縮はCSSで制御する。
- トリミング方針は `object-fit` で明示する。

## 実務での基本形

```html
<img
  src="dog.jpg"
  alt="犬"
  width="600"
  height="400"
  class="media-img"
>
```

```css
.media-img {
  display: block;
  width: 100%;
  height: auto;
}
```

- 属性: レイアウト予約（CLS抑制）
- CSS: 見た目の可変制御（レスポンシブ）

補足:
- エディタ補完やショートカットで `width` / `height` を入力した場合も、実画像の寸法または縦横比と一致しているか確認する。
- HTML属性は画像本来の比率を伝える役割、CSSは表示幅・表示枠・切り抜きを調整する役割として分ける。
- `height: auto` で比率維持表示する場合、`object-fit` の効果は目立ちにくい。
- 「枠に入れてトリミング」したい時は、下の `まず2択で決める` の B パターン（親に `aspect-ratio`、子に `height: 100% + object-fit`）を使う。

### 寸法・解像度・比率を分ける

「HTMLアスペクト」のようにまとめず、次の4つを分ける。

| 見ているもの | 例 | 意味 |
|---|---|---|
| 画像データのピクセル寸法 | `1600 × 900px` | ファイルが持つ画素数。解像度・画質に関係する |
| HTMLの寸法属性 | `width="800" height="450"` | 幅と高さの具体的な寸法情報。比率予約やCSSがない場合の基準にもなる |
| 表示寸法 | `600 × 337.5px` | CSSとレイアウト計算の結果、画面上で使われる大きさ |
| アスペクト比 | `16 / 9` | 幅と高さの関係。単独では800pxなどの絶対サイズを表さない |

HTMLの `width` / `height` は **dimension attributes（寸法属性）** である。2つの寸法からブラウザは比率も得られるが、CSSの `aspect-ratio` と同じ意味ではない。

- HTMLの `width="800" height="450"`: 幅800、高さ450という2つの寸法情報
- CSSの `aspect-ratio: 800 / 450`: `16 / 9` という比率情報

HTML寸法があっても、`width: 100%; height: auto;` が適用されれば最終表示は親幅に合わせて変わる。「具体的な寸法情報」と「最終表示が固定されること」は分けて考える。

## まず2択で決める（認知負荷を下げる）

1. そのまま見せる（比率維持）
   `height: auto` を使う。
2. 表示する比率をCSSで決める（比率固定）
   画像要素そのものをレイアウト上の枠として扱えるなら、画像自身に `aspect-ratio` を置く。画像の有無に関係なく領域を保つ場合や、文字・装飾も同じ領域へ重ねる場合は、親に `aspect-ratio`、子に `height: 100% + object-fit` を使う。

実装で迷ったら、先に「画像そのものを見せたいのか」「比率の箱へ入れたいのか」を分ける。
ロゴ、電話画像、予約画像、文字入りバナーのように切れると困る素材は、枠へ押し込む前に `width` + `height: auto` で足りるかを見る。

```css
/* A: そのまま見せる */
.image {
  display: block;
  width: 100%;
  height: auto;
}

/* B-1: 画像自身が比率の箱になる */
.image {
  display: block;
  width: 100%;
  aspect-ratio: 375 / 400;
  object-fit: cover;
}

/* B-2: 親が比率の箱になる */
.frame {
  aspect-ratio: 329 / 259;
  overflow: hidden;
}

.frame img,
.frame video {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

指定した `aspect-ratio` と元画像の比率が異なる場合、`object-fit: cover` は確定した画像要素の箱を埋めるように画像データを描画し、はみ出す部分を切り取る。`object-fit` 自体が画像要素の幅・高さを決めるわけではない。

`height: 100%` は `aspect-ratio` と常にセットなのではない。

- 画像自身に `aspect-ratio` がある: 画像要素自身の幅から高さが決まるため、`height: 100%` は不要
- 親に `aspect-ratio` がある: 親が作った高さへ画像要素を合わせるため、画像に `height: 100%` が必要

後者では、親の幅と `aspect-ratio` から親の高さが先に決まり、その確定した高さを基準に子画像の `height: 100%` が計算される。子の `height: 100%` が親の高さを作るわけではない。

## 外・箱・中身で分解する

- 外: `grid/flex`（どこに置くか）
- 箱: `width/aspect-ratio`（どんな形か）
- 中身: `img/video + object-fit`（どう見せるか）

この3つを混ぜないと、調整対象を誤りにくい。

## 画像自身と親のどちらに`aspect-ratio`を置くか

`aspect-ratio` は、指定した要素の幅と高さの比率を決める。画像自身にも親にも指定でき、どちらが正しいかではなく、どの要素をレイアウト上の枠として扱うかで選ぶ。

画像1枚だけで完結し、画像要素そのものがレイアウト上の枠を兼ねてよい場合は、画像自身を比率の箱にしてよい。

```css
.hero__image {
  display: block;
  width: 100%;
  aspect-ratio: 375 / 400;
  object-fit: cover;
}
```

画像の上へ文字、ラベル、暗いオーバーレイ、ボタンなどを重ねる場合は、親を共通の枠にすると責務を分けやすい。

親を枠にする理由は、重ね要素だけではない。画像の読み込み失敗・非表示・差し替えに関係なくカードのメディア領域を保つ場合や、ローディング表示・スケルトン・クリック領域を同じ箱で管理する場合にも親を使う。

```html
<div class="card__media">
  <img class="card__image" src="image.jpg" alt="">
</div>
```

```css
.card__media {
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.card__image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

役割は次のように分ける。

- 親: レイアウト上の枠。幅に応じて高さを決める
- `img`: 枠の中身。`object-fit` で収め方を決める

親を枠にする場合、画像が `width: 100%; height: auto;` のままだと、画像要素の高さは画像自身の比率から決まり、親の高さと一致するとは限らない。`width: 100%; height: 100%` で画像要素の箱を親と同じ大きさにし、元画像データとの比率差を `object-fit` で処理する。

### 画像ラッパーは必要な時だけ置く

画像だから必ず `div` で囲むわけではない。画像自身へ必要な幅、比率、角丸を指定でき、それだけで表示が完結するなら `img` を直接置いてよい。

```html
<article class="staff-card">
  <img
    class="staff-card__image"
    src="staff.jpg"
    alt=""
    width="220"
    height="220"
  >

  <div class="staff-card__body">...</div>
</article>
```

次のように、画像とは別の「メディア領域」を管理したい場合は `.staff-card__media` で囲む。

- 一定の縦横比や円形の枠を保つ
- `overflow: hidden` で切り抜く
- ローディング表示やバッジを重ねる
- 画像がなくても領域を確保する
- 画像の配置と、画像データの収め方を別々に変更する

```css
.staff-card__media {
  width: 220px;
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 50%;
}

.staff-card__image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

`article` はカード1件の意味を表す箱、`__media` は画像表示を制御する汎用の箱であり、追加する理由は別である。

### 円形画像は外周・切り抜き枠・画像データを分ける

背景色のリングがある円形アバターでは、1つの `img` だけで考えず、次の3層を分ける。

| 層 | 担当するもの |
|---|---|
| 外側のメディア領域 | 外周寸法、背景色、外側の円 |
| 内側のフレーム | 画像を見せる範囲、円形のクリップ |
| 画像 | 元画像の収め方、見える位置、必要時の拡大率 |

```css
.avatar__media {
  --avatar-size: 12rem;
  --ring-width: 0.5rem;

  width: var(--avatar-size);
  aspect-ratio: 1;
  padding: var(--ring-width);
  border-radius: 50%;
  background: #f1f1f1;
  box-sizing: border-box;
}

.avatar__frame {
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 50%;
}

.avatar__image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
```

borderがないこの例では、内側フレームの直径は `外周の使用サイズ - 左右のpadding` になる。`box-sizing: border-box` が外周寸法の中にpaddingを含めているためで、`content-box` のままならpadding分だけ外周が大きくなる。外周が合っていて画像の見え方だけが違う場合、外側の幅やpaddingを一緒に動かさない。

- 見える位置だけを変える: `object-position`
- 画像をさらに拡大する: 内側フレームでclipしたうえで、画像側の `transform: scale(...)`
- 外周の直径を変える: 外側のメディア領域の `width` / `aspect-ratio`

`scale()` はレイアウトで確定した外周寸法を作り直さず、描画結果を変える。拡大した画像を内側の円で止めるには、フレーム側の `overflow: hidden` が必要になる。

自然な比率でそのまま見せたい画像は、基本形のままにする。

```css
img {
  max-width: 100%;
  height: auto;
  display: block;
}
```

整理すると、次の3通りで考える。

- 画像の本来比率を守りたい: `img { max-width: 100%; height: auto; }`
- 画像要素そのものが指定比率の枠を兼ねてよい: 画像自身に `aspect-ratio` と `object-fit`
- 画像とは独立してメディア領域を保ちたい: 親に `aspect-ratio`、子画像に `width: 100%; height: 100%; object-fit`

## カンプと元画像から `aspect-ratio` の要否を判断する

PC/SPの完成カンプしかない場合は、ピクセル数の大小ではなく、**元画像とカンプ上の表示領域の縦横比**を比べる。

1. 元画像の幅と高さから比率を出す
2. カンプ上の画像表示領域を測り、比率を出す
3. 元画像のどこかが切れているかも確認する
4. 両端のカンプを再現した後、中間幅をDevToolsで確認する

| 観測結果 | 最初に選ぶ実装 |
|---|---|
| 比率が同じで、切り抜きもない | `width: 100%; height: auto;` |
| 比率が違う、または切り抜きがある | 枠の責務に応じて親または画像自身に `aspect-ratio`、画像に `object-fit: cover` |
| 画像の有無・差し替えに関係なく領域形状を維持したい | 画像から独立した親に `aspect-ratio` を持たせる |

画像要素自体が枠を兼ねてよければ画像自身、画像とは独立した領域として維持したければ親を選ぶ。「領域を固定するなら必ず親」ではない。

2倍書き出しでピクセル寸法だけが大きい場合は、比率枠の問題ではない。画質・画像候補の問題として、後述の[2倍書き出し画像の扱い](#2倍書き出し画像の扱い)で分ける。

## `<picture>`でPC/SP画像の比率が違う場合

`<source>` が切り替える画像と、画面上に描画される `<img>` 要素は分けて考える。

- `<picture>`: 複数候補から画像を選ぶための文脈を作る
- `<source>`: 選択条件、画像候補、候補に対応する寸法情報を渡す。要素自身は画像を描画しない
- `<img>`: 選ばれた画像を実際に表示する置換要素。`alt`、クラス、CSSの指定先もここに置く

`<source>` が選ばれ、その `width` / `height` が使える場合、ブラウザはそれらを `<img>` の寸法と `aspect-ratio` の計算元として利用できる。`<source>` 自身に表示箱が生まれるのではなく、選択結果が `<img>` の計算へ渡る。

PC/SP画像をそれぞれ画像本来の比率で表示する場合は、選択される画像ごとに適切な寸法属性をHTMLで伝え、表示幅をCSSで決める。

```html
<picture>
  <source
    media="(min-width: 768px)"
    srcset="./img/mv-pc.jpg"
    width="1920"
    height="500"
  >
  <img
    class="mv__image"
    src="./img/mv-sp.jpg"
    alt=""
    width="375"
    height="400"
  >
</picture>
```

```css
.mv__image {
  display: block;
  width: 100%;
  height: auto;
}
```

このHTMLの `1920` / `500` は「画面上で必ず1920 × 500px表示する」という指定ではない。選択された画像の寸法情報と比率をブラウザへ伝えるものであり、実際の表示幅はCSSと親の幅で決まる。

### `max-width: 100%` は画像を親幅まで広げない

次の指定は、画像が親より大きい時に縮めるための上限であり、小さい画像を親幅まで拡大する指定ではない。

```css
.mv__image {
  display: block;
  max-width: 100%;
  height: auto;
}
```

| 指定 | 幅の決まり方 |
|---|---|
| `max-width: 100%` | 親幅を上限にする。画像が小さい場合は、固有寸法やHTMLの `width` が幅の基準になりやすい |
| `width: 100%` | 包含ブロックの利用可能幅を表示幅の基準にする |

たとえば `<img width="375" height="400">` をフォールバックに持つ `<picture>` で、`1920 × 500` のPC画像が選ばれたとする。選択した `<source>` に寸法属性がなく、CSSで幅を上書きせず、ほかのレイアウト制約もない場合は、`<img>` の `width="375"` が表示幅の基準となり、幅375pxで表示されることがある。`height: auto` では読み込んだ画像の自然比率が使われるため、高さは次のように約97.66pxになる。

```txt
375 × 500 ÷ 1920 = 97.65625
```

親の利用可能幅いっぱいに表示したい場合は、上限だけでなく表示幅を指定する。

```css
.mv__image {
  display: block;
  width: 100%;
  height: auto;
}
```

切り分けでは、DevToolsまたはコンソールで次を分けて確認する。

- `currentSrc`: 実際に選択された画像URL
- `naturalWidth` / `naturalHeight`: 読み込んだ画像データの自然寸法
- Computed / Layout の `width` / `height`: 画面上の `<img>` 要素の使用寸法

「PC画像が選ばれている」と「PC向けの表示幅になっている」は別問題である。`<source>` は候補を選び、`<img>` とCSSが表示箱を決め、`object-fit` は確定した箱の中で画像データをどう描くかを決める。

一方、PC/SPそれぞれで「デザイン上の枠比率」を固定したい場合は、CSSで比率を切り替える。この方式では `<source>` の `width` / `height` を表示比率の管理に使わない。

```css
.mv__media {
  aspect-ratio: 375 / 400;
  overflow: hidden;
}

.mv__image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (min-width: 768px) {
  .mv__media {
    aspect-ratio: 1920 / 500;
  }
}
```

ここで `375 / 400` は375 × 400pxへの固定ではない。たとえば枠の幅が300pxなら、高さは320pxになる。固定しているのは実寸ではなく比率である。

同じ構図・同じ比率で解像度だけが違う画像は、PC/SP用の枠を分ける問題ではない。必要に応じて `srcset` の幅記述子と `sizes` を使い、ブラウザが適切な解像度を選べるようにする。

仕様確認先:

- [HTML Standard - `picture` element](https://html.spec.whatwg.org/multipage/embedded-content.html#the-picture-element)
- [HTML Standard - `source` element](https://html.spec.whatwg.org/multipage/embedded-content.html#the-source-element)
- [HTML Standard - dimension attributes in rendering](https://html.spec.whatwg.org/multipage/rendering.html#attributes-for-embedded-content-and-images)

## `object-fit` / `aspect-ratio`

- `object-fit: cover`: 枠を埋める（切り取りあり）
- `object-fit: contain`: 全体を収める（余白あり）
- `aspect-ratio`: 枠比率を先に固定してズレを減らす

### 文字入り画像・ロゴ画像は自然縮小を先に見る

電話ボタン、予約ボタン、ロゴのように文字や形が切れると困る画像は、写真カードと同じように比率枠へ押し込まない方が自然なことが多い。

```css
.action-image {
  display: block;
  width: 167px;
  height: auto;
}
```

- 比率を保って縮小したい: `width` + `height: auto`
- 枠いっぱいに埋めたい: `object-fit: cover`
- 全体を切らずに枠内へ収めたい: `object-fit: contain`
- 見える位置だけ変えたい: `object-position`

`aspect-ratio` は「比率の箱」を作る指定であり、画像を小さく見せる指定ではない。
文字入り画像で迷ったら、先に「切ってよい写真か」「全部見せる素材か」を分ける。

SVGロゴが潰れる、または表示幅が決まらない場合は、パスだけでなく表示サイズも確認する。

```css
img {
  max-width: 100%;
  height: auto;
  display: block;
}

#header .site-title img {
  width: 145px;
  height: auto;
}
```

ロゴでも、前述の [`max-width: 100%` の役割](#max-width-100-は画像を親幅まで広げない)は同じで、これだけでは実際の表示幅を決められない。
ロゴのように切らずに見せる素材は、`aspect-ratio` で枠へ押し込む前に、専用の `width` と `height: auto` で自然比率を保つ。

### 同じSVGロゴでPC/SPの表示幅だけ変える

PC/SPで同じSVGロゴを使い、縦横比も同じなら、比率はSVG自身に任せる。

- HTMLの `width` / `height` 属性: 元素材の比率をブラウザへ伝える
- CSS変数: PC/SPでの表示幅を切り替える
- `height: auto`: 素材比率から表示高さを自動計算する

```html
<img
  class="header__logo-image"
  src="./img/logo.svg"
  alt="サイト名"
  width="199"
  height="25"
>
```

```css
.header__logo {
  --logo-width: 358.13px;

  width: min(100%, var(--logo-width));
}

.header__logo-image {
  display: block;
  width: 100%;
  height: auto;
}

@media (max-width: 767px) {
  .header__logo {
    --logo-width: 268.36px;
  }
}
```

`width` と `height` をCSSで両方固定すると、素材比率と指定値が少しズレた時に変形し得る。
また、両方が確定している状態では `aspect-ratio` を足しても基本的に比率修正としては働かない。

同一比率のロゴでは、`aspect-ratio` を重複して書くより、素材の固有比率 + `height: auto` を優先する。
ただし、PC/SPで別比率の素材を使う場合や、意図的に枠へ収める場合は、別画像・親の `aspect-ratio`・`object-fit` の責務を分けて考える。

SVGの `viewBox` は、SVG内部のどの座標範囲を表示領域へ割り当てるかを示す。CSS上の表示幅・表示高さそのものではないため、カンプ上の寸法へ合わせる目的だけで変更しない。

ロゴの表示幅を決めて `height: auto` で自然比率を使えるなら、`object-fit` は不要である。固定幅・固定高の箱へ全体を収める必要がある場合は `contain` を検討できるが、ロゴを切る `cover` は避ける。

素材比率から計算した高さとカンプの測定値がわずかに違う場合は、次の順で確認する。

1. カンプ測定値の小数丸め
2. SVG内部の透明余白と、見えている図形の境界
3. 素材の `viewBox` と縦横比
4. 厳密な指定寸法が要件なら、素材データとカンプのどちらを正とするか

実装側でロゴを変形・切り抜きして差を隠すのではなく、厳密な一致が必要な場合は素材またはデザイン側の修正対象として確認する。

仕様確認先:

- [SVG 2 - `viewBox` attribute](https://svgwg.org/svg2-draft/coords.html#ViewBoxAttribute)
- [CSS Images - `object-fit`](https://drafts.csswg.org/css-images-3/#the-object-fit)

### `object-position` の表現と責務

- 意図を共有する時は `left center` のような語彙指定が読みやすい。
- 微調整が必要な時は `0% 50%` のような数値指定を使う。
- `object-position` は「見える範囲」を決める指定で、画像実体を動かす指定ではない。
- 画像実体の移動（`transform: translateX(...)`）はレイアウト副作用が出やすいため、切り取り位置調整の第一選択にはしない。

## `aspect-ratio` が決めるもの / 決めないもの

- `aspect-ratio` は「比率」を決める指定で、最大サイズを止める指定ではない。
- 実寸は `width` / `max-width` / グリッド列幅 / flex幅で決まる。
- 先に幅が大きく決まれば、`aspect-ratio` はその幅に応じて高さも大きく計算する。
- `aspect-ratio` がサイズ計算へ効くのは、基本的に幅か高さの少なくとも片方が自動計算される場合。幅と高さを両方固定すると、比率を追加してもその2値を置き換えない。

```css
.media {
  width: 800px;
  aspect-ratio: 16 / 9;
}
```

この場合、800pxを決めているのは `width` で、`aspect-ratio` は自動の高さを450pxへ計算する。`1600 / 900`、`800 / 450`、`16 / 9` はすべて同じ比率であり、数字を半分にしても表示サイズは半分にならない。

通常フローのブロックでは、明示的な `width` がなくても、外側のレイアウトから利用可能幅が計算されることが多い。その幅と `aspect-ratio` から高さが決まると、子画像がなくても親自身が高さを持てる。これが、親へ `aspect-ratio` を置くと「レスポンシブな枠を作った」ように見える理由である。

仕様確認先: [CSS Box Sizing Module Level 4 - Preferred Aspect Ratios](https://drafts.csswg.org/css-sizing-4/#aspect-ratio)

```css
.card-media {
  width: 100%;
  max-width: 570px;
  aspect-ratio: 570 / 416;
}
```

- この例で「570pxで止めている」のは `max-width`。
- `aspect-ratio` だけでは 570px 停止にはならない。

## 枠充填時の実装パターン

- 親に `aspect-ratio` だけ置き、子画像が `height: auto` のままだと、枠を埋めきれず下側に空きが見えることがある。
- 枠を充填したい場合は、次をセットで固定する。

```css
.media-link {
  display: block;
  aspect-ratio: 329 / 224;
  overflow: hidden;
}

.media-link > img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

- 画像1枚リンクでは `inline-flex` より `block` の方が、baseline由来の下隙間を避けやすい。

## PC/SP で比率が違う画像の既定運用

まず次の2択で決める。

1. 切れても成立する画像
   `aspect-ratio` + `object-fit: cover` で1枚運用する。
2. 切れたら困る画像（顔・文字・商品全体など）
   `<picture>` で PC 用 / SP 用の画像を分ける。

補足:
- 2倍書き出しは画質対策には有効
- ただし、構図の切れ問題は解決しない（`cover` なら切れる可能性は残る）

## 地図画像 + ピン重ねの扱い

地図を1枚画像で見せつつ、ピンを別要素で重ねる場合は「地図表示範囲」と「ピン座標」を分けて管理する。

```css
.access-map {
  position: relative;
  overflow: hidden;
}

.access-map__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.access-map__pin {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
```

注意:
- `position: absolute;` だけでは左上固定にならない。固定したい場合は `top: 0; left: 0;` を明示する。
- ピンは「地図座標」ではなく「親枠座標」に置かれる。
- SP/PCで `object-position` が変わると地図の見える範囲が変わるため、ピン座標も別調整が必要になる。

## 画像の上に文字を重ねる基本形

画像の上にラベルや仮テキストを重ねる時は、画像、重ねる箱、文字中央寄せを分ける。

```html
<div class="banner">
  <img src="banner.png" alt="" width="258" height="94">
  <span class="banner__text">関連サイトのバナー予定</span>
</div>
```

```css
.banner {
  position: relative;
}

.banner img {
  display: block;
  width: 100%;
  height: auto;
}

.banner__text {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
}
```

- 親: `position: relative` で絶対配置の基準箱になる
- 画像: 通常フローに残り、親の高さを作る
- テキスト箱: `position: absolute; inset: 0;` で親枠いっぱいに重なる
- 文字中央寄せ: テキスト箱の中で `grid` / `place-items` に任せる

絶対配置のテキストは親の高さを作らない。
そのため、親の高さを作る画像や比率枠と、上に重ねる要素の責務を混ぜない。

## 2倍書き出し画像の扱い

2倍書き出しは、表示枠ではなく解像度・画質の問題である。

画像が「基準表示寸法に対する正確な2倍書き出し」であると確認できる場合は、次の換算をHTML寸法の目安にできる。

```txt
画像ファイルのピクセル寸法 ÷ 書き出し倍率 = 基準表示寸法
```

ただし、常にファイル寸法を機械的に2で割るわけではない。カンプ上の表示寸法が分かっている場合は、その表示意図と画像比率を先に確認する。

たとえば画像ファイルが `400 × 400px`、カンプ上の基準表示が `210 × 210px` なら、正確な2倍ではなく約1.9倍である。この場合、基準表示を210pxとするならHTMLは `width="210" height="210"` とし、最終的な可変表示をCSSで決める。

たとえば表示基準が `800 × 450px` で、画像データを `1600 × 900px` で書き出しても、どちらも同じ `16 / 9` である。

```txt
1600 / 900 = 800 / 450 = 16 / 9
```

そのため、`aspect-ratio: 800 / 450` と書いても画像は半分の大きさにならない。実際の表示幅はCSSとレイアウトが決め、CSSで上書きしない場合はHTMLの寸法属性が初期の寸法基準になる。

```html
<img
  class="photo"
  src="./img/photo.jpg"
  srcset="./img/photo@2x.jpg 2x"
  width="800"
  height="450"
  alt=""
>
```

```css
.photo {
  display: block;
  width: 100%;
  max-width: 800px;
  height: auto;
}
```

- `src`: `srcset` を理解しない環境へのフォールバック。ここでは通常環境でも `1x` 候補として扱われる
- `srcset` の `2x`: 同じ表示領域に対する高密度画像の候補
- HTML `800 × 450`: 基準となる寸法属性と比率予約
- CSS `width` / `max-width`: レイアウト上の表示幅
- `height: auto`: 選択画像の比率を保った表示高さ

ファイル名の `@2x` は人間向けの名前であり、ブラウザが自動で2倍画像と解釈する印ではない。密度違いとして選択させる場合は、`srcset` の `2x` 記述子などで関係を伝える。

SP/PCで表示比率そのものが変わる場合は2倍画像とは別問題として、`<picture>` による画像切り替えやCSSの比率枠を検討する。

仕様確認先: [HTML Standard - Responsive images and pixel density descriptors](https://html.spec.whatwg.org/multipage/images.html#srcset-attribute)

## 比率情報が使える段階（実務判断）

| 方法 | ブラウザが比率指定を得る段階 | 主な用途 |
|---|---|---|
| HTML `width` / `height` | 対象要素のHTML解析時 | 画像本来の比率を先に伝える |
| CSS `aspect-ratio` | 対象ルールの取得・解析・適用後 | デザイン上の枠比率を作る |
| 何も指定しない | 画像の寸法を取得できた後 | 読み込み前に領域を予約できず、レイアウト移動が起きやすい |

CSSの `aspect-ratio` も、対象ルールが適用されれば画像の読み込み完了前に領域を作れる。ただし、HTMLの寸法属性と同じ段階で効くとは限らない。

画像本来の比率を使う場合はHTMLの `width` / `height` を先に書き、CSSの `aspect-ratio` はデザイン上の比率枠を別途固定する場合に使う。同じ比率を理由なく二重管理しない。

## 崩れやすい指定

```css
img {
  width: 100%;
  height: 100%;
}
```

- 親の縦横比と画像比率が違うと歪みやすい
- 比率維持が目的なら `height: auto` か `object-fit` を使う

## `border-radius` と `overflow: hidden`

- 単体画像なら画像に角丸を付ける
- 複合UI（動画+再生ボタン+時間ラベル）なら親に角丸を付ける
- 親で角丸管理する場合は `overflow: hidden` をセットにする

```css
.video {
  position: relative;
  aspect-ratio: 329 / 259;
  border-radius: 6px;
  overflow: hidden;
}
```

## 先に当てる優先順位（実務）

画像ズレ対策は、まず「数が多く、下流に影響を連鎖させる場所」から当てる。

1. カード一覧など画像枚数が多い領域
2. グリッドで複数画像を並べる領域
3. ヒーローなど単体だが上流にある領域

理由:
- 上流または大量画像の高さ変化は、ページ全体のズレに波及しやすい
- 影響が大きい場所から固定した方が効果確認が早い

## 初期認識メモ（確度）

- 確度: 高
  - 「属性 + CSS 併用が実務向き」という整理。
  - CLS視点でサイズ予約を優先する方針。

## 判断基準

1. 先に比率を予約できるか（`width` / `height` 属性 or `aspect-ratio`）
2. トリミング許容か（`cover`）/ 余白許容か（`contain`）
3. これは「外」「箱」「中身」のどれを調整しているか
4. 背景装飾の問題なら 06 側で切り分ける

## 一言でいうと

画像や動画は、外側の配置、比率を持つ箱、中身の収め方を分ける。CLS対策は比率予約から始める。
