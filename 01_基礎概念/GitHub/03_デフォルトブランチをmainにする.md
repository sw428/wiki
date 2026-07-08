# デフォルトブランチをmainにする

## 目的

GitHub側のデフォルトブランチを `master` から `main` に変えるときと、今後新しく作るリポジトリを `main` で始めるための確認順を整理する。

ここで大事なのは、ローカルの `main` 作成、GitHub側のデフォルトブランチ変更、不要になった `master` 削除を分けて見ること。

## いまの状態を読む

次のような表示が出ている場合、

```txt
branch 'main' set up to track 'origin/main'.
Everything up-to-date
```

これは次の意味。

- ローカルの `main` はある
- GitHub側の `origin/main` と追跡関係ができている
- push済みで、現時点では差分がない

つまり、`main` をGitHubに送るところまでは完了している。

この段階で残っている作業は、GitHub画面側でデフォルトブランチを `main` に変えること。

## GitHub側で見る場所

GitHubの対象リポジトリで、次を探す。

```txt
Settings
Branches
Default branch
```

GitHubの画面構成によって見つからない場合は、次も確認する。

```txt
Settings
General
Default branch
```

Branches画面で `Branch protection rules` が見えている場合、それはブランチ保護ルールの場所。
デフォルトブランチ変更欄は、その画面の少し上にあることがある。

見るものは、`Default branch` と表示されている項目。
そこが `master` のままなら、`main` へ変更する。

## masterを削除する前の条件

`master` を削除する前に、次を満たしているか確認する。

- `main` がGitHub側に存在している
- ローカルの `main` が `origin/main` を追跡している
- GitHub側のDefault branchが `main` になっている
- `master` にだけ残っている必要な変更がない

Default branchがまだ `master` のままなら、先にGitHub画面側で `main` へ変更する。

## masterを削除する

GitHub側のDefault branchを `main` に変更できたあと、不要な `master` を消すなら次。

```bash
git push origin --delete master
```

これはGitHub側の `master` ブランチを削除する操作。
まだDefault branchが `master` の場合は削除できない、または削除しない方がよい。

## 今後mainで始めるためのPC側設定

今後 `git init` したときに最初のブランチを `main` にしたいなら、PC側で一度だけ設定する。

```bash
git config --global init.defaultBranch main
```

確認する。

```bash
git config --global init.defaultBranch
```

次のように出ればよい。

```txt
main
```

この設定をしておくと、今後 `git init` で作るリポジトリの初期ブランチが `main` になる。

## 新しく作るときの流れ

PC側で `init.defaultBranch main` を設定済みなら、基本の流れはこう。

```bash
git init
git add .
git commit -m "first commit"
git remote add origin https://github.com/ユーザー名/リポジトリ名.git
git push -u origin main
```

もし初期ブランチが `master` で作られてしまった場合は、push前に `main` へ変える。

```bash
git branch -M main
```

そのあとで、GitHub側へpushする。

```bash
git push -u origin main
```

## GitHub側の新規リポジトリ設定

GitHub側でも、新規リポジトリのデフォルトブランチ名を `main` にしておくとよい。

GitHub全体の設定では、次のような場所にある。

```txt
GitHub右上アイコン
Settings
Repositories
Repository default branch
```

ここを `main` にしておくと、GitHub側で新しく作るリポジトリも `main` を使いやすくなる。

## まとめ

`master` から `main` へ移すときは、次の順で見る。

1. ローカルの `main` を作る
2. `main` をGitHubへpushする
3. `main` が `origin/main` を追跡していることを確認する
4. GitHub側のDefault branchを `main` に変える
5. 不要なら `master` を削除する

今後 `master` を作りたくない場合は、次の2つを設定する。

- PC側: `git config --global init.defaultBranch main`
- GitHub側: `Repository default branch` を `main`

