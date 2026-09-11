import { useLocale, useTranslations } from 'next-intl';
import { ListingCard } from './listing-card';
import { PropertiesMap } from './properties-map';
import type { Listing } from './types';

export function ListingsGrid({ listings }: { listings: Listing[] }) {
  const t = useTranslations('ListingsPage');
  const locale = useLocale();

  if (listings.length === 0) {
    return <p className="text-muted-foreground">{t('empty')}</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px] lg:items-start">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} locale={locale} />
        ))}
      </div>

      <div className="h-[320px] overflow-hidden rounded-2xl border border-border shadow-sm lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)]">
        <PropertiesMap listings={listings} locale={locale} />
      </div>
    </div>
  );
}
