import { test, expect } from '@playwright/test';

test('TC08 - Complete end-to-end shopping journey',
    async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.locator('#user-name')
            .fill('standard_user');
        await page.locator('#password')
            .fill('secret_sauce');
        await page.locator('#login-button').click();

        await page.locator(
            '[data-test="add-to-crt-sauce-labs-backpack"]'
        ).click();

        await page.locator('.shopping_cart_link').click();
        await expect(
            page.locator('.inventory_item_name')
        ).toHaveText('Sauce Labs Backpack');
        await page.locator('#checkout').click();

        //enter customer details
        await page.locator('#first-name').fill('John');
        await page.locator('#last-name').fill('Smith');
        await page.locator('#postal-code').fill('560001');
        //Continue
        await page.locator('#continue').click();
        //Verify order summary
        await expect(
            page.locator('.summary_info')
        ).toBeVisible();
        //Finish the order
        await page.locator('#finish').click();
        //Verify order completion
        expect(
            await page.locator('.complete-header')).toHaveText('Thank you for your order');

    });