import { getTranslations } from 'next-intl/server';
import { PageHeader } from '@/components/layout/page-header';
import { filterListings } from '@/modules/listings/filter-listings';
import { ListingsGrid } from '@/modules/listings/listings-grid';
import { mockListings } from '@/modules/listings/mock-data';

export default async function BuyPage({
  searchParams
}: {
  searchParams: Promise<{ q?: string; type?: string; location?: string; budget?: string }>;
}) {
  const params = await searchParams;
  const t = await getTranslations('ListingsPage');
  const listings = filterListings(
    mockListings.filter((l) => l.transactionType === 'sale'),
    params
  );

  return (
    <>
      <PageHeader
        eyebrow={t('resultsCount', { count: listings.length })}
        title={t('buyTitle')}
        subtitle={t('buySubtitle')}
      />
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8">
        <ListingsGrid listings={listings} />
      </div>
    </>
  );
}
