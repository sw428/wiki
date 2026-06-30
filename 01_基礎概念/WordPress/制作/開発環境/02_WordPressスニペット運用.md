# 02_WordPressスニペット運用

## 目的

WordPressテーマ制作で使うVS Codeスニペットを、学習しやすい粒度で整理する。

## 最初に見る結論

スニペットは、PHPを丸暗記するためではなく、決まった型を安全に出すために使う。

最初は、小さい部品を読めるようにしてから、大きいスニペットで時短する。

## 入れる場所

VS Codeで次の順に開く。

1. `Ctrl + Shift + P`
2. `Snippets: Configure Snippets`
3. `php.json`

PHPファイルで使うスニペットは、`php.json` に入れる。

`javascript.json` などに入れても、`functions.php` では出ない。

## スニペットが出ないとき

まず、`functions.php` を開いた状態で右下の言語モードを見る。

`PHP` になっていればよい。

`Plain Text` などになっている場合は、クリックして `PHP` に変更する。

空の `functions.php` では、まだPHPファイルとして認識されにくく、PHP用スニペットが出にくいことがある。

その場合は、最初に手で `<?php` を入れてから、下でスニペットを使う。

```php
<?php

// ここで wpenq などを使う
```

`<?php` はファイル先頭に1回だけでよい。

## 粒度の考え方

小さい部品:

- `phpstart`
- `wpinfo`
- `wphome`
- `wptfile`
- `wphead`
- `wpfooterhook`

中くらいの部品:

- `wplogo`
- `wpnavli`

大きい部品:

- `wpenq`
- `wpenqfull`
- `wpheader`
- `wpfooter`
- `wpindex`
- `wploop`

最初から全部を大きいスニペットで出すと、意味を飛ばしやすい。

ただし、毎回すべて手打ちすると記号がつらい。

小さいスニペットで意味を掴み、慣れたら大きいスニペットで時短する。

## まとめ版 php.json

