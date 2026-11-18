import { test, expect } from '@playwright/test';
import { WindowsPage } from '../pages/windowPage';
import { ProjectUtils } from '../utils/projectUtils';
import urls from '../test-data/urls.json'


test.describe('Handling New Tab and Windows', () => {

    let windowsPage: WindowsPage;
    let projectUtils: ProjectUtils;
    let Data =urls.PlaywrightPractice;

    test.beforeEach(async ({ page }) => {      
        windowsPage = new WindowsPage(page);
        projectUtils = new ProjectUtils(page);
        await projectUtils.open(Data.url);

    });

    test('TC_001_Open New Tab @smoke', async ({ page }) => {
        const newPage = await windowsPage.openNewTab();
        console.log(newPage.url());
        console.log(await newPage.title());
        await page.bringToFront();
        await expect(page).toHaveURL(Data.url);
    })

    test('TC_002_Open Popup Window @smoke', async ({ page }) => {
        const popup = await windowsPage.openPopup();
        console.log(popup.url());
        console.log(await popup.title());
        await page.bringToFront();
        await expect(page).toHaveURL(Data.url);
    });

});
