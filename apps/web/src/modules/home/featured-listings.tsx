import { ArrowRight } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ListingCard } from '@/modules/listings/listing-card';
import { mockListings } from '@/modules/listings/mock-data';

export function FeaturedListings() {
  const t = useTranslations('HomePage.featured');
  const locale = useLocale();
  const featured = mockListings.filter((l) => l.featured).slice(0, 3);

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:py-28">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-accent">
            <span className="h-px w-6 bg-accent" />
            {t('eyebrow')}
          </p>
          <h2 className="max-w-xl font-display text-3xl font-medium text-foreground sm:text-4xl">
            {t('title')}
          </h2>
        </div>
        <Link
          href="/acheter"
          className="flex items-center gap-1.5 text-sm font-semibold text-secondary hover:underline"
        >
          {t('viewAll')}
          <ArrowRight className="size-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((listing) => (
          <ListingCard key={listing.id} listing={listing} locale={locale} />
        ))}
      </div>
    </section>
  );
}
