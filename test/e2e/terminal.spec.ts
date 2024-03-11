import { test, expect } from '@playwright/test'

test.describe('terminal commands', () => {
  test('help - should display available commands', async ({ page }) => {
    await page.goto('/')
    await page.waitForSelector('.xterm-rows', { state: 'attached' })
    await page.keyboard.type('help')
    await page.keyboard.press('Enter')
    await page.waitForSelector('.xterm-rows > div:nth-child(3) > span', {
      state: 'attached',
    })
    expect(
      await page.textContent('.xterm-rows > div:nth-child(3) > span'),
    ).toContain('Available Commands:')
  })

  test('ls - should display files', async ({ page }) => {
    await page.goto('/')
    await page.waitForSelector('.xterm-rows', { state: 'attached' })
    await page.keyboard.type('ls')
    await page.keyboard.press('Enter')
    await page.waitForSelector('.xterm-rows > div:nth-child(2) > span', {
      state: 'attached',
    })
    expect(
      await page.textContent('.xterm-rows > div:nth-child(2) > span'),
    ).toContain('blog.php')
  })

  test('clear - should clear previous commands', async ({ page }) => {
    await page.goto('/')
    await page.waitForSelector('.xterm-rows', { state: 'attached' })
    await page.keyboard.type('help')
    await page.keyboard.press('Enter')
    await page.waitForSelector('.xterm-rows > div:nth-child(3) > span', {
      state: 'attached',
    })
    expect(
      await page.textContent('.xterm-rows > div:nth-child(3) > span'),
    ).toContain('Available Commands:')

    // Clear previous help output
    await page.keyboard.type('clear')
    await page.keyboard.press('Enter')
    await page.waitForSelector('.xterm-rows > div:nth-child(3)', {
      state: 'attached',
    })
    expect(
      await page.textContent('.xterm-rows > div:nth-child(3)'),
    ).not.toContain('blog.php')
  })

  test('open - should goto /biography', async ({ page }) => {
    await page.goto('/')
    await page.waitForSelector('.xterm-rows', { state: 'attached' })
    await page.keyboard.type('open biography.php')
    await page.keyboard.press('Enter')

    await page.waitForURL('/biography')
    expect(page.url()).toContain('/biography')
  })

  test('open - should goto /blog', async ({ page }) => {
    await page.goto('/')
    await page.waitForSelector('.xterm-rows', { state: 'attached' })
    await page.keyboard.type('open blog.php')
    await page.keyboard.press('Enter')

    await page.waitForURL('/blog')
    expect(page.url()).toContain('/blog')
  })

  test('open - should goto /projects', async ({ page }) => {
    await page.goto('/')
    await page.waitForSelector('.xterm-rows', { state: 'attached' })
    await page.keyboard.type('open projects.php')
    await page.keyboard.press('Enter')

    await page.waitForURL('/projects')
    expect(page.url()).toContain('/projects')
  })
})
