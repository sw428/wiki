import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"CSS設計方針（実務編レベル2）","description":"","frontmatter":{},"headers":[],"relativePath":"02_案件・制作/ポートフォリオサイト/CSS設計方針.md","filePath":"02_案件・制作/ポートフォリオサイト/CSS設計方針.md","lastUpdated":1777994317000}');
const _sfc_main = { name: "02_案件・制作/ポートフォリオサイト/CSS設計方針.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="css設計方針-実務編レベル2" tabindex="-1">CSS設計方針（実務編レベル2） <a class="header-anchor" href="#css設計方針-実務編レベル2" aria-label="Permalink to &quot;CSS設計方針（実務編レベル2）&quot;">​</a></h1><p>このファイルの内容は、次の本体ファイルへ統合済み。</p><ul><li>[01_CSS設計方針（BEM × レイアウト分離）](./01_CSS設計方針（BEM × レイアウト分離）.md)</li></ul><p>今後の更新は上記ファイルのみで行う。</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("02_案件・制作/ポートフォリオサイト/CSS設計方針.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const CSS____ = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  CSS____ as default
};
