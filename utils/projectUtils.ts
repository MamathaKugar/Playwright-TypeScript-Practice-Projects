import { Page } from '@playwright/test';

/** Generic helpers shared by all tests. Page-specific actions and checks live in the page objects. */
export class ProjectUtils {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Opens a URL and waits only for the HTML to be ready (DOMContentLoaded).
     * The default 'load' also waits for every ad, image and tracker on the page,
     * which on testautomationpractice.blogspot.com can take longer than the 30s test timeout.
     * Playwright auto-waits for each element before using it, so nothing more is needed.
     */
    async open(url: string): Promise<void> {
        await this.page.goto(url, { waitUntil: 'domcontentloaded' });
    }

    async refreshPage(): Promise<void> {
        await this.page.reload();
    }

    async getPageTitle(): Promise<string> {
        return await this.page.title();
    }

    /** Formats a price the way Automation Exercise shows it, e.g. 500 -> "Rs. 500". */
    static formatPrice(amount: number): string {
        return `Rs. ${amount}`;
    }

    /** Returns a unique email address so sign-up tests can run more than once. */
    static uniqueEmail(prefix = 'testuser'): string {
        return `${prefix}+${Date.now()}@example.com`;
    }
}
