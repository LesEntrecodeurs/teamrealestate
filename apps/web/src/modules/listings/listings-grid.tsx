import { useLocale, useTranslations } from 'next-intl';
import { ListingCard } from './listing-card';
import type { Listing } from './types';

export function ListingsGrid({ listings }: { listings: Listing[] }) {
  const t = useTranslations('ListingsPage');
  const locale = useLocale();

  if (listings.length === 0) {
    return <p className="text-muted-foreground">{t('empty')}</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} locale={locale} />
      ))}
    </div>
  );
}
