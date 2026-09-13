# 02_box treeとボックスモデル

主な基礎：[一つの箱とdisplay](./01_一つの箱とdisplay.md)。要素と画面上の箱がどのようにつながるか、ボックスモデルとの違いまで確認したいときに読む。

## 要素から配置用の箱が作られる

CSSは、HTMLの要素や文字をそのまま座標へ置くのではない。`display` やレイアウトの条件に応じてCSS boxを生成し、その箱を使って寸法と位置を決める。

```text
HTMLの要素と文字
→ CSSの指定を適用する
→ 配置に必要なCSS boxを生成する
→ 箱の寸法と位置を決める
→ 背景、枠線、文字などを描く
```

生成された箱の関係を、ここではbox treeと呼ぶ。表示までの処理全体は[ブラウザの基本フロー](../07_ブラウザ挙動とズレ/01_ブラウザが表示を作る基本フロー.md#基本フロー)で確認できる。

## ボックスモデルは箱の領域を読む方法

box tree上のboxとボックスモデルは、別々の箱を指しているわけではない。

- box tree上のbox：CSSが配置を成立させるために生成する箱
- ボックスモデル：生成された箱を `content / padding / border / margin` に分けて読む方法
- `box-sizing`：指定した `width` と `height` がcontentまでかborderまでかを決める

```text
要素
→ displayやレイアウトの条件に応じてboxが生成される
→ そのboxの領域をボックスモデルで確認する
→ box-sizingがwidthとheightの計算範囲に関わる
```

`display` と `box-sizing` は同じ設定ではない。`display` は生成する箱の種類や内外の振る舞いに関わり、`box-sizing` は生成された箱の寸法計算に関わる。

## 要素と箱は常に一対一ではない

CSS boxには、`block box`、`inline box`、`line box`、`anonymous box` などがある。FlexやGridでは、要素が `flex container`、`flex item`、`grid container`、`grid item` としてレイアウトへ参加することもある。

これらは、次のようにプロパティ名を書いて直接作るものではない。

```css
/* このようなCSSプロパティはない */
.example {
  line-box: 20px;
  anonymous-box: none;
}
```

要素へ指定した `display`、`position`、`line-height`、`font-size` などと、周囲の構造から必要な箱が作られる。そのため、DOM上の要素一覧とbox treeは常に同じ形にはならない。

箱の種類をすべて暗記する必要はない。実装では、まず「どの要素を選んでいるか」「どの箱の幅や余白を確認しているか」を区別する。文字や行の箱が問題なら[08_インラインと行の仕組み](../08_インラインと行の仕組み/01_文字の行間と高さを確認する.md)へ進む。

## CSSに書いた値と画面上の寸法を分ける

例えば `width: auto` は、計算値の段階では `auto` のままでも、Layoutで親や周囲の条件を使って実際の幅が決まる。

```text
CSSに書いた指定
→ カスケードと継承を解決する
→ 計算値が決まる
→ Layoutで使用する寸法が決まる
```

DevToolsのボックスモデル図は、CSSソースの文字列をそのまま示す場所ではない。現在の配置で使われている寸法を確認する場所として読む。[01のDevToolsの見方](./01_一つの箱とdisplay.md#devtoolsのボックスモデル図で見ている値)へ戻ると、画面上の箱と対応させられる。

## `inline`では寸法指定が同じように働かない

通常の非置換要素が作るinline boxでは、`width`、`height`、`aspect-ratio`を指定しても、block boxと同じようには寸法を決められない。

```css
a {
  aspect-ratio: 16 / 9;
}
```

通常の `a` は既定でinlineとして扱われる。比率を持つ箱として寸法を決めたい場合は、用途に応じて `block` や `inline-block` などへ変える。

```css
a {
  display: block;
  aspect-ratio: 16 / 9;
}
```

画像や動画で `aspect-ratio` を使う実装は[比率の枠へ画像を収める](../11_メディア設計/02_比率の枠へ画像を収める.md)で扱う。

## 仕様確認先

- [CSS Display Module Level 3 - Box Layout Modes](https://drafts.csswg.org/css-display-3/#intro)
- [CSS Cascading and Inheritance Module Level 5 - Used Values](https://www.w3.org/TR/css-cascade-5/#used)
- [CSS Box Model Module Level 3](https://drafts.csswg.org/css-box-3/)
