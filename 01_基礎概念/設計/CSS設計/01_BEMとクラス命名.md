# 01_BEMとクラス命名

## 位置づけ（CSS設計）

このファイルは、BEM命名と接頭辞を使うときの自分の採用方針を固定するノート。

- 基礎概念: `01_基礎概念`
- 設計: `01_基礎概念/設計/CSS設計`
- 検証元: `03_ケース検証`

## このノートの目的

- クラス名だけ見て、役割を追える状態にする
- DOMの深さではなく、Block / Element / Modifier の責務で命名する
- レイアウト責務やコンポーネント責務と混ざらない名前にする

## 基本の命名方針

クラス名はBEMを基本とする。

```css
.block {}
.block__element {}
.block--modifier {}
```

### Block

独立した意味を持つまとまりに付ける。

```html
<section class="staff">
  ...
</section>
```

### Element

Blockを構成する要素に付ける。

```html
<h2 class="staff__title">スタッフ紹介</h2>
<ul class="staff__list">...</ul>
```

### Modifier

BlockまたはElementの種類・状態の違いに使用する。

```html
<a class="button button--primary" href="#">
  詳しく見る
</a>
```

記号（`--` / `__`）そのものより、Block / Element / Modifier の責務を守ることを重視する。

## 命名ルール（当面の採用方針）

1. `__` は基本1段まで（深いDOMをそのまま名前にしない）
2. Modifierは「状態・バリエーション」に限定する
3. 同じ役割の繰り返し要素は同じElement名を使う
4. 作品名・文言依存でElement名を分けない
5. レイアウト調整目的の指定をBlock本体へ直接持たせない

## やらないこと

- `block__element__element` のような多段命名
- `staff__list-item-card-image` のようにDOM階層を全部名前へ写すこと
- ページ都合の余白調整をBlock本体へ直接埋め込むこと
- IDセレクタやタグ連鎖で強引に勝たせること

## 接頭辞の使い分け

接頭辞は最初から機械的に付けない。

| 接頭辞 | 用途 | 例 |
|---|---|---|
| `l-` | 当面はページ外枠と共通横幅だけ | `l-page`, `l-inner` |
| `c-` | 複数箇所でそのまま再利用できる部品 | `c-logo`, `c-button`, `c-breadcrumb` |
| `u-` | 単一目的の補助クラス | `u-hidden-sp`, `u-text-center` |
| `js-` | JavaScript取得用の目印 | `js-menu-button` |
| `is-` / `has-` | 状態 | `is-open`, `is-active`, `has-error` |

通常のBlockは `.header`、`.staff`、`.staff-card` のように命名する。

- `l-` は当面 `.l-page` と `.l-inner` に限定する
- `c-` は、複数箇所で同じHTML構造・見た目・振る舞い・変更理由を共有すると確認できた場合に使用する
- ページ固有という理由だけで `p-` は付けない
- 表示切替や1プロパティ相当の補助: `u-`
- JS取得専用で見た目を持たない: `js-`
- 開閉、選択中、エラーなどの状態: `is-` / `has-`

接頭辞は分類を増やすためではなく、通常のBlockと異なる責務が確定したときだけ使う。共通化の判断は、[コンポーネントと責務](./03_コンポーネントと責務.md) も参照する。

## Blockを分ける判断

### 分ける（別Blockにする）

- 単体で再利用する可能性がある
- ページが変わっても意味が崩れない
- 独立した状態管理を持つ
- 親Blockが変わっても、部品本体として読める

### 分けない（Elementのままにする）

- 親Blockがないと意味が成立しない
- その文脈内でのみ使う部品
- 単独で取り出すと名前の意味が薄くなる

### 一覧内カードの扱い

一覧セクションの中にカードが入る場合でも、カード1件分が独立して読めるなら別Blockにする。

```html
<ul class="staff__list">
  <li class="staff__item">
    <article class="staff-card">
      <img class="staff-card__image" src="./img/staff-01.webp" alt="スタッフの写真">
      <h3 class="staff-card__title">名前が入ります</h3>
      <p class="staff-card__text">紹介文が入ります。</p>
    </article>
  </li>
</ul>
```

- `staff__list` / `staff__item`: staffセクション内での一覧構造
- `staff-card`: スタッフ1人分のカード本体
- `staff-card__image` / `staff-card__title`: カード内部の要素

