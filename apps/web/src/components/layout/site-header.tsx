'use client';

import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { mainNav } from '@/config/navigation';
import { Link, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { cn } from '@/lib/utils';

export function SiteHeader() {
  const t = useTranslations('Nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6 sm:pt-5 lg:px-8">
      <div className="mx-auto flex max-w-7xl items-center gap-3">
        <div className="flex flex-1 items-center justify-between gap-6 rounded-2xl border border-navy-100 bg-white/95 px-6 py-4 text-navy-900 shadow-lg shadow-navy-900/10 backdrop-blur-sm lg:w-fit lg:flex-none lg:justify-start lg:gap-11 lg:px-7 lg:py-4">
          <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="Team Real Estate">
            <Image
              src="/logo/team-logo.png"
              alt="Team Real Estate"
              width={132}
              height={122}
              className="h-11 w-auto"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-9 lg:flex">
            {mainNav.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="group relative py-1 text-base font-medium text-navy-600 transition-colors hover:text-navy-900"
              >
                {t(item.key)}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-cyan-500 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <span className="h-7 w-px bg-navy-100" aria-hidden />
            <div className="flex items-center gap-1 rounded-lg bg-navy-50 p-1 text-base font-semibold">
              {routing.locales.map((loc) => (
                <Link
                  key={loc}
                  href={pathname}
                  locale={loc}
                  className={cn(
                    'rounded-md px-3 py-2 uppercase transition-colors',
                    loc === locale ? 'bg-navy-900 text-white' : 'text-navy-400 hover:text-navy-900'
                  )}
                >
                  {loc}
                </Link>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="p-1 text-navy-900 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        <Button asChild variant="accent" size="lg" className="hidden shrink-0 lg:inline-flex">
          <Link href="/vendre">{t('estimate')}</Link>
        </Button>
      </div>

      {open ? (
        <div className="mx-auto mt-2 flex max-w-7xl flex-col gap-1 rounded-2xl border border-navy-100 bg-white/95 px-5 py-4 text-navy-900 shadow-lg shadow-navy-900/10 backdrop-blur-sm lg:hidden">
          {mainNav.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-navy-100 py-3.5 text-base font-medium text-navy-700 hover:text-navy-900"
            >
              {t(item.key)}
            </Link>
          ))}
          <div className="mt-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-1 rounded-lg bg-navy-50 p-1 text-base font-semibold">
              {routing.locales.map((loc) => (
                <Link
                  key={loc}
                  href={pathname}
                  locale={loc}
                  className={cn(
                    'rounded-md px-3 py-2 uppercase transition-colors',
                    loc === locale ? 'bg-navy-900 text-white' : 'text-navy-400 hover:text-navy-900'
                  )}
                >
                  {loc}
                </Link>
              ))}
            </div>
            <Button asChild variant="accent">
              <Link href="/vendre">{t('estimate')}</Link>
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
