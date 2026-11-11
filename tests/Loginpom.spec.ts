import { test } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';

test('Test sauce lab website login', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigateToLoginPage();
    const users = await loginPage.getAllUsernames();
    const password = await loginPage.getPassword();

    console.log('Users:', users);
    console.log('Password:', password);

    for (const user of users) {
        console.log(`\nTesting user - ${user}`);
        try {
            await loginPage.navigateToLoginPage();
            await loginPage.login(user, password);
            if (user === 'locked_out_user') {
                await loginPage.verifyLockedoutUser();
                console.log(`${user} - Login failed as expected`);

            } else {
                await loginPage.verifySucessfullLogin();
                await loginPage.logout();
                console.log(`${user} - Test Login was Sucessfull`);
            }


        } catch (error) {
            console.log(`${user} - Test Login Failed`);
            console.log(error);
            continue;
        }

    }

});
