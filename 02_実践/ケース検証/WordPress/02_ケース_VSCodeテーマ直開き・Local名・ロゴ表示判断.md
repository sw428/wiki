# 02_ケース_VSCodeテーマ直開き・Local名・ロゴ表示判断

## 位置づけ

CodeJump / WordPress学習中に出た、VS Codeの開き方、Intelephenseの参照設定、Local環境の名前、WordPress関数のURL出力、SVGロゴ表示の切り分けをまとめる。

このファイルは完成版の手順書ではなく、作業中の判断を追うための乱書きとして置く。

## 乱書き

### VS Codeではテーマフォルダだけを開く

WordPress全体をVS Codeのワークスペースとして開くと、`wp-admin`、`wp-includes`、プラグイン、アップロード画像など、編集対象ではないファイルまで見える。

学習中は、見える範囲が広すぎることによる誤編集・誤削除のリスクが大きい。

そのため、実際の作業ルートは次に絞る。

```text
app/public/wp-content/themes/blog/
```

このフォルダだけをVS Codeで開けば、左のエクスプローラー上では `BLOG` が親フォルダのように見える。

### blogだけ開くとWordPress関数の赤線が出る理由

`blog` だけを開くと、VS Code / Intelephense から見える範囲にWordPress本体がない。

そのため、次のような関数に警告が出ることがある。

```php
wp_head();
get_header();
add_action();
wp_enqueue_style();
get_theme_file_uri();
```

これはWordPressが壊れているというより、エディタ側のPHP解析がWordPress本体の定義を見つけられていない状態。

### .vscode/settings.jsonで参照先だけ補う

作業ルートは `blog` のままにし、解析上だけWordPress本体のある `app/public` を参照させる。

`blog` フォルダ内に次を作る。

```text
blog/
├── .vscode/
│   └── settings.json
├── functions.php
├── header.php
├── index.php
└── style.css
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
blog
↑ themes
↑ wp-content
↑ public
```

`settings.json` を `blog` 直下へ置くだけでは、VS Codeのフォルダ設定として読まれない。フォルダ専用設定として読む場所は `blog/.vscode/settings.json`。

### この設定のリスク判断

`.vscode/settings.json` は、基本的にVS Code / Intelephenseの解析用設定。

WordPress本体がこの設定を読んで動くわけではない。

そのため、WordPressの実行環境を直接変えるリスクは低い。

むしろ、WordPress全体を開きっぱなしにして編集対象外のファイルまで見える状態の方が、人為的ミスのリスクが高いと判断した。

採用する運用:

```text
作業ルート: wp-content/themes/blog
解析参照: app/public
```

### Local名・URL・WordPressサイトタイトル・テーマ名を分ける

WordPress学習では、似た名前が複数出てくる。

```text
Localのサイト名: Localアプリ上に出る名前
ローカルURL: a-blog.local など
PC上の親フォルダ名: Localが管理している実フォルダ
WordPressサイトタイトル: wp-admin > 設定 > 一般 > サイトのタイトル
テーマフォルダ名: wp-content/themes/blog
Theme Name: style.css のテーマ名札
```

`bloginfo('name')` で出るのは、主にWordPress管理画面側のサイトタイトル。

`wp-admin` でサイトタイトルを変えても、Localのサイト名、ローカルURL、PC上の親フォルダ名は変わらない。

### Localの親フォルダ名はエクスプローラーで直接変えない

Localが管理している親フォルダ名をエクスプローラーで直接変えると、Localが覚えているパスと実際の場所がずれることがある。

その結果、502 Bad Gateway のように、サーバー側がPHP / WordPressから正しい応答をもらえない状態になることがある。

まず安全に変えてよいのは、WordPress管理画面のサイトタイトル。

```text
wp-admin > 設定 > 一般 > サイトのタイトル
```

Local側の名前やURLまで整えたい場合、親フォルダ名を無理にリネームするより、Localで新規サイトを作り、テーマフォルダだけ移す方が安全。

### Localで作り直すならテーマフォルダだけコピー

