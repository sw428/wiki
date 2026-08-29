# プロファイルとSettings Sync

## 目的

VS CodeのプロファイルとSettings Syncを混同しないためのメモ。

ここでは、自分のVS Code環境を分けるときに迷いやすい次の点を整理する。

- プロファイルは、VS Code内で設定セットを分ける仕組み
- Settings Syncは、複数PC間で設定を同期する仕組み
- プロファイル作成時に何を含めたかで、あとからの独立度が変わる
- 同期は片方向コピーではなく、選択によって相手側にも影響することがある

## まず分ける3つ

プロファイルまわりで混乱しやすいのは、参照・同期・重複が同じように見えること。

ここは最初に次の3つへ分ける。

- 参照: 自分の中に持っていない設定・拡張機能をDefault Profile側から借りる
- 同期: クラウドを通して、条件によっては双方向に更新される
- 重複: 最初だけコピーして、その後は別物として育つ

一言で見るなら、参照は「借りている」、同期は「相互に反映される」、重複は「コピーして独立」。

この3つが混ざると、次のような見え方になりやすい。

- プロファイルを分けたのにDefault Profileまで変わる
- 拡張機能同期は切っているのにテーマが変わる
- 片方だけ同期したつもりが、別PC側も変わる

## プロファイルで分けられるもの

VS Codeのプロファイルでは、主に次のような内容を分けて持てる。

- Settings
- Extensions
- Keyboard Shortcuts
- Snippets
- Tasks
- UI State

ただし、プロファイル作成時に含めなかった種類は、そのプロファイル内に自前で持たず、Default Profile側を参照することがある。

そのため、プロファイルを作っただけで、すべてが完全に独立するとは限らない。

## プロファイルの参照

プロファイルの参照は、ローカル内の話。

たとえば New Profile がSettingsやExtensionsを自前で持っていない場合、Default Profile側を使うことがある。

```txt
Default Profile
  Settings
  Extensions

New Profile
  Settings なし
  Extensions なし
```

この状態では、New Profileで変えたつもりでも、実際にはDefault Profile側の設定や拡張機能に触っているように見えることがある。

つまり、参照は同期ではない。
ただし、Default側を借りているため、結果としてDefault側にも影響したように見える。

## 重複・コピーで作った場合

Default Profileをコピーして作る場合は、最初に同じ中身を新しいプロファイルへ持たせるイメージ。

```txt
Default Profile
  Settings
  Extensions
  Snippets

↓ コピー

PHP Profile
  Settings
  Extensions
  Snippets
```

この場合、作成直後は同じでも、作成後は別々に変わりやすい。

たとえば、PHP Profile側で拡張機能を追加しても、Default Profile側へそのまま反映されるとは限らない。

見方としては、

最初は同じものを持っているが、作成後は別管理

と考えるとよい。

## Defaultを参考にして一部を含めなかった場合

新しいプロファイルを作るときに、一部の種類を含めなかった場合は注意する。

たとえば Extensions を含めずに作ると、次のような状態になる。

```txt
Default Profile
  Settings
  Extensions

New Profile
  Settings
  Extensions  → Default Profileを参照
```

この場合、New Profileの拡張機能が完全に自前ではなく、Default Profile側を使っているように見える。

「なぜか拡張機能やテーマが共有される」ように見えるときは、この状態を疑う。

正確には、プロファイル内にその種類の中身を持っていないため、Default Profile側を借りている状態。

## あとから独立させたい場合

最初に含めなかったものがあっても、絶対に変えられないわけではない。

ただし、作成後に勝手に完全独立へ切り替わるわけでもない。

確認する場所は次。

```txt
File
Preferences
Profiles
対象プロファイル
Contents / Profile Content
```

ここで、SettingsやExtensionsがそのプロファイルに含まれているかを見る。
共有したくないものは、そのプロファイル側に含める。

## テーマが共有されるように見える理由

テーマは拡張機能だけでなく、設定にも関係する。

たとえば次の設定。

```json
"workbench.colorTheme": "テーマ名"
```

