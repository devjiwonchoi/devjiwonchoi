import { test, expect } from '@playwright/test'

test.use({ userAgent: 'Mobile' })

test.describe('blog', () => {
  test('should open blog', async ({ page }) => {
    await page.goto('/blog')
    await page.waitForSelector('section')
    expect(await page.isVisible('section')).toBeTruthy()
  })

  test('should open post', async ({ page }) => {
    await page.goto('/blog')
    await page.waitForSelector('section')
    await page.click('section')
    await page.waitForSelector('h1')
    expect(await page.isVisible('h1')).toBeTruthy()
  })

  test('should redirect to /blog if on mobile', async ({ page }) => {
    await page.goto('/')
    // user-agent is set to mobile, redirects to /blog
    expect(page.url()).toContain('/blog')
  })
})
