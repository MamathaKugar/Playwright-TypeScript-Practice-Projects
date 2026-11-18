import { test, expect } from '@playwright/test';
import { AlertsPage } from '../pages/alertsPage';
import { ProjectUtils } from '../utils/projectUtils';
import urls from '../test-data/urls.json';

test.describe('Handling Alerts', () => {

    let alertsPage: AlertsPage;
    let projectUtils: ProjectUtils;
    
    test.beforeEach( async ({page}) => {
        let Data =urls.PlaywrightPractice;
        alertsPage = new AlertsPage(page);
        projectUtils = new ProjectUtils(page);
        await projectUtils.open(Data.url);
            
    });

    test('Test_001_Simple Alert  @smoke', async () => {
        const message =  await alertsPage.acceptSimpleAlert();
        expect(message).toBe('I am an alert box!');
    });

    test('Test_002_Accept Confirmation Alert @smoke', async () => {
        const actualmessage = await alertsPage.acceptConfirmationAlert();
        expect.soft(actualmessage.dialogmsg).toBe('Press a button!');
        expect(actualmessage.message).toBe('You pressed OK!');
    });

    test('Test_003_Dismiss Confirmation Alert @regression', async () => {
        const actualmessage = await alertsPage.dismissConfirmationAlert();
        expect.soft(actualmessage.dialogmsg).toBe('Press a button!');
        expect(actualmessage.message).toBe('You pressed Cancel!');
    });

    test('Test_004_Prompt Alert with Valid Name @smoke', async () => {
        const actualmessage = await alertsPage.acceptPromptAlert('Mamatha');
        expect.soft(actualmessage.dialogmsg).toBe('Please enter your name:');
        expect(actualmessage.message).toBe('Hello Mamatha! How are you today?');
    });

});
    