Blockを分けると、PCで横並び、SPで縦並び、別ページで再利用といった変更を追いやすくなる。

## 独立BlockとMix

親Block内に別Blockを置く場合でも、子Blockは子Blockとして開始する。

```html
<div class="blog-articles__newsletter">
  <div class="newsletter">
    <div class="newsletter__body">...</div>
  </div>
</div>
```

- `blog-articles__newsletter`: 親セクション内での置き場所
- `newsletter`: 独立コンポーネント本体

ラッパーを減らしたい場合は、1要素に両方のクラスを付ける。これはBEM運用のMixとして扱う。

```html
<div class="newsletter blog-articles__newsletter">
  <div class="newsletter__body">...</div>
</div>
```

`newsletter__body` だけを単独で始める形は避ける。Block本体が不在になり、責務の追跡が難しくなる。

## 同一役割の繰り返し要素

- カード一覧などで同じ役割を繰り返す要素は、同じElement classを使う。
- 作品名や文言ベースでElement名を分けない。
- 見え方差分が必要な場合のみModifierを追加する。

```txt
OK: related-projects__img
OK: related-projects__img--wide
避ける: related-projects__sofa-img / related-projects__keyboard-img
```

## タイポグラフィ用クラスの扱い

`t-heading-lg` / `t-body` / `t-caption` のような typography 用クラスを作る考え方はあり。

ただし、BEMのBlock名や用途名クラスと混ざると「どちらが本体か」が分かりにくくなる。

- 用途名クラス: 場所、役割、構造、余白、配置を担当する
- typography用クラス: 文字サイズ、太さ、行間など、再利用する文字スタイルだけを担当する

```html
<h2 class="section-title t-heading-lg">About</h2>
```

```css
.section-title {
  margin-bottom: 40px;
  text-align: center;
}

.t-heading-lg {
  font-size: 32px;
  font-weight: 700;
  line-height: 1.5;
}
```

### 作る判断

- 1ページ完結で使う場所が少ない: 用途名クラスへ直接書く
- 複数ページで同じ文字階層を使う: `t-heading-lg` / `t-body` などへ分離する
- デザインシステム寄りに管理する: typography用クラスや `foundation/typography` を検討する

### 命名の注意

`t-section-title` のように場所名を含めると、用途名クラスとの境界が曖昧になりやすい。
typography用クラスを作るなら、場所ではなく文字階層や役割へ寄せる。

```css
/* OK: 文字階層 */
.t-heading-lg {}
.t-body {}
.t-caption {}

/* 混ざりやすい: 場所名 */
.t-section-title {}
```

小さいLPでは、無理に `t-` を作らず、`.section-title` / `.footer__copyright` のような用途名に直接タイポグラフィ指定を書く方が読みやすいことがある。

## GPTでBEM初期案を作る運用

初期段階では、1つの入れ子グループに対して「1 Block + 必要な Element」をGPTに出してもらってよい。

- 狙い:
  - 命名の負荷を下げる
  - 重複や命名ブレを減らす
  - 詳細度やセレクタ設計の混線を減らす
- 注意:
  - GPT案は初期案として使い、最終決定は責務境界で再判定する
  - 見た目責務と機能責務が混ざる場合は、Blockを分離する

実務の流れは次で固定する。

1. GPTで初期BEM案を作る
2. 人間が責務（条件 / 理由 / 例外）で再判定する
3. 必要な箇所だけBlockを再分割して確定する

#### GPT依頼テンプレ（初期案）

```txt
次のHTML構造に対して、BEM命名の初期案を作ってください。

条件:
- 1入れ子グループにつき、基本は1Blockで開始
- Elementは `__` 1段まで
- Modifierは状態差分のみ

出力:
1. class一覧
2. Block / Element 対応表
3. 責務が混ざって見える箇所（分割候補）
```

## 実務チェック（編集前）

1. そのクラスは Block / Element / Modifier のどれか
2. その調整は「核」か「文脈」か
3. 別ページ再利用の可能性があるか
4. 強いセレクタに頼らなくても書けるか
5. 3か月後に見ても意図を説明できるか

## まとめ

```txt
BEMは「命名ルール」だけではなく、
責務分離と保守性を維持するための実務ルールとして使う。
```
