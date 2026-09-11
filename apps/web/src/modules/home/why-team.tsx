'use client';

import { Layers, PhoneCall, RefreshCw, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/ui/reveal';
import { useInView } from '@/hooks/use-in-view';
import { cn } from '@/lib/utils';

const RING_COLORS = ['#00a0be', '#d1622c', '#3a5677', '#7fcfe0'];
const RING_RADIUS = 90;
const RING_STROKE = 26;
const CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;
const QUARTER = CIRCUMFERENCE / 4;
const SEGMENT_GAP = 10;
const SEGMENT_LENGTH = QUARTER - SEGMENT_GAP;

export function WhyTeam() {
  const t = useTranslations('HomePage.why');
  const { ref, inView } = useInView<HTMLDivElement>();

  const items = [
    {
      title: t('item1Title'),
      body: t('item1Body'),
      Icon: PhoneCall,
      value: 95,
      color: RING_COLORS[0]
    },
    {
      title: t('item2Title'),
      body: t('item2Body'),
      Icon: Layers,
      value: 90,
      color: RING_COLORS[1]
    },
    {
      title: t('item3Title'),
      body: t('item3Body'),
      Icon: RefreshCw,
      value: 85,
      color: RING_COLORS[2]
    },
    {
      title: t('item4Title'),
      body: t('item4Body'),
      Icon: Sparkles,
      value: 90,
      color: RING_COLORS[3]
    }
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:py-28">
      <div className="mb-14">
        <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
          {t('title')}
        </h2>
      </div>

      <div ref={ref} className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <div className="relative mx-auto size-72 shrink-0 sm:size-80 lg:size-96">
          <svg viewBox="0 0 220 220" className="size-full -rotate-90" aria-hidden="true">
            <circle
              cx="110"
              cy="110"
              r={RING_RADIUS}
              fill="none"
              stroke="#f2f4f6"
              strokeWidth={RING_STROKE}
            />
            {items.map((item, i) => (
              <circle
                key={item.title}
                cx="110"
                cy="110"
                r={RING_RADIUS}
                fill="none"
                stroke={item.color}
                strokeWidth={RING_STROKE}
                strokeLinecap="round"
                strokeDasharray={`${SEGMENT_LENGTH} ${CIRCUMFERENCE - SEGMENT_LENGTH}`}
                strokeDashoffset={-(i * QUARTER)}
                style={{
                  transformOrigin: '110px 110px',
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'scale(1)' : 'scale(0.8)',
                  transition: `opacity 700ms ease ${i * 130}ms, transform 700ms cubic-bezier(0.22, 1, 0.36, 1) ${i * 130}ms`
                }}
              />
            ))}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center">
            <Image
              src="/logo/team-symbole.png"
              alt=""
              width={80}
              height={80}
              className="h-8 w-auto sm:h-9"
            />
            <p className="max-w-[7rem] text-[11px] font-semibold uppercase leading-tight tracking-wide text-muted-foreground">
              {t('hubLabel')}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 90}>
              <div className="flex items-start gap-4">
                <span
                  className={cn(
                    'mt-1 flex size-9 shrink-0 items-center justify-center rounded-full'
                  )}
                  style={{ backgroundColor: `${item.color}1a`, color: item.color }}
                >
                  <item.Icon className="size-4" />
                </span>
                <div>
                  <div className="flex items-baseline gap-2">
                    <p className="font-semibold text-foreground">{item.title}</p>
                    <span className="font-display text-sm font-bold" style={{ color: item.color }}>
                      {item.value}%
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{item.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
