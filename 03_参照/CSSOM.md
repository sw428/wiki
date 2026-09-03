# CSSOM

## 読み方

- シーエスエスオーエム

## 定義

- CSSのスタイルシートやルールを、ブラウザから参照・操作できるオブジェクトとして表したもの。
- CSSファイルの文字列そのものでも、各要素の最終表示寸法を直接持つレイアウト結果でもない。

## ここを見る理由

- CSSが「書いた文字列」から、スタイルシートやルールとして扱われる段階を分けて見るため。
- `display`、`width`、`padding` などの指定が、すぐ画面上の位置や大きさになるわけではないと理解するため。
- CSSルールから、セレクタの一致、カスケード、継承、box tree生成、Layout / Paintへ進む流れを追うため。

## 一瞬イメージ

CSSが見た目の指示書だとしたら、CSSOMはスタイルシートやルールをブラウザから扱うための整理された窓口。

```txt
CSS
-> CSSルールとして解析される
-> CSSOMのオブジェクトとして参照・操作できる

要素ツリー + CSSルール
-> セレクタの一致、cascade / inheritance
-> 各プロパティのcomputed valueが決まる
```

```css
.box {
  display: block;
  width: 100%;
  padding: 20px;
}
```

スタイルシート内では、ざっくり次のようなルールとして扱われる。

```txt
.box には
- display: block
- width: 100%
- padding: 20px
```

## 重要ポイント

- CSSOMはCSSから作られる。
- スタイルシート、CSSルール、宣言ブロックなどをオブジェクトとして扱える。
- どのルールが各要素へ適用されるかは、セレクタの一致、カスケード、継承を通して決まる。
- `display`、`width`、`height`、`padding`、`box-sizing` などの計算値が決まっても、最終的な画面上の大きさ・位置はまだ確定していない場合がある。
- 計算値をもとにbox treeが生成され、Layout / Paintへ進む。

## 関連ノート

- [DOM](./DOM.md)
- [状態変化](./状態変化.md)
- [CSS適用境界](./CSS適用境界.md)
- [状態変化（DOM→CSSOM→Layout→Paint）](./状態変化（DOM→CSSOM→Layout→Paint）.md)
- [ボックスとdisplay](../01_基礎/HTML・CSS/04_ボックスとdisplay.md)

## 仕様確認先

- [CSS Object Model (CSSOM) Module Level 1](https://drafts.csswg.org/cssom-1/)
- [CSS Display Module Level 3 - Introduction](https://drafts.csswg.org/css-display-3/#intro)
