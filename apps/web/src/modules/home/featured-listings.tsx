import { ArrowRight } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { Reveal } from '@/components/ui/reveal';
import { Link } from '@/i18n/navigation';
import { FeaturedListingRow } from '@/modules/home/featured-listing-row';
import { mockListings } from '@/modules/listings/mock-data';

export function FeaturedListings() {
  const t = useTranslations('HomePage.featured');
  const locale = useLocale();
  const listings = mockListings.filter((l) => l.featured);

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:py-28">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-border pb-8">
        <div>
          <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            <span className="h-1.5 w-6 rounded-full bg-accent" />
            {t('eyebrow')}
          </p>
          <h2 className="max-w-xl font-display text-3xl font-bold text-foreground sm:text-4xl">
            {t('title')}
          </h2>
        </div>
        <Link
          href="/acheter"
          className="group flex shrink-0 items-center gap-1.5 text-sm font-semibold text-accent"
        >
          <span className="underline decoration-transparent underline-offset-4 transition-colors group-hover:decoration-accent">
            {t('viewAll')}
          </span>
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="flex flex-col divide-y divide-border">
        {listings.map((listing, i) => (
          <Reveal key={listing.id} delay={i * 80}>
            <FeaturedListingRow listing={listing} locale={locale} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
