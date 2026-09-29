# flex: 1とは？どこがどう伸びるの？

元の記事：[下へ寄せるときはどの箱の余った高さを使うか](../../../01_理解の土台/01_HTML・CSS/09_レイアウト/01_下へ寄せるときはどの箱の余った高さを使うか.md)

今回の例だと、.body そのものの高さが、下方向に伸びる。

親がこうだから、

[なぜ元記事に親コードのせないの？](./なぜ元記事に親コードのせないのか.md)

```css
.card {
  display: flex;
  flex-direction: column;
}
```

.card の子は縦に並ぶ。

```text
.card
├─ .image
└─ .body
```

たとえば .card が高さ500pxで、

```text
image = 200px
bodyの中身 = 150px
```

だとすると、まだ150px余る。

flex: 1 がないと、イメージはこう。

```text
┌────── card 500px ──────┐
│ image 200px            │
├────────────────────────┤
│ body 150px             │
│ title                  │
│ text                   │
│ meta                   │
├────────────────────────┤
│                        │
│ 150px余っている        │
│                        │
└────────────────────────┘
```

ここで、

```css
.body {
  flex: 1;
}
```

を付けると、余っていた150pxを .body がもらって、.body の高さが300pxまで伸びる。

```text
┌────── card 500px ──────┐
│ image 200px            │
├────────────────────────┤
│ body 300px             │
│ title                  │
│ text                   │
│ meta                   │
│                        │
│                        │
│ ← bodyの余っている部分 │
│                        │
└────────────────────────┘
```

この時点では、.body が300pxまで伸びただけ。.meta はまだ text のすぐ下にいる。

つまり、

```css
flex: 1
```

で動くのは中の文字じゃなくて、

.body という箱そのもの

今回 flex-direction: column だから、縦方向の残りスペースを使って高さが伸びる。

そのあと .body 自身を縦Flexにして、

```css
.body {
  display: flex;
  flex: 1;
  flex-direction: column;
}
```

さらに、

```css
.meta {
  margin-top: auto;
}
```

を付けると、初めてこうなる。

```text
┌────── card 500px ──────┐
│ image 200px            │
├────────────────────────┤
│ body 300px             │
│ title                  │
│ text                   │
│                        │
│ ← 余りがmetaの上へ     │
│                        │
│ meta                   │
└────────────────────────┘
```

だから流れは、

```text
flex: 1
↓
bodyだけ伸びる
↓
metaはまだtextのすぐ下

bodyの中を縦Flexで並べる
↓
margin-top: auto
↓
body内の余りをmetaの上へ入れる
↓
metaが下へ行く
```
