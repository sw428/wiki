# 要素とCSSの箱の関係

HTMLの要素と、画面上で配置に使われるCSSの箱は、同じものとして考えない。

## 要素から配置用の箱が作られる

CSSは、HTMLの要素や文字をそのまま座標へ置くのではない。

`display` やレイアウトの条件に応じてCSS boxを生成し、その箱を使って寸法と位置を決める。

```text
HTMLの要素と文字
→ CSSの指定を適用する
→ 配置に必要なCSS boxを生成する
→ 箱の寸法と位置を決める
→ 背景、枠線、文字などを描く
```

生成された箱の関係を、ここではbox treeと呼ぶ。

表示までの処理全体は[ブラウザの基本フロー](../07_ブラウザ挙動と表示のズレ/90_移行元/01_ブラウザが表示を作る基本フロー.md#基本フロー)で確認する。

## box tree上のboxとボックスモデルを分ける

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

`display` と `box-sizing` は同じ設定ではない。

`display` は生成する箱の種類や内外の振る舞いに関わり、`box-sizing` は生成された箱の寸法計算に関わる。

## 要素と箱は常に一対一ではない

CSS boxには、`block box`、`inline box`、`line box`、`anonymous box` などがある。

FlexやGridでは、要素が `flex container`、`flex item`、`grid container`、`grid item` としてレイアウトへ参加することもある。

これらは、次のようにプロパティ名を書いて直接作るものではない。

```css
/* このようなCSSプロパティはない */
.example {
  line-box: 20px;
  anonymous-box: none;
}
```

要素へ指定した `display`、`position`、`line-height`、`font-size` などと、周囲の構造から必要な箱が作られる。

そのため、DOM上の要素一覧とbox treeは常に同じ形にはならない。

箱の種類をすべて暗記する必要はない。

実装では、まず「どの要素を選んでいるか」「どの箱の幅や余白を確認しているか」を区別する。

文字や行の箱が問題なら[08_インラインと行の仕組み](../08_インラインと行の仕組み/01_文字の行間と高さを確認する.md)へ進む。

## 仕様確認先

- [CSS Display Module Level 3 - Box Layout Modes](https://drafts.csswg.org/css-display-3/#intro)
- [CSS Box Model Module Level 3](https://drafts.csswg.org/css-box-3/)
