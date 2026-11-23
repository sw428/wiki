# 07_mask-imageで要素の端をフェードさせる

画像や要素の端を徐々に透明にしたいときは、グラデーションを `mask-image` として使える。

## 要素の端を徐々に消す

```css
.fade {
  min-height: 320px;
  background-image: url("../img/photo.jpg");
  background-position: center;
  background-size: cover;
  mask-image: linear-gradient(to bottom, #000 70%, transparent 100%);
}
```

写真を描いているのは`background-image`。`mask-image`は、写真を含む`.fade`全体を下方向へ徐々に透明にする。

背景画像とマスクの役割、複数レイヤー、stacking contextは[background-imageとmask-imageを区別する](./05_background-imageとmask-imageを区別する.md)で確認する。
