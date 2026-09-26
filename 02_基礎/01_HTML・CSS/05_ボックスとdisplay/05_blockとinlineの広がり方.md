# blockとinlineの広がり方

同じ背景色を付けても、blockとinlineでは横方向の広がり方や寸法指定の働き方が異なる。

## 背景の広がり方を比べる

```html
<div class="block">A</div>
<span class="inline">B</span>
```

```css
.block,
.inline {
  background-color: #dff2ff;
}

.block {
  display: block;
}

.inline {
  display: inline;
}
```

通常フローの非置換blockで `width: auto` の場合、箱は利用可能な横幅を使う。

`display: block` が `width: 100%` を自動で書き足しているわけではない。

一方、通常の[非置換inline](../../../05_参照/非置換inline.md)は文字の流れに入り、横幅は主に内容に沿って決まる。

## inlineではwidthとheightが同じようには働かない

通常の非置換要素が作るinline boxでは、`width` や `height` を指定しても、block boxと同じようには寸法を決められない。

同様に、通常の非置換inlineへ `aspect-ratio` を指定しても、blockと同じようには比率から寸法を決められない。

用途に応じて `block` や `inline-block` などへ変える。

画像や入力欄など、条件の違う要素は[置換要素](../../../05_参照/置換要素（img・input・video）.md)で確認する。画像を比率の枠へ収める実装は[同一比率フレーム型](../12_レスポンシブ画像設計/03_同一比率フレーム型.md)で扱う。

行の高さや文字の揃い方は[08\_インラインと行の仕組み](../08_インラインと行の仕組み/01_文字の行間と高さを確認する.md)で扱う。

次は[要素とCSSの箱の関係](./06_要素とCSSの箱の関係.md)で、HTML要素と画面上の箱がどのようにつながるか確認する。

## 仕様確認先

- [CSS Display Module Level 3 - Box Layout Modes](https://drafts.csswg.org/css-display-3/#intro)
