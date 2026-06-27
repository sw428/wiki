# 04_functions.phpでCSSを読み込む

## 目的

WordPressでCSSを読み込む作業を整理する。

## 最初に見る結論

WordPressでは、CSSをHTMLに直接書くより、`functions.php` で読み込む。

## 使うもの

- `functions.php`
- `wp_enqueue_style`

## 確認順

1. CSSファイルの場所を確認する
2. `functions.php` に読み込み処理を書く
3. パスが合っているか確認する
4. ブラウザでCSSが反映されているか見る
5. DevToolsで404になっていないか見る

## 自分の頭に残すこと

- CSS読み込みは `functions.php` を見る。
- 反映されないときはパスと404を見る。
