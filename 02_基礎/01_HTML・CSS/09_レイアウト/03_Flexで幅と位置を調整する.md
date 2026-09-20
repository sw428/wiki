# 03_Flexで幅と位置を調整する

Flexは、親が作る主軸に沿って直下の子を並べる。横並びだけでなく、固定側と可変側を分ける、カード内の末尾を下へ送る、といった一方向の配分に使える。

## 主軸と交差軸を先に決める

- `flex-direction: row`: 主軸は横、交差軸は縦
- `flex-direction: column`: 主軸は縦、交差軸は横
- `justify-content`: 主軸方向の余った空間を配る
- `align-items`: 交差軸方向で各アイテムを揃える

Flexbox仕様では `align-items` の初期値は `stretch`。交差軸方向のサイズが `auto` で、min/maxサイズなどに制限されなければ、アイテムは交差軸方向へ伸びる。

`display: flex` に変えただけで高さが揃った場合は、画像比率を直したのではなくstretchの結果かもしれない。画像の比率やトリミングは[比率の枠へ画像を収める](../12_レスポンシブ画像設計/03_同一比率フレーム型.md)で別に確認する。

## 固定サイドと可変メインを作る

```css
.page-layout {
  display: flex;
  gap: var(--layout-gap);
  align-items: flex-start;
}

.page-layout__main {
  flex: 1;
  min-width: 0;
}

.page-layout__side {
  width: var(--sidebar-width);
  flex-shrink: 0;
}
```

- 親: 横並びと要素間の距離を決める
- 固定側: 幅を持ち、必要なら `flex-shrink: 0` で縮めない
- 可変側: `flex: 1` で残りを受け、`min-width: 0` で内容由来の自動最小サイズを解除できるようにする

両方を固定しすぎると、親幅が足りないときに横へあふれる。`min-width: 0` は長文の折り返し方を決める指定ではないため、必要なら `overflow-wrap` やoverflowの見せ方も別に決める。

## 縦Flexで最後の要素を下へ送る

カード本文の中で、メタ情報だけを下へ押し下げる例。

```css
.card__content {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.card__meta {
  margin-top: auto;
  text-align: right;
}
```

- `margin-top: auto`: 主軸の余った空間を上側marginで受け、要素を末尾へ送る
- `text-align: right`: 要素内のインライン内容を右寄せする
- `align-self: flex-end`: Flexアイテムの箱自体を交差軸の末尾へ寄せる

「テキストを寄せる」「アイテムの箱を寄せる」「複数の子を並べる」を同じ操作として扱わない。

## flex-basisとpaddingを同時に使うとき

`flex: 1 1 391px` の `391px` はFlexの基準寸法になる。ただし、最終的な外側寸法と空き領域の計算にはpadding・border・margin、`box-sizing`、自動最小サイズ、grow/shrinkも関わる。

そのため「`flex-basis` に左右paddingが常に単純加算される」とは決めつけず、次を確認する。

1. `box-sizing` が `content-box` か `border-box` か。
2. `flex-basis` と `width` のどちらが基準になっているか。
3. DevToolsでcontent・padding・borderを含む実寸がいくつか。
4. 兄弟アイテムを含めた外側寸法の合計が親幅へ収まるか。
5. `min-width: auto` による自動最小サイズで縮みが止まっていないか。

左右のpaddingは別プロパティなので、`padding-left` と `padding-right` がカスケード上で互いに上書きするわけではない。片側を増やして反対側の内容領域が狭く見えたら、まず横幅予算を確認する。

## 入れ子のFlexはそれぞれ別に確認する

外側のFlexが配置するのは直下の子までである。子の中のリンクやアイコンを並べるには、その子にも必要なレイアウトを指定する。具体例は[親子のレイアウト文脈](./02_親子のレイアウト文脈を区別する.md#外側の役割と内側の役割を見る)で確認する。

## 仕様確認先

- [CSS Flexible Box Layout Module Level 1: Flexibility](https://www.w3.org/TR/css-flexbox-1/#flexibility)
- [CSS Flexible Box Layout Module Level 1: Alignment](https://www.w3.org/TR/css-flexbox-1/#alignment)
- [CSS Flexible Box Layout Module Level 1: Automatic Minimum Size](https://www.w3.org/TR/css-flexbox-1/#min-size-auto)
