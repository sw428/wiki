# 03_PropsとState

## 目的

- PropsとStateの責務を分けて実装できるようにする。

## ルール

- Props: 外から受け取る値（読み取り中心）
- State: 内部で変わる値（更新対象）

## 要点

- Propsは親から子へ流れる
- Stateは `useState` で管理する
- 更新は「新しい値をセットする」形で行う

## 例

```jsx
import { useState } from "react";

function Counter({ label }) {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      {label}: {count}
    </button>
  );
}
```

## 判断基準

1. その値は親から渡すべきか
2. その値はこの部品の中でだけ使うか
3. 状態を増やしすぎていないか
