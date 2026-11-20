# Codexの初期設定

このWikiでは `AGENTS.md` がCodexの既定の読み込み上限32 KiBを超えるため、読み込み上限を64 KiBへ広げます。

Windowsでは、次の個人設定ファイルを開きます。

```text
%USERPROFILE%\.codex\config.toml
```

通常は次の場所です。

```text
C:\Users\ユーザー名\.codex\config.toml
```

既存のモデル・推論設定は変更せず、ファイル上部へ次の1行を追加します。すでにあれば重複して追加しません。

```toml
project_doc_max_bytes = 65536
```

`[windows]` や `[projects.…]` などの見出しより前にある、この位置へ書けば大丈夫です。

65536バイトは64 KiBです。

2026-11-16の確認では、このWikiの `AGENTS.md` は42,749バイト（約41.7 KiB）で、既定の32 KiBを超えています。個人設定の `project_doc_max_bytes = 65536` は維持します。将来上限を戻すときは、同時に読み込むプロジェクト指示の合計量で判断します。

設定を保存したら、Codexを再起動するか、新しい実行を開始します。

この設定で増えるのは `AGENTS.md` などのプロジェクト指示を読み込む上限です。モデル自体の性能、コンテキスト容量、利用枠が増えるわけではありません。

共通ルールは `AGENTS.md`、分野内の反映先は各 `00_...整理マップ.md`、執筆・画像などの詳細は対象作業でだけ読む専用規約に分けます。上限を広げても、毎回読む文書は増やしません。

設定の仕様は[公式のAGENTS.mdガイド](https://learn.chatgpt.com/docs/agent-configuration/agents-md)を参照してください。
