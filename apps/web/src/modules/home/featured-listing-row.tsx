import { MapPin } from 'lucide-react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { badgeTone, energyClassTone, formatPrice } from '@/modules/listings/listing-card';
import type { Listing } from '@/modules/listings/types';

const propertyTypeLabel: Record<Listing['propertyType'], string> = {
  apartment: 'Appartement',
  house: 'Maison',
  penthouse: 'Penthouse'
};

export function FeaturedListingRow({ listing, locale }: { listing: Listing; locale: string }) {
  return (
    <Link
      href={`/${listing.transactionType === 'sale' ? 'acheter' : 'louer'}/${listing.slug}`}
      className="group flex items-center gap-5 border-b border-border py-5 transition-colors hover:bg-navy-50 sm:gap-6"
    >
      <div className="relative size-20 shrink-0 overflow-hidden rounded-xl sm:size-24">
        <Image
          src={listing.image}
          alt={listing.title}
          fill
          sizes="96px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <p className="truncate font-display text-lg font-bold text-foreground sm:text-xl">
          {listing.title}
        </p>
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="rounded-full bg-secondary px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-secondary-foreground">
            {listing.transactionType === 'sale' ? 'À vendre' : 'À louer'}
          </span>
          {listing.badge ? (
            <span
              className={cn(
                'rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide',
                badgeTone[listing.badge.tone]
              )}
            >
              {listing.badge.label}
            </span>
          ) : null}
        </div>
        <div className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="size-3.5 shrink-0" />
          <span className="truncate">
            {listing.location} · {propertyTypeLabel[listing.propertyType]} · {listing.surface} m² ·{' '}
            {listing.rooms} {listing.rooms > 1 ? 'chambres' : 'chambre'}
          </span>
        </div>
      </div>

      <div className="flex shrink-0 flex-col items-end gap-2">
        <p className="font-display text-xl font-bold text-foreground sm:text-2xl">
          {formatPrice(listing, locale)}
        </p>
        <span
          className={cn(
            'flex size-7 items-center justify-center rounded-full text-xs font-bold',
            energyClassTone[listing.energyClass]
          )}
        >
          {listing.energyClass}
        </span>
      </div>
    </Link>
  );
}
