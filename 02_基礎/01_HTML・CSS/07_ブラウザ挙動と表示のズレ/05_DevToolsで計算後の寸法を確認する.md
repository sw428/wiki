# 05_DevToolsで計算後の寸法を確認する

表示が予想と違うときは、原因候補を一度に変えず、対象要素と確認する値を一つずつ絞る。このページでは、Computed・Box Model・座標からブラウザ側の寸法を確認する。

CSS宣言の採用・不採用を調べる基本操作は[06のDevTools入口](../06_CSSカスケードとDevToolsの見方/01_DevToolsで適用されたCSSを確認する.md)を使う。

## Computedで結果の値を見る

Computedは、対象要素で最終的に使われる値を調べる場所である。薄い表示の `height: 439px`などは、CSSへ直接書いた値ではなく、Layoutの結果として表示されている場合がある。

1. Elementsで対象要素を選ぶ。
2. Computedで確認したいプロパティ名を検索する。
3. Stylesの宣言と、Computedに出た結果を区別する。

幅・高さ・余白は[05のボックスモデル図](../05_ボックスとdisplay/03_ボックスモデルの4領域.md#devtoolsで4領域を対応させる)でも確認できる。

## Flexの空きを座標差から確認する

Flexの `space-between`は、Gridと同じ形で空きの寸法を表示できるとは限らない。必要ならConsoleで `getBoundingClientRect()`を使い、隣接する要素の座標差から確認する。

## 測定対象を決めてから値を取る

DevToolsのBox Modelはtransform前のCSSボックス、`getBoundingClientRect()`はtransformを反映した軸平行の外接矩形を確認するときに使う。回転した図形では同じ値にならない。必要になったら[transform後の外接矩形](../../../03_詳細/01_HTML・CSS/03_transform後の外接矩形.md)で条件と計算例を確認する。

Gridのトラックや `gap`を調べる場合は、[Gridのトラックとgapを確認する](./06_Gridのトラックとgapを確認する.md)へ進む。

## 公式情報

- [Chrome DevTools - CSS features reference](https://developer.chrome.com/docs/devtools/css/reference/)
