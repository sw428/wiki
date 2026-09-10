# 02_Vim・NeovimとVS Code

## 結論

VS CodeでVim操作を使う代表的な選択肢は、VSCodeVimとVSCode Neovimである。

- VSCodeVim: VS Code拡張内でVim操作をエミュレートする
- VSCode Neovim: Neovim本体をバックエンドとしてVS Codeと統合する

最初はどちらか一方だけを有効にする。両方を同時に使うと、キー入力を処理する機能が競合し得る。

## VimとNeovim本体の特徴

NeovimはVimを基にした別のエディタである。基本的な操作体系は広く共通するが、同一の製品ではなく、設定方法や拡張の仕組みには差がある。

| 観点 | Vim | Neovim |
|---|---|---|
| 位置づけ | vi系の操作を発展させてきたエディタ | Vimを基に、拡張性や外部連携を発展させたエディタ |
| 操作体系 | Vimの操作体系 | Vimの操作体系を広く共有する |
| 主な設定 | `vimrc`、Vim script、Vim9 script | `init.vim` / `init.lua`、Vim script、Lua |
| 選ぶ手掛かり | Vimとの互換性やVim9 scriptを重視する | Lua設定、Neovim向けプラグイン、API連携を使う |

どちらもターミナルから起動できるため、「ターミナルで使うか」だけでは選択を決めない。共通する操作が多いため、基本操作の練習はどちらにも持ち運びやすい。

## VSCodeVimとVSCode Neovimの違い

| 観点 | VSCodeVim | VSCode Neovim |
|---|---|---|
| 仕組み | VS Code拡張によるVimエミュレーション | Neovim本体をバックエンドとして利用 |
| 別途必要な本体 | 通常は不要 | Neovimが必要 |
| 導入負荷 | 比較的小さい | 本体導入と接続確認が増える |
| Vim / Neovim設定 | VSCodeVim用設定が中心 | `init.lua` と多くの編集系プラグインを利用可能 |
| VS Codeとの分担 | VS Code内で拡張が操作を再現 | Insert、UI、LSP、補完などは主にVS Codeが担当 |
| 向く段階 | Vim操作をまず試す | Neovimの挙動や設定資産を使いたい |

VSCode NeovimもVS Code全体をNeovimへ置き換えるわけではない。ファイル・タブ・画面UIなど、VS Code側が担当する操作には単体Neovimとの差が残る。

## キー入力と編集反映の導線

### VSCodeVim

VSCodeVimは、Vim本体を裏で動かすのではなく、VS Code拡張としてVim操作を解釈する。

```text
キー入力
  ↓
VSCodeVimが現在のモードとキー列を解釈
  ↓
VS Codeの文書へ編集を適用
  ↓
VS Codeの画面へ反映
```

この経路なので導入は軽い一方、Vimの全機能をそのまま実行しているわけではなく、対応範囲や細かな挙動はVSCodeVimの実装に依存する。

### VSCode NeovimのNormal / Visualモード

VSCode Neovimは、NeovimのインスタンスとVS Code内の文書を同期して使う。Normal / Visualモードの簡略化した流れは次のとおり。

```text
キー入力
  ↓
VSCode Neovim拡張
  ↓
NeovimがNormal / Visualコマンドを処理
  ↓
Neovim側のバッファ変更を拡張が受け取る
  ↓
VS Codeの文書へ編集を適用して画面に反映
```

### VSCode NeovimのInsertモード

Insertモードでは、通常の文字入力をVS Codeへ任せる。

```text
キー入力
  ↓
VS Codeが文字入力・補完・スニペットを処理
  ↓
VS Codeの文書が変わる
  ↓
変更をNeovim側のバッファへ同期
```

`Esc` でNormalモードへ戻る際にも、Insert中の変更がNeovim側へ同期される。この分担により、編集コマンドはNeovim、入力・LSP・補完・スニペット・UIはVS Codeという組み合わせになる。

