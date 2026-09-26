# 15_gap・margin・paddingを使い分ける

見た目の間隔を作るときは、同じ一覧の反復間隔・別ブロックまでの距離・枠と中身の距離を分ける。

## 反復要素と別ブロックの余白を分ける

```css
.article-list {
  display: grid;
  gap: 16px;
}

.section {
  margin-block-end: 48px;
}
```

- 同じ一覧内の反復間隔: 親の `gap`
- 次の別ブロックまでの距離: ブロック間のmargin
- 枠線や背景と中身の距離: 親のpadding

親で一覧を束ねられない既存HTMLでは、隣接兄弟へmarginを付ける方法もある。

```css
.article + .article {
  margin-block-start: 16px;
}
```

各項目へ一律の `margin-bottom` を付けると、最後にも余白が残る。`gap` と外側marginを同じ目的で重ねない。
