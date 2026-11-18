import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { ProductsPage } from '../pages/productsPage';
import { CartPage } from '../pages/cartPage';
import { ProjectUtils } from '../utils/projectUtils';
import cartTestData from '../test-data/cartTestData.json';
import urls from '../test-data/urls.json';

const price = ProjectUtils.formatPrice;

test.describe('Shopping Cart', () => {

    let homePage: HomePage;
    let productPage: ProductsPage;
    let cartPage: CartPage;
    let projectUtils: ProjectUtils;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        productPage = new ProductsPage(page);
        cartPage = new CartPage(page);
        projectUtils = new ProjectUtils(page);

        await projectUtils.open(urls.AutomationExercise.url);
        await homePage.openProductsPage();
        await productPage.verifyProductsPage();

        // precondition
        await productPage.verifyProductsAreAvailable();
    });

    test('TC_CART_001_Add a product to cart @smoke', async () => {
        const product = cartTestData.firstProduct;

        expect.soft(await productPage.getFirstProductName()).toBe(product.name);
        expect(await productPage.getFirstProductPrice()).toBe(price(product.price));
        await productPage.addProductToCartByIndex(0);
        await productPage.continueShopping();
        await homePage.openCartPage();
        await cartPage.verifyCartPage();

        // Only one product was added, so it is row 0
        const actual = await cartPage.getProductDetails(0);
        expect.soft(actual.name).toBe(product.name);
        expect.soft(actual.price).toBe(price(product.price));
        expect(actual.quantity).toBe(String(product.quantity));
    });

    test('TC_CART_002_Add multiple products to cart @regression', async () => {
        const product1 = cartTestData.firstProduct;
        const product2 = cartTestData.secondProduct;

        await productPage.addProductToCartByIndex(0);
        await productPage.continueShopping();
        await productPage.addProductToCartByIndex(1);
        await productPage.viewCart();
        await cartPage.verifyCartPage();
        expect.soft(await cartPage.getCartProductCount()).toBe(2);

        const row1 = await cartPage.getProductDetails(0);
        expect.soft(row1.name).toBe(product1.name);
        expect.soft(row1.price).toBe(price(product1.price));
        expect.soft(row1.quantity).toBe(String(product1.quantity));

        const row2 = await cartPage.getProductDetails(1);
        expect.soft(row2.name).toBe(product2.name);
        expect.soft(row2.price).toBe(price(product2.price));
        expect(row2.quantity).toBe(String(product2.quantity));
    });

    test('TC_CART_003_Increase product quantity @regression', async () => {
        const product = cartTestData.increasedQuantity;

        await productPage.openFirstProduct();
        await productPage.setProductQuantity(product.expectedQuantity);
        await productPage.addProductToCart();
        await productPage.viewCart();
        await cartPage.verifyCartPage();

        const actual = await cartPage.getProductDetails(0);
        expect.soft(actual.name).toBe(product.name);
        expect.soft(actual.price).toBe(price(product.price));
        expect(actual.quantity).toBe(String(product.expectedQuantity));
        expect(actual.total).toBe(price(product.price * product.expectedQuantity));
    });

    test('TC_CART_004_Quantity cannot be decreased in the cart @regression', async () => {
        const product = cartTestData.decreasedQuantity;

        await productPage.openFirstProduct();
        await productPage.setProductQuantity(product.initialQuantity);
        await productPage.addProductToCart();
        await productPage.viewCart();
        await cartPage.verifyCartPage();

        const actual = await cartPage.getProductDetails(0);
        expect.soft(actual.name).toBe(product.name);
        expect.soft(actual.price).toBe(price(product.price));
        // Automation Exercise has no control to decrease quantity in the cart,
        // so the quantity and total must stay at the values that were added
        expect(actual.quantity).toBe(String(product.initialQuantity));
        expect(actual.total).toBe(price(product.price * product.initialQuantity));
    });

});
