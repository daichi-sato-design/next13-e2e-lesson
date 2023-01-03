import { expect, test } from '@playwright/test'

test('セッショントークンがない時、データ取得ができないエラーの表示がされている', async ({
  page,
  context,
}) => {
  await context.clearCookies()
  await page.goto('/fetch-sc')
  await expect(page.getByText('Data fetching in server failed')).toBeVisible()
  await expect(page.getByText('Note 1')).not.toBeVisible()
})

test('セッショントークンある時、データ取得され表示されているか', async ({
  page,
}) => {
  await page.goto('/fetch-sc')
  await expect(page.getByRole('heading')).toHaveText('Notes page by SC')
  await expect(page.getByText('Note 1')).toBeVisible()
})
