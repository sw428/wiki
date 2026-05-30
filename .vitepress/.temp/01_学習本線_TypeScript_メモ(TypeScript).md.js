import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"メモ(TypeScript)","description":"","frontmatter":{},"headers":[],"relativePath":"01_学習本線/TypeScript/メモ(TypeScript).md","filePath":"01_学習本線/TypeScript/メモ(TypeScript).md","lastUpdated":1777651583000}');
const _sfc_main = { name: "01_学習本線/TypeScript/メモ(TypeScript).md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="メモ-typescript" tabindex="-1">メモ(TypeScript) <a class="header-anchor" href="#メモ-typescript" aria-label="Permalink to &quot;メモ(TypeScript)&quot;">​</a></h1><h2 id="位置づけ" tabindex="-1">位置づけ <a class="header-anchor" href="#位置づけ" aria-label="Permalink to &quot;位置づけ&quot;">​</a></h2><ul><li>ここはTypeScriptの未整理メモ置き場。</li><li>本線化した内容は各ファイルへ移す。</li></ul><h2 id="追記ログ-2026-05-02" tabindex="-1">追記ログ（2026-05-02） <a class="header-anchor" href="#追記ログ-2026-05-02" aria-label="Permalink to &quot;追記ログ（2026-05-02）&quot;">​</a></h2><ul><li>新規作成: <ul><li><a href="./00_TypeScript整理マップ">00_TypeScript整理マップ</a></li><li><a href="./01_TypeScriptの土台">01_TypeScriptの土台</a></li><li><a href="./02_型注釈と型推論">02_型注釈と型推論</a></li><li><a href="./03_オブジェクトと関数の型">03_オブジェクトと関数の型</a></li><li><a href="./04_UnionとNarrowing">04_UnionとNarrowing</a></li><li><a href="./05_ジェネリクス基礎">05_ジェネリクス基礎</a></li><li><a href="./06_Reactで使うTypeScript">06_Reactで使うTypeScript</a></li></ul></li></ul><h2 id="メモ" tabindex="-1">メモ <a class="header-anchor" href="#メモ" aria-label="Permalink to &quot;メモ&quot;">​</a></h2><ul><li>型を増やすことより、境界（入力・出力・外部データ）を先に固定する。</li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("01_学習本線/TypeScript/メモ(TypeScript).md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ___TypeScript_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  ___TypeScript_ as default
};
