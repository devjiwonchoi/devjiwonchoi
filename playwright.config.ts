import { defineConfig } from '@playwright/test'

export default defineConfig({
  use: {
    baseURL: process.env.BASE_URL ?? 'http://localhost:3000',
  },
  expect: { timeout: 30000 },
})
