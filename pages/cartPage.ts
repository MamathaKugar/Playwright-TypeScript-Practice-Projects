import { expect, Locator, Page } from '@playwright/test';

export class CartPage  {

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

    async getCartProductName(index: number) {
        return (await this.cartProductName.nth(index).innerText());
    }

    async getCartProductPrice(index: number) {
        return (await this.cartProductPrice.nth(index).innerText());
    }

    async getCartProductCount() {
        return await this.cartProducts.count();
    }
    

}