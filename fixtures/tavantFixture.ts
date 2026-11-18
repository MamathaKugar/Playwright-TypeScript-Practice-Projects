import { test as base, expect, Page } from '@playwright/test';
import urls from '../test-data/urls.json';

// Tavant Custom Fixture Types
type TavantFixtures = { fixturePage: Page };

export const tavantFixture = base.extend<TavantFixtures>({
  fixturePage: async ({ page }, use) => {
    await page.goto(urls.PlaywrightPractice.url);
    await page.waitForLoadState('domcontentloaded');
    await use(page);
  },
});

export { expect };
