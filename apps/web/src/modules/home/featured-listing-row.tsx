import { ArrowRight, MapPin, Zap } from 'lucide-react';
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

export function FeaturedListingRow({
  listing,
  locale,
  index
}: {
  listing: Listing;
  locale: string;
  index: number;
}) {
  return (
    <Link
      href={`/${listing.transactionType === 'sale' ? 'acheter' : 'louer'}/${listing.slug}`}
      className="group flex flex-col gap-5 py-8 sm:flex-row sm:items-center sm:gap-6"
    >
      <span className="hidden shrink-0 font-display text-5xl font-bold text-navy-100 transition-colors duration-300 group-hover:text-cyan-100 sm:block lg:text-6xl">
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className="relative aspect-[16/10] shrink-0 overflow-hidden rounded-2xl sm:w-56 lg:w-64">
        <Image
          src={listing.image}
          alt={listing.title}
          fill
          sizes="(min-width: 640px) 33vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          <span className="w-fit rounded-full bg-secondary px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-secondary-foreground shadow-sm">
            {listing.transactionType === 'sale' ? 'À vendre' : 'À louer'}
          </span>
          {listing.badge ? (
            <span
              className={cn(
                'w-fit rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide shadow-sm',
                badgeTone[listing.badge.tone]
              )}
            >
              {listing.badge.label}
            </span>
          ) : null}
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-2.5">
        <p className="font-display text-2xl font-bold text-foreground transition-colors group-hover:text-secondary sm:text-3xl">
          {listing.title}
        </p>
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="size-4 shrink-0" />
          {listing.location}
        </div>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span>{propertyTypeLabel[listing.propertyType]}</span>
          <span>·</span>
          <span>{listing.surface} m²</span>
          <span>·</span>
          <span>
            {listing.rooms} {listing.rooms > 1 ? 'chambres' : 'chambre'}
          </span>
        </div>
      </div>

      <div className="flex shrink-0 flex-row items-center justify-between gap-4 sm:flex-col sm:items-end sm:justify-center sm:gap-2">
        <p className="whitespace-nowrap font-display text-2xl font-bold text-foreground sm:text-3xl">
          {formatPrice(listing, locale)}
        </p>
        <span
          title={`Classe énergie ${listing.energyClass}`}
          className={cn(
            'inline-flex items-center gap-1 whitespace-nowrap rounded-lg px-2.5 py-1.5 text-sm font-bold',
            energyClassTone[listing.energyClass]
          )}
        >
          <Zap className="size-3.5" />
          {listing.energyClass}
        </span>
      </div>

      <div className="hidden shrink-0 sm:block">
        <span className="flex size-11 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-300 group-hover:border-secondary group-hover:bg-secondary group-hover:text-secondary-foreground">
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
