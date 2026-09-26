# 07_flex-basisとpaddingの幅計算を確認する

`flex-basis` を指定した要素の幅が想定と合わないときは、paddingだけを単純加算せず、Flexの基準寸法と外側寸法を分けて確認する。

## flex-basisとpaddingを同時に使うとき

`flex: 1 1 391px` の `391px` はFlexの基準寸法になる。ただし、最終的な外側寸法と空き領域の計算にはpadding・border・margin、`box-sizing`、自動最小サイズ、grow/shrinkも関わる。

そのため「`flex-basis` に左右paddingが常に単純加算される」とは決めつけず、次を確認する。

1. `box-sizing` が `content-box` か `border-box` か。
2. `flex-basis` と `width` のどちらが基準になっているか。
3. DevToolsでcontent・padding・borderを含む実寸がいくつか。
4. 兄弟アイテムを含めた外側寸法の合計が親幅へ収まるか。
5. `min-width: auto` による自動最小サイズで縮みが止まっていないか。

左右のpaddingは別プロパティなので、`padding-left` と `padding-right` がカスケード上で互いに上書きするわけではない。片側を増やして反対側の内容領域が狭く見えたら、まず横幅予算を確認する。

入れ子のFlexで親子の役割が混ざる場合は、[親子のレイアウト文脈を区別する](./03_親子のレイアウト文脈を区別する.md)へ戻る。
