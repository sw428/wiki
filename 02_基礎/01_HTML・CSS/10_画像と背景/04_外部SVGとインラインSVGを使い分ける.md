# 04_外部SVGとインラインSVGを使い分ける

デザインツールから書き出したSVGは、まず自己完結した外部画像として使えるかを確認する。HTML側からSVG内部の要素を操作する必要がある場合だけ、インラインSVGを検討する。

## 外部SVGをimgで読む

```html
<img
  src="./img/catch-copy.svg"
  alt="画像が伝える内容"
  width="320"
  height="80"
>
```

SVG内部に多数の `path` があっても、個数だけを理由にHTMLへ転記しない。書き出されたSVG文書には、path以外にも次が含まれ得る。

- 外側の `svg` と `viewBox`
- `defs` 内のグラデーションや再利用定義
- `clipPath`、`mask`、`filter`
- `g` のグループ化や座標変換
- `id` を使った参照関係

pathだけを抜くと、座標系、表示範囲、塗り、マスク、参照関係が失われる可能性がある。内部を操作しない固定素材なら、SVG文書全体を外部ファイルとして保つ方が、HTMLとの境界を維持しやすい。

## HTML側から内部を操作するならインラインSVG

`<img src="icon.svg">` で読むSVGは別の画像リソースとして処理される。HTML側のセレクタから、そのSVG文書内の個々のpathを直接選んで変更する用途には向かない。

次の必要がある場合は、HTML内へ `svg` 要素を置く方法を検討する。

- 内部のpathごとに色や状態を変える
- SVG内部の要素をJavaScriptで操作する
- HTML側のクラスと同じDOM内で詳細に制御する

インライン化するときも、pathだけでなく、必要な `svg`、`viewBox`、`defs`、参照関係をまとめて扱う。インライン化はHTML量、再利用方法、キャッシュ、保守対象も変えるため、「色を変えたい」だけなら[mask-image](./02_mask-imageで見える範囲を作る.md#単色アイコンの形を使う)で足りるかも比較する。

## SVGファイルを分ける単位

パスの個数ではなく、位置・大きさ・表示条件・更新を一緒に変えるかで決める。

- 常に同じ位置関係で表示し、一体として拡大縮小する固定図版: 一つのSVGが候補
- ロゴ、キャッチコピー、バッジなどを別々に移動・非表示・差し替えする: 別SVGが候補
- レスポンシブ対応で一部だけ位置や大きさを変える: その制御単位で分割を検討
- 複数ページで同じアイコンを再利用する: 単独ファイル、sprite、maskなど再利用方法を比較

案件から支給されたSVGは、内部のライセンス・命名・参照関係も含む素材として扱う。不要な最適化やpathの結合は、表示と権利・納品条件を確認してから行う。

## 確認順

1. 外部画像のままで表示できるか。
2. HTML側から内部要素へ触る必要が本当にあるか。
3. 色変更だけならmaskで代替できるか。
4. 分割後に独立して位置・大きさ・表示条件を変えるか。
5. `viewBox`、defs、ID参照を壊していないか。
6. `img` として使う場合のaltと寸法属性が適切か。

## 仕様確認先

- [SVG 2: Document Structure](https://svgwg.org/svg2-draft/struct.html)
- [SVG 2: Coordinate Systems and viewBox](https://svgwg.org/svg2-draft/coords.html#ViewBoxAttribute)
- [SVG 2: Processing modes for sub-resource documents](https://svgwg.org/svg2-draft/conform.html#processing-modes)

