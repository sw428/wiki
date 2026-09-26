# 05_subgridで親のトラックを共有する

主な基礎：[Gridで特定の子を列へ配置する](../../02_基礎/01_HTML・CSS/09_レイアウト/09_Gridで特定の子を列へ配置する.md)。通常の入れ子Gridでは独立する親子のトラックを、選んだ軸で共有する場合を扱う。

## 通常の入れ子Gridは独立する

親をGridにし、その子もGridにしただけでは、子の列線や行線が親と自動的にそろうわけではない。親と子はそれぞれ別のトラックを持つ。

複数のカードで見出し、本文、ボタンの行位置をそろえたい場合など、入れ子をまたいだ整列が必要になることがある。

## subgridで親のトラックを使う

```css
.list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-template-rows: auto 1fr auto;
  gap: 24px;
}

.card {
  display: grid;
  grid-row: span 3;
  grid-template-rows: subgrid;
}
```

この例では、`.card`が親Gridの3行分を使い、行方向のトラックを`subgrid`として共有する。

## 使う前に確認すること

- 通常のGridやFlexだけでは、必要な位置をそろえられないか
- 親のどの軸を共有するのか
- 子が親側で必要なトラック数を占めているか
- 内容量を変えても、そろえることが読みやすさにつながるか

単純な一段の並びに`subgrid`は不要である。先に通常のトラック定義を作り、入れ子をまたぐ整列が必要になったときに使う。

## 一言でいうと

`subgrid`は、入れ子Gridのトラックを親のトラックへそろえる必要がある場合に使う。

## 仕様確認先

- [CSS Grid Layout Module Level 2: Subgrids](https://www.w3.org/TR/css-grid-2/#subgrids)
