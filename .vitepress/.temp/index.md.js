import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Wiki Top","description":"","frontmatter":{},"headers":[],"relativePath":"index.md","filePath":"index.md","lastUpdated":null}');
const _sfc_main = { name: "index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="wiki-top" tabindex="-1">Wiki Top <a class="header-anchor" href="#wiki-top" aria-label="Permalink to &quot;Wiki Top&quot;">​</a></h1><p>このページは、<code>C:\\Users\\user\\Desktop\\wiki</code> をそのまま公開する前提の入口です。<br> VitePress で確実に辿れるよう、主要な既存 <code>.md</code> へ直接リンクしています。</p><h2 id="システム文書" tabindex="-1">システム文書 <a class="header-anchor" href="#システム文書" aria-label="Permalink to &quot;システム文書&quot;">​</a></h2><ul><li><a href="./README">README</a></li><li><a href="./CURRENT">CURRENT</a></li><li><a href="./AGENTS">AGENTS</a></li><li><a href="./CHANGELOG">CHANGELOG</a></li></ul><h2 id="_01-学習本線-レベル1-基本概念" tabindex="-1">01_学習本線（レベル1: 基本概念） <a class="header-anchor" href="#_01-学習本線-レベル1-基本概念" aria-label="Permalink to &quot;01_学習本線（レベル1: 基本概念）&quot;">​</a></h2><ul><li><a href="./01_学習本線/HTML・CSS/00_HTML・CSS整理マップ">HTML・CSS 整理マップ</a></li><li><a href="./01_学習本線/JS/00_JS整理マップ">JS 整理マップ</a></li><li><a href="./01_学習本線/React/00_React整理マップ">React 整理マップ</a></li><li><a href="./01_学習本線/TypeScript/00_TypeScript整理マップ">TypeScript 整理マップ</a></li><li><a href="./01_学習本線/ケース検証/00_ケース検証運用（共通）">ケース検証運用（共通）</a></li></ul><h2 id="_02-案件・制作-レベル2-実務" tabindex="-1">02_案件・制作（レベル2: 実務） <a class="header-anchor" href="#_02-案件・制作-レベル2-実務" aria-label="Permalink to &quot;02_案件・制作（レベル2: 実務）&quot;">​</a></h2><ul><li><a href="./02_案件・制作/BEM運用/00_BEM運用と命名判断">BEM運用と命名判断</a></li><li><a href="./02_案件・制作/SCSS導入/00_SCSS導入と分割管理">SCSS導入と分割管理</a></li><li><a href="./02_案件・制作/ケース検証/00_案件ケース運用（共通）">案件ケース運用（共通）</a></li><li><a href="./02_案件・制作/ポートフォリオサイト/CSS設計方針">CSS設計方針</a></li></ul><h2 id="_03-雑記" tabindex="-1">03_雑記 <a class="header-anchor" href="#_03-雑記" aria-label="Permalink to &quot;03_雑記&quot;">​</a></h2><ul><li><a href="./03_雑記/知識辞書（試運用）/00_知識辞書インデックス">知識辞書インデックス（試運用）</a></li></ul><h2 id="_04-資料庫" tabindex="-1">04_資料庫 <a class="header-anchor" href="#_04-資料庫" aria-label="Permalink to &quot;04_資料庫&quot;">​</a></h2><ul><li><a href="./04_資料庫/00_実行環境とツール">実行環境とツール</a></li><li><a href="./04_資料庫/01_LLMとGPT活用（事実に近づく対話手順）">LLMとGPT活用（事実に近づく対話手順）</a></li><li>[VS Code拡張とGit運用メモ（コミット文・文字化け復元）](./04_資料庫/02_VS Code拡張とGit運用メモ（コミット文・文字化け復元）.md)</li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
