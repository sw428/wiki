# 01_SPとPCで表示する要素を切り替える

SP専用・PC専用の要素を作るときは、最初に「どの画面幅で存在させるか」を決める。表示された後の横並びや位置は、別のレイアウトとして扱う。

## 表示条件を名前へ出す

```html
<p class="u-sp-only">スマートフォン向けの案内</p>
<p class="u-pc-only">PC向けの案内</p>
```

`show-sp`のような名前より、`sp-only`の方が「SPだけ」という反対側を含む条件を読み取りやすい。このWikiでは次を基本候補とする。

- `u-sp-only`: SPだけ表示する
- `u-pc-only`: PCだけ表示する

`u-`接頭辞は、表示条件だけを追加するUtilityであることを表す。既存案件に別の命名規則がある場合は、途中からこの名前へ統一せず、既存規則を優先する。

## ブラウザー側のdisplayで表示できる基本形

次はSPを初期状態とし、PCを768px以上とする例である。

```css
.u-pc-only {
  display: none;
}

@media (min-width: 768px) {
  .u-sp-only {
    display: none;
  }

  .u-pc-only {
    display: revert;
  }
}
```

| 条件 | `u-sp-only` | `u-pc-only` |
| --- | --- | --- |
| 768px未満 | Utilityでは表示方法を変えない | `display: none` |
| 768px以上 | `display: none` | `display: revert`で下位の出所から決め直す |

この基本形を使えるのは、PC表示時にブラウザーやユーザースタイル側の`display`へ戻してよい要素である。自分のCSSで指定した`flex`や`grid`を表示時にも必要とする要素には、その復元目的で`revert`を使わない。

詳しい結果は[display-revertの戻り先を確認する](./02_display-revertの戻り先を確認する.md)で扱う。

## Utilityへ表示条件だけを持たせる

```css
/* 表示条件だけを担当する */
.u-pc-only {
  display: none;
}
```

表示制御クラスへ次の指定を混ぜない。

- 幅、高さ、margin、padding
- Flex・Gridの並び方
- `position`と座標
- 部品固有の色や装飾

同じ要素へ表示条件とレイアウトの両方が適用されることはある。それでも、クラスごとの担当を分けておくと、「表示されない」と「表示されたが並びが違う」を別々に確認できる。

## 実装する順

1. ブレークポイントと、SP/PCのどちらを初期状態にするか確認する。
2. SPだけ・PCだけ存在する要素をHTMLで特定する。
3. 既存プロジェクトのUtility名とCSSの置き場所を確認する。
4. 非表示になる側で`display: none`がComputedへ反映されたか確認する。
5. 表示される側で、必要な`block`・`flex`・`grid`などになっているか確認する。
6. ブレークポイント直前・直後と、その間の実際の表示幅で確認する。

## 同じ情報を2つ置く場合

レイアウトの都合でSP用・PC用の要素を分けても、内容まで別の事実へしない。

- 日時は同じ`datetime`と表示内容を使う
- 価格、電話番号、リンク先を片側だけ更新し忘れない
- 同じ操作を2つ置く場合は、表示中の要素が正しく操作できるか確認する

要素を複製せずCSSだけで並べ替えられるなら、その方が更新箇所を増やさずに済む。複製が必要かどうかは、表示制御だけでなくHTMLの意味とレイアウト条件も含めて決める。

**次へ進む目安**は、SP/PCの各条件で「表示されるか」と「表示時に必要な並び方」を分けて確認できること。

## 仕様確認先

- [Media Queries Level 4: width](https://www.w3.org/TR/mediaqueries-4/#width)
- [CSS Display Module Level 3: Box generation](https://www.w3.org/TR/css-display-3/#box-generation)
- [CSS Cascading and Inheritance Level 5: revert](https://www.w3.org/TR/css-cascade-5/#defaulting-keywords)

