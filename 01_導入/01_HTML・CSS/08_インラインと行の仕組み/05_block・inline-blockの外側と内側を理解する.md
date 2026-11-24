# block・inline-blockの外側と内側を理解する

`display: block`の要素の中でも、文字は横に並びます。反対に、`inline-block`の中に段落を縦に並べることもできます。

これは、**要素自身の並び方と、その中身の並び方が別だからです。**

## 同じblockでも、中身の並び方は変わる

まず、`div`の中に`span`を三つ入れてみます。

```html
<div>
  <span>文字A</span>
  <span>文字B</span>
  <span>文字C</span>
</div>
```

[![blockの中でspanが横に並ぶ](../../../07_%E7%94%BB%E5%83%8F/img/html-css/01_08_05_block%E5%86%85%E3%81%AE%E3%82%A4%E3%83%B3%E3%83%A9%E3%82%A4%E3%83%B3%E9%85%8D%E7%BD%AE.svg)](../../../07_%E7%94%BB%E5%83%8F/img/html-css/01_08_05_block%E5%86%85%E3%81%AE%E3%82%A4%E3%83%B3%E3%83%A9%E3%82%A4%E3%83%B3%E9%85%8D%E7%BD%AE.svg)

`div`自身は前後のブロックと縦に並びますが、中の`span`は文字と同じように行に並びます。

次に、`div`はそのままにして、中身だけを`p`に変えます。

```html
<div>
  <p>テキスト</p>
  <p>テキスト</p>
  <p>テキスト</p>
</div>
```

[![blockの中でpが縦に並ぶ](../../../07_%E7%94%BB%E5%83%8F/img/html-css/01_08_05_block%E5%86%85%E3%81%AE%E3%83%96%E3%83%AD%E3%83%83%E3%82%AF%E9%85%8D%E7%BD%AE.svg)](../../../07_%E7%94%BB%E5%83%8F/img/html-css/01_08_05_block%E5%86%85%E3%81%AE%E3%83%96%E3%83%AD%E3%83%83%E3%82%AF%E9%85%8D%E7%BD%AE.svg)

今度は、中の`p`が縦に並びます。

どちらも親の`div`は`display: block`のままです。中身の並び方が変わったのは、`span`と`p`では箱の種類が違うからです。

このように、文字などを行に並べたり、ブロックを順に積んだりする基本の配置を**通常フロー**と呼びます。ここでは横書きを前提にしています。

## 外側と内側を分けて考える

先ほどの`div`を、一つの箱として見てみます。

- 外側：その箱自身を、周りの要素とどう並べるか。
- 内側：その箱の中身を、どの方式で並べるか。

[![通常フローとinline-blockの外側・内側](../../../07_%E7%94%BB%E5%83%8F/img/html-css/01_08_05_%E9%80%9A%E5%B8%B8%E3%83%95%E3%83%AD%E3%83%BC%E3%81%A8%E5%A4%96%E5%81%B4%E3%81%A8%E5%86%85%E5%81%B4.svg)](../../../07_%E7%94%BB%E5%83%8F/img/html-css/01_08_05_%E9%80%9A%E5%B8%B8%E3%83%95%E3%83%AD%E3%83%BC%E3%81%A8%E5%A4%96%E5%81%B4%E3%81%A8%E5%86%85%E5%81%B4.svg)

`inline-block`は、箱全体を文字と同じ行に置けます。それでも、箱の中では通常フローを使うので、段落を縦に並べられます。

[![inline-blockの中でも子に応じて並び方が変わる](../../../07_%E7%94%BB%E5%83%8F/img/html-css/01_08_05_inline-block%E5%86%85%E3%81%AE%E9%80%9A%E5%B8%B8%E3%83%95%E3%83%AD%E3%83%BC.svg)](../../../07_%E7%94%BB%E5%83%8F/img/html-css/01_08_05_inline-block%E5%86%85%E3%81%AE%E9%80%9A%E5%B8%B8%E3%83%95%E3%83%AD%E3%83%BC.svg)

外側を横並びにすることと、中身を横並びにすることは別なのです。

## 図に出てくるIFC・BFCとは

文字を行に並べるときと、ブロックを縦に並べるときでは、使う配置のルールが違います。

- **IFC（インライン整形コンテキスト）**：文字などを行に並べる場。
- **BFC（ブロック整形コンテキスト）**：ブロックの配置やfloat、margin相殺などを扱う場。

例えば、段落が縦に並ぶのはBFCのルールによるものですが、それぞれの段落の中で文字が行に並ぶのはIFCのルールによるものです。BFCの中にIFCが存在することもあります。

このような配置の場を**整形コンテキスト**と呼びます。FlexやGridにも、それぞれの配置の場があります。

