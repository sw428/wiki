# 13_marginの相殺が起きる場所を確認する

通常フローのblock間では、接している縦marginが単純な足し算にならず、相殺する場合がある。対処方法を先に暗記せず、どのmargin同士が接しているかを確認する。

## 相殺が起きる主な場所

1. 隣接する兄弟の下marginと上margin
2. 親の上端・下端と、最初・最後の子のmargin
3. border、padding、inline内容、高さなどを持たない空のblock自身の上下margin

たとえば隣接する兄弟に次のmarginがある場合、要素間が単純に56pxになるとは限らない。

```css
.first {
  margin-block-end: 24px;
}

.second {
  margin-block-start: 32px;
}
```

相殺する条件では、大きい方の32pxが要素間のmarginとして使われる。

## 発生場所に合う方法を選ぶ

| 発生場所 | 検討する方法 |
| --- | --- |
| 同じ一覧の兄弟間 | 余白を片側へ集める、親の`gap`を使う |
| 親と最初・最後の子 | 親のpaddingやborderで境界を作る、`flow-root`を検討する |
| 空のblock | その空要素が必要か、寸法や内容を持つべきか確認する |

Flex/Gridアイテム同士のmarginは相殺しない。通常フローからFlex/Gridへ変えたときに距離が変わった場合は、相殺の有無も比較する。

`overflow`によって新しいblock formatting contextを作る方法もあるが、内容の切り取りやscroll container化など別の作用を持つ。margin相殺だけを止める目的なら、構造に合う`display: flow-root`やpadding、`gap`を先に検討する。

## DevToolsで確認する

1. 距離の上下にある二つの要素を選ぶ。
2. ComputedまたはBox Modelで、それぞれの縦marginを見る。
3. 親のborder、padding、`display`を確認する。
4. marginを片方ずつ無効にし、どの二つが接しているか調べる。
5. 余白の責任を親・前の要素・後ろの要素のどこへ置くか決める。

通常フローとFlex/Gridの違いは[通常フローを基準にする](./02_通常フローを基準にする.md)、余白の役割は[gapとmarginとpaddingを使い分ける](./12_gapとmarginとpaddingを使い分ける.md)で確認する。

## 一言でいうと

縦marginが予想と違うときは、指定値ではなく、接しているmarginと親のレイアウトを確認する。

## 仕様確認先

- [CSS 2.2: Collapsing Margins](https://www.w3.org/TR/CSS22/box.html#collapsing-margins)
- [CSS Display Module Level 3](https://www.w3.org/TR/css-display-3/)
