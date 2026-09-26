# DOM上の親と包含ブロックを区別する

通常の入れ子ではDOM上の親と包含ブロックが一致することが多いが、同じ概念ではない。

絶対配置では、直近の親要素が割合計算の基準にならないことがある。

## 数値を変えて違いを確認する

```html
<div class="ancestor">
  <div class="parent">
    <div class="child"></div>
  </div>
</div>
```

```css
.ancestor {
  position: relative;
  width: 800px;
}

.parent {
  width: 300px;
}

.child {
  position: absolute;
  width: 50%;
}
```

この例で `.child` のDOM上の親は `.parent` で、その幅は300pxである。

一方、絶対配置の基準を作っている祖先は `.ancestor` で、その幅は800pxである。

そのため、`.child` の幅は300pxの50%ではなく、800pxの50%で400pxになる。

```text
DOM上の親
parent = 300px

包含ブロック
ancestor = 800px

child
800px × 50% = 400px
```

最初は、`position: relative` を持つ祖先が絶対配置の基準になる例で違いを確認すればよい。

厳密には `transform` や `contain` などが包含ブロックを作る場合もあるため、すべてを「最も近い `position: relative` の祖先」とは決めない。

絶対配置で四辺の位置から幅・高さが決まる条件は[03のinset詳細](../../../03_詳細/01_HTML・CSS/04_insetで広がる条件を調べる.md)で確認できる。

## 仕様確認先

- [CSS Positioned Layout Module Level 3 - Containing Blocks of Positioned Boxes](https://drafts.csswg.org/css-position-3/#def-cb)
