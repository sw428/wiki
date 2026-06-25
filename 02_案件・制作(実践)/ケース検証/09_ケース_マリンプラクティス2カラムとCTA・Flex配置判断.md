# 09_ケース_マリンプラクティス2カラムとCTA・Flex配置判断

## 1. 事実（案件文脈）

- 対象は、マリンプラクティス制作中のHTML/CSS相談ログ。
- 同一回で次の議題が混在した。
  - `div` の幅・高さが大きく見える原因切り分け
  - リセットCSSで `body` や各要素の既定余白をどう扱うか
  - main / aside の2カラムをFlexでどう分けるか
  - 「新着情報一覧へ」のようなCTAボタンを `inline-block` / `inline-flex` のどちらで作るか
  - 矢印を `::after` にするか、`span + img` にするか
  - お客様の声カードで、日付・コース名を右下へ置く方法
  - Flex container / flex item / 要素自身の中身配置の言葉の整理
- 案件本体の実践記録は `02_案件・制作/ポートフォリオサイト/マリンプラクティス/01_実装で意識したこと.md` に残し、再利用できる原理だけを `01_学習本線` へ戻す。

## 2. 判断プロセス

### ケース1: 幅・高さを余白と決めつけるか

#### 候補A: 大きく見える原因を `margin` / `padding` として扱う

- 判定: 不採用
- 理由: DevToolsで青いcontent領域が広い場合、余白ではなく要素本体の幅・高さとして成立している可能性がある。

#### 候補B: 横はblock幅、縦は行の高さと積み重なりを先に見る

- 判定: 採用
- 理由: `div` は通常フローで親幅いっぱいに広がりやすい。縦方向は `line-height`、行数、子要素の積み重なりで大きくなるため、余白より先に表示ボックスと行ボックスを見る方が再現性が高い。

#### ケース1の確認順

1. DevToolsで content / padding / border / margin のどこが広いかを見る
2. 横方向は `display` と親幅を見る
3. 縦方向は `line-height` と行数を見る
4. その後で、自分で付けた `padding` / `gap` / `margin` を見る

### ケース2: main / aside の2カラムをどう作るか

#### 候補A: main と aside の両方に固定幅を直接指定する

- 判定: 条件付き
- 理由: カンプ値をそのまま再現しやすいが、両方を固定しすぎると親幅が足りない時に横あふれしやすい。

#### 候補B: aside を固定し、main は残り幅を受ける

- 判定: 採用（既定）
- 理由: サイドバーはバナーや固定幅画像を含みやすく、潰したくない。一方で main は本文領域として可変にしやすい。

```css
.page-layout {
  display: flex;
  gap: var(--layout-gap);
  align-items: flex-start;
}

.page-layout__main {
  flex: 1;
  min-width: 0;
}

.page-layout__side {
  width: var(--sidebar-width);
  flex-shrink: 0;
}
```

#### ケース2の判断軸

- Flexだから子に幅を書いてはいけない、ではない。
- 固定したい子だけ幅を持たせ、可変にしたい子は `flex: 1` へ任せる。
- `flex-shrink: 0` は「潰したくない子」に限定して使う。
- 可変側には `min-width: 0` を置き、長文や画像で縮み拒否が出る余地を減らす。

### ケース3: CTAボタンを `inline-block` / `inline-flex` のどちらで作るか

#### 候補A: 文字だけのリンク箱として `inline-block` にする

- 判定: 条件付き採用
- 理由: 文章中に自然に置く小さいリンクや、文字だけのボタンなら最小で素直。

#### 候補B: 文字 + 矢印 / アイコンを中央揃えするため `inline-flex` にする

- 判定: 採用（今回）
- 理由: CTA内に矢印やアイコンがあり、文字との間隔や上下中央を制御したい場合は、内部をflex itemとして扱える `inline-flex` が読みやすい。

```css
.news__more-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  padding: 11px 16px 12px 20px;
}
```

#### ケース3の補足

- まず `padding` でボタン面積を作る。
- カンプ上の最低サイズを守りたい場合だけ `min-width` / `min-height` を足す。
- 完全固定が要件なら `width` / `height` を使うが、文字変更に弱くなる。
- `::after` は元要素の内側に追加される疑似的な子要素なので、ボタンのpadding内に入る。
- 簡単な文字矢印なら `::after`、SVG素材や位置調整が必要なら `span + img` にする。

