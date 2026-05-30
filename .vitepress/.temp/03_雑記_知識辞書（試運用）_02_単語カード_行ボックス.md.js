import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"行ボックス","description":"","frontmatter":{},"headers":[],"relativePath":"03_雑記/知識辞書（試運用）/02_単語カード/行ボックス.md","filePath":"03_雑記/知識辞書（試運用）/02_単語カード/行ボックス.md","lastUpdated":1779234373000}');
const _sfc_main = { name: "03_雑記/知識辞書（試運用）/02_単語カード/行ボックス.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="行ボックス" tabindex="-1">行ボックス <a class="header-anchor" href="#行ボックス" aria-label="Permalink to &quot;行ボックス&quot;">​</a></h1><h2 id="定義" tabindex="-1">定義 <a class="header-anchor" href="#定義" aria-label="Permalink to &quot;定義&quot;">​</a></h2><ul><li>行内レイアウトで1行分を構成する配置の箱。<code>line-height</code> と強く関係する。</li></ul><h2 id="ここを見る理由" tabindex="-1">ここを見る理由 <a class="header-anchor" href="#ここを見る理由" aria-label="Permalink to &quot;ここを見る理由&quot;">​</a></h2><ul><li>行高・上下余白・行内ズレの原因特定を速くするため。</li></ul><h2 id="関連ノート" tabindex="-1">関連ノート <a class="header-anchor" href="#関連ノート" aria-label="Permalink to &quot;関連ノート&quot;">​</a></h2><ul><li><a href="./../01_レンダリング前提/04_行ボックスとベースライン">04_行ボックスとベースライン</a></li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("03_雑記/知識辞書（試運用）/02_単語カード/行ボックス.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _____ = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  _____ as default
};
