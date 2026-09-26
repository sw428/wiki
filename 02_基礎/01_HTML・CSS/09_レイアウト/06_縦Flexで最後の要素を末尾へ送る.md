# 06_縦Flexで最後の要素を末尾へ送る

カード本文などで、最後の要素だけを下へ送りたい場合は、縦Flexの主軸上の余りをどこへ配るかを見る。

## 縦Flexで最後の要素を下へ送る

カード本文の中で、メタ情報だけを下へ押し下げる例。

```css
.card__content {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.card__meta {
  margin-top: auto;
  text-align: right;
}
```

- `margin-top: auto`: 主軸の余った空間を上側marginで受け、要素を末尾へ送る
- `text-align: right`: 要素内のインライン内容を右寄せする
- `align-self: flex-end`: Flexアイテムの箱自体を交差軸の末尾へ寄せる

「テキストを寄せる」「アイテムの箱を寄せる」「複数の子を並べる」を同じ操作として扱わない。
