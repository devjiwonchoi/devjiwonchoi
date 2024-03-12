import { test, expect } from '@playwright/test'
import { welcomeRowCount } from '../utils'

test.describe('terminal commands - ls', () => {
  test('should show .php files (pages)', async ({ page }) => {
    await page.goto('/')
    await page.waitForSelector('.xterm-rows')
    await page.keyboard.type('ls')
    await page.keyboard.press('Enter')
    await page.waitForSelector(
      `.xterm-rows > div:nth-child(${welcomeRowCount + 2}) > span`,
    )
    expect(
      await page.textContent(
        `.xterm-rows > div:nth-child(${welcomeRowCount + 2}) > span`,
      ),
    ).toContain('blog.php')
  })
})
