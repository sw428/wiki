# 06_Reactで使うTypeScript

## 目的

- React実装で最低限必要な型付けパターンを固定する。

## ルール

- Props型を先に定義する
- `useState` は必要なら型引数を明示する
- イベント型はハンドラ境界で明示する

## 要点

- Props: `type Props = { ... }`
- State: `useState<number>(0)` のように明示可能
- Event: `React.ChangeEvent<HTMLInputElement>` など

## 例

```tsx
import { useState } from "react";

type Props = {
  label: string;
};

function Counter({ label }: Props) {
  const [count, setCount] = useState<number>(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      {label}: {count}
    </button>
  );
}
```

## 判断基準

1. Props型が明示されているか
2. State初期値から推論できない型を補っているか
3. イベント引数の型が曖昧になっていないか
