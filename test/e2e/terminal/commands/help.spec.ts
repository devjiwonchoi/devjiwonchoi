import { test, expect } from '@playwright/test'
import { welcomeRowCount } from '../utils'

test.describe('terminal commands - help', () => {
  test('should show help message', async ({ page }) => {
    await page.goto('/')
    await page.waitForSelector('.xterm-rows')
    // has welcome message already
    expect(await page.textContent(`.xterm-rows > div:nth-child(3)`)).toContain(
      'Available Commands:',
    )
    await page.keyboard.type('help')
    await page.keyboard.press('Enter')
    expect(
      await page.textContent(
        `.xterm-rows > div:nth-child(${welcomeRowCount + 3}) > span`,
      ),
    ).toContain('Available Commands:')
  })
})
