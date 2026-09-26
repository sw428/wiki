# widthのautoと100パーセントを比べる

単純な通常フローのblockでは、`width: auto` と `width: 100%` が同じ幅に見えることがある。

ただし、幅の決まり方は異なる。

## 同じ箱で一条件だけ変えて比べる

- `width: auto`：その箱のレイアウト規則と利用可能な空間から使用幅が決まる
- `width: 100%`：その要素自身の `width` を、包含ブロックの幅に対する100%として計算する

```css
.parent {
  width: 320px;
}

.auto,
.full {
  padding: 16px;
}

.auto {
  width: auto;
}

.full {
  width: 100%;
}
```

どちらも通常フローのblockで、`box-sizing` は初期値の `content-box` とする。

- `.auto` は、左右の `padding` を含めて利用可能な320pxに収まるように、内容領域が288pxになる
- `.full` は、内容領域が包含ブロックの100%である320pxになり、左右の `padding` を加えた外側は352pxになる

見た目が近くても、`auto` は利用可能な空間から幅を決め、`100%` は指定した領域を包含ブロックと同じ幅にする。`padding` や `border` があると差が見えやすい。

`.full` に `box-sizing: border-box` を指定した場合は、320pxの中に `padding` も含まれるため、外側も320pxに収まる。

この計算範囲は[box-sizingでwidthの範囲を決める](./04_box-sizingでwidthの範囲を決める.md)で確認する。

## min-widthとmax-widthも確認する

`width`だけで最終的な使用幅が決まるとは限らない。

`min-width` や `max-width` によって、使用幅が制限されることがある。

`width`が適用されるか、`auto`がどのような幅になるかは、生成される箱やレイアウトの種類によって変わる。

blockとinlineの違いは[blockとinlineの広がり方](./05_blockとinlineの広がり方.md)で確認する。

## 仕様確認先

- [CSS 2.2 - Content width and width calculation](https://www.w3.org/TR/CSS22/visudet.html#the-width-property)
