import { expect, Locator, Page } from '@playwright/test';
import loginTestData from '../test-data/loginTestData.json'

export class SignupInfo {

    private readonly titleRadiobtn: Locator;
    private readonly passwordInput: Locator;
    private readonly dayDropdown: Locator;
    private readonly monthDropdown: Locator;
    private readonly yearDropdown: Locator;
    private readonly newsletterCheckbox: Locator;
    private readonly partnersCheckbox: Locator;
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly CompanyInput: Locator;
    private readonly addressInput: Locator;
    private readonly address2Input: Locator;
    private readonly countryDropdown: Locator;
    private readonly stateInput: Locator;
    private readonly cityInput: Locator;
    private readonly zipcodeInput: Locator;
    private readonly mobileNumInput: Locator;
    private readonly createAccountbtn: Locator;
    private readonly accountCreatedmsg: Locator;
    
    
    constructor(page: Page){

        this.titleRadiobtn = page.getByRole('radio', { name: 'Mr.'});
        this.passwordInput = page.getByRole('textbox', { name: 'Password *'});
        this.dayDropdown = page.locator('[data-qa="days"]');
        this.monthDropdown = page.locator('[data-qa="months"]');
        this.yearDropdown = page.locator('[data-qa="years"]');
        this.newsletterCheckbox = page.getByRole('checkbox', { name: 'Sign up for our newsletter!'});
        this.partnersCheckbox = page.getByRole('checkbox', {name: 'Receive special offers from our partners!'});
        this.firstNameInput = page.getByRole('textbox', {name: 'First name *'});
        this.lastNameInput = page.getByRole('textbox', {name: 'Last name *'});
        this.CompanyInput = page.locator('#company');
        this.addressInput = page.getByRole('textbox', {name: 'Address *'});
        this.address2Input = page.getByRole('textbox', {name: 'Address2 *'});
        this.countryDropdown = page.getByRole('combobox', {name: 'Country *'});
        this.stateInput = page.getByRole('textbox', {name: 'State *'});
        this.cityInput = page.getByRole('textbox', {name: 'City *'});
        this.zipcodeInput = page.getByRole('textbox', {name: 'Zipcode *'});
        this.mobileNumInput = page.getByRole('textbox', {name: 'Mobile Number *'});
        this.createAccountbtn = page.getByRole('button', {name: 'Create Account'});
        this.accountCreatedmsg = page.getByText('Account Created!');
        
    }

    async createNewUserAccount(): Promise<string> {
        let data =loginTestData.RegisterData;
        await this.titleRadiobtn.click();
        await this.passwordInput.fill(data.password);
        await this.dayDropdown.selectOption(data.day);
        await this.monthDropdown.selectOption(data.month);
        await this.yearDropdown.selectOption(data.year);
        await this.newsletterCheckbox.check();
        await this.partnersCheckbox.check();
        await this.firstNameInput.fill(data.firstName);
        await this.lastNameInput.fill(data.lastName);
        await this.CompanyInput.fill(data.company);
        await this.addressInput.fill(data.address);
        await this.address2Input.fill(data.address2);
        await this.countryDropdown.selectOption(data.country);
        await this.stateInput.fill(data.state);
        await this.cityInput.fill(data.city);
        await this.zipcodeInput.fill(data.zipcode);
        await this.mobileNumInput.fill(data.mobileNumber);
        await this.createAccountbtn.click();
        return (await this.accountCreatedmsg.innerText()).trim();
    }


}
