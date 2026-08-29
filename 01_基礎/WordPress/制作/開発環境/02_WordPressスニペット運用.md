# 02_WordPressスニペット運用

## 目的

WordPressテーマ制作で使うVS Codeスニペットを、学習しやすい粒度で整理する。

## 最初に見る結論

スニペットは、PHPを丸暗記するためではなく、決まった型を安全に出すために使う。

最初は、小さい部品を読めるようにしてから、大きいスニペットで時短する。

WordPress初期では、スニペット活用を前提にしてよい。

目的は楽をすることではなく、打ち間違いを減らし、テンプレート構造や原因切り分けに集中すること。

## 入れる場所

VS Codeで次の順に開く。

1. `Ctrl + Shift + P`
2. `Snippets: Configure Snippets`
3. `New Global Snippets file...`
4. `wordpress.code-snippets` のように、WordPress用だと分かる名前で作る

PHPファイルのPHP部分だけで使うなら `php.json` でもよい。

`javascript.json` などに入れても、`functions.php` では出ない。

ただし、`header.php` や `index.php` のHTML構造の中でもWordPress用スニペットを安定して出したい場合は、グローバルスニペットにして `scope` と `include` を付ける。

基本形は次。

```json
{
  "WordPress bloginfo name": {
    "scope": "php,html",
    "include": "**/*.php",
    "prefix": "info",
    "body": [
      "<?php bloginfo('name'); ?>"
    ],
    "description": "WordPress bloginfo name"
  }
}
```

`header.php` はPHPファイルだが、カーソルがHTMLを書いている場所にあると、VS CodeはHTML文脈として候補を出すことがある。

そのため、WordPress用の短いスニペットは `scope: "php,html"` でPHP文脈とHTML文脈の両方に出し、`include: "**/*.php"` で普通の `.html` には出さないようにする。

関数定義など `functions.php` だけで使うものは、さらに絞る。

```json
{
  "WordPress enqueue styles": {
    "scope": "php",
    "include": "**/functions.php",
    "prefix": "fnk",
    "body": [
      "function ${1:my_enqueue_styles}() {",
      "  wp_enqueue_style('${2:style}', get_stylesheet_uri(), array(), false, 'all');",
      "}",
      "add_action('wp_enqueue_scripts', '${1:my_enqueue_styles}');"
    ],
    "description": "WordPress functions.php enqueue styles"
  }
}
```

`header.php` だけ、`footer.php` だけで使う土台スニペットは、ファイル名で限定する。

```json
"include": "**/header.php"
```

この分け方にするなら、プレフィックスに毎回 `wp` を付けなくてもよい。
ファイル名と `include` でWordPress用だと分かるため、入力しやすさを優先する。

## スニペットが出ないとき

まず、`functions.php` を開いた状態で右下の言語モードを見る。

`PHP` になっていればよい。

`Plain Text` などになっている場合は、クリックして `PHP` に変更する。

空の `functions.php` では、まだPHPファイルとして認識されにくく、PHP用スニペットが出にくいことがある。

その場合は、最初に手で `<?php` を入れてから、下でスニペットを使う。

```php
<?php

// ここで fnk などを使う
```

`<?php` はファイル先頭に1回だけでよい。

`header.php` のHTML領域でHTMLスニペットが出るのは、異常ではない。

ファイル全体の言語モードと、今カーソルがある場所の文脈は分けて見る。

## 粒度の考え方

小さい部品:

- `php`
- `info`
- `home`
- `file`
- `head`
- `footerhook`

中くらいの部品:

- `img`
- `logo`
- `navli`

大きい部品:

- `fnk`
- `!!`
- `footer`
- `index`
- `loop`
- `pagefn`
- `page`
- `pagequery`

最初から全部を大きいスニペットで出すと、意味を飛ばしやすい。

ただし、毎回すべて手打ちすると記号がつらい。

小さいスニペットで意味を掴み、慣れたら大きいスニペットで時短する。

## CSSとの違い

CSSは、プロパティを出せても、結局は前提条件と状況判断が重要になる。

- 親に指定するか、子に指定するか
- `flex` か `grid` か
- `gap` か `margin` か
- カンプ上のどこを再現対象にするか

一方でWordPressは、決まった関数やテンプレート構造を正しい場所に置く作業が多い。

そのため、WordPressのスニペットは「覚えないため」ではなく、余計な場所を触らず、正しい型を正確に配置するために使う。

