import { test, expect } from '@playwright/test'

test.describe('i18n en-US', () => {
  test.use({ locale: 'en-US' })

  test('should display English contents', async ({ page }) => {
    await page.goto('/blog')
    expect(await page.title()).toBe('Jiwon Choi')
    expect(await page.textContent('h2')).toBe('Blog')
  })

  test('should redirect to "/blog" if "/en/blog"', async ({ page }) => {
    await page.goto('/en/blog')
    const pathname = new URL(page.url()).pathname
    expect(pathname).toBe('/blog')
  })

  test('should not throw error when click on blog article', async ({
    page,
  }) => {
    await page.goto('/blog')
    await page
      .locator('article')
      .filter({ hasText: 'Build an OpenAI ChatBot' })
      .click()

    await page.waitForLoadState('networkidle')

    expect(
      await page
        .getByRole('heading', { name: 'Build an OpenAI ChatBot' })
        .textContent(),
    ).toBe('Build an OpenAI ChatBot within 10 minutes with Vercel AI & Next.js')
  })
})
