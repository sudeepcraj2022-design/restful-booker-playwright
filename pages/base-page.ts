import { Page, Locator } from "@playwright/test";


export class BasePage {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    //Common Navigation method
    async navigate(path: string = '/') {
        await this.page.goto(path);
    }

    // Common action method
    async getPageTitle(): Promise<string> {
        return await this.page.title();
    }

    // A "Wait for Network" helper, useful in API-UI integration
    async waitForResponse(url: string, status: number = 200) {
        return this.page.waitForResponse(
            (response) => response.url().includes(url) && response.status() === status
        );
    }

    async waitForLoadState(){
        await this.page.waitForLoadState('networkidle');
    }


    //To check if image is visible  
    async isImageVisible(imageLocator: Locator): Promise<boolean> {
        // Simply check if it's visible in the DOM and has a non-empty src
        const isVisible = await imageLocator.isVisible();
        const hasSrc = (await imageLocator.getAttribute('src')) !== '';

        return isVisible && hasSrc;
    }

}
