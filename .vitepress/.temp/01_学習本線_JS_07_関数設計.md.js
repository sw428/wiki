import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"07_関数設計","description":"","frontmatter":{},"headers":[],"relativePath":"01_学習本線/JS/07_関数設計.md","filePath":"01_学習本線/JS/07_関数設計.md","lastUpdated":1779912344000}');
const _sfc_main = { name: "01_学習本線/JS/07_関数設計.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="_07-関数設計" tabindex="-1">07_関数設計 <a class="header-anchor" href="#_07-関数設計" aria-label="Permalink to &quot;07_関数設計&quot;">​</a></h1><h2 id="このファイルの役割" tabindex="-1">このファイルの役割 <a class="header-anchor" href="#このファイルの役割" aria-label="Permalink to &quot;このファイルの役割&quot;">​</a></h2><p>このファイルは、処理を関数単位でどう分けるかを整理する保留枠。 いまは枠組みだけ先に固定し、本文の詳細は案件ケースの蓄積後に追記する。</p><h2 id="先に固定する観点" tabindex="-1">先に固定する観点 <a class="header-anchor" href="#先に固定する観点" aria-label="Permalink to &quot;先に固定する観点&quot;">​</a></h2><ul><li>何を引数で受け取るか</li><li>何を return するか</li><li>どこに副作用を置くか</li><li>どこで早期 return するか</li></ul><h2 id="保留追記枠" tabindex="-1">保留追記枠 <a class="header-anchor" href="#保留追記枠" aria-label="Permalink to &quot;保留追記枠&quot;">​</a></h2><h3 id="処理を小さく分ける基準" tabindex="-1">処理を小さく分ける基準 <a class="header-anchor" href="#処理を小さく分ける基準" aria-label="Permalink to &quot;処理を小さく分ける基準&quot;">​</a></h3><h3 id="引数の決め方" tabindex="-1">引数の決め方 <a class="header-anchor" href="#引数の決め方" aria-label="Permalink to &quot;引数の決め方&quot;">​</a></h3><h3 id="return-の設計" tabindex="-1">return の設計 <a class="header-anchor" href="#return-の設計" aria-label="Permalink to &quot;return の設計&quot;">​</a></h3><h3 id="早期returnの使いどころ" tabindex="-1">早期returnの使いどころ <a class="header-anchor" href="#早期returnの使いどころ" aria-label="Permalink to &quot;早期returnの使いどころ&quot;">​</a></h3><h3 id="dom取得と状態更新を分ける" tabindex="-1">DOM取得と状態更新を分ける <a class="header-anchor" href="#dom取得と状態更新を分ける" aria-label="Permalink to &quot;DOM取得と状態更新を分ける&quot;">​</a></h3><h2 id="判断基準-暫定" tabindex="-1">判断基準（暫定） <a class="header-anchor" href="#判断基準-暫定" aria-label="Permalink to &quot;判断基準（暫定）&quot;">​</a></h2><ol><li>関数名を見て責務が1つに読めるか</li><li>DOM操作と計算処理が混在していないか</li><li>同じ処理を2回書く前に関数化できるか</li></ol></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("01_学習本線/JS/07_関数設計.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _07_____ = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  _07_____ as default
};
