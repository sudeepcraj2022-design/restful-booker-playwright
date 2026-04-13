export class SortHelper {
    //Get only number without special characters
    static parsePrice(price: string): number {
        const value = parseFloat(price.replace('$', ''));
        if (isNaN(value)) {
            throw new Error(`Could not parse price from string: "${price}"`);
        }
        return value;
    }

    /**
     * Converts a list of price strings (e.g. ["$29.99", "$9.99"]) 
     * into a sorted array of numbers in descending order.
     */
    static getPricesDescending(priceStrings: string[]): number[] {
        return priceStrings
            .map(price => parseFloat(price.replace('$', ''))) // Remove $ and convert to number
            .sort((a, b) => b - a); // Sort High to Low
    }

    static getPricesAscending(priceStrings: string[]): number[] {
        return priceStrings
            .map(price => parseFloat(price.replace('$', ''))) // Remove $ and convert to number
            .sort((a, b) => a - b); // Sort High to Low
    }

    /**
     * Sorts a list of strings in descending order (Z to A).
     */
    static getNamesDescending(names: string[]): string[] {
        return [...names].sort((a, b) => b.localeCompare(a));
    }
}