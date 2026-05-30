import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"インラインボックス","description":"","frontmatter":{},"headers":[],"relativePath":"03_雑記/知識辞書（試運用）/02_単語カード/インラインボックス.md","filePath":"03_雑記/知識辞書（試運用）/02_単語カード/インラインボックス.md","lastUpdated":1779234373000}');
const _sfc_main = { name: "03_雑記/知識辞書（試運用）/02_単語カード/インラインボックス.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="インラインボックス" tabindex="-1">インラインボックス <a class="header-anchor" href="#インラインボックス" aria-label="Permalink to &quot;インラインボックス&quot;">​</a></h1><h2 id="定義" tabindex="-1">定義 <a class="header-anchor" href="#定義" aria-label="Permalink to &quot;定義&quot;">​</a></h2><ul><li><code>display: inline</code> 系の要素が行内で生成するボックス。</li></ul><h2 id="ここを見る理由" tabindex="-1">ここを見る理由 <a class="header-anchor" href="#ここを見る理由" aria-label="Permalink to &quot;ここを見る理由&quot;">​</a></h2><ul><li><code>inline-block</code> / <code>inline-flex</code> の外側文脈を理解し、baseline由来のズレを見抜くため。</li></ul><h2 id="関連ノート" tabindex="-1">関連ノート <a class="header-anchor" href="#関連ノート" aria-label="Permalink to &quot;関連ノート&quot;">​</a></h2><ul><li><a href="./../01_レンダリング前提/03_インラインコンテンツとインラインボックス">03_インラインコンテンツとインラインボックス</a></li><li><a href="./../01_レンダリング前提/04_行ボックスとベースライン">04_行ボックスとベースライン</a></li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("03_雑記/知識辞書（試運用）/02_単語カード/インラインボックス.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _________ = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  _________ as default
};
