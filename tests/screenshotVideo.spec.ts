import { test, expect } from '@playwright/test';
import { AlertsPage } from '../pages/alertsPage';
import { ProjectUtils } from '../utils/projectUtils';
import urls from '../test-data/urls.json';


test.use({
    screenshot: 'on',
    video: 'on',
    trace: 'on'
});

test.describe('Screenshot and video', () => {

    let alertsPage: AlertsPage;
    let projectUtils: ProjectUtils;

    test.beforeEach(async ({ page }) => {
        alertsPage = new AlertsPage(page);
        projectUtils = new ProjectUtils(page);
        await projectUtils.open(urls.PlaywrightPractice.url);
    });

    test('Capture screenshot and video @regression', async ({ page }, testInfo) => {
        const actualmessage = await alertsPage.dismissConfirmationAlert();
        expect.soft(actualmessage.dialogmsg).toBe('Press a button!');
        expect(actualmessage.message).toBe('You pressed Cancel!');
        // Saved in this test's output folder and attached to the HTML report
        const screenshotPath = testInfo.outputPath('alert.png');
        await page.screenshot({ path: screenshotPath });
        await testInfo.attach('alert', { path: screenshotPath, contentType: 'image/png' });
    });

});
