import { test, expect } from '@playwright/test'

test('セッショントークンがない時、フェッチデータが表示されない', async ({
  page,
  context,
}) => {
  await context.clearCookies()
  await page.goto('/task-crud')
  await expect(page.getByText('Data fetching in server failed')).toBeVisible()
  await expect(page.getByText('Task 1')).not.toBeVisible()
  await expect(page.getByText('Task 2')).not.toBeVisible()
})

test('クラッド操作は適切に機能するか', async ({ page }) => {
  await page.goto('/task-crud')
  await expect(page.getByRole('heading')).toHaveText(
    'Click a title on the left to view detail !'
  )
  const initialItemNumber = 2
  await expect(page.getByRole('listitem')).toHaveCount(initialItemNumber)
  const firstTask = page.getByRole('listitem').nth(0)
  await expect(firstTask).toHaveText('Task 1')
  // Create new task
  await page.getByRole('textbox').fill('Task new')
  await page.getByRole('button', { name: 'Create' }).click()
  await expect(page.getByRole('listitem')).toHaveCount(initialItemNumber + 1)
  const newTask = page.getByRole('listitem').nth(-1)
  await expect(newTask).toHaveText('Task new')
  // Update task
  await page.getByTestId('task-edit-icon').nth(-1).click()
  await page.getByRole('textbox').fill('Task new updated')
  await page.getByRole('button', { name: 'Update' }).click()
  const updatedTask = page.getByRole('listitem').nth(-1)
  await expect(updatedTask).toHaveText('Task new updated')
  // Delete task
  await page.getByTestId('task-delete-icon').nth(-1).click()
  const taskList = page.getByRole('listitem')
  await expect(taskList).toHaveCount(2)
  // Toggle completed checkbox
  await expect(taskList.first().getByRole('checkbox')).not.toBeChecked()
  await taskList.first().getByRole('checkbox').click()
  await expect(taskList.first().getByRole('checkbox')).toBeChecked()
  await taskList.first().getByRole('checkbox').click()
  await expect(taskList.first().getByRole('checkbox')).not.toBeChecked()
})

test('動的セグメントのTaskプロパティは動作するか', async ({ page }) => {
  const taskId1 = '49c71dd2-b343-4001-be13-dd75e9f67682'
  const taskId2 = 'b0359322-c5c0-49b7-8fa5-fb6623cbe2be'
  page.goto('/task-crud')
  await expect(page.getByRole('heading')).toHaveText(
    'Click a title on the left to view detail !'
  )
  // Show dynamic segment 1
  await page.getByRole('link', { name: 'Task 1' }).click()
  await page.waitForNavigation()
  expect(page.url()).toBe(`http://localhost:3000/task-crud/${taskId1}`)
  await expect(page.getByTestId('title-dynamic-segment')).toHaveText(
    'Title: Task 1'
  )
  // Show dynamic segment 2
  await page.getByRole('link', { name: 'Task 2' }).click()
  await page.waitForNavigation()
  expect(page.url()).toBe(`http://localhost:3000/task-crud/${taskId2}`)
  await expect(page.getByTestId('title-dynamic-segment')).toHaveText(
    'Title: Task 2'
  )
})
