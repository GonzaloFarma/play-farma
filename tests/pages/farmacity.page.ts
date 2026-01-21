import { Page } from "@playwright/test";

/**
 * Page Object Model para Farmacity
 * https://farmacity.com
 */

export class FarmacityPage {
  readonly page: Page;
  readonly url = "https://farmacity.com";

  // Selectores comunes - Basados en inspección real del sitio
  readonly searchInput =
    'input[placeholder="Buscá por producto, marca o categoría... "]'; // Input de búsqueda
  readonly searchButton = 'button[type="submit"]'; // Botón de búsqueda
  readonly cartButton = 'button:has-text("0")'; // Botón del carrito con ícono
  readonly miPedidosButton = 'button:has-text("Mis pedidos")'; // Botón de mis pedidos
  readonly categoryMenu = "nav a, nav button"; // Links de categorías en el menú
  readonly loginButton = 'button:has-text("Iniciar sesión")'; // Botón de login

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navega a la página principal
   */
  async goto() {
    await this.page.goto(this.url, { waitUntil: "load" });
  }

  /**
   * Realiza una búsqueda de producto
   */
  async searchProduct(productName: string) {
    await this.page.fill(this.searchInput, productName);
    await this.page.click(this.searchButton);
    await this.page.waitForLoadState("networkidle");
  }

  /**
   * Accede al carrito de compras
   */
  async goToCart() {
    await this.page.click(this.cartButton);
    await this.page.waitForLoadState("networkidle");
  }

  /**
   * Accede al login
   */
  async goToLogin() {
    await this.page.click(this.miPedidosButton);
    await this.page.waitForLoadState("networkidle");
  }

  /**
   * Accede a mis pedidos
   */
  async goToMyOrders() {
    await this.page.click(this.miPedidosButton);
    await this.page.waitForLoadState("networkidle");
  }

  /**
   * Verifica si la página está cargada
   */
  async isPageLoaded(): Promise<boolean> {
    try {
      await this.page.waitForSelector("body", { timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Obtiene el título de la página
   */
  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Verifica si el carrito es visible
   */
  async isCartVisible(): Promise<boolean> {
    return await this.page.isVisible(this.cartButton);
  }

  /**
   * Verifica si el botón de mis pedidos es visible
   */
  async isMyOrdersButtonVisible(): Promise<boolean> {
    return await this.page.isVisible(this.miPedidosButton);
  }

  /**
   * Obtiene todos los enlaces de categorías disponibles
   */
  async getCategories(): Promise<string[]> {
    const elements = await this.page.locator(this.categoryMenu).all();
    const categories: string[] = [];
    for (const element of elements) {
      const text = await element.textContent();
      if (text) {
        categories.push(text.trim());
      }
    }
    return categories;
  }

}
