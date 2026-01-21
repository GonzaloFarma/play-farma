import { Page } from "@playwright/test";

/**
 * Funciones auxiliares para las pruebas
 */

export class TestHelpers {
  /**
   * Espera a que se cargue la página completamente
   */
  static async waitForPageLoad(page: Page, timeout: number = 30000) {
    await page.waitForLoadState("networkidle", { timeout });
  }

  /**
   * Realiza una búsqueda genérica
   */
  static async performSearch(
    page: Page,
    searchSelector: string,
    searchTerm: string
  ) {
    await page.fill(searchSelector, searchTerm);
    await page.press(searchSelector, "Enter");
    await this.waitForPageLoad(page);
  }

  /**
   * Verifica si un elemento es visible
   */
  static async isElementVisible(
    page: Page,
    selector: string
  ): Promise<boolean> {
    try {
      await page.waitForSelector(selector, { timeout: 5000 });
      return await page.isVisible(selector);
    } catch {
      return false;
    }
  }

  /**
   * Obtiene el texto de un elemento
   */
  static async getElementText(page: Page, selector: string): Promise<string> {
    return (await page.textContent(selector)) || "";
  }

  /**
   * Hace scroll hasta un elemento
   */
  static async scrollToElement(page: Page, selector: string) {
    await page.locator(selector).scrollIntoViewIfNeeded();
  }
}
