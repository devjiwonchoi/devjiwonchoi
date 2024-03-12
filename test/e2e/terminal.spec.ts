import { test, expect } from '@playwright/test'
import type { Page } from '@playwright/test'

const welcomeRowCount = 8

const testCases = [
  {
    name: 'help - should display available commands',
    command: 'help',
    // some steps for expect
    expected: async (page: Page) => {
      await page.waitForSelector(
        `.xterm-rows > div:nth-child(${welcomeRowCount + 3}) > span`,
      )
      expect(
        await page.textContent(
          `.xterm-rows > div:nth-child(${welcomeRowCount + 3}) > span`,
        ),
      ).toContain('Available Commands:')
    },
  },
  {
    name: 'ls - should display files',
    command: 'ls',
    // some steps for expect
    expected: async (page: Page) => {
      await page.waitForSelector(
        `.xterm-rows > div:nth-child(${welcomeRowCount + 2}) > span`,
      )
      expect(
        await page.textContent(
          `.xterm-rows > div:nth-child(${welcomeRowCount + 2}) > span`,
        ),
      ).toContain('blog.php')
    },
  },
  {
    name: 'clear - should clear previous commands',
    command: 'clear',
    // some steps for expect
    expected: async (page: Page) => {
      await page.waitForSelector(
        `.xterm-rows > div:nth-child(${welcomeRowCount + 3})`,
      )
      expect(
        await page.textContent(
          `.xterm-rows > div:nth-child(${welcomeRowCount + 3})`,
        ),
      ).not.toContain('blog.php')
    },
  },
  {
    name: 'open - should goto /biography',
    command: 'open biography.php',
    // some steps for expect
    expected: async (page: Page) => {
      await page.waitForURL('/biography')
      expect(page.url()).toContain('/biography')
    },
  },
  {
    name: 'open - should goto /blog',
    command: 'open blog.php',
    // some steps for expect
    expected: async (page: Page) => {
      await page.waitForURL('/blog')
      expect(page.url()).toContain('/blog')
    },
  },
  {
    name: 'open - should goto /projects',
    command: 'open projects.php',
    // some steps for expect
    expected: async (page: Page) => {
      await page.waitForURL('/projects')
      expect(page.url()).toContain('/projects')
    },
  },
]

test.describe('terminal commands', () => {
  for (const { name, command, expected } of testCases) {
    test(name, async ({ page }) => {
      await page.goto('/')
      await page.waitForSelector('.xterm-rows')
      await page.keyboard.type(command)
      await page.keyboard.press('Enter')
      await expected(page)
    })
  }
})
