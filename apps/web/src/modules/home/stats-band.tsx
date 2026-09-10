import { useTranslations } from 'next-intl';
import { Counter } from '@/components/ui/counter';
import { Reveal } from '@/components/ui/reveal';

export function StatsBand() {
  const t = useTranslations('HomePage.statsBand');

  const stats = [
    { value: t('stat1Value'), label: t('stat1Label') },
    { value: t('stat2Value'), label: t('stat2Label') },
    { value: t('stat3Value'), label: t('stat3Label') },
    { value: t('stat4Value'), label: t('stat4Label') }
  ];

  return (
    <section className="bg-card">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-10 px-6 py-14 sm:px-8 lg:grid-cols-4 lg:py-16">
        {stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 90} className="border-t border-navy-100 pt-5">
            <p className="font-display text-4xl font-bold text-foreground sm:text-5xl">
              <Counter value={stat.value} />
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
