import {test, expect, Page} from '@playwright/test';
import { chromium } from '@playwright/test';
import { on } from 'node:cluster';

test('browser', async ({page}) => {

    const browser = await chromium.launch();
    const context = await browser.newContext();
    const Page = await context.newPage();
    await page.goto('https://playwright.dev/');
    await browser.close();  
});


