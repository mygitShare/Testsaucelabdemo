import {test,expect} from '@playwright/test';

test('Test Login page', async ({page})=>{
    
    await page.goto('https://www.saucedemo.com/');
    const usernameText = await page.locator('.login_credentials').innerText();
    const usernames=usernameText
    .split('\n')
    .map(name=>name.trim())
    .filter(name=>name && name !=='Accepted usernames are:');

    const passwordText = await page.locator('.login_password').innerText();
    const password = passwordText.split('\n').map(value=>value.trim()).filter(Boolean).pop() || '';

    console.log('Usernames:',usernames);
    console.log('Password',password);

    for(const username of usernames)
    {
        console.log(`\nTesting username: ${username}`);
        try
        {
        await page.goto('https://www.saucedemo.com/');
        await page.locator('#user-name').fill(username);
        await page.locator('#password').fill(password);
        await page.locator('#login-button').click();

        if(username == 'locked_out_user') {
            await expect(page.locator('[data-test="error"]')).toContainText('locked out');

            console.log(`${username} - Login Failed as Expected`);
            
        } else
        {
            await expect(page).toHaveURL(/inventory.html/);

            await expect(
                page.locator('.inventory_list')).toBeVisible();
                console.log(`${username} - Login Sucess`);

            await page.locator('#react-burger-menu-btn').click();
            await page.locator('#logout_sidebar_link').click();
            await expect(page).toHaveURL('https://www.saucedemo.com/');

            console.log(`${username} - Logout Sucess`);
        }

    }catch(error){
        console.log(`${username} - Test Failed`,error);
        continue;
    }
    }
});