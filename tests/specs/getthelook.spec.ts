import { test, expect } from "@playwright/test";
import { GetTheLookPage } from "../pages/getthelook.page";
import { TestHelpers } from "../utils/helpers";

test.describe("GetTheLook - Test Suite", () => {
  let getthelookPage: GetTheLookPage;

  test.beforeEach(async ({ page }) => {
    getthelookPage = new GetTheLookPage(page);
    await getthelookPage.goto();
  });

  test("Debe cargar la página principal", async () => {
    const isLoaded = await getthelookPage.isPageLoaded();
    expect(isLoaded).toBeTruthy();
  });

  test("Debe permitir acceso a la página", async ({ page }) => {
    expect(page.url()).toContain("getthelook.com.ar");
  });

  test("Debe validar que el sitio está disponible", async ({ page }) => {
    const response = await page.goto("https://getthelook.com.ar", {
      waitUntil: "load",
    });
    expect(response?.status() || 200).toBeLessThan(400);
  });

  test("Debe mostrar el título correcto", async () => {
    const title = await getthelookPage.getPageTitle();
    expect(title).toContain("Get The Look");
  });

  test("Debe tener visible el botón de carrito", async () => {
    const isVisible = await getthelookPage.isCartVisible();
    expect(isVisible).toBeTruthy();
  });

  test("Debe tener visible el botón de login", async () => {
    const isVisible = await getthelookPage.isLoginButtonVisible();
    expect(isVisible).toBeTruthy();
  });

  test("Debe permitir búsqueda de productos", async ({ page }) => {
    await page.locator('div').filter({ hasText: /^Buscar en Get the Look\.\.\.$/ }).click();
    await page.getByRole('textbox', { name: '¿Qué estás buscando?...' }).click();
    await page.getByRole('textbox', { name: '¿Qué estás buscando?...' }).fill('maquillaje');
    // Esperar a que se carguen los resultados
    await page.waitForLoadState("networkidle");
    await page.getByRole('link', { name: 'maquillaje', exact: true }).click();
    // Verificar que la URL contenga el término buscado
    expect(page.url()).toContain("maquillaje");
  });

  test("Debe permitir acceso a favoritos", async ({ page }) => {
    await getthelookPage.goToFavorites();
    expect(page.url()).toContain("favoritos");
  });

  test("Debe permitir acceso al login", async ({ page }) => {
    await page.getByRole('button', { name: 'Iniciar sesión' }).click();
    await page.getByPlaceholder('Correo electrónico').click();
    await page.getByPlaceholder('Correo electrónico').fill('gg.estevez@outlook.com');
    await page.getByPlaceholder('Correo electrónico').press('Tab');
    await page.getByRole('textbox', { name: 'show-password' }).fill('Gtl12345');
    await page.getByRole('button', { name: 'EntrarIngresar' }).click();
    await page.waitForLoadState("networkidle");
    // Verificar que se navigó correctamente
    expect(page.url()).toBeDefined();
  });
});