import {expect} from '@playwright/test';

export class LoginPage {
    constructor(page)
    {
        this.page=page;
        this.username=page.locator('#user-name');
        this.password=page.locator('#password');
        this.loginButton=page.locator('#login-button');

        this.loginCredentials=page.locator('.login_credentials');
        this.loginPassword=page.locator('.login_password');

        this.errorMessage=page.locator('[data-test="error"]');
        this.inventoryList=page.locator('.inventory_list');

        this.menuButton=page.locator('#react-burger-menu-btn');
        this.logoutButton=page.locator('#logout_sidebar_link');

        this.url='https://www.saucedemo.com';
    }

    async navigateToLoginPage()
    {
        await this.page.goto(this.url);

    }

    async getAllUsernames()
    {
        const allUsers=await this.loginCredentials.innerText();
        console.log(allUsers);

        const users=allUsers
                .split('\n')
                .map(name=>name.trim())
                .filter(name=>name && name !=='Accepted usernames are:');
            return users;
        

    }

    async getPassword()
    {
        const passwordText= await this.loginPassword.innerText();
        
        const password=passwordText
            .split('\n')
            .map(value => value.trim())
            .filter(Boolean)
            .pop() || '';
        return password;
    }

    async login(username,password)
    {
        await this.username.fill(username);
        await this.pasword.fill(password);
        await this.loginButton.click();

    }

    async verifyLockedoutUser()
    {
        await expect(this.errorMessage).toContainText('locked out');

    }
    async verifySucessfullLogin()
    {
        await expect(this.page).toHaveURL(/inventory.html/);
        await expect(this.inventoryList).toBeVisible();

    }

    async logout(){
        await this.menuButton.click();
        await this.logoutButton.click();
        await expect(this.page).toHaveURL(this.url);

    }

    }



