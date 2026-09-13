# 01_FlexとGridで子要素を並べる

カードやナビゲーションを並べるときは、動かしたい要素そのものではなく、それらを直下の子として持つ親へFlexまたはGridを指定する。

このページでは、縦一列と複数列の最小例を作り、「どの親が、どの子を並べているか」を確認する。

## 同じHTMLを縦一列に並べる

```html
<ul class="card-list">
  <li class="card">HTML</li>
  <li class="card">CSS</li>
  <li class="card">JavaScript</li>
</ul>
```

```css
.card-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
```

`display: flex` を指定した `.card-list` がFlexコンテナになり、直下の3つの `.card` がFlexアイテムになる。`flex-direction: column` で縦方向、`gap` でカード間の距離を決める。

## 幅があれば複数列にする

同じHTMLを、狭い画面では一列、広い画面では二列にする。

```css
.card-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

@media (min-width: 768px) {
  .card-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
```

Gridでは、親が列を表すトラックを作る。ここでは画面幅が768px以上になると、利用可能な幅を二列へ配る。

768pxは説明用の値であり、どの制作物にも使う固定値ではない。実装では[配置が成立する幅](./05_コンテナ幅とブレークポイントを決める.md#ブレークポイントは配置が成立する境界で決める)から決める。

## FlexとGridのどちらを選ぶか

| 作りたい配置 | 最初の候補 | 理由 |
| --- | --- | --- |
| 一列や一行を一方向に並べる | Flex | 主軸に沿って並びと余白を扱いやすい |
| 行と列のトラックをそろえる | Grid | 親で列幅と行位置をまとめて決められる |
| 一列だけで、どちらでも書ける | 規則が少ない方 | 手法名ではなく、必要な配置条件で選べる |
| 行と列で意味を持つ表データ | HTMLの `table` | 見た目よりデータの関係を先に保つ |

Flexも折り返せば複数行になり、Gridも一列で使える。「Flexは一方向、Gridは二方向」は最初の選択基準であり、使用可否を分ける絶対条件ではない。

## 画面で確認すること

1. DevToolsのElementsで、`display` を指定した親を選ぶ。
2. その直下に、並べたい要素があるか確認する。
3. `flex-direction` または `grid-template-columns` を一つ変える。
4. `gap` が要素間にだけ入り、外周の余白にはなっていないことを見る。
5. 画面幅を狭め、折り返し、はみ出し、文字の潰れ方を確認する。

`display` は子へ継承されない。子が並ぶ理由と、子自身がさらに中身を並べる指定は[親子のレイアウト文脈](./02_親子のレイアウト文脈を区別する.md)で分ける。

## 次に確認すること

- Flexの軸、固定幅と可変幅、auto margin: [03_Flexで幅と位置を調整する](./03_Flexで幅と位置を調整する.md)
- Gridの固定列と可変列、縮まない場合: [04_Gridの列幅と縮み方を調整する](./04_Gridの列幅と縮み方を調整する.md)
- `gap`、margin、paddingの役割: [06_通常フローと余白の関係を確認する](./06_通常フローと余白の関係を確認する.md)

**次へ進む目安**は、WikiやAIを見ながらでも、自分のHTMLで「この親が、この直下の子を並べている」と指し示し、幅を変えた結果を確認できること。全方式を暗記する必要はない。

## 仕様確認先

- [CSS Flexible Box Layout Module Level 1](https://www.w3.org/TR/css-flexbox-1/)
- [CSS Grid Layout Module Level 2](https://www.w3.org/TR/css-grid-2/)

