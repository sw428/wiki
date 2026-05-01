# メモ(HTML・CSS)

## 位置づけ

- ここは「未整理メモの受け皿」と「振り分けログ」を置く
- 本線化した内容は各テーマファイルへ移す

## 振り分けログ（2026-05-01）

- 受け取り元: GPT対話の長文メモ（初期認識を含む）
- 反映先:
  - [02_ボックスとdisplay](./02_ボックスとdisplay.md)
  - [03_インラインと行の仕組み](./03_インラインと行の仕組み.md)
  - [04_画像と背景](./04_画像と背景.md)
  - [05_レイアウト](./05_レイアウト.md)
  - [06_ブラウザ挙動とズレ](./06_ブラウザ挙動とズレ.md)
  - [07_HTMLの意味と構造](./07_HTMLの意味と構造.md)
  - [08_メディア設計（img・video・object-fit・aspect-ratio）](./08_メディア設計（img・video・object-fit・aspect-ratio）.md)
  - [09_表示制御（sp-only／pc-only／revert設計）](./09_表示制御（sp-only／pc-only／revert設計）.md)

## メモ

- 「正誤を即断する」より、「どこが曖昧か」を残しながら精度を上げる
- 誤解しやすい内容は、各ファイルで `確度: 高/中/要修正` を付けて管理する
- 実務判断で迷う内容は、必要に応じて `02_案件・制作` 側へ運用ルールとして降ろす

## 振り分けログ（2026-05-02）

受け取り元: CSSの追加長文メモ（コンポーネント上書き境界 / フォントメトリクス / レイアウト内部仕様 / 画像とスクロールズレ）

### 追記先

- [01_CSS設計方針（BEM × レイアウト分離）](./01_CSS設計方針（BEM × レイアウト分離）.md)
  - コンポーネント核とページ側上書きの境界
  - 上書き可否の判断
  - サイズ差分をModifierで扱う方針
- [03_インラインと行の仕組み](./03_インラインと行の仕組み.md)
  - font box / line box / border box の区別
  - 視覚中心と数学中心のズレ
  - `inline-block` と `inline-flex` の基準差
- [05_レイアウト](./05_レイアウト.md)
  - Margin Collapse
  - Formatting Context
  - Containing Block
  - `min-width: 0` と `minmax(0, 1fr)` の役割差
- [06_ブラウザ挙動とズレ](./06_ブラウザ挙動とズレ.md)
  - 画像ロードがJS補正後に再レイアウトを発生させる時系列
- [08_メディア設計（img・video・object-fit・aspect-ratio）](./08_メディア設計（img・video・object-fit・aspect-ratio）.md)
  - `width`/`height` と `aspect-ratio` の予約タイミング比較
  - 崩れやすい `img { width: 100%; height: 100%; }` パターン

## 追記ログ（2026-05-02）

- 要望: 「固い知識」だけでなく、そこに至る認知的アプローチも残す
- 反映: [00_HTML・CSS整理マップ](./00_HTML・CSS整理マップ.md) に `認知アプローチ（知識に至る手順）` を追加

## 追記ログ（2026-05-02-2）

- 受け取り元: CSS追加ログ（scrollズレ、画像予約、`min-width: 0` 文脈の深掘り）
- 反映:
  - [06_ブラウザ挙動とズレ](./06_ブラウザ挙動とズレ.md)
    - 横幅変更が改行経由で高さに波及する説明
    - `scroll-margin-top` / `content-visibility` の補助対策
  - [08_メディア設計（img・video・object-fit・aspect-ratio）](./08_メディア設計（img・video・object-fit・aspect-ratio）.md)
    - 画像対策の優先適用順（枚数・波及度ベース）

## 追記ログ（2026-05-02-3）

- 受け取り元: 表示制御ログ（sp-only / pc-only / display / revert）
- 反映:
  - [09_表示制御（sp-only／pc-only／revert設計）](./09_表示制御（sp-only／pc-only／revert設計）.md)
    - 「表示」ではなく「存在条件」で設計する軸
    - `only` 命名と `revert` の使い分け
    - 認知アプローチ（判断手順）

## 追記ログ（2026-05-02-4）

- 受け取り元: 長文貼り付けログの再振り分け依頼（重複可 / 認知アプローチ優先）
- 反映:
  - [00_HTML・CSS整理マップ](./00_HTML・CSS整理マップ.md)
    - ベース原理セット（役割/外内/構造と余白/親優先/全体→例外）
  - [05_レイアウト](./05_レイアウト.md)
    - Grid判断軸、親責任優先、認知アプローチ追記
  - [08_メディア設計（img・video・object-fit・aspect-ratio）](./08_メディア設計（img・video・object-fit・aspect-ratio）.md)
    - 2択判断、外/箱/中身分解、border-radiusとoverflowの責務
  - [09_表示制御（sp-only／pc-only／revert設計）](./09_表示制御（sp-only／pc-only／revert設計）.md)
    - 認知負荷削減の理由、表示制御とレイアウト制御の境界

## 追記ログ（2026-05-02-5）

- 受け取り元: Grid/DevTools/A11y整理の長文ログ
- 反映:
  - [05_レイアウト](./05_レイアウト.md)
    - 通常フローとGridの見方
    - `1fr` / `min-width: 0` / `minmax(0, 1fr)` の差分整理
  - [06_ブラウザ挙動とズレ](./06_ブラウザ挙動とズレ.md)
    - DevTools Computed値の見方
    - Grid overlay / Flex space-between の計測方針
  - [07_HTMLの意味と構造](./07_HTMLの意味と構造.md)
    - A11y / セマンティックHTML / セクショニング / ランドマーク
    - `hidden` と `aria-expanded` の対象差分
    - `article` への `aria-labelledby` の優先度判断
