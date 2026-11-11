import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';
import { InventoryPage } from '../Pages/InventoryPage';

test.describe('Inventory Tests', () => {

    test.beforeEach(async ({ page }) => {

        const login = new LoginPage(page);

        await login.navigateToLoginPage();
        await login.login(
            'standard_user',
            'secret_sauce'
        );
        // page.waitForTimeout(5000);
        await login.verifySucessfullLogin();
    });
    test('TC04 - Verify product count', async ({ page }) => {

        const inventory = new InventoryPage(page);
        const count = await inventory.getProductCount();
        expect(count).toBe(6);
    });

    test('TC05 - Sort products by price ', async ({ page }) => {
        const inventory = new InventoryPage(page);
        await inventory.sortProductsByPrice();

        const prices = await page
            .locator('.inventory_item_price')
            .allTextContents();
        const numericPrices = prices.map(price =>
            Number(price.replace('$', ''))
        );
        const sortedPrices = [...numericPrices]
            .sort((a, b) => a - b);
        expect(numericPrices).toEqual(sortedPrices);
    });
    test('TC06 - Add product to cart', async ({ page }) => {
        const inventory = new InventoryPage(page);
        await inventory.addBackpackToCart();

        await expect(
            page.locator('.shopping_cart_badge')
        ).toHaveText('1');
    });
});
