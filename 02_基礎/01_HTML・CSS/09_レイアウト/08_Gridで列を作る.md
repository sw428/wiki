# 08_Gridで列を作る

Gridで複数列を作るときは、まず列を明示し、その列を固定するのか利用可能幅へ配るのかを分ける。

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

固定列の合計と `gap` が画面へ収まらなければ、自動では目的の形に縮まらない。必要なら列幅を可変にするか、[成立幅でレイアウトを切り替える](./13_ブレークポイントを配置の成立幅で決める.md#ブレークポイントは配置が成立する境界で決める)。
