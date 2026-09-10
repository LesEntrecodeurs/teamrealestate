import { MapPin } from 'lucide-react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import type { Listing } from './types';

export const badgeTone: Record<NonNullable<Listing['badge']>['tone'], string> = {
  new: 'bg-secondary text-secondary-foreground',
  priceDrop: 'bg-terracotta-500 text-white',
  underOffer: 'bg-navy-800 text-white'
};

export const energyClassTone: Record<Listing['energyClass'], string> = {
  A: 'bg-cyan-100 text-cyan-600',
  B: 'bg-emerald-100 text-emerald-700',
  C: 'bg-yellow-100 text-yellow-700',
  D: 'bg-orange-100 text-orange-700',
  E: 'bg-orange-200 text-orange-800',
  F: 'bg-red-100 text-red-700',
  G: 'bg-red-200 text-red-800'
};

export function formatPrice(listing: Listing, locale: string) {
  const formatted = new Intl.NumberFormat(locale === 'en' ? 'en-LU' : 'fr-LU', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0
  }).format(listing.price);
  return listing.transactionType === 'rent' ? `${formatted}/mois` : formatted;
}

export function ListingCard({
  listing,
  locale = 'fr',
  size = 'default'
}: {
  listing: Listing;
  locale?: string;
  size?: 'default' | 'large';
}) {
  const large = size === 'large';

  return (
    <Link
      href={`/${listing.transactionType === 'sale' ? 'acheter' : 'louer'}/${listing.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-card shadow-md shadow-navy-950/5 ring-1 ring-border transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-navy-950/15"
    >
      <div className={cn('relative overflow-hidden', large ? 'aspect-[16/11]' : 'aspect-[4/3]')}>
        <Image
          src={listing.image}
          alt={listing.title}
          fill
          sizes={large ? '(min-width: 1024px) 50vw, 100vw' : '(min-width: 1024px) 25vw, 100vw'}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          <span className="w-fit rounded-full bg-secondary px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-secondary-foreground shadow-sm">
            {listing.transactionType === 'sale' ? 'À vendre' : 'À louer'}
          </span>
          {listing.badge ? (
            <span
              className={cn(
                'w-fit rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest shadow-sm',
                badgeTone[listing.badge.tone]
              )}
            >
              {listing.badge.label}
            </span>
          ) : null}
        </div>
      </div>

      <div className={cn('flex flex-1 flex-col gap-3', large ? 'p-6' : 'p-5')}>
        <div className="flex items-start justify-between gap-3">
          <p
            className={cn(
              'font-display font-bold text-foreground',
              large ? 'text-3xl' : 'text-2xl'
            )}
          >
            {formatPrice(listing, locale)}
          </p>
          <span
            title={`Classe énergie ${listing.energyClass}`}
            className={cn(
              'flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-bold',
              energyClassTone[listing.energyClass]
            )}
          >
            {listing.energyClass}
          </span>
        </div>

        <p
          className={cn(
            'font-semibold text-foreground',
            large ? 'text-lg' : 'line-clamp-1 text-base'
          )}
        >
          {listing.title}
        </p>

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