### ケース4: Voiceカードのメタ情報を右下へ置く方法

#### 候補A: `.voice__meta` に `display: flex` を付ける

- 判定: 不採用
- 理由: `display: flex` はその要素の中身をflex配置にする指定であり、`.voice__meta` 自身を右下へ動かす効果はない。

#### 候補B: 本文領域を縦Flexにし、`.voice__meta` を下へ押し下げる

- 判定: 採用
- 理由: タイトル・本文・メタ情報を縦方向のflex itemとして扱い、最後の要素だけ余った縦スペースを吸収させると、構造と目的が一致する。

```css
.voice__content {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.voice__meta {
  margin-top: auto;
  text-align: right;
}
```

#### ケース4の分岐

- `.voice__meta` の箱を右へ寄せたい: `align-self: flex-end`
- `.voice__meta` は横幅いっぱいのまま、文字だけ右寄せしたい: `text-align: right`
- テキストだけの右寄せなら、`display: flex; justify-content: flex-end;` より `text-align: right` の方が素直。

### ケース5: Flexの言葉の整理

- `display: flex` は、その要素自身を動かす指定ではない。
- その要素を「直下の子要素の配置を管理する親」に変える指定。
- ある要素は、外側から見れば flex item であり、内側では flex container にもなれる。

```txt
.voice__item
└─ display: flex
   ├─ .voice__image-wrap  -> flex item
   └─ .voice__body        -> flex item
        └─ .voice__content
             └─ display: flex
                ├─ .voice__title -> flex item
                ├─ .voice__text  -> flex item
                └─ .voice__meta  -> flex item
```

## 3. 案件固有として残すもの（02側）

- マリンプラクティスでは、main / aside の2カラムを「固定サイド + 可変メイン」として読む。
- CTAボタンは、文字だけではなく矢印アイコンを含む部品として扱い、内部整列のため `inline-flex` を優先する。
- Voiceカードでは、メタ情報の下寄せは `.voice__content` の縦Flexで行い、右寄せは文字だけなら `text-align` で分ける。
- 実装値や素材名は案件側に限定し、学習本線には「固定/可変」「箱/中身」「疑似要素/実要素」の判断軸だけ戻す。

## 4. 本線へ戻すもの（01側）

- 再利用可能な原理:
  - 見えている大きさは、余白ではなくblock幅・行ボックス・親幅の結果であることがある。
  - Flex子要素への幅指定は、固定したい子に限定すれば問題ない。
  - `flex-shrink: 0` は固定したい子、`flex: 1; min-width: 0;` は可変側の基本形として使える。
  - `inline-block` は文章中の小さい箱、`inline-flex` は文字 + アイコンの内部整列に向く。
  - `::after` は元要素のpadding内に入る疑似的な子要素として扱う。
  - 右下配置は「要素自身を動かす」のか「中の文字を寄せる」のかで指定を分ける。
- 判断順:
  1. 見えている広さが content / padding / margin のどれかを見る
  2. レイアウトは固定したい子と可変にしたい子を分ける
  3. ボタンは中身が文字だけか、アイコン込みかを見る
  4. Flexでは対象が「親の直下の子」か「その要素の中身」かを言葉で分ける
- 例外条件:
  - テキストやボタン幅が完全固定のデザイン要件なら、`min-*` ではなく固定 `width` / `height` を選ぶこともある。
  - 装飾アイコンでも、画像素材として位置やサイズを細かく管理したい場合は、疑似要素より実要素を使う。

## 5. 本線への反映先

- 反映ファイル:
  - `01_学習本線/HTML・CSS/02_インラインと行の仕組み.md`
  - `01_学習本線/HTML・CSS/04_レイアウト.md`
  - `01_学習本線/HTML・CSS/06_HTMLの意味と構造.md`
- 反映内容（要約）:
  - `inline-block` / `inline-flex` の実務使い分け、padding / min-size / `::after` / `gap` の判断を追記。
  - 固定サイド + 可変メインのFlex設計、`flex-shrink: 0` / `flex: 1` / `min-width: 0` の役割、縦Flexで最後の要素を下へ送る判断を追記。
  - 装飾アイコンを疑似要素で足すか、`span + img` の実要素にするかの判断を追記。
