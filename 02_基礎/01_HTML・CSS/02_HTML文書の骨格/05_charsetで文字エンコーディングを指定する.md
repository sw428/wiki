# 05_charsetで文字エンコーディングを指定する

## このページの役割

`charset`で、HTMLファイルの文字をどの文字エンコーディングとして解釈するか指定する。

通常はUTF-8を使う。

```html
<meta charset="utf-8">
```

## `charset`は文字の解釈方法を伝える

HTMLファイルは、内部ではバイト列として保存されている。

`charset`は、そのバイト列をどの文字として解釈するかブラウザへ伝える。

```html
<meta charset="utf-8">
```

この指定では、HTMLファイルをUTF-8として解釈する。

## `head`の先頭付近に書く

基本形では、`head`の開始直後に置く。

```html
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>ページタイトル</title>
</head>
```

文字エンコーディング宣言は、文書の先頭1024バイト以内に完全に収める必要がある。

毎回バイト数を数えるのではなく、`head`の先頭付近へ置いておけばよい。

## ファイル自体の保存形式とも合わせる

HTMLに、

```html
<meta charset="utf-8">
```

と書くだけではなく、HTMLファイル自体もUTF-8で保存する。

```text
HTMLのcharset
→ UTF-8

ファイルの保存形式
→ UTF-8
```

のように一致させる。

文字化けした場合は、`charset`だけでなく、ファイルの保存形式も確認する。

## サーバー側の指定も関係する

Webサーバーから返される`Content-Type`ヘッダーなどでも、文字エンコーディングが伝えられることがある。

その指定とHTML内の`charset`が一致していないと、文字化けの原因になる場合がある。

文字化けを調べるときは、

```text
HTMLのcharset

ファイルの保存形式

サーバーのレスポンスヘッダー
```

を分けて確認する。

## 一言でいうと

`charset`はHTMLファイルの文字をどの文字エンコーディングとして解釈するか伝える指定で、通常はUTF-8を使う。

## 仕様確認先

- [HTML Standard - The `meta` element](https://html.spec.whatwg.org/multipage/semantics.html#the-meta-element)
