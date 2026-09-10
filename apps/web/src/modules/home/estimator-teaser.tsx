import { ArrowRight, Calculator } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/ui/reveal';
import { Link } from '@/i18n/navigation';

/**
 * The estimator (E04) outranks the chatbot (E03) in priority per the client
 * — it's the acquisition funnel for all their advertising. It isn't built
 * yet, but the homepage should already sell it as the flagship tool.
 */
export function EstimatorTeaser() {
  const t = useTranslations('HomePage.estimator');

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:py-28">
      <Reveal className="relative overflow-hidden rounded-xl bg-navy-900 px-8 py-14 text-white sm:px-14 sm:py-16">
        <div className="absolute -right-16 -top-16 size-64 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute -bottom-20 left-1/3 size-72 rounded-full bg-cyan-300/10 blur-3xl" />

        <div className="relative flex flex-col items-start gap-6 lg:max-w-xl">
          <span className="flex size-12 items-center justify-center rounded-2xl bg-white/10">
            <Calculator className="size-6 text-cyan-300" />
          </span>
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-cyan-300">
              {t('eyebrow')}
            </p>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">{t('title')}</h2>
          </div>
          <p className="text-white/75">{t('body')}</p>
          <div className="flex flex-wrap items-center gap-4">
            <Button asChild variant="accent" size="lg">
              <Link href="/vendre">
                {t('cta')}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <p className="text-xs text-white/50">{t('disclaimer')}</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
