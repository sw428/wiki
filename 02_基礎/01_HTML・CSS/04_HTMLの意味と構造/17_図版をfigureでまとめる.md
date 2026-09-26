# 17_図版をfigureでまとめる

## このページの役割

`figure`は、画像を入れるためだけの要素ではない。

このページでは、

- どんな内容を`figure`でまとめるか
- `img`だけの場合とどう分けるか
- `figcaption`をいつ使うか

を整理する。

## この範囲の芯

判断するのは、

> その内容を、本文から参照できる自己完結した一つの図版として扱うか

という点。

たとえば、グラフとその説明を一つの図版として扱うなら、次のように書ける。

```html
<figure>
  <img src="chart.png" alt="利用者数の推移">
  <figcaption>
    2024年から2026年までの利用者数の推移
  </figcaption>
</figure>
```

```text
figure
→ 自己完結した図版全体

img
→ 図版の画像

figcaption
→ 図版全体のキャプション
```

という関係になる。

## figureは自己完結した内容をまとめる

`figure`は、本文から一つのまとまりとして参照でき、本文の流れを壊さず別の位置へ移しても成立する内容に使う。

たとえば、

- 写真
- 図
- グラフ
- コード例
- 表

などを、自己完結した一つのまとまりとして扱う場合に使える。

```text
画像がある
→ figure
```

ではない。

```text
本文から参照できる
自己完結した一つのまとまり
→ figureを検討する
```

と考える。

ここでいう独立は、本文と無関係という意味ではない。本文と関係しながら、図版単位でまとめて扱えるという意味。

## imgだけで十分な場合もある

単に画像を置くだけなら、`img`だけで十分なこともある。

```html
<img src="classroom.jpg" alt="授業中の教室">
```

画像があるからといって、必ず次のように囲む必要はない。

```html
<figure>
  <img src="classroom.jpg" alt="授業中の教室">
</figure>
```

`figure`を使うかは、画像の有無ではなく、その内容を図版単位でまとめて扱うかで判断する。

画像が文章の段落の一部なら、[画像を段落に含めるか判断する](./16_画像を段落に含めるか判断する.md)で確認する。

## figcaptionは図版全体のキャプション

`figcaption`は、`figure`全体のキャプションを表す。

```html
<figure>
  <img src="office.jpg" alt="新しいオフィス">
  <figcaption>
    2026年に移転した新オフィス
  </figcaption>
</figure>
```

ここでは、

```text
img
→ 画像そのもの

figcaption
→ 図版全体が何を表すか示すキャプション
```

となる。

## figureにfigcaptionは必須ではない

`figure`を使ったからといって、必ず`figcaption`を付ける必要はない。

```html
<figure>
  <img src="diagram.png" alt="処理の流れを示した図">
</figure>
```

図版全体のキャプションとして表示し、関連付けたい説明がある場合に`figcaption`を使う。

反対に、画像の後ろへ説明文があるだけで、自動的にキャプションになるわけでもない。

```html
<img src="chart.png" alt="利用者数の推移">
<p>2025年以降、利用者数が増加しています。</p>
```

この`p`は通常の本文。図版のキャプションとして関連付けるなら、`figure`内の`figcaption`にする。

## altとfigcaptionは役割が違う

`alt`と`figcaption`は、どちらも画像に関係する文字だが役割が違う。

```html
<figure>
  <img
    src="chart.png"
    alt="2024年から2026年にかけて利用者数が増加しているグラフ"
  >
  <figcaption>
    図1 利用者数の推移
  </figcaption>
</figure>
```

ここでは、

```text
alt
→ 画像の代わりになる情報

figcaption
→ 図版全体のキャプション
```

となる。

そのため、

```text
figcaptionがある
→ 必ずalt=""にする
```

とは判断しない。

画像が伝える情報と、図版全体へ付けるキャプションを分け、それぞれに必要な内容を決める。

## figcaptionはfigureの最初か最後に置く

`figcaption`を使う場合は、`figure`の最初か最後の子として置く。

最初に置く場合は、次のようになる。

```html
<figure>
  <figcaption>
    図1 利用者数の推移
  </figcaption>
  <img src="chart.png" alt="利用者数の推移を示したグラフ">
</figure>
```

最後に置く場合は、次のようになる。

```html
<figure>
  <img src="chart.png" alt="利用者数の推移を示したグラフ">
  <figcaption>
    図1 利用者数の推移
  </figcaption>
</figure>
```

`figure`の途中へ、ほかの内容で挟む形では置かない。

## figureの中身は画像だけとは限らない

`figure`は`img`専用ではない。

たとえば、コード例を一つの独立した例として扱える。

```html
<figure>
  <pre><code>.card {
  display: grid;
}</code></pre>
  <figcaption>
    カードをGridで配置する例
  </figcaption>
</figure>
```

```text
figure
→ 画像を入れる箱
```

ではなく、

```text
figure
→ 自己完結した一つの内容をまとめる
```

と考える。

## 本文の説明とキャプションを分ける

図版について詳しく説明する本文と、図版全体のキャプションは別の役割を持つ。

```html
<figure>
  <img src="chart.png" alt="利用者数の推移">
  <figcaption>
    図1 利用者数の推移
  </figcaption>
</figure>

<p>
  2025年以降、利用者数の増加が特に大きくなっています。
</p>
```

ここでは、

```text
figcaption
→ 図版全体の短いキャプション

p
→ 図版の内容を説明・考察する本文
```

と分かれている。

画像について書かれた文章を、すべて`figcaption`へ入れるわけではない。

## figureの余白はCSS側で確認する

ブラウザの既定スタイルによって、`figure`にはマージンが付くことがある。

そのため、`img`だけの場合から`figure`へ変えたときに余白が増えても、`figure`の意味が不適切とは限らない。

```text
HTML
→ 自己完結した図版かを決める

CSS
→ figureの余白や配置を決める
```

と分ける。

既定の余白をどこまで消すかは、[既定の余白をどこまで消すか決める](../05_ボックスとdisplay/13_既定の余白をどこまで消すか決める.md)で扱う。

## 判断するときの見方

`figure`を使うか迷ったら、次の順で見る。

```text
1. 本文から一つの単位として参照できるか
   ↓
   Yesならfigureを検討する

2. 別の位置へ移しても本文の流れが成立するか
   ↓
   自己完結したまとまりか確認する

3. 図版全体のキャプションがあるか
   ↓
   Yesならfigcaptionを検討する

4. 単に画像を配置しているだけか
   ↓
   imgだけで足りる場合がある
```

## このページのまとめ

- `figure`は画像専用の要素ではない
- 本文から参照できる、自己完結した一つのまとまりに使う
- 独立とは、本文と無関係という意味ではない
- 画像があるからといって必ず`figure`にするわけではない
- `figcaption`は`figure`全体のキャプション
- `figure`に`figcaption`は必須ではない
- `alt`と`figcaption`は役割が違う
- `figcaption`は`figure`の最初か最後の子として置く
- 本文としての説明とキャプションを分ける
- 判断するときは、一つの単位として参照・移動できる内容かを見る

## 仕様の確認先

- [HTML Standard - The `figure` element](https://html.spec.whatwg.org/multipage/grouping-content.html#the-figure-element)
- [HTML Standard - The `figcaption` element](https://html.spec.whatwg.org/multipage/grouping-content.html#the-figcaption-element)
