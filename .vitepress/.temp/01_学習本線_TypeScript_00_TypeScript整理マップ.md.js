import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"00_TypeScript整理マップ","description":"","frontmatter":{},"headers":[],"relativePath":"01_学習本線/TypeScript/00_TypeScript整理マップ.md","filePath":"01_学習本線/TypeScript/00_TypeScript整理マップ.md","lastUpdated":1777651583000}');
const _sfc_main = { name: "01_学習本線/TypeScript/00_TypeScript整理マップ.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="_00-typescript整理マップ" tabindex="-1">00_TypeScript整理マップ <a class="header-anchor" href="#_00-typescript整理マップ" aria-label="Permalink to &quot;00_TypeScript整理マップ&quot;">​</a></h1><h2 id="このファイルの役割" tabindex="-1">このファイルの役割 <a class="header-anchor" href="#このファイルの役割" aria-label="Permalink to &quot;このファイルの役割&quot;">​</a></h2><p>このファイルは、TypeScript学習メモの入口。 どの順で読むかと、どこに何を書くかを固定する。</p><h2 id="このフォルダの見方" tabindex="-1">このフォルダの見方 <a class="header-anchor" href="#このフォルダの見方" aria-label="Permalink to &quot;このフォルダの見方&quot;">​</a></h2><p>TypeScriptは次の順で読む。</p><ul><li>土台</li><li>型注釈と型推論</li><li>オブジェクトと関数の型</li><li>UnionとNarrowing</li><li>ジェネリクス</li><li>Reactでの型付け</li></ul><h2 id="認知アプローチ-知識に至る手順" tabindex="-1">認知アプローチ（知識に至る手順） <a class="header-anchor" href="#認知アプローチ-知識に至る手順" aria-label="Permalink to &quot;認知アプローチ（知識に至る手順）&quot;">​</a></h2><ol><li>値の形を先に決める 実装前に「このデータは何型か」を宣言する。</li><li>変化点を限定する どこで <code>undefined</code> / <code>null</code> が入りうるかを先に決める。</li><li>エラー文を翻訳する 「何が代入できないか」「どのプロパティが不足か」に分解して読む。</li><li>実装を型に寄せる <code>any</code> で逃げる前に型設計を見直す。</li><li>React側と接続する Props / State / Event で型が流れる経路を固定する。</li></ol><h2 id="ファイル一覧" tabindex="-1">ファイル一覧 <a class="header-anchor" href="#ファイル一覧" aria-label="Permalink to &quot;ファイル一覧&quot;">​</a></h2><ul><li><a href="./01_TypeScriptの土台">01_TypeScriptの土台</a></li><li><a href="./02_型注釈と型推論">02_型注釈と型推論</a></li><li><a href="./03_オブジェクトと関数の型">03_オブジェクトと関数の型</a></li><li><a href="./04_UnionとNarrowing">04_UnionとNarrowing</a></li><li><a href="./05_ジェネリクス基礎">05_ジェネリクス基礎</a></li><li><a href="./06_Reactで使うTypeScript">06_Reactで使うTypeScript</a></li><li><a href="./メモ(TypeScript)">メモ(TypeScript)</a></li></ul><h2 id="まず読む順" tabindex="-1">まず読む順 <a class="header-anchor" href="#まず読む順" aria-label="Permalink to &quot;まず読む順&quot;">​</a></h2><ol><li><a href="./01_TypeScriptの土台">01_TypeScriptの土台</a></li><li><a href="./02_型注釈と型推論">02_型注釈と型推論</a></li><li><a href="./03_オブジェクトと関数の型">03_オブジェクトと関数の型</a></li><li><a href="./04_UnionとNarrowing">04_UnionとNarrowing</a></li><li><a href="./05_ジェネリクス基礎">05_ジェネリクス基礎</a></li><li><a href="./06_Reactで使うTypeScript">06_Reactで使うTypeScript</a></li></ol></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("01_学習本線/TypeScript/00_TypeScript整理マップ.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _00_TypeScript_____ = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  _00_TypeScript_____ as default
};
