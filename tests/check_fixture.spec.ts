import { tavantFixture as test, expect } from '../fixtures/tavantFixture';

test.describe('Handling Alerts', async () => {

    test(' accept confirmation Alerts', async ({ fixturePage: Page }) => {

    await Page.getByRole('heading', {name: 'Alerts & Popups'}).scrollIntoViewIfNeeded();
    Page.once('dialog', async dialog => {
      expect(dialog.message()).toBe('Press a button!');
      await dialog.accept();

    });
      await Page.locator('#confirmBtn').click();
      expect(Page.locator('#demo')).toHaveText('You pressed OK!');
  });


});
