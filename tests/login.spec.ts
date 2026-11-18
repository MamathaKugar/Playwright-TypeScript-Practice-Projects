import{test, expect} from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { HomePage } from '../pages/homePage';
import { SignupInfo } from '../pages/signupInfoPage';
import { ProjectUtils } from '../utils/projectUtils';
import loginTestData from '../test-data/loginTestData.json'
import urls from '../test-data/urls.json'


test.describe('Playwright exercise', () => {

    let homePage: HomePage;
    let loginPage: LoginPage;
    let signupInfo: SignupInfo;
    let projectUtils: ProjectUtils;
    let signupData =loginTestData.signup;
    let loginData =loginTestData.login;
    let invalidData =loginTestData.invalidlogin;

    test.beforeEach( async ({page}) => {
        let Data =urls.AutomationExercise;
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        signupInfo = new SignupInfo(page);
        projectUtils = new ProjectUtils(page);
       
        await projectUtils.open(Data.url);
        await homePage.navigateToSignuporLogin();

    })

    test('TC_001_Register User @smoke', async () => {     
        await loginPage.newUserSignup(1,signupData.name, signupData.email);
        const message = await signupInfo.createNewUserAccount();
        expect(message).toBe('ACCOUNT CREATED!');      
    });

    test('TC_002_Login User with correct email and password @regression', async ({page}) => {
        await loginPage.loginasExistingUser(0, loginData.email, loginData.password);
        const loggedinMessage = await loginPage.loggedinMessage();
        expect(loggedinMessage).toBe(` Logged in as ${signupData.name}`);

    });

    test('TC_003_Verify error message for failed login', async () => {
        await loginPage.loginasExistingUser(0, invalidData.email, invalidData.password);
        const errorMessage = await loginPage.getInvalidLoginErrorMsg();
        expect(errorMessage).toBe('Your email or password is incorrect!');
    });

    test('TC_004_Logout successfully', async ({page}) => {
        await loginPage.loginasExistingUser(0, loginData.email, loginData.password);
        const loggedinMessage = await loginPage.loggedinMessage();
        expect.soft(loggedinMessage).toBe(` Logged in as ${signupData.name}`)
        await homePage.logout();
        await homePage
    });

});
        