import { test, expect } from '@playwright/test'

const serverURL = 'http://localhost:3000'

test.describe('Frontend', () => {
  test('renders the homepage', async ({ page }) => {
    await page.goto(serverURL)

    await expect(page).toHaveTitle(/Ngày Hội An Lạc/)
    await expect(page.locator('html')).toHaveAttribute('lang', 'vi')
  })

  test('returns 404 for unknown paths', async ({ request }) => {
    const res = await request.get(`${serverURL}/khong-ton-tai`)
    expect(res.status()).toBe(404)
  })

  test('rejects preview without a valid secret', async ({ request }) => {
    const res = await request.get(`${serverURL}/next/preview?path=/&previewSecret=wrong`, {
      maxRedirects: 0,
    })
    expect(res.status()).toBe(403)
  })
})
