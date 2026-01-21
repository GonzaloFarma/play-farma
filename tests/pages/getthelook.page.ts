import { Page } from "@playwright/test";

/**
 * Page Object Model para GetTheLook
 * https://getthelook.com.ar
 */

export class GetTheLookPage {
  readonly page: Page;
  readonly url = "https://getthelook.com.ar";

  // Selectores comunes - Basados en inspección real del sitio
  readonly searchInput =
    'input[placeholder"Buscar en Get the Look..."]'; // Input de búsqueda
  readonly searchButton = 'button:has-text("¿Qué estás buscando?...")'; // Botón de búsqueda
  readonly cartButton = 'a[href*="/checkout/#/cart"]'; // Link del carrito
  readonly loginButton = 'button:has-text("Iniciar sesión")'; // Botón de login
  readonly favoriteButton = 'a[href="/favoritos"]'; // Link de favoritos
  readonly menuButton = 'button:has-text("Menú")'; // Botón del menú móvil

  // Selectores del formulario de login
  readonly emailInput = 'input[placeholder="Correo electrónico"]';
  readonly passwordInput = 'input[name="show-password"]';
  readonly submitLoginButton = 'button:has-text("EntrarIngresar")';

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
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState("networkidle");
  }

  /**
   * Realiza el login completo con email y contraseña
   */
  async performLogin(email: string, password: string) {
    await this.page.getByRole('button', { name: 'Iniciar sesión' }).click();
    await this.page.getByPlaceholder('Correo electrónico').click();
    await this.page.getByPlaceholder('Correo electrónico').fill(email);
    await this.page.getByPlaceholder('Correo electrónico').press('Tab');
    await this.page.getByRole('textbox', { name: 'show-password' }).fill(password);
    await this.page.getByRole('button', { name: 'EntrarIngresar' }).click();
    await this.page.waitForLoadState("networkidle");
  }

  /**
   * Accede a favoritos
   */
  async goToFavorites() {
    await this.page.click(this.favoriteButton);
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
   * Verifica si el botón de login es visible
   */
  async isLoginButtonVisible(): Promise<boolean> {
    return await this.page.isVisible(this.loginButton);
  }
}
