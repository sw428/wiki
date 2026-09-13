# 01_imgとbackground-imageを選ぶ

画像を配置するときは、最初に「この画像自体が内容を伝えるか」「なくても内容が変わらない装飾か」を考える。内容ならHTMLの `img`、装飾ならCSSの `background-image` が最初の候補になる。

## 同じ見た目でも役割で選ぶ

| 観点 | `<img>` | `background-image` |
| --- | --- | --- |
| 主な役割 | HTML文書内へ画像を置く | 既存要素の背景を描く |
| HTML上の存在 | `img` 要素として存在する | 新しいHTML要素は増えない |
| 意味の伝達 | 用途に応じて `alt` を指定する | 背景画像自体には代替テキストを持たせられない |
| レイアウト | 画像要素自身が置換要素として配置される | 画像だけでは描画先のboxの寸法を作らない |

```html
<!-- 記事内容を伝える写真 -->
<img src="workshop.jpg" alt="机を囲んで作業する参加者" width="800" height="533">
```

```css
/* 内容を変えない装飾模様 */
.hero {
  background-image: url("../img/dots.svg");
}
```

装飾でも、HTML上の画像要素として配置する都合がある場合は `<img alt="">` を使える。逆に、画像がないと見出しや操作内容が伝わらないなら、背景だけで済ませず、HTMLの文字または適切な代替テキストを残す。

## 背景画像は既存のboxへ描かれる

`background-image` は、指定した要素が作るboxの背景として描画される。画像の読み込みに成功しても、描画先の幅または高さが0なら見えない。

```css
.hero-decoration {
  min-height: 240px;
  background-image: url("../img/hero.jpg");
  background-position: center;
  background-size: cover;
}
```

この例で面積を作っているのは `min-height` と、親レイアウトから得る幅である。背景画像そのものが `.hero-decoration` の高さを決めているわけではない。

## 背景が見えないときの確認順

1. DevToolsで背景を指定した要素を選ぶ。
2. Computedやボックスモデル図で、幅と高さが0ではないか確認する。
3. 空の `inline` 要素へ `width` / `height` だけを指定していないか確認する。
4. `background-image` のURLとNetworkの読み込み結果を確認する。
5. `background-size`、`background-position`、`background-repeat` を一つずつ確認する。
6. `background-clip` や別の背景レイヤーで見える範囲が変わっていないか確認する。

`display: block` や `inline-block` にすれば寸法を指定しやすくなるが、中身・padding・高さのどれもなければ高さ0になり得る。`display` を変えるだけで必ず見えるとは限らない。

## coverとcontainは切り取りの有無で選ぶ

| 指定 | 結果 | 向く場面 |
| --- | --- | --- |
| `background-size: cover` | 比率を保ち、領域全体を覆う。画像の一部が切れることがある | 写真背景など、余白を作りたくない |
| `background-size: contain` | 比率を保ち、画像全体が収まる。領域内に余白が残ることがある | 図柄全体を見せたい |
| `background-position` | 余白や切り取りが出るとき、どの位置を基準に見せるか決める | 人物やロゴなど見せたい位置がある |

画像をHTML要素として枠へ収める場合は `object-fit` を使う。[比率の枠へ画像を収める](../11_メディア設計/02_比率の枠へ画像を収める.md)で、描画先の枠と画像自身を分けて確認する。

## 次に確認すること

- 画像の色ではなく形を使いたい: [mask-image](./02_mask-imageで見える範囲を作る.md)
- 素材を書き出す形式を決めたい: [SVGとラスター画像](./03_SVGとラスター画像を選ぶ.md)
- 画像内に文字がある: [文字を画像にする前に確認する](./05_文字を画像にする前に確認する.md)

**次へ進む目安**は、WikiやAIを見ながらでも、画像を `img` または背景にした理由と、背景を描く要素の面積が何で決まるかを説明できること。

## 仕様確認先

- [HTML Standard: Requirements for providing text alternatives](https://html.spec.whatwg.org/multipage/images.html#alt)
- [CSS Backgrounds and Borders Module Level 3](https://www.w3.org/TR/css-backgrounds-3/)
