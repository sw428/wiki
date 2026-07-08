# 13\_デザインパターンとCSS固定判断

## 目的

- バナー、カード、CTA、ヒーローなどの見た目の型から、CSSで何を固定するかを判断する。
- 「この見た目ならこのプロパティ」と丸暗記するのではなく、固定する責務を分けて考える。

このノートでは、デザインパターンを「見た目の名前」ではなく、HTML/CSSへ落とすための判断単位として扱う。

## このノートの見方

- 先に `パターン早見表` で、どのUIに何を使うかを見る。
- 迷ったら、各パターンの `判断基準` で挙動理由を確認する。
- 仕様や細かい挙動は、最後の関連ノートや仕様リンクへ戻る。

## パターン早見表

| デザインパターン      | まず見ること                   | よく使う固定                                         | 基本形                                                 |
| --------------------- | ------------------------------ | ---------------------------------------------------- | ------------------------------------------------------ |
| 記事 / テキスト一覧   | 同じ項目が縦に続くか           | `gap` / `article + article`                          | 親で束ねられるなら `gap`、既存構造なら隣接兄弟         |
| Archive / サイドバー一覧 | 外側の線か、項目間の線か     | 親の上下 `border` / `item + item`                    | 外側の線は親、内側の区切り線は隣接兄弟                 |
| ステップ番号 / 自動連番 | 意味上のリストか、装飾番号か | `ol` / CSSカウンター / `::before`                   | 普通の番号リストは `ol`、デザイン番号はCSSで自動生成   |
| 画像マスク / アイコン抜き | 画像を切るのか、見え方だけ抜くのか | `mask-image` / `mask-size` / `background-color` | 色をCSSで変えたい単色アイコンや形抜き表現に使う         |
| 写真バナー            | 枠として扱うか、画像自然比率か | `aspect-ratio` / `height: auto`                      | 枠なら親に `aspect-ratio`、完成画像なら `height: auto` |
| 文字入りバナー        | 切れてよいか                   | `object-fit: contain` / `height: auto`               | 文字やロゴが切れるなら `cover` を避ける                |
| 画像上テキスト        | 親の高さを誰が作るか           | `position` / `inset: 0` / `place-items`              | 親を基準箱、画像を高さ役、文字を重ね役に分ける         |
| カード                | 同じ型を繰り返すか             | 親 `gap` / メディア `aspect-ratio`                   | 画像枠、本文、メタ情報の責務を分ける                   |
| 人物写真 / サムネイル | 正方形枠か自然比率か           | `width` / `aspect-ratio: 1 / 1` / `object-fit`       | 外側の枠を固定し、画像を中へ収める                     |
| CTAボタン             | 押せる範囲が足りるか           | `min-height` / `padding` / `inline-flex`             | 固定幅より、先に余白と最小高さを見る                   |
| ヒーロー / MV         | 切り抜いてよいか               | `min-height` / `object-fit` / `picture`              | 見せたい範囲が変わるならSP用画像を検討                 |
| YouTube / iframe      | 自然な高さがないか             | 親 `aspect-ratio` / iframe `width:100%; height:100%` | iframeではなく外側の箱で比率を作る                     |
| SPメニュー            | 通常フローか重ねるか           | `visible-sp` / Flex / `position`                     | 表示条件と位置指定を混ぜない                           |

## パターンを選ぶ時の一言判断

- `height: auto`: 画像そのものを自然な比率で見せたい。
- `aspect-ratio`: UIとして決まった比率の箱を作りたい。
- `object-fit: cover`: 枠を埋めたい。切り抜きは許容する。
- `object-fit: contain`: 全体を見せたい。余白は許容する。
- `picture`: SP/PCで見せたい構図が変わる。
- `gap`: 同じ親の中で、同種項目の間隔を作る。
- `article + article`: 親を作らず、2個目以降だけ空ける。
- `ol`: 意味として番号付きリストなら、まずHTML側で表す。
- CSSカウンター: 番号をデザインパーツとして自動生成したい時に使う。
- `mask-image`: 要素や背景を、画像の透明度・形で見える部分だけ抜きたい。
- `position: absolute`: 通常フローから外して重ねる。親の高さは作らない。

## 画像制御パターン早見表

