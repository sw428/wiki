# 11_表示制御（sp-only／pc-only／revert設計）

## 目的

- 表示制御を「見た目」ではなく「存在条件」で設計する。
- SP/PC切替時の分岐を、再利用しやすい形で固定する。

## 問題の正体

表示制御でやっていることは本質的に次の2つだけ。

- 表示する
- 表示しない

ここに「要素の種類（`div` / `span` / `button`）」を持ち込みすぎると、ルールが崩れやすい。

## 命名の考え方

### `show` より `only`

`show` は「見た目」起点になりやすく、反対条件の記述が曖昧になりやすい。

```css
/* 推奨 */
.u-sp-only {}
.u-pc-only {}
```

- `sp-only`: SPでだけ存在
- `pc-only`: PCでだけ存在

存在条件が名前に入るため、意図が読みやすい。

## 設計の核心

- コンポーネントやレイアウトの設計とは切り分ける
- ここでは「条件で存在を切る」ことに集中する

## 設計分類ではUtility / Helperとして扱う

- `.u-sp-only` / `.u-pc-only` は、部品の形や構造を作るObject・Componentではない。
- 要素へ表示条件だけを追加する補助クラスなので、実装体系ではUtility / Helperとして分ける。
- `u-` 接頭辞を使うかはプロジェクト規約に従う。既存案件へ途中から別の命名体系を混ぜない。
- 表示制御クラスへサイズ・余白・並び方まで持たせず、レイアウト責務と分離する。

## 実装（基本形）

```css
.u-pc-only {
  display: none;
}

@media (min-width: 768px) {
  .u-sp-only {
    display: none;
  }

  .u-pc-only {
    display: revert;
  }
}
```

## 状態整理

- SP初期状態
  - `u-sp-only`: 表示（未指定のまま）
  - `u-pc-only`: 非表示
- PC条件成立後
  - `u-sp-only`: 非表示
  - `u-pc-only`: 表示（`revert`）

## `display: revert` の意味

`revert` は「`block` にする」指定ではない。

- いったん上書きした値を、元の表示値へ戻す指定
- `span` なら `inline` に戻る
- `div` なら `block` に戻る

利点:
- 要素ごとの元displayを都度考えなくてよい

## 判断基準

1. これは表示制御の問題か（存在条件）
2. それともレイアウト問題か（`flex` / `grid` / `gap`）
3. 表示制御なら `only` と `revert` で統一できるか

## 注意点

- この設計は「表示制御専用」
- レイアウト切替（`display: flex/grid`）の主軸としては使わない
- チーム運用時は `revert` の意図を最初に共有しておく
- SP/PCで表示文言を切り替える場合も、同一データ（日時・価格など）の意味値は変えない

## 認知アプローチ（知識に至る手順）

1. 先に「何を表示するか」ではなく「どの条件で存在させるか」を書く
2. SPを初期状態に固定する
3. PC条件で `消す側` と `戻す側` を分ける
4. `display` の型は考えず、`revert` で元に戻す
5. 実装後に、SP/PCの4状態（sp-only/pc-only）をチェックする

## この設計を先に固める理由（認知負荷）

この領域で毎回 `inline/block/flex` を考え始めると、学習コストが増え続ける。
表示制御では次だけに思考を狭める。

- 存在させるか
- 存在させないか

`display: revert` を使う理由は、要素ごとの元display差をここで再判断しないため。
「表示設計」を「存在条件設計」として固定すると、他のレイアウト問題と混線しにくい。

## レイアウト問題と混ぜない境界

- 表示制御: `sp-only` / `pc-only` / `none` / `revert`
- レイアウト制御: `flex` / `grid` / `gap` / `align-*`

表示制御で詰まったときに、レイアウト調整へ逃げないことを優先する。

## SP専用部品は「存在」と「位置」を分ける

SPでだけ出すヘッダー行やメニューボタンは、まず存在条件を表示制御クラスで分ける。
そのうえで、どこに置くかは通常フロー・Flex・Grid・`position` の問題として別に判断する。

```html
<div class="site-header__menu u-sp-only">
  <button class="hamburger-button" type="button">...</button>
</div>
```

```css
.site-header__menu {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
```

- SPでだけ存在させたい: `u-sp-only` / `visible-sp`
- PCでだけ存在させたい: `u-pc-only` / `visible-pc`
- 写真やヒーローの上に重ねたい: `position` を検討する
- 上下の順番どおりに置きたい: 通常フローを優先する

「SPに出すから `position` が必要」ではない。
重ねる必要がないなら、HTML上の順番と通常フローで置いた方が、後から読んだ時に位置関係を追いやすい。

## まとめ

- 表示制御は存在条件の設計
- `only` 命名で条件を明示
- SP初期 + PC上書きで運用
- `revert` で要素ごとのdisplay差を吸収
