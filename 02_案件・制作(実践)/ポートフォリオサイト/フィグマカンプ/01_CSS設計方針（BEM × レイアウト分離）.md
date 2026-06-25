# 01_CSS設計方針（BEM × レイアウト分離）

## 位置づけ（実務編レベル2）

このファイルは、ポートフォリオ制作における実務編レベル2のCSS方針をまとめた本体。

- レベル1: 基本概念（`01_学習本線`）
- レベル2: 実務ルールと運用（`02_案件・制作`）

## 方針の目的

このプロジェクトでは、BEM風をベースにしつつ、レイアウト責務を分離し、長期運用・保守性・他人が修正しやすいことを最優先にCSS設計を行う。

構造ルールと判断基準を先に置くことで、カンプコーディングへのイメージとアプローチを作りやすくし、他人のコードを読む力を育てる。
そのうえで、別プロジェクトでも現場に合わせて柔軟に適用できる構造認識を持つことを目的にする。

## レベル2の到達目標

- BEMで意味と見た目を分離できる
- レイアウト責務を `l-` に分離できる
- 余白設計をルール化して崩れにくくできる
- 他人が読んで修正しやすいCSSを維持できる

## 運用ルール

- `c-`（共通コンポーネント接頭辞）は極力使わない
- BlockとBlockの間隔は、原則として上のBlockの`margin-bottom`で管理する
- `margin-top`はページ文脈・例外調整にのみ使う（マージン衝突防止）
- 1セクション内の骨格クラスは途中で別名へ切り替えない
- `block__element` をブロック本体なしで単独開始しない
- 横並びの間隔は「左右どちらか片側」に固定して持つ（両側に持たせない）
- `flex` / `grid` で並びが切り替わる場所は `margin` より `gap` を優先する
- 再利用はBEM Block / Elementの設計で吸収する
- `margin` / `padding`のショートハンドは使わない（意図しない上書き防止）

## 基本思想

- CSSはクラスベース・低詳細度で記述する
- HTMLタグの意味と、見た目・余白・配置の責務を分離する
- 将来、他人が触ること・仕様変更が入ることを前提にする

## BEMの使い方

### 命名ルール

- Block: `.about`, `.bicycle`, `.header`
- Element: `.about__title`, `.bicycle__item`
- Modifier: `.block--state`, `.block__element--variant`

記号（`--` / `_`）そのものより、Block / Element / Modifier の責務を守ることを重視する。

### 運用ルール

- `__` は1段まで（[DOM](../../03_雑記/知識辞書（試運用）/02_単語カード/DOM.md) の深さと命名は一致させない）
- Modifierは「状態・バリエーション」のみ
- レイアウト調整目的の指定をBlockに直接持たせない

### 同一役割の繰り返し要素

- カード一覧などで同じ役割を繰り返す要素は、同じ element class を使う。
  - 例: `related-projects__img` を各カードで共通使用する。
- 作品名ベースで element 名を分けない。
  - 例: `...__sofa-img` / `...__keyboard-img` のような分割は避ける。
- 見え方差分が必要な場合のみ modifier を追加する。
  - 例: `related-projects__img--sofa`

## 独立ブロックと親ブロックの扱い（Blog例）

`blog-articles` の中に `newsletter` を置く場合でも、`newsletter` は独立ブロックとして開始する。

```html
<div class="blog-articles__newsletter">
  <div class="newsletter">
    <div class="newsletter__inner">...</div>
  </div>
</div>
```

上記は「配置ラッパー」と「部品本体」を分離した基本形。

- `blog-articles__newsletter`: 親セクション内での置き場所
- `newsletter`: 独立コンポーネント本体

### Mix（マルチクラス）を使う場合

ラッパーを減らしたいときは、1要素に両方のクラスを付ける（BEM運用の Mix）。

```html
<div class="newsletter blog-articles__newsletter">
  <div class="newsletter__inner">...</div>
</div>
```

### 避ける形

`newsletter__inner` だけを単独で始める形は避ける。

```html
<div class="blog-articles__newsletter">
  <div class="newsletter__inner">...</div>
</div>
```

この形は `newsletter` ブロック本体が不在で、責務の追跡が難しくなる。