[![IFC・BFC・FFC・GFCの比較](../../../07_%E7%94%BB%E5%83%8F/img/html-css/01_08_05_%E6%95%B4%E5%BD%A2%E3%82%B3%E3%83%B3%E3%83%86%E3%82%AD%E3%82%B9%E3%83%88%E3%81%AE%E6%AF%94%E8%BC%83.svg)](../../../07_%E7%94%BB%E5%83%8F/img/html-css/01_08_05_%E6%95%B4%E5%BD%A2%E3%82%B3%E3%83%B3%E3%83%86%E3%82%AD%E3%82%B9%E3%83%88%E3%81%AE%E6%AF%94%E8%BC%83.svg)

## blockとinline-blockの内側は何が違うのか

どちらも内側は通常フローですが、違いが一つあります。

```css
display: block;        /* block flow */
display: inline-block; /* inline flow-root */
```

普通の`block`は、周りと同じBFCの中で中のブロックを配置します。`inline-block`は、自分の箱の内側に新しいBFCを作ります。

新しいBFCを作っても、文字が行に並び、段落が縦に並ぶことは変わりません。変わるのは、内側と外側のfloatやmarginの関係です。この違いは[flowとflow-rootの記事](../../../03_%E8%A9%B3%E7%B4%B0/01_HTML%E3%83%BBCSS/10_flow%E3%81%A8flow-root%E3%83%BB%E7%8B%AC%E7%AB%8B%E3%81%97%E3%81%9FBFC%E3%82%92%E7%90%86%E8%A7%A3%E3%81%99%E3%82%8B.md)で詳しく確認します。

## inlineとinline-blockの折り返しの違い

普通の`inline`は、内容が行の途中で折り返して、複数の行に分かれることがあります。

`inline-block`は、外側から見ると一つの箱です。行の残り幅に入らず、次の行に入る場合は、箱ごと次の行に移ります。

[![inlineとinline-blockの折り返し](../../../07_%E7%94%BB%E5%83%8F/img/html-css/01_08_05_%E3%82%A4%E3%83%B3%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%AC%E3%83%99%E3%83%AB%E3%81%AE%E7%AE%B1%E3%81%AE%E6%8A%98%E3%82%8A%E8%BF%94%E3%81%97.svg)](../../../07_%E7%94%BB%E5%83%8F/img/html-css/01_08_05_%E3%82%A4%E3%83%B3%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%AC%E3%83%99%E3%83%AB%E3%81%AE%E7%AE%B1%E3%81%AE%E6%8A%98%E3%82%8A%E8%BF%94%E3%81%97.svg)

これを不可分なインラインレベルの箱と呼びます。箱が途中で分かれないという意味で、中の文字まで折り返さないわけではありません。

## displayを外側と内側で読み直す

[![displayの外側と内側の一覧](../../../07_%E7%94%BB%E5%83%8F/img/html-css/01_08_05_display%E3%81%AE%E5%A4%96%E5%81%B4%E3%81%A8%E5%86%85%E5%81%B4%E4%B8%80%E8%A6%A7.svg)](../../../07_%E7%94%BB%E5%83%8F/img/html-css/01_08_05_display%E3%81%AE%E5%A4%96%E5%81%B4%E3%81%A8%E5%86%85%E5%81%B4%E4%B8%80%E8%A6%A7.svg)

例えば、`inline-block`と`inline-flex`は外側が同じで、内側が違います。`flex`と`inline-flex`は内側が同じで、外側が違います。

まず箱自身をどう置きたいか、次に中身をどう並べたいか。この順番で考えると、`display`の値を選びやすくなります。

次は[inline-blockとinline-flexを使い分ける](06_inline-block%E3%81%A8inline-flex%E3%82%92%E4%BD%BF%E3%81%84%E5%88%86%E3%81%91%E3%82%8B.md)で、同じリンクの中身を並べて比較します。

<details>
<summary>補足：blockとinline-blockの図をまとめて見る</summary>

[![3つの配置例をまとめた図](../../../07_%E7%94%BB%E5%83%8F/img/html-css/01_08_05_block%E3%81%A8inline-block%E3%81%AE%E5%86%85%E5%81%B4%E6%AF%94%E8%BC%83.svg)](../../../07_%E7%94%BB%E5%83%8F/img/html-css/01_08_05_block%E3%81%A8inline-block%E3%81%AE%E5%86%85%E5%81%B4%E6%AF%94%E8%BC%83.svg)

</details>

<details>
<summary>補足・参考仕様</summary>

図は横書きの通常フローを前提とした模式図です。`block`だけでは通常、新しいBFCは作りませんが、他の指定や条件によって作る場合があります。Flex・Gridのアイテムやfloat、絶対配置などでは外側の表示型が変わることがあります。

- [CSS Display：外側・内側の表示型](https://www.w3.org/TR/css-display-3/#the-display-properties)
- [CSS 2：通常フロー・BFC・IFC](https://www.w3.org/TR/CSS2/visuren.html#normal-flow)
- [CSS 2：不可分なインラインレベルの箱](https://www.w3.org/TR/CSS2/visuren.html#inline-boxes)

</details>

<!-- GPT一次チャット改訂・簡潔版 -->
