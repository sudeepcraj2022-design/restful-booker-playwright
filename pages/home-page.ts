import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./base-page";
import { NavigationComponent } from "./components/navigation-component";
import { ContactComponent } from "./components/contact-component";


export class HomePage extends BasePage {
    private readonly homeButton: Locator;
    private readonly hotelName: Locator;
    private readonly bannerImage: Locator;
    private readonly footerContainer: Locator;
    private readonly roomsSection: Locator;
    private readonly roomCards: Locator;
    private readonly roomImages: Locator;
    readonly contactForm: ContactComponent;

    constructor(page: Page) {
        super(page);
        this.contactForm = new ContactComponent(page);
        this.homeButton = page.getByRole('link', { name: 'Shady Meadows B&B' });
        this.hotelName = page.getByRole('heading', { name: 'Welcome to Shady Meadows B&B' });
        this.bannerImage = page.locator('.hero.py-5');
        this.footerContainer = page.getByRole('contentinfo').locator('.container');
        this.roomsSection = page.locator('#rooms');
        this.roomCards = page.locator('#rooms').locator('.room-card');
        this.roomImages = page.locator('img.card-img-top');
    }

    //Action methiods
    async areAllRoomImagesVisible(): Promise<boolean> {
        await this.roomCards.first().waitFor({ state: 'visible' });
        const allImages = await this.roomCards.locator('.card-img-top').all();

        const results = await Promise.all(
            allImages.map(img => img.isVisible())
        );

        return results.every(res => res === true);
    }

    //getter methods
    getHomeButton() {
        return this.homeButton;
    }

    getHotelName() {
        return this.hotelName;
    }

    getBannerImage() {
        return this.bannerImage;
    }

    getFooterContainer() {
        return this.footerContainer;
    }

    getRoomCard(roomName: string) {
        return this.roomCards.filter({
            has: this.page.locator('.card-title', { hasText: roomName })
        });
    }

    getRoomCardElements(roomName: string) {
        const card = this.getRoomCard(roomName);
        return {
            card,
            image: card.getByRole('img'),
            title: card.locator('.card-title'),
            description: card.locator('.card-text'),
            priceByValue: card.getByText(/[£$]\d+/),
            amenities: card.locator('.badge'),
            bookingButton: card.getByRole('link', { name: 'Book now' })
        };
    }

}