## レイアウトは別クラスに分離する

### 方針

- 並び・余白・配置はレイアウト用クラスが担当する
- BEM Blockは「意味・見た目」に集中させる

### 命名

- 接頭辞: `l-`（layout）
- 名前は並び方ではなく役割で付ける

```html
<div class="l-list">
  <article class="card"></article>
  <article class="card"></article>
</div>
```

```css
.l-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
```

### 同じレイアウトパターンが出てきた場合

- 1〜2回: その場限りの命名で対応
- 3回以上: 共通レイアウトとして昇格を検討
- 見た目が同じでも、意味が違えば別クラスにする

### 横方向マージンの扱い（統一ルール）

- 横方向の `margin` は相殺されない（縦方向の collapse 前提を持ち込まない）
- 要素間スペースを `margin-left` と `margin-right` の両方で作らない
- 「左だけ」または「右だけ」の片側固定で運用する
- レスポンシブで `row -> column` / `column -> row` が起きる箇所は `gap` で管理する

```css
/* OK: 片側固定 */
.card + .card {
  margin-left: 16px;
}

/* 推奨: レスポンシブ切替を含む並びは gap で統一 */
.card-list {
  display: flex;
  gap: 16px;
}
```

## コンポーネント上書きの境界

### 基本思想

- コンポーネントは「見た目の核」を持つ
- 配置や周囲余白は、使う場所（ページ側）で調整する
- 上書きは前提。ただし境界を固定する

### 上書きしてよいもの（ページ側責務）

- `margin`
- `gap`
- `display`（文脈に応じた使い方）
- 位置・周囲余白
- レイアウト都合の並び

### 上書きしないもの（核）

- 形（丸/角など）
- 色の意味（ブランド色・状態色）
- 構造
- `border-radius` など部品固有の骨格

### サイズ差分の扱い

- サイズ違いは都度上書きせず、Modifierで吸収する
- 例: `.button--sm`, `.button--lg`

### 実務の目安

- 完全統一ではなく「8割共通、2割ページ調整」が通常運用
- 迷ったら次の順で判断する
1. 核（部品の同一性）なら触らない
2. 配置（文脈差）ならページ側で調整
3. サイズ差はModifierに分離

## 文章（pタグ）の扱い

### 基本方針

- `p`タグ自体には余白を持たせない
- 文章の余白は親（レイアウト or Block）で制御する

```css
p {
  margin: 0;
}
```

### 文章ブロック例（汎用）

```html
<div class="richtext">
  <p>...</p>
  <p>...</p>
</div>
```

```css
.richtext > * + * {
  margin-top: 1em;
}
```

### 大きな段差（セクション区切り）が必要な場合

- 余白量に意味が生じた時点で、構造として扱う
- `p`にModifierや専用クラスは付けない

```html
<div class="l-text">
  <p>通常段落</p>

  <div class="l-section-break">
    <p>次の話題</p>
  </div>

  <p>続き</p>
</div>
```

## 前半のimgの扱い

### 1. 共通のダミー画像を1枚用意

- `img/dummy.jpg`（正方形・無地でOK）

### 2. 最初からダミー画像で組む

```html
<img class="hero__img" src="img/dummy.jpg" alt="">
<img class="portfolio__img" src="img/dummy.jpg" alt="">
```

### 3. Hero用ダミー（比率固定）

```css
.hero__img {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  background-color: #eee;
}
```

## 画像ファイル命名（blog記事一覧）

### 基本ルール

- `img/blog/` 配下で `blog-<記事トピック>.jpg` に統一
- 連番（`image01.jpg` など）を避け、記事内容が推測できる名前にする
- 同系統タイトルが重なる場合は末尾語で差を付ける

### 例

- `blog-performance-marketing-agencies.jpg`
- `blog-digital-marketing-channels.jpg`
- `blog-agency-outsource-business.jpg`
- `blog-outsource-digital-marketing.jpg`

## 制作順序（実務編）

