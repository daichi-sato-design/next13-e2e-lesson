import { test, expect } from '@playwright/test'

test('セッショントークンがない時、githubユーザー名は表示されないか', async ({
  page,
  context,
}) => {
  await context.clearCookies()
  await page.goto('/')
  await expect(page.getByRole('heading')).toHaveText('Hello World 🚀')
  await expect(page.getByText('userA')).not.toBeVisible()
})

test('セッショントークンがある時、githubユーザー名が表示されているか', async ({
  page,
}) => {
  await page.goto('/')
  await expect(page.getByRole('heading')).toHaveText('Hello World 🚀')
  await expect(page.getByText('userA')).toBeVisible()
})
