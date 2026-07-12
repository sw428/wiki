# HTML基本スニペット

## 目的

HTML文書の土台と、PC/SPで画像を切り替える`picture`要素を同じ表記規則で出す。

## 採用ルール

| 対象 | 採用形 |
|---|---|
| 画像フォルダ | `./assets/images/` |
| PCファーストの切り替え | `max-width: 767px` |
| SPファーストの切り替え | `min-width: 768px` |
| インデント | 半角スペース2つ |
| `picture`のクラス | `__media` |
| `img`のクラス | `__image` |
| Tab移動 | `source`画像 → `img`画像 |

`picture`では`media`、クラス、`alt`、`width`、`height`をスニペット展開時に固定し、画像パス2か所だけをTabで選択する。

## スニペット正本

```json
{
  "HTML template": {
    "prefix": "!!",
    "body": [
      "<!DOCTYPE html>",
      "<html lang=\"ja\">",
      "<head>",
      "  <meta charset=\"UTF-8\">",
      "  <meta name=\"description\" content=\"\">",
      "  <title>${1:Page Title}</title>",
      "  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">",
      "  <link rel=\"icon\" href=\"./assets/images/favicon.ico\">",
      "  <link rel=\"stylesheet\" href=\"https://unpkg.com/ress/dist/ress.min.css\">",
      "",
      "  <link rel=\"stylesheet\" href=\"./css/style.css\">",
      "</head>",
      "",
      "<body>",
      "  <header class=\"header\">",
      "  </header>",
      "",
      "  <main class=\"main\">",
      "    $0",
      "  </main>",
      "",
      "  <footer class=\"footer\">",
      "  </footer>",
      "</body>",
      "</html>"
    ],
    "description": "Basic HTML template"
  },
  "Picture PC First": {
    "prefix": "picture-pc",
    "body": [
      "<picture class=\"__media\">",
      "  <source",
      "    media=\"(max-width: 767px)\"",
      "    srcset=\"${1:./assets/images/image-sp.jpg}\"",
      "  >",
      "  <img",
      "    class=\"__image\"",
      "    src=\"${2:./assets/images/image-pc.jpg}\"",
      "    alt=\"\"",
      "    width=\"\"",
      "    height=\"\"",
      "  >",
      "</picture>"
    ],
    "description": "PC画像をimgに置き、SP画像をsourceで切り替えるpicture要素"
  },
  "Picture SP First": {
    "prefix": "picture-sp",
    "body": [
      "<picture class=\"__media\">",
      "  <source",
      "    media=\"(min-width: 768px)\"",
      "    srcset=\"${1:./assets/images/image-pc.jpg}\"",
      "  >",
      "  <img",
      "    class=\"__image\"",
      "    src=\"${2:./assets/images/image-sp.jpg}\"",
      "    alt=\"\"",
      "    width=\"\"",
      "    height=\"\"",
      "  >",
      "</picture>"
    ],
    "description": "SP画像をimgに置き、PC画像をsourceで切り替えるpicture要素"
  },
  "Link CSS": {
    "prefix": "css",
    "body": [
      "<link rel=\"stylesheet\" href=\"${1:./css/style.css}\">"
    ],
    "description": "CSSファイルを読み込むlink要素"
  }
}
```

## `picture`の読み方

### PCファースト

- 通常時は`img`のPC画像を表示する
- 画面幅が767px以下になると、`source`のSP画像へ切り替える

### SPファースト

- 通常時は`img`のSP画像を表示する
- 画面幅が768px以上になると、`source`のPC画像へ切り替える

`source`は条件に一致したときの候補で、`img`は既定画像であると同時に、`picture`非対応時のフォールバックと画像の代替テキストを受け持つ。

## 使用時に必ず確認する箇所

スニペットで固定していても、実装時には次を確認する。

1. 案件の画像フォルダが`./assets/images/`か
2. 案件のブレークポイントが767px / 768pxか
3. `__media`と`__image`へBEMのBlock名を補うか
4. 内容画像なら`alt`を書くか、装飾画像なら空のままでよいか
5. 実画像に合う`width`と`height`を入れたか
6. PC/SPで本当に別画像が必要か

## 関連ノート

- [メディア設計](../10_メディア設計（img・video・object-fit・aspect-ratio）.md)
- [画像と背景](../06_画像と背景.md)
