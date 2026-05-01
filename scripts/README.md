# scripts

## このフォルダの役割

このフォルダは、この repo の運用補助スクリプトを置く場所。
現在は週次同期と月末同期のスクリプトを管理する。

## 追加ルール（新規スクリプト）

- 各スクリプトに「何をするものか」を冒頭で明記する
- 各スクリプトに「実行対象（どこに作用するか）」を明記する
- 各スクリプトに「リスク評価（☆1〜5）」を明記する

## スクリプト一覧

### `stage-portfolio-review.ps1`

概要:

- 外部フォルダで作ったポートフォリオを、案件フォルダへ一時コピーしてレビュー準備を作る
- コピーと同時に `review.md`（3点比較レビュー用テンプレ）を自動生成する

リスク評価:

- `☆☆☆★★ (3/5)`  
  理由: 大きいフォルダのコピーで容量を使う可能性があるため。元フォルダは変更しない。

主な処理:

- `02_案件・制作/<PortfolioName>/review-staging/<timestamp>/source` へコピー
- `review.md` を同じフォルダに生成
- `import-metadata.json` を生成（個人情報保護のため元パス全文は保存しない）
- コピー時に `.git` / `node_modules` / `.next` / `dist` / `coverage` は除外

主なオプション:

- `-SourcePath`: コピー元フォルダ（必須）
- `-PortfolioName`: 受け取り先の案件フォルダ名（必須）
- `-CasesRoot`: 案件ルート（省略時は `02_*` フォルダを自動検出）
- `-StagingFolderName`: 一時受け取りフォルダ名（既定: `review-staging`）
- `-DryRun`: 実コピーせず、実行内容だけ確認

実行例:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\stage-portfolio-review.ps1 `
  -SourcePath "D:\work\portfolio-a" `
  -PortfolioName "ポートフォリオサイト"
```

### `weekly-sync.ps1`

概要:

- 週1で変更をコミットし、本線へ通常 push する自動同期スクリプト
- force push は使わず、差分競合時は失敗で止まる安全寄り運用

リスク評価:

- `☆☆☆★★ (3/5)`  
  理由: 自動 commit / push を行うため。force は使わないが履歴更新は発生する。

主な処理:

- 変更を `git add -A` でステージング
- 変更があれば `YYYY-Www / summary` 形式でコミット
- 本線へ通常 push（`--force` なし）
- 実行結果を `.git/weekly-sync-state.json` に保存

主なオプション:

- `-DryRun`: 実際の commit / push は行わず、内容だけ確認
- `-Remote`: push 先 remote（既定: `origin`）
- `-Branch`: 対象ブランチ（省略時は現在ブランチ）
- `-Summary`: コミット要約を手動指定

自動実行タスク（既定）:

- タスク名: `WikiWeeklySync`
- 実行: 毎週日曜 23:55
- 方式: 確認なしの自動実行

### `monthly-summary-sync.ps1`

概要:

- 月1で変更をコミットし、本線へ通常 push する月次まとめスクリプト
- force push は使わず、差分競合時は失敗で止まる安全寄り運用

リスク評価:

- `☆☆☆★★ (3/5)`  
  理由: 自動 commit / push を行うため。force は使わないが履歴更新は発生する。

主な処理:

- 変更を `git add -A` でステージング
- 変更があれば `YYYY-MM / summary` 形式でコミット
- 本線へ通常 push（`--force` なし）
- 実行結果を `.git/monthly-summary-sync-state.json` に保存

主なオプション:

- `-DryRun`: 実際の commit / push は行わず、内容だけ確認
- `-Remote`: push 先 remote（既定: `origin`）
- `-Branch`: 対象ブランチ（省略時は現在ブランチ）
- `-Summary`: コミット要約を手動指定

自動実行タスク（既定）:

- タスク名: `WikiMonthlySummarySync`
- 実行: 毎月1日 00:05
- 対象ブランチ: `main`（`-Branch main`）
- 方式: 確認なしの自動実行

### `monthly-force-sync.ps1`

概要:

- 月末時点の変更をコミットし、本線へ同期する運用補助スクリプト（緊急時手動用）
- Git履歴を書き換える可能性がある操作（`--force-with-lease`）を含む

リスク評価:

- `☆☆☆☆★ (4/5)`  
  理由: 誤運用時に履歴へ影響しうるため。安全ガードありでも高リスク寄り。

主な処理:

- 変更を `git add -A` でステージング
- 変更があれば `YYYY-MM / summary` 形式でコミット
- 本線更新前に `backup/<timestamp>` ブランチへ退避 push
- 本線を `--force-with-lease` で更新
- 実行結果を `.git/monthly-force-sync-state.json` に保存

主なオプション:

- `-DryRun`: 実際の commit / push は行わず、内容だけ確認
- `-CatchUp`: 前月分として同期処理を行うモード
- `-Remote`: push 先 remote（既定: `origin`）
- `-Branch`: 対象ブランチ（省略時は現在ブランチ）
- `-Summary`: コミット要約を手動指定

運用状態:

- 自動タスク `WikiMonthlyForceSync` は現在 **Disabled**
- 通常運用では `monthly-summary-sync.ps1` を使い、force は使わない

## 安全ガード

主要スクリプトには、次の誤実行防止を入れている。

- 実行先がこの repo ルートと一致しない場合は停止
- remote URL が想定パターン（`*/wiki`）に一致しない場合は停止

## 重要な注意

- このフォルダのスクリプトは、OS操作（例: タスクスケジューラ連携）や Git 操作を含む。
- 個人情報に関わる表記は、可能な限り一般名へ自動で言い換えて明記するよう努める。
- 法令・利用規約・権限範囲を超える操作は行わない。
- 実行対象は **このプロジェクト（`<PROJECT_ROOT>`）のみ** に限定する。
- 自然言語で Codex に依頼する場合も、実行結果と影響範囲の最終確認は利用者側で行う。
- Codex 経由を含む本スクリプトおよび自動化運用の利用は **自己責任** とする。
- 悪意のある利用は行わない。
- 個人情報の一般名化はアプリ性能に依存し、取りこぼしがあり得る前提で利用者側でも確認する。
- 直接利益を得ない私的活用・非商用（無料）利用を前提にする。
- このツールで情報整理し、学習・能力向上や実務で間接的な付加価値を得る目的の利用は許容する。
- 情報整理の結果を発信すること自体は可能とする。
- その場合でも、著作権・各種権利・利用規約は適用される。
- OpenAI 側の最新の規約・ポリシーで許可される範囲でのみ利用する。
- 不安を感じる場合は `scripts` フォルダを削除して使用してよい。
- `scripts` をすべて削除しても、wiki 本体（md運用）の基本機能は失われない。
- Codex の運用性能は主に md ファイルの自然言語構造に依存し、`scripts` は補助扱い。
