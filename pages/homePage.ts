import { Locator, Page } from '@playwright/test';

export class HomePage {

    readonly homeLink: Locator;
    readonly productsLink: Locator;
    readonly cartLink: Locator;
    readonly signuporLoginLink: Locator;
    readonly logoutLink: Locator;
    readonly deleteAccountLink: Locator;
    readonly loggedInAs: Locator;
    readonly accountDeletedMsg: Locator;
    readonly continueButton: Locator;

    constructor(page: Page) {

        // Scoped to the header menu so links such as "View Cart" in the cart pop-up don't also match
        const menu = page.locator('.shop-menu');
        this.homeLink = menu.getByRole('link', { name: 'Home' });
        this.productsLink = menu.getByRole('link', { name: 'Products' });
        this.cartLink = menu.getByRole('link', { name: 'Cart' });
        this.signuporLoginLink = menu.getByRole('link', { name: 'Signup / Login' });
        this.logoutLink = menu.getByRole('link', { name: 'Logout' });
        this.deleteAccountLink = menu.getByRole('link', { name: 'Delete Account' });
        this.loggedInAs = menu.locator('a').filter({ hasText: 'Logged in as' });
        this.accountDeletedMsg = page.locator('[data-qa="account-deleted"]');
        this.continueButton = page.locator('[data-qa="continue-button"]');
    }

    async openHomePage(): Promise<void> {
        await this.homeLink.click();
    }

    async openProductsPage(): Promise<void> {
        await this.productsLink.click();
    }

    async openCartPage(): Promise<void> {
        await this.cartLink.click();
    }

    async openSignupLoginPage(): Promise<void> {
        await this.signuporLoginLink.click();
    }

    async logout(): Promise<void> {
        await this.logoutLink.click();
    }

    /** Clicks "Continue" on the Account Created / Account Deleted pages. */
    async clickContinue(): Promise<void> {
        await this.continueButton.click();
    }

    async deleteAccount(): Promise<string> {
        await this.deleteAccountLink.click();
        return (await this.accountDeletedMsg.innerText()).trim();
    }
}
