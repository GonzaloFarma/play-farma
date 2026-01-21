import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.getthelook.com.ar/');
  await page.locator('div').filter({ hasText: /^Buscar en Get the Look\.\.\.$/ }).click();
  await page.getByRole('textbox', { name: '¿Qué estás buscando?...' }).click();
  await page.getByRole('textbox', { name: '¿Qué estás buscando?...' }).fill('maquillaje');
  await page.getByRole('link', { name: 'maquillaje', exact: true }).click();
});