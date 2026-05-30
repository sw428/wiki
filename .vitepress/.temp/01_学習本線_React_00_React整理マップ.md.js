import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"00_React整理マップ","description":"","frontmatter":{},"headers":[],"relativePath":"01_学習本線/React/00_React整理マップ.md","filePath":"01_学習本線/React/00_React整理マップ.md","lastUpdated":1777651583000}');
const _sfc_main = { name: "01_学習本線/React/00_React整理マップ.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="_00-react整理マップ" tabindex="-1">00_React整理マップ <a class="header-anchor" href="#_00-react整理マップ" aria-label="Permalink to &quot;00_React整理マップ&quot;">​</a></h1><h2 id="このファイルの役割" tabindex="-1">このファイルの役割 <a class="header-anchor" href="#このファイルの役割" aria-label="Permalink to &quot;このファイルの役割&quot;">​</a></h2><p>このファイルは、React学習メモの入口。 どこに何を書くか、どの順で読むかを固定する。</p><h2 id="このフォルダの見方" tabindex="-1">このフォルダの見方 <a class="header-anchor" href="#このフォルダの見方" aria-label="Permalink to &quot;このフォルダの見方&quot;">​</a></h2><p>Reactは次の順で見ると迷いにくい。</p><ul><li>土台</li><li>JSXとコンポーネント</li><li>PropsとState</li><li>イベントとフォーム</li><li>Effectとデータ取得</li></ul><h2 id="認知アプローチ-知識に至る手順" tabindex="-1">認知アプローチ（知識に至る手順） <a class="header-anchor" href="#認知アプローチ-知識に至る手順" aria-label="Permalink to &quot;認知アプローチ（知識に至る手順）&quot;">​</a></h2><ol><li>画面を部品に分ける まず「何を1コンポーネントにするか」を決める。</li><li>入力と出力を分ける Props（外から受け取る）とState（中で持つ）を先に分離する。</li><li>表示と処理を分ける JSX（表示）とイベント処理（動き）を混ぜすぎない。</li><li>副作用を後ろに置く まず静的表示を作ってから <code>useEffect</code> / データ取得を追加する。</li><li>1画面1責務で確認する 1つの画面で複数問題を同時に解かない。</li></ol><h2 id="ファイル一覧" tabindex="-1">ファイル一覧 <a class="header-anchor" href="#ファイル一覧" aria-label="Permalink to &quot;ファイル一覧&quot;">​</a></h2><ul><li><a href="./01_Reactの土台">01_Reactの土台</a></li><li><a href="./02_JSXとコンポーネント">02_JSXとコンポーネント</a></li><li><a href="./03_PropsとState">03_PropsとState</a></li><li><a href="./04_イベントとフォーム">04_イベントとフォーム</a></li><li><a href="./05_Effectとデータ取得">05_Effectとデータ取得</a></li><li><a href="./メモ(React)">メモ(React)</a></li></ul><h2 id="まず読む順" tabindex="-1">まず読む順 <a class="header-anchor" href="#まず読む順" aria-label="Permalink to &quot;まず読む順&quot;">​</a></h2><ol><li><a href="./01_Reactの土台">01_Reactの土台</a></li><li><a href="./02_JSXとコンポーネント">02_JSXとコンポーネント</a></li><li><a href="./03_PropsとState">03_PropsとState</a></li><li><a href="./04_イベントとフォーム">04_イベントとフォーム</a></li><li><a href="./05_Effectとデータ取得">05_Effectとデータ取得</a></li></ol></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("01_学習本線/React/00_React整理マップ.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _00_React_____ = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  _00_React_____ as default
};
