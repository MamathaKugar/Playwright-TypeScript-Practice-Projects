import { expect, Locator, Page } from '@playwright/test';

export class ProjectUtils {

    readonly page: Page;
    readonly cartTable: Locator;
    readonly cartProducts: Locator;
    readonly cartProductName: Locator;
    readonly cartProductPrice: Locator;
    readonly cartProductQuantity: Locator;
    readonly cartProductTotal: Locator;
    readonly productViewLinks: Locator;
    readonly products: Locator;
    readonly productPageHeading: Locator;

    constructor(page: Page) {

        this.page = page;
        this.cartTable = page.locator('#cart_info_table');
        this.cartProducts = page.locator('#cart_info_table tbody tr');
        this.cartProductName = page.locator('#cart_info_table tbody tr .cart_description h4 a');
        this.cartProductPrice = page.locator('#cart_info_table tbody tr .cart_price p');
        this.cartProductQuantity = page.locator('#cart_info_table tbody tr .cart_quantity button');
        this.cartProductTotal = page.locator('#cart_info_table tbody tr .cart_total_price');
        this.productViewLinks = page.getByText('View Product');
        this.products = page.locator('.product-image-wrapper');
        this.productPageHeading = page.getByText('All Products');
    }

    async open(url: string) {
        await this.page.goto(url);
    }

    async refreshPage() {
        await this.page.reload();
    }

    async getPageTitle() {
        return await this.page.title();
    }

    async verifyProductsPage() {
        await expect(this.productPageHeading).toBeVisible();
    }

    async verifyProductsAreAvailable() {
        const productCount = await this.products.count();
        expect(productCount,'At least one product should be available').toBeGreaterThan(0);
    }

    async verifyProductDetailPageAvailable() {
        await expect(this.productViewLinks).toBeVisible();
    }

    async verifyCartPage() {
        await expect(this.cartTable).toBeVisible();
    }

    async verifyProductAdded() {
        await expect(this.cartProducts.first()).toBeVisible();
    }

    async getCartProductTotal(index: number){
        return (await this.cartProductTotal.nth(index).innerText());
    }

    async getCartProductQuantity(index: number) {
        return (await this.cartProductQuantity.nth(index).innerText());
    }

    async verifyProductDetails(index: number) {
        const actualName =await this.cartProductName.nth(index).innerText();
        const actualPrice =await this.cartProductPrice.nth(index).innerText();
        const actualQuantity =await this.cartProductQuantity.nth(index).innerText();
        const actualTotal = await this.cartProductTotal.nth(index).innerText();
        return {
        actualName,
        actualPrice,
        actualQuantity,
        actualTotal
        }    
    }

    async verifyQuantityRemainsUnchanged(index: number,initialQuantity: number) {
        const actualQuantity = await this.getCartProductQuantity(index);
        expect.soft(actualQuantity).toBe(initialQuantity);
    }

    async verifyProductTotal(index: number,expectedPrice: number, initialQuantity: number) {
        const expectedTotal = expectedPrice * initialQuantity;
        const actualTotal = await this.getCartProductTotal(index);
        expect(actualTotal).toBe(`Rs. ${expectedTotal}`);
    }

}