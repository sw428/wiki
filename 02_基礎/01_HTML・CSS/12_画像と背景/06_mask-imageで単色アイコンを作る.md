# 06_mask-imageで単色アイコンを作る

単色アイコンの形だけを画像から借り、色をCSSで変えたいときは `mask-image` を候補にする。

## 単色アイコンの形を使う

```css
.icon {
  display: inline-block;
  width: 24px;
  height: 24px;
  background-color: currentColor;
  mask-image: url("../img/arrow.svg");
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: contain;
}
```

SVGはアイコンの色を表示する画像ではなく、見える形を決めるマスクとして使う。実際の色は `background-color: currentColor` なので、周囲の `color` に合わせて変えられる。

意味のあるアイコンなら、マスクだけでは意味が伝わらない。隣接テキスト、ボタンの表示名、必要な場合のアクセシブルネームをHTML側で用意する。

背景画像とマスクの役割、alphaとluminanceの違いは[background-imageとmask-imageを区別する](./05_background-imageとmask-imageを区別する.md)で確認する。
