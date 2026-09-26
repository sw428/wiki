# 09_Gridで特定の子を列へ配置する

Gridの親が作ったトラックのどこへ子を置くかは、Gridアイテム側の配置指定で変えられる。

## 親が列を作り、子が使う位置を選ぶ

```html
<section class="layout">
  <h2 class="title">見出し</h2>
  <p class="text">本文</p>
</section>
```

```css
.layout {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  gap: 24px;
}

.title {
  grid-column: 2;
}
```

`grid-column: 2`は、`.title`を親Gridの2列目へ配置する指定である。子自身が新しい列を作るわけではない。

## 見た目の順番とHTMLの順番を分ける

Gridでは、子を別の行や列へ置き、HTMLとは異なる見た目の順序を作れる。しかし、CSSで見た目を変えても、DOM順、キーボード移動順、読み上げ順が同じように変わるとは限らない。

配置指定は次の目的に使う。

- 意味上の順番を保ったまま、親が作った列へ位置を割り当てる
- 見出し、本文、補足などの役割を決めた領域へ置く
- 画面幅が変わったときも、読み順を壊さない範囲で配置を変える

見た目だけのためにHTMLの意味や操作順が不自然になる場合は、先にHTML構造を見直す。要素を意味から選ぶ考え方は[意味からHTML要素を選ぶ](../04_HTMLの意味と構造/01_意味からHTML要素を選ぶ.md)で確認する。

## 確認順

1. 親のGrid Overlayで列線と行線を表示する。
2. 子へ指定された`grid-column`と`grid-row`を見る。
3. 指定を無効にし、自動配置時の位置と比べる。
4. HTMLの読み順とキーボード操作順を確認する。
5. 狭い幅でも意味上の順序が保たれるか確認する。

入れ子をまたいで親のトラックを共有する場合は、基本の子配置を確認した後で[subgridで親のトラックを共有する](../../../03_詳細/01_HTML・CSS/05_subgridで親のトラックを共有する.md)へ進む。

## 一言でいうと

Gridの子配置は親が作ったトラックを使う。見た目の位置を変えてもHTMLの読み順は別に確認する。

## 仕様確認先

- [CSS Grid Layout Module Level 2: Grid Placement](https://www.w3.org/TR/css-grid-2/#placement)
- [CSS Grid Layout Module Level 2: Reordering and Accessibility](https://www.w3.org/TR/css-grid-2/#order-accessibility)
