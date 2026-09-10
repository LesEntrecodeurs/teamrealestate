import type { Listing, PointOfInterest } from './types';

/**
 * Placeholder data standing in for the Apimo feed (F01.2, blocked on API
 * access as of the 2026-09 kickoff). Shape mirrors what we expect back from
 * Apimo so swapping this for a real connector later is a drop-in change.
 *
 * `images` reuse the same handful of stock photos across listings (no real
 * per-property galleries exist yet); `floorPlans` point at the placeholder
 * SVGs in `public/floorplans/`, not real plans.
 */

const gallery = {
  villa:
    'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1600&auto=format&fit=crop',
  demeure:
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop',
  penthouseGare:
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop',
  maisonStrassen:
    'https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1600&auto=format&fit=crop',
  appartementBelair:
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop',
  penthouseLimpertsberg:
    'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1600&auto=format&fit=crop'
};

type ListingLocation = 'Belair' | 'Limpertsberg' | 'Quartier Gare' | 'Strassen';

const poiByLocation: Record<ListingLocation, PointOfInterest[]> = {
  Belair: [
    { label: 'École internationale', distance: '5 min' },
    { label: 'Arrêt de tram', distance: '3 min' },
    { label: 'Parc Édouard André', distance: '4 min' },
    { label: 'Commerces de proximité', distance: '2 min' }
  ],
  Limpertsberg: [
    { label: 'Lycée Robert Schuman', distance: '6 min' },
    { label: 'Arrêt de tram', distance: '4 min' },
    { label: 'Piscine Belair', distance: '7 min' },
    { label: 'Boulangerie & marché', distance: '3 min' }
  ],
  'Quartier Gare': [
    { label: 'Gare centrale', distance: '4 min' },
    { label: 'Arrêt de tram', distance: '2 min' },
    { label: 'Commerces & restaurants', distance: '1 min' },
    { label: 'Pharmacie', distance: '3 min' }
  ],
  Strassen: [
    { label: 'École primaire', distance: '5 min' },
    { label: 'Centre commercial Belle Étoile', distance: '6 min' },
    { label: 'Accès autoroute A6', distance: '3 min' },
    { label: 'Parc communal', distance: '4 min' }
  ]
};

const houseFeatures = [
  'Piscine chauffée',
  'Garage double',
  'Cave à vin',
  'Domotique',
  'Climatisation réversible',
  'Jardin arboré',
  'Cheminée',
  'Terrasse couverte'
];

const apartmentFeatures = [
  'Ascenseur',
  'Terrasse',
  'Cave privative',
  'Parking souterrain',
  'Balcon',
  'Double vitrage',
  'Climatisation réversible',
  'Fibre optique'
];

const penthouseFeatures = [
  'Toit-terrasse privatif',
  'Ascenseur privatif',
  'Vue dégagée',
  'Parking souterrain',
  'Domotique',
  'Climatisation réversible',
  'Cave privative',
  'Fibre optique'
];

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
    image: gallery.villa,
    images: [gallery.villa, gallery.demeure, gallery.maisonStrassen, gallery.penthouseGare],
    floorPlans: ['/floorplans/rez-de-chaussee.svg', '/floorplans/etage.svg'],
    features: houseFeatures,
    pointsOfInterest: poiByLocation.Belair,
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
    image: gallery.demeure,
    images: [gallery.demeure, gallery.villa, gallery.penthouseLimpertsberg, gallery.maisonStrassen],
    floorPlans: ['/floorplans/rez-de-chaussee.svg', '/floorplans/etage.svg'],
    features: houseFeatures,
    pointsOfInterest: poiByLocation.Limpertsberg,
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
    image: gallery.penthouseGare,
    images: [
      gallery.penthouseGare,
      gallery.appartementBelair,
      gallery.penthouseLimpertsberg,
      gallery.demeure
    ],
    floorPlans: ['/floorplans/appartement.svg'],
    features: penthouseFeatures,
    pointsOfInterest: poiByLocation['Quartier Gare'],
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
    image: gallery.maisonStrassen,
    images: [gallery.maisonStrassen, gallery.villa, gallery.demeure, gallery.appartementBelair],
    floorPlans: ['/floorplans/rez-de-chaussee.svg', '/floorplans/etage.svg'],
    features: houseFeatures,
    pointsOfInterest: poiByLocation.Strassen,
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
    image: gallery.appartementBelair,
    images: [
      gallery.appartementBelair,
      gallery.penthouseGare,
      gallery.penthouseLimpertsberg,
      gallery.villa
    ],
    floorPlans: ['/floorplans/appartement.svg'],
    features: apartmentFeatures,
    pointsOfInterest: poiByLocation.Belair,
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
    image: gallery.penthouseLimpertsberg,
    images: [
      gallery.penthouseLimpertsberg,
      gallery.demeure,
      gallery.appartementBelair,
      gallery.penthouseGare
    ],
    floorPlans: ['/floorplans/appartement.svg'],
    features: penthouseFeatures,
    pointsOfInterest: poiByLocation.Limpertsberg
  }
];
