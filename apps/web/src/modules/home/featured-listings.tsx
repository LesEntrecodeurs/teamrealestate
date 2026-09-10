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
          className="flex shrink-0 items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-semibold uppercase tracking-widest text-foreground transition-colors hover:border-accent hover:text-accent"
        >
          {t('viewAll')}
          <ArrowRight className="size-4" />
        </Link>
      </div>

      <div className="flex flex-col">
        {listings.map((listing, i) => (
          <Reveal key={listing.id} delay={i * 60}>
            <FeaturedListingRow listing={listing} locale={locale} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
