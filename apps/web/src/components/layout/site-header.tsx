'use client';

import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import type { MouseEvent } from 'react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { mainNav } from '@/config/navigation';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { cn } from '@/lib/utils';

type Locale = (typeof routing.locales)[number];

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void | Promise<void>) => void;
};

export function SiteHeader() {
  const t = useTranslations('Nav');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // pathname isn't read inside this effect — it's a re-run trigger so
  // getThreshold picks up the new page's #top (or lack thereof) right after
  // navigation, instead of relying on a cached reference to the old page's.
  // biome-ignore lint/correctness/useExhaustiveDependencies: see above
  useEffect(() => {
    const heroEl = document.getElementById('top');
    if (!heroEl) {
      // No light hero to blend with (secondary pages open on a dark
      // PageHeader banner instead) — stay in the dark header style.
      setScrolled(true);
      return;
    }

    const headerOffset = 96;
    const getThreshold = () => heroEl.offsetHeight - headerOffset;
    const onScroll = () => setScrolled(window.scrollY > getThreshold());
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const scrollY = window.scrollY;
    const body = document.body.style;
    const previous = { position: body.position, top: body.top, width: body.width };
    body.position = 'fixed';
    body.top = `-${scrollY}px`;
    body.width = '100%';
    return () => {
      body.position = previous.position;
      body.top = previous.top;
      body.width = previous.width;
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  function handleLocaleClick(event: MouseEvent<HTMLAnchorElement>, loc: Locale) {
    if (loc === locale) return;
    const doc = document as ViewTransitionDocument;
    if (!doc.startViewTransition) return;
    event.preventDefault();
    doc.startViewTransition(() => router.replace(pathname, { locale: loc }));
  }

  return (
    <header className="sticky top-0 z-50 px-4 pt-6 sm:px-6 sm:pt-8 lg:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-center">
        <div
          className={cn(
            'flex w-full items-center justify-between gap-6 rounded-2xl border px-6 py-4 shadow-lg backdrop-blur-sm transition-colors duration-300 lg:w-auto lg:justify-start lg:gap-10 lg:px-7',
            scrolled
              ? 'border-white/10 bg-navy-900/95 text-white shadow-black/20'
              : 'border-navy-100 bg-white/95 text-navy-900 shadow-navy-900/10'
          )}
        >
          <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="Team Real Estate">
            <Image
              src={scrolled ? '/logo/team-wordmark-negatif.png' : '/logo/team-wordmark.png'}
              alt="Team Real Estate"
              width={800}
              height={267}
              className="h-11 w-auto"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-5 lg:flex">
            {mainNav.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={cn(
                  'group relative py-1 text-lg font-medium transition-colors',
                  scrolled ? 'text-white/80 hover:text-white' : 'text-navy-600 hover:text-navy-900'
                )}
              >
                {t(item.key)}
                <span
                  className={cn(
                    'absolute -bottom-0.5 left-0 h-px w-0 transition-all duration-300 group-hover:w-full',
                    scrolled ? 'bg-cyan-400' : 'bg-cyan-500'
                  )}
                />
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <span
              className={cn('h-7 w-px', scrolled ? 'bg-white/15' : 'bg-navy-100')}
              aria-hidden
            />
            <div
              className={cn(
                'flex items-center gap-1 rounded-lg p-1 text-base font-semibold',
                scrolled ? 'bg-white/5' : 'bg-navy-50'
              )}
            >
              {routing.locales.map((loc) => (
                <Link
                  key={loc}
                  href={pathname}
                  locale={loc}
                  onClick={(event) => handleLocaleClick(event, loc)}
                  className={cn(
                    'rounded-md px-3 py-2 uppercase transition-colors',
                    loc === locale
                      ? scrolled
                        ? 'bg-white/15 text-white'
                        : 'bg-navy-900 text-white'
                      : scrolled
                        ? 'text-white/50 hover:text-white'
                        : 'text-navy-400 hover:text-navy-900'
                  )}
                >
                  {loc}
                </Link>
              ))}
            </div>
            <Button asChild variant="accent" size="lg" className="min-w-[20ch] shrink-0 rounded-xl">
              <Link href="/vendre">{t('estimate')}</Link>
            </Button>
          </div>

          <button
            type="button"
            className={cn('p-1 lg:hidden', scrolled ? 'text-white' : 'text-navy-900')}
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div
          className={cn(
            'fixed inset-0 z-40 flex flex-col overflow-y-auto px-6 pb-8 pt-6 lg:hidden',
            scrolled ? 'bg-navy-900 text-white' : 'bg-white text-navy-900'
          )}
        >
          <div className="flex items-center justify-between">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="flex shrink-0 items-center gap-3"
              aria-label="Team Real Estate"
            >
              <Image
                src={scrolled ? '/logo/team-wordmark-negatif.png' : '/logo/team-wordmark.png'}
                alt="Team Real Estate"
                width={800}
                height={267}
                className="h-11 w-auto"
              />
            </Link>
            <button
              type="button"
              className={cn('p-1', scrolled ? 'text-white' : 'text-navy-900')}
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <X className="size-5" />
            </button>
          </div>

          <nav className="flex flex-1 flex-col items-start justify-center gap-2">
            {mainNav.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'py-2 text-4xl font-medium',
                  scrolled ? 'text-white hover:text-cyan-300' : 'text-navy-900 hover:text-cyan-600'
                )}
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-4">
            <div
              className={cn(
                'flex w-fit items-center gap-1 rounded-lg p-1 text-sm font-semibold',
                scrolled ? 'bg-white/5' : 'bg-navy-50'
              )}
            >
              {routing.locales.map((loc) => (
                <Link
                  key={loc}
                  href={pathname}
                  locale={loc}
                  onClick={(event) => handleLocaleClick(event, loc)}
                  className={cn(
                    'rounded-md px-3 py-2 uppercase transition-colors',
                    loc === locale
                      ? scrolled
                        ? 'bg-white/15 text-white'
                        : 'bg-navy-900 text-white'
                      : scrolled
                        ? 'text-white/50 hover:text-white'
                        : 'text-navy-400 hover:text-navy-900'
                  )}
                >
                  {loc}
                </Link>
              ))}
            </div>
            <Button asChild variant="accent" size="lg" className="w-full rounded-xl">
              <Link href="/vendre" onClick={() => setOpen(false)}>
                {t('estimate')}
              </Link>
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
