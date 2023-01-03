import { test, expect } from '@playwright/test'

test('ナビゲーションの動作が機能しているか', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading')).toHaveText('Hello World 🚀')
  // nav to fetch-cc segment
  await page.getByRole('link', { name: 'CC_Fetch' }).click()
  await expect(page.getByRole('heading')).toHaveText('Notes page by CC')
  // nav to fetch-sc segment
  await page.getByRole('link', { name: 'SC_Fetch' }).click()
  await expect(page.getByRole('heading')).toHaveText('Notes page by SC')
  // nav to task-crud segment
  await page.getByRole('link', { name: 'CRUD' }).click()
  await expect(page.getByRole('heading')).toHaveText(
    'Click a title on the left to view detail !'
  )
})
