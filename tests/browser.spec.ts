import { test, expect } from '@playwright/test';

// Shows the Browser -> BrowserContext -> Page hierarchy that the built-in `page` fixture normally creates for you
test('Create a context and page from the browser fixture @regression', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://playwright.dev/');
    await expect(page).toHaveTitle(/Playwright/);
    await context.close();
});
