import { test, expect } from '@playwright/test'

test.describe('terminal commands - clear', () => {
  test('should clear terminal', async ({ page }) => {
    await page.goto('/')
    await page.waitForSelector('.xterm-rows')
    // has welcome message
    expect(await page.textContent(`.xterm-rows > div:nth-child(3)`)).toContain(
      'Available Commands:',
    )
    await page.keyboard.type('clear')
    await page.keyboard.press('Enter')
    // cleared out welcome message
    expect(
      await page.textContent(`.xterm-rows > div:nth-child(3)`),
    ).not.toContain('Available Commands:')
  })
})
