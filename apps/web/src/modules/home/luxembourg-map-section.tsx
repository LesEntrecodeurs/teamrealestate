'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { Counter } from '@/components/ui/counter';
import { Reveal } from '@/components/ui/reveal';
import { useInView } from '@/hooks/use-in-view';
import { cn } from '@/lib/utils';
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
  { name: 'Belair', x: 494, y: 760, tooltip: 'top' },
  { name: 'Limpertsberg', x: 548, y: 744, tooltip: 'top' },
  { name: 'Quartier Gare', x: 558, y: 806, tooltip: 'bottom' },
  { name: 'Strassen', x: 462, y: 796, tooltip: 'bottom' }
] as const;

function toPercent(value: number) {
  return `${(value / 1024) * 100}%`;
}

export function LuxembourgMapSection() {
  const t = useTranslations('HomePage.agency');
  const { ref, inView } = useInView<HTMLDivElement>(0.25);
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(0);

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, []);

  const stats = [
    { value: t('stat1Value'), label: t('stat1Label') },
    { value: t('stat2Value'), label: t('stat2Label') },
    { value: t('stat3Value'), label: t('stat3Label') }
  ];

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

          <dl className="mt-10 grid grid-cols-1 gap-8 border-t border-navy-100 pt-8 sm:grid-cols-3 sm:gap-6 sm:divide-x sm:divide-navy-100">
            {stats.map((stat) => (
              <div key={stat.label} className="sm:pl-6 sm:first:pl-0">
                <dt className="font-display text-4xl font-bold text-secondary">
                  <Counter value={stat.value} />
                </dt>
                <dd className="mt-1.5 text-sm text-muted-foreground">{stat.label}</dd>
              </div>
            ))}
          </dl>
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
                  fill="#15273f"
                  stroke="#00a0be"
                  strokeWidth={pathLength ? 16 : 0}
                  strokeLinejoin="round"
                  style={{
                    fillOpacity: inView ? 1 : 0,
                    strokeDasharray: pathLength,
                    strokeDashoffset: inView ? 0 : pathLength,
                    transition:
                      'stroke-dashoffset 2000ms ease-out, fill-opacity 900ms ease-out 1000ms'
                  }}
                />
              </g>

              <circle
                cx={CITY_MARKER.x}
                cy={CITY_MARKER.y}
                r={14}
                fill="none"
                stroke="#d1622c"
                strokeWidth={3}
                className="origin-center animate-[radar-pulse_2.4s_ease-out_infinite]"
                style={{
                  transformBox: 'fill-box',
                  opacity: inView ? undefined : 0,
                  transition: 'opacity 500ms ease 1600ms'
                }}
              />
              <circle
                cx={CITY_MARKER.x}
                cy={CITY_MARKER.y}
                r={14}
                fill="none"
                stroke="#00a0be"
                strokeWidth={2}
                className="origin-center animate-[radar-pulse_2.4s_ease-out_1.2s_infinite]"
                style={{
                  transformBox: 'fill-box',
                  opacity: inView ? undefined : 0,
                  transition: 'opacity 500ms ease 1600ms'
                }}
              />
            </svg>

            {/* City marker + label */}
            <button
              type="button"
              className="group/pin absolute z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center transition-opacity duration-500"
              style={{
                left: toPercent(CITY_MARKER.x),
                top: toPercent(CITY_MARKER.y),
                opacity: inView ? 1 : 0,
                transitionDelay: '1600ms'
              }}
            >
              <span className="block size-4 rounded-full border-2 border-white bg-terracotta-500 shadow-lg transition-transform duration-300 group-hover/pin:scale-125" />
              <span className="pointer-events-none absolute bottom-[calc(100%+10px)] whitespace-nowrap rounded-full bg-navy-900 px-3 py-1.5 text-xs font-semibold text-white shadow-lg transition-all duration-300 group-hover/pin:-translate-y-1 group-focus-visible/pin:-translate-y-1">
                Luxembourg-Ville
              </span>
              <span className="pointer-events-none absolute bottom-[calc(100%+38px)] w-max max-w-[11rem] scale-95 rounded-xl bg-white px-3 py-2 text-left opacity-0 shadow-xl shadow-navy-900/20 ring-1 ring-navy-100 transition-all duration-200 group-hover/pin:scale-100 group-hover/pin:opacity-100 group-focus-visible/pin:scale-100 group-focus-visible/pin:opacity-100">
                <span className="block font-display text-lg font-bold text-secondary">
                  {totalListings}
                </span>
                <span className="block text-[11px] leading-tight text-muted-foreground">
                  biens dans nos secteurs
                </span>
              </span>
            </button>

            {/* Neighbourhood markers */}
            {NEIGHBORHOODS.map((n, i) => {
              const count = mockListings.filter((l) => l.location === n.name).length;
              return (
                <button
                  key={n.name}
                  type="button"
                  className="group/pin absolute z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center p-3 transition-opacity duration-500"
                  style={{
                    left: toPercent(n.x),
                    top: toPercent(n.y),
                    opacity: inView ? 1 : 0,
                    transitionDelay: `${1750 + i * 130}ms`
                  }}
                  aria-label={`${n.name} — ${count} biens`}
                >
                  <span
                    className="absolute size-4 animate-[radar-pulse_2.8s_ease-out_infinite] rounded-full bg-cyan-400/70"
                    style={{ animationDelay: `${i * 450}ms` }}
                  />
                  <span className="relative block size-2.5 rounded-full border-2 border-white bg-secondary shadow transition-transform duration-300 group-hover/pin:scale-150" />

                  <span
                    className={cn(
                      'pointer-events-none absolute w-max max-w-[10rem] scale-95 rounded-xl bg-white px-3 py-2 text-left opacity-0 shadow-xl shadow-navy-900/20 ring-1 ring-navy-100 transition-all duration-200 group-hover/pin:scale-100 group-hover/pin:opacity-100 group-focus-visible/pin:scale-100 group-focus-visible/pin:opacity-100',
                      n.tooltip === 'top'
                        ? 'bottom-[calc(100%+8px)] group-hover/pin:-translate-y-1'
                        : 'top-[calc(100%+8px)] group-hover/pin:translate-y-1'
                    )}
                  >
                    <span className="block text-sm font-semibold text-foreground">{n.name}</span>
                    <span className="block text-[11px] leading-tight text-muted-foreground">
                      {count} bien{count > 1 ? 's' : ''} disponible{count > 1 ? 's' : ''}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
