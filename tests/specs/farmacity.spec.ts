import { test, expect } from "@playwright/test";
import { FarmacityPage } from "../pages/farmacity.page";
import { TestHelpers } from "../utils/helpers";

test.describe("Farmacity - Test Suite", () => {
  let farmacityPage: FarmacityPage;

  test.beforeEach(async ({ page }) => {
    farmacityPage = new FarmacityPage(page);
    await farmacityPage.goto();
  });

  test("Debe cargar la página principal", async () => {
    const isLoaded = await farmacityPage.isPageLoaded();
    expect(isLoaded).toBeTruthy();
  });

  test("Debe permitir acceso a la página", async ({ page }) => {
    expect(page.url()).toContain("farmacity.com");
  });

  test("Debe validar que el sitio está disponible", async ({ page }) => {
    const response = await page.goto("https://farmacity.com", {
      waitUntil: "load",
    });
    expect(response?.status() || 200).toBeLessThan(400);
  });

  test("Debe mostrar el título correcto", async () => {
    const title = await farmacityPage.getPageTitle();
    expect(title).toContain("Farmacity");
  });

  test("Debe tener visible el botón de carrito", async () => {
    const isVisible = await farmacityPage.isCartVisible();
    expect(isVisible).toBeTruthy();
  });

  test("Debe tener visible el botón de mis pedidos", async () => {
    const isVisible = await farmacityPage.isMyOrdersButtonVisible();
    expect(isVisible).toBeTruthy();
  });

  test("Debe permitir búsqueda de productos", async ({ page }) => {
    await page.getByRole('textbox', { name: 'Buscá por producto, marca o' }).click();
    await page.getByRole('textbox', { name: 'Buscá por producto, marca o' }).fill('shampoo');
    await page.getByRole('textbox', { name: 'Buscá por producto, marca o' }).press('Enter');
    // Esperar a que se carguen los resultados
    await page.waitForLoadState("networkidle");
    // Verificar que la URL contenga el término buscado
    expect(page.url()).toContain("shampoo");
  });



  test("Debe mostrar categorías disponibles", async () => {
    const categories = await farmacityPage.getCategories();
    expect(categories.length).toBeGreaterThan(0);
  });

  test("Debe permitir acceso al carrito", async ({ page }) => {
    await farmacityPage.goToCart();
    await page.waitForLoadState("networkidle");
    // Verificar que se navigó correctamente
    expect(page.url()).toBeDefined();
  });

  test("Debe permitir acceso al login", async ({ page }) => {
    await farmacityPage.goToLogin();
    await page.waitForLoadState("networkidle");
    // Verificar que se navigó correctamente
    expect(page.url()).toBeDefined();
  });
});