Settingsをプロファイルに含めていない場合や、設定が全プロファイル適用になっている場合、別プロファイルで変えたテーマが他のプロファイルにも影響して見えることがある。

テーマが勝手に変わるように見えたら、次を分けて確認する。

- テーマ拡張機能をどのプロファイルが持っているか
- `workbench.colorTheme` がどのプロファイルのSettingsにあるか
- その設定が全プロファイル適用になっていないか

## Settings Syncの注意

Settings Syncは、「同期あり側だけが相手に合わせる」仕組みとして見ると危ない。

基本はクラウドを介した同期として考える。
選択によっては、同期OFFだったPCの設定がクラウド側へ入り、同期ONだった別PCにも戻って反映されることがある。

```txt
PC A
↓
VS Code Sync Cloud
↓
PC B
```

同期は条件によって、`PC A -> PC B` だけではなく、`PC B -> クラウド -> PC A` も起きる。

つまり、Settings Syncは双方向同期として見る。

## 影響範囲を決める条件

プロファイルや同期の影響範囲は、次の組み合わせで変わる。

- Profiles同期がONかOFFか
- Settings同期がONかOFFか
- Extensions同期がONかOFFか
- そのプロファイルがSettingsを自前で持っているか
- そのプロファイルがExtensionsを自前で持っているか
- `Apply Setting to all Profiles` が有効か
- `Merge` / `Replace Local` / `Accept Local` / `Accept Remote` のどれを選んだか

ここを分けずに見ると、参照で起きていることと、同期で起きていることが混ざって見える。

## 同期ON時の選択肢の見方

同期OFFだったPCでSettings SyncをONにすると、次のような選択肢が出ることがある。

- Merge
- Replace Local
- Merge Manually

見方は次。

- Merge: ローカル設定とクラウド設定を混ぜる
- Replace Local: ローカル設定をクラウド側で上書きする
- Merge Manually: 1つずつ手動で混ぜる

片方のPCをクラウド側に合わせたいだけなら、基本は `Replace Local` を選ぶ。

`Merge` は、ローカル側の設定もクラウドへ混ざる可能性がある。
その結果、別PC側にも戻って反映されることがある。

## Accept Local / Accept Remote

競合時に `Accept Local` / `Accept Remote` のような選択が出る場合がある。

ここでの見方は次。

- Accept Local: ローカル側でクラウド側を上書きする
- Accept Remote: クラウド側でローカル側を上書きする

同期OFFだったPCで `Accept Local` を選ぶと、そのPCの設定がクラウド側へ入り、別PCにも反映される可能性がある。

「このPCを既存の同期環境に合わせたい」だけなら、`Accept Local` は慎重に扱う。

## 安全に分けたいとき

プロファイルを安全に分けたいなら、作成時に最低限次を含める。

- Settings
- Extensions

必要に応じて、次も含める。

- Keyboard Shortcuts
- Snippets
- Tasks
- UI State

SettingsとExtensionsを含めないと、テーマや拡張機能まわりが共有されているように見えやすい。

さらに完全に分けたい場合は、次も確認する。

- Duplicateで作る
- Settingsを自前にする
- Extensionsを自前にする
- Settings SyncのProfiles / Settings / Extensionsを切る
- `Apply Setting to all Profiles` を使わない

## 初期設定だけ持ってきたい場合

初期設定だけ持ってきて、あとからは同期で混ぜたくない場合は、Settings Syncよりプロファイルのエクスポート / インポートで考える。

```txt
元のプロファイルをエクスポート
↓
新しい側でインポート
↓
Settings SyncはONにしない
```

同期を使う場合は、どちらのPCをどちらに合わせたいのかを先に決める。

## 判断基準

プロファイルや同期で迷ったときは、次の順で見る。

1. いま触っているプロファイルはどれか
2. そのプロファイルがSettingsを自前で持っているか
3. Extensionsを自前で持っているか
4. Settings SyncでProfiles / Settings / Extensionsが同期対象になっているか
5. MergeやAccept Localで、クラウド側を書き換えようとしていないか

VS Codeの文言や画面はバージョンで変わることがある。
実際に操作するときは、画面上の説明と差分を確認してから進める。
