import { ArrowLeft, BedDouble, Gauge, Ruler } from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { mockListings } from '@/modules/listings/mock-data';

export function generateStaticParams() {
  return mockListings.map((listing) => ({ slug: listing.slug }));
}

export default async function ListingDetailPage({
  params
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const listing = mockListings.find((l) => l.slug === slug);

  if (!listing) {
    notFound();
  }

  const t = await getTranslations('ListingDetail');
  const price = new Intl.NumberFormat(locale === 'en' ? 'en-LU' : 'fr-LU', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0
  }).format(listing.price);

  return (
    <div className="mx-auto max-w-5xl px-6 py-28 sm:px-8">
      <Link
        href="/acheter"
        className="mb-8 flex w-fit items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        {t('back')}
      </Link>

      <div className="relative aspect-[16/9] overflow-hidden rounded-3xl">
        <Image src={listing.image} alt={listing.title} fill priority className="object-cover" />
      </div>

      <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:justify-between">
        <div>
          <p className="text-sm font-medium text-secondary">{listing.location}</p>
          <h1 className="mt-1 font-display text-3xl font-bold text-foreground sm:text-4xl">
            {listing.title}
          </h1>
          <p className="mt-3 font-display text-2xl text-foreground">
            {price}
            {listing.transactionType === 'rent' ? '/mois' : ''}
          </p>
        </div>

        <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col">
          <Button asChild variant="primary" size="lg">
            <Link href="/contact">{t('contactAgent')}</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contact">{t('requestVisit')}</Link>
          </Button>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-3 gap-4 border-y border-border py-6">
        <div className="flex items-center gap-3">
          <Ruler className="size-5 text-secondary" />
          <div>
            <p className="text-sm text-muted-foreground">{t('surface')}</p>
            <p className="font-medium text-foreground">{listing.surface} m²</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <BedDouble className="size-5 text-secondary" />
          <div>
            <p className="text-sm text-muted-foreground">{t('rooms')}</p>
            <p className="font-medium text-foreground">{listing.rooms}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Gauge className="size-5 text-secondary" />
          <div>
            <p className="text-sm text-muted-foreground">{t('energyClass')}</p>
            <p className="font-medium text-foreground">{listing.energyClass}</p>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="font-display text-xl font-bold text-foreground">{t('description')}</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          {t('descriptionBody', { location: listing.location })}
        </p>
      </div>
    </div>
  );
}
