import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"00_知識辞書インデックス","description":"","frontmatter":{},"headers":[],"relativePath":"03_雑記/知識辞書（試運用）/00_知識辞書インデックス.md","filePath":"03_雑記/知識辞書（試運用）/00_知識辞書インデックス.md","lastUpdated":1779234373000}');
const _sfc_main = { name: "03_雑記/知識辞書（試運用）/00_知識辞書インデックス.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="_00-知識辞書インデックス" tabindex="-1">00_知識辞書インデックス <a class="header-anchor" href="#_00-知識辞書インデックス" aria-label="Permalink to &quot;00_知識辞書インデックス&quot;">​</a></h1><h2 id="目的" tabindex="-1">目的 <a class="header-anchor" href="#目的" aria-label="Permalink to &quot;目的&quot;">​</a></h2><ul><li><code>01_学習本線</code> が重く感じるときに、単語単位で前提を引ける導線を作る。</li><li>「実装前の理科」のような基礎前提（状態変化・適用境界）を先に確認できるようにする。</li></ul><h2 id="位置づけ" tabindex="-1">位置づけ <a class="header-anchor" href="#位置づけ" aria-label="Permalink to &quot;位置づけ&quot;">​</a></h2><ul><li>この辞書は <code>03_雑記</code> での<strong>試運用ハブ</strong>。</li><li>内容が安定したら、必要分だけ <code>04_資料庫</code> へ移す。</li></ul><h2 id="使い方" tabindex="-1">使い方 <a class="header-anchor" href="#使い方" aria-label="Permalink to &quot;使い方&quot;">​</a></h2><ol><li>学習ページで詰まった単語をここで引く。</li><li>用語ページの「関連ページ」から本線へ戻る。</li><li>説明が不足していたら、先に辞書へ追記してから本線へ反映する。</li></ol><h2 id="用語ユニット" tabindex="-1">用語ユニット <a class="header-anchor" href="#用語ユニット" aria-label="Permalink to &quot;用語ユニット&quot;">​</a></h2><h3 id="_01-レンダリング前提" tabindex="-1">01_レンダリング前提 <a class="header-anchor" href="#_01-レンダリング前提" aria-label="Permalink to &quot;01_レンダリング前提&quot;">​</a></h3><ul><li><a href="./01_レンダリング前提/01_状態変化（DOM→CSSOM→Layout→Paint）">01_状態変化（DOM→CSSOM→Layout→Paint）</a></li><li><a href="./01_レンダリング前提/02_テキストノードとCSS適用境界">02_テキストノードとCSS適用境界</a></li><li><a href="./01_レンダリング前提/03_インラインコンテンツとインラインボックス">03_インラインコンテンツとインラインボックス</a></li><li><a href="./01_レンダリング前提/04_行ボックスとベースライン">04_行ボックスとベースライン</a></li><li><a href="./01_レンダリング前提/05_置換要素（img・input・video）">05_置換要素（img・input・video）</a></li></ul><h3 id="_02-単語カード-1語1ページ" tabindex="-1">02_単語カード（1語1ページ） <a class="header-anchor" href="#_02-単語カード-1語1ページ" aria-label="Permalink to &quot;02_単語カード（1語1ページ）&quot;">​</a></h3><ul><li><a href="./02_単語カード/状態変化">状態変化</a></li><li><a href="./02_単語カード/テキストノード">テキストノード</a></li><li><a href="./02_単語カード/CSS適用境界">CSS適用境界</a></li><li><a href="./02_単語カード/インラインコンテンツ">インラインコンテンツ</a></li><li><a href="./02_単語カード/インラインボックス">インラインボックス</a></li><li><a href="./02_単語カード/行ボックス">行ボックス</a></li><li><a href="./02_単語カード/ベースライン">ベースライン</a></li><li><a href="./02_単語カード/置換要素">置換要素</a></li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("03_雑記/知識辞書（試運用）/00_知識辞書インデックス.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _00___________ = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  _00___________ as default
};
