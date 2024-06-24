import type { Config } from 'tailwindcss'

export default {
  content: ['./src/{app,components}/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
    },
  },
} satisfies Config
