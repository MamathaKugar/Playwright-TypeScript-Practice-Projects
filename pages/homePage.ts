import{expect, Locator, Page} from '@playwright/test';

export class HomePage  {

    readonly homeLink: Locator;
    readonly productsLink: Locator;
    readonly cartLink: Locator;
    readonly signuporLoginLink: Locator;
    readonly logoutbtn: Locator;
    readonly deleteAccount: Locator;
    readonly loggedInAs: Locator;
    readonly accountdeleteddmsg: Locator;
     
    
    constructor(page: Page) {

        this.homeLink = page.getByRole('link', { name: 'Home' });
        this.productsLink = page.getByRole('link', { name: 'Products' });
        this.cartLink = page.getByRole('link', { name: 'Cart' });
        this.signuporLoginLink = page.getByRole('link', { name: 'Signup / Login' });
        this.logoutbtn = page.getByRole('link',{name: 'Logout'})
        this.deleteAccount = page.getByRole('link', { name: 'Delete Account' });
        this.loggedInAs = page.locator('a').filter({ hasText: 'Logged in as' });
        this.accountdeleteddmsg = page.getByText('Account Deleted!');
      
    }
     async getHomeLink(): Promise<void> {
        await this.homeLink.click();
    }

    async openProductsPage(): Promise<void> {
        await this.productsLink.click();
    }

    async openCartPage(): Promise<void> {
        await this.cartLink.click();    
    }
    
    async opensignuporLoginpage(): Promise<void> {
        await this.signuporLoginLink.click();
    }
   
    async navigateToSignuporLogin(): Promise<void> {
        await this.signuporLoginLink.click();
    }

    async logout(): Promise<void> {
        await this.logoutbtn.click();      
    }

    async DeleteAccount(): Promise<string> {
        await this.deleteAccount.click();
        return (await this.accountdeleteddmsg.innerText()).trim();
    }

    async navigateToProducts(): Promise<void> {
        await this.productsLink.click();
    }
}