1. セクション構造を確定する（ヘッダー/メイン/フッター、各Block）
2. BlockとElement名を決める（意味ベース）
3. レイアウト責務を `l-` へ分離する（並び・配置・gap）
4. 余白ルールを先に固定する（`margin-bottom` 中心）
5. ダミー画像とテキストで骨組みを先に完成させる
6. 見た目（色・線・タイポ）をBlock側へ実装する
7. 状態差分をModifierで追加する
8. 影響範囲を確認しながら調整する（詳細度競争を避ける）

## 判断基準（迷ったら）

- 再利用される可能性がある: 分離する
- 他人が触る前提: 分離する
- CMS / Markdownが絡む: `p`は汚さない
- 1ページ完結・短期: 割り切りOK

## 完了チェック

- Blockとレイアウトが混ざっていない
- `p`に直書き余白を入れていない
- `margin-top`濫用がない
- 3回以上出るレイアウトを共通化できている
- クラス名だけで意図が読める

## まとめ

- BEMは意味と見た目を担当
- レイアウトは文脈側（`l-`）が担当
- 文章（`p`）は自分で余白を持たない
- 同じ構造でも「意味」が違えば別物として扱う

この設計方針により、CSSの肥大化・詳細度競争・修正時の影響範囲拡大を防ぐことを目的とする。

## 認知アプローチ（実装時の切り分け順）

1. これは「核」か「文脈」かを先に決める  
   核なら触らない、文脈ならページ側で調整する。
2. 問題は「構造」か「余白」かを分ける  
   `grid/flex` と `margin/gap/padding` を混ぜない。
3. 子より親を先に確認する  
   子調整前に、親の `display` / 幅 / 既存余白を確認する。
4. 全体ルールを先に作る  
   例外調整は最後に最小限で追加する。
5. 「知っている」と「再現できる」を分ける  
   採用理由を短く残し、次回同条件で再現できる状態を目標にする。

## 実務反映ルール（命名と責務分離）

- このファイルでは、次の運用判断を実務ルールとして固定した
  - セクション骨格名を途中で切り替えない
  - `block__element` をブロック本体なしで開始しない
  - 配置都合は親文脈側（例: `blog-articles__*`）で持つ
  - 1要素複数クラスは Mix として扱い、責務を明示する
  - `c-` 接頭辞は再利用が明確になった時点（実務目安: 3回以上）で昇格検討する
- 以後、同テーマの追記はこの実務ファイルを主参照にして統合する

## Flex文脈での幅予算ルール（Contact系での再発防止）

- `flex-basis` と `padding` は同時に幅計算へ参加する前提で見る。
- `padding-left` と `padding-right` は別プロパティなので、優先順位競合として扱わない。
- 右側圧迫が出たら、次の順で確認する。
1. `box-sizing`（`border-box` 前提か）
2. `flex-basis`（固定値が強すぎないか）
3. `min-width: 0`（縮み許可が必要な要素に付与されているか）
4. 長文折り返し（`overflow-wrap` / `word-break`）

## Blog一覧ケースから抽出した実務固定運用

- `blog-articles` 実装での固定運用:
  - 親ブロックが `blog-articles` の時、要素名は `blog-articles__...` に統一する
  - `blog__more` のような途中切替は採用しない
  - SPで同一一覧として成立する間は1グリッド維持、PC差分はCSSで吸収する
  - 線の上下距離を厳密制御したい時のみ `featured/list` の構造分離を許可する
- 余白責務（本案件基準）:
  - カード反復間隔は親一覧の `gap`
  - 一覧と次ブロックの距離は一覧側 `margin-bottom`
  - 区切り線と本文距離は `padding-top`
- カード配置の順番指定:
  - 直下にカードだけが並ぶ前提なら、上位2枚の配置差分は `.blog-articles__list > .c-blog-card:nth-child(-n + 2)` で扱ってよい
  - この指定は「`.blog-articles__list` 直下の子要素全体の1〜2番目で、かつ `.c-blog-card`」という意味で読む
  - `.c-blog-card:nth-of-type(-n + 2)` は、クラス順ではなく同じタグ種類の順番を見るため、カード一覧の配置指定では基本採用しない
  - 広告、見出し、空状態、バナーなどが一覧内に混ざる可能性がある場合は、`.c-blog-card--large` のような modifier で明示する
