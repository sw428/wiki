# 04_ボックスとdisplay

## 目的

- 「背景色がどこに付くか」「なぜその大きさになるか」を、`display` とボックス生成の観点で説明できる状態にする。
- タグ・要素・テキストノード・DOM化の前提は、先に [01_HTMLの土台](./01_HTMLの土台.md) で扱う。
- HTML文書の最低限の骨格は、先に [02_HTML文書の骨格](./02_HTML文書の骨格.md) で扱う。

## ルール

- 画面に出る対象は、[DOM](../../03_参照元/DOM.md) と [CSSOM](../../03_参照元/CSSOM.md) を合成した結果（レンダーツリー）で決まる（[状態変化](../../03_参照元/状態変化.md)）。
- `display` は「どの種類のボックスを生成するか」に関与する。
- 文字は [テキストノード](../../03_参照元/テキストノード.md) として扱われ、指定反映は [CSS適用境界](../../03_参照元/CSS適用境界.md) を分けて見る。
- `box-sizing` は「生成されたボックスのサイズ計算ルール」を決める。
- つまり、`display` と `box-sizing` は役割が違う。

### ボックスとボックスモデルの区別

| 分類           | 何を決めるか                                 | 主な関連プロパティ                          |
| -------------- | -------------------------------------------- | ------------------------------------------- |
| 表示ボックス / 生成ボックス | 要素からどんなレイアウト上の箱が作られるか | `display`, `position`, `float`, `line-height`, `font-size` |
| ボックスモデル | 生成された箱を `content / padding / border / margin` でどう構成して読むか | `width`, `height`, `padding`, `border`, `margin` |
| サイズ計算ルール | `width` / `height` が content 基準か border 基準か | `box-sizing` |

MDN寄せで言うと、ブラウザはレイアウト時に要素を長方形のボックスとして扱う。
そのボックスは `content edge / padding edge / border edge / margin edge` によって領域分けされる。
また、Visual Formatting Model では、要素から生成されるボックスの種類は `display` の値に依存する。

つまり、次のように分けて読む。

- `display`: どんな表示ボックスを作るか、周囲や子要素とどう振る舞うか
- ボックスモデル: 作られた箱を `content / padding / border / margin` で読む地図
- `box-sizing`: `width` / `height` の指定値を content box 基準にするか border box 基準にするか

### CSSOM・表示ボックス・Paint の関係

`width`, `height`, `padding`, `border`, `margin`, `box-sizing` などは、
まず CSS の指定として CSSOM に入る。

ただし、CSSOM の時点ではまだ画面上の最終的な大きさ・位置は決まっていない。

その後、DOM と CSSOM をもとにレンダーツリー / レイアウトツリーが作られ、
`display` やレイアウト文脈に応じて、ブラウザ内部で表示のためのボックスが生成される。

生成されたボックスは、Layout で大きさ・位置が決まり、
Paint で背景・文字・画像・枠線として画面に描画される。

```txt

HTML
-> DOMに変換される

CSS
-> CSSOMに指定として入る

DOM + CSSOM
-> レンダーツリー / レイアウトツリーが作られる
-> display やレイアウト文脈に応じて表示ボックスが作られる
-> Layoutで大きさ・位置が決まる
-> Paintで実際に描かれる
```

- 目的は「ボックスの種類を全部暗記すること」ではない。
- 目的は、ブラウザが描画する流れを時系列で追えるようにすること。

実務では、詰まった時に必要な分だけ確認すればよい。
最初から全部を覚えるより、次を確認できる状態を優先する。

- どの要素の箱か
- 親は何か
- `display` は何か
- 幅/高さはどこから来ているか
- 余白は内側か外側か

## ボックスモデルと描画ボックスの関係

同じ「ボックス」という言葉でも、見ている階層が違う。
ただし、完全に無関係な別物ではなく、同じ箱を別の観測視点から見ている。

大きくは次の関係で考える。

```txt
要素
-> display やレイアウト文脈に応じて表示ボックスが生成される
-> その箱を content / padding / border / margin で説明するのがボックスモデル
-> box-sizing が width / height の計算基準を調整する
```

### ボックスモデル

- `content / padding / border / margin` で箱を分解して読む考え方
- `width`, `height`, `padding`, `border`, `margin`, `box-sizing` で直接触れる
- つまり「CSSでサイズ・余白・枠線を調整するときの地図」

### 描画ボックス（レイアウト上の箱）

- ブラウザがレイアウト計算のために内部で作る箱
- 例: `block box`, `inline box`, `line box`, `flex item`, `grid item`, `anonymous box`
- CSSで名前を直接指定して操作する対象ではない
  - 例: `line-box: ...;` や `anonymous-box: ...;` のような指定はしない

