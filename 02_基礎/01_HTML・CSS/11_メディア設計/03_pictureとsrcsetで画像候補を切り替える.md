# 03_pictureとsrcsetで画像候補を切り替える

PC/SPで構図が違う画像を使う場合と、同じ構図の高密度画像を用意する場合では、切り替える理由が違う。最初に「構図・比率を変えるのか」「同じ表示領域へ異なる画素密度を渡すのか」を分ける。

## pictureで構図を切り替える

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

| 要素 | 担当すること |
| --- | --- |
| `picture` | 複数の画像候補を選ぶ文脈を作る |
| `source` | メディア条件、候補、候補の寸法情報を渡す |
| `img` | 選ばれた画像を実際に表示する。alt・class・CSSの対象になる |

`source`自身が画面上の箱になるわけではない。選択結果は`img`へ渡され、画面上の表示幅は`img`へ適用されたCSSと外側のレイアウトで決まる。

`source`の`width` / `height`が使える場合、選ばれた候補の寸法と比率をブラウザへ伝えられる。これらは「1920 × 500pxで固定表示する」という指定ではない。

## 画像候補と表示枠を分ける

`picture`でPC画像が選ばれても、CSSが親幅まで広げるとは限らない。`max-width: 100%`は上限であり、小さい画像を親幅へ拡大する指定ではない。親幅いっぱいに表示するなら`width: 100%`を使う。

PC/SPそれぞれの自然比率で見せる場合は、選択される画像ごとの寸法属性と`height: auto`を使う。デザイン上の比率を固定して切り抜く場合は、候補選択とは別にCSSで枠を作る。

```css
.mv__media {
  aspect-ratio: 375 / 400;
  overflow: hidden;
}

.mv__image {
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

ここで`375 / 400`は固定ピクセル寸法ではない。枠の幅が300pxなら高さは320pxになる。

## srcsetで表示密度を切り替える

同じ構図・同じ表示領域に対して高密度画像を選ばせるなら、密度記述子を使える。

```html
<img
  class="photo"
  src="./img/photo.jpg"
  srcset="./img/photo.jpg 1x, ./img/photo@2x.jpg 2x"
  alt=""
  width="800"
  height="450"
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

- `1x` / `2x`: 同じ表示領域に対する画素密度の候補
- HTMLの`800 × 450`: 寸法属性と比率予約
- CSSの`width` / `max-width`: 画面上の表示幅
- ファイル名の`@2x`: 人間向けの名前。これだけではブラウザの選択条件にならない

画像ファイルが1600 × 900pxでも、表示基準が800 × 450pxなら比率はどちらも16:9である。`aspect-ratio: 800 / 450`と書いても表示が半分になるわけではない。

表示幅自体がレイアウトによって大きく変わる場合は、幅記述子と`sizes`を使う方法がある。

```html
<img
  src="./img/card-800.jpg"
  srcset="./img/card-400.jpg 400w, ./img/card-800.jpg 800w"
  sizes="(min-width: 768px) 50vw, 100vw"
  alt=""
  width="800"
  height="450"
>
```

`sizes`は画像のCSSを置き換える指定ではない。ブラウザが候補を選ぶための想定表示幅を伝え、実際の表示寸法は引き続きCSSレイアウトで決まる。

## 選ばれた画像を確認する

DevToolsやConsoleで次を分けて見る。

- `currentSrc`: 実際に選択された画像URL
- `naturalWidth` / `naturalHeight`: ブラウザが扱う自然寸法。密度補正により、必ずしもファイルの生のピクセル数と同じではない
- Computedの`width` / `height`: 画面上の`img`要素の使用寸法

「PC画像が選ばれた」と「PC向けの表示幅になった」は別の確認である。

## 選び方

- PC/SPで構図や比率を変える: `picture`と`source`
- 同じ表示領域へ1倍・2倍画像を渡す: 密度記述子の`srcset`
- レイアウト上の表示幅に応じて候補を選ぶ: 幅記述子の`srcset`と`sizes`
- 枠の比率や切り抜き方を変える: CSSの`aspect-ratio`、`object-fit`

## 仕様確認先

- [HTML Standard: The picture element](https://html.spec.whatwg.org/multipage/embedded-content.html#the-picture-element)
- [HTML Standard: Responsive images](https://html.spec.whatwg.org/multipage/images.html#responsive-images)
- [HTML Standard: The srcset attribute](https://html.spec.whatwg.org/multipage/images.html#srcset-attribute)

