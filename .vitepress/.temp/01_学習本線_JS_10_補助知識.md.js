import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"10_補助知識","description":"","frontmatter":{},"headers":[],"relativePath":"01_学習本線/JS/10_補助知識.md","filePath":"01_学習本線/JS/10_補助知識.md","lastUpdated":1779912344000}');
const _sfc_main = { name: "01_学習本線/JS/10_補助知識.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="_10-補助知識" tabindex="-1">10_補助知識 <a class="header-anchor" href="#_10-補助知識" aria-label="Permalink to &quot;10_補助知識&quot;">​</a></h1><h2 id="このファイルの役割" tabindex="-1">このファイルの役割 <a class="header-anchor" href="#このファイルの役割" aria-label="Permalink to &quot;このファイルの役割&quot;">​</a></h2><p>このファイルは、今すぐ主軸にしないが実装で必要になる知識を一時集約する保留枠。 優先度は <code>02〜05 / 07 / 09</code> より後ろに置き、必要になった時に個別追記する。</p><h2 id="いったんここにまとめる項目" tabindex="-1">いったんここにまとめる項目 <a class="header-anchor" href="#いったんここにまとめる項目" aria-label="Permalink to &quot;いったんここにまとめる項目&quot;">​</a></h2><ul><li><code>this</code> / <code>bind</code> / <code>call</code> / <code>apply</code></li><li>クラス構文</li><li><code>localStorage</code></li><li>日付処理</li><li>正規表現</li></ul><h2 id="保留追記枠" tabindex="-1">保留追記枠 <a class="header-anchor" href="#保留追記枠" aria-label="Permalink to &quot;保留追記枠&quot;">​</a></h2><h3 id="this-bind-call-apply" tabindex="-1">this / bind / call / apply <a class="header-anchor" href="#this-bind-call-apply" aria-label="Permalink to &quot;this / bind / call / apply&quot;">​</a></h3><h3 id="クラス構文" tabindex="-1">クラス構文 <a class="header-anchor" href="#クラス構文" aria-label="Permalink to &quot;クラス構文&quot;">​</a></h3><h3 id="localstorage" tabindex="-1">localStorage <a class="header-anchor" href="#localstorage" aria-label="Permalink to &quot;localStorage&quot;">​</a></h3><h3 id="日付処理" tabindex="-1">日付処理 <a class="header-anchor" href="#日付処理" aria-label="Permalink to &quot;日付処理&quot;">​</a></h3><h3 id="正規表現" tabindex="-1">正規表現 <a class="header-anchor" href="#正規表現" aria-label="Permalink to &quot;正規表現&quot;">​</a></h3><h2 id="判断基準-暫定" tabindex="-1">判断基準（暫定） <a class="header-anchor" href="#判断基準-暫定" aria-label="Permalink to &quot;判断基準（暫定）&quot;">​</a></h2><ol><li>現在の案件で直接必要か</li><li>既存の関数設計やモジュール分割で代替できないか</li><li>導入時に副作用（可読性低下・過剰抽象化）が増えないか</li></ol></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("01_学習本線/JS/10_補助知識.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _10_____ = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  _10_____ as default
};
