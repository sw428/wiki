# 07_tabindexとフォーカス順を扱う

`tabindex`は、要素がキーボードによるフォーカス移動へ参加するか、その順番をどう扱うかに関わる属性。

`tabindex`を付ける前に、まずネイティブHTML要素とDOM順だけで自然な操作順になっているか確認する。

## まずネイティブのフォーカス順を使う

リンク、ボタン、入力欄などは、通常はTabキーでフォーカスできる。

```html
<a href="/guide/">ガイド</a>
<button type="button">メニュー</button>
<label>
  メールアドレス
  <input type="email">
</label>
```

基本的には、HTMLの文書順に沿ってフォーカスが移動する。

そのため、まずDOM順を自然な読み順・操作順にする。

CSSで見た目の順番だけを変更すると、画面上の並びとキーボードの移動順がずれることがある。

## `tabindex="0"`は通常のTab順へ参加させる

```html
<div tabindex="0">
  フォーカスできる領域
</div>
```

`tabindex="0"`を指定すると、その要素を通常の順次フォーカス移動へ参加させられる。

ただし、`div`へ`tabindex="0"`を付けても、ボタンとしての意味やEnter・Spaceによる操作が自動で追加されるわけではない。

操作するための部品なら、まず`button`などのネイティブHTML要素を使う。読むだけの要素も、フォーカスさせる理由がなければTab順へ加えない。

## 負の値は通常のTab順から外す

```html
<section id="error-summary" tabindex="-1">
  入力内容を確認してください。
</section>
```

負の`tabindex`を持つ要素は、通常はTabキーによる順次フォーカス移動には入らない。

一方で、JavaScriptからフォーカスを移す対象にはできる。

```js
document.getElementById("error-summary").focus();
```

たとえば、処理の結果として表示されたエラー領域や、画面切り替え後の見出しなどへフォーカスを移したい場合に使える。

## 正の`tabindex`で独自の順番を作らない

```html
<button type="button" tabindex="2">次</button>
<button type="button" tabindex="1">前</button>
```

正の値を指定した要素は通常の文書順で並ぶ要素より先に扱われ、正の値の中では値が小さい要素からフォーカスされる。

しかし、要素の追加や削除、レスポンシブ表示などによって順番を保ちにくくなる。

その結果、

```text
画面上の順番
DOMの順番
フォーカスの順番
```

が食い違いやすい。

基本は正の`tabindex`を使って順番を作り直すのではなく、DOM順そのものを直す。

## 独自UIではフォーカス管理も設計する

独自UIでは、単に`tabindex`を付けるだけでなく、

- どの要素へフォーカスできるか
- どの順番で移動するか
- 開閉後にフォーカスをどこへ移すか
- 非表示になった領域へフォーカスが残らないか

も確認する。

ARIAを使うUIでは、意味や状態だけでなくキーボード操作とフォーカス管理も一緒に考える。ARIAが補う情報と実際の操作の境界は、[roleとARIA属性で意味と状態を補う](./05_roleとARIA属性で意味と状態を補う.md)で確認する。

## Tabキーで実際に確認する

フォーカス順はコードだけでなく、実際にキーボードで確認する。

1. マウスを使わず、Tabキーで移動する
2. Shift+Tabで逆方向にも移動する
3. フォーカス位置が画面上で分かるか確認する
4. 見た目と読み順に沿って移動するか確認する
5. 開閉や画面更新後に、フォーカスが消えたり非表示領域へ残ったりしないか確認する

## 判断するときの見方

`tabindex`を使うときは、

```text
ネイティブ要素だけで操作できる
→ tabindexを追加しない

通常のTab順へ参加させたい
→ tabindex="0"

通常のTab順には入れず、
JavaScriptからフォーカスしたい
→ 負のtabindex

独自の順番を作りたい
→ 正のtabindexではなくDOM順を見直す
```

と考える。

## 一言でいうと

`tabindex`でフォーカス順を作り直す前に、まずDOM順とネイティブHTML要素を整える。`0`と負の値は目的を確認して使い、正の値は基本的に避ける。

## 仕様確認先

- [HTML Standard - The `tabindex` attribute](https://html.spec.whatwg.org/multipage/interaction.html#the-tabindex-attribute)
- [HTML Standard - Sequential focus navigation](https://html.spec.whatwg.org/multipage/interaction.html#sequential-focus-navigation)
- [WAI-ARIA APG - Developing a Keyboard Interface](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/)
