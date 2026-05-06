# 07_メディア設計（img・video・object-fit・aspect-ratio）

## 目的

- 画像/動画でレイアウトを崩さず、CLSを抑えてレスポンシブ対応する。

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
  width: 100%;
  height: auto;
  object-fit: cover;
}
```

- 属性: レイアウト予約（CLS抑制）
- CSS: 見た目の可変制御（レスポンシブ）

## まず2択で決める（認知負荷を下げる）

1. そのまま見せる（比率維持）  
   `height: auto` を使う。
2. 枠に入れて見せる（比率固定）  
   親に `aspect-ratio`、子に `height: 100% + object-fit` を使う。

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

## `object-fit` / `aspect-ratio`

- `object-fit: cover`: 枠を埋める（切り取りあり）
- `object-fit: contain`: 全体を収める（余白あり）
- `aspect-ratio`: 枠比率を先に固定してズレを減らす

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

1. 意味が必要なら `<img>` / `<video>`
2. 先に比率を予約できるか
3. トリミング許容か（`cover`）/ 余白許容か（`contain`）
4. これは「外」「箱」「中身」のどれを調整しているか
