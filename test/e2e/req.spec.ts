import { test, expect } from '@playwright/test'

test.describe('Req - (en-US)', () => {
  test.use({ locale: 'en-US' })

  test('should display English contents', async ({ page }) => {
    await page.goto('/request')
    expect(await page.title()).toBe('Request | Jiwon Choi')
    expect(await page.textContent('h3')).toBe('Verify Email')
    expect(await page.textContent('button')).toContain('Account')
  })

  test('should redirect to "/request" if "/en/request"', async ({ page }) => {
    await page.goto('/en/request')
    const pathname = new URL(page.url()).pathname
    expect(pathname).toBe('/request')
  })

  // TODO: find a way to verify next-auth during test if this is recommended
})
