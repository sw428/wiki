# 05_Flexで子の位置を揃える

Flexで位置を調整するときは、最初に主軸と交差軸を決める。横・縦という言葉だけでプロパティを選ぶと、`flex-direction`を変えたときに関係が逆になる。

## 主軸と交差軸を決める

| 指定 | 主軸 | 交差軸 |
| --- | --- | --- |
| `flex-direction: row` | 横 | 縦 |
| `flex-direction: column` | 縦 | 横 |

- `justify-content`：主軸方向の余った空間を配る
- `align-items`：交差軸方向でアイテムを揃える
- `align-self`：一つのアイテムだけ交差軸方向の揃え方を変える

```css
.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

この例では主軸が横なので、`justify-content`は左右の空間、`align-items`は縦方向の揃え方に作用する。

## stretchによる寸法変化を区別する

Flexboxの`align-items`の初期値は`stretch`。交差軸方向のサイズが`auto`で、min/maxサイズなどに制限されなければ、アイテムは交差軸方向へ伸びる。

`display: flex`へ変えただけで高さが揃った場合は、画像比率を直したのではなく、stretchによってアイテムの箱が伸びた可能性がある。画像の収め方は[同一比率フレーム型](../12_レスポンシブ画像設計/03_同一比率フレーム型.md)で別に確認する。

## auto marginで一つの子を端へ送る

縦Flexのカードで、メタ情報だけを下へ送る例。

```css
.card {
  min-height: 240px;
  display: flex;
  flex-direction: column;
}

.meta {
  margin-block-start: auto;
}
```

`margin-block-start: auto`が主軸方向の余った空間を受け取るため、`.meta`が末尾へ送られる。

同じ「右や下へ寄せる」でも、対象によって指定が違う。

| 動かしたい対象 | 確認する指定 |
| --- | --- |
| 複数のFlexアイテム全体 | `justify-content` / `align-items` |
| 一つのFlexアイテム | auto margin / `align-self` |
| 箱の中の文字やインライン内容 | `text-align` |

文字、blockの箱、Flexの子を中央へ置き分ける場合は[文字と要素の箱を中央に寄せる](../08_インラインと行の仕組み/06_文字と要素の箱を中央に寄せる.md)で確認する。

## このページのまとめ

- `flex-direction`から主軸と交差軸を決める。
- コンテナ全体、一つのアイテム、箱の中の文字を分ける。
- 高さが揃ったら、まず`align-items: stretch`の影響を確認する。

## 仕様確認先

- [CSS Flexible Box Layout Module Level 1: Alignment](https://www.w3.org/TR/css-flexbox-1/#alignment)
- [CSS Box Alignment Module Level 3](https://www.w3.org/TR/css-align-3/)
