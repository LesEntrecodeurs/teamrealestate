import { notFound } from 'next/navigation';
import { ListingDetailView } from '@/modules/listings/detail/listing-detail-view';
import { mockListings } from '@/modules/listings/mock-data';

export function generateStaticParams() {
  return mockListings
    .filter((listing) => listing.transactionType === 'sale')
    .map((listing) => ({ slug: listing.slug }));
}

export default async function BuyListingDetailPage({
  params
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const listing = mockListings.find((l) => l.slug === slug && l.transactionType === 'sale');

  if (!listing) {
    notFound();
  }

  return <ListingDetailView listing={listing} locale={locale} />;
}
