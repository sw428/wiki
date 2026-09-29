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

ファイル上部にあるモデルなどの設定のすぐ下へ、1行追加します。今の設定なら、次の形です。

```toml
model = "gpt-5.6-sol"
model_reasoning_effort = "high"
service_tier = "default"
project_doc_max_bytes = 65536
```

上の3行は既存の設定のままです。追加するのは最後の `project_doc_max_bytes = 65536` の1行だけです。すでにこの行があれば、重複して追加しません。

`[windows]` や `[projects.…]` などの見出しより前にある、この位置へ書けば大丈夫です。

65536バイトは64 KiBです。

このWikiの `AGENTS.md` は2026-09-28時点で約38 KiBあるため、既定の32 KiBでは全体を取り込めない可能性があります。そのため、現在の量に余裕を持たせて64 KiBにしています。

設定を保存したら、Codexを再起動するか、新しい実行を開始します。

この設定で増えるのは `AGENTS.md` などのプロジェクト指示を読み込む上限です。モデル自体の性能、コンテキスト容量、利用枠が増えるわけではありません。

また、64 KiBまで使えるからといって `AGENTS.md` に何でも入れるのではなく、共通ルールは `AGENTS.md`、分野固有の詳細は各 `00_...整理マップ.md` に分ける方針を維持します.