```php
<?php get_header(); ?>
<?php get_footer(); ?>
<?php wp_head(); ?>
<?php wp_footer(); ?>
<?php echo esc_url(home_url('/')); ?>
<?php echo esc_url(get_theme_file_uri('img/common/logo.svg')); ?>
```

ここで大事なのは、毎回ゼロから想像して書くことではなく、どの場面で何を渡しているかを読めること。

## head基本セット

`header.php` の先頭に入れる `head` 基本セットは、1つのスニペットにしてよい。

変更余地を持たせるなら、まずはfaviconのパスだけで十分。

```json
{
  "WordPress head basic simple": {
    "scope": "php,html",
    "include": "**/header.php",
    "prefix": "!!",
    "body": [
      "<!DOCTYPE html>",
      "<html <?php language_attributes(); ?>>",
      "<head>",
      "  <meta charset=\"utf-8\">",
      "  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">",
      "  <title><?php bloginfo('name'); ?></title>",
      "  <meta name=\"description\" content=\"<?php bloginfo('description'); ?>\">",
      "  <link rel=\"icon\" href=\"<?php echo esc_url(get_theme_file_uri('${1:img/common/favicon.ico}')); ?>\">",
      "",
      "  <?php wp_head(); ?>",
      "</head>",
      "<body <?php body_class(); ?>>",
      "<?php wp_body_open(); ?>",
      "$0"
    ],
    "description": "WordPress header.php head basic simple"
  }
}
```

`body` 配列の最後の行には、カンマを残さない。

`bloginfo()` は表示する関数なので、学習用の簡単版では `echo` なしでよい。

使い回す前提で安全寄りにするなら、`get_bloginfo()` とエスケープを組み合わせる。

```php
<title><?php echo esc_html(get_bloginfo('name')); ?></title>
<meta name="description" content="<?php echo esc_attr(get_bloginfo('description')); ?>">
```

## まとめ版 wordpress.code-snippets

