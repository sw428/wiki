# 06_静的HTMLからWordPress化する流れ

## 目的

HTML / CSS / BEMで作った静的ページを、WordPressテーマへ変換する流れを整理する。

## 最初に見る結論

最初からWordPressのPHP込みで全部書こうとしなくてよい。

先に普通のHTML / CSS / BEMで構造を固めてから、必要な場所だけWordPress関数へ置き換える流れでよい。

WordPressでは、細かいPHP文法を全部覚えるより、HTMLをどの単位でテンプレート化し、どこをWordPress関数へ置き換えるかを先に見る。

## 基本の流れ

1. 普通のHTML / CSSでBEM込みの静的ページを作る
2. 表示が完成したら共通部分を見つける
3. `header.php` / `footer.php` / `sidebar.php` に分割する
4. 固定パスをWordPress関数に置き換える
5. `index.php` / `single.php` / `page.php` などに分ける
6. 投稿一覧や詳細ページで必要になったらループを入れる

SCSSで `header` / `footer` の見た目を分けることと、WordPressで `header.php` / `footer.php` のHTMLを分けることは、対象が違う。

詳しくは [WordPressとSCSSのレイヤー](../基礎/08_WordPressとSCSSのレイヤー.md) に戻す。

## 変える場所

CSSクラス名やBEM設計は、基本そのままでよい。

変える中心は、URLや画像パスなど、WordPress環境に依存する部分。

| 静的HTMLの見方 | WordPress化するとき |
| --- | --- |
| `href="/"` | `home_url('/')` |
| `href="/contact/"` | `home_url('/contact/')` |
| `src="img/common/logo.svg"` | `get_theme_file_uri('img/common/logo.svg')` |
| `head` 内 | `wp_head()` を入れる |
| `body` 閉じ前 | `wp_footer()` を入れる |
| 共通ヘッダー | `header.php` に分ける |
| 共通フッター | `footer.php` に分ける |

## 例

最初は普通にHTMLで作る。

```html
<header class="site-header">
  <div class="site-header__inner l-wrapper">
    <h1 class="site-header__title">
      <a class="site-header__logo" href="/">
        <img src="img/common/logo.svg" alt="Travel Blog">
      </a>
    </h1>

    <nav class="global-nav">
      <ul class="global-nav__list">
        <li class="global-nav__item">
          <a class="global-nav__link" href="/category/news/">NEWS</a>
        </li>
      </ul>
    </nav>
  </div>
</header>
```

あとからWordPress用に置き換える。

```php
<header class="site-header">
  <div class="site-header__inner l-wrapper">
    <h1 class="site-header__title">
      <a class="site-header__logo" href="<?php echo esc_url(home_url('/')); ?>">
        <img src="<?php echo esc_url(get_theme_file_uri('img/common/logo.svg')); ?>" alt="Travel Blog">
      </a>
    </h1>

    <nav class="global-nav">
      <ul class="global-nav__list">
        <li class="global-nav__item">
          <a class="global-nav__link" href="<?php echo esc_url(home_url('/category/news/')); ?>">NEWS</a>
        </li>
      </ul>
    </nav>
  </div>
</header>
```

変わっているのは、主にURLと画像パス。

## CodeJump式の短い書き方との付き合い方

CodeJumpの例では、トップページだけロゴを `h1` にし、それ以外では `div` にするために、タグ名をPHP変数へ入れる書き方が出ることがある。

```php
<?php $html_tag = (is_home() || is_front_page()) ? 'h1' : 'div'; ?>
<<?php echo $html_tag; ?> class="site-title wrapper">
  <a href="<?php echo esc_url(home_url('/')); ?>">
    <img src="<?php echo esc_url(get_theme_file_uri('img/common/logo.svg')); ?>" alt="Travel Blog">
  </a>
</<?php echo $html_tag; ?>>
```

これは、同じ中身を2回書かずに `h1` / `div` だけ切り替える省略形。

初心者のうちは、まず固定の `div` でよい。

```php
<div class="site-title wrapper">
  <a href="<?php echo esc_url(home_url('/')); ?>">
    <img src="<?php echo esc_url(get_theme_file_uri('img/common/logo.svg')); ?>" alt="Travel Blog">
  </a>
</div>
```

余裕が出たら、次のような `if / else` 版で意味を追う。

```php
<?php if (is_home() || is_front_page()) : ?>
  <h1 class="site-title wrapper">
    ...
  </h1>
<?php else : ?>
  <div class="site-title wrapper">
    ...
  </div>
<?php endif; ?>
```

最後に、CodeJump式の短い書き方を「重複を減らした形」として読む。

## GPTやスニペットを使う前提

静的HTMLからWordPress用PHPへの変換は、GPTやスニペットと相性がよい。

ただし、変換後に見る場所は自分で分類する。

- URL系か
- 画像パス系か
- 読み込み系か
- 投稿ループ系か
- 条件分岐か

## 関連

- [WordPressで読むPHPの型](../基礎/07_WordPressで読むPHPの型.md)
- [WordPressとSCSSのレイヤー](../基礎/08_WordPressとSCSSのレイヤー.md)
- [WordPress学習の優先順位](../基礎/01_WordPress学習の優先順位.md)
- [header.php・footer.phpに分割](./03_header.php・footer.phpに分割.md)
- [WordPressスニペット運用](./開発環境/02_WordPressスニペット運用.md)

## 自分の頭に残すこと

- HTML / CSS / BEMを先に固めてからWordPress化してよい。
- BEMのクラス設計は基本そのまま使える。
- 変換する中心は、URL、画像パス、共通部分、ループ。
- 短いPHPの省略形は、最初から暗記しなくてよい。
