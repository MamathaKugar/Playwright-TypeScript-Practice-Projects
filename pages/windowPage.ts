import { Locator, Page } from '@playwright/test';

export class WindowsPage {

    private readonly page: Page;
    private readonly popWindow: Locator;
    private readonly newTab: Locator;

    constructor(page: Page) {
        this.page = page;
        this.newTab = page.getByRole('button', {name: 'New Tab'});
        this.popWindow = page.locator('#PopUp');
    }

    async openNewTab(): Promise<Page> {
        const newPagePromise = this.page.context().waitForEvent('page');
        await this.newTab.click();
        const newPage = await newPagePromise;
        await newPage.waitForLoadState('domcontentloaded');
        return newPage;
    }

    async openPopup(): Promise<Page> {
        const popupPromise = this.page.waitForEvent('popup');
        await this.popWindow.click();
        const popup = await popupPromise;
        await popup.waitForLoadState('domcontentloaded');
        return popup;
    }
}
