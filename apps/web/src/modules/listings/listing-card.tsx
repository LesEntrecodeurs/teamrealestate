import { MapPin } from 'lucide-react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import type { Listing } from './types';

const badgeTone: Record<NonNullable<Listing['badge']>['tone'], string> = {
  new: 'bg-secondary text-secondary-foreground',
  priceDrop: 'bg-terracotta-500 text-white',
  underOffer: 'bg-navy-800 text-white'
};

const energyClassTone: Record<Listing['energyClass'], string> = {
  A: 'bg-cyan-100 text-cyan-600',
  B: 'bg-emerald-100 text-emerald-700',
  C: 'bg-yellow-100 text-yellow-700',
  D: 'bg-orange-100 text-orange-700',
  E: 'bg-orange-200 text-orange-800',
  F: 'bg-red-100 text-red-700',
  G: 'bg-red-200 text-red-800'
};

function formatPrice(listing: Listing, locale: string) {
  const formatted = new Intl.NumberFormat(locale === 'en' ? 'en-LU' : 'fr-LU', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0
  }).format(listing.price);
  return listing.transactionType === 'rent' ? `${formatted}/mois` : formatted;
}

export function ListingCard({ listing, locale = 'fr' }: { listing: Listing; locale?: string }) {
  return (
    <Link
      href={`/biens/${listing.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-card ring-1 ring-border transition-shadow hover:shadow-xl hover:shadow-navy-900/10"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={listing.image}
          alt={listing.title}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex flex-col gap-2">
          <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
            {listing.transactionType === 'sale' ? 'À vendre' : 'À louer'}
          </span>
          {listing.badge ? (
            <span
              className={cn(
                'w-fit rounded-full px-3 py-1 text-xs font-semibold',
                badgeTone[listing.badge.tone]
              )}
            >
              {listing.badge.label}
            </span>
          ) : null}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <p className="font-display text-2xl font-medium text-foreground">
            {formatPrice(listing, locale)}
          </p>
          <span
            className={cn(
              'flex size-7 shrink-0 items-center justify-center rounded-md text-xs font-bold',
              energyClassTone[listing.energyClass]
            )}
          >
            {listing.energyClass}
          </span>
        </div>

        <p className="line-clamp-1 text-sm font-medium text-foreground">{listing.title}</p>

        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="size-4" />
          {listing.location}
        </div>

        <div className="mt-auto flex items-center gap-3 border-t border-border pt-3 text-sm text-muted-foreground">
          <span className="capitalize">
            {
              { apartment: 'Appartement', house: 'Maison', penthouse: 'Penthouse' }[
                listing.propertyType
              ]
            }
          </span>
          <span>·</span>
          <span>{listing.surface} m²</span>
          <span>·</span>
          <span>
            {listing.rooms} {listing.rooms > 1 ? 'chambres' : 'chambre'}
          </span>
        </div>
      </div>
    </Link>
  );
}
