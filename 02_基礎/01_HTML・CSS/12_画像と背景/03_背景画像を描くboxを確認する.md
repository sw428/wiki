# 03_背景画像を描くboxを確認する

`background-image` を指定したのに画像が見えないときは、画像ファイルより先に、背景を描く要素のboxに面積があるか確認する。

## 背景画像は既存のboxへ描かれる

`background-image` は、指定した要素が作るboxの背景として描画される。画像の読み込みに成功しても、描画先の幅または高さが0なら見えない。

```css
.hero {
  min-height: 240px;
  background-image: url("../img/photo.jpg");
  background-position: center;
  background-size: cover;
}
```

この例で面積を作っているのは`min-height`と、親レイアウトから得る幅である。背景画像そのものが`.hero`の高さを決めているわけではない。

## 背景が見えないときの確認順

1. DevToolsで背景を指定した要素を選ぶ。
2. Stylesで`background-image`が打ち消されていないか確認する。
3. Computedやボックスモデル図で、幅と高さが0ではないか確認する。
4. 空の`inline`要素へ`width`や`height`だけを指定していないか確認する。
5. `background-image`のURLとNetworkの読み込み結果を確認する。
6. `background-size`、`background-position`、`background-repeat`を一つずつ確認する。
7. `background-clip`や別の背景レイヤーで見える範囲が変わっていないか確認する。

`display: block`や`inline-block`にすれば寸法を指定しやすくなるが、中身・padding・高さのどれもなければ高さ0になり得る。`display`を変えるだけで必ず見えるとは限らない。

幅と高さが予想と違う場合は[箱の大きさが予想と違うときの確認順](../05_ボックスとdisplay/12_箱の大きさが予想と違うときの確認順.md)へ戻る。
