import { expect, Locator, Page } from '@playwright/test';

export type CartRow = {
    name: string;
    price: string;
    quantity: string;
    total: string;
};

export class CartPage {

    readonly cartTable: Locator;
    readonly cartProducts: Locator;
    readonly cartProductName: Locator;
    readonly cartProductPrice: Locator;
    readonly cartProductQuantity: Locator;
    readonly cartProductTotal: Locator;

    constructor(page: Page) {

        this.cartTable = page.locator('#cart_info_table');
        this.cartProducts = page.locator('#cart_info_table tbody tr');
        this.cartProductName = page.locator('#cart_info_table tbody tr .cart_description h4 a');
        this.cartProductPrice = page.locator('#cart_info_table tbody tr .cart_price p');
        this.cartProductQuantity = page.locator('#cart_info_table tbody tr .cart_quantity button');
        this.cartProductTotal = page.locator('#cart_info_table tbody tr .cart_total_price');
    }

    async verifyCartPage(): Promise<void> {
        await expect(this.cartTable).toBeVisible();
    }

    async getCartProductCount(): Promise<number> {
        return await this.cartProducts.count();
    }

    async getCartProductName(index: number): Promise<string> {
        return (await this.cartProductName.nth(index).innerText()).replace(/\s+/g, ' ').trim();
    }

    async getCartProductPrice(index: number): Promise<string> {
        return (await this.cartProductPrice.nth(index).innerText()).trim();
    }

    async getCartProductQuantity(index: number): Promise<string> {
        return (await this.cartProductQuantity.nth(index).innerText()).trim();
    }

    async getCartProductTotal(index: number): Promise<string> {
        return (await this.cartProductTotal.nth(index).innerText()).trim();
    }

    /** Reads one cart row (index starts at 0). All values are the text shown on the page, e.g. "Rs. 500". */
    async getProductDetails(index: number): Promise<CartRow> {
        return {
            name: await this.getCartProductName(index),
            price: await this.getCartProductPrice(index),
            quantity: await this.getCartProductQuantity(index),
            total: await this.getCartProductTotal(index),
        };
    }
}
