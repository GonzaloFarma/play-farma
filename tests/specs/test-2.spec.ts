import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.getthelook.com.ar/');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await page.getByPlaceholder('Correo electrónico').click();
  await page.getByPlaceholder('Correo electrónico').fill('gg.estevez@outlook.com');
  await page.getByPlaceholder('Correo electrónico').press('Tab');
  await page.getByRole('textbox', { name: 'show-password' }).fill('Gtl12345');
  await page.getByRole('button', { name: 'EntrarIngresar' }).click();
});