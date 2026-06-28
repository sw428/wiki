# 01_PHP Intelephense

## 目的

WordPressテーマ制作の開発環境として、PHP Intelephenseが何のための拡張機能かを整理する。

## 最初に見る結論

PHP拡張は必須ではない。

ただし、WordPressテーマを書くなら `PHP Intelephense` は入れた方が見やすくなる。

## 役割の分け方

- PHPを動かす役: Local / WordPress環境
- PHPをVS Codeで書きやすくする役: VS Code拡張機能

`PHP Intelephense` は、PHPを動かすものではない。

VS CodeでPHPを書くときの入力補助・チェック機能として見る。

この考え方自体は、単語カードの [実行環境とエディタ補助の違い](<../../../03_参照元/実行環境とエディタ補助の違い.md>) に分けて残す。

## PHP Intelephenseで楽になること

- PHPコードの色分け
- 関数名の入力補完
- 文法ミスに気づきやすくする
- 変数や関数の参照ジャンプ
- WordPress関数を書いたときの見通し改善

## WordPressで出てくる例

```php
<?php get_header(); ?>

<main>
  <h1>ブログ</h1>
</main>

<?php get_footer(); ?>
```

`get_header()` や `get_footer()` のようなPHP / WordPress関数を書くとき、補完や色分けがあると読みやすくなる。

## 最初に入れるなら

WordPressテーマ制作の最初は、次くらいでよい。

- PHP Intelephense
- Prettier
- Japanese Language Pack

すでにPrettierと日本語化が入っているなら、追加で考えるのは `PHP Intelephense` くらい。

## 注意

`PHP Intelephense` を入れても、PHPが実行できるようになるわけではない。

実行はLocal / WordPress環境側で行う。

拡張機能は、VS Code上でコードを見やすく、書きやすくするための補助として扱う。

## 自分の頭に残すこと

- PHPを動かすのはLocal / WordPress環境。
- PHP IntelephenseはVS CodeでPHPを書くための補助。
- 必須ではないが、WordPressテーマを書くなら入れた方が楽。
