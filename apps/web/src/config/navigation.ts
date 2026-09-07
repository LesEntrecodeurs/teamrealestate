export const mainNav = [
  { href: '/acheter', key: 'buy' },
  { href: '/louer', key: 'rent' },
  { href: '/vendre', key: 'sell' },
  { href: '/agence', key: 'agency' },
  { href: '/contact', key: 'contact' }
] as const;

export const locales = [
  { code: 'fr', label: 'FR' },
  { code: 'en', label: 'EN' }
] as const;
