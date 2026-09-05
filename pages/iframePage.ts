import { expect, FrameLocator, Locator, Page } from "@playwright/test";

export class iFrame{

    private readonly page: Page;
    private readonly Frame: FrameLocator;
    private readonly nestedFrame: FrameLocator;
    private readonly iFrameTitle: Locator;
    private readonly nestedFrameTitle: Locator;

    constructor(page: Page){
        this.page = page;
        this.Frame = page.frameLocator('#practiceFrame');
        this.iFrameTitle = page.locator('#iframeCardTitle');
        this.nestedFrameTitle = page.locator('#nestedFramesFrame');
        this.nestedFrame = page.frameLocator('#nestedFramesFrame');

    }

    async fillIframeForm(name: string, message: string, priority: string): Promise<string> {
        await this.iFrameTitle.scrollIntoViewIfNeeded();
        const frame = this.Frame;
        await frame.locator('#iframeName').fill(name);
        await frame.locator('#iframeMessage').fill(message);
        await frame.locator('#iframePriority').selectOption(priority);
        await frame.locator('#iframeUrgent').check();
        await frame.locator('#iframeSubmitBtn').click();
        const submittedMsg =await frame.locator('#iframeResult').innerText();
        return submittedMsg;
    }

    async fillInnerFrameForm(name: string, message: string, priority: string): Promise<string> {
        await this.nestedFrameTitle.scrollIntoViewIfNeeded();
        const outerframe = this.nestedFrame;
        const innerFrame = outerframe.frameLocator('#innerFrame');
        await innerFrame.locator('#iframeName').fill(name);
        await innerFrame.locator('#iframeMessage').fill(message);
        await innerFrame.locator('#iframePriority').selectOption(priority);
        await innerFrame.locator('#iframeUrgent').check();
        await innerFrame.locator('#iframeSubmitBtn').click();
        const submittedMsg = await innerFrame.locator('#iframeResult').innerText();
        return submittedMsg;

    }

}