export type TransactionType = 'sale' | 'rent';
export type PropertyType = 'apartment' | 'house' | 'penthouse';
export type EnergyClass = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';

export interface ListingBadge {
  label: string;
  tone: 'new' | 'priceDrop' | 'underOffer';
}

export interface PointOfInterest {
  label: string;
  distance: string;
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
  images: string[];
  floorPlans: string[];
  features: string[];
  pointsOfInterest: PointOfInterest[];
  badge?: ListingBadge;
  featured?: boolean;
}
