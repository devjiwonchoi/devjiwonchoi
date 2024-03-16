import { test, expect } from '@playwright/test'

test.describe('social logo links', () => {
  test('should display Social Logo Links at /', async ({ page }) => {
    await page.goto('/')
    const githubLogo = await page.waitForSelector('img[alt="GitHub Logo"]')
    const gmailLogo = await page.waitForSelector('img[alt="Gmail Logo"]')
    const twitterLogo = await page.waitForSelector('img[alt="Twitter Logo"]')
    const linkedinLogo = await page.waitForSelector('img[alt="LinkedIn Logo"]')
    expect(githubLogo).toBeTruthy()
    expect(gmailLogo).toBeTruthy()
    expect(twitterLogo).toBeTruthy()
    expect(linkedinLogo).toBeTruthy()
  })

  test('should display Social Logo Links at /blog', async ({ page }) => {
    await page.goto('/blog')
    const githubLogo = await page.waitForSelector('img[alt="GitHub Logo"]')
    const gmailLogo = await page.waitForSelector('img[alt="Gmail Logo"]')
    const twitterLogo = await page.waitForSelector('img[alt="Twitter Logo"]')
    const linkedinLogo = await page.waitForSelector('img[alt="LinkedIn Logo"]')
    expect(githubLogo).toBeTruthy()
    expect(gmailLogo).toBeTruthy()
    expect(twitterLogo).toBeTruthy()
    expect(linkedinLogo).toBeTruthy()
  })

  test('should display Social Logo Links at /blog/:slug', async ({ page }) => {
    await page.goto('/blog')
    await page.waitForSelector('section')
    await page.click('section')
    await page.waitForSelector('h1')
    const githubLogo = await page.waitForSelector('img[alt="GitHub Logo"]')
    const gmailLogo = await page.waitForSelector('img[alt="Gmail Logo"]')
    const twitterLogo = await page.waitForSelector('img[alt="Twitter Logo"]')
    const linkedinLogo = await page.waitForSelector('img[alt="LinkedIn Logo"]')
    expect(githubLogo).toBeTruthy()
    expect(gmailLogo).toBeTruthy()
    expect(twitterLogo).toBeTruthy()
    expect(linkedinLogo).toBeTruthy()
  })

  test('should display Social Logo Links at /projects', async ({ page }) => {
    await page.goto('/projects')
    const githubLogo = await page.waitForSelector('img[alt="GitHub Logo"]')
    const gmailLogo = await page.waitForSelector('img[alt="Gmail Logo"]')
    const twitterLogo = await page.waitForSelector('img[alt="Twitter Logo"]')
    const linkedinLogo = await page.waitForSelector('img[alt="LinkedIn Logo"]')
    expect(githubLogo).toBeTruthy()
    expect(gmailLogo).toBeTruthy()
    expect(twitterLogo).toBeTruthy()
    expect(linkedinLogo).toBeTruthy()
  })
})
