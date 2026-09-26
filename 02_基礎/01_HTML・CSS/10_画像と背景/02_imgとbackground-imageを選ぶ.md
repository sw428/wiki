# 02_imgとbackground-imageを選ぶ

画像を配置するときは、最初に「この画像自体が内容を伝えるか」「なくても内容が変わらない装飾か」を考える。内容ならHTMLの`img`、装飾ならCSSの`background-image`が最初の候補になる。

## 同じ見た目でも役割で選ぶ

| 観点 | `img` | `background-image` |
| --- | --- | --- |
| 主な役割 | HTML文書内へ画像を置く | 既存要素の背景を描く |
| HTML上の存在 | `img`要素として存在する | 新しいHTML要素は増えない |
| 意味の伝達 | 用途に応じて`alt`を指定する | 背景画像自体には代替テキストを持たせられない |
| レイアウト | 画像要素自身が置換要素として配置される | 画像だけでは描画先の箱の寸法を作らない |

```html
<!-- 記事内容を伝える写真 -->
<img
  src="workshop.jpg"
  alt="机を囲んで作業する参加者"
  width="720"
  height="480"
>
```

```css
/* 内容を変えない装飾模様 */
.hero {
  background-image: url("../img/dots.svg");
}
```

## 装飾でもimgを使う場合

装飾でも、HTML上の画像要素として配置する都合がある場合は`<img alt="">`を使える。空の`alt`によって、その画像だけでは読み上げる内容がないことを示す。

反対に、画像がないと見出しや操作内容が伝わらない場合は、背景だけで済ませず、HTMLの文字または適切な代替テキストを残す。

判断するときは「装飾なら必ず背景」と固定せず、次を確認する。

1. 画像自体が文書内容か。
2. 画像がなくても同じ意味と操作が伝わるか。
3. HTML上で独立した画像要素として配置する必要があるか。
4. 代替テキストを画像自身へ持たせる必要があるか。

文字入り画像の`alt`は[アウトライン文字のaltを決める](./13_アウトライン文字のaltを決める.md)、`img`の表示寸法と画像候補は[レスポンシブ画像設計の選び方](../12_レスポンシブ画像設計/01_レスポンシブ画像設計の選び方.md)へ分ける。

## 一言でいうと

画像が伝える意味をHTMLへ置くなら`img`、既存内容を補う装飾として描くなら`background-image`を最初の候補にする。

## 仕様確認先

- [HTML Standard: Requirements for providing text alternatives](https://html.spec.whatwg.org/multipage/images.html#alt)
- [CSS Backgrounds and Borders Module Level 3](https://www.w3.org/TR/css-backgrounds-3/)
