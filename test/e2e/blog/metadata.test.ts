import { test, expect } from '@playwright/test'

test.describe('blog - metadata', () => {
  test('should have description different from /', async ({ page }) => {
    await page.goto('/blog')
    const description = await page.getAttribute(
      'meta[name=description]',
      'content',
    )
    expect(description).toContain('Compilation of troubleshoots')
  })

  test('should have unique description different from /blog', async ({
    page,
  }) => {
    await page.goto('/blog')
    await page.waitForSelector('article')
    await page.click('article')
    await page.waitForSelector('h1')
    // wait for 0.1s description to be updated
    await page.waitForTimeout(100)
    const description = await page.getAttribute(
      'meta[name=description]',
      'content',
    )
    expect(description).not.toContain('Compilation of troubleshoots')
  })
})
