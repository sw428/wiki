# 06_nth-childのof-Sで対象を絞って数える

「兄弟要素全体の中で何番目か」ではなく、「特定の条件へ一致する兄弟だけに絞った中で何番目か」を選びたい場合は、Selectors Level 4の`:nth-child(An+B of S)`を使える。

## `of S`を書いた`:nth-child()`は先に対象を絞る

Selectors Level 4には、次の書き方がある。

```css
:nth-child(-n + 2 of .card) {
  grid-column: span 3;
}
```

これは、同じ親を持つ兄弟のうち`.card`へ一致する要素に絞り、その一覧の1〜2番目を選ぶ。次の2つは数え方が違う。

```css
/* 子要素全体の1〜2番目で、かつカード */
.card:nth-child(-n + 2) {}

/* カードへ絞った一覧の1〜2番目 */
:nth-child(-n + 2 of .card) {}
```

この章で「`:nth-child()`は子要素全体を数える」と説明するときは、`of S`を省略した通常形を指す。`of S`を採用する場合は、対象ブラウザーの対応条件も確認する。

## 次に判断すること

順番そのものが仕様なのか、単に「大きいカード」「注目カード」という役割を表したいのかを確認する。役割なら[構造依存から明示クラスへ切り替える](./07_構造依存から明示クラスへ切り替える.md)を検討する。

## 仕様確認先

- [Selectors Level 4 - `:nth-child()`](https://www.w3.org/TR/selectors-4/#the-nth-child-pseudo)