レスポンシブの幅調整ができていても、画像制御は別で見る。
画像は「どのデザインパターンか」を先に決めないと、場所ごとに `width` / `height` / `aspect-ratio` / `object-fit` をごにょごにょ足す状態になりやすい。

| 画像の見た目                                   | 判断                                                   | CSS制御パターン                                                                                   |
| ---------------------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------- |
| ロゴ / 電話画像 / 予約画像 / 文字入り画像      | 切れてはいけない                                       | 画像またはリンクに `width: min(指定px, 100%)`、画像は `width: 100%; height: auto`                 |
| MV / カード画像 / 地図画像 / 写真サムネイル    | 枠いっぱいに見せる。切り抜き許容                       | 親に `aspect-ratio` + `overflow: hidden`、子画像に `width: 100%; height: 100%; object-fit: cover` |
| 商品画像 / 文字入りバナー / 全体を見せたい素材 | 切り抜き不可。余白は許容                               | 親に比率枠を作るなら、子画像は `object-fit: contain`。枠不要なら `height: auto`                   |
| 完成済みバナー画像 / 画像ボタン                | 画像そのものを縮小表示したいだけか、固定枠に収めたいか | そのままなら `height: auto`。固定枠なら親 `aspect-ratio` + 子 `object-fit`                        |
| 単色アイコン / 形抜き表現                      | 画像の中身を表示したいのか、形だけ借りたいのか         | 色をCSSで持たせるなら `background-color` + `mask-image`。写真や意味画像には使い分け注意          |
| YouTube / iframe                               | 自然な高さを前提にしにくい                             | 外側に `aspect-ratio`、中の `iframe` は `width: 100%; height: 100%; border: 0`                    |

### ごにょごにょ化しやすいサイン

- `img` そのものに `width: 100%; height: 100%;` だけを当てていて、`object-fit` の方針がない。
- `aspect-ratio` を親の更に上の親に付けたり、画像自身(ダメではない)に付けたりしていて、どの箱が比率責務を持つのかが決まっていない。
- `height: 94px` のように画像だけの高さを固定していて、比率維持か切り抜きかが曖昧。
- `calc(100% - 132px)` のように、実際は「指定幅にしたいだけ」の調整が残っている。
- PCでは画像自然比率、SPでは比率枠管理になっているが、その切り替え理由が書かれていない。

この状態は、単体のCSS理解が足りないというより、画像をパターンへ分類する前に個別調整へ入っている時に起きやすい。

### 先に使う確認順

1. これは「そのまま見せる画像」か「枠に入れる画像」か。
2. 切れてよい写真か、切れてはいけない文字・ロゴ・商品画像か。
3. 高さを作るのは画像自身か、親の比率枠か。
4. クリック範囲を持つなら、画像ではなくリンク側の箱も必要か。
5. SP/PCで構図が変わるなら、`cover` で粘るのではなく `<picture>` や別画像を検討する。

```css
/* そのまま見せる画像・画像ボタン */
.image-link {
  display: block;
  width: min(335px, 100%);
}

.image-link img {
  display: block;
  width: 100%;
  height: auto;
}
```

