import { test as base, expect, Page } from '@playwright/test';

// Tavant Custom Fixture Types
type TavantFixtures = {
  fixturePage: Page;
};


export const tavantFixture = base.extend<TavantFixtures>({
  fixturePage: async ({ page }, use) => {
    await page.goto('https://testautomationpractice.blogspot.com/');
    await page.waitForLoadState('networkidle');
    await use(page);
  },
});

export { expect };
