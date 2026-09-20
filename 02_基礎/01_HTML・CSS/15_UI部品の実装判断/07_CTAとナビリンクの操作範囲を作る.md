# 07_CTAとナビリンクの操作範囲を作る

CTAやナビゲーションでは、文字の見た目だけでなく、リンクやボタン自身の操作範囲を作る。周囲の余白を広げても、クリックできる要素が文字の大きさのままなら操作範囲は広がらない。

## CTAボタンの基本形

```css
.cta-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding-inline: 24px;
  gap: 8px;
  border-radius: 999px;
}
```

- 操作範囲: リンクやボタン自身の`min-height`と`padding`
- 内容の中央寄せ: `inline-flex`
- 文字とアイコンの間隔: `gap`
- 横幅: 内容幅、固定幅、親幅いっぱいのどれかを用途から選ぶ

`48px`はこの例で採用した設計値であり、WCAGの一律の合格値ではない。WCAG 2.2のTarget Size (Minimum)は原則24×24 CSS pxを基準とし、間隔などの例外も含む。対象サイズだけでなく、隣接する操作対象との距離や、案件のアクセシビリティ要件を確認する。

文字が変わる場合は、固定`width`より`padding`と`min-height`を先に使う。デザイン上すべての横幅をそろえる必要があるときだけ`width`や`min-width`を追加する。

## 同じボタンか差分かを判断する

文言、リンク先、置き場所だけが違い、サイズ感・色・hover・角丸が同じなら、同じ部品として扱いやすい。

```html
<a class="c-button" href="#">詳しく見る</a>
<a class="c-button" href="#">View More</a>
<a class="c-button" href="#">お問い合わせ</a>
```

色やサイズだけが違う場合は、別部品を作る前にmodifierで表せるか確認する。

```html
<a class="c-button" href="#">詳しく見る</a>
<a class="c-button c-button--white" href="#">詳しく見る</a>
<a class="c-button c-button--small" href="#">詳しく見る</a>
<button class="c-button c-button--submit" type="submit">送信する</button>
```

- 同じ土台: 共通クラス
- 色やサイズの差分: modifier
- 役割や内部構造が違う: 別コンポーネント
- そのページだけの余白や配置: ページ・レイアウト側

共通化を確定する前は、「何度も出るか」「差分だけか」「ページ固有か」をメモする。採用する命名は[BEMとクラス命名](../../07_設計/CSS設計/01_BEMとクラス命名.md)で決める。

```markdown
## 共通化できそうなもの

- 通常ボタン: c-button
- 白背景ボタン: c-button c-button--white
- 小さいボタン: c-button c-button--small
- 記事カード: c-card
- セクション見出し: c-section-title
```

この段階では設計を確定せず、カンプ内で同じ核が繰り返されるかを見えるようにする。

## ナビゲーションのリンク面を広げる

```html
<li class="global-nav__item">
  <a class="global-nav__link" href="/">トップ</a>
</li>
```

```css
.global-nav__item {
  border-inline-start: 1px solid #ccc;
}

.global-nav__link {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding-inline: 32px;
}
```

リンク自身へ`padding`と`min-height`を持たせると、文字の周囲も操作できる。`text-align`は主にインライン内容の横位置を扱い、縦中央や操作範囲を作る指定ではない。

区切り線、ナビ全体の外側余白、各リンクの操作範囲は別の責務として扱う。リンクかボタンかの選択は[リンクとボタンは押した結果で分ける](../04_HTMLの意味と構造/01_意味からHTML要素を選ぶ.md#リンクとボタンは押した結果で分ける)で確認する。

## 仕様・基準で確認する

- [WCAG 2.2 - Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum)

## 一言でいうと

見た目の余白ではなく、`a`や`button`自身へ高さとpaddingを持たせ、文字の周囲まで操作範囲にする。
