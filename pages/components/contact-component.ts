import { Locator, Page } from '@playwright/test';

export class ContactComponent {
    readonly container: Locator;
    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly phoneInput: Locator;
    readonly subjectInput: Locator;
    readonly messageInput: Locator;
    readonly submitButton: Locator;
    readonly successMessage: Locator;
    readonly errorMessage: Locator;
    readonly errorItems: Locator;

    constructor(page: Page) {
        this.container = page.locator('#contact');

        this.nameInput = this.container.getByLabel('Name');
        this.emailInput = this.container.getByLabel('Email');
        this.phoneInput = this.container.getByLabel('Phone');
        this.subjectInput = this.container.getByLabel('Subject');
        this.messageInput = this.container.locator('#description');
        this.submitButton = this.container.getByRole('button', { name: 'Submit' });

        this.successMessage = this.container.getByRole('heading', { level: 3 }); 
        this.errorMessage = this.container.locator('.alert-danger');
        this.errorItems = this.errorMessage.locator('p');
    }

    async submitMessage(details: { name: string, email: string, phone: string, subject: string, message: string }) {
        await this.nameInput.scrollIntoViewIfNeeded();
        await this.nameInput.fill(details.name);
        await this.emailInput.fill(details.email);
        await this.phoneInput.fill(details.phone);
        await this.subjectInput.fill(details.subject);
        await this.messageInput.fill(details.message);
        await this.submitButton.click();

    }

}