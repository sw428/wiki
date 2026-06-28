# 置換要素（img・input・video）

## 目的

- 「inline なのに `width/height` が効く例外」を、置換要素として整理する。

## ルール

- `img` / `input` / `video` は代表的な置換要素。
- 置換要素は外部コンテンツや内部仕様により表示内容が決まるため、通常のテキスト要素と挙動が異なる。
- `inline` 文脈にいても、サイズ指定が効く場面がある。

## 例

```css
img.thumb {
  width: 240px;
  height: 160px;
  object-fit: cover;
}
```

- `img` は置換要素なので、`width/height` の指定を持ちやすい。
- ただし外側が inline 文脈なら baseline 由来の隙間は別途起こりうる。

## 判断基準

1. 対象は置換要素か
2. サイズ問題と行内整列問題を分離できているか
3. `object-fit` / `object-position` は中身調整として使っているか

## 関連ページ

- [ボックスとdisplay](../01_基礎概念/HTML・CSS/04_ボックスとdisplay.md)
- [画像と背景](../01_基礎概念/HTML・CSS/06_画像と背景.md)
- [メディア設計（img・video・object-fit・aspect-ratio）](../01_基礎概念/HTML・CSS/10_メディア設計（img・video・object-fit・aspect-ratio）.md)
