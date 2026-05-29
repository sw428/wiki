# 00_SCSS導入と分割管理

## 位置づけ（実務編レベル2）

このファイルは、ポートフォリオ案件でSCSSを導入・運用するときの実務メモ。

- レベル1（基本概念）: `01_学習本線`
- レベル2（実務運用）: `02_案件・制作`

## このノートで固定すること

- SCSS導入の最小手順（インストール、起動、確認）
- フォルダ分割の目的（探しやすさと責務分離）
- `@use` と詳細度の誤解を避ける判断軸
- `contact-card` / `contact-form` / `input` の責務分離

## SCSSとは

SCSSは、CSSを管理しやすくするための記法。
ブラウザはSCSSを直接読まないため、SassでCSSへ変換して使う。

```txt
人間が書く        → SCSS
Sassが変換する    → CSS
ブラウザが読む    → CSS
```

## 導入手順（最小）

### 1. Node.js / npm の確認

```powershell
node -v
npm -v
```

### 2. Sassをインストール

```powershell
npm install -g sass
```

確認:

```powershell
sass --version
```

補足:
- グローバル導入を避けたい場合は `npm install --save-dev sass` + `npx sass ...` でもよい。

### 3. 変換監視を起動

```powershell
sass scss:css --watch
```

これを起動していないと、SCSSを編集しても `css/style.css` は更新されない。

## 推奨フォルダ構成

```txt
portfolio/
├─ scss/
│  ├─ foundation/
│  ├─ layout/
│  ├─ components/
│  ├─ utility/
│  ├─ pages/
│  └─ style.scss
├─ css/
│  └─ style.css
└─ index.html
```

- `scss/`: 人間が編集する
- `css/`: ブラウザに読み込ませる成果物
- HTMLはSCSSではなく `css/style.css` を読む

## style.scss の役割

`style.scss` は「各SCSSをまとめる入口」。
原則として、style.scssに実装を直書きせず、`@use` で各レイヤーを読み込む。

```scss
@charset "utf-8";

@use "foundation/variables";
@use "foundation/base";
@use "foundation/typography";

@use "layout/header";
@use "layout/inner";

@use "components/button";
@use "components/input";
@use "components/contact-card";
@use "components/faq";

@use "utility/display";
@use "utility/visually-hidden";

@use "pages/home";
@use "pages/contact";

@use "layout/footer";
```

補足:
- Sassモジュール（`@use`）は、複数回読み込んでもCSSを重複出力しない。
- `@use` はファイル先頭側に置く（style ruleより前）。

## `_file.scss`（パーシャル）の意味

`_button.scss` のように先頭`_`を付けたファイルは、分割用パーツ。
`sass scss:css` のディレクトリ変換では、`_`付きファイルは単体出力されない。

読み込み時は `@use "components/button";` のように `_(アンダースコア)` と拡張子を省略する。

## SCSS分割の恩恵（ここが本題）

SCSS分割の目的は「CSSを短くすること」ではない。
目的は、1枚CSS探索のコストを減らし、構造をレイヤーで見える化すること。

- `foundation`: 変数、base、typography
- `layout`: ページ外枠、共通レイアウト
- `components`: 再利用部品（button/inputなど）
- `utility`: 補助クラス
- `pages`: ページ固有の配置・余白

効果:
- どこを触るべきかの判断が速くなる
- 共通部品とページ固有の衝突が減る
- 修正時の影響範囲を絞りやすくなる

## 詳細度と順番の整理（誤解しやすい点）

### 先に結論

- 順番で変わるのは「後勝ち（勝敗）」。
- 詳細度は「セレクタ形」で決まる。
- `components` に置いたか `pages` に置いたかは、詳細度に影響しない。

### 例1: 詳細度が同じ（後勝ち）

```scss
.c-input { padding: 12px; }
.contact-form__input { padding: 16px; }
```

どちらも class 1個。後に出力されたほうが勝つ。

### 例2: 詳細度が高い（順番より強い）

```scss
.contact-form-card .c-input { padding: 16px; }
```

class 2個のため、`.c-input` 単体より強い。

### 運用ルール

- `components` は部品の見た目（核）
- `pages` は配置・余白・並び（文脈）
- `pages` から `components` の核を強いセレクタで上書きしない

## contact-card を残す理由（今回の採用）

今回の採用は「`contact-card` を残す」。
理由は、`contact` ページ内でフォーム領域の外箱責務を明確に切るため。

- `contact-card`: フォームを包む外箱（背景、角丸、内側余白）
- `contact-form`: 入力・送信の本体
- `c-input` / `c-textarea` / `c-button`: 小さな共通部品

この分離で、カード外観とフォーム機能を混ぜずに保守できる。

## 起動時のチェック（焦り対策）

「SCSSを直したのに画面が変わらない」を防ぐ確認順:

1. `sass scss:css --watch` を起動しているか
2. ターミナルにコンパイルエラーが出ていないか
3. HTMLが `css/style.css` を読んでいるか
4. ファイル保存ができているか
5. ブラウザ再読込（キャッシュ強制更新含む）をしたか

## 実務用まとめ

```txt
SCSS分割は、詳細度を消すためではない。
1枚CSS探索を減らし、責務をレイヤーで見える化するために使う。
contact-cardは外箱、contact-formは本体、input/buttonは共通部品として分離する。
```

## 参照（公式）

- Sass Install: https://sass-lang.com/install/
- Sass `@use`: https://sass-lang.com/documentation/at-rules/use/
- Dart Sass CLI: https://sass-lang.com/documentation/cli/dart-sass/
