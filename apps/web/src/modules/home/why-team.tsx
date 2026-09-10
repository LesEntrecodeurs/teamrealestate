import { Layers, PhoneCall, RefreshCw, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/ui/reveal';

const nodePositions = [
  { left: '18%', top: '16%' },
  { left: '82%', top: '16%' },
  { left: '18%', top: '84%' },
  { left: '82%', top: '84%' }
];

export function WhyTeam() {
  const t = useTranslations('HomePage.why');

  const items = [
    { n: '01', title: t('item1Title'), body: t('item1Body'), Icon: PhoneCall },
    { n: '02', title: t('item2Title'), body: t('item2Body'), Icon: Layers },
    { n: '03', title: t('item3Title'), body: t('item3Body'), Icon: RefreshCw },
    { n: '04', title: t('item4Title'), body: t('item4Body'), Icon: Sparkles }
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:py-28">
      <div className="mb-14 grid grid-cols-1 gap-6 lg:grid-cols-12">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent lg:col-span-3">
          <span className="h-1.5 w-6 rounded-full bg-accent" />
          {t('eyebrow')}
        </p>
        <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl lg:col-span-9">
          {t('title')}
        </h2>
      </div>

      {/* Desktop: hub-and-spoke diagram — the team at the center, each strength radiating out */}
      <div className="relative hidden h-[640px] lg:block">
        <svg className="absolute inset-0 size-full" aria-hidden="true">
          {items.map((item, i) => (
            <line
              key={item.n}
              x1="50%"
              y1="50%"
              x2={nodePositions[i]?.left}
              y2={nodePositions[i]?.top}
              stroke="#cfd8e0"
              strokeWidth={1.5}
              strokeDasharray="5 6"
            />
          ))}
        </svg>

        <div className="absolute left-1/2 top-1/2 flex size-40 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-2 rounded-full bg-navy-900 shadow-xl shadow-navy-900/25 ring-8 ring-navy-50">
          <Image
            src="/logo/team-symbole-negatif.png"
            alt=""
            width={80}
            height={80}
            className="h-9 w-auto"
          />
          <p className="max-w-[7rem] text-center text-[11px] font-semibold uppercase leading-tight tracking-wide text-white/80">
            {t('hubLabel')}
          </p>
        </div>

        {items.map((item, i) => (
          <div
            key={item.n}
            className="absolute w-72 -translate-x-1/2 -translate-y-1/2"
            style={{ left: nodePositions[i]?.left, top: nodePositions[i]?.top }}
          >
            <Reveal delay={i * 100}>
              <div className="rounded-2xl border border-navy-100 bg-card p-5 shadow-sm transition-shadow hover:shadow-lg hover:shadow-navy-900/10">
                <div className="flex items-center gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-cyan-100 text-secondary">
                    <item.Icon className="size-4" />
                  </span>
                  <span className="font-display text-sm text-navy-300">{item.n}</span>
                </div>
                <p className="mt-3 font-semibold text-foreground">{item.title}</p>
                <p className="mt-1.5 text-sm text-muted-foreground">{item.body}</p>
              </div>
            </Reveal>
          </div>
        ))}
      </div>

      {/* Mobile/tablet: vertical connected graph */}
      <div className="relative lg:hidden">
        <div className="absolute bottom-5 left-[19px] top-5 w-px bg-navy-100" />
        <div className="flex flex-col gap-8">
          {items.map((item, i) => (
            <Reveal key={item.n} delay={i * 80}>
              <div className="relative flex gap-4">
                <span className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                  <item.Icon className="size-4" />
                </span>
                <div>
                  <p className="font-semibold text-foreground">{item.title}</p>
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
