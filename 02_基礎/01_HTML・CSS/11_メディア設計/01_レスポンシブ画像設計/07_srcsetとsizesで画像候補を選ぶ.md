# 07_srcsetとsizesで画像候補を選ぶ

同じ構図の画像について、画面密度やレイアウト上の表示幅に合うファイルをブラウザへ選ばせる方法を扱う。SPとPCで構図そのものを変える場合は、先に[画像切替型](./06_画像切替型.md)を確認する。

## 同じ表示領域へ密度の違う画像を渡す

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

## 表示幅に応じて候補を選ぶ

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

- [HTML Standard: Responsive images](https://html.spec.whatwg.org/multipage/images.html#responsive-images)
- [HTML Standard: The srcset attribute](https://html.spec.whatwg.org/multipage/images.html#srcset-attribute)
