# 09_CTAとナビリンクの操作範囲を作る

CTAやナビゲーションでは、周囲の余白ではなく、`a`や`button`自身へ操作できる面積を持たせる。

## CTA

```css
.cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding-inline: 24px;
  gap: 8px;
}
```

## ナビリンク

```css
.nav {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding-inline: 32px;
}
```

- 操作範囲: リンク・ボタン自身
- 内部整列: Flex
- 文字とアイコンの間隔: `gap`
- 区切り線や外側余白: 別の箱

文字が変わる場合は、固定`width`より`padding`と`min-height`を先に使う。すべての横幅をそろえる必要があるときだけ`width`や`min-width`を追加する。

`48px`は例の設計値であり、WCAGの一律の合格値ではない。WCAG 2.2のTarget Size (Minimum)は原則24×24 CSS pxを基準とし、間隔などの例外も含む。対象サイズだけでなく、隣接する操作対象との距離や案件の要件を確認する。リンクかボタンかの意味は[リンクとボタンを使い分ける](../04_HTMLの意味と構造/10_リンクとボタンを使い分ける.md)で確認する。

## 仕様・基準

- [WCAG 2.2 - Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum)