```json
{
  "PHP opening tag": {
    "scope": "php,html",
    "include": "**/*.php",
    "prefix": "php",
    "body": [
      "<?php",
      ""
    ],
    "description": "PHP opening tag"
  },

  "WP bloginfo": {
    "scope": "php,html",
    "include": "**/*.php",
    "prefix": "info",
    "body": [
      "<?php bloginfo('${1|name,description,charset|}'); ?>"
    ],
    "description": "WordPress bloginfo"
  },

  "WP home url": {
    "scope": "php,html",
    "include": "**/*.php",
    "prefix": "home",
    "body": [
      "<?php echo esc_url(home_url('${1:/}')); ?>"
    ],
    "description": "WordPress escaped home URL"
  },

  "WP theme file uri": {
    "scope": "php,html",
    "include": "**/*.php",
    "prefix": "file",
    "body": [
      "<?php echo esc_url(get_theme_file_uri('${1:img/common/logo.svg}')); ?>"
    ],
    "description": "WordPress escaped theme file URI"
  },

  "WP theme image tag": {
    "scope": "php,html",
    "include": "**/*.php",
    "prefix": "img",
    "body": [
      "<img src=\"<?php echo esc_url(get_theme_file_uri('${1:img/common/logo.svg}')); ?>\" alt=\"${2:Travel Blog}\">"
    ],
    "description": "WordPress image from theme file URI"
  },

  "WP head": {
    "scope": "php,html",
    "include": "**/header.php",
    "prefix": "head",
    "body": [
      "<?php wp_head(); ?>"
    ],
    "description": "WordPress wp_head"
  },

  "WP footer hook": {
    "scope": "php,html",
    "include": "**/footer.php",
    "prefix": "footerhook",
    "body": [
      "<?php wp_footer(); ?>"
    ],
    "description": "WordPress wp_footer"
  },

  "WP get header": {
    "scope": "php,html",
    "include": "**/*.php",
    "prefix": "getheader",
    "body": [
      "<?php get_header(); ?>"
    ],
    "description": "WordPress get_header"
  },

  "WP get footer": {
    "scope": "php,html",
    "include": "**/*.php",
    "prefix": "getfooter",
    "body": [
      "<?php get_footer(); ?>"
    ],
    "description": "WordPress get_footer"
  },

  "WP get sidebar": {
    "scope": "php,html",
    "include": "**/*.php",
    "prefix": "getsidebar",
    "body": [
      "<?php get_sidebar(); ?>"
    ],
    "description": "WordPress get_sidebar"
  },

  "WP logo link BEM": {
    "scope": "php,html",
    "include": "**/*.php",
    "prefix": "logo",
    "body": [
      "<a class=\"${1:site-header__logo}\" href=\"<?php echo esc_url(home_url('/')); ?>\">",
      "  <img src=\"<?php echo esc_url(get_theme_file_uri('${2:img/common/logo.svg}')); ?>\" alt=\"${3:Travel Blog}\">",
      "</a>"
    ],
    "description": "WordPress logo link with BEM class"
  },

  "WP nav li": {
    "scope": "php,html",
    "include": "**/*.php",
    "prefix": "navli",
    "body": [
      "<li class=\"${1:global-nav__item}\">",
      "  <a class=\"${2:global-nav__link}\" href=\"<?php echo esc_url(home_url('${3:/category/news/}')); ?>\">${4:NEWS}</a>",
      "</li>"
    ],
    "description": "WordPress navigation list item"
  },

  "WordPress enqueue styles 応用": {
    "scope": "php",
    "include": "**/functions.php",
    "prefix": "fnk",
    "body": [
      "// CSS読み込み用の関数を作る",
      "function ${1:my_enqueue_styles}() {",
      "",
      "  // ${2:ress}.css を先に読み込む",
      "  wp_enqueue_style('${2:ress}', '${3://unpkg.com/ress/dist/ress.min.css}', array(), false, 'all');",
      "",
      "  // style.css を ${2:ress} の後に読み込む",
      "  wp_enqueue_style('${4:style}', get_stylesheet_uri(), array('${2:ress}'), false, 'all');",
      "}",
      "",
      "// WordPressのCSS/JS読み込みタイミングで ${1:my_enqueue_styles} を実行する",
      "add_action('wp_enqueue_scripts', '${1:my_enqueue_styles}');",
      "$0"
    ],
    "description": "WordPress functions.php CSS enqueue with comments"
  },

  "WP basic header BEM": {
    "scope": "php,html",
    "include": "**/header.php",
    "prefix": "!!",
    "body": [
      "<!DOCTYPE html>",
      "<html <?php language_attributes(); ?>>",
      "<head>",
      "  <meta charset=\"utf-8\">",
      "  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">",
      "  <title><?php bloginfo('name'); ?></title>",
      "  <meta name=\"description\" content=\"<?php bloginfo('description'); ?>\">",
      "  <link rel=\"icon\" href=\"<?php echo esc_url(get_theme_file_uri('${1:img/common/favicon.ico}')); ?>\">",
      "",
      "  <?php wp_head(); ?>",
      "</head>",
      "<body <?php body_class(); ?>>",
      "<?php wp_body_open(); ?>",
      "$0"
    ],
    "description": "WordPress header.php template"
  },

  "WP basic footer BEM": {
    "scope": "php,html",
    "include": "**/footer.php",
    "prefix": "footer",
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
    "scope": "php,html",
    "include": "**/index.php",
    "prefix": "index",
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
    "scope": "php,html",
    "include": "**/*.php",
    "prefix": "loop",
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
  },

  "WP pagination function": {
    "scope": "php",
    "include": "**/functions.php",
    "prefix": "pagefn",
    "body": [
      "// ページネーションを表示する関数",
      "function ${1:pagination}(\\$pages = '', \\$range = ${2:2}) {",
      "  \\$showitems = (\\$range * 2) + 1;",
      "",
      "  // 現在のページ数",
      "  global \\$paged;",
      "  if (empty(\\$paged)) {",
      "    \\$paged = 1;",
      "  }",
      "",
      "  // 全ページ数",
      "  if (\\$pages == '') {",
      "    global \\$wp_query;",
      "    \\$pages = \\$wp_query->max_num_pages;",
      "    if (!\\$pages) {",
      "      \\$pages = 1;",
      "    }",
      "  }",
      "",
      "  // ページ数が2ページ以上の場合のみ、ページネーションを表示",
      "  if (1 != \\$pages) {",
      "    echo '<div class=\"${3:pagination}\">';",
      "    echo '<ul class=\"${4:pagination__list}\">';",
      "",
      "    // 1ページ目でなければ、「前のページ」リンクを表示",
      "    if (\\$paged > 1) {",
      "      echo '<li class=\"${5:pagination__item} ${6:pagination__item--prev}\"><a class=\"${7:pagination__link}\" href=\"' . esc_url(get_pagenum_link(\\$paged - 1)) . '\">${8:前のページ}</a></li>';",
      "    }",
      "",
      "    // ページ番号を表示（現在のページはリンクにしない）",
      "    for (\\$i = 1; \\$i <= \\$pages; \\$i++) {",
      "      if (1 != \\$pages && (!(\\$i >= \\$paged + \\$range + 1 || \\$i <= \\$paged - \\$range - 1) || \\$pages <= \\$showitems)) {",
      "        if (\\$paged == \\$i) {",
      "          echo '<li class=\"${5:pagination__item} ${9:is-active}\">' . \\$i . '</li>';",
      "        } else {",
      "          echo '<li class=\"${5:pagination__item}\"><a class=\"${7:pagination__link}\" href=\"' . esc_url(get_pagenum_link(\\$i)) . '\">' . \\$i . '</a></li>';",
      "        }",
      "      }",
      "    }",
      "",
      "    // 最終ページでなければ、「次のページ」リンクを表示",
      "    if (\\$paged < \\$pages) {",
      "      echo '<li class=\"${5:pagination__item} ${10:pagination__item--next}\"><a class=\"${7:pagination__link}\" href=\"' . esc_url(get_pagenum_link(\\$paged + 1)) . '\">${11:次のページ}</a></li>';",
      "    }",
      "",
      "    echo '</ul>';",
      "    echo '</div>';",
      "  }",
      "}",
      "$0"
    ],
    "description": "WordPress custom pagination function with editable BEM classes"
  },

  "WP pagination call": {
    "scope": "php,html",
    "include": "**/*.php",
    "prefix": "page",
    "body": [
      "<?php ${1:pagination}(); ?>"
    ],
    "description": "Call custom WordPress pagination function"
  },

  "WordPress global wp_query": {
    "scope": "php,html",
    "include": "**/*.php",
    "prefix": "gwq",
    "body": [
      "global \\$wp_query;"
    ],
    "description": "Use the global WordPress wp_query object"
  },

  "WordPress pagination with comments": {
    "scope": "php,html",
    "include": "**/*.php",
    "prefix": "pagequery",
    "body": [
      "<?php",
      "// WordPressが持っている現在の投稿一覧情報を使えるようにする",
      "global \\$wp_query;",
      "",
      "// pagination関数がある場合だけ、最大ページ数を渡してページネーションを表示する",
      "if (function_exists('pagination')) {",
      "  pagination(\\$wp_query->max_num_pages);",
      "}",
      "?>"
    ],
    "description": "WordPress pagination with Japanese comments"
  }
}
```

