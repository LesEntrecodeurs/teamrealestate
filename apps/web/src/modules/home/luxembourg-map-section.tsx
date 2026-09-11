'use client';

import { MapPin } from 'lucide-react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { Counter } from '@/components/ui/counter';
import { Reveal } from '@/components/ui/reveal';
import { useInView } from '@/hooks/use-in-view';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/modules/listings/listing-card';
import { mockListings } from '@/modules/listings/mock-data';
import { LUXEMBOURG_PATH } from './luxembourg-path';

/**
 * Approximate position of Luxembourg-Ville within the traced outline below
 * (not a precise projection — see luxembourg-path.ts). The four
 * neighbourhoods are all inside the capital, so they're clustered tightly
 * around the same point rather than spread across the country.
 */
const CITY_MARKER = { x: 520, y: 791 };
const NEIGHBORHOODS = [
  { name: 'Belair', x: 442, y: 698, tooltip: 'top' },
  { name: 'Limpertsberg', x: 604, y: 650, tooltip: 'top' },
  { name: 'Quartier Gare', x: 634, y: 836, tooltip: 'bottom' },
  { name: 'Strassen', x: 346, y: 806, tooltip: 'bottom' }
] as const;

function toPercent(value: number) {
  return `${(value / 1024) * 100}%`;
}

