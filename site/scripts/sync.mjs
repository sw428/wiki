import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import MarkdownIt from 'markdown-it';
import {
  siteRoot, wikiRoot, generatedRoot, metadataRoot, slash, hash,
  compareNames, cleanLabel, requireInside, inside, encodePath,
  headingIds, plainInline, localTarget, resolveLink
} from './shared.mjs';

const markdown = new MarkdownIt({ html: true });
const imageExtensions = new Set(['.svg', '.png', '.jpg', '.jpeg', '.gif', '.webp', '.avif']);

async function writeChanged(file, content) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  const previous = await fs.readFile(file).catch(error => {
    if (error.code === 'ENOENT') return null;
    throw error;
  });
  const next = Buffer.isBuffer(content) ? content : Buffer.from(content);
  if (!previous || !previous.equals(next)) await fs.writeFile(file, next);
}

async function walk(directory, config) {
  const files = [];
  for (const entry of (await fs.readdir(directory, { withFileTypes: true })).sort((a, b) => compareNames(a.name, b.name))) {
    if (entry.isSymbolicLink()) throw new Error(`シンボリックリンクは取り込みません: ${entry.name}`);
    if (entry.isDirectory()) {
      if (config.excludeDirectories.includes(entry.name) || config.excludeDirectoryPrefixes.some(prefix => entry.name.startsWith(prefix))) continue;
      files.push(...await walk(path.join(directory, entry.name), config));
    } else if (entry.isFile() && entry.name.endsWith('.md') && !config.excludeFiles.includes(entry.name) &&
      !config.excludeFilePrefixes.some(prefix => entry.name.startsWith(prefix))) {
      files.push(path.join(directory, entry.name));
    }
  }
  return files;
}

export function references(tokens) {
  const result = [];
  const visit = token => {
    if (token.type === 'link_open') result.push({ type: 'link', href: token.attrGet('href') });
    if (token.type === 'image') result.push({ type: 'image', href: token.attrGet('src') });
    if (token.type === 'html_block' || token.type === 'html_inline') {
      for (const match of token.content.matchAll(/<(img|a)\b[^>]*?\b(src|href)\s*=\s*["']([^"']+)["'][^>]*>/gi)) {
        result.push({ type: match[1].toLowerCase() === 'img' ? 'image' : 'link', href: match[3] });
      }
    }
    token.children?.forEach(visit);
  };
  tokens.forEach(visit);
  return result;
}

async function removeStale(root, expected) {
  // 個別の生成ファイルだけを削除する。生成ルート外とディレクトリは削除しない。
  async function visit(directory) {
    for (const entry of await fs.readdir(directory, { withFileTypes: true }).catch(error => {
      if (error.code === 'ENOENT') return [];
      throw error;
    })) {
      const target = requireInside(root, path.join(directory, entry.name));
      if (entry.isSymbolicLink()) throw new Error(`生成先にシンボリックリンクがあります: ${target}`);
      if (entry.isDirectory()) await visit(target);
      else if (entry.isFile() && !expected.has(target)) await fs.unlink(target);
    }
  }
  await visit(root);
}

