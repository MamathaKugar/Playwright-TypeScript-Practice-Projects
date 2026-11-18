import { expect, Locator, Page } from '@playwright/test';

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
    readonly logoutbtm: Locator;

    constructor(page:Page){
        
        this.page =page;
        this.loginEmailAddress = page.getByRole('textbox', { name: 'Email Address'});
        this.loginPassword = page.getByRole('button', { name: 'Signup'});
        this.loginbtn = page.getByRole('textbox', {name: 'Password'});
        this.invalidLoginErrormsg = page.getByText('Your email or password is incorrect!');
        this.signupName = page.getByRole('textbox', { name: 'Name'});
        this.signupEmailAddress = page.getByRole('textbox', { name: 'Email Address'});
        this.signupbtn = page.getByRole('button', { name: 'Signup'});
        this.emailAlreadyExistMsg = page.getByText('Email Address already exist!');
        this.logoutbtm = page.getByRole('link', {name: 'Logout'});

    }

    async loginasExistingUser(index: number,email: string, password: string): Promise<void> {       
        await this.loginEmailAddress.nth(index).fill(email);
        await this.loginPassword.fill(password);
        await this.loginbtn.click();       
    }

    async loggedinMessage():Promise<string>{
        const message = await this.page.locator('a:has(i.fa-user) b').innerText();
        return message;
    }

    async newUserSignup(index: number, name: string, email: string): Promise<void>{     
        await this.signupName.fill(name);
        await this.signupEmailAddress.nth(index).fill(email);
        await this.signupbtn.click();
    }

    async getInvalidLoginErrorMsg() {
        return (await this.invalidLoginErrormsg.innerText()).trim();
    }

    async getEmailAlreadyExistMS(){
        return (await this.emailAlreadyExistMsg.innerText()).trim();
    }
}