```css
/* 枠に入れて切り抜く写真 */
.image-frame {
  aspect-ratio: 343 / 228;
  overflow: hidden;
}

.image-frame img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

`aspect-ratio` は画像を小さくする指定ではなく、比率を持つ箱を作る指定。
小さく見せたいだけなら、まず `width` / `max-width` / `min()` で実寸上限を作る。

## 画像マスク / mask-image

### パターンとして見る場面

- SVGやPNGの形だけを借りて、色はCSS側で変えたいアイコン。
- 画像や背景の端をグラデーションで消す表現。
- 丸、波形、矢印などの形で、要素の見える範囲を抜く表現。

### 固定するもの

- 見える形: `mask-image`
- マスクの大きさ: `mask-size`
- マスクの位置: `mask-position`
- 実際に見える色: `background-color`

### 判断基準

- 「画像の中身」ではなく「画像の形」を使いたい時に向いている。
- 写真の収まりを調整したいだけなら、`object-fit` / `aspect-ratio` / `background-size` を先に見る。
- 詳しい使い分けは [06_画像と背景](./06_画像と背景.md) の `mask-image` 側に戻る。

### 一言でいうと

`mask-image` は、画像制御の本体というより「形で抜くデザインパターン」として見る。
詳細な仕組みは 06、UIパターンとしての使いどころはこのノートで確認する。

## 最初に分けること

デザインを見たら、先に次を分ける。

1. 何のUIか
   バナー、カード、CTA、ヒーロー、ラベル、一覧、フォームなど。
2. 何を固定したいか
   比率、幅、高さ、余白、クリック範囲、画像の切り抜き、文字位置など。
3. 何を可変にしたいか
   文字量、画像差し替え、画面幅、カード数、SP/PCの並びなど。
4. どこが責務を持つか
   親、箱、画像、テキスト、リンク、疑似要素のどこで制御するか。

「固定する」は、全部をpxで固めるという意味ではない。
崩れてほしくない条件をCSS上の責務として固定する、という意味で扱う。

## 固定の種類

| 固定したいもの | 主なCSS                              | 使う場面                       |
| -------------- | ------------------------------------ | ------------------------------ |
| 比率           | `aspect-ratio`                       | バナー、カード画像、動画枠     |
| 実寸上限       | `width` / `max-width`                | ロゴ、ボタン画像、本文幅       |
| 最小操作範囲   | `min-height` / `padding`             | ボタン、CTA、メニュー          |
| 要素間隔       | `gap` / `margin` / `padding`         | 一覧、カード内、セクション間   |
| 切り抜き       | `object-fit` / `object-position`     | 写真、MV、カード画像           |
| 重ねる基準     | `position: relative` / `absolute`    | 画像上テキスト、バッジ、ピン   |
| はみ出し制御   | `overflow: hidden`                   | 角丸画像、比率枠、複合メディア |
| 下寄せ         | `display: flex` / `margin-top: auto` | カードのボタン、日付、メタ情報 |

## 反復テキスト / 記事一覧の間隔

### 使う場面

- お知らせ一覧、ブログ一覧、スタッフブログなど、同じ種類のテキスト項目が縦に続くUI。
- `article + article` のように、2個目以降だけに間隔を付けたい場面。

### 固定するもの

- 同種反復の間隔: 親で束ねられるなら `gap`
- 既存HTMLを変えにくい時: 隣接兄弟セレクタの `margin-top`
- 次の別ブロックまでの距離: 一覧全体やセクションの `margin-bottom`

```css
/* 親で一覧を束ねられる場合 */
.article-list {
  display: grid;
  gap: 16px;
}

/* 既存構造のまま2個目以降だけ空ける場合 */
.article + .article {
  margin-top: 16px;
}
```

### 判断基準

- ただの `margin-bottom` は最後の要素にも効くため、同種反復の間隔には向かないことがある。
- 親に一覧コンテナがあるなら `gap` が読みやすい。
- 親を作れない、またはHTMLを変えない前提なら `article + article` の `margin-top` で「2個目以降だけ」を表せる。
- 「項目同士の間隔」と「一覧の次のブロックまでの余白」を同じ `margin-bottom` に混ぜない。

## Archive / リストの区切り線

### 使う場面

- サイドバーの Archive、カテゴリ一覧、月別一覧など、縦に並ぶリンクリスト。
- リスト全体の上下に線があり、項目同士の間にも区切り線を入れたい場面。

### 固定するもの

- リスト全体の外側の線: 親の `border-top` / `border-bottom`
- 項目同士の区切り線: `.item + .item`
- 文字と線の距離: リンク要素の `padding`
- 線の長さ: リスト幅または親幅

```html
<section class="p-archive">
  <h2 class="p-archive__title">Archive</h2>

  <ul class="p-archive__list">
    <li class="p-archive__item">
      <a class="p-archive__link" href="#">2026年7月</a>
    </li>
    <li class="p-archive__item">
      <a class="p-archive__link" href="#">2025年11月</a>
    </li>
  </ul>
</section>
```

```css
.p-archive__list {
  width: 220px;
  margin-inline: auto;
  padding: 0;
  list-style: none;
  border-top: 1px solid #777;
  border-bottom: 1px solid #777;
}

.p-archive__item + .p-archive__item {
  border-top: 1px solid #777;
}

