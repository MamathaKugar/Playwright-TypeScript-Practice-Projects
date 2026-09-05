import { expect, Locator, Page } from '@playwright/test';

export class ProductsPage  {

    readonly productPageHeading: Locator;
    readonly products: Locator;
    readonly continueShoppingButton: Locator;
    readonly viewCartButton: Locator;
    readonly productViewLinks: Locator;

    readonly quantityInput: Locator;
    readonly productName: Locator;
    readonly productPrice: Locator;
    readonly addToCartButton: Locator;

    constructor(page: Page) {

        this.productPageHeading = page.getByText('All Products');
        this.products = page.locator('.product-image-wrapper');
        this.continueShoppingButton = page.getByRole('button', { name:'Continue Shopping'});
        this.viewCartButton = page.getByRole('link',{ name: 'Cart' });
        this.productViewLinks = page.getByText('View Product');

        this.quantityInput = page.locator('#quantity');
        this.productName = page.locator('.product-information h2');
        this.productPrice = page.locator('.product-information span span');
        this.addToCartButton = page.getByRole('button',{ name: /Add to cart/i });
    }

    async addFirstProductToCart(index: number) {
        const firstProduct = this.products.nth(index);
        await firstProduct.hover();
        await firstProduct.getByText('Add to cart').click();
    }

    async addSecondProductToCart(index: number) {
        const secondProduct = this.products.nth(index);
        await secondProduct.hover();
        await secondProduct.getByText('Add to cart').click();       
    }

    async continueShopping() {
        await this.continueShoppingButton.click();
    }

    async viewCart() {
        await this.viewCartButton.click();
    }

    async openFirstProduct() {
        await this.productViewLinks.first().click();
    }

    async getFirstProductName() {
        const name = await this.products.first().locator('.productinfo p').innerText();
        return name.trim();
    }

    async getFirstProductPrice(){
        const price = await this.products.first().locator('.productinfo h2').innerText();
        return price.trim();
    }

    async getProductName() {
        return (await this.productName.innerText()).trim();
    }

    async getProductPrice(){
        return (await this.productPrice.innerText()).trim();
    }

    async setProductQuantity(quantity: Number) {
        await this.quantityInput.fill(String(quantity));
    }

    async getProductQuantity() {
        const quantity =await this.quantityInput.inputValue();
        return Number(quantity);
    }
    
    async addProductToCart() {
        await this.addToCartButton.click();
    }       
}