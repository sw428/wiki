# 03_void要素と置換要素を区別する

`img`には終了タグがなく、画像として表示される。この2つの特徴は、同じ分類から生まれるものではない。

| 分類 | 答える疑問 |
| --- | --- |
| void要素 | HTML構文で終了タグや子の内容を持つか |
| 置換要素 | CSSの整形モデルが要素の内容を通常どおり扱うか |

## void要素は終了タグを持たない

void要素は、HTML構文で内容と終了タグを持たない要素。代表例には`img`、`input`、`br`、`hr`、`meta`、`link`がある。

```html
<img src="photo.jpg" alt="作業画面">
<input type="text">
<br>
```

HTMLでは、次の末尾の`/`は要素を閉じる働きをしない。

```html
<img src="photo.jpg" alt="作業画面" />
```

void要素ではこの書き方も許容されるが、`/`は不要で効果がない。引用符のない属性値の直後へ空白なしで書くと`/`が属性値の一部になる場合もあるため、このWikiの基本例では末尾の`/`を付けない。

## 置換要素は内容がCSSの整形モデルの外側にある

置換要素は、画像や埋め込み文書のように、表示される内容がCSSの通常の整形モデルの外側にある要素。

たとえば、画像を表している`img`では、HTML内の子テキストを表示するのではなく、`src`で参照した画像が内容になる。

```html
<img src="photo.jpg" alt="作業画面">
```

```css
img {
  width: 100%;
  height: auto;
}
```

HTML Standardでは、`audio`、`canvas`、`embed`、`iframe`、`img`、`input`、`object`、`video`は置換要素になり得る。すべてが無条件に同じ扱いになるわけではない。たとえば`canvas`や`object`は現在表している内容で扱いが変わり、`img`も画像を表せない場合の代替表示によって非置換要素として扱われることがある。

最初は、正常に読み込まれた`img`を代表例として捉えればよい。個々の要素の例外は、その要素を実装するときに確認する。

## 二つの分類は重なることがある

| 要素 | void要素 | 置換要素としての扱い |
| --- | --- | --- |
| `img` | はい | 画像を表す場合は、はい |
| `br` | はい | いいえ |
| `video` | いいえ | はい |
| `div` | いいえ | いいえ |

`img`はvoid要素であり、画像を表すときは置換要素でもある。`video`は置換要素として扱われるが、子に`source`や代替内容を書けるためvoid要素ではない。

この区別により、終了タグの書き方を確認したいのか、画像や動画の寸法・比率を確認したいのかを分けられる。画像の表示寸法は[画像を自然な比率で表示する](../11_メディア設計/01_レスポンシブ画像設計/02_自然比率維持型.md)、動画は[動画を比率の枠へ収める](../11_メディア設計/04_動画を比率の枠へ収める.md)へ進む。

## 一言でいうと

void要素はHTMLの書き方、置換要素は表示内容とCSSの扱いに関する分類であり、同じ意味ではない。

## 仕様確認先

- [HTML Standard - Elements](https://html.spec.whatwg.org/multipage/syntax.html#elements-2)
- [HTML Standard - Start tags](https://html.spec.whatwg.org/multipage/syntax.html#start-tags)
- [HTML Standard - Replaced elements](https://html.spec.whatwg.org/multipage/rendering.html#replaced-elements)
- [CSS Display Module Level 4 - Replaced element](https://www.w3.org/TR/css-display-4/#replaced-element)
