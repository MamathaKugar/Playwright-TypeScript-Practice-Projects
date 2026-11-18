import { Page, Locator } from '@playwright/test';

export class AlertsPage {

    private readonly page: Page;
    private readonly alertsHeading: Locator;
    private readonly alertButton: Locator;
    private readonly confirmationbtn: Locator;
    private readonly promptbtn: Locator;
    private readonly message: Locator;

    constructor(page: Page) {
        this.page = page;
        this.alertsHeading = page.getByRole('heading', {name: 'Alerts & Popups'});
        this.alertButton = page.locator('#alertBtn');
        this.confirmationbtn = page.locator('#confirmBtn');
        this.promptbtn = page.locator('#promptBtn');
        this.message = page.locator('#demo');
    }

    async acceptSimpleAlert(): Promise<string> {
        await this.alertsHeading.scrollIntoViewIfNeeded();
        let message = '';
        this.page.once('dialog', async dialog => {
            message = dialog.message();
            await dialog.accept();
        });
    await this.alertButton.click();
    return message;
}

    async acceptConfirmationAlert(): Promise<{ dialogmsg: string; message: string }> {
    await this.alertsHeading.scrollIntoViewIfNeeded();
    let dialogmsg = '';
    this.page.once('dialog', async dialog => {
        dialogmsg = dialog.message();
        await dialog.accept();
    });
    await this.confirmationbtn.click();
    const message: string = await this.message.innerText();
    return {
        dialogmsg,
        message
    };
}

    async dismissConfirmationAlert():Promise<{ dialogmsg: string; message: string }> {
        await this.alertsHeading.scrollIntoViewIfNeeded();
        let dialogmsg = '';
        this.page.once('dialog', async dialog => {
            dialogmsg = dialog.message();
            await dialog.dismiss();
    })
    await this.confirmationbtn.click();
    const message: string = await this.message.innerText();
    return {
        dialogmsg,
        message
    }
    }

    async acceptPromptAlert(name: string): Promise<{ dialogmsg: string; message: string }> {
        await this.alertsHeading.scrollIntoViewIfNeeded();
        let dialogmsg = '';
        this.page.once('dialog', async dialog => {
            dialogmsg = dialog.message();
        await dialog.accept(name);
    })
    await this.promptbtn.click();
    const message: string = await this.message.innerText();
    return {
        dialogmsg,
        message
    }
    }

}
