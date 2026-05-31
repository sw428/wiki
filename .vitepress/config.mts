import { defineConfig } from 'vitepress'

const owner = process.env.GITHUB_REPOSITORY_OWNER ?? ''
const repo = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? ''
const isUserOrOrgPagesRepo =
  owner !== '' && repo.toLowerCase() === `${owner.toLowerCase()}.github.io`
const base = isUserOrOrgPagesRepo || repo === '' ? '/' : `/${repo}/`

export default defineConfig({
  lang: 'ja',
  title: 'wiki',
  description: 'frontend wiki',
  base,
  cleanUrls: true,
  lastUpdated: true,
  ignoreDeadLinks: true,
  themeConfig: {
    search: {
      provider: 'local'
    },
    nav: [
      { text: 'Top', link: '/' },
      { text: '基礎', link: '/basic/' },
      { text: '実務', link: '/practical/' },
      { text: '知識', link: '/knowledge/' },
      { text: '資料', link: '/materials/' }
    ],
    sidebar: [
      {
        text: '基礎',
        items: [
          { text: 'HTML・CSS', link: '/basic/html/' },
          { text: 'JS', link: '/basic/js/' },
          { text: 'React', link: '/basic/react/' },
          { text: 'TypeScript', link: '/basic/typescript/' },
          { text: 'ケース検証', link: '/basic/cases/' }
        ]
      },
      {
        text: '実務',
        items: [
          { text: 'BEM運用', link: '/practical/bem/' },
          { text: 'SCSS導入', link: '/practical/scss/' },
          { text: 'ケース検証', link: '/practical/cases/' },
          { text: 'ポートフォリオサイト', link: '/practical/portfolio/' }
        ]
      },
      {
        text: '知識',
        items: [{ text: '知識(造語含む)', link: '/knowledge/' }]
      },
      {
        text: '資料',
        items: [{ text: '資料庫', link: '/materials/library/' }]
      }
    ],
    outline: {
      level: [2, 3],
      label: 'このページ'
    }
  }
})
