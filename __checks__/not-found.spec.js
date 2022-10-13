// @ts-check
const { test, expect } = require('@playwright/test');
const {MAGIC_NUMBER} = require('./_constants')

test('404 page is doggified', async ({ page }) => {
  await page.goto('https://www.stefanjudis.com/NOT_FOUND/');

  await expect(page).toHaveTitle(/Not found/);

  const videoSource = page.locator('video > source');
  await expect(videoSource).toHaveAttribute('src', /^\/\/videos.ctfassets.net/);
  const firstVideoURL = await videoSource.getAttribute('src');

  const changeVideoBtn = page.locator('text="Okay, show me another one!"');
  await changeVideoBtn.click();

  const secondVideoURL = await videoSource.getAttribute('src');

  console.log(MAGIC_NUMBER, 'LISA')

  expect(firstVideoURL).not.toBe(secondVideoURL);
});
