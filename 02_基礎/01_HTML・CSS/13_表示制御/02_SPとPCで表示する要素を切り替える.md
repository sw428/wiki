# 02_SPとPCで表示する要素を切り替える

SP専用・PC専用の要素を作るときは、最初に「どの画面幅で存在させるか」を決める。表示された後の横並びや位置は別のレイアウトとして扱う。

## ブラウザー側のdisplayへ戻してよい場合

表示する側で必要な`display`を先に確認する。次は、SPを初期状態、PCを768px以上とし、PCではブラウザーやユーザースタイル側の`display`へ戻してよい要素の例である。

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

自分のCSSで指定した`flex`や`grid`を表示時にも必要とする要素には、その復元目的で`revert`を使わない。必要な値を明示する方法と、表示範囲では非表示Utilityを競合させない方法は[表示後もFlexとGridを保つ方法を選ぶ](./05_表示後もFlexとGridを保つ方法を選ぶ.md)で比較する。

`revert`が実際に戻す範囲は[display-revertの戻り先を確認する](./04_display-revertの戻り先を確認する.md)で扱う。

## 実装する順

1. ブレークポイントと、SP/PCのどちらを初期状態にするか確認する。
2. SPだけ・PCだけ存在する要素をHTMLで特定する。
3. 既存プロジェクトのUtility名とCSSの置き場所を確認する。
4. 非表示になる側で`display: none`がComputedへ反映されたか確認する。
5. 表示される側で、必要な`block`・`flex`・`grid`などになっているか確認する。
6. ブレークポイント直前・直後と、その間の実際の表示幅で確認する。

## 仕様確認先

- [Media Queries Level 4: width](https://www.w3.org/TR/mediaqueries-4/#width)
- [CSS Display Module Level 3: Box generation](https://www.w3.org/TR/css-display-3/#box-generation)
