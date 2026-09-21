# 06_tabindexとフォーカス順を扱う

`tabindex`は、要素がキーボードによる順次フォーカス移動へ参加するか、その順序をどう扱うかに関わる。値を付ける前に、ネイティブHTML要素だけで必要な操作ができないか確認する。

## まずネイティブのフォーカス順を使う

```html
<a href="/guide/">ガイド</a>
<button type="button">メニュー</button>
<input type="email">
```

リンク、ボタン、入力欄などは、通常はHTMLの文書順に沿ってTabキーの移動対象になる。CSSで視覚的な順番だけを変えると、見た目とフォーカス移動がずれることがあるため、まずDOM順を自然な読み順・操作順にする。

## `0`は通常の順次フォーカスへ参加させる

```html
<div tabindex="0">フォーカスできる領域</div>
```

`tabindex="0"`は、通常の順次フォーカス順へ要素を参加させる。ただし、`div`へボタンの意味やEnter・Spaceによる実行動作を追加するわけではない。操作部品なら、まず`button`などのネイティブ要素を選ぶ。

## 負の値は通常のTab順から外す

```html
<section id="error-summary" tabindex="-1">
  入力内容を確認してください。
</section>
```

負の`tabindex`を持つ要素は、通常はTabキーによる順次フォーカス順へ入れず、JavaScriptの`focus()`などからフォーカスできる対象にする。エラー表示や画面切り替え後の見出しなど、処理の結果としてフォーカスを移す理由がある場合に使う。

```js
document.getElementById("error-summary").focus();
```

## 正の値で独自順序を作らない

```html
<button tabindex="2">次</button>
<button tabindex="1">前</button>
```

正の値は、値が小さい要素を通常の文書順より先に並べる。要素の追加・削除やレスポンシブ表示で順序を保ちにくく、画面の見た目、DOM順、フォーカス順が食い違いやすい。

基本は正の`tabindex`を避け、DOM順を直す。独自UIでフォーカス管理が必要なら、対象のARIAパターンとキーボード操作を一緒に設計する。

## 確認方法

1. マウスを使わず、TabとShift+Tabでページを移動する。
2. フォーカス位置が見えるか確認する。
3. 見た目と読み順に沿って移動するか確認する。
4. 開閉や画面更新後、フォーカスが消えたり隠れた領域へ残ったりしないか確認する。

ARIAを使うUIの意味と状態は[roleとARIA属性で意味と状態を補う](./04_roleとARIA属性で意味と状態を補う.md)へ戻る。

## 一言でいうと

`tabindex`で順序を作り直す前にDOM順とネイティブ要素を整え、`0`と負の値は目的を確認して使う。

## 仕様確認先

- [HTML Standard - The `tabindex` attribute](https://html.spec.whatwg.org/multipage/interaction.html#the-tabindex-attribute)
- [HTML Standard - Sequential focus navigation](https://html.spec.whatwg.org/multipage/interaction.html#sequential-focus-navigation)
- [WAI-ARIA APG - Developing a Keyboard Interface](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/)
