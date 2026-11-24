# flowとflow-root・独立したBFCを理解する

`display: block`と`display: flow-root`は、どちらも文字を行に並べたり、段落を縦に並べたりできます。

並べ方が同じなら、なぜ`flow-root`が必要なのでしょうか。

## floatした画像が、外側の文章にも影響する

画像を左に寄せ、その横に短い文章を置くために`float`を使った場合を考えます。

```html
<div class="parent">
  <img src="photo.jpg" alt="">
  短い文章
</div>
<p>テキスト</p>
```

```css
.parent img {
  float: left;
  width: 120px;
}
```

[![floatが親の高さからはみ出す場合とflow-rootの比較](../../07_%E7%94%BB%E5%83%8F/img/html-css/03_01_10_float%E3%81%A8%E8%A6%AA%E3%81%AE%E8%87%AA%E5%8B%95%E9%AB%98%E3%81%95.svg)](../../07_%E7%94%BB%E5%83%8F/img/html-css/03_01_10_float%E3%81%A8%E8%A6%AA%E3%81%AE%E8%87%AA%E5%8B%95%E9%AB%98%E3%81%95.svg)

左の図では、画像よりも先に親の箱が終わり、外側の文章まで画像の横に回り込んでいます。

普通のブロックでは、floatした画像の高さが親の自動高さに直接含まれないためです。内側の画像と外側の文章も、同じBFCの中で配置されています。

ここで、親に次の指定を追加します。

```css
.parent {
  display: flow-root;
}
```

右の図では、親の箱が画像の高さまで広がり、外側の文章は箱の下に置かれます。

親の中の回り込みは残したまま、外側への回り込みだけを防げました。

## 子のmarginが、親の外側に現れることもある

今度は画像を使わず、親の中の子に`margin-top`を指定します。

```html
<div class="parent">
  <div class="child">子要素</div>
</div>
```

```css
.child {
  margin-top: 20px;
}
```

[![子の上marginが親の外側に現れる場合とflow-rootの比較](../../07_%E7%94%BB%E5%83%8F/img/html-css/03_01_10_%E8%A6%AA%E5%AD%90%E3%81%AEmargin%E7%9B%B8%E6%AE%BA%E3%81%A8flow-root.svg)](../../07_%E7%94%BB%E5%83%8F/img/html-css/03_01_10_%E8%A6%AA%E5%AD%90%E3%81%AEmargin%E7%9B%B8%E6%AE%BA%E3%81%A8flow-root.svg)

左の図では、子に指定した余白が親の外側に現れています。親の上にborderやpaddingがないなど、条件がそろうと、親と子のmarginが相殺されるためです。

ここでも、親に`display: flow-root`を指定します。

右の図では、親と子のmarginが相殺されなくなり、子の上marginは親の内側に残ります。

## 二つの例で、何が変わったのか

floatの例でもmarginの例でも、中身の並べ方そのものは変えていません。

[![flowとflow-rootのBFCの境界の違い](../../07_%E7%94%BB%E5%83%8F/img/html-css/03_01_10_flow%E3%81%A8flow-root%E3%81%AE%E5%A2%83%E7%95%8C.svg)](../../07_%E7%94%BB%E5%83%8F/img/html-css/03_01_10_flow%E3%81%A8flow-root%E3%81%AE%E5%A2%83%E7%95%8C.svg)

普通の`block`では、親と中のブロックが外側から続くBFCの中で配置されます。

`flow-root`では、親の箱の中に新しいBFCを作ります。すると、内側のfloatは親の自動高さに含まれ、親と子のmarginも境界をまたいで相殺されなくなります。

このように、**通常フローの並べ方を保ったまま、内側に独立したBFCを作る**のが`flow-root`です。親の箱自身は、これまでと同じように外側の要素と並びます。

```css
display: block;     /* block flow */
display: flow-root; /* block flow-root */
```

`inline-block`の内側も`flow-root`です。[最初の記事](../../01_%E5%B0%8E%E5%85%A5/01_HTML%E3%83%BBCSS/08_%E3%82%A4%E3%83%B3%E3%83%A9%E3%82%A4%E3%83%B3%E3%81%A8%E8%A1%8C%E3%81%AE%E4%BB%95%E7%B5%84%E3%81%BF/05_block%E3%83%BBinline-block%E3%81%AE%E5%A4%96%E5%81%B4%E3%81%A8%E5%86%85%E5%81%B4%E3%82%92%E7%90%86%E8%A7%A3%E3%81%99%E3%82%8B.md)にあった独立したBFCの境界も、今回と同じ意味を持ちます。

## FlexやGridとの違い

[![flow-root・flex・gridの違い](../../07_%E7%94%BB%E5%83%8F/img/html-css/03_01_10_flow-root%E3%81%A8Flex%E3%81%A8Grid%E3%81%AE%E6%AF%94%E8%BC%83.svg)](../../07_%E7%94%BB%E5%83%8F/img/html-css/03_01_10_flow-root%E3%81%A8Flex%E3%81%A8Grid%E3%81%AE%E6%AF%94%E8%BC%83.svg)

`flex`や`grid`も内側に独自の配置の場を作りますが、中身の並べ方も変わります。

中身の並べ方を変えず、floatや親子のmargin相殺の問題に対応したいなら`flow-root`が候補になります。箱を整列させたいならFlex、行と列を使いたいならGridが候補になります。

<details>
<summary>補足・参考仕様</summary>

- floatの例は親の高さが自動の場合です。固定した`height`まで広げるわけではありません。
- `flow-root`で親子のmargin相殺を防いでも、内側の通常フローの兄弟同士は条件によって相殺されます。
- `display: block`でも他の指定や条件で新しいBFCを作る場合があります。Gridの例では`subgrid`を扱っていません。

参考仕様：

- [CSS Display：flow・flow-root・flex・grid](https://www.w3.org/TR/css-display-3/#inner-model)
- [CSS 2：BFCの自動高さ](https://www.w3.org/TR/CSS2/visudet.html#root-height)
- [CSS 2：margin相殺](https://www.w3.org/TR/CSS2/box.html#collapsing-margins)
- [CSS Grid Layout：Gridコンテナ](https://www.w3.org/TR/css-grid-1/#grid-containers)

</details>

<!-- GPT一次チャット改訂・簡潔版 -->
