# 02_DOMとイベント

## このファイルの役割

このファイルは、JavaScriptでHTMLを触るときの土台をまとめる場所。
JSで画面を動かすときに、何を取って、何を読んで、何を変えて、どう反応させるのかを整理する。

ここでは主に次を扱う。

- DOM
- 要素の取得
- 属性とプロパティ
- class操作
- 文字やHTMLの変更
- イベント
- フォーム入力

## この範囲の芯

DOM操作は、画面そのものを直接触っているというより、
HTMLをもとに作られたオブジェクトを書き換えていると見ると整理しやすい。

流れで言うと、基本はこれ。

1. 要素を取る
2. その要素の情報を読む
3. class / 属性 / 文字 / 表示状態を変える
4. クリックや入力に応じて反応させる

つまり、

要素取得 -> 状態を読む -> 状態を変える

が土台になる。

## DOMとは何か

DOMは、HTMLをJavaScriptから触れるようにしたオブジェクト構造。

```js
const p = document.querySelector("p");
```

このとき `p` は文字列ではなく、HTML要素を表すDOM要素オブジェクト。

だから、

```js
p.textContent = "hello";
```

のように、プロパティを書き換えられる。

つまりDOM操作の本質は、
画面操作ではなくオブジェクト操作。

## 要素を取る

### querySelector()

条件に合う最初の1個を取る。

```js
const el = document.querySelector(".item");
```

戻り値は次。

- 要素オブジェクト
- 見つからなければ `null`

### querySelectorAll()

条件に合う要素をまとめて取る。

```js
const items = document.querySelectorAll(".item");
```

戻り値は `NodeList`。
配列そのものではないが、複数要素の集合として扱える。

### getElementById()

idで要素を1個取る。

```js
const input = document.getElementById("myInput");
```

### セレクタの例

```js
document.querySelector("#myInput");        // id
document.querySelector(".form-control");   // class
document.querySelector("input");           // タグ
document.querySelector('[value="Hello"]'); // 属性
```

## DOM要素として取れると何ができるか

要素が取れると、その要素に対して次ができる。

- class を付け外しする
- 属性を読む / 書く
- 文字を書き換える
- 表示状態を変える
- イベントを付ける

## classを操作する

画面の開閉やON/OFFは、かなりの場面で class の付け外しで作る。

### classList

```js
const menu = document.querySelector(".menu");

menu.classList.add("is-open");
menu.classList.remove("is-open");
menu.classList.toggle("is-open");
menu.classList.contains("is-open");
```

見方:

- `add` = 付ける
- `remove` = 外す
- `toggle` = あれば外す / なければ付ける
- `contains` = 持っているか確認する

UI実装では、
`イベント -> classList.toggle` がかなり基本になる。

## 文字やHTMLを変える

### textContent

文字だけを入れる。

```js
const title = document.querySelector(".title");
title.textContent = "こんにちは";
```

これはHTMLとして解釈せず、文字として入れる。

### innerHTML

HTMLとして解釈して入れる。

```js
const box = document.querySelector(".box");
box.innerHTML = "<strong>こんにちは</strong>";
```

便利だが、まずは `textContent` を優先したほうが安全。

違い:

- `textContent` = 文字だけ
- `innerHTML` = HTMLとして解釈

## 属性とプロパティ

ここは混ざりやすい。

### 属性

HTMLに最初から書いてある情報。

```html
<input id="myInput" value="Hello">
```

この `value="Hello"` は属性。

### プロパティ

DOM上で今その要素が持っている現在値。

つまり、

- 属性 = HTMLに書かれた初期情報
- プロパティ = DOM上の現在の状態

## getAttribute() と .value の違い

### getAttribute("value")

HTMLに書かれた最初の値を取る。

```js
const el = document.getElementById("myInput");
console.log(el.getAttribute("value"));
```

### .value

今の入力値を取る。

```js
console.log(el.value);
```

### 例

```js
const el = document.getElementById("myInput");

console.log(el.getAttribute("value")); // "Hello"
console.log(el.value);                 // "Hello"

el.value = "World";

console.log(el.getAttribute("value")); // "Hello"
console.log(el.value);                 // "World"
```

見方:

- `getAttribute("value")` = HTMLの初期値
- `el.value` = DOMの現在値

つまり、

- 属性は最初の設定
- プロパティは今の状態

## 属性を書き換える

属性を書き換えるときは `setAttribute()` を使う。

```js
button.setAttribute("aria-expanded", "true");
button.setAttribute("aria-label", "メニューを閉じる");
```

