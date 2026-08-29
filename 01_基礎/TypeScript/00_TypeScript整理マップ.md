# 00_TypeScript整理マップ

## このファイルの役割

このファイルは、TypeScript学習メモの入口。
どの順で読むかと、どこに何を書くかを固定する。

## このフォルダの見方

TypeScriptは次の順で読む。

- 土台
- 型注釈と型推論
- オブジェクトと関数の型
- UnionとNarrowing
- ジェネリクス
- Reactでの型付け

## 認知アプローチ（知識に至る手順）

1. 値の形を先に決める
   実装前に「このデータは何型か」を宣言する。
2. 変化点を限定する
   どこで `undefined` / `null` が入りうるかを先に決める。
3. エラー文を翻訳する
   「何が代入できないか」「どのプロパティが不足か」に分解して読む。
4. 実装を型に寄せる
   `any` で逃げる前に型設計を見直す。
5. React側と接続する
   Props / State / Event で型が流れる経路を固定する。

## ファイル一覧

- [01_TypeScriptの土台](./01_TypeScriptの土台.md)
- [02_型注釈と型推論](./02_型注釈と型推論.md)
- [03_オブジェクトと関数の型](./03_オブジェクトと関数の型.md)
- [04_UnionとNarrowing](./04_UnionとNarrowing.md)
- [05_ジェネリクス基礎](./05_ジェネリクス基礎.md)
- [06_Reactで使うTypeScript](./06_Reactで使うTypeScript.md)
- [メモ(TypeScript)](./メモ(TypeScript).md)

## まず読む順

1. [01_TypeScriptの土台](./01_TypeScriptの土台.md)
2. [02_型注釈と型推論](./02_型注釈と型推論.md)
3. [03_オブジェクトと関数の型](./03_オブジェクトと関数の型.md)
4. [04_UnionとNarrowing](./04_UnionとNarrowing.md)
5. [05_ジェネリクス基礎](./05_ジェネリクス基礎.md)
6. [06_Reactで使うTypeScript](./06_Reactで使うTypeScript.md)
