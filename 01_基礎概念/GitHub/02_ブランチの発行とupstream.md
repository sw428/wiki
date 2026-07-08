# ブランチの発行とupstream

## 目的

VS Codeで「ブランチの発行」や `git push -u` の案内が出たときに、何が起きているかを切り分ける。

ここで大事なのは、「Git管理が消えた」とすぐ判断しないこと。
多くの場合は、今いるローカルブランチとGitHub側ブランチの対応関係がまだ決まっていないだけ。

## 「ブランチの発行」とは

VS Codeの「ブランチの発行」は、だいたい次の意味。

ローカルにある今のブランチを、GitHub側にも作って対応づける。

たとえば今のブランチが `main` なら、GitHub側の `origin/main` と結びつける。

コマンドで書くと、次に近い。

```bash
git push -u origin main
```

今のブランチが `dev_sub` ならこう。

```bash
git push -u origin dev_sub
```

`-u` は、次回から `git push` だけで済むように、ローカルブランチとリモートブランチの対応関係を登録する指定。

## よくある原因

### 1. 今いるブランチが違う

前は `main` をpushしていたが、今は `dev_sub` にいる場合。

GitHub側に `main` があっても、`dev_sub` がまだなければ、VS Codeは「このブランチを発行する？」と聞いてくることがある。

確認する。

```bash
git branch
```

`*` が付いているものが、今いるブランチ。

### 2. upstreamが外れている

GitHub側にブランチはあるが、ローカルブランチがどのリモートブランチを追跡するかを失っている場合。

確認する。

```bash
git branch -vv
```

次のように `[origin/main]` があれば、upstreamがある。

```bash
* main  abc1234 [origin/main] commit message
```

`[origin/main]` がない場合、VS Codeが「発行して」と出すことがある。

GitHub側にすでにそのブランチがあるなら、次で対応づけられる。

```bash
git branch --set-upstream-to=origin/main main
```

`dev_sub` ならこう。

```bash
git branch --set-upstream-to=origin/dev_sub dev_sub
```

### 3. remote URLがない

前はGitHubにつながっていたが、フォルダ移動や設定変更で `origin` が消えている場合。

確認する。

```bash
git remote -v
```

正常なら、GitHubのURLが出る。

```bash
origin  https://github.com/ユーザー名/リポジトリ名.git (fetch)
origin  https://github.com/ユーザー名/リポジトリ名.git (push)
```

何も出ない場合は、GitHubとの接続先が設定されていない。

### 4. VS Codeで親フォルダを開いている

本当のGit管理フォルダが次のような構造だとする。

```txt
works/
  portfolio/
    .git/
    index.html
```

このとき VS Codeで `works` を開いていると、Git認識がずれることがある。

安全なのは、`.git` がある `portfolio` を直接開くこと。

## 押す前に見るもの

「ブランチの発行」を押す前に、最低限これを見る。

```bash
git status
git branch
git branch -vv
git remote -v
```

見るポイントは次。

- `git branch`: 今いるブランチは何か
- `git branch -vv`: `[origin/main]` のような追跡先があるか
- `git remote -v`: GitHubのURLが残っているか

## 判断基準

GitHubにそのブランチを作りたいなら、「ブランチの発行」を押してよい。

ただし、次が曖昧なら先に確認する。

- 今いるブランチ名が意図したものか
- 送信先のGitHubリポジトリが正しいか
- そのブランチをGitHub側に作ってよいか
- 公開元ブランチや提出用ブランチと混ざっていないか

## Web制作とのつながり

Web制作では、`push` と公開確認を分けて見る。

`push` はGitHubへコードを送る操作。
GitHub Pagesの表示は、公開元ブランチやデプロイ結果によって決まる。

そのため、`push` できたのにWebページが変わらない場合は、次を分けて確認する。

1. 今のブランチにpushできているか
2. GitHub Pagesの公開元ブランチはどれか
3. デプロイが成功しているか
4. 公開URLで反映されているか
