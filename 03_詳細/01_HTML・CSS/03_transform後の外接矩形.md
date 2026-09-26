# 03_transform後の外接矩形

主な基礎：[DevToolsで表示変化を調べる](../../02_基礎/01_HTML・CSS/07_ブラウザ挙動と表示のズレ/90_移行元/04_DevToolsで表示変化を調べる.md#測定対象を決めてから値を取る)。回転前のCSSボックスと、回転後に画面上で占める軸平行の外接矩形が違う理由を確認する。

## 回転前の箱と回転後の測定値は別

`transform: rotate(...)`は、通常のLayoutで位置と寸法が決まった後の描画へ作用する。回転して見えても、`width`と `height`で作った元のCSSボックス自体が、回転後の横幅と縦幅へ書き換わるわけではない。

```css
.diagonal-line {
  width: 8.6px;
  height: 1px;
  transform: rotate(35.54deg);
}
```

| 値 | 意味 |
| --- | --- |
| `8.6 × 1px` | 回転前のCSSボックス |
| `8.6px` | 回転後も変わらない長辺の長さ |
| 約 `7.58 × 5.81px` | 回転後の図形を水平・垂直の矩形で囲んだ外接範囲 |

## 外接矩形を計算する

幅 `w`、高さ `h`の長方形を第1象限の角度 `θ`で回した場合、軸平行の外接矩形は次の式で確認できる。

```text
外接幅 = w × cos(θ) + h × sin(θ)
外接高 = w × sin(θ) + h × cos(θ)
```

細長い要素でも `height: 1px`の厚みがある。そのため、中心軸だけから求めた横方向・縦方向の差より、外接矩形は少し大きくなる。

角度がほかの象限にある場合は、各成分の絶対値を使って外接幅と外接高を求める。

## どの値を確認するか

- DevToolsのBox Model：回転前の `width`と `height`。
- Computedの `matrix(...)`：`rotate()`などを行列へ解決した値。
- `getBoundingClientRect()`：transformを反映した軸平行の外接矩形。
- `transform-origin`：回転の支点と位置。同じ長方形を同じ角度で回す場合、外接矩形の幅と高さは変えない。

デザインツール側でも、線の始点・終点、strokeを含む選択枠、レイヤーの `W`と `H`を同じ値だと決めつけない。座標差が `7 × 5`の線なら中心軸の長さは `sqrt(7² + 5²) ≒ 8.6`だが、その `7 × 5`が何を表すかはレイヤー種別と測定表示で確認する。

## 仕様確認先

- [CSS Transforms Module Level 1 - Transform Rendering Model](https://drafts.csswg.org/css-transforms-1/#transform-rendering)
- [CSSOM View Module - `getBoundingClientRect()`](https://drafts.csswg.org/cssom-view/#dom-element-getboundingclientrect)
