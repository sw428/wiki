# 01_ボックスとdisplay

## 目的

- 「背景色がどこに付くか」「なぜその大きさになるか」を、`display` とボックス生成の観点で説明できる状態にする。

## ルール

- 画面に出る対象は、`DOM` と `CSSOM` を合成した結果（レンダーツリー）で決まる。
- `display` は「どの種類のボックスを生成するか」に関与する。
- `box-sizing` は「生成されたボックスのサイズ計算ルール」を決める。
- つまり、`display` と `box-sizing` は役割が違う。

### ボックスとボックスモデルの区別

| 分類 | 何を決めるか | 主な関連プロパティ |
|---|---|---|
| 表示ボックス | 描画される領域そのもの | `display`, `line-height`, `width`, `height` |
| ボックスモデル | `width`/`height` の解釈範囲 | `box-sizing`, `padding`, `border`, `margin` |

## 例

```html
<div class="box box--a">A</div>
<span class="box box--b">B</span>
```

```css
.box {
  background: #dff2ff;
}

.box--a {
  display: block;
  width: 100%;
}

.box--b {
  display: inline;
}
```

- `block`: 既定では親幅方向に広がりやすい。
- `inline`: 横幅は内容依存。`width`/`height` は通常効かない（置換要素を除く）。

## 初期認識メモ（確度）

- 確度: 高
  - 「`display` の設定が先にあり、描画結果としてボックスが現れる」という時系列の見方。
  - 「`display` と `box-sizing` は別問題」という切り分け。
- 確度: 中
  - 「コンテンツがなければ見える領域がほぼゼロに近づく」という観察（`height`/`padding` 指定で変わる）。
- 確度: 要修正
  - 「ブロック要素は自分だけでは領域を持たない」は不正確。`block` は内容がなくても、指定された `width`/`padding`/`border` で領域を持てる。

## 判断基準

- バグ時は次の順で切る。
1. そもそも表示対象か（`display: none` など）
2. どのボックス種別か（`block`/`inline`/`inline-block`）
3. サイズ計算の問題か（`box-sizing`, `padding`, `border`）

