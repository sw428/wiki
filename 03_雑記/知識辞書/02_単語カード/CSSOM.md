# CSSOM

## 読み方

- シーエスエスオーエム

## 定義

- CSSをブラウザが扱いやすい形に変換した、スタイル情報のデータ。
- CSSファイルそのものではなく、ブラウザ内部で整理された見た目指定のツリー。

## ここを見る理由

- CSSが「書いた文字列」から「ブラウザが計算に使う情報」へ変わる段階を分けて見るため。
- `display`、`width`、`padding` などの指定が、すぐ画面上の位置や大きさになるわけではないと理解するため。
- DOMとCSSOMを合わせてから、Layout / Paint へ進む流れを追うため。

## 一瞬イメージ

CSSが見た目の指示書だとしたら、CSSOMはその指示をブラウザが整理したスタイル設計図。

```txt
CSS
-> ブラウザが読む
-> CSSOMになる
```

```css
.box {
  display: block;
  width: 100%;
  padding: 20px;
}
```

ブラウザ内部では、ざっくり次のようなスタイル情報として扱われる。

```txt
.box には
- display: block
- width: 100%
- padding: 20px
```

## 重要ポイント

- CSSOMはCSSから作られる。
- どの要素にどのCSSが当たるかを持つ。
- `display`、`width`、`height`、`padding`、`box-sizing` などの指定が入る。
- CSSOMの時点では、最終的な画面上の大きさ・位置はまだ決まっていない。
- DOMとCSSOMを合わせて、Render Tree / Layout / Paint へ進む。

## 関連ノート

- [DOM](./DOM.md)
- [状態変化](./状態変化.md)
- [CSS適用境界](./CSS適用境界.md)
- [01_状態変化（DOM→CSSOM→Layout→Paint）](../01_レンダリング前提/01_状態変化（DOM→CSSOM→Layout→Paint）.md)
- [04_ボックスとdisplay](../../../01_基礎概念/HTML・CSS/04_ボックスとdisplay.md)
