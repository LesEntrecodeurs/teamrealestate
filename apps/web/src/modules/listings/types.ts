export type TransactionType = 'sale' | 'rent';
export type PropertyType = 'apartment' | 'house' | 'penthouse';
export type EnergyClass = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';

export interface ListingBadge {
  label: string;
  tone: 'new' | 'priceDrop' | 'underOffer';
}

export interface Listing {
  id: string;
  slug: string;
  title: string;
  transactionType: TransactionType;
  propertyType: PropertyType;
  price: number;
  location: string;
  surface: number;
  rooms: number;
  energyClass: EnergyClass;
  image: string;
  badge?: ListingBadge;
  featured?: boolean;
}
