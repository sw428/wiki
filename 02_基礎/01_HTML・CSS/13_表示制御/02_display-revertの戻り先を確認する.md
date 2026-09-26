# 02_display-revertの戻り先を確認する

`display: revert`は、直前に見えていた`display`へ戻す命令ではない。宣言が属するカスケード出所を巻き戻して、その下位の出所から値を決め直す。

## flexを保存してから戻す機能ではない

```html
<div class="actions u-pc-only">
  <div>A</div>
  <div>B</div>
</div>
```

```css
.actions {
  display: flex;
}

.u-pc-only {
  display: none;
}

@media (min-width: 768px) {
  .u-pc-only {
    display: revert;
  }
}
```

同じauthor originにあり、後のUtilityが競合に勝つ場合、結果は次のようになる。

| 条件 | 結果 |
| --- | --- |
| `.actions`だけ | `display: flex` |
| 768px未満で`u-pc-only`も付く | `display: none` |
| 768px以上 | author originの`display`指定を巻き戻すため、通常の`div`ではUA側の`block`になることが多い |

CSSは「768px未満で一度消した要素の見た目」を保存していない。最初からPC幅で開いても、その幅で有効な宣言から同じように計算する。

## どこまで戻るか

author originの`revert`がカスケードに勝つと、そのプロパティについてauthor originの指定がなかったものとして扱い、user origin、さらにUA originの候補から値を決める。

- 一般的な`div`: UAスタイルでは`block`になることが多い
- 一般的な`span`: UAスタイルでは`inline`になることが多い
- ユーザースタイルがある: その指定が戻り先になる可能性がある
- より強い宣言へ`revert`が負けた: 巻き戻し自体が最終結果にならない

自分が`style.css`へ書いたCSSはauthor originであり、ここでいうuser originではない。

## revert-layerとは違う

`revert-layer`は、現在のカスケードレイヤーの指定を外し、同じorigin内の下位レイヤーへ戻す。下位レイヤーがなければ、さらに前のoriginへ戻る。

`revert`はorigin単位、`revert-layer`はまずlayer単位である。`@layer`を使っていないコードへ、以前の値へ戻すという意味で`revert-layer`を置き換え候補にしない。

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

## DevToolsで確認する

1. Elementsで対象要素を選ぶ。
2. Stylesで`display: none`、`revert`、部品側の`display`の勝敗を見る。
3. Computedで最終的な`display`を見る。
4. 画面幅を切り替え、どのmedia queryが成立したかを見る。
5. 表示されたが並びが違う場合は、以前の見た目ではなく現在のComputedから原因を探す。

カスケード全体は[カスケード全体の優先順位](../06_CSSカスケードとDevToolsの見方/04_カスケード全体の優先順位.md)へ戻る。

## 仕様確認先

- [CSS Cascading and Inheritance Level 5: revert](https://www.w3.org/TR/css-cascade-5/#valdef-all-revert)
- [CSS Cascading and Inheritance Level 5: revert-layer](https://www.w3.org/TR/css-cascade-5/#valdef-all-revert-layer)
- [Media Queries Level 4: Range context](https://www.w3.org/TR/mediaqueries-4/#mq-range-context)
