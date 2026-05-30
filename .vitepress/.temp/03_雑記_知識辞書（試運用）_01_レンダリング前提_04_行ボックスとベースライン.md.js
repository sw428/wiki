import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"04_行ボックスとベースライン","description":"","frontmatter":{},"headers":[],"relativePath":"03_雑記/知識辞書（試運用）/01_レンダリング前提/04_行ボックスとベースライン.md","filePath":"03_雑記/知識辞書（試運用）/01_レンダリング前提/04_行ボックスとベースライン.md","lastUpdated":1779234373000}');
const _sfc_main = { name: "03_雑記/知識辞書（試運用）/01_レンダリング前提/04_行ボックスとベースライン.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="_04-行ボックスとベースライン" tabindex="-1">04_行ボックスとベースライン <a class="header-anchor" href="#_04-行ボックスとベースライン" aria-label="Permalink to &quot;04_行ボックスとベースライン&quot;">​</a></h1><h2 id="目的" tabindex="-1">目的 <a class="header-anchor" href="#目的" aria-label="Permalink to &quot;目的&quot;">​</a></h2><ul><li>画像下隙間やラベルの縦ズレを、<code>margin</code> ではなく行内整列の問題として説明できるようにする。</li></ul><h2 id="ルール" tabindex="-1">ルール <a class="header-anchor" href="#ルール" aria-label="Permalink to &quot;ルール&quot;">​</a></h2><ul><li>行内配置の基準箱は <code>line box</code>。</li><li>既定の縦揃えは baseline。</li><li><code>inline</code> 系の要素は、baseline/descender 由来の見かけの隙間が出ることがある。</li></ul><h2 id="例" tabindex="-1">例 <a class="header-anchor" href="#例" aria-label="Permalink to &quot;例&quot;">​</a></h2><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">.media-link</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> {</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">  display</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">inline-flex</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">}</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">.media-link</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}"> &gt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}"> img</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> {</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">  display</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">block</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">}</span></span></code></pre></div><ul><li><code>img</code> を <code>block</code> にしても、親が <code>inline-flex</code> なら外側inline文脈の影響が残る。</li><li>画像1枚リンクなら親ごと <code>display: block</code> へ切ると安定しやすい。</li></ul><h2 id="判断基準" tabindex="-1">判断基準 <a class="header-anchor" href="#判断基準" aria-label="Permalink to &quot;判断基準&quot;">​</a></h2><ol><li>親の <code>display</code> は inline 系か</li><li>行内基準（baseline）が残っているか</li><li><code>vertical-align</code> 調整で済むか、文脈を block に切るか</li></ol><h2 id="関連ページ" tabindex="-1">関連ページ <a class="header-anchor" href="#関連ページ" aria-label="Permalink to &quot;関連ページ&quot;">​</a></h2><ul><li><a href="./../../../01_学習本線/HTML・CSS/02_インラインと行の仕組み">02_インラインと行の仕組み</a></li><li><a href="./../../../01_学習本線/HTML・CSS/07_メディア設計（img・video・object-fit・aspect-ratio）">07_メディア設計（img・video・object-fit・aspect-ratio）</a></li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("03_雑記/知識辞書（試運用）/01_レンダリング前提/04_行ボックスとベースライン.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _04_____________ = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  _04_____________ as default
};
