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
        <div className="flex flex-1 items-center justify-between gap-6 rounded-2xl border border-white/10 bg-navy-900/95 px-4 py-2.5 text-white shadow-lg shadow-black/20 backdrop-blur-sm sm:px-5">
          <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="Team Real Estate">
            <Image
              src="/logo/team-logo-negatif.png"
              alt="Team Real Estate"
              width={132}
              height={122}
              className="h-9 w-auto"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {mainNav.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="group relative py-1 text-sm font-medium text-white/80 transition-colors hover:text-white"
              >
                {t(item.key)}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-cyan-400 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <span className="h-6 w-px bg-white/15" aria-hidden />
            <div className="flex items-center gap-1 rounded-lg bg-white/5 p-1 text-xs font-semibold">
              {routing.locales.map((loc) => (
                <Link
                  key={loc}
                  href={pathname}
                  locale={loc}
                  className={cn(
                    'rounded-md px-2 py-1 uppercase transition-colors',
                    loc === locale ? 'bg-white/15 text-white' : 'text-white/50 hover:text-white'
                  )}
                >
                  {loc}
                </Link>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="p-1 text-white lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        <Button asChild variant="accent" size="sm" className="hidden shrink-0 lg:inline-flex">
          <Link href="/vendre">{t('estimate')}</Link>
        </Button>
      </div>

      {open ? (
        <div className="mx-auto mt-2 flex max-w-7xl flex-col gap-1 rounded-2xl border border-white/10 bg-navy-900/95 px-5 py-4 text-white shadow-lg shadow-black/20 backdrop-blur-sm lg:hidden">
          {mainNav.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-white/5 py-3 text-sm font-medium text-white/85 hover:text-white"
            >
              {t(item.key)}
            </Link>
          ))}
          <div className="mt-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-1 rounded-lg bg-white/5 p-1 text-xs font-semibold">
              {routing.locales.map((loc) => (
                <Link
                  key={loc}
                  href={pathname}
                  locale={loc}
                  className={cn(
                    'rounded-md px-2 py-1 uppercase transition-colors',
                    loc === locale ? 'bg-white/15 text-white' : 'text-white/50 hover:text-white'
                  )}
                >
                  {loc}
                </Link>
              ))}
            </div>
            <Button asChild variant="accent" size="sm">
              <Link href="/vendre">{t('estimate')}</Link>
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
