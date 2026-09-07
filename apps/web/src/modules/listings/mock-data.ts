import type { Listing } from './types';

/**
 * Placeholder data standing in for the Apimo feed (F01.2, blocked on API
 * access as of the 2026-09 kickoff). Shape mirrors what we expect back from
 * Apimo so swapping this for a real connector later is a drop-in change.
 */
export const mockListings: Listing[] = [
  {
    id: '1',
    slug: 'villa-piscine-belair',
    title: 'Villa contemporaine avec piscine',
    transactionType: 'sale',
    propertyType: 'house',
    price: 1450000,
    location: 'Belair',
    surface: 240,
    rooms: 5,
    energyClass: 'B',
    image:
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1600&auto=format&fit=crop',
    badge: { label: 'Nouveau', tone: 'new' },
    featured: true
  },
  {
    id: '2',
    slug: 'demeure-parc-limpertsberg',
    title: 'Demeure de caractère avec parc',
    transactionType: 'sale',
    propertyType: 'house',
    price: 2980000,
    location: 'Limpertsberg',
    surface: 320,
    rooms: 7,
    energyClass: 'C',
    image:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop',
    badge: { label: 'Baisse de prix', tone: 'priceDrop' },
    featured: true
  },
  {
    id: '3',
    slug: 'penthouse-vue-quartier-gare',
    title: 'Penthouse lumineux, quartier Gare',
    transactionType: 'rent',
    propertyType: 'penthouse',
    price: 2400,
    location: 'Quartier Gare',
    surface: 110,
    rooms: 3,
    energyClass: 'D',
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop',
    featured: true
  },
  {
    id: '4',
    slug: 'maison-jardin-strassen',
    title: 'Maison avec jardin arboré',
    transactionType: 'sale',
    propertyType: 'house',
    price: 1890000,
    location: 'Strassen',
    surface: 210,
    rooms: 4,
    energyClass: 'B',
    image:
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1600&auto=format&fit=crop',
    badge: { label: 'Sous compromis', tone: 'underOffer' }
  },
  {
    id: '5',
    slug: 'appartement-lumineux-belair',
    title: 'Appartement traversant et lumineux',
    transactionType: 'rent',
    propertyType: 'apartment',
    price: 4500,
    location: 'Belair',
    surface: 160,
    rooms: 3,
    energyClass: 'A',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop',
    badge: { label: 'Nouveau', tone: 'new' }
  },
  {
    id: '6',
    slug: 'penthouse-piscine-limpertsberg',
    title: 'Penthouse avec toit-terrasse et piscine',
    transactionType: 'sale',
    propertyType: 'penthouse',
    price: 1120000,
    location: 'Limpertsberg',
    surface: 95,
    rooms: 2,
    energyClass: 'C',
    image:
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1600&auto=format&fit=crop'
  }
];
