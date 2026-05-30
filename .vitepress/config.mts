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
      { text: '学習本線', link: '/01_学習本線/JS/00_JS整理マップ' },
      { text: '案件・制作', link: '/02_案件・制作/ケース検証/00_案件ケース運用（共通）' }
    ],
    sidebar: {
      '/': [
        {
          text: 'System',
          items: [
            { text: 'README', link: '/README' },
            { text: 'CURRENT', link: '/CURRENT' },
            { text: 'AGENTS', link: '/AGENTS' },
            { text: 'CHANGELOG', link: '/CHANGELOG' }
          ]
        },
        {
          text: 'Entry',
          items: [
            { text: 'Top', link: '/' },
            { text: '01_学習本線', link: '/01_学習本線/JS/00_JS整理マップ' },
            { text: '02_案件・制作', link: '/02_案件・制作/ケース検証/00_案件ケース運用（共通）' },
            { text: '03_雑記', link: '/03_雑記/知識辞書（試運用）/00_知識辞書インデックス' },
            { text: '04_資料庫', link: '/04_資料庫/00_実行環境とツール' }
          ]
        }
      ],
      '/01_学習本線/': [
        {
          text: '整理マップ',
          items: [
            { text: 'HTML・CSS', link: '/01_学習本線/HTML・CSS/00_HTML・CSS整理マップ' },
            { text: 'JS', link: '/01_学習本線/JS/00_JS整理マップ' },
            { text: 'React', link: '/01_学習本線/React/00_React整理マップ' },
            { text: 'TypeScript', link: '/01_学習本線/TypeScript/00_TypeScript整理マップ' }
          ]
        },
        {
          text: 'ケース検証',
          items: [{ text: '運用（共通）', link: '/01_学習本線/ケース検証/00_ケース検証運用（共通）' }]
        }
      ],
      '/02_案件・制作/': [
        {
          text: '案件導線',
          items: [
            { text: 'BEM運用', link: '/02_案件・制作/BEM運用/00_BEM運用と命名判断' },
            { text: 'SCSS導入', link: '/02_案件・制作/SCSS導入/00_SCSS導入と分割管理' },
            { text: 'ケース検証（共通）', link: '/02_案件・制作/ケース検証/00_案件ケース運用（共通）' },
            { text: 'CSS設計方針', link: '/02_案件・制作/ポートフォリオサイト/CSS設計方針' }
          ]
        }
      ],
      '/03_雑記/': [
        {
          text: '雑記',
          items: [{ text: '知識辞書インデックス', link: '/03_雑記/知識辞書（試運用）/00_知識辞書インデックス' }]
        }
      ],
      '/04_資料庫/': [
        {
          text: '資料庫',
          items: [
            { text: '実行環境とツール', link: '/04_資料庫/00_実行環境とツール' },
            { text: 'LLMとGPT活用', link: '/04_資料庫/01_LLMとGPT活用（事実に近づく対話手順）' },
            { text: 'VS Code拡張とGit運用メモ', link: '/04_資料庫/02_VS Code拡張とGit運用メモ（コミット文・文字化け復元）' }
          ]
        }
      ]
    },
    outline: {
      level: [2, 3],
      label: 'このページ'
    }
  }
})
