import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Counter } from '@/components/ui/counter';
import { Reveal } from '@/components/ui/reveal';

export function AgencySection() {
  const t = useTranslations('HomePage.agency');

  const stats = [
    { value: t('stat1Value'), label: t('stat1Label') },
    { value: t('stat2Value'), label: t('stat2Label') },
    { value: t('stat3Value'), label: t('stat3Label') }
  ];

  return (
    <section className="bg-navy-50">
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

        <Reveal delay={150} className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-navy-900/5">
            <Image
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1600&auto=format&fit=crop"
              alt=""
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>

          <div className="absolute -bottom-6 -left-6 hidden rounded-2xl bg-card px-6 py-5 shadow-xl shadow-navy-900/10 ring-1 ring-navy-100 sm:block">
            <p className="font-display text-3xl font-bold text-secondary">
              <Counter value={stats[1]?.value ?? ''} />
            </p>
            <p className="mt-0.5 max-w-[12rem] text-xs text-muted-foreground">{stats[1]?.label}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
