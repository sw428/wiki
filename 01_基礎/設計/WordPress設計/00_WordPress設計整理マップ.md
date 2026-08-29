# 00_WordPress設計整理マップ

## 目的

このフォルダは、WordPress制作で実装判断が分かれやすい設計方針をまとめる場所。

WordPressの仕組みそのものの説明ではなく、テーマ分割、読み込み責務、静的HTMLからの変換順、SCSSとの境界など、自分が制作時に採用する判断を置く。

## まず参照する既存ノート

- [WordPress整理マップ](../../WordPress/00_WordPress整理マップ.md)
- [テーマ作成手順](../../WordPress/制作/01_テーマ作成手順.md)
- [header.php・footer.phpに分割](../../WordPress/制作/03_header.php・footer.phpに分割.md)
- [functions.phpでCSSを読み込む](../../WordPress/制作/04_functions.phpでCSSを読み込む.md)
- [静的HTMLからWordPress化する流れ](../../WordPress/制作/06_静的HTMLからWordPress化する流れ.md)
- [functions.phpとフック](../../WordPress/基礎/06_functions.phpとフック.md)
- [WordPressとSCSSのレイヤー](../../WordPress/基礎/08_WordPressとSCSSのレイヤー.md)

## 置くもの

- 静的HTMLをWordPressテーマへ変換する順番
- `header.php` / `footer.php` / `functions.php` などの分割責務
- CSS / JS 読み込みをどこで管理するか
- SCSSとWordPressテーマの責務境界
- テンプレート階層やループを導入するタイミング
- ケース検証から戻した、案件を超えて使うWordPress設計判断

## 置かないもの

- WordPress用語の一般説明だけで済む内容
- PHP文法そのものの説明
- プラグインや管理画面の一回限りの操作ログ
- 案件固有のテーマ名、素材、納品条件

## 現時点の扱い

既存のWordPressノートはすぐに移動しない。
設計として再利用する判断が増えたものから、このフォルダへ正本化する。
