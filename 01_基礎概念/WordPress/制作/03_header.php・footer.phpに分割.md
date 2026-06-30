# 03_header.php・footer.phpに分割

## 目的

HTMLの共通部分を `header.php` と `footer.php` に分ける作業を整理する。

## 最初に見る結論

ヘッダーやフッターのような共通部分は、別ファイルに分けて読み込む。

## 分けるもの

- `header.php`: `doctype`、`head`、ヘッダー、開始側の共通構造
- `footer.php`: フッター、閉じ側の共通構造
- `sidebar.php`: サイドバー部分
- `index.php`: メイン部分を受ける基本テンプレート

## 最小の形

`header.php`

```php
<!DOCTYPE html>
<html lang="ja">
<head>
  <?php wp_head(); ?>
</head>

<body>
  <header>
  </header>
```

`footer.php`

```php
  <footer>
  </footer>

  <?php wp_footer(); ?>
</body>
</html>
```

`sidebar.php`

```php
<aside>
</aside>
```

`index.php`

```php
<?php get_header(); ?>

<main>
</main>

<?php get_sidebar(); ?>
<?php get_footer(); ?>
```

まだ中身は空でよい。

重要なのは、`wp_head()` を `</head>` の直前、`wp_footer()` を `</body>` の直前に置くこと。

## 確認順

1. 共通部分を見つける
2. 上側の共通部分を `header.php` に移す
3. 下側の共通部分を `footer.php` に移す
4. 表示側で読み込む
5. HTML構造が壊れていないか確認する

## 自分の頭に残すこと

- 共通部分は分ける。
- 分けたあとは、読み込み忘れとHTMLの閉じ忘れを見る。
- `wp_head()` と `wp_footer()` は、CSSやJS読み込みにも関わる入口。
