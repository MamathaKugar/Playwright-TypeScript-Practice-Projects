import { tavantFixture as test, expect } from '../fixtures/tavantFixture';

test.describe('Custom fixture check', () => {

    test('Accept confirmation alert using fixturePage @regression', async ({ fixturePage: page }) => {
        await page.getByRole('heading', { name: 'Alerts & Popups' }).scrollIntoViewIfNeeded();
        page.once('dialog', async dialog => {
            expect(dialog.message()).toBe('Press a button!');
            await dialog.accept();
        });
        await page.locator('#confirmBtn').click();
        await expect(page.locator('#demo')).toHaveText('You pressed OK!');
    });

});
