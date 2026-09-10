import { Check, MapPin } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { PointOfInterest } from '@/modules/listings/types';

export function PropertyHighlights({
  features,
  pointsOfInterest
}: {
  features: string[];
  pointsOfInterest: PointOfInterest[];
}) {
  const t = useTranslations('ListingDetail');

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
      <div>
        <h2 className="font-display text-xl font-bold text-foreground">{t('featuresTitle')}</h2>
        <ul className="mt-4 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
          {features.map((feature) => (
            <li key={feature} className="flex items-center gap-2.5 text-sm text-foreground">
              <Check className="size-4 shrink-0 text-secondary" />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="font-display text-xl font-bold text-foreground">
          {t('pointsOfInterestTitle')}
        </h2>
        <ul className="mt-4 flex flex-col gap-3">
          {pointsOfInterest.map((poi) => (
            <li
              key={poi.label}
              className="flex items-center justify-between gap-3 border-b border-border pb-3 text-sm last:border-b-0"
            >
              <span className="flex items-center gap-2.5 text-foreground">
                <MapPin className="size-4 shrink-0 text-secondary" />
                {poi.label}
              </span>
              <span className="shrink-0 text-muted-foreground">{poi.distance}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
