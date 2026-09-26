# 06_Flexで固定幅と可変幅を組み合わせる

サイドを固定し、メインだけ残り幅へ広げるときは、親・固定側・可変側の役割を分ける。幅が足りない場合にどちらを縮めるかも同時に決める。

## 固定側と可変側を作る

```css
.layout {
  display: flex;
  gap: 24px;
  align-items: flex-start;
}

.main {
  flex: 1;
  min-width: 0;
}

.side {
  width: 240px;
  flex-shrink: 0;
}
```

- 親：横並びとアイテム間の距離を決める
- 固定側：基準となる幅を持ち、必要なら縮ませない
- 可変側：残り幅を受け取り、内容によって縮みが止まらないようにする

両方を固定すると、親幅が足りないときに横へあふれる。固定する寸法は必要な側だけに置く。

## min-width: 0が必要になる条件

Flexアイテムには内容由来の自動最小サイズがある。長い単語、横長の画像、`white-space: nowrap`などがあると、`flex: 1`でも内容より小さく縮まない場合がある。

`min-width: 0`は、Flexアイテムが0まで縮めるように最小幅の制約を外す。ただし、文字の折り返しや省略を完成させる指定ではない。

- 長い単語を折り返す：`overflow-wrap`
- 一行で省略する：`white-space`、`overflow`、`text-overflow`
- 画像を枠内へ収める：画像側の幅や`object-fit`

何を見せ、何を折り返し、何を隠してよいかは別に決める。

## flex-basisと実寸を分ける

```css
.main {
  flex: 1 1 320px;
  padding-inline: 24px;
}
```

`320px`はFlex計算で使う基準寸法であり、常に最終的な外側寸法になる値ではない。最終結果には次も関わる。

1. `box-sizing`が`content-box`か`border-box`か
2. padding、border、margin
3. 兄弟アイテムの基準寸法と`gap`
4. `flex-grow`と`flex-shrink`
5. 内容由来の自動最小サイズ

左右paddingは別のプロパティであり、片側のpaddingが反対側を上書きするわけではない。内容領域が狭くなった場合は、親の利用可能幅に対して外側寸法の合計がいくつかを確認する。

箱のどこまでを`width`へ含めるかは[box-sizingでwidthの範囲を決める](../05_ボックスとdisplay/04_box-sizingでwidthの範囲を決める.md)、実寸の確認順は[箱の大きさが予想と違うときの確認順](../05_ボックスとdisplay/12_箱の大きさが予想と違うときの確認順.md)へ分ける。

## このページのまとめ

- 固定する側と残り幅を受け取る側を先に決める。
- `flex: 1`だけで縮まないときは自動最小サイズを確認する。
- `flex-basis`と最終的な外側寸法を同じ値として扱わない。

## 仕様確認先

- [CSS Flexible Box Layout Module Level 1: Flexibility](https://www.w3.org/TR/css-flexbox-1/#flexibility)
- [CSS Flexible Box Layout Module Level 1: Automatic Minimum Size](https://www.w3.org/TR/css-flexbox-1/#min-size-auto)