.p-archive__link {
  display: block;
  padding: 20px;
  color: #333;
  text-decoration: none;
}
```

### 判断基準

- 外側の上下線は、リスト全体の枠なので `.p-archive__list` に持たせる。
- 項目間の線は、項目と項目の関係なので `.p-archive__item + .p-archive__item` で表す。
- 各項目の下線として見るなら `.p-archive__item { border-bottom: ... }` でもよいが、外側の線と内側の区切り線を分ける方が読みやすい。
- WordPressの `wp_get_archives()` で出力しても、最終的には `ul > li > a` にCSSを当てるだけなので、比重はHTML/CSS側にある。

## ステップ番号 / CSS自動連番

### 使う場面

- `01. SERVICE`、`STEP 01`、`01. 見出し` のように、番号そのものがデザインパーツになっているUI。
- 項目の追加・削除・並び替えで、番号を自動で詰めたい場面。
- HTMLに `01`、`02`、`03` を直接書くと、順番変更時に手修正が増える場面。

### 先に分けること

普通の番号付きリストなら、まず `ol > li` でよい。

```html
<ol>
  <li>ログインする</li>
  <li>投稿を追加する</li>
  <li>公開する</li>
</ol>
```

これは意味として「順序のあるリスト」なので、HTMLで表す方が自然。

一方で、カンプ上の `01` / `02` / `03` が大きく装飾されていたり、`STEP 01` のように見出しの飾りとして扱われているなら、CSSカウンターを検討する。

```html
<ol class="step-list">
  <li class="step-list__item">ログインする</li>
  <li class="step-list__item">投稿を追加する</li>
  <li class="step-list__item">公開する</li>
</ol>
```

```css
.step-list {
  counter-reset: step-counter;
  list-style: none;
}

.step-list__item {
  counter-increment: step-counter;
}

.step-list__item::before {
  content: "0" counter(step-counter) ".";
}

.step-list__item:nth-of-type(9) ~ .step-list__item::before {
  content: counter(step-counter) ".";
}
```

### 読み方

- `counter-reset`: 親側でカウンターを用意する。
- `counter-increment`: 項目が出るたびに番号を1つ進める。
- `counter()`: 今の番号を表示する。
- `::before`: 本文の前に番号を出す。
- `"0"`: `01`、`02` のようにゼロ埋めする。
- `:nth-of-type(9) ~ ...`: 10個目以降で `010` にならないよう、9個目の後ろから先頭の0を外す。

### 判断基準

- 意味として順序が大事: `ol` を優先する。
- 番号が見た目のパーツ: CSSカウンターを検討する。
- 項目の追加・削除で番号を自動更新したい: CSSカウンターが便利。
- 10個以上になる可能性がある: ゼロ埋めの解除条件まで考える。
- `:nth-of-type()` を使う場合は、クラス順ではなくタグ種類の順番を見ている点に注意する。詳しくは [12_セレクタと構造依存](./12_セレクタと構造依存.md) に戻る。

### 一言でいうと

普通の番号リストは `ol`。
番号をデザインパーツとして自動管理したい時だけ、CSSカウンターを使う。

## バナー

### 使う場面

- 関連サイト、広告、誘導枠、キャンペーンなど、1つのまとまった面として見せるUI。
- 画像全体がリンクになることが多い。
- 文字やロゴが入る場合は、切れてよい写真バナーか、切れてはいけない文字入り画像かを先に分ける。

### 固定するもの

- 比率: `aspect-ratio`
- クリック範囲: `a` をブロック化
- 角丸とはみ出し: `border-radius` + `overflow: hidden`
- 写真の見え方: `object-fit: cover`
- 文字重ね: 親を `position: relative`、文字箱を `absolute`

```html
<a class="banner" href="#">
  <img class="banner__img" src="banner.jpg" alt="" />
  <span class="banner__text">Campaign</span>
</a>
```

```css
.banner {
  position: relative;
  display: block;
  aspect-ratio: 16 / 5;
  overflow: hidden;
  border-radius: 8px;
}

