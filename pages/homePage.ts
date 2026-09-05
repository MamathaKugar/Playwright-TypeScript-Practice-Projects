import{expect, Locator, Page} from '@playwright/test';

export class HomePage  {

     readonly homeLink: Locator;
     readonly productsLink: Locator;
     readonly cartLink: Locator;
     readonly signuporLoginLink: Locator;
     readonly logout: Locator;
     readonly deleteAccount: Locator;
     readonly loggedInAs: Locator;
    readonly accountdeleteddmsg: Locator;
     
    
    constructor(page: Page) {

        this.homeLink = page.getByRole('link', { name: 'Home' });
        this.productsLink = page.getByRole('link', { name: 'Products' });
        this.cartLink = page.getByRole('link', { name: 'Cart' });
        this.signuporLoginLink = page.getByRole('link', { name: 'Signup / Login' });
        this.logout = page.getByRole('link',{name: 'Logout'})
        this.deleteAccount = page.getByRole('link', { name: 'Delete Account' });
        this.loggedInAs = page.locator('a').filter({ hasText: 'Logged in as' });
        this.accountdeleteddmsg = page.getByText('Account Deleted!');
    
    
    }
     async getHomeLink() {
        return this.homeLink;
    }

    async openProductsPage() {
        return this.productsLink;
    }

    async openCartPage () {
        return this.cartLink;    
    }
    
    async opensignuporLoginpage() {
        return this.signuporLoginLink;
    }
   
    async navigateToSignuporLogin() {
        await this.signuporLoginLink.click();
    }

    async Logout() {
        await this.logout.click();      
    }

    async DeleteAccount(): Promise<string> {
        await this.deleteAccount.click();
        return (await this.accountdeleteddmsg.innerText()).trim();
    }

    async navigateToProducts() {
        await this.productsLink.click();
    }
}