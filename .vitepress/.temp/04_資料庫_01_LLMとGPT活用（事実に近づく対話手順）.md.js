import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"LLMとGPT活用（事実に近づく対話手順）","description":"","frontmatter":{},"headers":[],"relativePath":"04_資料庫/01_LLMとGPT活用（事実に近づく対話手順）.md","filePath":"04_資料庫/01_LLMとGPT活用（事実に近づく対話手順）.md","lastUpdated":1779912344000}');
const _sfc_main = { name: "04_資料庫/01_LLMとGPT活用（事実に近づく対話手順）.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="llmとgpt活用-事実に近づく対話手順" tabindex="-1">LLMとGPT活用（事実に近づく対話手順） <a class="header-anchor" href="#llmとgpt活用-事実に近づく対話手順" aria-label="Permalink to &quot;LLMとGPT活用（事実に近づく対話手順）&quot;">​</a></h1><h2 id="目的" tabindex="-1">目的 <a class="header-anchor" href="#目的" aria-label="Permalink to &quot;目的&quot;">​</a></h2><ul><li>GPTを「正解マシン」としてではなく、前提整理と検証導線づくりに使う。</li><li>会話で得た内容を、一次情報確認へつなぐ運用を固定する。</li></ul><h2 id="ルール" tabindex="-1">ルール <a class="header-anchor" href="#ルール" aria-label="Permalink to &quot;ルール&quot;">​</a></h2><ol><li>LLMは確率的生成モデルであり、最終判定機ではない</li><li>断言を鵜呑みにせず、前提条件を確認する</li><li>高リスク領域（法務/医療/制度/最新仕様）は一次情報へ当てる</li><li>GPT回答は「仮説整理」として扱い、検証手順を必ず残す</li></ol><h2 id="例" tabindex="-1">例 <a class="header-anchor" href="#例" aria-label="Permalink to &quot;例&quot;">​</a></h2><h3 id="例1-技術仕様の確認" tabindex="-1">例1: 技術仕様の確認 <a class="header-anchor" href="#例1-技術仕様の確認" aria-label="Permalink to &quot;例1: 技術仕様の確認&quot;">​</a></h3><ol><li>自分の仮説を先に書く</li><li>GPTで前提分解（成立条件/例外）を行う</li><li>公式ドキュメントで一次確認する</li><li>確認結果をGPTに戻して、実務判断へ翻訳する</li></ol><h3 id="例2-学習整理" tabindex="-1">例2: 学習整理 <a class="header-anchor" href="#例2-学習整理" aria-label="Permalink to &quot;例2: 学習整理&quot;">​</a></h3><ol><li>「どこで詰まったか」を会話で言語化する</li><li>GPTに概念の座標（何と何が違うか）を整理させる</li><li>ノートに「採用した認識」と「未確定点」を分けて残す</li></ol><h2 id="判断基準" tabindex="-1">判断基準 <a class="header-anchor" href="#判断基準" aria-label="Permalink to &quot;判断基準&quot;">​</a></h2><ol><li>これは仮説か、確認済み事実か</li><li>どの前提なら成立する説明か</li><li>どこから一次情報確認が必要か</li><li>実装・運用へ落とすときの条件は何か</li></ol><h2 id="最短運用フロー" tabindex="-1">最短運用フロー <a class="header-anchor" href="#最短運用フロー" aria-label="Permalink to &quot;最短運用フロー&quot;">​</a></h2><ol><li>仮説を出す</li><li>前提を分ける</li><li>信用度を分ける</li><li>一次情報に当てる</li><li>もう一度GPTで再整理する</li></ol><h2 id="質問と回答がずれた時の切り直し" tabindex="-1">質問と回答がずれた時の切り直し <a class="header-anchor" href="#質問と回答がずれた時の切り直し" aria-label="Permalink to &quot;質問と回答がずれた時の切り直し&quot;">​</a></h2><ul><li>症状例: <ul><li>「動画素材の検索語」を聞いたのに、<code>git restore</code> の説明が返る</li><li>フロント実装質問をしているのに、無関係な一般論へ逸れる</li></ul></li><li>切り直し手順: <ol><li>質問対象を1行で再固定する（例: 「今は動画素材の検索語だけ聞きたい」）</li><li>混在トピックを分離する（例: 動画選定 / Git復元 / リリースノート）</li><li>出力形式を先に指定する（例: 「検索語5案 + 除外語 + 判断基準」）</li><li>返答後に「質問に直接答えているか」だけを先に検証する</li></ol></li><li>切り直し用テンプレ: <ul><li><code>今は &lt;対象1つ&gt; だけ。&lt;欲しい出力形式&gt; で答えて。</code></li></ul></li><li>運用意図: <ul><li>会話品質より先に「照準一致」を固定し、誤答連鎖を止める。</li></ul></li></ul><h2 id="まとめ" tabindex="-1">まとめ <a class="header-anchor" href="#まとめ" aria-label="Permalink to &quot;まとめ&quot;">​</a></h2><ul><li>GPTの価値は「正解そのもの」より「正解に近づく道順」の可視化にある</li><li>学習でも実務でも、会話と検証の往復を前提にした方がズレにくい</li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("04_資料庫/01_LLMとGPT活用（事実に近づく対話手順）.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _01_LLM_GPT______________ = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  _01_LLM_GPT______________ as default
};
