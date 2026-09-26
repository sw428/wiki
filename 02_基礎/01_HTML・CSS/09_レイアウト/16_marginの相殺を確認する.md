# 16_marginの相殺を確認する

通常フローの縦marginが想定どおり足されないときは、どのmargin同士が接して相殺しているかを見る。

## marginの相殺は発生箇所を見る

通常フローのblock間では、次の縦marginが相殺することがある。

1. 隣接する兄弟の下marginと上margin
2. 親の上端・下端と、最初・最後の子のmargin
3. border、padding、inline内容、高さなどを持たない空のblock自身の上下margin

止め方は発生箇所で違う。

- 親子の相殺: 親のborderやpaddingで隣接を分ける、または親に `display: flow-root` を使う
- Flex/Grid内: Flex/Gridアイテムのmarginは互いに相殺しない
- `overflow` で新しいblock formatting contextを作る方法: clippingやscroll container化など別の副作用も確認する
- 隣接兄弟: borderやpaddingを別要素へ足すだけでなく、余白を片側へ集める、親をFlex/Gridにして `gap` を使うなど、構造に合う方法を選ぶ

「margin相殺を止める指定一覧」から選ぶのではなく、どの二つのmarginが接しているかをDevToolsで確認する。
