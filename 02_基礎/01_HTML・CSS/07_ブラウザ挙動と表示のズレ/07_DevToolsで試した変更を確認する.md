# 07_DevToolsで試した変更を確認する

ElementsのStylesやSourcesで値を試しながら直した後は、DevTools内で何を変更したかを確認し、再読み込み後にも残す必要があるかを分ける。

## Changesで試した編集を確認する

ElementsのStylesやSourcesでCSSを試しながら直した場合は、ChangesパネルでDevTools内の変更箇所をまとめて確認できる。

- DevTools右上のメニューから `More tools`、`Changes`を選ぶ。
- または `Ctrl + Shift + P`を押し、`Show Changes`を実行する。

Changesが追跡するのはDevTools内で行った編集である。CSSはElementsのStylesまたはSources、JavaScriptはSourcesの変更を確認できる。Elementsで一時的に変えたDOMまで常に一覧化されるとは考えない。

ページまたはDevToolsを再読み込みすると、通常の編集差分は消える。再読み込み後も試作を残す場合はLocal Overrides、ローカルのソースファイルへ保存する場合はWorkspacesを使い分ける。

## 公式情報

- [Changes: Track your HTML, CSS, and JavaScript changes](https://developer.chrome.com/docs/devtools/changes/)
- [Override web content and HTTP response headers locally](https://developer.chrome.com/docs/devtools/overrides/)
