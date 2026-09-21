# 05_roleとARIA属性で意味と状態を補う

`role`と`aria-*`は、HTMLだけでは足りない意味・状態・関係を支援技術へ伝えるために使う。

ただし、見た目やクリック処理、キーボード操作を自動で追加するものではない。

## まずネイティブHTML要素を使う

```html
<span role="button">メニュー</span>
```

`role="button"`を付けると、`span`をボタンとして支援技術へ伝えられる。

しかし、これだけでは通常の`button`が持つフォーカスや、Enter・Spaceによるキーボード操作まで追加されるわけではない。

ボタンが必要なら、まず`button`要素を使う。

```html
<button type="button">メニュー</button>
```

必要な意味と動作を持つHTML要素がある場合は、その要素を優先する。要素を意味から選ぶ考え方は、[意味からHTML要素を選ぶ](../04_HTMLの意味と構造/01_意味からHTML要素を選ぶ.md)で扱う。

## `role`で要素の役割を伝える

`role`は、その要素がどのような役割を持つかを支援技術へ伝える。

```html
<div role="dialog">
  ...
</div>
```

この例では、この領域がダイアログであることを伝えている。

ただし、`role="dialog"`を書くだけで表示・非表示、閉じる処理、フォーカス移動などが実装されるわけではない。

## ARIA属性で状態や関係を伝える

ARIA属性は、要素の現在の状態や、他の要素との関係を伝える。

```html
<button
  type="button"
  aria-expanded="false"
  aria-controls="site-nav"
>
  メニュー
</button>

<nav id="site-nav" hidden>
  ...
</nav>
```

この例では、

- `aria-expanded`は、メニューが開いているか閉じているかを伝える
- `aria-controls`は、そのボタンが制御する要素の`id`を参照する
- `hidden`は、実際の表示・非表示を扱う

という役割に分かれている。

Disclosureパターンでは、`aria-expanded`は必要だが、`aria-controls`による関係の指定は任意。属性名だけを一式で覚えず、実装するUIパターンで必要な意味・状態・関係を確認する。

## ARIAの状態を実際のUIと合わせる

メニューを開いたら、

```html
<button aria-expanded="true">
```

閉じたら、

```html
<button aria-expanded="false">
```

へ戻す。

画面上の状態とARIAの値が食い違うと、支援技術へ誤った情報が伝わる。

そのため、実際のUIが変化したときはARIAの状態も合わせて更新する。

## `aria-hidden`は見た目を消す属性ではない

```html
<div aria-hidden="true">
  ...
</div>
```

`aria-hidden="true"`は、その要素と子孫をアクセシビリティツリーから除外する。

CSSの`display`や`visibility`を変更するものではないため、画面から要素を消すためには使わない。

また、リンクやボタンなど操作できる要素を含む領域へ付けると、画面では操作できるのに支援技術から見つからない状態を作ることがある。

装飾として重複している内容など、アクセシビリティツリーから除外する理由があり、子孫も確認できる場合に使う。

DOMとアクセシビリティツリーの関係は、[意味構造とアクセシビリティツリー](../../../03_詳細/01_HTML・CSS/02_意味構造とアクセシビリティツリー.md)で扱う。

## ARIA属性から別の要素を参照する

`aria-labelledby`、`aria-describedby`、`aria-controls`などは、別の要素の`id`を参照できる。

```html
<h2 id="dialog-title">設定</h2>

<div role="dialog" aria-labelledby="dialog-title">
  ...
</div>
```

`aria-labelledby="dialog-title"`が、`id="dialog-title"`の要素を参照している。

参照を使うときは、

- 参照先の`id`が存在するか
- `id`が重複していないか
- DOM更新後も関係が保たれているか

を確認する。

## 判断するときの順番

`role`やARIA属性を使う前に、

1. 必要な意味を持つHTML要素がないか
2. HTMLだけでは足りない意味・状態・関係があるか
3. 実際のUIとARIAの状態が一致しているか
4. 必要なキーボード操作やフォーカスも成立しているか

を確認する。

## 一言でいうと

`role`とARIA属性は、不足する意味・状態・関係を支援技術へ伝えるために使う。実際の表示や操作は、HTMLやJavaScript側でも成立させる。

## 仕様確認先

- [WAI-ARIA 1.2](https://www.w3.org/TR/wai-aria-1.2/)
- [ARIA in HTML](https://www.w3.org/TR/html-aria/)
- [WAI-ARIA APG - Disclosure Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/)
- [WAI-ARIA APG - Developing a Keyboard Interface](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/)
