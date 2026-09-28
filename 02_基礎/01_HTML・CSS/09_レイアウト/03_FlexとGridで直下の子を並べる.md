# 03_FlexとGridで直下の子を並べる

複数の要素を並べるときは、動かしたい要素そのものではなく、それらを直下の子として持つ親へFlexまたはGridを指定する。

## 同じHTMLで配置方法を比べる

```html
<ul class="list">
  <li class="item">HTML</li>
  <li class="item">CSS</li>
  <li class="item">JavaScript</li>
</ul>
```

一方向の並びと位置を扱うならFlexを最初の候補にできる。

```css
.list {
  display: flex;
  gap: 16px;
}
```

行と列のトラックを親で決めるならGridを最初の候補にできる。

```css
.list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}
```

どちらも`.list`がコンテナになり、直下の3つの`.item`がアイテムになる。孫要素までは同じコンテナのアイテムにならない。

## FlexとGridのどちらを選ぶか

| 作りたい配置 | 最初の候補 | 判断理由 |
| --- | --- | --- |
| 一列や一行を一方向に並べたい | Flex | 主軸に沿った配置と空間配分を扱いやすい |
| 行と列の位置や幅を親でそろえたい | Grid | トラックを基準に複数の子を配置できる |
| 一列だけで、どちらでも同じ結果になる | 必要な規則が少ない方 | 手法名ではなく必要な配置条件で選ぶ |
| 行と列の対応自体に意味がある表データ | HTMLの`table` | 見た目よりデータの関係を先に保つ |

Flexも折り返せば複数行になり、Gridも一列で使える。「Flexは一方向、Gridは二方向」は最初の選択基準であり、使用可否を分ける絶対条件ではない。

表データは、幅が苦しいことだけを理由にFlexやGridへ置き換えない。`table-layout: fixed`は表の列幅計算を変える指定であり、レスポンシブ対応そのものではない。横スクロール、折り返し、列幅、表示項目を別に検討する。

## 画面で確認すること

1. DevToolsで`display`を指定した親を選ぶ。
2. 並べたい要素がその直下の子になっているか確認する。
3. Flexなら`flex-direction`、Gridなら`grid-template-columns`を一つ変える。
4. `gap`がアイテム間にだけ入り、外周の余白にはならないことを見る。
5. 画面幅と内容量を変え、配置が成立する範囲を確認する。

親と子の両方へ`display: flex`や`grid`を書く理由は、[親子のレイアウト文脈を区別する](./04_親子のレイアウト文脈を区別する.md)で確認する。

## 仕様確認先

- [CSS Flexible Box Layout Module Level 1](https://www.w3.org/TR/css-flexbox-1/)
- [CSS Grid Layout Module Level 2](https://www.w3.org/TR/css-grid-2/)
