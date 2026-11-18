import { test, expect } from '@playwright/test';
import { AlertsPage } from '../pages/alertsPage';
import { ProjectUtils } from '../utils/projectUtils';
import urls from '../test-data/urls.json'


test.use({
    screenshot: 'on',
    video: 'on',
    trace: 'on'
});

test.describe('screenshot and video', async () => {

    let alertsPage: AlertsPage;
    let projectUtils: ProjectUtils;
    
    test.beforeEach( async ({page}) => {
        let Data =urls.PlaywrightPractice;
        alertsPage = new AlertsPage(page);
        projectUtils = new ProjectUtils(page);
        await projectUtils.open(Data.url);
            
    });
    test('capture screenshot and video @regression', async ({page}) => {
        const actualmessage = await alertsPage.dismissConfirmationAlert();
        expect.soft(actualmessage.dialogmsg).toBe('Press a button!');
        expect(actualmessage.message).toBe('You pressed Cancel!');
        await page.screenshot({path: './test-results/alert.png'});  
    });

});
    