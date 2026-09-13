# 04_Gridの列幅と縮み方を調整する

Gridは、親で行と列のトラックを定義し、直下の子をその領域へ配置する。列を固定するのか、利用可能な幅を配るのかを先に分ける。

## 列を明示しないGridと、列を作るGrid

`display: grid` だけでもGridコンテナになり、子はGridアイテムになる。列を明示せず既定の `grid-auto-flow: row` で自動配置すると、一般的な横書きでは子が暗黙の行へ順に置かれ、一列に見える。

複数列にする意図があるなら、親へ列を明示する。

```css
.card-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
}
```

`gap` はトラック間の溝であり、コンテナ外周の余白にはならない。外周と中身の距離はpadding、別ブロックとの距離はmarginとして分ける。

## 固定トラックと可変トラックを分ける

`repeat()` は同じトラック定義を繰り返す関数であり、それ自体が列を可変にするわけではない。

```css
/* 156pxの列を二つ作る */
.link-list {
  display: grid;
  grid-template-columns: repeat(2, 156px);
  justify-content: center;
}

/* 利用可能な幅を二列へ配る */
.card-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
```

| 意図 | 列指定 | 親幅が変わったとき |
| --- | --- | --- |
| 部品幅を固定する | `repeat(2, 156px)` | 列幅は変わらない |
| 利用可能幅を均等配分する | `repeat(2, minmax(0, 1fr))` | 各列が配分し直される |

固定列の合計と `gap` が画面へ収まらなければ、自動では目的の形に縮まらない。必要なら列幅を可変にするか、[成立幅でレイアウトを切り替える](./05_コンテナ幅とブレークポイントを決める.md#ブレークポイントは配置が成立する境界で決める)。

## 1frは残り全部という固定値ではない

`fr` はGridコンテナの余った空間を表す比率である。ただし、トラックの最小値やGridアイテムの内容由来の最小要求を計算した後に配られるため、`1fr` と書くだけでは長い内容が必ず縮むとは限らない。

```css
.layout {
  display: grid;
  grid-template-columns: 470px minmax(0, 1fr);
}

.layout__main {
  min-width: 0;
}
```

| 指定 | 変更する対象 | 役割 |
| --- | --- | --- |
| `min-width: 0` | Gridアイテム | 要素側の自動最小幅を0まで許可する |
| `minmax(0, 1fr)` | Gridトラック | トラックの最小値を `auto` ではなく0にする |

どちらも「中身の折り返しや省略を完成させる指定」ではない。長い単語、画像、`white-space`、overflowの扱いは別に確認する。

## 左右で役割が違う列

同じ幅を繰り返さず、役割をそのまま列定義へ書く。

```css
.layout {
  display: grid;
  grid-template-columns: 329px minmax(0, 1fr);
}
```

一覧全体の列幅は親へ置き、部品自身が持つべき寸法は子へ置く。子へ幅を書くこと自体が誤りなのではなく、「一覧の規則か、部品の規則か」で責任を分ける。

## 特定の子を列へ配置する

親が作ったトラックのどこを使うかは、子の配置指定で変えられる。

```css
.layout {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
}

.layout__title {
  grid-column: 2;
}
```

`grid-column: 2` は「見た目の順番を自由に変える指定」ではなく、そのアイテムを2列目へ配置する指定である。視覚順とHTMLの読み順が食い違う使い方は避け、HTMLの意味とキーボード・読み上げ順も確認する。

## subgridが必要になる場面

通常の入れ子Gridでは、親と子のトラック定義は独立する。`subgrid` を使うと、選んだ軸で親Gridのトラックを子Gridが共有できる。

- 複数カードの見出し・本文・ボタンの行位置を、入れ子をまたいでそろえたい
- 子の列線を親の列線へ合わせたい

単純な一段の並びでは通常のGridやFlexで足りる。先に通常のトラック定義を作り、入れ子をまたぐ整列が必要になったときに検討する。

## 仕様確認先

- [CSS Grid Layout Module Level 2: Flexible Lengths](https://www.w3.org/TR/css-grid-2/#fr-unit)
- [CSS Grid Layout Module Level 2: Automatic Minimum Size](https://www.w3.org/TR/css-grid-2/#min-size-auto)
- [CSS Grid Layout Module Level 2: Subgrids](https://www.w3.org/TR/css-grid-2/#subgrids)
