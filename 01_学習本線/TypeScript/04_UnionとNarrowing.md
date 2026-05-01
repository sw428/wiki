# 04_UnionとNarrowing

## 目的

- 複数型を安全に扱うための基本手順を固定する。

## ルール

- Union型は「分岐で絞る」前提で使う
- 条件分岐なしで直接使わない

## 要点

- Union: `string | number`
- Narrowing: `typeof` / `in` / 判別可能共用体で絞る

## 例

```ts
function printId(id: string | number) {
  if (typeof id === "string") {
    console.log(id.toUpperCase());
    return;
  }

  console.log(id.toFixed(0));
}
```

## 判断基準

1. Unionに対して絞り込みがあるか
2. 到達不能な分岐がないか
3. `undefined` を含む型を安全に処理しているか
