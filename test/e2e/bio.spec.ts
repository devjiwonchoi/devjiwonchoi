import { test, expect } from '@playwright/test'

test('bio', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle('Jiwon Choi')
})

