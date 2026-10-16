import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

export const siteRoot = fileURLToPath(new URL('../', import.meta.url));
export const wikiRoot = path.resolve(siteRoot, '..');
export const generatedRoot = path.join(siteRoot, 'generated');
export const metadataRoot = path.join(siteRoot, '.vitepress', 'generated');
export const slash = value => value.split(path.sep).join('/');
export const hash = value => createHash('sha256').update(value).digest('hex');
export const compareNames = (a, b) => a.localeCompare(b, 'ja', { numeric: true });
export const cleanLabel = value => value.replace(/\.md$/i, '').replace(/^\d+_/, '');
export const encodePath = value => value.split('/').map(encodeURIComponent).join('/');

export function inside(root, target) {
  const relative = path.relative(root, target);
  return relative === '' || (!relative.startsWith(`..${path.sep}`) && relative !== '..' && !path.isAbsolute(relative));
}

export function requireInside(root, target) {
  const absolute = path.resolve(target);
  if (!inside(root, absolute)) throw new Error(`管理範囲外のパスです: ${target}`);
  return absolute;
}

export function siteBase(value = process.env.SITE_BASE || '/') {
  if (!/^\/(?!\/)[^?#\\]*\/$/.test(value) && value !== '/') {
    throw new Error('SITE_BASEは / または /wiki/ のように、先頭・末尾が / のパスを指定してください。');
  }
  if (value.split('/').some(part => part === '.' || part === '..')) throw new Error('SITE_BASEに . や .. は使えません。');
  return value;
}

export function withBase(url, base = siteBase()) {
  return `${base}${url.replace(/^\//, '')}`;
}

export function tokenizeSearch(text) {
  if (!Intl.Segmenter) return text.toLowerCase().split(/[\s\p{P}]+/u).filter(Boolean);
  return [...new Intl.Segmenter('ja', { granularity: 'word' }).segment(text)]
    .filter(segment => segment.isWordLike).map(segment => segment.segment.toLowerCase());
}

export function slugify(value) {
  return value.trim().toLowerCase().replace(/[^\p{L}\p{N}\p{M}_\-\s]/gu, '').replace(/\s/g, '-');
}

export function plainInline(token) {
  return (token?.children || []).map(child => {
    if (child.type === 'text' || child.type === 'code_inline') return child.content;
    if (child.type === 'softbreak' || child.type === 'hardbreak') return ' ';
    return '';
  }).join('');
}

export function headingIds(tokens) {
  const seen = new Map();
  return tokens.flatMap((token, index) => {
    if (token.type !== 'heading_open') return [];
    const original = slugify(plainInline(tokens[index + 1]));
    const count = seen.get(original) || 0;
    seen.set(original, count + 1);
    return [`${original}${count ? `-${count}` : ''}`];
  });
}

export function localTarget(source, href) {
  if (!href || /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(href)) return null;
  const match = href.match(/^([^?#]*)(\?[^#]*)?(#.*)?$/);
  if (!match) return null;
  let file;
  let fragment;
  try {
    file = decodeURIComponent(match[1]);
    fragment = decodeURIComponent((match[3] || '').slice(1));
  } catch {
    throw new Error(`URLを読み取れません: ${source} → ${href}`);
  }
  if (file.includes('\\') || file.includes('\0')) throw new Error(`不正な参照パスです: ${href}`);
  const target = file.startsWith('/')
    ? path.resolve(wikiRoot, `.${file}`)
    : path.resolve(wikiRoot, path.posix.dirname(source), file || path.posix.basename(source));
  if (!inside(wikiRoot, target) || inside(siteRoot, target)) return { excluded: true, source, href };
  return { target: slash(path.relative(wikiRoot, target)), query: match[2] || '', fragment };
}

export function resolveLink(source, href, catalog) {
  const local = localTarget(source, href);
  if (!local) return { kind: 'external', url: href };
  if (local.excluded) return { kind: 'excluded' };
  const article = catalog.articles.find(item => item.source === local.target);
  if (article) {
    const fragment = article.anchors.includes(local.fragment) ? local.fragment : '';
    return {
      kind: 'article',
      route: article.route,
      url: `/${encodePath(article.route)}.html${local.query}${fragment ? `#${encodeURIComponent(fragment)}` : ''}`,
      adjustedAnchor: Boolean(local.fragment && !fragment)
    };
  }
  const directory = catalog.directories.find(item => item.source === local.target.replace(/\/$/, '') ||
    (/\/00_[^/]+\.md$/.test(local.target) && item.source === path.posix.dirname(local.target)));
  if (directory) return { kind: 'directory', route: directory.route, url: `/${encodePath(directory.route)}.html` };
  const asset = catalog.assets.find(item => item.source === local.target);
  if (asset) return { kind: 'asset', url: `/${encodePath(asset.publicPath)}${local.query}${local.fragment ? `#${encodeURIComponent(local.fragment)}` : ''}` };
  return { kind: 'excluded' };
}
