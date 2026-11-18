import { test, expect } from '@playwright/test';
import { WindowsPage } from '../pages/windowPage';
import { ProjectUtils } from '../utils/projectUtils';
import urls from '../test-data/urls.json';


test.describe('Handling New Tab and Windows', () => {

    let windowsPage: WindowsPage;
    let projectUtils: ProjectUtils;
    const Data = urls.PlaywrightPractice;

    test.beforeEach(async ({ page }) => {
        windowsPage = new WindowsPage(page);
        projectUtils = new ProjectUtils(page);
        await projectUtils.open(Data.url);
    });

    test('TC_001_Open New Tab @smoke', async ({ page }) => {
        const newPage = await windowsPage.openNewTab();
        // The "New Tab" button opens pavantestingtools.com
        await expect(newPage).toHaveURL(/pavantestingtools\.com/);
        await page.bringToFront();
        await expect(page).toHaveURL(Data.url);
    });

    test('TC_002_Open Popup Window @smoke', async ({ page }) => {
        const popup = await windowsPage.openPopup();
        // The "Popup Windows" button opens selenium.dev and playwright.dev; the first one is returned
        await expect(popup).toHaveURL(/selenium\.dev|playwright\.dev/);
        await page.bringToFront();
        await expect(page).toHaveURL(Data.url);
    });

});
