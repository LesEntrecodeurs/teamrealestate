'use client';

import { LayoutGrid, Map as MapIcon, Rows3 } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ListingCard } from './listing-card';
import type { Listing } from './types';

const PropertiesMap = dynamic(() => import('./properties-map').then((mod) => mod.PropertiesMap), {
  ssr: false
});

type ViewMode = 'split' | 'list' | 'map';

export function ListingsGrid({ listings }: { listings: Listing[] }) {
  const t = useTranslations('ListingsPage');
  const locale = useLocale();
  const [view, setView] = useState<ViewMode>('split');
  const [visibleIds, setVisibleIds] = useState<string[] | null>(null);

  if (listings.length === 0) {
    return <p className="text-muted-foreground">{t('empty')}</p>;
  }

  const displayedListings =
    view === 'split' && visibleIds
      ? listings.filter((listing) => visibleIds.includes(listing.id))
      : listings;

  const views: { key: ViewMode; label: string; icon: typeof LayoutGrid }[] = [
    { key: 'split', label: t('viewSplit'), icon: LayoutGrid },
    { key: 'list', label: t('viewList'), icon: Rows3 },
    { key: 'map', label: t('viewMap'), icon: MapIcon }
  ];

  return (
    <div>
      <div className="mb-6 flex w-fit items-center gap-1 rounded-lg bg-navy-50 p-1">
        {views.map((v) => (
          <button
            key={v.key}
            type="button"
            onClick={() => setView(v.key)}
            className={cn(
              'flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors',
              view === v.key
                ? 'bg-white text-navy-900 shadow-sm'
                : 'text-navy-500 hover:text-navy-900'
            )}
          >
            <v.icon className="size-4" />
            {v.label}
          </button>
        ))}
      </div>

      <div
        className={cn(
          'grid grid-cols-1 gap-8',
          view === 'split' && 'lg:grid-cols-2 lg:items-start'
        )}
      >
        {view !== 'map' ? (
          <div
            className={cn(
              'grid grid-cols-1 gap-6 sm:grid-cols-2',
              view === 'list' && 'xl:grid-cols-3'
            )}
          >
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} locale={locale} />
            ))}
          </div>
        ) : null}

        {view !== 'list' ? (
          <div
            className={cn(
              'overflow-hidden rounded-2xl border border-border shadow-sm',
              view === 'map'
                ? 'h-[70vh] min-h-[420px]'
                : 'h-[420px] lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)]'
            )}
          >
            <PropertiesMap listings={listings} locale={locale} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
