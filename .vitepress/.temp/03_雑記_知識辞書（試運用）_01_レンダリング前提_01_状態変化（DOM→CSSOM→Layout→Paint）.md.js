import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"01_状態変化（DOM→CSSOM→Layout→Paint）","description":"","frontmatter":{},"headers":[],"relativePath":"03_雑記/知識辞書（試運用）/01_レンダリング前提/01_状態変化（DOM→CSSOM→Layout→Paint）.md","filePath":"03_雑記/知識辞書（試運用）/01_レンダリング前提/01_状態変化（DOM→CSSOM→Layout→Paint）.md","lastUpdated":1779234373000}');
const _sfc_main = { name: "03_雑記/知識辞書（試運用）/01_レンダリング前提/01_状態変化（DOM→CSSOM→Layout→Paint）.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="_01-状態変化-dom→cssom→layout→paint" tabindex="-1">01_状態変化（DOM→CSSOM→Layout→Paint） <a class="header-anchor" href="#_01-状態変化-dom→cssom→layout→paint" aria-label="Permalink to &quot;01_状態変化（DOM→CSSOM→Layout→Paint）&quot;">​</a></h1><h2 id="目的" tabindex="-1">目的 <a class="header-anchor" href="#目的" aria-label="Permalink to &quot;目的&quot;">​</a></h2><ul><li>画面崩れを「見た目の謎」ではなく、どの段階で状態が変わったかで追えるようにする。</li></ul><h2 id="ルール" tabindex="-1">ルール <a class="header-anchor" href="#ルール" aria-label="Permalink to &quot;ルール&quot;">​</a></h2><ul><li>ブラウザ描画は、ざっくり <code>DOM / CSSOM → Render Tree → Layout → Paint</code> の流れで進む。</li><li>変更は同じ重さではない。 <ul><li>テキスト変更: 行分割や高さ計算が再実行されることがある。</li><li>色変更: Layoutは変わらずPaint中心で終わることがある。</li><li>幅変更: Layoutからやり直しになりやすい。</li></ul></li></ul><h2 id="例" tabindex="-1">例 <a class="header-anchor" href="#例" aria-label="Permalink to &quot;例&quot;">​</a></h2><ul><li><code>color</code> を変えたのに位置がズレない<br> -&gt; 主に Paint の変化。</li><li><code>font-size</code> を変えたら周囲まで崩れる<br> -&gt; line box が再計算され、Layout に波及。</li></ul><h2 id="判断基準" tabindex="-1">判断基準 <a class="header-anchor" href="#判断基準" aria-label="Permalink to &quot;判断基準&quot;">​</a></h2><ol><li>何を変えたか（文字・色・サイズ・位置）</li><li>どの段階が再計算されるか（LayoutかPaintか）</li><li>影響が親要素へ波及するか</li></ol><h2 id="関連ページ" tabindex="-1">関連ページ <a class="header-anchor" href="#関連ページ" aria-label="Permalink to &quot;関連ページ&quot;">​</a></h2><ul><li><a href="./../../../01_学習本線/HTML・CSS/00_HTML・CSS整理マップ">00_HTML・CSS整理マップ</a></li><li><a href="./../../../01_学習本線/HTML・CSS/05_ブラウザ挙動とズレ">05_ブラウザ挙動とズレ</a></li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("03_雑記/知識辞書（試運用）/01_レンダリング前提/01_状態変化（DOM→CSSOM→Layout→Paint）.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _01______DOM_CSSOM_Layout_Paint_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  _01______DOM_CSSOM_Layout_Paint_ as default
};
