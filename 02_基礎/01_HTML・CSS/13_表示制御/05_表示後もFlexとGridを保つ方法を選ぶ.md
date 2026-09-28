# 05_表示後もFlexとGridを保つ方法を選ぶ

非表示だった要素を表示した後も`flex`や`grid`が必要なら、`revert`で以前のauthor指定が復元されることを期待せず、表示時の`display`をどう決めるかを選ぶ。

## flexやgridを保つ方法

表示時に必要な値が決まっているなら、その値を表示条件で明示する。

```css
.actions {
  display: none;
}

@media (min-width: 768px) {
  .actions {
    display: flex;
  }
}
```

または、対応環境でMedia Queries Level 4の範囲構文を使えるなら、非表示にする範囲だけUtilityを有効にする方法も比較できる。

```css
@media (width < 768px) {
  .u-pc-only {
    display: none;
  }
}

@media (width >= 768px) {
  .u-sp-only {
    display: none;
  }
}
```

この形では、表示する範囲にUtilityの`display`宣言がないため、`.actions { display: flex; }`などの部品側の指定を巻き戻さない。ただし、既存プロジェクトの対象ブラウザー、CSSの記述順・レイヤー・詳細度と合わせて採用を決める。ここでは自動的な共通規約にはしない。

## 仕様確認先

- [Media Queries Level 4: Range context](https://www.w3.org/TR/mediaqueries-4/#mq-range-context)
