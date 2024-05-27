import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

export default {
  content: ['./src/{app,components}/**/*.{tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
    },
  },
  typography: {
    quoteless: {
      css: {
        'blockquote p:first-of-type::before': { content: 'none' },
        'blockquote p:first-of-type::after': { content: 'none' },
      },
    },
  },
  plugins: [typography],
} satisfies Config
