import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"00_案件ケース運用（共通）","description":"","frontmatter":{},"headers":[],"relativePath":"02_案件・制作/ケース検証/00_案件ケース運用（共通）.md","filePath":"02_案件・制作/ケース検証/00_案件ケース運用（共通）.md","lastUpdated":1780059290000}');
const _sfc_main = { name: "02_案件・制作/ケース検証/00_案件ケース運用（共通）.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="_00-案件ケース運用-共通" tabindex="-1">00_案件ケース運用（共通） <a class="header-anchor" href="#_00-案件ケース運用-共通" aria-label="Permalink to &quot;00_案件ケース運用（共通）&quot;">​</a></h1><h2 id="このファイルの目的" tabindex="-1">このファイルの目的 <a class="header-anchor" href="#このファイルの目的" aria-label="Permalink to &quot;このファイルの目的&quot;">​</a></h2><ul><li>案件ごとのケースバイケース判断を <code>02_案件・制作</code> 側で受けるための共通ルール</li><li>そのケースから、再利用可能な原理だけを <code>01_学習本線</code> へ戻すための基準を固定する</li></ul><h2 id="基本ルール" tabindex="-1">基本ルール <a class="header-anchor" href="#基本ルール" aria-label="Permalink to &quot;基本ルール&quot;">​</a></h2><ul><li>案件で起きた判断は、まずこの配下でケース化する</li><li>1ケース1ファイルを基本にする</li><li>同一回で議題が複数ある場合は、1ファイル内を <code>ケース1 / ケース2 / ...</code> で分割する</li><li>短い要約より、途中判断が追える説明を優先する</li><li>ケース本文には「案件固有の事情」と「再利用可能な原理」を分けて書く</li></ul><h2 id="本線へ戻す基準" tabindex="-1">本線へ戻す基準 <a class="header-anchor" href="#本線へ戻す基準" aria-label="Permalink to &quot;本線へ戻す基準&quot;">​</a></h2><ul><li><code>01_学習本線</code> へ戻すのは、案件を超えて使える原理・判断軸・確認順だけ</li><li>特定デザイン、特定クライアント事情、納期由来の妥協点は案件側に残す</li><li>本線側は日時ログとして追記せず、既存カテゴリに統合する</li></ul><h2 id="記録テンプレート" tabindex="-1">記録テンプレート <a class="header-anchor" href="#記録テンプレート" aria-label="Permalink to &quot;記録テンプレート&quot;">​</a></h2><div class="language-md vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">md</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}"># xx_ケース_（タイトル）</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}">## 1. 事実（案件文脈）</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> 何を作っていたか</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> どの制約があったか</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> 何が問題として出たか</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}">## 2. 判断プロセス</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> 候補A:</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> 候補B:</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> 採用判断:</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> 理由:</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}">## 3. 案件固有として残すもの（02側）</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> その案件でしか効かない条件</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> 素材依存の調整値</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}">## 4. 本線へ戻すもの（01側）</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> 再利用可能な原理:</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> 判断順:</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> 例外条件:</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}">## 5. 本線への反映先</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> 反映ファイル:</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> 反映内容（要約）:</span></span></code></pre></div><h2 id="既存ケース" tabindex="-1">既存ケース <a class="header-anchor" href="#既存ケース" aria-label="Permalink to &quot;既存ケース&quot;">​</a></h2><ul><li><a href="./01_ケース_Blogカード画像_レンダリング挙動">01_ケース_Blogカード画像_レンダリング挙動</a></li><li><a href="./02_ケース_関連プロジェクト画像と埋め込み動画判断">02_ケース_関連プロジェクト画像と埋め込み動画判断</a></li><li><a href="./03_ケース_HTML整形運用・崩れ原因切り分け・Pages公開判断">03_ケース_HTML整形運用・崩れ原因切り分け・Pages公開判断</a></li><li><a href="./04_ケース_回答ズレ切り直しと三角アイコン実装判断">04_ケース_回答ズレ切り直しと三角アイコン実装判断</a></li><li><a href="./05_ケース_見出し階層とfooter構造判断">05_ケース_見出し階層とfooter構造判断</a></li><li><a href="./06_ケース_Lighthouse差分とjQuery実行タイミング整理">06_ケース_Lighthouse差分とjQuery実行タイミング整理</a></li><li><a href="./07_ケース_Contact余白圧迫とCSSネスト運用判断">07_ケース_Contact余白圧迫とCSSネスト運用判断</a></li><li><a href="./08_ケース_SCSS導入とcontact-card責務分離判断">08_ケース_SCSS導入とcontact-card責務分離判断</a></li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("02_案件・制作/ケース検証/00_案件ケース運用（共通）.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _00____________ = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  _00____________ as default
};
