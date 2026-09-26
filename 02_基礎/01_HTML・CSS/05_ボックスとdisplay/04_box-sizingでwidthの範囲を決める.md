# box-sizingでwidthの範囲を決める

`box-sizing` は、指定した `width` と `height` が箱のどこまでを含むかを決める。

## content-boxではcontentの大きさになる

次の指定を考える。

```css
.notice {
  width: 240px;
  padding: 16px;
}
```

初期値の `box-sizing: content-box` のままなら、240pxはcontentの幅になる。

左右のpaddingが加わるため、borderの外側までの幅は272pxになる。

```text
16px + 240px + 16px = 272px
```

## border-boxではpaddingとborderを含める

外側までを240pxに収めたい場合は、`box-sizing: border-box` を加える。

```css
.notice {
  box-sizing: border-box;
  width: 240px;
  padding: 16px;
}
```

`box-sizing` は、`width` と `height` が箱のどこまでを含むかを変える。

箱の並び方や外側・内側の振る舞いに関わる `display` とは役割が違う。

## 全要素へ指定する場合も役割は同じ

次の指定は、すべての要素と疑似要素で `width` と `height` の計算範囲をそろえるために使う。

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}
```

これは `margin` や `padding` を0にする指定ではない。

既定スタイルの余白をどこまで消すかは、[既定の余白をどこまで消すか決める](./13_既定の余白をどこまで消すか決める.md)で別に考える。

## 仕様確認先

- [CSS Box Model Module Level 3](https://drafts.csswg.org/css-box-3/)
- [CSS Box Sizing Module Level 4](https://drafts.csswg.org/css-sizing-4/)
