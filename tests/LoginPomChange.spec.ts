import { test } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';
import { users } from '../testdata/users';

for (const user of users) {
    test(`Login Test - ${user.username}`, async ({ page }) => {

        const loginPage = new LoginPage(page);
        await loginPage.navigateToLoginPage();
        await loginPage.login(
            user.username,
            user.password

        );

        if (user.expectedResult === "success") {
            await loginPage.verifySucessfullLogin();
            await loginPage.logout();
            console.log(`${user.username} - Test Login was Sucessfull`);
        } else if (user.expectedResult === 'failure') {
            await loginPage.verifyLockedoutUser();
            console.log(`${user} - Login failed as expected`);

        } else {

            throw new Error(
                `Unsupported expected result: ${user.expectedResult}`
            );
        }

    });

}
