import { useTranslations } from 'next-intl';
import { PageHeader } from '@/components/layout/page-header';
import { ListingsGrid } from '@/modules/listings/listings-grid';
import { mockListings } from '@/modules/listings/mock-data';

export default function BuyPage() {
  const t = useTranslations('ListingsPage');
  const listings = mockListings.filter((l) => l.transactionType === 'sale');

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
