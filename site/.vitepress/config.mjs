import { defineConfig } from 'vitepress';
import path from 'node:path';
import catalog from './generated/catalog.json';
import { siteRoot, siteBase, encodePath, cleanLabel, compareNames, slugify, tokenizeSearch } from '../scripts/shared.mjs';
import { wikiMarkdown } from '../scripts/markdown.mjs';

const link = route => `/${encodePath(route)}.html`;
const sidebar = {};
const nextArticles = new Map();
const escapeText = text => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
for (const collection of catalog.collections) {
  const articles = catalog.articles.filter(article => article.collection === collection.id);
  const categories = [...new Set(articles.map(article => article.category))].sort(compareNames);
  sidebar[`/${collection.route}/`] = [
    { text: collection.label, link: link(`${collection.route}/index`) },
    ...categories.map(category => {
      const items = articles.filter(article => article.category === category).map(article => ({ text: article.title, link: link(article.route) }));
      return category ? { text: cleanLabel(category), collapsed: true, items } : { text: '記事', items };
    })
  ];
  const pages = sidebar[`/${collection.route}/`].flatMap(item => item.items || [item]);
  const articlesByLink = new Map(articles.map(article => [link(article.route), article]));
  for (let index = 0; index < pages.length - 1; index++) {
    const next = articlesByLink.get(pages[index + 1].link);
    if (next?.category) {
      const source = decodeURIComponent(pages[index].link).slice(1).replace(/\.html$/, '.md');
      nextArticles.set(source, next);
    }
  }
}

export default defineConfig({
  vite: {
    server: {
      allowedHosts: ['passage-injuries-ooo-can.trycloudflare.com']
    }
  },
  lang: 'ja-JP',
  title: catalog.title,
  description: catalog.description,
  base: siteBase(),
  srcDir: 'generated',
  outDir: path.join(siteRoot, 'dist'),
  cacheDir: path.join(siteRoot, '.vitepress', 'cache'),
  transformPageData(page) {
    const next = nextArticles.get(page.relativePath);
    if (!next || page.frontmatter.next !== undefined) return;
    page.frontmatter.next = {
      text: `<span class="wiki-pager-category">${escapeText(cleanLabel(next.category))}</span>${escapeText(next.title)}`,
      link: link(next.route)
    };
  },
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `${siteBase()}favicon.svg` }],
    ['meta', { name: 'theme-color', content: '#087f73' }]
  ],
  themeConfig: {
    siteTitle: 'Web制作・学習Wiki',
    logo: '/favicon.svg',
    nav: catalog.collections.map(collection => ({
      text: collection.label,
      link: link(`${collection.route}/index`),
      activeMatch: `^/${collection.route}/`
    })),
    sidebar,
    outline: { level: [2, 3], label: 'このページの内容' },
    docFooter: { prev: '前の記事', next: '次の記事' },
    returnToTopLabel: 'ページ上部へ',
    sidebarMenuLabel: '記事を選ぶ',
    darkModeSwitchLabel: '配色',
    lightModeSwitchTitle: '明るい配色にする',
    darkModeSwitchTitle: '暗い配色にする',
    skipToContentLabel: '本文へ移動',
    notFound: {
      title: 'ページが見つかりません',
      quote: '記事の移動やURLの変更があった可能性があります。検索や記事一覧から探してください。',
      linkLabel: 'トップへ戻る',
      linkText: 'トップへ戻る'
    },
    search: {
      provider: 'local',
      options: {
        detailedView: false,
        translations: {
          button: { buttonText: '記事を検索', buttonAriaLabel: '記事を検索' },
          modal: {
            displayDetails: '詳細を表示', resetButtonTitle: '検索をクリア',
            backButtonTitle: '検索を閉じる', noResultsText: '該当する記事がありません',
            footer: { selectText: '選択', navigateText: '移動', closeText: '閉じる' }
          }
        },
        miniSearch: {
          options: {
            tokenize: tokenizeSearch
          },
          searchOptions: { prefix: true, fuzzy: 0.15 }
        }
      }
    },
    footer: {
      message: '<a href="' + siteBase() + 'terms.html">利用について</a>'
    }
  },
  markdown: {
    anchor: { slugify },
    codeCopyButtonTitle: 'コードをコピー',
    image: { lazyLoading: true },
    config: md => wikiMarkdown(md, catalog, siteBase())
  }
});
