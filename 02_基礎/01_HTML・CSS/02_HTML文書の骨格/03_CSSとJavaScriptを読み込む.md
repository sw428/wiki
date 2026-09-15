# 03_CSSとJavaScriptを読み込む

外部CSSと外部JavaScriptは、どちらもHTMLから別ファイルを参照する。ただし、CSSを表示へ反映する流れと、JavaScriptを実行する時点は分けて考える。

## 外部CSSは`head`から読み込む

```html
<link rel="stylesheet" href="css/style.css">
```

`rel="stylesheet"`は、リンク先がこの文書へ適用するスタイルシートであることを示す。通常の外部CSSは`head`から読み込み、本文の表示を組み立てる前にスタイルシートを取得できる形にする。

CSSが反映されないときは、まず次を確認する。

1. `href`がHTMLファイルから見た正しい相対パスか。
2. DevToolsのNetworkでCSSの取得に成功しているか。
3. ElementsのStylesで目的の規則が見つかるか。

reset CSSとサイト固有CSSを分けるなら、土台を先、上書きする側を後に書く。

```html
<link rel="stylesheet" href="css/reset.css">
<link rel="stylesheet" href="css/style.css">
```

後の指定が常に勝つわけではない。出所、重要度、レイヤー、詳細度など他のカスケード条件が同じとき、後に現れる宣言が優先される。これはファイルのダウンロード完了順ではなく、カスケード上の順序で決まる。詳しくは[CSSカスケードとDevToolsの見方](../06_CSSカスケードとDevToolsの見方/01_DevToolsで適用されたCSSを確認する.md)で確認する。

## 外部のclassic scriptは`defer`で解析後に実行できる

```html
<script src="js/menu.js" defer></script>
```

外部のclassic scriptに`defer`を付けると、HTML解析と並行してファイルを取得し、文書の解析が終わった後に実行する。複数の`defer`付きscriptは文書内の順序を保って実行され、実行完了後に`DOMContentLoaded`が発火する。

```txt
HTML解析を続けながら外部JSを取得
-> HTML解析が完了
-> defer付きscriptを文書順に実行
-> DOMContentLoaded
```

そのため、HTML内に書いたボタンなどを`querySelector()`で取得する処理の基本形にしやすい。

`defer`が効くのは`src`を持つ外部のclassic script。インラインのclassic scriptへ付けても効果はない。`type="module"`のmodule scriptは、`async`がなければ既定で解析後に実行され、`defer`属性を付けても追加の効果はない。

## `body`の最後へ置く方法もある

```html
<body>
  <button class="menu-button">メニュー</button>

  <script src="js/menu.js"></script>
</body>
```

`async`も`defer`もないclassic scriptは、その位置で取得と実行が終わるまでHTML解析を止める。この例では対象のボタンを先に解析してからscriptへ到達するため、実行時に要素を取得できる。

既存コードでこの配置を使っているだけなら、直ちに`head`へ移す必要はない。新しく作る静的サイトでは、読み込み場所をまとめやすい`head`内の`defer`付き外部scriptを基本候補にし、既存構成や実行順の条件があれば合わせる。

JavaScript側で要素を取得し、イベントを登録する処理は[DOMとイベント](../../02_JS/02_DOMとイベント.md)へ進む。

## 一言でいうと

CSSは`link rel="stylesheet"`で`head`から読み込み、外部のclassic scriptは実行時点を考えて`defer`または配置を選ぶ。

## 仕様確認先

- [HTML Standard - The `link` element](https://html.spec.whatwg.org/multipage/semantics.html#the-link-element)
- [HTML Standard - The `script` element](https://html.spec.whatwg.org/multipage/scripting.html#the-script-element)
- [CSS Cascade Level 6 - Cascade sorting order](https://www.w3.org/TR/css-cascade-6/#cascade-sort)
