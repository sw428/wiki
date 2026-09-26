# 08_意図しない幅でmedia queryが効く原因を調べる

PC用に書いた指定がSPでも効いているなど、`@media`の条件と表示が合わないときは、対象要素・指定の出所・波括弧・viewportを順に確認する。

CSS宣言の採用・不採用を調べる基本操作は[06のDevTools入口](../06_CSSカスケードとDevToolsの見方/01_DevToolsで適用されたCSSを確認する.md)を使う。

## `@media`の指定が意図しない幅でも効く場合

例えば、PC用に書いた `display: flex`がSPでも効いている場合は、次の順で確認する。

1. `display`を指定した親要素を選ぶ。`ul`へ指定したなら、子の `li`ではなく `ul`を見る。
2. Computedで `display`を確認する。
3. 値の出所となるファイルと行を確認する。
4. Stylesまたはソースで、`@media`の波括弧が意図した位置で閉じているか確認する。
5. DevToolsのviewport幅とメディア条件を比較する。

要素自体の幅が529pxだからSP用の条件になる、という判断はしない。通常の `@media (min-width: ...)`や `max-width`はviewportなどのメディア条件を評価する。
