import { test as base} from '@playwright/test';
import { HomePage } from '@pages/home-page';

//1. Fixture Type declaration
type MyFixtures = {
    homePage: HomePage;
}

//2. Extend the base test object
export const test = base.extend<MyFixtures> ({
    homePage: async({page}, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    },

});

//3. Export expect so you don't have to import it everywhere
export { expect } from '@playwright/test';