.banner__img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.banner__text {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
}
```

### 判断基準

- 写真バナー: `aspect-ratio` + `object-fit: cover` で枠を固定しやすい。
- 文字入り画像、ロゴ、商品全体: `cover` で切らず、`width` + `height: auto` または `object-fit: contain` を先に検討する。
- テキストをHTMLで重ねるなら、画像は親の高さを作る役、テキストは重ねる役に分ける。
- 灰色の空箱に文字だけを重ねたい場合は、画像が高さを作らないため、親に `aspect-ratio`、`min-height`、`padding` のどれかで箱の高さを作る。
- `position: absolute` の要素は通常フローから外れる。親の高さは作らない。
- 中央寄せは `align-items` + `justify-content` でもできるが、1要素を中央に置くだけなら `place-items: center` が短い。

### 完成バナー画像とバナー枠の違い

```css
/* 完成画像を自然比率で見せる */
.sidebar__banner {
  position: relative;
}

.sidebar__banner img {
  display: block;
  width: 100%;
  height: auto;
}
```

```css
/* バナーを固定比率の枠として扱う */
.sidebar__banner {
  position: relative;
  aspect-ratio: 258 / 94;
}

.sidebar__banner img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

- 完成したバナー画像をそのまま出すだけなら、まず `height: auto` がシンプル。
- 「バナーは常に258/94の枠」と決めるなら、親に `aspect-ratio` を置く。
- どちらが正解かはCSSだけでは決まらない。デザイン上、枠比率を守るのか、画像自然比率に任せるのかで決める。

## カード

### 使う場面

- 記事一覧、制作実績、商品一覧、スタッフ紹介など、同じ型を繰り返すUI。
- 画像、見出し、本文、メタ情報、ボタンが同じ順番で並ぶ。

### 固定するもの

- 一覧の間隔: 親の `gap`
- 画像枠の比率: メディア部分の `aspect-ratio`
- 画像の切り抜き: `object-fit`
- ボタンや日付の下寄せ: カード本文を縦Flex化し、最後の要素に `margin-top: auto`

```html
<article class="card">
  <a class="card__media" href="#">
    <img src="thumb.jpg" alt="" />
  </a>
  <div class="card__body">
    <h3 class="card__title">Title</h3>
    <p class="card__text">Text</p>
    <p class="card__meta">2026.06.22</p>
  </div>
</article>
```

```css
.card {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.card__media {
  display: block;
  aspect-ratio: 4 / 3;
  overflow: hidden;
}

.card__media > img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card__body {
  display: flex;
  flex: 1;
  flex-direction: column;
}

.card__meta {
  margin-top: auto;
}
```

### 判断基準

- 反復カードは、子カードごとの `margin` より親一覧の `gap` を優先する。
- 画像比率をそろえたい時は、画像そのものではなくメディア枠を固定する。
- 文字量が変わるなら、本文高さを無理に固定せず、下寄せしたい要素だけFlexで送る。

## 人物写真 / 正方形サムネイル

### 使う場面

- お客様の声、スタッフ紹介、プロフィール画像など、写真を同じ見た目の枠へそろえるUI。

### 固定するもの

- 写真枠のサイズ: `width` / `max-width` / `clamp()`
- 写真枠の比率: `aspect-ratio: 1 / 1`
- 写真の切り抜き: `object-fit: cover`
- 横並び内で潰したくない場合: `flex-shrink: 0`

