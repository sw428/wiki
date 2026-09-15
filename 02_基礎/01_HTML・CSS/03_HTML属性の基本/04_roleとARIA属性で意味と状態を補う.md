# 04_roleとARIA属性で意味と状態を補う

`role`と`aria-*`は、HTMLだけでは足りない意味・関係・状態をアクセシビリティAPIへ伝える。見た目、クリック処理、キーボード操作を自動で実装する属性ではない。

## まずネイティブHTML要素を選ぶ

```html
<span role="button">メニュー</span>
```

`role="button"`は、`span`を支援技術へボタンとして伝えられる。しかし、`span`へボタンのクリック動作、キーボード操作、フォーカス可能性が一式で追加されるわけではない。

```html
<button type="button">メニュー</button>
```

必要な意味と動作を持つHTML要素があるなら、最初からその要素を使う。独自UIとして非対話要素を作り替える場合は、ARIAだけでなく、フォーカス、Enter・Spaceなどのキーボード操作、状態変更も実装する必要がある。

## ARIAの状態を実際のUIと同期する

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

- `aria-expanded`は、操作対象が現在展開されているかを示す。
- `aria-controls`は、そのボタンが制御する要素の`id`を参照する。この関係の指定はDisclosureパターンでは任意。
- `hidden`は、この例で実際の表示・非表示を切り替えるHTML属性。

メニューを開く処理では、`hidden`を外すだけでなく`aria-expanded="true"`へ更新する。閉じるときは両方を戻す。ARIAの値と画面上の状態が食い違うと、支援技術へ誤った状態が伝わる。

## `aria-hidden`は見た目を消す属性ではない

`aria-hidden="true"`は、その要素と子孫をアクセシビリティツリーから除外するための状態。CSSの`display`や`visibility`を変更せず、見た目を消す処理の代わりにはならない。

操作できるリンクやボタンが子孫にある領域へ付けると、画面では操作できるのに支援技術から見つからない状態を作り得る。装飾だけの重複内容など、除外する理由と子孫を確認できる場合に使う。

## 属性の参照関係を確認する

`aria-labelledby`、`aria-describedby`、`aria-controls`などは、別要素の`id`を参照する。

```html
<h2 id="dialog-title">設定</h2>
<div role="dialog" aria-labelledby="dialog-title">
  ...
</div>
```

参照先が存在するか、`id`が重複していないか、DOM更新後も関係が保たれているかを確認する。

HTML要素を意味から選ぶ入口は[意味からHTML要素を選ぶ](../04_HTMLの意味と構造/01_意味からHTML要素を選ぶ.md)、アクセシビリティツリーとの関係は[意味構造とアクセシビリティツリー](../../../03_詳細/01_HTML・CSS/01_意味構造とアクセシビリティツリー.md)で扱う。

## 一言でいうと

ARIAは不足する意味や状態を補うが、実際の表示・操作・キーボード対応はHTMLとJavaScript側でも成立させる。

## 仕様確認先

- [WAI-ARIA 1.2](https://www.w3.org/TR/wai-aria-1.2/)
- [ARIA in HTML](https://www.w3.org/TR/html-aria/)
- [WAI-ARIA APG - Disclosure Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/)
- [WAI-ARIA APG - Developing a Keyboard Interface](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/)
