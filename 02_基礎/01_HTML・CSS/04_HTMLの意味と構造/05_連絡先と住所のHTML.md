# 05_連絡先と住所のHTML

連絡先をまとめるaddressと、その中を区切るリスト・改行・段落を分けて選ぶ。住所らしい文字があるだけでaddressにするわけではない。

要素選びの基本は[意味からHTML要素を選ぶ](./01_意味からHTML要素を選ぶ.md)。

## `div / section / address / ul` の最小判断

連絡先カードで迷いやすい組み合わせを、次の順で判定する。

1. その箱はページの「章」か  
   章なら `section`、ただの配置箱なら `div`。
2. 中身は連絡先情報か  
   ページ全体または最も近いarticleの連絡先ならaddressを候補にする。単に所在地に言及する文章は、その文脈で選ぶ。
3. 同じ種類の項目が反復しているか  
   反復しているなら `ul > li` を優先。

実務で多い形:

```html
<div class="contact-info">
  <address class="contact-info__body">
    <ul class="contact-info__list">
      <li class="contact-info__item">...</li>
    </ul>
  </address>
</div>
```

補足:
- `section` を使うなら、基本は見出しをセットで持たせる。
- `address` はブラウザ初期で斜体になることがあるため、`font-style: normal;` で戻す。

### `address` 内の `br` と `p`

`address` は、最も近い `article` または `body` に対する連絡先情報であることを示す要素であり、住所の各行を自動で意味分けする要素ではない。

| 要素 | 意味 | 住所内での使いどころ |
|---|---|---|
| `br` | 同じ内容の中の改行 | 1つの所在地を、郵便番号・住所・建物名などで改行する |
| `p` | 1つの段落 | 内容として別の段落へ分ける理由がある |

`br` は、住所や詩など、改行自体が内容の一部である場合に使う。カンプ上の幅で文章が折り返されているだけなら、HTMLへ `br` を固定せず、通常の折り返しとCSS上の幅に任せる。

```html
<address class="contact-info__address">
  〒000-0000<br>
  東京都○○区○○0-0-0<br>
  ○○ビル3階
</address>
```

見た目を1行ずつにしたいだけなら、各行を機械的に `p` へ分けない。反対に、独立した文章や段落として扱うなら `p` を使う。`p` の既定マージンは表示上の初期値なので、要素選択の理由にはせずCSSで調整する。

また、郵便上の住所なら常に `address` になるわけではない。ページ全体または記事の連絡先である場合に使い、単に本文中で所在地を示すだけなら文脈に合う通常の段落などを選ぶ。

仕様確認先:

- [HTML Standard - `address` element](https://html.spec.whatwg.org/multipage/sections.html#the-address-element)
- [HTML Standard - `br` element](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-br-element)
- [HTML Standard - `p` element](https://html.spec.whatwg.org/multipage/grouping-content.html#the-p-element)
