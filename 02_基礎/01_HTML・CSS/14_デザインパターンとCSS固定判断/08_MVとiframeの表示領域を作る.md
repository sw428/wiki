# 08_MVとiframeの表示領域を作る

ヒーロー・MVとiframeは、どちらも大きな表示領域を先に作るUIである。ただし、画像を切り抜く判断と、外部文書を埋め込むiframeの属性・寸法は分ける。

## ヒーロー・MVの高さを決める

ヒーローはページ先頭で、主題、画像、テキスト、導線をまとめて見せる領域である。

- 領域の高さ: `min-height`、`aspect-ratio`、`padding`
- 写真の切り抜き: `object-fit`、`object-position`
- 文字の安全領域: 内側コンテナ、余白、最大幅
- 重ねる基準: 親の`position: relative`と子の配置

写真を背景的に使うなら、切り抜きを許容して`cover`を使える。顔、文字、商品全体などが切れる場合は、PC/SPで画像を分けるか、全体を見せる方法を検討する。

固定高が小さすぎると、文字量やSP表示で内容が詰まる。高さそのものがデザイン要件でなければ、`min-height`と内側余白で内容増加を受けられるか確認する。

画像上へ重ねる基準箱は[画像の上に文字や部品を重ねる](../11_メディア設計/05_画像の上に文字や部品を重ねる.md)、PC/SPの画像候補は[pictureとsrcsetで画像候補を切り替える](../11_メディア設計/03_pictureとsrcsetで画像候補を切り替える.md)で扱う。

## iframeへ外部コンテンツを埋め込む

`iframe`は外部文書やプレイヤーをページ内へ埋め込む要素である。`src`には埋め込み用URL、`title`には何を埋め込んでいるか分かる名前を指定する。

```html
<div class="movie">
  <iframe
    src="..."
    title="サービス紹介動画"
    allowfullscreen
  ></iframe>
</div>
```

`allowfullscreen`は全画面表示、`allow`は利用を許可する機能の方針に関係する。埋め込み元が提示するコードを確認し、必要な機能だけを残す。

## 外側の箱で比率を作る

```css
.movie {
  aspect-ratio: 16 / 9;
}

.movie iframe {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
}
```

iframeは、画像のように中の外部文書を`object-fit: cover`で切り抜く対象として扱わない。外側で表示比率を作り、iframe要素の幅と高さをその箱へ合わせる。

地図など内容に必要な高さが動画と異なる場合は、すべてを16:9に統一しない。埋め込む内容、サービスの要件、SPで必要な操作範囲から決める。

## 仕様で確認する

- [HTML Standard - The iframe element](https://html.spec.whatwg.org/dev/iframe-embed-object.html#the-iframe-element)

## 一言でいうと

MVは文字と画像が共存できる領域、iframeは外部コンテンツに合う領域を外側で作る。どちらも内容を見ずに固定高へ押し込まない。

