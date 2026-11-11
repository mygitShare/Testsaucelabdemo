import { Locator, Page, test } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly inventoryItems: Locator;
    readonly cartIcon: Locator;
    readonly sortDropDown: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inventoryItems = page.locator('.inventory_item');
        console.log('inventory items:', this.inventoryItems);
        this.cartIcon = page.locator('.shopping_cart_link');
        this.sortDropDown = page.locator('[data-test="product-sort-container"]');
    }
    async getProductCount() {
        return await this.inventoryItems.count();
    }
    async addBackpackToCart() {
        await this.page
            .locator('[data-test="add-to-cart-sauce-labs-backpack"]')
            .click();
    }

    async openCart() {
        await this.cartIcon.click();
    }

    async sortProductsByPrice() {
        await this.sortDropDown.selectOption('lohi');
    }

}