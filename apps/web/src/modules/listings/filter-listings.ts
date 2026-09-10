import type { Listing, PropertyType } from './types';

export interface ListingFilters {
  q?: string;
  type?: string;
  location?: string;
  budget?: string;
}

const KNOWN_PROPERTY_TYPES: PropertyType[] = ['apartment', 'house', 'penthouse'];

/**
 * Naive client-side filtering over the mock catalog — stands in for a real
 * search until the Apimo connector (F01.2) replaces mock-data.ts.
 */
export function filterListings(listings: Listing[], filters: ListingFilters): Listing[] {
  const q = filters.q?.trim().toLowerCase();
  const location = filters.location?.trim().toLowerCase();
  const type = filters.type?.trim().toLowerCase();
  const budget = filters.budget ? Number(filters.budget.replace(/[^\d]/g, '')) : undefined;

  return listings.filter((listing) => {
    if (q) {
      const haystack = `${listing.title} ${listing.location}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    if (location && !listing.location.toLowerCase().includes(location)) return false;
    if (
      type &&
      KNOWN_PROPERTY_TYPES.includes(type as PropertyType) &&
      listing.propertyType !== type
    ) {
      return false;
    }
    if (budget && !Number.isNaN(budget) && listing.price > budget) return false;
    return true;
  });
}
