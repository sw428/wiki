import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"置換要素","description":"","frontmatter":{},"headers":[],"relativePath":"03_雑記/知識辞書（試運用）/02_単語カード/置換要素.md","filePath":"03_雑記/知識辞書（試運用）/02_単語カード/置換要素.md","lastUpdated":1779234373000}');
const _sfc_main = { name: "03_雑記/知識辞書（試運用）/02_単語カード/置換要素.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="置換要素" tabindex="-1">置換要素 <a class="header-anchor" href="#置換要素" aria-label="Permalink to &quot;置換要素&quot;">​</a></h1><h2 id="定義" tabindex="-1">定義 <a class="header-anchor" href="#定義" aria-label="Permalink to &quot;定義&quot;">​</a></h2><ul><li><code>img</code> / <code>input</code> / <code>video</code> など、内容表示が外部資源や内部仕様で決まる要素。</li></ul><h2 id="ここを見る理由" tabindex="-1">ここを見る理由 <a class="header-anchor" href="#ここを見る理由" aria-label="Permalink to &quot;ここを見る理由&quot;">​</a></h2><ul><li><code>inline</code> でも <code>width/height</code> が効く例外を説明しやすくするため。</li></ul><h2 id="関連ノート" tabindex="-1">関連ノート <a class="header-anchor" href="#関連ノート" aria-label="Permalink to &quot;関連ノート&quot;">​</a></h2><ul><li><a href="./../01_レンダリング前提/05_置換要素（img・input・video）">05_置換要素（img・input・video）</a></li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("03_雑記/知識辞書（試運用）/02_単語カード/置換要素.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ____ = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  ____ as default
};
