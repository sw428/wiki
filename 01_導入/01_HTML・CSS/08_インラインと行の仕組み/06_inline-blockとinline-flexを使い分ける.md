# inline-blockとinline-flexを使い分ける

文章の中に、矢印の画像と「詳しく見る」という文字を含むリンクを置きたいとします。

`inline-block`でも`inline-flex`でも、リンクを文章と同じ行に置けます。では、何が違うのでしょうか。

同じHTMLを使って、リンクの中身の並び方を比べます。

```html
<a class="link" href="#detail">
  <img src="arrow.svg" alt="">
  <span>詳しく見る</span>
</a>
```

## inline-blockでは、画像と文字が行に並ぶ

```css
.link {
  display: inline-block;
}
```

[![inline-blockの外側と内側](../../../07_%E7%94%BB%E5%83%8F/img/html-css/01_08_06_inline-block%E3%81%AE%E5%A4%96%E5%81%B4%E3%81%A8%E5%86%85%E5%81%B4.svg)](../../../07_%E7%94%BB%E5%83%8F/img/html-css/01_08_06_inline-block%E3%81%AE%E5%A4%96%E5%81%B4%E3%81%A8%E5%86%85%E5%81%B4.svg)

リンク全体は、前後の文字と同じ行に置かれます。

リンクの中でも、画像と文字が普通の文章のように一つの行に並びます。この例では、画像もインラインレベルのままです。

この並べ方では、行のベースラインが揃える基準になり、HTMLの改行や空白も間隔として現れることがあります。

## inline-flexでは、画像と文字を別々の箱として並べる

HTMLはそのままで、`display`だけを変えます。

```css
.link {
  display: inline-flex;
}
```

リンク全体は、引き続き前後の文字と同じ行に置けます。

変わるのは中身です。画像と`span`はそれぞれFlexアイテムになり、HTMLの空白だけの部分はアイテムとして表示されません。

ここで、二つの箱の中心と間隔を揃えてみます。

```css
.link {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}
```

[![inline-flexの外側と内側](../../../07_%E7%94%BB%E5%83%8F/img/html-css/01_08_06_inline-flex%E3%81%AE%E5%A4%96%E5%81%B4%E3%81%A8%E5%86%85%E5%81%B4.svg)](../../../07_%E7%94%BB%E5%83%8F/img/html-css/01_08_06_inline-flex%E3%81%AE%E5%A4%96%E5%81%B4%E3%81%A8%E5%86%85%E5%81%B4.svg)

`align-items: center`で画像と文字の箱の縦方向の中心を揃え、`gap`でその間を10px空けています。

## 何を変えたのか、図で見直す

[![通常の行、Flexへの変更、中心と間隔の指定](../../../07_%E7%94%BB%E5%83%8F/img/html-css/01_08_06_%E8%A1%8C%E3%81%A8Flex%E3%81%AE%E4%B8%AD%E8%BA%AB%E3%81%AE%E6%AF%94%E8%BC%83.svg)](../../../07_%E7%94%BB%E5%83%8F/img/html-css/01_08_06_%E8%A1%8C%E3%81%A8Flex%E3%81%AE%E4%B8%AD%E8%BA%AB%E3%81%AE%E6%AF%94%E8%BC%83.svg)

AからBでは、通常の行からFlexの並べ方に変わりました。BからCでは、中心と間隔を指定しました。

`inline-flex`に変えただけで、中心や間隔まで揃うわけではないことも分かります。

```css
display: inline-block; /* inline flow-root */
display: inline-flex;  /* inline flex */
```

**どちらも外側はinlineですが、中身の並べ方が違います。**

普通の行として中身を並べたいときは`inline-block`、画像と文字の箱の位置や間隔を調整したいときは`inline-flex`が候補になります。

外側と内側については[displayの外側と内側](05_block%E3%83%BBinline-block%E3%81%AE%E5%A4%96%E5%81%B4%E3%81%A8%E5%86%85%E5%81%B4%E3%82%92%E7%90%86%E8%A7%A3%E3%81%99%E3%82%8B.md)で確認できます。次は[flowとflow-rootの違い](../../../03_%E8%A9%B3%E7%B4%B0/01_HTML%E3%83%BBCSS/10_flow%E3%81%A8flow-root%E3%83%BB%E7%8B%AC%E7%AB%8B%E3%81%97%E3%81%9FBFC%E3%82%92%E7%90%86%E8%A7%A3%E3%81%99%E3%82%8B.md)で、通常フローの内側を独立させる意味を見ていきます。

<details>
<summary>補足・参考仕様</summary>

この例の`inline-block`では画像を`display: block`にする共通CSSを適用していません。図は横書きの模式図です。実装時は画像とリンク先を用意し、画像の大きさを必要に応じて設定します。

- [CSS Display：inline-blockとinline-flex](https://www.w3.org/TR/css-display-3/#the-display-properties)
- [CSS Flexible Box Layout：Flexアイテム](https://www.w3.org/TR/css-flexbox-1/#flex-items)

</details>

<!-- GPT一次チャット改訂・簡潔版 -->
