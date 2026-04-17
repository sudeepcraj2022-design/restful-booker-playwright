import { Page, Locator } from '@playwright/test';

// Define the available links as a type to prevent typos in your tests
export type NavLinkName = 'Rooms' | 'Booking' | 'Amenities' | 'Location' | 'Contact' | 'Admin' | 'Book Now';

export class NavigationComponent {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Returns a dynamic locator based on the link name.
  getNavLink(name: NavLinkName): Locator {
    return this.page.getByRole('link', { name: name });
  }

  //Action method to click a link

  async clickNavLink(name: NavLinkName) {
    await this.getNavLink(name).click();
  }
}