よく使うのは次の状態系属性。

- `aria-expanded`
- `aria-hidden`
- `aria-label`

## 表示状態を変える

### hidden

```js
body.hidden = true;
body.hidden = false;
```

`hidden` は、要素の表示 / 非表示に関わるプロパティ。

- `true` = 非表示
- `false` = 表示

アコーディオンのようなUIでは、
class ではなく `hidden` で切り替えることもある。

## イベント

イベントは、「こうなったらこの処理をする」という仕組み。

### addEventListener()

```js
button.addEventListener("click", handleClick);
```

これは次の意味。

- `click` という出来事が起きたら
- `handleClick` を実行する

### 基本形

```js
const button = document.querySelector(".button");

button.addEventListener("click", function () {
  console.log("クリックされた");
});
```

`addEventListener()` の第2引数には関数を渡す。

## event

イベントが起きたとき、その情報が `event` に入る。

```js
button.addEventListener("click", function (event) {
  console.log(event);
});
```

ここから次を扱える。

- どの要素で起きたか
- 何が起きたか
- デフォルト動作を止めるか

## よく使うイベント

- `click`
- `input`
- `submit`
- `scroll`
- `keydown`
- `DOMContentLoaded`
- `resize`

ざっくり役割:

- `click` = クリック
- `input` = 入力値が変わった
- `submit` = フォーム送信
- `scroll` = スクロール
- `keydown` = キー入力
- `DOMContentLoaded` = HTML読み込み後
- `resize` = 画面サイズ変更

## イベント時に押さえる読み方

イベント処理は、次の順で読むと追いやすい。

1. 何にイベントを付けているか
2. 何が起きたら動くか
3. 関数の中で何を読んでいるか
4. 何を変えているか

たとえば、

```js
toggle.addEventListener("click", () => {
  const isMenuOpen = header.classList.contains("is-open");

  if (isMenuOpen) {
    closeMenu();
  } else {
    openMenu();
  }
});
```

なら、

- `toggle` に
- `click` を付けて
- `header` の状態を読み
- 開閉を分岐している

と読める。

## contains() と closest()

イベント処理でクリック位置を判定するときによく使う。

### contains()

`panel.contains(e.target)`

`panel` の内側に、実際にクリックされた要素が含まれるかを真偽値で返す。

### closest()

`e.target.closest("a")`

クリックされた要素自身、または親をたどって、近くに条件に合う要素があるかを探す。

- 見つかればDOM要素
- なければ `null`

## matchMedia()

画面幅に応じて処理を切り替えたいときに使う。

```js
const mediaQuery = window.matchMedia("(min-width: 769px)");
const isPc = mediaQuery.matches;
```

- `matchMedia()` は `MediaQueryList` を返す
- `.matches` は真偽値

基本はCSSで対応し、JSはどうしても必要なときだけ使う。

## フォームでよく使うもの

### 入力値を取る

```js
const input = document.querySelector("input");
console.log(input.value);
```

入力値は基本的に文字列で来る。

### 送信を止める

```js
form.addEventListener("submit", function (event) {
  event.preventDefault();
});
```

`preventDefault()` は、フォーム送信などの既定動作を止める。

## DOM操作の基本パターン

よくある流れはこれ。

```js
const button = document.querySelector(".button");
const menu = document.querySelector(".menu");

button.addEventListener("click", function () {
  menu.classList.toggle("is-open");
});
```

何をしているか分けると、

1. `.button` を取る
2. `.menu` を取る
3. ボタンがクリックされたら
4. `.menu` に `is-open` を付け外しする

つまり、

- 要素取得
- イベント登録
- 状態更新

の3段セット。

## このファイル全体のまとめ

- DOMはHTMLをJSで触れるようにしたオブジェクト構造
- 要素を取る基本は `querySelector()`
- 複数取るなら `querySelectorAll()`
- idで取るなら `getElementById()`
- UIは class の付け外しで動かすことが多い
- `textContent` は文字、`innerHTML` はHTML
- 属性は最初の値、プロパティは今の値
- `getAttribute("value")` と `.value` は違う
- `setAttribute()` で状態系属性も更新できる
- `hidden` で表示状態を切り替えることもできる
- イベントは「こうなったらこうする」
- `addEventListener()` の第2引数には関数を渡す
- `event` からクリック位置やキー入力などを読める
- フォームでは `value` と `preventDefault()` が重要
- DOM操作は「要素取得 -> 状態を読む -> 状態を変える」で読むと追いやすい
