# 04_DevToolsで表示変化を調べる

表示が予想と違うときは、原因候補を一度に変えず、対象要素と確認する値を一つずつ絞る。

CSS宣言の採用・不採用を調べる基本操作は[06のDevTools入口](../../06_CSSカスケードとDevToolsの見方/01_DevToolsで適用されたCSSを確認する.md)を使う。このページでは、寸法・Grid・Flex・編集差分・メディアクエリの確認先を分ける。

## Computedで結果の値を見る

Computedは、対象要素で最終的に使われる値を調べる場所である。薄い表示の `height: 439px`などは、CSSへ直接書いた値ではなく、Layoutの結果として表示されている場合がある。

1. Elementsで対象要素を選ぶ。
2. Computedで確認したいプロパティ名を検索する。
3. Stylesの宣言と、Computedに出た結果を区別する。

幅・高さ・余白は[05のボックスモデル図](../../05_ボックスとdisplay/03_ボックスモデルの4領域.md#devtoolsで4領域を対応させる)でも確認できる。

## Grid Overlayでトラックとgapを見る

- 紫色などの斜線は `gap`の範囲を示す。
- `gap`の数値が画面上へ直接表示されない場合もある。
- 空きトラックの幅は `Show track sizes`を有効にして確認する。

Flexの `space-between`は、Gridと同じ形で空きの寸法を表示できるとは限らない。必要ならConsoleで `getBoundingClientRect()`を使い、隣接する要素の座標差から確認する。

## Changesで試した編集を確認する

ElementsのStylesやSourcesでCSSを試しながら直した場合は、ChangesパネルでDevTools内の変更箇所をまとめて確認できる。

- DevTools右上のメニューから `More tools`、`Changes`を選ぶ。
- または `Ctrl + Shift + P`を押し、`Show Changes`を実行する。

Changesが追跡するのはDevTools内で行った編集である。CSSはElementsのStylesまたはSources、JavaScriptはSourcesの変更を確認できる。Elementsで一時的に変えたDOMまで常に一覧化されるとは考えない。

ページまたはDevToolsを再読み込みすると、通常の編集差分は消える。再読み込み後も試作を残す場合はLocal Overrides、ローカルのソースファイルへ保存する場合はWorkspacesを使い分ける。

## `@media`の指定が意図しない幅でも効く場合

例えば、PC用に書いた `display: flex`がSPでも効いている場合は、次の順で確認する。

1. `display`を指定した親要素を選ぶ。`ul`へ指定したなら、子の `li`ではなく `ul`を見る。
2. Computedで `display`を確認する。
3. 値の出所となるファイルと行を確認する。
4. Stylesまたはソースで、`@media`の波括弧が意図した位置で閉じているか確認する。
5. DevToolsのviewport幅とメディア条件を比較する。

要素自体の幅が529pxだからSP用の条件になる、という判断はしない。通常の `@media (min-width: ...)`や `max-width`はviewportなどのメディア条件を評価する。

## 測定対象を決めてから値を取る

DevToolsのBox Modelはtransform前のCSSボックス、`getBoundingClientRect()`はtransformを反映した軸平行の外接矩形を確認するときに使う。回転した図形では同じ値にならない。必要になったら[transform後の外接矩形](../../../../03_詳細/01_HTML・CSS/03_transform後の外接矩形.md)で条件と計算例を確認する。

## 公式情報

- [Chrome DevTools - CSS features reference](https://developer.chrome.com/docs/devtools/css/reference/)
- [Changes: Track your HTML, CSS, and JavaScript changes](https://developer.chrome.com/docs/devtools/changes/)
- [Override web content and HTTP response headers locally](https://developer.chrome.com/docs/devtools/overrides/)
