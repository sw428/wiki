# ChatGPTと外部アプリの操作場所

## 目的

ChatGPTからExcel・PowerPoint・Gmailなどを使うときに、「どの画面から指示し、どこへ変更が反映されるか」を混同しないための整理。

## 連携方式は1つではない

### アプリ内アドイン

ExcelやPowerPointの中にChatGPTを追加し、右側のサイドバーから指示する方式。

- 指示を出す場所: ExcelまたはPowerPoint内
- 対象: 今開いているブックやプレゼンテーション
- 確認方法: セル、数式、書式、グラフ、スライドなどの変更をアプリ内で確認する

2026年7月確認時点では、OpenAI公式のExcel用・PowerPoint用アドインがある。

- [ChatGPT for Excel and Google Sheets（OpenAI Help Center）](https://help.openai.com/en/articles/20001063-chatgpt-for-excel)
- [ChatGPT for PowerPoint（OpenAI Help Center）](https://help.openai.com/en/articles/20001242-chatgpt-for-powerpoint)

どちらも、Microsoft 365の「ホーム → アドイン」でChatGPTを検索して追加する。会社や学校の環境では、管理者による許可や配布が必要な場合がある。

### ChatGPTへファイルを渡す

このチャットへ `.xlsx` や `.pptx` を渡し、ChatGPT側で編集する方式。

- 指示を出す場所: ChatGPT
- 対象: チャットへ渡したファイル
- 確認方法: 編集後のファイルやプレビューを確認する

別画面で開いているExcelやPowerPointが、ファイルをアップロードしただけで自動的に同期編集されるとは限らない。アドインで開いているファイルを扱う場合と分けて考える。

### ChatGPTから接続アプリを操作する

GmailなどをChatGPTのアプリとして接続し、このチャットから検索・参照・操作する方式。

- 指示を出す場所: ChatGPT
- 対象: 接続を許可した外部サービスの情報
- 結果: 検索結果はチャットへ返り、許可された書き込み操作は外部サービス側にも反映される

Gmailは、メールの検索や要約だけに固定されていない。プラン、端末、ロールアウト、管理者設定、許可されたアクションによっては、チャット内で下書きを作り、確認して送信できる。

- [Apps in ChatGPT（OpenAI Help Center）](https://help.openai.com/en/articles/11487775-apps-in-chatgpt)
- [ChatGPT Release Notes（OpenAI Help Center）](https://help.openai.com/en/articles/6825453-chatgpt-release-notes)

## なぜ操作場所が違うのか

違いは、サービスの種類そのものより、提供されている連携方式にある。

- アドイン: 外部アプリの画面内にChatGPTが入る
- ファイル編集: ChatGPTへ渡したファイルをChatGPT側で扱う
- 接続アプリ: ChatGPTから外部サービスの情報や操作へアクセスする

「Excelは見た目を確認するからアドイン、Gmailは検索中心だから接続アプリ」と考えると理解しやすいが、これは固定的な技術制限ではない。現在提供されている機能と権限の設計による違いとして扱う。

## 判断基準

操作前に次を確認する。

1. 指示を書く場所はどこか
2. 今開いているファイルと、アップロードしたファイルのどちらを扱うか
3. 読み取りだけか、変更・送信まで許可されているか
4. 個人環境か、会社管理のワークスペースか
5. 実行前の確認画面と、変更後の保存先はどこか