```json
{
  "PHP opening tag": {
    "prefix": "phpstart",
    "body": [
      "<?php",
      ""
    ],
    "description": "PHP opening tag"
  },

  "WP bloginfo": {
    "prefix": "wpinfo",
    "body": [
      "<?php bloginfo('${1|name,description,charset|}'); ?>"
    ],
    "description": "WordPress bloginfo"
  },

  "WP home url": {
    "prefix": "wphome",
    "body": [
      "<?php echo esc_url(home_url('${1:/}')); ?>"
    ],
    "description": "WordPress escaped home URL"
  },

  "WP theme file uri": {
    "prefix": "wptfile",
    "body": [
      "<?php echo esc_url(get_theme_file_uri('${1:img/common/logo.svg}')); ?>"
    ],
    "description": "WordPress escaped theme file URI"
  },

  "WP theme image tag": {
    "prefix": "wptimg",
    "body": [
      "<img src=\"<?php echo esc_url(get_theme_file_uri('${1:img/common/logo.svg}')); ?>\" alt=\"${2:Travel Blog}\">"
    ],
    "description": "WordPress image from theme file URI"
  },

  "WP head": {
    "prefix": "wphead",
    "body": [
      "<?php wp_head(); ?>"
    ],
    "description": "WordPress wp_head"
  },

  "WP footer hook": {
    "prefix": "wpfooterhook",
    "body": [
      "<?php wp_footer(); ?>"
    ],
    "description": "WordPress wp_footer"
  },

  "WP get header": {
    "prefix": "wpgetheader",
    "body": [
      "<?php get_header(); ?>"
    ],
    "description": "WordPress get_header"
  },

  "WP get footer": {
    "prefix": "wpgetfooter",
    "body": [
      "<?php get_footer(); ?>"
    ],
    "description": "WordPress get_footer"
  },

  "WP get sidebar": {
    "prefix": "wpgetsidebar",
    "body": [
      "<?php get_sidebar(); ?>"
    ],
    "description": "WordPress get_sidebar"
  },

  "WP logo link BEM": {
    "prefix": "wplogo",
    "body": [
      "<a class=\"${1:site-header__logo}\" href=\"<?php echo esc_url(home_url('/')); ?>\">",
      "  <img src=\"<?php echo esc_url(get_theme_file_uri('${2:img/common/logo.svg}')); ?>\" alt=\"${3:Travel Blog}\">",
      "</a>"
    ],
    "description": "WordPress logo link with BEM class"
  },

  "WP nav li": {
    "prefix": "wpnavli",
    "body": [
      "<li class=\"${1:global-nav__item}\">",
      "  <a class=\"${2:global-nav__link}\" href=\"<?php echo esc_url(home_url('${3:/category/news/}')); ?>\">${4:NEWS}</a>",
      "</li>"
    ],
    "description": "WordPress navigation list item"
  },

  "WP enqueue styles no php tag": {
    "prefix": "wpenq",
    "body": [
      "// CSS読み込み用の関数を作る",
      "function my_enqueue_styles() {",
      "",
      "  // ress.css を先に読み込む",
      "  wp_enqueue_style('ress', '//unpkg.com/ress/dist/ress.min.css', array(), false, 'all');",
      "",
      "  // style.css を ress の後に読み込む",
      "  wp_enqueue_style('style', get_stylesheet_uri(), array('ress'), false, 'all');",
      "}",
      "",
      "// WordPressのCSS/JS読み込みタイミングで my_enqueue_styles を実行する",
      "add_action('wp_enqueue_scripts', 'my_enqueue_styles');"
    ],
    "description": "WordPress enqueue CSS without PHP tag"
  },

  "WP enqueue styles with php tag": {
    "prefix": "wpenqfull",
    "body": [
      "<?php",
      "",
      "// CSS読み込み用の関数を作る",
      "function my_enqueue_styles() {",
      "",
      "  // ress.css を先に読み込む",
      "  wp_enqueue_style('ress', '//unpkg.com/ress/dist/ress.min.css', array(), false, 'all');",
      "",
      "  // style.css を ress の後に読み込む",
      "  wp_enqueue_style('style', get_stylesheet_uri(), array('ress'), false, 'all');",
      "}",
      "",
      "// WordPressのCSS/JS読み込みタイミングで my_enqueue_styles を実行する",
      "add_action('wp_enqueue_scripts', 'my_enqueue_styles');"
    ],
    "description": "WordPress enqueue CSS with PHP tag"
  },

  "WP basic header BEM": {
    "prefix": "wpheader",
    "body": [
      "<!DOCTYPE html>",
      "<html lang=\"ja\">",
      "<head>",
      "  <meta charset=\"utf-8\">",
      "  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">",
      "  <title><?php bloginfo('name'); ?></title>",
      "  <meta name=\"description\" content=\"<?php bloginfo('description'); ?>\">",
      "  <link rel=\"icon\" href=\"<?php echo esc_url(get_theme_file_uri('${1:img/common/favicon.ico}')); ?>\">",
      "",
      "  <?php wp_head(); ?>",
      "</head>",
      "",
      "<body>",
      "  <header class=\"site-header\">",
      "    <div class=\"site-header__inner wrapper\">",
      "      <div class=\"site-header__title\">",
      "        <a class=\"site-header__logo\" href=\"<?php echo esc_url(home_url('/')); ?>\">",
      "          <img src=\"<?php echo esc_url(get_theme_file_uri('${2:img/common/logo.svg}')); ?>\" alt=\"${3:Travel Blog}\">",
      "        </a>",
      "      </div>",
      "",
      "      <nav class=\"global-nav\">",
      "        <ul class=\"global-nav__list\">",
      "          <li class=\"global-nav__item\"><a class=\"global-nav__link\" href=\"<?php echo esc_url(home_url('${4:/category/news/}')); ?>\">${5:NEWS}</a></li>",
      "          <li class=\"global-nav__item\"><a class=\"global-nav__link\" href=\"<?php echo esc_url(home_url('${6:/category/column/}')); ?>\">${7:COLUMN}</a></li>",
      "          <li class=\"global-nav__item\"><a class=\"global-nav__link\" href=\"<?php echo esc_url(home_url('${8:/category/hotel/}')); ?>\">${9:HOTEL}</a></li>",
      "          <li class=\"global-nav__item\"><a class=\"global-nav__link\" href=\"<?php echo esc_url(home_url('${10:/contact/}')); ?>\">${11:CONTACT}</a></li>",
      "        </ul>",
      "      </nav>",
      "    </div>",
      "  </header>"
    ],
    "description": "WordPress basic header.php with BEM"
  },

  "WP basic footer BEM": {
    "prefix": "wpfooter",
    "body": [
      "  <footer class=\"site-footer\">",
      "    <div class=\"site-footer__inner wrapper\">",
      "      <p class=\"site-footer__copyright\">&copy; <?php bloginfo('name'); ?></p>",
      "    </div>",
      "  </footer>",
      "",
      "  <?php wp_footer(); ?>",
      "</body>",
      "</html>"
    ],
    "description": "WordPress basic footer.php with BEM"
  },

  "WP index basic": {
    "prefix": "wpindex",
    "body": [
      "<?php get_header(); ?>",
      "",
      "<main class=\"main\">",
      "  <div class=\"main__inner wrapper\">",
      "    ${1:メインコンテンツ}",
      "  </div>",
      "</main>",
      "",
      "<?php get_footer(); ?>"
    ],
    "description": "WordPress basic index.php"
  },

  "WP loop basic": {
    "prefix": "wploop",
    "body": [
      "<?php if (have_posts()) : ?>",
      "  <?php while (have_posts()) : the_post(); ?>",
      "",
      "    <article class=\"post-card\">",
      "      <h2 class=\"post-card__title\">",
      "        <a href=\"<?php the_permalink(); ?>\"><?php the_title(); ?></a>",
      "      </h2>",
      "      <div class=\"post-card__body\">",
      "        <?php the_excerpt(); ?>",
      "      </div>",
      "    </article>",
      "",
      "  <?php endwhile; ?>",
      "<?php endif; ?>"
    ],
    "description": "WordPress basic loop"
  }
}
```

## 使い分け

- `phpstart`: `<?php` だけ出す
- `wpenq`: `functions.php` でCSS読み込みを書く
- `wpenqfull`: 新規 `functions.php` に `<?php` 付きで丸ごと入れる
- `wpheader`: `header.php` の土台
- `wpfooter`: `footer.php` の土台
- `wpindex`: `index.php` の土台
- `wptfile`: 画像・faviconなどのパス
- `wphome`: トップ・カテゴリ・固定ページURL
- `wploop`: 投稿一覧の基本ループ

## 注意

`<?php` を付けるかどうか選ばせる1個のスニペットも作れるが、候補表示が分かりにくくなることがある。

運用としては、次のように2個に分ける方が安全。

- 新規 `functions.php` に最初から入れる: `wpenqfull`
- すでに `<?php` があるファイルに追加する: `wpenq`

## 関連

- [WordPressで読むPHPの型](../../基礎/06_WordPressで読むPHPの型.md)
- [functions.phpでCSSを読み込む](../04_functions.phpでCSSを読み込む.md)

## 自分の頭に残すこと

- スニペットは、PHPを暗記する代わりではなく、決まった型を出す補助。
- 反応しないときは、`php.json`、言語モード、`<?php` の有無を見る。
- 大きいスニペットだけに頼らず、小さい部品で意味を確認する。
