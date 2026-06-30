# 07_WordPressとSCSSのレイヤー

## 目的

WordPressの `header.php` / `footer.php` 分割と、SCSSの `_header.scss` / `_footer.scss` 分割を混同しないように整理する。

## 最初に見る結論

SCSSは「出てきたHTMLにどう見た目を当てるか」を分ける。

WordPressは「そもそもどんなHTMLを出すか」を分ける。

同じ `header` / `footer` という名前が出ても、切り分けている対象が違う。

## レイヤー全体

```text
データ・管理画面
WordPress管理画面 / 投稿 / 固定ページ / カテゴリ
        ↓
テンプレート生成
PHP / WordPress関数
get_header() / the_title() / home_url()
        ↓
HTML構造
header / main / article / nav / BEMクラス
        ↓
スタイル
SCSS / CSS
        ↓
ブラウザ内部
DOM / CSSOM / Render Tree
        ↓
表示
画面
```

## SCSSは見た目の層

SCSSは、最終的にCSSになる。

```text
SCSS
↓ コンパイル
CSS
↓ ブラウザが読む
CSSOM
↓
見た目に反映
```

SCSSで管理するもの:

- 色
- 余白
- 幅
- 配置
- フォント
- レスポンシブ
- BEMのクラスに対応した見た目

例:

```scss
.site-header {
  &__inner {
    display: flex;
  }
}
```

これは最終的にCSSになる。

```css
.site-header__inner {
  display: flex;
}
```

つまりSCSSは、見た目を整理するための層。

## WordPressはHTMLを作る前の層

WordPressは、CSSより前にいる。

```text
WordPress / PHP
↓
HTMLを生成
↓
CSS
↓
CSSOM
↓
画面表示
```

WordPressで管理するもの:

- どのHTMLを出すか
- どの投稿データを出すか
- どの画像URLを出すか
- どのページテンプレートを使うか
- `header` / `footer` を共通化するか

例:

```php
<?php get_header(); ?>
```

これは、`header.php` のHTMLをここに差し込む処理。

```php
<?php the_title(); ?>
```

これは、投稿タイトルをHTMLとして出す処理。

つまりWordPressは、HTMLを動的に作るための層。

## 静的HTMLとWordPressの違い

静的HTMLでは、完成したHTMLを自分で直接書く。

```html
<h1>Travel Blog</h1>
<img src="img/common/logo.svg" alt="">
```

WordPressでは、PHPでHTMLを生成してからブラウザに渡す。

```php
<title><?php bloginfo('name'); ?></title>
<img src="<?php echo esc_url(get_theme_file_uri('img/common/logo.svg')); ?>" alt="">
```

ブラウザに届くときは、結局HTMLになる。

```html
<title>Travel Blog</title>
<img src="https://example.com/wp-content/themes/blog/img/common/logo.svg" alt="">
```

ブラウザから見ると、どちらもHTML。

違いは、HTMLを最初から手で書くか、WordPress / PHPで生成して渡すか。

## header分割の違い

SCSSでも、`header` / `footer` で分けることがある。

```text
scss/
├── layout/
│   ├── _header.scss
│   └── _footer.scss
├── component/
└── style.scss
```

これは、`header` の見た目を書く場所、`footer` の見た目を書く場所を分けている。

```scss
.site-header {
  background: #fff;
}

.site-footer {
  padding: 40px 0;
}
```

一方、WordPressの分割はHTMLそのものを分ける。

```text
theme/
├── header.php
├── footer.php
├── index.php
└── style.css
```

`header.php` には、ヘッダーのHTML構造が入る。

```php
<header class="site-header">
  <div class="site-header__inner">
    ...
  </div>
</header>
```

## 同じheaderでも役割が違う

`header.php`

ヘッダーのHTML構造そのもの。

`_header.scss`

ヘッダーの見た目の説明書。

流れとしては次の順番。

```text
header.php
↓
<header class="site-header">...</header> を出す
↓
_header.scss / CSS
↓
.site-header の見た目を当てる
```

## 作業順

最初は次の順でよい。

1. HTML / BEMで静的に構造を作る
2. SCSS / CSSで見た目を作る
3. WordPressで共通部品に分ける
4. 固定テキストやURLをWordPress関数に置き換える
5. 投稿一覧や記事ページだけループにする

WordPressは、SCSSの代わりではない。

WordPressは、HTMLをCMS化する層。

## 関連

- [静的HTMLからWordPress化する流れ](../制作/06_静的HTMLからWordPress化する流れ.md)
- [header.php・footer.phpに分割](../制作/03_header.php・footer.phpに分割.md)
- [WordPressで読むPHPの型](./06_WordPressで読むPHPの型.md)

## 自分の頭に残すこと

- SCSSの分割は、見た目の責任を分ける。
- WordPressの分割は、HTML部品の責任を分ける。
- BEMは、HTMLとCSSを対応させる名前の設計。
- WordPressがBEM付きHTMLを出し、SCSS / CSSがそのHTMLに見た目を当てる。
