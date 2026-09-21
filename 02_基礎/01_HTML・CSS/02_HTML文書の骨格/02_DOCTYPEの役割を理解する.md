# 02_DOCTYPEの役割を理解する

## このページの役割

HTML文書の先頭に書く`DOCTYPE`が何をするものか確認する。

```html
<!DOCTYPE html>
```

`DOCTYPE`はHTML要素ではなく、文書の表示モードに関わる宣言。

## HTML文書の先頭に書く

現在のHTMLでは、文書の先頭に次の形を書く。

```html
<!DOCTYPE html>
<html lang="ja">
  ...
</html>
```

通常のHTML文書では、この短い形を使う。

## HTML要素ではない

`DOCTYPE`は、

```html
<p>こんにちは</p>
```

のようなHTML要素ではない。

そのため、

```text
開始タグ

内容

終了タグ
```

という形では読まない。

`<!DOCTYPE html>`全体で一つの宣言として見る。

HTMLパーサーはこれをDOCTYPEトークンとして扱い、DOMでは`DocumentType`ノードとして表す。HTML要素のElementノードとは別の種類。

## ブラウザの表示モードに関わる

ブラウザには、現在のWeb標準に沿って表示するモードと、古いWebページとの互換性を優先するモードがある。

```html
<!DOCTYPE html>
```

を書くことで、通常のCSS仕様に近い`no-quirks mode`で文書を表示させる。

DOCTYPEがない場合や古い形式の一部では、ブラウザが`quirks mode`に入ることがある。

そのため、新しくHTML文書を作るときは基本形として先頭に書く。

## 書き換えて使うものではない

`title`や`body`の内容はページごとに変更するが、

```html
<!DOCTYPE html>
```

は通常、そのまま使う。

新しいHTMLファイルを作るときに基本形へ含めておけばよい。

## 一言でいうと

`<!DOCTYPE html>`はHTML要素ではなく、ブラウザを標準的な表示モードで動かすために文書の先頭へ書く宣言。

## 仕様確認先

- [HTML Standard - Writing HTML documents](https://html.spec.whatwg.org/multipage/syntax.html#writing)
