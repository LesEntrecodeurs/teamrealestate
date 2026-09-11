import { getTranslations } from 'next-intl/server';
import { PageHeader } from '@/components/layout/page-header';
import { filterListings } from '@/modules/listings/filter-listings';
import { ListingsFilterBar } from '@/modules/listings/listings-filter-bar';
import { ListingsGrid } from '@/modules/listings/listings-grid';
import { mockListings } from '@/modules/listings/mock-data';

export default async function RentPage({
  searchParams
}: {
  searchParams: Promise<{ q?: string; type?: string; location?: string; budget?: string }>;
}) {
  const params = await searchParams;
  const t = await getTranslations('ListingsPage');
  const listings = filterListings(
    mockListings.filter((l) => l.transactionType === 'rent'),
    params
  );

  return (
    <>
      <PageHeader
        eyebrow={t('resultsCount', { count: listings.length })}
        title={t('rentTitle')}
        subtitle={t('rentSubtitle')}
      />
      <div className="relative z-10 mx-auto -mt-8 w-full max-w-7xl px-6 sm:-mt-10 sm:px-8">
        <ListingsFilterBar basePath="/louer" initial={params} />
      </div>
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8">
        <ListingsGrid listings={listings} />
      </div>
    </>
  );
}
