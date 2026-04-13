import{test as base, APIRequestContext, request} from '@playwright/test';
import { ENV } from '@config/env';

//1. Fixture type declaration
type ApiFixtures = {
    apiContext: APIRequestContext;
    authToken: string;
};

//2. Extend the base test object
export const test = base.extend<ApiFixtures>({
    apiContext: async({}, use) => {
        const context = await request.newContext({
            baseURL: ENV.BASE_URL,
            extraHTTPHeaders: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        })
        await use(context);
        await context.dispose();
    },

    authToken: async({apiContext}, use) => {
        const response = await apiContext.post('/api/auth/login', {
            data: {
                username: ENV.USERNAME,
                password: ENV.PASSWORD,
            },
        });
        const body = await response.json();
        await use(body.token);
    },
});

export {expect} from '@playwright/test';