import type { Config } from 'tailwindcss'

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
  plugins: [],
} satisfies Config