export function LuxembourgMapSection() {
  const t = useTranslations('HomePage.agency');
  const locale = useLocale();
  const { ref, inView } = useInView<HTMLDivElement>(0.25);
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(0);

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, []);

  const totalListings = mockListings.length;

  return (
    <section className="overflow-hidden bg-navy-50">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 py-20 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:py-28">
        <Reveal>
          <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            <span className="h-1.5 w-6 rounded-full bg-accent" />
            {t('eyebrow')}
          </p>
          <h2 className="font-display text-3xl font-bold leading-tight text-foreground sm:text-4xl">
            {t('title1')}
            <br />
            {t('title2')}
          </h2>
          <p className="mt-6 text-base text-muted-foreground">{t('body1')}</p>
          <p className="mt-4 text-base text-muted-foreground">{t('body2')}</p>
        </Reveal>

        <Reveal delay={150}>
          <div
            ref={ref}
            className="group/map relative mx-auto aspect-square w-full max-w-md touch-manipulation"
          >
            <div
              className="pointer-events-none absolute inset-0 -z-10 animate-[breathe_5s_ease-in-out_infinite] rounded-full bg-gradient-to-br from-cyan-300/50 via-cyan-500/20 to-transparent blur-3xl transition-opacity duration-1000"
              style={{ opacity: inView ? 1 : 0 }}
              aria-hidden="true"
            />

            <svg
              viewBox="0 0 1024 1024"
              className="size-full origin-center drop-shadow-[0_24px_40px_rgba(21,39,63,0.18)] transition-transform duration-700 ease-out group-hover/map:scale-[1.06]"
              aria-hidden="true"
            >
              <g transform="translate(0,1024) scale(0.1,-0.1)">
                <path
                  ref={pathRef}
                  d={LUXEMBOURG_PATH}
                  fill="none"
                  stroke="#00a0be"
                  strokeWidth={pathLength ? 18 : 0}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  style={{
                    strokeDasharray: pathLength,
                    strokeDashoffset: inView ? 0 : pathLength,
                    transition: 'stroke-dashoffset 900ms ease-out'
                  }}
                />
              </g>

              <circle
                cx={CITY_MARKER.x}
                cy={CITY_MARKER.y}
                r={26}
                fill="none"
                stroke="#d1622c"
                strokeWidth={5}
                className="origin-center animate-[radar-pulse_2.4s_ease-out_infinite]"
                style={{
                  transformBox: 'fill-box',
                  opacity: inView ? undefined : 0,
                  transition: 'opacity 500ms ease 850ms'
                }}
              />
              <circle
                cx={CITY_MARKER.x}
                cy={CITY_MARKER.y}
                r={26}
                fill="none"
                stroke="#00a0be"
                strokeWidth={3.5}
                className="origin-center animate-[radar-pulse_2.4s_ease-out_1.2s_infinite]"
                style={{
                  transformBox: 'fill-box',
                  opacity: inView ? undefined : 0,
                  transition: 'opacity 500ms ease 850ms'
                }}
              />
            </svg>

            {/* City marker + label */}
            <button
              type="button"
              className="group/pin absolute z-20 flex -translate-x-1/2 -translate-y-full flex-col items-center transition-opacity duration-500"
              style={{
                left: toPercent(CITY_MARKER.x),
                top: toPercent(CITY_MARKER.y),
                opacity: inView ? 1 : 0,
                transitionDelay: '850ms'
              }}
            >
              <span className="relative flex size-10 items-center justify-center">
                <span className="absolute size-7 animate-[radar-pulse_2.4s_ease-out_infinite] rounded-full bg-terracotta-500/30 blur-[2px]" />
                <MapPin
                  className="relative size-8 fill-terracotta-500 text-white drop-shadow-md transition-transform duration-300 group-hover/pin:scale-110"
                  strokeWidth={1.5}
                />
              </span>
              <span className="pointer-events-none absolute bottom-[calc(100%+10px)] whitespace-nowrap rounded-full bg-navy-900 px-3 py-1.5 text-xs font-semibold text-white shadow-lg transition-all duration-300 group-hover/pin:-translate-y-1 group-focus-visible/pin:-translate-y-1">
                Luxembourg-Ville
              </span>
              <span className="pointer-events-none absolute bottom-[calc(100%+38px)] w-48 scale-95 rounded-xl bg-white p-3 text-left opacity-0 shadow-xl shadow-navy-900/20 ring-1 ring-navy-100 transition-all duration-200 group-hover/pin:scale-100 group-hover/pin:opacity-100 group-focus-visible/pin:scale-100 group-focus-visible/pin:opacity-100">
                <span className="flex items-baseline gap-1.5">
                  <span className="font-display text-xl font-bold text-secondary">
                    {totalListings}
                  </span>
                  <span className="text-xs text-muted-foreground">biens dans nos secteurs</span>
                </span>
                <span className="mt-2 flex flex-col gap-1 border-t border-navy-100 pt-2">
                  {NEIGHBORHOODS.map((n) => (
                    <span
                      key={n.name}
                      className="flex items-center justify-between text-[11px] text-muted-foreground"
                    >
                      {n.name}
                      <span className="font-semibold text-foreground">
                        {mockListings.filter((l) => l.location === n.name).length}
                      </span>
                    </span>
                  ))}
                </span>
              </span>
            </button>

            {/* Neighbourhood markers */}
            {NEIGHBORHOODS.map((n, i) => {
              const areaListings = mockListings.filter((l) => l.location === n.name);
              const featured = areaListings[0];
              const extraCount = areaListings.length - 1;
              if (!featured) return null;

              return (
                <button
                  key={n.name}
                  type="button"
                  className="group/pin absolute z-10 flex -translate-x-1/2 -translate-y-full items-center justify-center transition-opacity duration-500"
                  style={{
                    left: toPercent(n.x),
                    top: toPercent(n.y),
                    opacity: inView ? 1 : 0,
                    transitionDelay: `${950 + i * 130}ms`
                  }}
                  aria-label={`${n.name} — ${areaListings.length} biens`}
                >
                  <span className="relative flex size-8 items-center justify-center">
                    <span
                      className="absolute size-5 animate-[radar-pulse_2.8s_ease-out_infinite] rounded-full bg-cyan-400/40 blur-[1.5px]"
                      style={{ animationDelay: `${i * 450}ms` }}
                    />
                    <MapPin
                      className="relative size-6 fill-secondary text-white drop-shadow transition-transform duration-300 group-hover/pin:scale-125"
                      strokeWidth={1.5}
                    />
                  </span>

                  <span
                    className={cn(
                      'pointer-events-none absolute w-44 scale-95 rounded-xl bg-white p-2 text-left opacity-0 shadow-xl shadow-navy-900/20 ring-1 ring-navy-100 transition-all duration-200 group-hover/pin:scale-100 group-hover/pin:opacity-100 group-focus-visible/pin:scale-100 group-focus-visible/pin:opacity-100',
                      n.tooltip === 'top'
                        ? 'bottom-[calc(100%+8px)] group-hover/pin:-translate-y-1'
                        : 'top-[calc(100%+8px)] group-hover/pin:translate-y-1'
                    )}
                  >
                    <span className="relative block aspect-[16/10] w-full overflow-hidden rounded-lg bg-muted">
                      <Image
                        src={featured.image}
                        alt=""
                        fill
                        sizes="176px"
                        className="object-cover"
                      />
                    </span>
                    <span className="mt-2 block line-clamp-1 text-xs font-semibold text-foreground">
                      {featured.title}
                    </span>
                    <span className="block text-xs font-bold text-secondary">
                      {formatPrice(featured, locale)}
                    </span>
                    <span className="mt-1 block text-[11px] text-muted-foreground">
                      {n.name}
                      {extraCount > 0
                        ? ` · +${extraCount} autre${extraCount > 1 ? 's' : ''} bien${extraCount > 1 ? 's' : ''}`
                        : ''}
                    </span>
                  </span>
                </button>
              );
            })}

            <div
              className="absolute -top-5 left-2 z-20 rounded-2xl bg-card px-4 py-3 shadow-xl shadow-navy-900/10 ring-1 ring-navy-100 transition-all duration-700 sm:-left-6"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(8px)',
                transitionDelay: '1300ms'
              }}
            >
              <p className="font-display text-2xl font-bold text-secondary">
                <Counter value="4" />
              </p>
              <p className="text-[11px] text-muted-foreground">quartiers couverts</p>
            </div>

            <div
              className="absolute -bottom-5 right-2 z-20 rounded-2xl bg-card px-4 py-3 shadow-xl shadow-navy-900/10 ring-1 ring-navy-100 transition-all duration-700 sm:-right-6"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(-8px)',
                transitionDelay: '1450ms'
              }}
            >
              <p className="font-display text-2xl font-bold text-secondary">
                <Counter value={String(totalListings)} />
              </p>
              <p className="text-[11px] text-muted-foreground">biens actifs sur la carte</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
