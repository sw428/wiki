# 04_ステップ番号をHTMLとCSSで分ける

順序のある手順はHTMLで順序を表し、装飾番号だけをCSSへ任せる。

```html
<ol class="steps">
  <li class="step">ログインする</li>
  <li class="step">投稿を追加する</li>
  <li class="step">公開する</li>
</ol>
```

```css
.steps {
  counter-reset: step;
  list-style: none;
}

.step {
  counter-increment: step;
}

.step::before {
  content: counter(step, decimal-leading-zero) ".";
}
```

- 意味として順序がある: `ol`
- 装飾番号を自動更新したい: CSSカウンター
- 通常のリストマーカーで足りる: 疑似要素を増やさない

`counter-reset`で親にカウンターを用意し、`counter-increment`で項目ごとに進め、`counter()`で現在値を表示する。`decimal-leading-zero`なら、1桁だけを`01`、`02`のようにできるため、桁数を`:nth-of-type()`で判定する必要がない。

生成番号だけへ意味を任せず、HTMLでも順序を保持する。

## 仕様確認先

- [CSS Lists and Counters Module Level 3 - Automatic Numbering With Counters](https://www.w3.org/TR/css-lists-3/#auto-numbering)
- [CSS Counter Styles Level 3 - decimal-leading-zero](https://www.w3.org/TR/css-counter-styles-3/#decimal-leading-zero)
