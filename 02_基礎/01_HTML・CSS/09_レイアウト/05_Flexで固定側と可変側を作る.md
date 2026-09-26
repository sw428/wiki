# 05_Flexで固定側と可変側を作る

サイドバーのような固定側と、残り幅を受け取る可変側をFlexで分ける。

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
