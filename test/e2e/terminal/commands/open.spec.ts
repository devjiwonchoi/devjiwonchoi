import { test, expect } from '@playwright/test'

test.describe('terminal commands - open', () => {
  test('should goto /bio', async ({ page }) => {
    await page.goto('/')
    await page.waitForSelector('.xterm-rows')
    await page.keyboard.type('open biography.php')
    await page.keyboard.press('Enter')
    await page.waitForURL('/bio')
    expect(page.url()).toContain('/bio')
  })

  test('should goto /blog', async ({ page }) => {
    await page.goto('/')
    await page.waitForSelector('.xterm-rows')
    await page.keyboard.type('open blog.php')
    await page.keyboard.press('Enter')
    await page.waitForURL('/blog')
    expect(page.url()).toContain('/blog')
  })

  test('should goto /projects', async ({ page }) => {
    await page.goto('/')
    await page.waitForSelector('.xterm-rows')
    await page.keyboard.type('open projects.php')
    await page.keyboard.press('Enter')
    await page.waitForURL('/projects')
    expect(page.url()).toContain('/projects')
  })
})