補足:

- ボックスモデルと描画ボックスは、別階層だが同じ描画結果につながっている。
- `display`, `position`, `line-height`, `font-size` などの指定で、内部で作られる描画ボックスの振る舞いは間接的に変わる。
- `padding`, `border`, `margin`, `box-sizing` などの指定で、生成された箱のサイズ計算や周囲との距離が変わる。

```txt
CSSプロパティを指定する
-> ブラウザ内部の描画ボックスの作られ方が変わる
-> width / height / aspect-ratio / 余白の効き方が変わることがある
```

### 認識

- ボックスモデル: CSSで直接調整する箱
- 描画ボックス: ブラウザが画面を作るために内部で生成する箱
- ボックスモデルは暗記対象ではなく、描画の流れを追うための地図として使う。

より正確には、ボックスモデルは「別の箱」ではなく、生成された表示ボックスを `content / padding / border / margin` の層で読むためのモデル。

### `block` の基本認識

`block` は、通常フローでは横方向に親の幅いっぱいへ広がりやすい。

ただし、縦方向の高さは基本的にコンテンツ量で決まる。

そのため、コンテンツがなく、`height` / `padding` / `border` なども指定していない場合、
高さはほぼ `0` になり、背景色などの「見える領域」はほとんど出ない。

一方で、`height` / `padding` / `border` を明示的に指定すれば、
コンテンツがなくても見える領域を持てる。

## 例

```html
<div class="box box--a">A</div>
<span class="box box--b">B</span>
```

```css
.box {
  background: #dff2ff;
}

.box--a {
  display: block;
  width: 100%;
}

.box--b {
  display: inline;
}
```

- `block`: 既定では親幅方向に広がりやすい。
- `inline`: 横幅は内容依存。`width`/`height` は通常効かない（[置換要素](../../03_参照元/置換要素.md) を除く）。

### `a` タグに `aspect-ratio` が効きにくい例

```css
a {
  aspect-ratio: 16 / 9;
}
```

`a` が既定の `inline` のままだと、行内文脈で扱われるため、期待した箱として効きにくいことがある。

```css
a {
  display: block;
  aspect-ratio: 16 / 9;
}
```

この変更は「ボックスモデルの調整」だけではなく、`display` によって描画ボックスの種類が変わることも含んでいる。

## 見えている広さを「余白」と決めつけない

要素が中身より広く見えても、必ずしも `margin` / `padding` が原因とは限らない。

- 横方向:
  - `block` が通常フローで親幅方向へ広がっている
  - 親の列幅・コンテナ幅が大きい
  - `width: 100%` が指定されている
- 縦方向:
  - `line-height` による行ボックスの高さ
  - 複数行・複数子要素の積み重なり
  - `padding` / `border` / `margin`

DevToolsでは、次の順で確認する。

1. 表示されている寸法が content / padding / border / margin のどこか
2. `display` と親幅
3. 子要素の行数・高さ
4. `line-height`
5. 自分で指定した余白

縦方向の行ボックスは [05_インラインと行の仕組み](./05_インラインと行の仕組み.md) で扱う。

## リセットCSSは「何を消したか」で読む

`body { margin: 0; }` と全要素のリセットは、対象範囲が違う。

- `body { margin: 0; }`
  - ページ外周に見える `body` の既定マージンを消す
  - 見出し・段落・リストなど、各要素の既定マージンは残る
- `* { margin: 0; }`
  - 全要素のマージンを一括で消す
  - 意図的に利用できる既定スタイルもまとめて消す
- リスト
  - `margin` とは別に `padding` / `list-style` も確認する

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
}

h1,
h2,
h3,
p,
ul,
ol,
figure {
  margin: 0;
}

ul,
ol {
  padding: 0;
}
```

全消去か個別消去かに唯一の正解があるのではなく、対象と意図を説明できる形を選ぶ。

## 初期認識メモ（確度）

- 確度: 高
  - 「`display` の設定が先にあり、描画結果としてボックスが現れる」という時系列の見方。
  - 「`display` と `box-sizing` は別問題」という切り分け。

## 判断基準

- バグ時は次の順で切る（詳細度は最後）。

1. HTML構造と親子関係
2. レイアウト文脈（通常フロー / `flex` / `grid`）
3. `display`（どのボックス種別か）
4. `width` / `height`（どこで幅・高さが決まるか）
5. `padding` / `margin` / `gap`（内側余白か外側余白か）
6. `position` / `grid` / `flex` の配置指定
7. 詳細度・上書き順（同強度なら後勝ち）
