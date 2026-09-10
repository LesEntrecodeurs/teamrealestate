import { ArrowRight } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { Reveal } from '@/components/ui/reveal';
import { Link } from '@/i18n/navigation';
import { ListingCard } from '@/modules/listings/listing-card';
import { mockListings } from '@/modules/listings/mock-data';

export function FeaturedListings() {
  const t = useTranslations('HomePage.featured');
  const locale = useLocale();
  const [hero, ...rest] = mockListings.filter((l) => l.featured);
  const side = rest.slice(0, 2);

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:py-28">
      <div className="mb-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
        <p className="border-l-2 border-accent pl-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent lg:col-span-3">
          {t('eyebrow')}
        </p>
        <div className="flex flex-wrap items-end justify-between gap-4 lg:col-span-9">
          <h2 className="max-w-xl font-display text-3xl font-medium text-foreground sm:text-4xl">
            {t('title')}
          </h2>
          <Link
            href="/acheter"
            className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-secondary hover:underline"
          >
            {t('viewAll')}
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>

      {hero ? (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Reveal>
            <ListingCard listing={hero} locale={locale} size="large" />
          </Reveal>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1">
            {side.map((listing, i) => (
              <Reveal key={listing.id} delay={120 + i * 80}>
                <ListingCard listing={listing} locale={locale} />
              </Reveal>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
