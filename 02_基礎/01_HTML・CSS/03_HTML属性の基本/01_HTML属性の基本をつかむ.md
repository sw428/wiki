# 01_HTML属性の基本をつかむ

HTML属性は、要素へ情報・状態・参照先・関係などを追加する。

```html
<a href="/about/">会社概要</a>
<input type="email" required>
<button class="button" aria-expanded="false">メニュー</button>
```

同じ`属性名="属性値"`という形でも、属性ごとに役割は異なる。

- `href`は移動先を指定する
- `type`は要素の種類や動作を指定する
- `required`は入力を必須状態にする
- `class`は要素を分類する
- `aria-expanded`は開閉状態を支援技術へ伝える

## 属性は役割から読む

属性を見たときは、名前だけを覚えるのではなく、

> この属性は、この要素へ何を追加しているのか

を確認する。

| 属性の役割 | 例 | 主に確認すること |
| --- | --- | --- |
| 参照先 | `href`、`src` | どこを参照するか |
| 識別・分類 | `id`、`class` | 一つを識別するか、複数を分類するか |
| 状態 | `required`、`disabled`、`aria-expanded` | どの状態を表しているか |
| 入力・動作 | `type`、`autocomplete`、`contenteditable` | 要素の入力や動作をどう指定するか |
| 名前・関係 | `for`、`aria-labelledby`、`aria-controls` | どの要素と関係しているか |
| ページ固有のデータ | `data-*` | 制作側で使う独自データか |

## 属性ごとに規則が違う

属性はすべて同じ方法で扱うわけではない。

たとえば、

```html
<input required>
```

の`required`は、属性が存在すること自体に意味がある。

一方、

```html
<input type="email">
```

の`type`は、指定した値によって意味が変わる。

そのため属性を使うときは、

1. 何のための属性か
2. その要素で使えるか
3. どのような値を取るか
4. 省略した場合にどうなるか

を必要に応じて確認する。

## 標準の属性を優先する

HTMLには、要素の意味や状態を表すための属性があらかじめ用意されている。

標準属性で表せる意味や状態を、`class`の名前や`data-*`だけで表したつもりにしない。

```html
<input required>
```

のようにHTML標準で表せる状態は、その属性を使う。

`class`は要素の分類、`data-*`はページ固有のデータを制作側で扱うために使う。それだけでHTML標準の意味や動作が追加されるわけではない。

## `style`属性

`style`属性を使うと、要素へCSSを直接指定できる。

```html
<p style="color: red;">注意</p>
```

要素ごとに変わる値を出力する場合や、小さな検証で直接指定を試す場合には使うことがある。

ただし、繰り返し使う見た目は通常、`class`とCSSファイルで管理する。

詳しい採用判断は[BEMとクラス命名](../../07_設計/CSS設計/01_BEMとクラス命名.md)、指定が競合したときの確認は[カスケード全体の優先順位](../06_CSSカスケードとDevToolsの見方/03_カスケード全体の優先順位.md)で扱う。

## 次に読む

- 属性名と属性値そのものの書き方 → [属性名と属性値の構文を読む](./02_属性名と属性値の構文を読む.md)
- `id`と`class`の違い → [idとclassを使い分ける](./03_idとclassを使い分ける.md)
- 属性の有無と値による状態の違い → [ブール属性と列挙型属性を区別する](./04_ブール属性と列挙型属性を区別する.md)
- アクセシビリティ情報 → [roleとARIA属性で意味と状態を補う](./05_roleとARIA属性で意味と状態を補う.md)
- 独自データ → [data属性に独自データを持たせる](./06_data属性に独自データを持たせる.md)
- キーボードフォーカス → [tabindexとフォーカス順を扱う](./07_tabindexとフォーカス順を扱う.md)

## 一言でいうと

HTML属性は要素へ情報を追加するものであり、属性名を暗記するのではなく、その属性が何を追加しているかから読む。

## 仕様確認先

- [HTML Standard - Attributes](https://html.spec.whatwg.org/multipage/syntax.html#attributes-2)
- [HTML Standard - Global attributes](https://html.spec.whatwg.org/multipage/dom.html#global-attributes)
- [HTML Standard - Boolean attributes](https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#boolean-attributes)
