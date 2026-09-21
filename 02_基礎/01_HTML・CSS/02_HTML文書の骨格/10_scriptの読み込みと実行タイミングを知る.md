# 10_scriptの読み込みと実行タイミングを知る

## このページの役割

`script`要素の書き方によって、HTMLの解析とJavaScriptの取得・実行タイミングがどう変わるかを扱う。

主に次の3つを区別する。

```text
通常のscript
defer
async
```

このページでは、`src`を持つ外部のclassic scriptを比較する。インラインのclassic scriptでは`defer`に効果がない。`type="module"`のmodule scriptは、`async`がなければ既定でHTML解析後に実行され、`defer`を付けても追加の効果はないため、この比較をそのまま当てはめない。

## HTMLは上から解析される

ブラウザは、基本的にHTMLを上から順番に解析して文書を組み立てる。

```html
<head>
  <script src="js/main.js"></script>
</head>
```

通常の外部classic scriptに到達すると、HTMLの解析を一度止めてJavaScriptファイルを取得し、実行する。

```text
HTMLを解析
↓
scriptに到達
↓
HTMLの解析を停止
↓
JavaScriptを取得
↓
JavaScriptを実行
↓
HTMLの解析を再開
```

そのため、`head`内で通常の`script`を読み込むと、後ろにあるHTMLがまだ解析されていない状態でJavaScriptが実行されることがある。

## `defer`でHTMLの解析を止めずに読み込む

```html
<head>
  <script src="js/main.js" defer></script>
</head>
```

`defer`を付けると、HTMLを解析しながらJavaScriptファイルを取得できる。

JavaScriptの実行は、HTMLの解析が完了したあとに行われる。

```text
HTMLを解析 ─────────────→ 解析完了
      ↓
      JavaScriptを並行して取得
                         ↓
                    JavaScriptを実行
```

HTMLの要素をJavaScriptから操作する場合でも、HTMLの解析完了後に実行されるため扱いやすい。DOMから要素を取得してイベントを登録する処理は[DOMとイベント](../../02_JS/02_DOMとイベント.md)で扱う。

通常のWeb制作では、外部JavaScriptを`head`内から読み込む場合の基本形として使いやすい。

```html
<head>
  <script src="js/main.js" defer></script>
</head>
```

## 複数の`defer`は記述順に実行される

```html
<script src="js/a.js" defer></script>
<script src="js/b.js" defer></script>
```

`defer`を付けたスクリプトは、

```text
a.js
↓
b.js
```

のようにHTML上の記述順を保って実行される。

複数のJavaScriptに依存関係がある場合にも扱いやすい。

`defer`付きのscriptは、すべて実行されたあとに`DOMContentLoaded`が発火する。

## `async`は取得でき次第実行する

```html
<script src="js/main.js" async></script>
```

`async`も、HTMLの解析と並行してJavaScriptファイルを取得する。

ただし、取得が完了するとHTMLの解析を一時停止して、その場でJavaScriptを実行する。

```text
HTMLを解析 ───────→
      ↓
      JavaScriptを並行して取得
             ↓ 取得完了
      HTMLの解析を一時停止
             ↓
      JavaScriptを実行
             ↓
      HTMLの解析を再開
```

実行されるタイミングは、ファイルの取得が完了したタイミングによって変わる。

## 複数の`async`は実行順が保証されない

```html
<script src="js/a.js" async></script>
<script src="js/b.js" async></script>
```

この場合、

```text
a.js → b.js
```

の順に実行されるとは限らない。

先に取得が完了したファイルから実行されるため、他のJavaScriptに依存しない処理で使う。

## `body`の末尾に置く方法もある

以前から使われてきた書き方として、`script`要素を`body`の末尾に置く方法がある。

```html
<body>
  <main>
    <!-- ページ内容 -->
  </main>

  <script src="js/main.js"></script>
</body>
```

`script`に到達する頃には、その前にあるHTMLの解析がほぼ終わっているため、JavaScriptからHTML要素を扱いやすくなる。

HTMLパーサーが`script`を処理する位置は末尾になる。ブラウザの先読みでファイル取得が早く始まる場合はあるため、取得開始時点が必ず末尾まで遅れるとは限らない。

`head`内で`defer`を使えば、HTMLを解析しながらJavaScriptを取得できる。

```html
<head>
  <script src="js/main.js" defer></script>
</head>
```

そのため、このWikiでは`head`内で`defer`を使う方法を基本形とする。

ただし、既存コードを配置だけで機械的に移動しない。ほかのscriptとの依存関係や実行順を確認してから変更する。

## 3つの違い

| 書き方 | HTML解析中の取得 | 実行タイミング | 実行順 |
| --- | --- | --- | --- |
| 通常の`script` | `script`到達時に取得し、解析を止める | 取得後すぐ | 記述順 |
| `defer` | HTML解析と並行 | HTML解析完了後 | 記述順 |
| `async` | HTML解析と並行 | 取得完了後すぐ | 保証されない |

通常のWeb制作で、

```html
<script src="js/main.js" defer></script>
```

と書く場合は、

```text
HTMLを解析しながらJavaScriptを取得する
↓
HTMLの解析が終わる
↓
JavaScriptを実行する
```

という流れを押さえておけばよい。

## 仕様確認先

- [HTML Standard - The `script` element](https://html.spec.whatwg.org/multipage/scripting.html#the-script-element)
