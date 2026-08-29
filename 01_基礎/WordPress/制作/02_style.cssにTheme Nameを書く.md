# 02_style.cssにTheme Nameを書く

## 目的

WordPressがテーマとして認識できるように、`style.css` にテーマ情報を書く。

## 最初に見る結論

`style.css` の先頭に `Theme Name` がないと、管理画面でテーマとして扱えない。

## 最小形

```css
/*
Theme Name: Sample Theme
*/
```

## 確認順

1. テーマフォルダ直下に `style.css` があるか
2. `style.css` の先頭にコメントがあるか
3. `Theme Name` が書かれているか
4. 管理画面の「外観」でテーマが見えるか

## 自分の頭に残すこと

- `style.css` はCSSを書く場所であると同時に、テーマ情報を書く場所。
- まず `Theme Name` を書く。
