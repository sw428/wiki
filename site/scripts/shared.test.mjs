import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import MarkdownIt from 'markdown-it';
import { generatedRoot, siteBase, withBase, localTarget, resolveLink, headingIds } from './shared.mjs';
import { wikiMarkdown } from './markdown.mjs';
import { references } from './sync.mjs';
import { palettes, applyPalette, loadPalette, savePalette, paletteStorageKey } from '../.vitepress/theme/palettes.mjs';

const article = { source: '02_基礎/例/記事.md', route: 'html-css/basics/記事', anchors: ['基本の条件', '基本の条件-1'] };
const catalog = {
  articles: [article],
  directories: [{ source: '02_基礎/例', route: 'html-css/basics/index' }],
  assets: [{ source: 'img/図.svg', publicPath: 'wiki/img/図.svg' }]
};

test('日本語とURLエンコードを含む記事参照を解決する', () => {
  const result = resolveLink(article.source, './%E8%A8%98%E4%BA%8B.md#基本の条件', catalog);
  assert.equal(result.kind, 'article');
  assert.equal(decodeURIComponent(result.url), '/html-css/basics/記事.html#基本の条件');
});
test('内部マップへのリンクは人間向けの記事一覧へ接続する', () => {
  assert.equal(resolveLink(article.source, './00_例整理マップ.md', catalog).url, '/html-css/basics/index.html');
});
test('掲載対象外とsite自身は記事として解決しない', () => {
  assert.equal(resolveLink(article.source, '../../04_検証/記録.md', catalog).kind, 'excluded');
  assert.equal(localTarget(article.source, '../../site/README.md').excluded, true);
});
test('Wiki外へ出るパスと外部リンクを区別する', () => {
  assert.equal(localTarget(article.source, '../../../outside.md').excluded, true);
  assert.equal(resolveLink(article.source, 'https://example.com/guide', catalog).kind, 'external');
});
test('見つからない見出しは記事先頭へ接続し、検査対象として返す', () => {
  assert.equal(resolveLink(article.source, './記事.md#古い見出し', catalog).adjustedAnchor, true);
  assert.equal(resolveLink(article.source, './記事.md#古い見出し', catalog).url.includes('#'), false);
});
test('重複する見出しのIDを区別する', () => {
  const md = new MarkdownIt();
  assert.deepEqual(headingIds(md.parse('## 基本の条件\n\n## 基本の条件\n', {})), ['基本の条件', '基本の条件-1']);
});
test('ルート公開とサブパス公開を扱い、不正な公開先を拒否する', () => {
  assert.equal(withBase('/reference/index.html', '/wiki/'), '/wiki/reference/index.html');
  assert.equal(siteBase('/'), '/');
  for (const value of ['wiki', '//host/', '/../', '/wiki?x/']) assert.throws(() => siteBase(value));
});
test('コード例内のリンク・画像は取り込む参照へ数えない', () => {
  const md = new MarkdownIt();
  const tokens = md.parse('```html\n<img src="sample.jpg">\n```\n\n![図](../../img/図.svg)\n', {});
  assert.deepEqual(references(tokens), [{ type: 'image', href: '../../img/%E5%9B%B3.svg' }]);
});
test('サイト表示では参照先だけを変え、掲載対象外はリンクにしない', () => {
  const md = new MarkdownIt();
  md.use(wikiMarkdown, catalog, '/');
  const html = md.render('[記事](./記事.md) / [記録](../../04_検証/記録.md) / ![図](../../img/図.svg)', {
    path: path.join(generatedRoot, `${article.route}.md`)
  });
  assert.match(html, /href="\/html-css\/basics\//);
  assert.match(html, /<span class="wiki-unpublished"/);
  assert.doesNotMatch(html, /href="[^"\n]*04_/);
  assert.match(html, /src="\/wiki\/img\//);
});
test('教材の波括弧をVueの式にせず、コード例も保持する', () => {
  const md = new MarkdownIt();
  md.use(wikiMarkdown, catalog, '/');
  assert.match(md.render('表示 {{ value }}\n\n```js\nconst value = 7;\n```', {}), /&#123;&#123;/);
});

test('選んだ配色を明色・暗色の両方へ適用し、別の色へ切り替えられる', () => {
  const values = new Map();
  const root = { style: { setProperty: (key, value) => values.set(key, value) }, dataset: {} };
  assert.equal(applyPalette(root, 'blue'), 'blue');
  assert.equal(root.dataset.wikiPalette, 'blue');
  assert.equal(values.get('--wiki-brand-1-light'), '#2563eb');
  assert.equal(values.get('--wiki-brand-1-dark'), '#93c5fd');
  assert.equal(values.size, 8);
  applyPalette(root, 'purple');
  assert.equal(values.get('--wiki-brand-1-light'), '#7c3aed');
  assert.equal(values.get('--wiki-brand-1-dark'), '#c4b5fd');
  assert.equal(values.size, 8);
});

test('配色を保存・復元し、不正な保存値は既定色へ戻す', () => {
  const values = new Map();
  const storage = { getItem: key => values.get(key), setItem: (key, value) => values.set(key, value) };
  savePalette(storage, 'orange');
  assert.equal(values.get(paletteStorageKey), 'orange');
  assert.equal(loadPalette(storage), 'orange');
  values.set(paletteStorageKey, 'unknown');
  assert.equal(loadPalette(storage), 'teal');
});

test('保存領域が使えなくても配色の初期化を妨げない', () => {
  const denied = { getItem() { throw new Error('blocked'); }, setItem() { throw new Error('blocked'); } };
  assert.equal(loadPalette(denied), 'teal');
  assert.doesNotThrow(() => savePalette(denied, 'blue'));
  assert.equal(loadPalette(null), 'teal');
});

test('8色を選べて、廃止した茶系の保存値は既定色へ戻す', () => {
  assert.equal(palettes.length, 8);
  assert.equal(new Set(palettes.map(palette => palette.id)).size, 8);
  assert.equal(loadPalette({ getItem: () => 'amber' }), 'teal');
});
