import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"09_モジュール分割","description":"","frontmatter":{},"headers":[],"relativePath":"01_学習本線/JS/09_モジュール分割.md","filePath":"01_学習本線/JS/09_モジュール分割.md","lastUpdated":1779912344000}');
const _sfc_main = { name: "01_学習本線/JS/09_モジュール分割.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="_09-モジュール分割" tabindex="-1">09_モジュール分割 <a class="header-anchor" href="#_09-モジュール分割" aria-label="Permalink to &quot;09_モジュール分割&quot;">​</a></h1><h2 id="このファイルの役割" tabindex="-1">このファイルの役割 <a class="header-anchor" href="#このファイルの役割" aria-label="Permalink to &quot;このファイルの役割&quot;">​</a></h2><p>このファイルは、JSファイルを責務ごとに分割するための保留枠。 いまは構成のみ先に置き、詳細は実装量が増えた段階で追記する。</p><h2 id="先に固定する観点" tabindex="-1">先に固定する観点 <a class="header-anchor" href="#先に固定する観点" aria-label="Permalink to &quot;先に固定する観点&quot;">​</a></h2><ul><li><code>import</code> / <code>export</code> をどう使い分けるか</li><li><code>default export</code> と <code>named export</code> の使い分け</li><li><code>main.js</code> でどこまで集約するか</li><li>UI単位でどこまで分割するか</li></ul><h2 id="保留追記枠" tabindex="-1">保留追記枠 <a class="header-anchor" href="#保留追記枠" aria-label="Permalink to &quot;保留追記枠&quot;">​</a></h2><h3 id="import-export-の基本形" tabindex="-1">import / export の基本形 <a class="header-anchor" href="#import-export-の基本形" aria-label="Permalink to &quot;import / export の基本形&quot;">​</a></h3><h3 id="default-export-と-named-export" tabindex="-1">default export と named export <a class="header-anchor" href="#default-export-と-named-export" aria-label="Permalink to &quot;default export と named export&quot;">​</a></h3><h3 id="main-js-からの呼び出し設計" tabindex="-1">main.js からの呼び出し設計 <a class="header-anchor" href="#main-js-からの呼び出し設計" aria-label="Permalink to &quot;main.js からの呼び出し設計&quot;">​</a></h3><h3 id="menu-js-accordion-js-form-js-への分割基準" tabindex="-1">menu.js / accordion.js / form.js への分割基準 <a class="header-anchor" href="#menu-js-accordion-js-form-js-への分割基準" aria-label="Permalink to &quot;menu.js / accordion.js / form.js への分割基準&quot;">​</a></h3><h2 id="判断基準-暫定" tabindex="-1">判断基準（暫定） <a class="header-anchor" href="#判断基準-暫定" aria-label="Permalink to &quot;判断基準（暫定）&quot;">​</a></h2><ol><li>1ファイルに複数UI責務が混在していないか</li><li>変更時に影響範囲を追える分割になっているか</li><li>分割のための分割になっていないか</li></ol></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("01_学習本線/JS/09_モジュール分割.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _09________ = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  _09________ as default
};
