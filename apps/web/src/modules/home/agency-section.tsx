import Image from 'next/image';
import { useTranslations } from 'next-intl';

export function AgencySection() {
  const t = useTranslations('HomePage.agency');

  const stats = [
    { value: t('stat1Value'), label: t('stat1Label') },
    { value: t('stat2Value'), label: t('stat2Label') },
    { value: t('stat3Value'), label: t('stat3Label') }
  ];

  return (
    <section className="bg-navy-50">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-20 sm:px-8 lg:grid-cols-2 lg:py-28">
        <div>
          <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-accent">
            <span className="h-px w-6 bg-accent" />
            {t('eyebrow')}
          </p>
          <h2 className="font-display text-3xl font-medium leading-tight text-foreground sm:text-4xl">
            {t('title1')}
            <br />
            {t('title2')}
          </h2>
          <p className="mt-6 text-base text-muted-foreground">{t('body1')}</p>
          <p className="mt-4 text-base text-muted-foreground">{t('body2')}</p>

          <dl className="mt-10 grid grid-cols-1 gap-6 border-t border-navy-100 pt-8 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="font-display text-3xl font-medium text-secondary">{stat.value}</dt>
                <dd className="mt-1 text-sm text-muted-foreground">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
          <Image
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1600&auto=format&fit=crop"
            alt=""
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
