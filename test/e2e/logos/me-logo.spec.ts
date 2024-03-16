import { test, expect } from '@playwright/test'

test.describe('logos - me-logo', () => {
  test('should render me-logo at /', async ({ page }) => {
    await page.goto('/')

    const image = await page.$('img[alt="Jiwon Choi Logo"]')
    expect(image).toBeTruthy()
  })

  test('should render me-logo at /bio', async ({ page }) => {
    await page.goto('/bio')

    const image = await page.$('img[alt="Jiwon Choi Logo"]')
    expect(image).toBeTruthy()
  })

  test('should render me-logo at /projects', async ({ page }) => {
    await page.goto('/projects')

    const image = await page.$('img[alt="Jiwon Choi Logo"]')
    expect(image).toBeTruthy()
  })

  test('should render me-logo at /blog', async ({ page }) => {
    await page.goto('/blog')

    const image = await page.$('img[alt="Jiwon Choi Logo"]')
    expect(image).toBeTruthy()
  })
})
