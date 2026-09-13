# HTML基本スニペット

## 目的

HTML文書の土台と、PC/SPで画像を切り替える`picture`要素を同じ表記規則で出す。

## 展開した型から学ぶ順序

文書の土台が必要なら `!!`、画像の切り替えが必要なら `picture-pc` / `picture-sp` の該当部分から使う。JSON全体の書き方や、まだ使わないスニペットまで覚えてから使い始める必要はない。

1. 展開したHTMLを読む。文書全体の役割が曖昧なら [HTML文書の骨格](../02_HTML文書の骨格.md#最低限の基本形)、画像の候補を分けたいなら、このページの [`picture`の読み方](#pictureの読み方)へ戻る。
2. Tabで選ぶ箇所と、展開後に自分で確認する箇所を分ける。画像パスを選び終えても、[使用時に必ず確認する箇所](#使用時に必ず確認する箇所)まで確認する。
3. 採用したHTMLをブラウザで確認する。画像ではPC/SPの候補と表示を見比べ、意図と違えば [pictureとsrcset](../11_メディア設計/03_pictureとsrcsetで画像候補を切り替える.md)へ戻る。

次へ進む目安は、見本やAIを使いながら、今回使う型のどこを案件に合わせて変えるかを判断できること。型を何も見ずに手入力できるかではなく、展開後のHTMLを確認できる状態を足場にする。

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

- [メディア設計](../11_メディア設計/00_メディア設計整理マップ.md)
- [imgとbackground-imageを選ぶ](../10_画像と背景/01_imgとbackground-imageを選ぶ.md)
