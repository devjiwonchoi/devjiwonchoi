import { test, expect } from '@playwright/test'

test.describe('terminal - media query', () => {
  test('should render terminal on screen size over 768px', async ({ page }) => {
    await page.setViewportSize({ width: 769, height: 800 })
    await page.goto('/')

    await page.waitForSelector('.xterm')
    expect(await page.isVisible('.xterm')).toBeTruthy()
  })

  test('should not render terminal on screen size under 768px', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 767, height: 800 })
    await page.goto('/')

    // wait 1 second for possible terminal rendering
    await page.waitForTimeout(1000)
    expect(await page.isVisible('.xterm')).toBeFalsy()
  })
})
