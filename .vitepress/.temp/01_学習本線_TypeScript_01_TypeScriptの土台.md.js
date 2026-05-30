import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"01_TypeScriptの土台","description":"","frontmatter":{},"headers":[],"relativePath":"01_学習本線/TypeScript/01_TypeScriptの土台.md","filePath":"01_学習本線/TypeScript/01_TypeScriptの土台.md","lastUpdated":1777651583000}');
const _sfc_main = { name: "01_学習本線/TypeScript/01_TypeScriptの土台.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="_01-typescriptの土台" tabindex="-1">01_TypeScriptの土台 <a class="header-anchor" href="#_01-typescriptの土台" aria-label="Permalink to &quot;01_TypeScriptの土台&quot;">​</a></h1><h2 id="目的" tabindex="-1">目的 <a class="header-anchor" href="#目的" aria-label="Permalink to &quot;目的&quot;">​</a></h2><ul><li>TypeScriptを「型で事故を減らす道具」として捉える。</li></ul><h2 id="ルール" tabindex="-1">ルール <a class="header-anchor" href="#ルール" aria-label="Permalink to &quot;ルール&quot;">​</a></h2><ul><li>まず値の形を言語化する</li><li>実装より先に型の境界を決める</li></ul><h2 id="要点" tabindex="-1">要点 <a class="header-anchor" href="#要点" aria-label="Permalink to &quot;要点&quot;">​</a></h2><ul><li>TypeScriptはJavaScriptに型システムを足したもの</li><li>型は実行前のチェックに使う</li><li>型エラーはバグの入口を早く見つけるための情報</li></ul><h2 id="例" tabindex="-1">例 <a class="header-anchor" href="#例" aria-label="Permalink to &quot;例&quot;">​</a></h2><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">const</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> name</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">:</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> string</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}"> =</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> &quot;Taro&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">const</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> age</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">:</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> number</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}"> =</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> 20</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">;</span></span></code></pre></div><h2 id="判断基準" tabindex="-1">判断基準 <a class="header-anchor" href="#判断基準" aria-label="Permalink to &quot;判断基準&quot;">​</a></h2><ol><li>その値は何型か</li><li>その値は必須か任意か</li><li>実行前に検出したい事故は何か</li></ol></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("01_学習本線/TypeScript/01_TypeScriptの土台.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _01_TypeScript___ = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  _01_TypeScript___ as default
};
