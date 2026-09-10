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
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-8 gap-y-12 px-6 py-16 sm:px-8 lg:grid-cols-4 lg:py-20">
        {stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 90}>
            <p className="font-display text-6xl font-bold text-secondary sm:text-7xl">
              <Counter value={stat.value} />
            </p>
            <p className="mt-3 text-base font-medium text-muted-foreground">{stat.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
