import{test, expect} from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { ProductsPage } from '../pages/productsPage';
import { CartPage } from '../pages/cartPage';
import cartTestData from '../test-data/cartTestData.json';
import { ProjectUtils } from '../utils/projectUtils';
import urls from '../test-data/urls.json'


test.describe('Playwright exercise', () => {

    let homePage: HomePage;
    let productPage: ProductsPage;
    let cartPage: CartPage;
    let projectUtils: ProjectUtils;

    test.beforeEach( async ({page}) => {
        let Data =urls.AutomationExercise;
        homePage = new HomePage(page);
        productPage = new ProductsPage(page);
        cartPage = new CartPage(page);
        projectUtils = new ProjectUtils(page);
       
        await projectUtils.open(Data.url);
        await homePage.openProductsPage();
        await projectUtils.verifyProductsPage();

        //precondition
        await projectUtils.verifyProductsAreAvailable();
        
    })

    test('TC_CART_001_Add a product to cart @smoke', async () => {
        const product =cartTestData.firstProduct;
        
        const productName = await productPage.getFirstProductName();
        expect.soft(productName).toBe(product.name);
        const productPrice = await productPage.getFirstProductPrice();
        expect(productPrice).toBe(product.price);
        await productPage.addFirstProductToCart(0);
        await productPage.continueShopping();
        await homePage.openCartPage();
        const actual = await projectUtils.verifyProductDetails(1); 
        expect.soft(actual.actualName).toBe(product.name);
        expect.soft(actual.actualPrice).toBe(product.price);
        expect(actual.actualQuantity).toBe(product.quantity);

    });
        
    test('TC_CART_002_Add multiple products to cart @regression', async () => {
        const product1 =cartTestData.firstProduct;
        const product2 =cartTestData.secondProduct;

        await productPage.addFirstProductToCart(0);
        await productPage.continueShopping();
        await productPage.addSecondProductToCart(1);
        await productPage.viewCart();
        const actual = await projectUtils.verifyProductDetails(0); 
        expect.soft(actual.actualName).toBe(product1.name);
        expect.soft(actual.actualPrice).toBe(product1.price);
        expect.soft(actual.actualQuantity).toBe(product1.quantity);
        const actual1 = await projectUtils.verifyProductDetails(1); 
        expect.soft(actual1.actualName).toBe(product2.name);
        expect.soft(actual1.actualPrice).toBe(product2.price);
        expect(actual1.actualQuantity).toBe(product2.quantity);
        
    });

    test('TC_CART_003_Increase product quantity @regression', async () => {
        const product =cartTestData.increasedQuantity;
        await projectUtils.verifyProductDetailPageAvailable();
        await productPage.openFirstProduct();
        await productPage.setProductQuantity(product.expectedQuantity);
        await productPage.addProductToCart();
        await productPage.viewCart();
        await projectUtils.verifyCartPage();
        const actual = await projectUtils.verifyProductDetails(0); 
        expect.soft(actual.actualName).toBe(product.name);
        expect.soft(actual.actualPrice).toBe(product.price);
        expect(actual.actualQuantity).toBe(product.expectedQuantity);
        expect(actual.actualTotal).toBe(`${product.price * product.expectedQuantity}`);    
    });

    test('TC_CART_004_Decrease product quantity @regression', async () => {
        const product = cartTestData.decreasedQuantity;
        await projectUtils.verifyProductDetailPageAvailable();
        await productPage.openFirstProduct();
        await productPage.setProductQuantity(product.initialQuantity);
        await productPage.addProductToCart();
        await productPage.viewCart();
        await projectUtils.verifyCartPage();
        const actual = await projectUtils.verifyProductDetails(0); 
        expect.soft(actual.actualName).toBe(product.name);
        expect.soft(actual.actualPrice).toBe(product.price);
        expect(actual.actualQuantity).toBe(product.initialQuantity);
        expect(actual.actualTotal).toBe(`${product.price * product.initialQuantity}`);

        // Automation Exercise does not support decreasing quantity directly in the cart
        await projectUtils.verifyQuantityRemainsUnchanged(0,product.initialQuantity);
        await projectUtils.verifyProductTotal( 0,product.price,product.initialQuantity);
    });

})