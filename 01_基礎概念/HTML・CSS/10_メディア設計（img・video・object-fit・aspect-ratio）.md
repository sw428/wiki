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

## まず2択で決める（認知負荷を下げる）

1. そのまま見せる（比率維持）  
   `height: auto` を使う。
2. 枠に入れて見せる（比率固定）  
   親に `aspect-ratio`、子に `height: 100% + object-fit` を使う。

実装で迷ったら、先に「画像そのものを見せたいのか」「比率の箱へ入れたいのか」を分ける。
ロゴ、電話画像、予約画像、文字入りバナーのように切れると困る素材は、枠へ押し込む前に `width` + `height: auto` で足りるかを見る。

```css
/* A: そのまま見せる */
.image {
  display: block;
  width: 100%;
  height: auto;
}

/* B: 枠に入れて見せる */
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

## 外・箱・中身で分解する

- 外: `grid/flex`（どこに置くか）
- 箱: `width/aspect-ratio`（どんな形か）
- 中身: `img/video + object-fit`（どう見せるか）

この3つを混ぜないと、調整対象を誤りにくい。

## `img`ではなく親に`aspect-ratio`を置く理由

`aspect-ratio` を使う主目的は、画像そのものを変形することではなく、画像が入る「枠」の高さを先に確保すること。

そのため、カード画像やサムネイルのように比率をそろえたい場合は、親を伸び縮みする枠として扱い、その中に画像を入れる方が安定しやすい。

```css
.card__image {
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.card__image img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

役割は次のように分ける。

- 親: レイアウト上の枠。幅に応じて高さを決める
- `img`: 枠の中身。`object-fit` で収め方を決める

`img` 自体に `width` / `height` の固定値や `aspect-ratio` を持たせすぎると、画像本来の比率、表示したい枠の比率、切り抜きの責任が混ざりやすい。

自然な比率でそのまま見せたい画像は、基本形のままにする。

```css
img {
  max-width: 100%;
  height: auto;
  display: block;
}
```

整理すると、次の2択で考える。

- 画像の本来比率を守りたい: `img { max-width: 100%; height: auto; }`
- 高さをそろえた枠に入れたい: 親に `aspect-ratio`、子に `object-fit`

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

### `object-position` の表現と責務

- 意図を共有する時は `left center` のような語彙指定が読みやすい。
- 微調整が必要な時は `0% 50%` のような数値指定を使う。
- `object-position` は「見える範囲」を決める指定で、画像実体を動かす指定ではない。
- 画像実体の移動（`transform: translateX(...)`）はレイアウト副作用が出やすいため、切り取り位置調整の第一選択にはしない。

## `aspect-ratio` が決めるもの / 決めないもの

- `aspect-ratio` は「比率」を決める指定で、最大サイズを止める指定ではない。
- 実寸は `width` / `max-width` / グリッド列幅 / flex幅で決まる。
- 先に幅が大きく決まれば、`aspect-ratio` はその幅に応じて高さも大きく計算する。

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

- 2倍書き出し画像は、設計時に「表示寸法」を基準に考える。
- 例: 元画像 `1140x832` を2倍書き出しとして使う場合、表示寸法は `570x416` として扱う。
- `width` / `height` 属性は、表示時に使う想定寸法（または同じ比率寸法）で書けばよい。
- SP/PCで表示比率が変わる場合は、HTML属性で両立しようとせず、CSSの `aspect-ratio` をSP/PCで切り替える。

## 予約の速さ（実務判断）

| 方法 | 比率予約のタイミング | 目安 |
|---|---|---|
| HTML `width` / `height` | HTML解析時 | 最速 |
| CSS `aspect-ratio` | CSS適用時 | ほぼ同等 |
| 何も指定しない | 画像ロード後 | 遅い（Shift発生しやすい） |

実務では `width`/`height` と `aspect-ratio` の併用が安定しやすい。

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
4. 背景装飾の問題なら 03 側で切り分ける
