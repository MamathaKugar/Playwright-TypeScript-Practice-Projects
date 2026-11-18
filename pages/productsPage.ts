import { expect, Locator, Page } from '@playwright/test';

export class ProductsPage {

    readonly productPageHeading: Locator;
    readonly products: Locator;
    readonly continueShoppingButton: Locator;
    readonly viewCartLink: Locator;
    readonly productViewLinks: Locator;

    readonly quantityInput: Locator;
    readonly productName: Locator;
    readonly productPrice: Locator;
    readonly addToCartButton: Locator;

    constructor(page: Page) {

        this.productPageHeading = page.getByRole('heading', { name: 'All Products' });
        this.products = page.locator('.product-image-wrapper');
        this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
        // "View Cart" link inside the "Added!" pop-up
        this.viewCartLink = page.locator('#cartModal').getByRole('link', { name: 'View Cart' });
        this.productViewLinks = page.getByRole('link', { name: 'View Product' });

        this.quantityInput = page.locator('#quantity');
        this.productName = page.locator('.product-information h2');
        this.productPrice = page.locator('.product-information span span');
        this.addToCartButton = page.locator('.product-information').getByRole('button', { name: /Add to cart/i });
    }

    async verifyProductsPage(): Promise<void> {
        await expect(this.productPageHeading).toBeVisible();
    }

    async verifyProductsAreAvailable(): Promise<void> {
        const productCount = await this.products.count();
        expect(productCount, 'At least one product should be available').toBeGreaterThan(0);
    }

    /** Hovers the product card and clicks its "Add to cart" button. */
    async addProductToCartByIndex(index: number): Promise<void> {
        const product = this.products.nth(index);
        await product.hover();
        // Each card has two "Add to cart" buttons (normal + hover overlay); use the normal one
        await product.locator('.productinfo .add-to-cart').click();
    }

    async continueShopping(): Promise<void> {
        await this.continueShoppingButton.click();
    }

    async viewCart(): Promise<void> {
        await this.viewCartLink.click();
    }

    async openFirstProduct(): Promise<void> {
        await this.productViewLinks.first().click();
    }

    async getFirstProductName(): Promise<string> {
        const name = await this.products.first().locator('.productinfo p').innerText();
        return name.replace(/\s+/g, ' ').trim();
    }

    async getFirstProductPrice(): Promise<string> {
        const price = await this.products.first().locator('.productinfo h2').innerText();
        return price.trim();
    }

    async getProductName(): Promise<string> {
        return (await this.productName.innerText()).trim();
    }

    async getProductPrice(): Promise<string> {
        return (await this.productPrice.innerText()).trim();
    }

    async setProductQuantity(quantity: number): Promise<void> {
        await this.quantityInput.fill(String(quantity));
    }

    async getProductQuantity(): Promise<number> {
        const quantity = await this.quantityInput.inputValue();
        return Number(quantity);
    }

    async addProductToCart(): Promise<void> {
        await this.addToCartButton.click();
    }
}
