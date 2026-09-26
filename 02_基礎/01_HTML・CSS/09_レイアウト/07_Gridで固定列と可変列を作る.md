# 07_Gridで固定列と可変列を作る

Gridの列幅は、部品幅を固定するのか、利用可能な幅を配るのかで指定を分ける。`repeat()`や`fr`という名前だけで選ばず、親幅が変わったときの結果を先に決める。

## 列を明示する

`display: grid`だけでもGridコンテナになる。既定の自動配置で一列に見えている状態から複数列へ変えるなら、親へ列を明示する。

```css
.list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
}
```

`gap`はトラック間の溝であり、コンテナ外周の余白にはならない。

## 固定列と可変列を比べる

```css
/* 160pxの列を二つ作る */
.links {
  display: grid;
  grid-template-columns: repeat(2, 160px);
  justify-content: center;
}

/* 利用可能な幅を二列へ配る */
.list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
```

| 意図 | 列指定 | 親幅が変わったとき |
| --- | --- | --- |
| 部品幅を固定する | `repeat(2, 160px)` | 列幅は変わらない |
| 利用可能幅を均等配分する | `repeat(2, minmax(0, 1fr))` | 各列が配分し直される |

`repeat()`は同じトラック定義を繰り返す関数であり、それ自体が列を可変にするわけではない。

## 左右で違う役割を持つ列

```css
.layout {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  gap: 24px;
}
```

一覧全体の列幅は親へ置き、部品自身が持つべき寸法は子へ置く。子へ幅を書くこと自体が誤りなのではなく、「一覧の規則か、部品の規則か」で責任を分ける。

固定列の合計と`gap`が親幅へ収まらなければ、列は目的どおりには収まらない。列幅を可変にするか、[配置が成立する幅でレイアウトを切り替える](./11_配置が成立する幅でブレークポイントを決める.md)。

## このページのまとめ

- Gridの列は親の`grid-template-columns`で作る。
- 固定値は寸法を保ち、`fr`は利用可能幅を配る。
- `repeat()`は繰り返しであり、固定・可変を決める機能ではない。

## 仕様確認先

- [CSS Grid Layout Module Level 2: Track Sizing](https://www.w3.org/TR/css-grid-2/#track-sizing)
- [CSS Grid Layout Module Level 2: Flexible Lengths](https://www.w3.org/TR/css-grid-2/#fr-unit)
