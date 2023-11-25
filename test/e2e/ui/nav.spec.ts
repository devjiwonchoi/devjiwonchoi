import { test, expect } from '@playwright/test'

test.describe('Nav - en-US', () => {
  test.use({ locale: 'en-US' })

  test('should stay on "en" (no lang on pathname)', async ({ page }) => {
    await page.goto('/')

    await page.getByRole('link', { name: 'Blog' }).click()
    await page.waitForURL('**/blog')
    expect(await page.textContent('h2')).toBe('Blog')

    await page.getByRole('link', { name: 'Req' }).click()
    await page.waitForURL('**/request')
    expect(await page.textContent('h3')).toBe('Verify Email')

    await page.getByRole('link', { name: 'Bio' }).click()
    await page.waitForURL('/')
    expect(await page.textContent('h2')).toBe('Biography')
  })
})

test.describe('Nav - ko-KR', () => {
  test.use({ locale: 'ko-KR' })

  test('should stay on "ko"', async ({ page }) => {
    await page.goto('/ko')

    // TODO: add blog
    // await page.getByRole('link', { name: '블로그' }).click()
    // await page.waitForURL('**/ko/blog')
    // expect(await page.textContent('h2')).toBe('블로그')

    await page.getByRole('link', { name: '문의' }).click()
    await page.waitForURL('**/ko/request')
    expect(await page.textContent('h3')).toBe('이메일 인증')

    await page.getByRole('link', { name: '소개' }).click()
    await page.waitForURL('/ko')
    expect(await page.textContent('h2')).toBe('자기소개')
  })
})
