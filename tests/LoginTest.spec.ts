import {test , expect} from '@playwright/test';

test('Test sauce lab website login',async ({ page })=>
{
    await page.goto('https://www.saucedemo.com/');
    const allusers= await page.locator('.login_credentials').innerText();
    const users= allusers
                    .split('\n')
                    .map(name=>name.trim())
                    .filter(name=>name && name !=='Accepted usernames are:');
    const password= await page.locator('.login_password').innerText();
    const extpassword=password.split('\n').map(value=>value.trim()).filter(Boolean).pop()||'';
    console.log('users',allusers);
    console.log('password',password);
    for(const user of users)
    {
           console.log(`\n Testing User - ${user}`);
     try{   
        await page.goto('https://www.saucedemo.com/');
        await page.locator('#user-name').fill(user);
        await page.locator('#password').fill(extpassword);
        await page.locator('#login-button').click();

 
        if(user=='locked_out_user')
        {
            await expect(page.locator('[data-test="error"]')).toContainText('locked out');
            console.log(`${user} - Login failed as Expected`);
        }
        else
        {
            await expect(page).toHaveURL(/inventory.html/);
            await expect(page.locator('.inventory_list')).toBeVisible();

            await page.locator('#react-burger-menu-btn').click();
            await page.locator('#logout_sidebar_link').click();
            await expect(page).toHaveURL('https://www.saucedemo.com/');
            console.log(`${user} - Test Login Successfull`);

        }
    }catch(error){
        console.log(`${user}- Test Login Failed`);
        continue;
    }
        }
});