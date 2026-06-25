# 05_Effectとデータ取得

## 目的

- `useEffect` を副作用専用で使い、データ取得の基本形を固定する。

## ルール

- レンダリング中に副作用を書かない
- 副作用は `useEffect` に閉じ込める

## 要点

- `useEffect` は描画後に動く
- 依存配列で実行タイミングを制御する
- データ取得は「読み込み中 / 成功 / 失敗」を分ける

## 例

```jsx
import { useEffect, useState } from "react";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data);
      setLoading(false);
    };

    run();
  }, []);

  if (loading) return <p>Loading...</p>;
  return <pre>{JSON.stringify(users, null, 2)}</pre>;
}
```

## 判断基準

1. その処理は本当に副作用か
2. 依存配列は正しいか
3. ローディング・エラー状態が分離されているか
