import { test, expect } from '@playwright/test'

test.describe('terminal - loading', () => {
  test('should render loading message', async ({ page }) => {
    await page.goto('/')

    expect(await page.textContent('#loading-terminal')).toContain(
      'Initiating Terminal...',
    )
  })

  test('should render terminal after loading', async ({ page }) => {
    await page.goto('/')

    await page.waitForSelector('.xterm')
    expect(await page.isVisible('.xterm')).toBeTruthy()
  })
})
