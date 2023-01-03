import { test, expect } from '@playwright/test'

test('セッショントークンがない時、データが表示されないか', async ({
  page,
  context,
}) => {
  await context.clearCookies()
  await page.goto('/fetch-cc')
  await expect(page.getByRole('heading')).toHaveText('Notes page by CC')
  await expect(page.getByText('Note 1')).not.toBeVisible()
})

test('セッショントークンがある時、データが表示されているか', async ({
  page,
}) => {
  await page.goto('/fetch-cc')
  await expect(page.getByRole('heading')).toHaveText('Notes page by CC')
  await expect(page.getByText('Note 1')).toBeVisible()
})