export async function sync() {
  const config = JSON.parse(await fs.readFile(path.join(siteRoot, 'publish.json'), 'utf8'));
  const candidates = new Map();
  const selected = new Map();
  const routes = new Set();
  const collections = [];
  for (const collection of config.collections) {
    if (!/^[a-z\d/-]+$/.test(collection.route) || collection.route.split('/').some(part => !part || part === '..')) {
      throw new Error(`公開URLの設定が不正です: ${collection.route}`);
    }
    const sourceRoot = requireInside(wikiRoot, path.resolve(wikiRoot, collection.source));
    if (inside(siteRoot, sourceRoot)) throw new Error('site自身を記事の入力元にはできません。');
    const source = slash(path.relative(wikiRoot, sourceRoot));
    if (!/^(?:01_導入|02_基礎|03_詳細|05_参照)(?:\/|$)/.test(source)) {
      throw new Error(`学習本文以外の入力元は取り込めません: ${source}`);
    }
    collections.push({ ...collection, source });
    for (const file of await walk(sourceRoot, config)) {
      const buffer = await fs.readFile(file);
      const content = buffer.toString('utf8');
      const tokens = markdown.parse(content, {});
      const heading = tokens.findIndex(token => token.type === 'heading_open' && token.tag === 'h1');
      const title = cleanLabel(heading < 0 ? path.basename(file) : plainInline(tokens[heading + 1]));
      const relative = slash(path.relative(sourceRoot, file));
      const article = {
        source: slash(path.relative(wikiRoot, file)),
        route: `${collection.route}/${relative.replace(/\.md$/, '')}`,
        title, collection: collection.id,
        category: relative.includes('/') ? relative.split('/')[0] : '',
        anchors: headingIds(tokens), hash: hash(buffer),
        references: references(tokens), buffer
      };
      if (routes.has(article.route) || candidates.has(article.source)) throw new Error(`記事の設定が重複しています: ${article.source}`);
      routes.add(article.route);
      candidates.set(article.source, article);
      if (!collection.referencedOnly) selected.set(article.source, article);
    }
  }
  // 参照カードは掲載本文から必要になったものだけを、参照先も含めて取り込む。
  const queue = [...selected.values()];
  for (let index = 0; index < queue.length; index++) {
    const article = queue[index];
    for (const reference of article.references) {
      const target = localTarget(article.source, reference.href);
      const candidate = target && candidates.get(target.target);
      if (candidate && !selected.has(candidate.source)) {
        selected.set(candidate.source, candidate);
        queue.push(candidate);
      }
    }
  }

  const articles = [...selected.values()].sort((a, b) => compareNames(a.route, b.route));
  const directories = new Map();
  for (const collection of collections) {
    directories.set(collection.source, { source: collection.source, route: `${collection.route}/index`, title: collection.label, collection: collection.id });
    for (const article of articles.filter(item => item.collection === collection.id)) {
      let directory = path.posix.dirname(article.source);
      while (directory !== collection.source && directory.startsWith(`${collection.source}/`)) {
        const relative = path.posix.relative(collection.source, directory);
        directories.set(directory, { source: directory, route: `${collection.route}/${relative}/index`, title: cleanLabel(path.posix.basename(directory)), collection: collection.id });
        directory = path.posix.dirname(directory);
      }
    }
  }

  const assets = new Map();
  for (const article of articles) {
    for (const reference of article.references) {
      const target = localTarget(article.source, reference.href);
      if (!target?.target?.startsWith('img/')) {
        if (reference.type === 'image' && target) throw new Error(`Wikiのimg/以外の画像です: ${article.source} → ${reference.href}`);
        continue;
      }
      if (!imageExtensions.has(path.posix.extname(target.target).toLowerCase())) throw new Error(`画像形式を確認してください: ${target.target}`);
      const file = requireInside(path.join(wikiRoot, 'img'), path.resolve(wikiRoot, target.target));
      if (!inside(path.join(wikiRoot, 'img'), await fs.realpath(file))) throw new Error(`画像の実体がimg/の外にあります: ${target.target}`);
      const buffer = await fs.readFile(file);
      assets.set(target.target, { source: target.target, publicPath: `wiki/${target.target}`, hash: hash(buffer), buffer });
    }
  }

  const catalog = {
    title: config.title, description: config.description,
    collections,
    articles: articles.map(({ buffer, references, ...article }) => article),
    directories: [...directories.values()],
    assets: [...assets.values()].map(({ buffer, ...asset }) => asset)
  };
  const report = { excludedLinks: [], adjustedAnchors: [] };
  for (const article of articles) {
    for (const reference of article.references.filter(item => item.type === 'link')) {
      const result = resolveLink(article.source, reference.href, catalog);
      if (result.kind === 'excluded') {
        const target = localTarget(article.source, reference.href);
        let reason = 'not-published';
        if (target?.target) {
          try { await fs.access(path.resolve(wikiRoot, target.target)); }
          catch { reason = 'missing-source'; }
        }
        report.excludedLinks.push({ source: article.source, href: reference.href, reason });
      }
      if (result.adjustedAnchor) report.adjustedAnchors.push({ source: article.source, href: reference.href });
    }
  }

  const expected = new Set();
  async function output(route, content) {
    const file = requireInside(generatedRoot, path.join(generatedRoot, `${route}.md`));
    expected.add(file);
    await writeChanged(file, content);
  }
  for (const article of articles) await output(article.route, article.buffer);
  for (const directory of directories.values()) {
    const collection = collections.find(item => item.id === directory.collection);
    const children = [...directories.values()].filter(item => path.posix.dirname(item.source) === directory.source);
    const files = articles.filter(item => path.posix.dirname(item.source) === directory.source);
    const content = ['---', 'pageClass: wiki-index', '---', '', `# ${directory.title}`, '', directory.source === collection.source ? collection.description : '確認したいことに合う記事から読めます。', ''];
    for (const child of children.sort((a, b) => compareNames(a.source, b.source))) content.push(`- [${child.title}](/${encodePath(child.route)}.html)`);
    for (const article of files) content.push(`- [${article.title}](/${encodePath(article.route)}.html)`);
    content.push('');
    await output(directory.route, content.join('\n'));
  }
  for (const entry of await fs.readdir(path.join(siteRoot, 'pages'), { withFileTypes: true })) {
    if (entry.isFile() && entry.name.endsWith('.md') && !(config.excludeSitePages || []).includes(entry.name)) {
      await output(entry.name.slice(0, -3), await fs.readFile(path.join(siteRoot, 'pages', entry.name)));
    }
  }
  const assetRoot = requireInside(generatedRoot, path.join(generatedRoot, 'public', 'wiki'));
  for (const asset of assets.values()) {
    const file = requireInside(assetRoot, path.join(generatedRoot, 'public', asset.publicPath));
    expected.add(file);
    await writeChanged(file, asset.buffer);
  }
  const favicon = requireInside(generatedRoot, path.join(generatedRoot, 'public', 'favicon.svg'));
  expected.add(favicon);
  await writeChanged(favicon, await fs.readFile(path.join(siteRoot, 'assets', 'favicon.svg')));
  await removeStale(generatedRoot, expected);
  await writeChanged(path.join(metadataRoot, 'catalog.json'), `${JSON.stringify(catalog, null, 2)}\n`);
  await writeChanged(path.join(metadataRoot, 'report.json'), `${JSON.stringify(report, null, 2)}\n`);
  console.log(`同期: ${articles.length}記事・${assets.size}画像。元のWikiは変更していません。`);
  const missing = report.excludedLinks.filter(link => link.reason === 'missing-source').length;
  console.log(`参照の変換: サイト未掲載 ${report.excludedLinks.length - missing}件、元の参照切れ ${missing}件、見出し不一致 ${report.adjustedAnchors.length}件（詳細は .vitepress/generated/report.json）。`);
  return catalog;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await sync();
}
