import { Locator, Page } from '@playwright/test';

export class LoginPage {

    readonly page: Page;
    readonly loginEmailAddress: Locator;
    readonly loginPassword: Locator;
    readonly loginbtn: Locator;
    readonly invalidLoginErrormsg: Locator;
    readonly signupName: Locator;
    readonly signupEmailAddress: Locator;
    readonly signupbtn: Locator;
    readonly emailAlreadyExistMsg: Locator;
    readonly loggedInAs: Locator;

    constructor(page: Page) {

        this.page = page;
        this.loginEmailAddress = page.locator('[data-qa="login-email"]');
        this.loginPassword = page.locator('[data-qa="login-password"]');
        this.loginbtn = page.locator('[data-qa="login-button"]');
        this.invalidLoginErrormsg = page.getByText('Your email or password is incorrect!');
        this.signupName = page.locator('[data-qa="signup-name"]');
        this.signupEmailAddress = page.locator('[data-qa="signup-email"]');
        this.signupbtn = page.locator('[data-qa="signup-button"]');
        this.emailAlreadyExistMsg = page.getByText('Email Address already exist!');
        this.loggedInAs = page.locator('a').filter({ hasText: 'Logged in as' });
    }

    async loginasExistingUser(email: string, password: string): Promise<void> {
        await this.loginEmailAddress.fill(email);
        await this.loginPassword.fill(password);
        await this.loginbtn.click();
    }

    /** Returns the full header text, e.g. "Logged in as Mamatha". */
    async loggedinMessage(): Promise<string> {
        return (await this.loggedInAs.innerText()).trim();
    }

    async newUserSignup(name: string, email: string): Promise<void> {
        await this.signupName.fill(name);
        await this.signupEmailAddress.fill(email);
        await this.signupbtn.click();
    }

    async getInvalidLoginErrorMsg(): Promise<string> {
        return (await this.invalidLoginErrormsg.innerText()).trim();
    }

    async getEmailAlreadyExistMsg(): Promise<string> {
        return (await this.emailAlreadyExistMsg.innerText()).trim();
    }
}
