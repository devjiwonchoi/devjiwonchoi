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
    await page.waitForSelector('section')
    await page.click('section')
    await page.waitForSelector('h1')

    // wait 1s for description to change
    await page.waitForTimeout(1000)
    const description = await page.getAttribute(
      'meta[name=description]',
      'content',
    )
    expect(description).not.toContain('Compilation of troubleshoots')
  })
})
