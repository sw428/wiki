# 07_srcsetとsizesで画像候補を選ぶ

同じ画像内容・構図のまま、画面密度やレイアウト上の表示幅に合うファイルをブラウザへ選ばせる方法を扱う。

```text
画像切替型
→ 画像内容・構図を変える

srcset / sizes
→ 画像内容は同じまま、適した画像ファイルを選ばせる
```

画像内容や構図を変える場合は、先に[画像切替型](./06_画像切替型.md)を確認する。

```text
CSSレイアウトが決める → 画面上の表示幅
srcsetが伝える        → 選択できる画像候補
sizesが伝える         → 候補選択に使う想定表示幅
ブラウザが決める      → 実際に使用する画像
```

`sizes`は、幅記述子の`srcset`と組み合わせる場合に使う。

## この方法を選ぶ条件

次の条件に合う場合は、`srcset`や`sizes`で画像候補を選ばせる。

- どの候補も同じ画像内容・構図を表している
- 画面密度に合う解像度のファイルを選ばせたい
- レイアウト上の表示幅に合うファイルを選ばせたい

## 同じ表示領域へ密度の違う画像を渡す

同じ構図・同じ表示領域に対して高密度画像を選ばせるなら、密度記述子を使える。

```html
<img
  class="photo"
  src="./img/photo.jpg"
  srcset="./img/photo.jpg 1x, ./img/photo@2x.jpg 2x"
  alt="湖のそばに広がる山並み"
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

`1x`と`2x`は候補の画素密度を表す。画像を画面上で何pxに表示するかはCSSレイアウトが決める。

## 表示幅に応じて候補を選ぶ

表示幅自体がレイアウトによって大きく変わる場合は、幅記述子と`sizes`を使う方法がある。

次の例では、768px未満で画像を画面幅いっぱい、768px以上で画面幅の半分に表示するレイアウトを想定する。

```html
<img
  src="./img/card-800.jpg"
  srcset="./img/card-400.jpg 400w, ./img/card-800.jpg 800w"
  sizes="(min-width: 768px) 50vw, 100vw"
  alt="商品を並べたカード"
  width="800"
  height="450"
>
```

- `400w` / `800w`: 各画像候補の自然幅。画面上で400px・800px表示するという意味ではない
- `sizes`: CSSレイアウトから想定される表示幅をブラウザへ伝える

幅記述子の数値は、各候補画像の実際の自然幅と一致させる。`sizes`は画像のCSSを置き換える指定ではないため、実際の表示幅を決めるCSSレイアウトと内容を合わせる。

一つの`srcset`内で、`1x`・`2x`などの密度記述子と、`400w`・`800w`などの幅記述子は混在させない。

## 選ばれた画像を確認する

DevToolsやConsoleで次を分けて見る。

- `currentSrc`: 実際に選択された画像URL
- Computedの`width` / `height`: 画面上の`img`要素の使用寸法

たとえば、`card-800.jpg`が選ばれたことと、画像が800px幅で表示されたことは同じではない。

## 選び方

- PC/SPで画像内容や構図を変える: [画像切替型](./06_画像切替型.md)の`picture`と`source`
- 同じ表示領域へ1倍・2倍画像を渡す: 密度記述子の`srcset`
- レイアウト上の表示幅に応じて候補を選ぶ: 幅記述子の`srcset`と`sizes`
- 枠の比率や高さを決める: [表示領域の4種類](./01_レスポンシブ画像設計の選び方.md#表示領域を4種類から選ぶ)
- 枠内で全体を見せるか切り抜くか決める: `object-fit`と`object-position`

## 確認すること

1. すべての候補が同じ画像内容・構図になっているか確認する。
2. 画面密度を基準にするなら密度記述子、表示幅を基準にするなら幅記述子と`sizes`を使っているか確認する。
3. 幅記述子が各画像候補の自然幅と一致し、`sizes`がCSSレイアウトの表示幅と対応しているか確認する。
4. `currentSrc`で選択された画像、Computedで実際の表示寸法を分けて確認する。

## 仕様確認先

- [HTML Standard: Responsive images](https://html.spec.whatwg.org/multipage/images.html#responsive-images)
- [HTML Standard: The srcset attribute](https://html.spec.whatwg.org/multipage/images.html#srcset-attribute)
