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

    test.beforeEach( async ({page}) => {
        let Data =urls.AutomationExercise;
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        signupInfo = new SignupInfo(page);
        projectUtils = new ProjectUtils(page);
       
        await projectUtils.open(Data.url);
        await homePage.openProductsPage();
        await projectUtils.verifyProductsPage();

    })

    test('TC_001_Register User @smoke', async () => {
        let data =loginTestData.signup;
        await loginPage.newUserSignup(1,data.name, data.email);
        const message = await signupInfo.createNewUserAccount();
        expect(message).toBe('Account Created!');      
    });

    test('TC_002_Login User with correct email and password @regression', async ({page}) => {
        let data =loginTestData.login;
        await loginPage.loginasExistingUser(0, data.email, data.password);
        
    });

    test('TC_003_Verify error message for failed login', async () => {


    });

    test('TC_004_Logout successfully', async ({page}) => {

    });

    test('TC_005_Verify user session handling after login and logout', async ({page}) => {

    });


});
        