名前のズレが気持ち悪く、Local側のサイト名やURLも整えたい場合は、次の流れが安全。

1. Localで新規サイトを作る
2. 新しいWordPressが起動し、管理画面へ入れることを確認する
3. 古い環境から `app/public/wp-content/themes/blog` をコピーする
4. 新しい環境の `app/public/wp-content/themes/` に貼る
5. `外観 > テーマ` で `blog` を有効化する
6. `設定 > 一般 > サイトのタイトル` を必要な名前へ変える

親フォルダ名を後から直そうとするより、人災リスクも環境リスクも低い。

### home_url() と get_theme_file_uri() の使い分け

ロゴリンクでは、クリック先と画像の置き場所を分ける。

```php
<a href="<?php echo esc_url(home_url('/')); ?>">
  <img src="<?php echo esc_url(get_theme_file_uri('img/common/logo.svg')); ?>" alt="Travel Blog">
</a>
```

- `home_url('/')`: サイト内ページへのURLを作る
- `get_theme_file_uri('img/common/logo.svg')`: テーマフォルダ内のファイルURLを作る
- `alt="Travel Blog"`: 画像が表示できないときの代替テキスト。通常表示する文字ではない

`'/category/news/'` のような値はPHPの文字列なので、VS Code上で茶色やオレンジ系に見えてよい。

### SVGロゴが表示されない・潰れるとき

`get_theme_file_uri()` のパスが正しく、`img/common/logo.svg` も存在するなら、次はCSSを見る。

共通の画像指定だけでは、ロゴの表示幅が決まらないことがある。

```css
img {
  max-width: 100%;
  height: auto;
  display: block;
}
```

これは「画像が親からはみ出さない」ための指定であり、ロゴの実際の表示サイズを決める指定ではない。

SVGロゴのように、表示幅を明示した方が安定する素材には、ロゴ専用の幅を指定する。

```css
#header .site-title img {
  width: 145px;
  height: auto;
}
```

WordPressになったから `aspect-ratio` がなくなるわけではない。

ただし、ロゴは写真カードのように枠へ切り抜く素材ではないため、まず `width` + `height: auto` で自然比率のまま表示する。

## 一般化できる判断

- VS Codeの作業ルートと、Intelephenseの解析参照先は分けてよい。
- WordPress全体を開くより、実際に編集するテーマフォルダだけを開く方が、人為的ミスを減らせる場合がある。
- `.vscode/settings.json` はVS Code側の設定であり、WordPress本体の動作とは分けて見る。
- Localのサイト名、ローカルURL、PC上の親フォルダ名、WordPressサイトタイトル、テーマフォルダ名、Theme Nameは別物。
- Localが管理している親フォルダ名は、エクスプローラーで直接変えない方が安全。
- 名前やURLを整えたい場合は、新しいLocalサイトを作ってテーマフォルダだけコピーする方が安全なことがある。
- `home_url()` はサイト内URL、`get_theme_file_uri()` はテーマ内ファイルURLとして分ける。
- `alt` は通常表示する文字ではなく、画像の代替テキスト。
- SVGロゴは `max-width: 100%` だけでなく、必要に応じて専用の `width` を指定する。

## 基礎概念への反映先

- `01_基礎概念/WordPress/制作/開発環境/01_PHP Intelephense.md`
  - テーマだけ開き、`includePaths` でWordPress本体を参照させる運用を追加。
- `01_基礎概念/WordPress/制作/01_テーマ作成手順.md`
  - Localサイト名、ローカルURL、WordPressサイトタイトル、テーマフォルダ名、Theme Nameの違いを補足。
  - Local親フォルダ名を直接変えず、新規サイト作成 + テーマコピーを安全案として追加。
- `01_基礎概念/WordPress/基礎/07_WordPressで読むPHPの型.md`
  - `home_url()` と `get_theme_file_uri()` の使い分け、`alt` の意味を補足。
- `01_基礎概念/HTML・CSS/10_メディア設計（img・video・object-fit・aspect-ratio）.md`
  - SVGロゴは `width` + `height: auto` で表示幅を決める判断を補足。
