import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { HomePage } from '../pages/homePage';
import { SignupInfo } from '../pages/signupInfoPage';
import { ProjectUtils } from '../utils/projectUtils';
import loginTestData from '../test-data/loginTestData.json';
import urls from '../test-data/urls.json';


test.describe('Login and Signup', () => {

    let homePage: HomePage;
    let loginPage: LoginPage;
    let signupInfo: SignupInfo;
    let projectUtils: ProjectUtils;
    const signupData = loginTestData.signup;
    const loginData = loginTestData.login;
    const invalidData = loginTestData.invalidlogin;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        signupInfo = new SignupInfo(page);
        projectUtils = new ProjectUtils(page);

        await projectUtils.open(urls.AutomationExercise.url);
        await homePage.openSignupLoginPage();
    });

    test('TC_001_Register User @smoke', async () => {
        // A new email every run, so the test never hits "Email Address already exist!"
        const email = ProjectUtils.uniqueEmail('mamatha');
        await loginPage.newUserSignup(signupData.name, email);
        const message = await signupInfo.createNewUserAccount();
        expect(message).toMatch(/account created!/i);

        // Clean up: delete the account that was just created
        await homePage.clickContinue();
        await expect(homePage.loggedInAs).toContainText(signupData.name);
        const deletedMsg = await homePage.deleteAccount();
        expect(deletedMsg).toMatch(/account deleted!/i);
    });

    test('TC_002_Login User with correct email and password @regression', async () => {
        await loginPage.loginasExistingUser(loginData.email, loginData.password);
        const loggedinMessage = await loginPage.loggedinMessage();
        expect(loggedinMessage).toBe(`Logged in as ${loginData.name}`);
    });

    test('TC_003_Verify error message for failed login @regression', async () => {
        await loginPage.loginasExistingUser(invalidData.email, invalidData.password);
        const errorMessage = await loginPage.getInvalidLoginErrorMsg();
        expect(errorMessage).toBe('Your email or password is incorrect!');
    });

    test('TC_004_Logout successfully @regression', async ({ page }) => {
        await loginPage.loginasExistingUser(loginData.email, loginData.password);
        const loggedinMessage = await loginPage.loggedinMessage();
        expect.soft(loggedinMessage).toBe(`Logged in as ${loginData.name}`);
        await homePage.logout();
        // After logout the user is sent back to the login page and the login link is shown again
        await expect(page).toHaveURL(/\/login/);
        await expect(homePage.signuporLoginLink).toBeVisible();
        await expect(homePage.logoutLink).toBeHidden();
    });

});
