# 01_PHP Intelephense

## 目的

WordPressテーマ制作の開発環境として、PHP Intelephenseが何のための拡張機能かを整理する。

## 最初に見る結論

PHP拡張は必須ではない。

ただし、WordPressテーマを書くなら `PHP Intelephense` は入れた方が見やすくなる。

`PHP IntelliSense` と `PHP Intelephense` は両方入れなくてよい。

入れるなら、基本は `PHP Intelephense` を優先する。

## 役割の分け方

- PHPを動かす役: Local / WordPress環境
- PHPをVS Codeで書きやすくする役: VS Code拡張機能

`PHP Intelephense` は、PHPを動かすものではない。

VS CodeでPHPを書くときの入力補助・チェック機能として見る。

この考え方自体は、単語カードの [実行環境とエディタ補助の違い](<../../../../03_参照元/実行環境とエディタ補助の違い.md>) に分けて残す。

## PHP Intelephenseで楽になること

- PHPコードの色分け
- 関数名の入力補完
- 文法ミスに気づきやすくする
- 変数や関数の参照ジャンプ
- WordPress関数を書いたときの見通し改善

## PHP IntelliSenseとの違い

`PHP IntelliSense` もPHPを書くときの補完拡張だが、今のWordPressテーマ制作では `PHP Intelephense` を基準に見る。

両方入れると、補完や診断が重複して、かえって見づらくなることがある。

整理すると次のように見る。

- `PHP Intelephense`: 今後入れるならこちらを優先するPHP補助拡張
- `PHP IntelliSense`: PHP補完用の別拡張。基本は重ねて入れない

## 色分けとPHP実行は別

VS CodeでPHPコードに色が付くのは、PHPが実行されているからではない。

エディタやコード表示側が、`<?php ?>`、`echo`、変数、文字列、HTMLタグなどを文法として見分け、シンタックスハイライトしているだけ。

たとえば、`echo` や `$html_tag` の色を変える設定は、書くときに読みやすくするためのもの。

`echo` が白く見えるか、別の色で見えるかは、主にVS CodeのテーマやPHPの文法判定の設定による。

白いからPHPではない、色が付いたから実行されている、という意味ではない。

色は、コードを読むための目印。

ただし、色を変えるときは範囲を広げすぎない。

HTMLタグとPHPの `echo` が同じ色で見づらい場合でも、雑に「白い文字全部」や「タグ全体」の色を変えると、HTMLタグ、属性、文字列など別の見え方まで変わることがある。

変更したい場合は、VS Codeの `Developer: Inspect Editor Tokens and Scopes` で、今カーソルがある語がどのスコープとして扱われているかを確認してから、PHPのキーワードだけに近い範囲で調整する。

PHPを実際に動かしてHTMLを作るのは、Local / XAMPP / MAMP / レンタルサーバーなどのPHP実行環境。

そのため、色が付いているかどうかと、PHPが実際に動いているかどうかは分けて判断する。

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

WordPress関数の補完を効かせたい場合、`intelephense.environment.includePaths` で `wp-includes` や `wp-admin` を見せる方法がある。

ただし、テーマフォルダだけを開くか、WordPress全体を開くかで効き方が変わるため、ユーザー設定へ固定するより、必要なプロジェクト側の `.vscode/settings.json` で検討する。

## テーマだけ開く場合のincludePaths

WordPress全体をVS Codeで開くと、編集対象ではない `wp-admin`、`wp-includes`、プラグイン、アップロード画像まで見える。

学習中は、作業対象を自作テーマへ絞った方が誤編集・誤削除を減らしやすい。

たとえば `app/public/wp-content/themes/blog` だけをVS Codeで開く場合、作業ルートは見やすくなるが、IntelephenseからはWordPress本体の関数定義が見えにくくなる。

その場合は、テーマフォルダ内に次を置く。

```text
blog/
└── .vscode/
    └── settings.json
```

中身はまずこれでよい。

```json
{
  "intelephense.environment.includePaths": [
    "../../.."
  ]
}
```

`blog` から見て、`../../..` は `app/public` を指す。

```text
blog -> themes -> wp-content -> public
```

この設定はVS Code / Intelephenseの解析用であり、WordPress本体の動作には基本的に影響しない。

`settings.json` を `blog` 直下に置くだけでは、VS Codeのフォルダ設定として読まれにくい。フォルダ専用設定は `.vscode/settings.json` に置く。

## 自分の頭に残すこと

- PHPを動かすのはLocal / WordPress環境。
- PHP IntelephenseはVS CodeでPHPを書くための補助。
- 色分けは実行結果ではなく、エディタ側の読みやすさの補助。
- 必須ではないが、WordPressテーマを書くなら入れた方が楽。
- PHP IntelliSenseと重ねて入れず、基本はIntelephenseを優先する。
- 作業ルートはテーマフォルダ、解析参照はWordPress本体、という分け方ができる。
