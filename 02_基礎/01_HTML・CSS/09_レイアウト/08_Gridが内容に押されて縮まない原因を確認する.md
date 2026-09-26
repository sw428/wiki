# 08_Gridが内容に押されて縮まない原因を確認する

`1fr`は親幅へ必ず収まる固定値ではない。Gridトラックの最小値や、Gridアイテムの内容由来の最小サイズによって、列が期待した幅まで縮まない場合がある。

## まずトラックとアイテムを分ける

```css
.layout {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
}

.main {
  min-width: 0;
}
```

| 指定 | 変更する対象 | 役割 |
| --- | --- | --- |
| `minmax(0, 1fr)` | Gridトラック | トラックの最小値を`auto`ではなく0にする |
| `min-width: 0` | Gridアイテム | 要素側の自動最小幅を0まで許可する |

似た指定に見えても、変更する対象が違う。片方だけで解決しない場合は、DevToolsのGrid表示とBox Modelで両方を確認する。

## 内容側の縮まない条件を確認する

トラックとアイテムの最小幅を調整しても、中身の表示方法は別に決める。

- 長い単語：`overflow-wrap`などの折り返し条件
- 一行表示：`white-space: nowrap`と省略方法
- 固有幅を持つ画像：画像自身の`max-width`や表示枠
- 固定幅の子：その固定幅を維持する必要があるか
- overflow：はみ出しを表示、切り取り、スクロールのどれにするか

`minmax(0, 1fr)`と`min-width: 0`は、内容を自動的に折り返したり省略したりする指定ではない。

## 確認順

1. 親の利用可能幅、列定義、`gap`を確認する。
2. はみ出しているGridトラックをOverlayで確認する。
3. 対象アイテムの`min-width`と実寸を見る。
4. 長い文字、画像、固定幅、`white-space`のどれが最小幅を要求しているか調べる。
5. 内容を折り返すのか、縮めるのか、スクロールさせるのか決める。

一つの箱の実寸を追う場合は[箱の大きさが予想と違うときの確認順](../05_ボックスとdisplay/12_箱の大きさが予想と違うときの確認順.md)も使う。

## 一言でいうと

Gridが縮まないときは、トラックの最小値、アイテムの最小幅、中身の表示条件を別々に確認する。

## 仕様確認先

- [CSS Grid Layout Module Level 2: Automatic Minimum Size](https://www.w3.org/TR/css-grid-2/#min-size-auto)
- [CSS Grid Layout Module Level 2: Track Sizing Algorithm](https://www.w3.org/TR/css-grid-2/#algo-track-sizing)
