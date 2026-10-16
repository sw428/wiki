import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';
import { siteRoot, wikiRoot, generatedRoot, metadataRoot, hash, requireInside, inside, tokenizeSearch } from './shared.mjs';

const decodeHtml = text => text.replace(/&(?:amp|quot|apos|lt|gt);|&#(?:x[\da-f]+|\d+);/gi, match => {
  const entities = { '&amp;': '&', '&quot;': '"', '&apos;': "'", '&lt;': '<', '&gt;': '>' };
  if (entities[match]) return entities[match];
  return String.fromCodePoint(match.startsWith('&#x') ? parseInt(match.slice(3), 16) : parseInt(match.slice(2), 10));
});

export async function check() {
  const catalogBytes = await fs.readFile(path.join(metadataRoot, 'catalog.json'));
  const catalog = JSON.parse(catalogBytes);
  const buildInfo = JSON.parse(await fs.readFile(path.join(metadataRoot, 'build-info.json')));
  if (hash(catalogBytes) !== buildInfo.catalogHash) throw new Error('同期後にサイトを再ビルドしてください。');
  const outputRoot = path.join(siteRoot, 'dist');
  const errors = [];
  const publication = JSON.parse(await fs.readFile(path.join(siteRoot, 'publish.json'), 'utf8'));
  for (const page of await fs.readdir(path.join(siteRoot, 'pages'))) {
    if (!page.endsWith('.md') || (publication.excludeSitePages || []).includes(page)) continue;
    const source = await fs.readFile(path.join(siteRoot, 'pages', page));
    const generated = await fs.readFile(path.join(generatedRoot, page));
    if (!source.equals(generated)) errors.push(`サイト用ページが一致しません: ${page}`);
  }
  for (const article of catalog.articles) {
    const source = await fs.readFile(requireInside(wikiRoot, path.join(wikiRoot, article.source)));
    const generated = await fs.readFile(requireInside(generatedRoot, path.join(generatedRoot, `${article.route}.md`)));
    if (hash(source) !== article.hash || !source.equals(generated)) errors.push(`記事の原文が一致しません: ${article.source}`);
    await fs.access(path.join(outputRoot, `${article.route}.html`)).catch(() => errors.push(`記事の出力がありません: ${article.route}`));
  }
  for (const asset of catalog.assets) {
    const source = await fs.readFile(requireInside(path.join(wikiRoot, 'img'), path.join(wikiRoot, asset.source)));
    const output = await fs.readFile(requireInside(outputRoot, path.join(outputRoot, asset.publicPath)));
    if (hash(source) !== asset.hash || !source.equals(output)) errors.push(`画像の原本が一致しません: ${asset.source}`);
  }
  const htmlFiles = [];
  async function walk(directory) {
    for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
      const file = path.join(directory, entry.name);
      if (entry.isDirectory()) await walk(file);
      else if (entry.name.endsWith('.html')) htmlFiles.push(file);
    }
  }
  await walk(outputRoot);
  const html = new Map(await Promise.all(htmlFiles.map(async file => [file, await fs.readFile(file, 'utf8')])));
  const ids = new Map([...html].map(([file, content]) => [file, new Set([...content.matchAll(/\bid=["']([^"']+)["']/g)].map(match => decodeHtml(match[1])))]));
  let links = 0;
  for (const [file, content] of html) {
    for (const tag of content.matchAll(/<(?:a|img|link|script)\b[^>]*>/g)) {
      for (const match of tag[0].matchAll(/\b(?:href|src)=["']([^"']+)["']/g)) {
        const url = decodeHtml(match[1]);
        if (/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(url)) continue;
        links++;
        const parsed = new URL(url, `http://wiki.local/${path.relative(outputRoot, file).split(path.sep).join('/')}`);
        let pathname = decodeURIComponent(parsed.pathname);
        if (url.startsWith('/') && buildInfo.base !== '/') {
          if (!pathname.startsWith(buildInfo.base)) { errors.push(`公開先パスが反映されていません: ${url}`); continue; }
          pathname = pathname.slice(buildInfo.base.length - 1);
        }
        if (pathname.endsWith('/')) pathname += 'index.html';
        const target = path.resolve(outputRoot, `.${pathname}`);
        if (!inside(outputRoot, target)) { errors.push(`出力範囲外の参照: ${url}`); continue; }
        try { await fs.access(target); }
        catch { errors.push(`参照切れ: ${path.relative(outputRoot, file)} → ${url}`); continue; }
        const fragment = decodeURIComponent(parsed.hash.slice(1));
        if (fragment && ids.has(target) && !ids.get(target).has(fragment)) errors.push(`見出し参照切れ: ${path.relative(outputRoot, file)} → ${url}`);
      }
    }
  }
  // VitePressが実際に生成した検索インデックスを、同じ依存ライブラリで検査する。
  const requireFromVitePress = createRequire(path.join(siteRoot, 'node_modules', 'vitepress', 'package.json'));
  const MiniSearch = requireFromVitePress('minisearch');
  const chunkRoot = path.join(outputRoot, 'assets', 'chunks');
  const indexFile = (await fs.readdir(chunkRoot)).find(name => name.startsWith('@localSearchIndexroot.') && name.endsWith('.js'));
  if (!indexFile) throw new Error('検索インデックスが生成されていません。');
  const indexJson = (await import(pathToFileURL(path.join(chunkRoot, indexFile)).href)).default;
  const search = MiniSearch.loadJSON(indexJson, {
    fields: ['title', 'titles', 'text'], storeFields: ['title', 'titles'], tokenize: tokenizeSearch,
    searchOptions: { prefix: true, fuzzy: 0.15 }
  });
  for (const query of ['margin', '余白', '画像', '包含ブロック']) {
    if (!search.search(query).length) errors.push(`検索結果が見つかりません: ${query}`);
  }
  if (errors.length) throw new Error([...new Set(errors)].join('\n'));
  console.log(`検査OK: ${catalog.articles.length}記事の原文一致、${catalog.assets.length}画像の原本一致、${htmlFiles.length}ページ・${links}参照、日本語と英語の検索結果。`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) await check();