```css
.voice__image-wrap {
  width: 178px;
  aspect-ratio: 1 / 1;
  flex-shrink: 0;
  overflow: hidden;
}

.voice__image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

### 判断基準

- 正方形の見た目を守りたい時は、画像ではなく外側の枠を正方形にする。
- `img` に `height: 100%` だけを付けると、画像本来の比率で横幅が大きく見えることがある。枠へ収めるなら `width: 100%` と `height: 100%` をセットで考える。
- `178px` 固定が悪いわけではない。カンプ上で写真枠が固定寸法なら、枠として固定してよい。
- SPで小さくしたい場合は、固定値を消すのではなく、メディアクエリや `clamp()` で枠サイズを切り替える。

## CTA

### 使う場面

- 問い合わせ、予約、資料請求、購入など、ユーザーに行動してほしい場所。
- ボタン単体の場合と、説明文を含むCTAブロックの場合がある。

### 固定するもの

- 押せる範囲: `min-height` / `padding`
- 中央寄せ: `inline-flex` / `flex`
- アイコンとの間隔: `gap`
- 幅の扱い: 内容幅、固定幅、親幅いっぱいのどれか

```css
.cta-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding-inline: 24px;
  border-radius: 999px;
  gap: 8px;
}
```

### 判断基準

- ボタンは見た目の高さより、押せる範囲を先に見る。
- テキスト長が変わるなら、固定 `width` より `padding` と `min-height` を優先する。
- デザイン上、横幅をそろえる必要がある場合だけ `width` や `min-width` を検討する。

### 同一ボタンかどうかの見分け方

カンプ内に複数のボタンが出る場合、文字ではなく「見た目の核」と「役割」で見る。

同一ボタンとして扱いやすいのは、次の違いだけの場合。

- 文言だけが違う
- リンク先だけが違う
- 置いてある場所だけが違う
- 同じサイズ感、同じ色、同じhover、同じ角丸で使われている

```html
<a class="c-button" href="#">詳しく見る</a>
<a class="c-button" href="#">View More</a>
<a class="c-button" href="#">お問い合わせ</a>
```

`c-button` は共通コンポーネントとして扱う場合の例。
実際の接頭辞や命名は、案件側のBEM / SCSS運用に合わせる。

違いがある場合は、別コンポーネントにする前に modifier で表せるかを見る。

```html
<a class="c-button" href="#">詳しく見る</a>
<a class="c-button c-button--white" href="#">詳しく見る</a>
<a class="c-button c-button--small" href="#">詳しく見る</a>
<button class="c-button c-button--submit" type="submit">送信する</button>
```

判断の芯は次。

- 同じ土台: 共通クラス
- 色やサイズなどの差分: modifier
- 役割や構造が違う: 別コンポーネント
- そのページだけの余白や配置: ページ側・レイアウト側で調整

書き出しは、完璧な設計書ではなく、カンプ上の部品を先に名前付けするメモでよい。

```markdown
## 共通化できそうなもの

- 通常ボタン: c-button
- 白背景ボタン: c-button c-button--white
- 小さいボタン: c-button c-button--small
- 記事カード: c-card
- セクション見出し: c-section-title
```

この段階では、共通化を確定するより「何度も出るか」「差分だけか」「ページ固有か」を見えるようにすることを優先する。

## ヒーロー / MV

### 使う場面

- ページの先頭で、印象・主題・導線をまとめて見せる大きな領域。
- 画像の上にテキストやボタンを重ねることが多い。

### 固定するもの

- 領域の高さ: `min-height` / `aspect-ratio` / `padding`
- 画像の切り抜き: `object-fit` / `object-position`
- テキストの安全領域: 内側コンテナ、余白、最大幅
- 重ね順: 親の `position: relative` と中身の配置

### 判断基準

- 写真を背景的に使うなら、切り抜き前提で `cover` を使う。
- 顔、文字、商品全体などが切れると困るなら、PC/SPで画像を分けるか `contain` を検討する。
- ヒーローは高さを固定しすぎると、文字量やSP表示で詰まりやすい。固定高より `min-height` と余白で作る方が崩れにくい。

## YouTube / iframe

### 使う場面

- YouTube埋め込み、Google Map、外部動画など、`iframe` で外部コンテンツを表示するUI。

### 固定するもの

- 外側の比率枠: 親の `aspect-ratio`
- 中身の充填: `iframe` の `width: 100%` / `height: 100%`
- はみ出し制御: 必要なら `overflow: hidden`

```html
<div class="movie">
  <iframe src="..." title="..." allowfullscreen></iframe>
</div>
```

```css
.movie {
  aspect-ratio: 16 / 9;
}

