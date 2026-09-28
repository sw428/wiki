# 12_iframeの表示領域を作る

iframeは外部文書やプレイヤーを埋め込む要素である。画像のように中身を`object-fit`で切り抜くのではなく、外側で表示領域を作る。

```html
<div class="movie">
  <iframe
    src="..."
    title="サービス紹介動画"
    allowfullscreen
  ></iframe>
</div>
```

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

`src`には埋め込み用URL、`title`には内容が分かる名前を指定する。`allowfullscreen`や`allow`は埋め込み元の要件を確認して決める。

動画では16:9が候補になることがあるが、地図など別の内容まで同じ比率へ統一しない。

## 仕様確認先

- [HTML Standard - The iframe element](https://html.spec.whatwg.org/dev/iframe-embed-object.html#the-iframe-element)
