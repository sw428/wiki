# 07_absoluteの子がFlexで中央に見える条件を調べる

絶対配置した子がFlexコンテナ内で中央に見える場合でも、通常のFlexアイテムとして配置されているとは限らない。位置計算とFlexの整列を分ける。

## absoluteの子をFlexで中央へ置く場合

Flexコンテナ直下の絶対配置要素は通常のflex itemではないが、両側のinsetが`auto`の軸では、static positionの計算に`justify-content`や`align-items`が関係し、中央へ見える場合がある。

```css
.frame {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.text {
  position: absolute;
}
```

仕様上成立するが、重ねる範囲を明示したい共有コードでは、子へ`inset: 0`を指定し、その子の中をGridで中央寄せする方が役割を読み取りやすい。`left: 0`など具体的なinsetを加えた場合は、カスケードの強さではなく位置計算の条件が変わる。

## 確認順

1. 子が`position: absolute`で通常フローから外れているか確認する。
2. `inset`の各値が`auto`か具体値か確認する。
3. 重ねる範囲を明示したいなら、子へ`inset: 0`を指定し、その子の内部で中央寄せする方法と比較する。
4. 位置計算の条件とカスケードの強さを混同しない。

基本的な重ね配置は、[画像の上に文字や部品を重ねる](../../02_基礎/01_HTML・CSS/11_メディアの表示枠と重ね配置/05_画像の上に文字や部品を重ねる.md)へ戻る。

## 仕様確認先

- [CSS Flexible Box Layout Module Level 1: Absolutely-positioned flex children](https://www.w3.org/TR/css-flexbox-1/#abspos-items)
- [CSS Box Alignment Module Level 3: align-self](https://drafts.csswg.org/css-align-3/#align-self-property)
