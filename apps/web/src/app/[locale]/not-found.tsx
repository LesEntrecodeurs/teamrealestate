import { ArrowRight, Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';

export default function NotFound() {
  const t = useTranslations('NotFoundPage');

  return (
    <div className="relative overflow-hidden bg-ecru-50 px-6 py-28 sm:px-8 sm:py-36">
      <div
        className="pointer-events-none absolute -top-24 -right-24 size-80 rounded-full bg-cyan-100/70 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-32 -left-16 size-72 rounded-full bg-terracotta-400/15 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-2xl text-center">
        <p className="font-display text-8xl leading-none font-bold text-navy-900 sm:text-9xl">
          4<span className="text-cyan-500">0</span>4
        </p>
        <h1 className="mt-6 font-display text-2xl font-bold text-navy-900 sm:text-3xl">
          {t('title')}
        </h1>
        <p className="mx-auto mt-4 max-w-md text-navy-600">{t('subtitle')}</p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild variant="accent" size="lg">
            <Link href="/">
              {t('backHome')}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/acheter">
              <Search className="size-4" />
              {t('browseListings')}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
