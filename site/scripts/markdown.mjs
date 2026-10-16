import path from 'node:path';
import { generatedRoot, slash, resolveLink, withBase } from './shared.mjs';

export function wikiMarkdown(md, catalog, base) {
  const byRoute = new Map(catalog.articles.map(article => [article.route, article]));
  // 教材中の {{ ... }} をVueの式として実行せず、文章として表示する。
  const text = md.renderer.rules.text;
  md.renderer.rules.text = (...args) => text(...args).replace(/\{/g, '&#123;').replace(/\}/g, '&#125;');

  md.core.ruler.after('inline', 'wiki-references', state => {
    if (!state.env.path) return;
    const route = slash(path.relative(generatedRoot, state.env.path)).replace(/\.md$/, '');
    const article = byRoute.get(route);
    if (!article) return;
    const visit = tokens => {
      const links = [];
      for (const token of tokens) {
        if (token.type === 'link_open') {
          const result = resolveLink(article.source, token.attrGet('href'), catalog);
          const excluded = result.kind === 'excluded';
          links.push(excluded);
          if (excluded) {
            token.tag = 'span';
            token.attrs = [['class', 'wiki-unpublished'], ['title', 'この参照先はサイト未掲載です']];
            // VitePressのリンク用rendererへ渡さず、spanとして描画する。
            token.type = 'wiki_span_open';
          } else if (result.kind !== 'external') {
            token.attrSet('href', result.url);
          }
        } else if (token.type === 'link_close' && links.pop()) {
          token.tag = 'span';
          token.type = 'wiki_span_close';
        } else if (token.type === 'image') {
          const result = resolveLink(article.source, token.attrGet('src'), catalog);
          if (result.kind === 'asset') token.attrSet('src', result.url);
          else if (result.kind !== 'external') throw new Error(`画像を解決できません: ${article.source}`);
        } else if (token.type === 'html_inline' || token.type === 'html_block') {
          token.content = token.content.replace(/(<img\b[^>]*?\bsrc\s*=\s*)(["'])([^"']+)\2/gi, (whole, prefix, quote, href) => {
            const result = resolveLink(article.source, href, catalog);
            return result.kind === 'asset' ? `${prefix}${quote}${withBase(result.url, base)}${quote}` : whole;
          });
        }
        if (token.children) visit(token.children);
      }
    };
    visit(state.tokens);
  });
}