## 使い分け

- `php`: `<?php` だけ出す
- `fnk`: `functions.php` でCSS読み込みを書く
- `!!`: `header.php` の土台
- `footer`: `footer.php` の土台
- `index`: `index.php` の土台
- `file`: 画像・faviconなどのパス
- `home`: トップ・カテゴリ・固定ページURL
- `loop`: 投稿一覧の基本ループ
- `pagefn`: `functions.php` にページネーション関数を書く
- `page`: ページネーション関数を呼び出す
- `pagequery`: `global $wp_query` から総ページ数を渡す呼び出しを書く

## 注意

`scope: "php,html"` だけにすると、普通の `.html` にも候補が出る。

普通のHTMLファイルに出したくない場合は、`include: "**/*.php"` も合わせて付ける。

`functions.php` 用の関数定義は `include: "**/functions.php"` に絞る。
`header.php` / `footer.php` / `index.php` の土台は、それぞれファイル名で絞る。

`<?php` を付けるかどうか選ばせる1個のスニペットも作れるが、候補表示が分かりにくくなることがある。
この運用では、`<?php` だけを出す `php` と、`functions.php` 内へ追記する `fnk` を分ける。

## 関連

- [WordPressで読むPHPの型](../../基礎/07_WordPressで読むPHPの型.md)
- [WordPress学習の優先順位](../../基礎/01_WordPress学習の優先順位.md)
- [functions.phpでCSSを読み込む](../04_functions.phpでCSSを読み込む.md)
- [ケース_CodeJump WordPress初期構築・バックアップ・スニペット判断](../../../../02_検証/WordPress/01_ケース_CodeJump_WordPress初期構築・バックアップ・スニペット判断.md)

## 自分の頭に残すこと

- スニペットは、PHPを暗記する代わりではなく、決まった型を出す補助。
- 反応しないときは、`wordpress.code-snippets`、`scope`、`include`、言語モード、`<?php` の有無を見る。
- 大きいスニペットだけに頼らず、小さい部品で意味を確認する。