.movie iframe {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
}
```

### 判断基準

- `iframe` は画像のような自然な高さを前提にしにくい。
- そのため、外側に比率の箱を作るとレイアウトが安定しやすい。
- `object-fit` は `iframe` には効かないため、写真と同じ考え方で `cover` を当てない。

## SPヘッダー / ハンバーガーメニュー

### 使う場面

- SPだけに表示するメニュー、ヘッダー操作、ハンバーガーボタン。
- ヒーロー画像の上に重ねるのか、画像の前に通常フローで置くのかで判断が分かれる。

### 固定するもの

- 存在条件: `visible-sp` / `u-sp-only`
- 位置: 通常フロー、Flex配置、または `position`
- 押せる範囲: ボタンの `width` / `height` / `padding`
- 線の配置: ボタン内の `display: grid` / `gap`

```html
<div class="site-header__menu visible-sp">
  <button class="hamburger-button" type="button" aria-label="メニューを開く">
    <span class="hamburger-button__line"></span>
    <span class="hamburger-button__line"></span>
    <span class="hamburger-button__line"></span>
  </button>
</div>
```

```css
.site-header__menu {
  display: flex;
  justify-content: flex-end;
}

.hamburger-button {
  display: grid;
  gap: 6px;
  width: 44px;
  height: 44px;
  place-content: center;
  padding: 0;
  border: 0;
  background: transparent;
}
```

### 判断基準

- 写真の上に重ねるデザインなら、親を `position: relative` にしてメニューを `absolute` で置く。
- 写真の前に青帯や通常のヘッダー行として置くなら、HTML上でMVより前に置き、通常フロー + Flexで配置する。
- 「SPだけ表示」と「どこに置くか」は別問題。表示制御クラスに位置や余白まで持たせない。
- SP版でヘッダー全体に `padding-inline` を入れたくない場合は、`.site-header` ではなく内側の必要な行へだけ余白を持たせる。

## ラベル / バッジ

### 使う場面

- NEW、カテゴリ名、ステータス、価格補足など、小さな意味を強調するUI。

### 固定するもの

- 文字の周囲余白: `padding`
- 最小高さ: `min-height`
- 角丸: `border-radius`
- 行内配置: `inline-flex`

```css
.label {
  display: inline-flex;
  align-items: center;
  min-height: 24px;
  padding-inline: 8px;
  border-radius: 999px;
  line-height: 1;
}
```

### 判断基準

- ラベルは大きなレイアウトを作る役ではない。
- 一覧の配置や余白は親側で管理し、ラベル自身は小さな意味表示に集中させる。

## 判断フロー

1. これは何のデザインパターンか
   バナー、カード、CTA、ヒーロー、ラベルなど。
2. 固定したいのは何か
   比率、幅、高さ、余白、位置、クリック範囲、切り抜き。
3. 固定する対象はどこか
   親、枠、画像、文字、リンク、疑似要素。
4. 可変にしたいものは何か
   文字量、画像差し替え、画面幅、数の増減。
5. 固定と可変がぶつかる場合、どちらを優先するか
   文字が読めること、画像が切れないこと、操作できることを先に見る。

## 関連ノート

- [06\_画像と背景](./06_画像と背景.md): 画像をHTMLで置くか背景で置くか、`mask-image` で形抜きするか
- [07\_レイアウト](./07_レイアウト.md): 親で並びと余白を管理する判断
- [10\_メディア設計（img・video・object-fit・aspect-ratio）](./10_メディア設計（img・video・object-fit・aspect-ratio）.md): 画像・動画の比率、切り抜き、CLS対策
- [11\_表示制御（sp-only／pc-only／revert設計）](./11_表示制御（sp-only／pc-only／revert設計）.md): SP/PCで存在を切る判断
- [12\_セレクタと構造依存](./12_セレクタと構造依存.md): `+` / `:nth-child()` / `:nth-of-type()` など、構造依存セレクタの判断

## 仕様として見るキーワード

- [`aspect-ratio`](https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio): 要素ボックスの望ましい幅/高さ比を指定する。
- [`object-fit`](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit): `img` / `video` などの置換要素を、枠へどう収めるかを指定する。
- [`mask-image`](https://developer.mozilla.org/en-US/docs/Web/CSS/mask-image): 要素を表示するマスクレイヤーの画像を指定する。
- [`picture`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/picture): 表示条件に応じて別画像を選ばせる。
- [Optimize Cumulative Layout Shift](https://web.dev/articles/optimize-cls): 画像や `iframe` などに寸法がないとレイアウトシフトの原因になりやすい。

## 一言でいうと

CSS固定はプロパティ名から決めず、バナー・カード・CTAなどの型を先に決めて、固定する対象と可変に残す対象を分ける。
