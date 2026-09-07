import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';

export function CtaBand() {
  const t = useTranslations('HomePage.cta');

  return (
    <section className="bg-navy-950 px-6 py-20 text-center text-white sm:px-8 lg:py-28">
      <div className="mx-auto max-w-2xl">
        <span className="mx-auto mb-6 block h-px w-10 bg-accent" />
        <h2 className="font-display text-3xl font-medium sm:text-5xl">{t('title')}</h2>
        <p className="mt-5 text-white/70">{t('subtitle')}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button asChild variant="accent" size="lg">
            <Link href="/vendre">{t('primary')}</Link>
          </Button>
          <Button asChild variant="outline-invert" size="lg">
            <Link href="/contact">{t('secondary')}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