この図は理解用の簡略化である。最終的なキー処理や同期には、VS Code固有のキーバインド、拡張機能、Neovim設定が関わるため、単体Neovimと完全に同じとは限らない。

## VSCodeVimを導入する場合

拡張機能IDは `vscodevim.vim`。

1. VS Codeの拡張機能画面を開く
2. `vscodevim.vim` を確認してインストールする
3. 他のVimエミュレーション拡張は無効にする
4. 少数の操作で動作を確認する

VSCodeVimのNeovim連携は任意であり、通常利用に必要ではない。現行の公式READMEでは、Neovim連携は主にExコマンドを利用する実験的機能として説明されている。

## VSCode Neovimを導入する場合

拡張機能IDは `asvetliakov.vscode-neovim`。拡張だけでは動かず、Neovim本体も必要である。

WindowsではNeovim公式がWinGetによる導入方法を案内している。

```powershell
winget install Neovim.Neovim
nvim --version
```

その後、VS Codeへ拡張を導入する。実行ファイルが自動検出されない場合は、公式READMEで現在の設定名を確認してNeovimのパスを指定する。

最初は空に近いNeovim設定で動作を確認する。描画やUIへ強く介入するNeovimプラグインは、VS Code側の表示と衝突する可能性がある。

## Vim / Neovim本体が見つからない場合

```text
-bash: vim: command not found
```

これはVimの操作に失敗したのではなく、シェルが `vim` という実行ファイルを見つけられない状態である。未導入か、実行ファイルがPATHに含まれていない可能性を確認する。

Linux系シェルでは次を確認する。

```sh
command -v vim
command -v vi
command -v nvim
```

PowerShellでは次を確認する。

```powershell
Get-Command vim
Get-Command nvim
```

教材や会社が管理する環境では、指定されたシナリオや導入手順を先に確認する。権限や保存条件が分からない一時環境へ、自己判断で追加しない。

自分で管理するWindows環境へVim本体を導入する場合は、Vim公式が案内するWinGetパッケージを利用できる。

```powershell
winget install --id vim.vim
vim --version
```

VSCodeVimだけを使う場合、Vim本体の導入は通常必要ない。

## 初学時の選び方

導入負荷を抑えてVimの操作文法を試すなら、まずVSCodeVimが候補になる。次の必要が具体的に出たら、VSCode Neovimを検討する。

- 単体Neovimと近い編集挙動を使いたい
- `init.lua` のキーマップや編集系プラグインを共有したい
- VSCodeVimで未対応または差のある操作が実際の支障になった

これは優劣の固定ではない。基本操作で足りる間は、仕組みの複雑さを増やさない方が切り分けやすい。

## 自分の環境への記録

このページは一般的な選択肢を扱う。実際にどちらかを導入・採用した後に限り、次へ採用理由と設定を記録する。

- [自分のVS Code環境](../vscode/自分のvscode環境/00_自分のvscode環境.md)
- [拡張機能一覧](../vscode/自分のvscode環境/04_拡張機能一覧.md)
- [キーボードショートカット](../vscode/自分のvscode環境/03_キーボードショートカット.md)

## 公式情報の確認先

- [Vim公式リポジトリ](https://github.com/vim/vim)
- [Downloading Vim](https://www.vim.org/download.php)
- [Neovim: About](https://neovim.io/about/)
- [VSCodeVim公式README](https://github.com/VSCodeVim/Vim/blob/master/README.md)
- [VSCode Neovim公式README](https://github.com/vscode-neovim/vscode-neovim)
- [VSCode Neovim: How it works](https://github.com/vscode-neovim/vscode-neovim/blob/master/CONTRIBUTING.md#how-it-works)
- [Neovim公式インストール案内](https://neovim.io/doc/install/)

## 関連ページ

- [Vimの土台と導入](./01_Vimの土台と導入.md)
