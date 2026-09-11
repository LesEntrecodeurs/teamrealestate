/**
 * Approximate coordinates for the neighbourhoods/communes used in mock
 * listing data. Falls back to Luxembourg City centre for anything not
 * listed — swap this for real geocoding once Apimo provides addresses.
 */
const LOCATION_COORDINATES: Record<string, { lat: number; lng: number }> = {
  Belair: { lat: 49.6083, lng: 6.1119 },
  Limpertsberg: { lat: 49.6231, lng: 6.1281 },
  'Quartier Gare': { lat: 49.5996, lng: 6.1339 },
  Strassen: { lat: 49.6217, lng: 6.0728 }
};

const LUXEMBOURG_CITY_CENTER = { lat: 49.6116, lng: 6.1319 };

export function getLocationCoordinates(location: string) {
  return LOCATION_COORDINATES[location] ?? LUXEMBOURG_CITY_CENTER;
}
