# 05_background-imageとmask-imageを区別する

`background-image` は要素の背景に何を描くかを決める。`mask-image` は、要素とその内容のどの部分を見せるかを決める。

## 背景とマスクの役割を分ける

| 観点 | `background-image` | `mask-image` |
| --- | --- | --- |
| 主な役割 | 背景として画像を描く | 要素全体の見える範囲を決める |
| 表示する色・内容 | 背景画像が持つ | マスクされる要素側が持つ |
| よく使う場面 | 写真背景、模様 | 単色アイコン、形抜き、フェード |
| HTML上の意味 | 追加しない | 追加しない |
| 必要なもの | 描画先のbox | 面積に加え、マスク越しに見せる背景や内容 |

CSS画像をマスクにした場合、通常は画像のalpha値が見える量に使われる。色の白黒を直接使いたいなど、luminanceとして解釈する必要がある場合は `mask-mode` も確認する。

## mask関連プロパティを対応させる

- `mask-image`: 使用する画像またはグラデーション
- `mask-size`: マスク画像の大きさ
- `mask-position`: マスク画像の位置
- `mask-repeat`: マスク画像を繰り返すか
- `mask-mode`: alphaとluminanceのどちらで解釈するか

複数のmaskレイヤーを書く場合は、各プロパティのカンマ区切りの順序を対応させる。`mask-image` が `none` 以外になるとstacking contextも作られるため、重なり順が変わった場合は `z-index` と祖先のstacking contextを確認する。

## mask-imageを選ぶ判断

- 単色アイコンの形だけを借り、色をCSSで変える: 候補
- 画像や要素の端を徐々に透明にする: 候補
- 写真や商品画像をそのまま見せる: `img` または `background-image`
- 写真を決めた枠へ収める: `object-fit`、`aspect-ratio`、`background-size`
- HTML上の意味を伝える: テキスト、`img` とalt、操作要素のアクセシブルネーム

`mask-image` は画像を縮小したり、画像ファイルを別形式へ変えたりする指定ではない。「何を表示するか」と「どこを見せるか」を分ける。

単色アイコンの実装は[mask-imageで単色アイコンを作る](./06_mask-imageで単色アイコンを作る.md)、グラデーションによる透明化は[mask-imageで要素の端をフェードさせる](./07_mask-imageで要素の端をフェードさせる.md)で確認する。
