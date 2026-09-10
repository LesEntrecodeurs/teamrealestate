import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Counter } from '@/components/ui/counter';
import { Reveal } from '@/components/ui/reveal';
import { Link } from '@/i18n/navigation';

export function AgencySection() {
  const t = useTranslations('HomePage.agency');

  const stats = [
    { value: t('stat1Value'), label: t('stat1Label') },
    { value: t('stat2Value'), label: t('stat2Label') },
    { value: t('stat3Value'), label: t('stat3Label') }
  ];

  return (
    <section className="relative overflow-hidden bg-navy-950 py-24 sm:py-32">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1600&auto=format&fit=crop"
          alt=""
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-navy-950/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-950/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/50" />
      </div>

      <Reveal className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <div className="max-w-2xl text-white">
          <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
            <span className="h-1.5 w-6 rounded-full bg-cyan-300" />
            {t('eyebrow')}
          </p>
          <h2 className="bg-gradient-to-r from-white to-cyan-200 bg-clip-text font-display text-3xl font-bold leading-tight text-transparent drop-shadow-sm sm:text-4xl lg:text-5xl">
            {t('title1')}
            <br />
            {t('title2')}
          </h2>
          <p className="mt-6 text-base text-white/80 sm:text-lg">{t('body1')}</p>
          <p className="mt-4 text-base text-white/80 sm:text-lg">{t('body2')}</p>

          <Button asChild variant="outline-invert" size="lg" className="mt-8">
            <Link href="/agence">
              {t('learnMore')}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        <dl className="mt-14 grid grid-cols-1 gap-8 border-t border-white/15 pt-10 sm:grid-cols-3 sm:gap-6 sm:divide-x sm:divide-white/15">
          {stats.map((stat) => (
            <div key={stat.label} className="sm:pl-6 sm:first:pl-0">
              <dt className="font-display text-4xl font-bold text-cyan-300 sm:text-5xl">
                <Counter value={stat.value} />
              </dt>
              <dd className="mt-2 text-sm text-white/70 sm:text-base">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
