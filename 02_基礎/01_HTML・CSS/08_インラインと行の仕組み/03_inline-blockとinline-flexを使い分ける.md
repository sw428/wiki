# 03_inline-blockとinline-flexを使い分ける

`inline-block`と `inline-flex`は、どちらも文章の流れに置ける箱を作れる。違いは、箱の中身をFlexで並べる必要があるかで判断する。

## displayは指定、boxは結果

`display`は、要素が外側と内側でどのようなレイアウトに参加するかを指定するプロパティである。boxは、その指定などをもとに表示用に作られる箱である。

```text
要素へdisplayを指定する
→ 表示と配置に使う箱が作られる
→ Layoutで箱の寸法と位置が決まる
```

`display`とboxを同じ言葉として扱わず、指定と結果として分ける。詳しい関係は[要素とCSSの箱の関係](../05_ボックスとdisplay/06_要素とCSSの箱の関係.md)で確認できる。

## 文字だけの小さな箱ならinline-block

`inline-block`は、外側では行内の流れに参加し、内側では幅・高さ・paddingを持つ箱として扱える。

通常フローの非置換`inline-block`で`width: auto`のときは、通常ブロックのように利用可能幅へ一律に広がらず、内容に必要な幅と利用可能幅から収まる幅が決まる。そのため内容に沿った幅に見えやすいが、`auto`自体を「内容幅」という固定の意味では扱わない。

```html
<a class="button" href="#">View Recipe</a>
```

```css
.button {
  display: inline-block;
  padding: 18px 60px;
  border: 1px solid #2b2a27;
  text-decoration: none;
}
```

文字一つとpaddingでボタン面積を作るなら、`inline-block`で足りる。中に並べる複数の子要素がない場合、Flexを使う理由はまだない。

## 文字とアイコンを並べるならinline-flex

`inline-flex`は、外側では行内の流れに参加し、内側では子要素をFlexの規則で並べる。

```html
<a class="button" href="#">
  <span class="button__text">View Recipe</span>
  <span class="button__icon" aria-hidden="true">→</span>
</a>
```

```css
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 18px 60px;
  border: 1px solid #2b2a27;
  text-decoration: none;
}
```

`gap`で子要素間の距離を作り、`align-items`で文字とアイコンの縦位置をそろえられる。

| 中身 | 選択の目安 |
| --- | --- |
| 文字だけ | `inline-block`で足りることが多い |
| 文字と矢印・アイコン | `inline-flex`で内部を並べやすい |
| 独立したCTA | 中身と整列方法に合わせて選ぶ |

ボタン面積はまずpaddingで作り、最低寸法が必要な場合に `min-width`や `min-height`を加える。固定した `width`や `height`は、文字変更や折り返しに弱くなるため要件を確認して使う。

## 疑似要素もpaddingの内側に入る

```css
.button {
  display: inline-flex;
  align-items: center;
  gap: 18px;
  padding-inline: 20px 16px;
}

.button::after {
  content: ">";
}
```

`::after`は元の要素の中に生成されるため、この例ではpaddingの内側へ配置される。

```text
[左padding][文字][gap][::after][右padding]
```

単純な文字記号なら疑似要素で表せる。SVG画像を使う場合や、独立した意味・細かな寸法調整が必要な場合は実要素も検討する。具体的な判断は[CTAとナビリンクの操作範囲](../15_UI部品の実装判断/07_CTAとナビリンクの操作範囲を作る.md)と[装飾アイコンとラベル](../15_UI部品の実装判断/09_装飾アイコンとラベルを小さな部品として扱う.md)へ進む。
