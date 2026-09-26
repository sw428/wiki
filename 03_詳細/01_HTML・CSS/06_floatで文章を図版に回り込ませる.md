# 06_floatで文章を図版に回り込ませる

主な基礎：[通常フローを基準にする](../../02_基礎/01_HTML・CSS/09_レイアウト/02_通常フローを基準にする.md)。floatを新しいページ全体のレイアウト手法ではなく、図版への文章の回り込みと既存実装の保守として扱う。

## 文章を図版の横へ回り込ませる

```html
<article class="article">
  <img class="figure" src="figure.png" alt="説明図">
  <p>図版について説明する文章です。文章が長い場合は、図版の横から下へ続きます。</p>
</article>
```

```css
.figure {
  float: inline-start;
  width: 200px;
  margin-inline-end: 16px;
  margin-block-end: 8px;
}
```

floatされた箱は通常フロー内のblock配置から外れる一方、後続するインライン内容はその側面へ回り込む。

カード一覧、ヘッダー、ページ全体の列組みなど、複数の箱を配置する新規実装にはFlexやGridを使う。

## 親の高さと後続要素を確認する

floatした要素だけが高いと、親の高さへ期待どおり含まれない場合がある。親でfloatを含むblock formatting contextを作る方法として`display: flow-root`を使える。

```css
.article {
  display: flow-root;
}
```

後続blockを先行floatより下へ送る必要がある場合は`clear`を検討する。

```css
.next {
  clear: both;
}
```

## 既存実装を調べる順序

1. どの要素へfloatが指定されているか確認する。
2. どのインライン内容が回り込んでいるか見る。
3. 親の高さと後続blockの位置を確認する。
4. `clear`やclearfix、`flow-root`の役割を特定する。
5. 保守だけでなく構造を変更できる場合は、目的にFlex/Gridが適するか再判断する。

## 一言でいうと

floatは文章を図版へ回り込ませる用途と、既存floatレイアウトの保守で確認する。

## 仕様確認先

- [CSS 2.2: Floats](https://www.w3.org/TR/CSS22/visuren.html#floats)
- [CSS Display Module Level 3: Block Formatting Contexts](https://www.w3.org/TR/css-display-3/#block-formatting-context-root)
