# 05_Consoleで表示を測る

カンプとブラウザの差を調べるとき、DevToolsのConsoleで、選んだ要素の箱・CSSの値・表示条件を数値で確認できる。まずElementsで対象を選ぶ。Consoleの`$0`は、そのとき選択している要素を指す。

独立した式が複数行並ぶ例は、一行ずつ実行する。まとめて実行すると最後の式の結果だけが表示される。`(() => { ... })()`のように一つの式にまとめた例は、ブロック全体を実行する。

## まず使う5つ

```js
window.innerWidth
$0.getBoundingClientRect()
getComputedStyle($0).lineHeight
$0.naturalWidth
$0.getBoundingClientRect().top + window.scrollY
```

上から、viewport幅、要素の位置と外寸、`line-height`の値、画像の自然幅、文書上端からの位置を確認する。`naturalWidth`は`$0`が`img`の場合に使う。`line-height`が`normal`なら、取得結果も`normal`となり得るため、これだけで行の高さを数値として確定しない。

## viewportの幅と高さを確認する

```js
window.innerWidth
document.documentElement.clientWidth
window.innerWidth - document.documentElement.clientWidth
window.innerHeight
```

`innerWidth`は縦スクロールバーを含むviewport幅、`documentElement.clientWidth`はそれを含まない文書の表示幅を確認する。差が0以外なら、縦スクロールバーが幅を占めている可能性がある。環境によってはスクロールバーが幅を占めず、差は0になる。ズーム中はviewportをCSS pxで測った値も変わり得るので、カンプと比較する前に表示条件をそろえる。

## 選んだ要素と隣の要素を測る

```js
$0.getBoundingClientRect()
```

返る`top`・`bottom`・`left`・`right`はviewport基準の座標、`width`・`height`は要素の外接矩形の大きさである。通常の箱ではpaddingとborderを含む。`transform`の結果も反映するため、CSSに書いた`width`やDevToolsのBox Modelと常に同じ値にはならない。

親と最初の子を比べる場合は、親を選んで次を使う。

```js
({
  parent: $0.getBoundingClientRect().height,
  child: $0.firstElementChild?.getBoundingClientRect().height
})
```

子がなければ`child`は`undefined`になる。画像を包む見出しなどで、親の箱と画像の箱を区別するために使える。親そのものを測るなら`$0.parentElement?.getBoundingClientRect()`を使う。

二つの要素の縦方向の間隔は、同じviewport基準の座標を引いて調べる。

```js
(() => {
  const a = document.querySelector(".title")?.getBoundingClientRect();
  const b = document.querySelector(".text")?.getBoundingClientRect();
  return a && b ? b.top - a.bottom : "対象が見つからない";
})()
```

`.title`が`.text`より前に並ぶ場合、結果が正なら二つの外接矩形の間に空きがあり、負なら座標上は重なっている。横方向なら式を`b.left - a.right`に替える。セレクタに一致する要素がない場合はメッセージが返るため、対象を確認する。特定の要素を直接選ぶ場合は`document.querySelector(".title")?.getBoundingClientRect()`を使う。

現在のスクロール位置は`window.scrollY`で確認する。通常フローの要素についてviewport基準の`top`を文書上端基準に直すなら、次のように足す。横方向なら`left + window.scrollX`を使う。

```js
$0.getBoundingClientRect().top + window.scrollY
```

## 適用されたCSSの値を確認する

```js
getComputedStyle($0).lineHeight
getComputedStyle($0).fontSize
getComputedStyle($0).fontFamily
getComputedStyle($0).fontWeight
getComputedStyle($0).display
```

`getComputedStyle($0)`で値をまとめて調べることもできるが、情報量が多い。余白と箱の指定を見たい場合は、必要な値だけ取り出す。

```js
(() => {
  const s = getComputedStyle($0);
  return {
    width: s.width,
    height: s.height,
    boxSizing: s.boxSizing,
    margin: [s.marginTop, s.marginRight, s.marginBottom, s.marginLeft],
    padding: [s.paddingTop, s.paddingRight, s.paddingBottom, s.paddingLeft],
    border: [s.borderTopWidth, s.borderRightWidth, s.borderBottomWidth, s.borderLeftWidth]
  };
})()
```

配列の順は上・右・下・左。これはCSSの値を調べる方法で、要素間の画面上の距離や`transform`後の寸法そのものを返すわけではない。指定の出所や上書きは[DevToolsで適用されたCSSを確認する](./01_DevToolsで適用されたCSSを確認する.md)、測った寸法の読み方は[DevToolsで計算後の寸法を確認する](../07_ブラウザ挙動と表示のズレ/05_DevToolsで計算後の寸法を確認する.md)で扱う。

## 画像自身の幅と表示された幅を分ける

`img`を選んでから実行する。

```js
({
  natural: [$0.naturalWidth, $0.naturalHeight],
  rendered: [
    $0.getBoundingClientRect().width,
    $0.getBoundingClientRect().height
  ]
})
```

`naturalWidth`と`naturalHeight`は、密度補正後の画像の自然寸法をCSS pxで返す。元ファイルのピクセル寸法と常に一致するわけではなく、画像が利用できないときは0になる。`rendered`は現在の画像要素の外接矩形で、画像内容の見えている部分だけの大きさではない。

幅の比率を見るなら`$0.getBoundingClientRect().width / $0.naturalWidth`で計算できる。ただし、これは外接矩形と密度補正後の自然幅の比である。`transform`やborderなどがあれば単純な「元画像を何%で表示したか」にはならない。候補画像から実際に選ばれたURLは`$0.currentSrc`で確認する。

## 確認すること

1. `$0`が測りたい要素か確認する。
2. CSSの指定値、要素の外接矩形、画像の自然寸法を混同しない。
3. 二つの要素を引き算するときは、同じviewport基準の座標を使う。

## 仕様確認先

- [MDN: `getBoundingClientRect()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect)
- [MDN: `naturalWidth`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/naturalWidth)
- [MDN: Viewport concepts](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/CSSOM_view/Viewport_concepts)
