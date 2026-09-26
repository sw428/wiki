# 06_Gridのトラックとgapを確認する

Gridの列や行、`gap`が予想と違うときは、Grid Overlayでトラックと空きの位置を確認する。

CSS宣言の採用・不採用を調べる基本操作は[06のDevTools入口](../06_CSSカスケードとDevToolsの見方/01_DevToolsで適用されたCSSを確認する.md)を使う。最終的な幅や高さを確認する場合は[DevToolsで計算後の寸法を確認する](./05_DevToolsで計算後の寸法を確認する.md)へ戻る。

## Grid Overlayでトラックとgapを見る

1. Elementsで、`display: grid`または`display: inline-grid`が適用されたGridコンテナを選ぶ。
2. DOMツリーで要素の横にある`grid`バッジを押し、Grid Overlayを表示する。
3. 必要に応じてLayoutペインを開き、`Show track sizes`を有効にする。

Overlayでは、グリッド線、行と列のトラック、`gap`の範囲を対応させる。Overlayの色は変更できるため、特定の色だけを目印にしない。

`Show track sizes`では、CSSへ書いたトラックサイズと、画面上で計算されたサイズを確認できる。`gap`の数値がOverlayへ直接表示されない場合は、StylesまたはComputedの`gap`、`row-gap`、`column-gap`へ戻って値を確認する。

## 公式情報

- [Chrome DevTools - Inspect CSS grid layouts](https://developer.chrome.com/docs/devtools/css/grid)
