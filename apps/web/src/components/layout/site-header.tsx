'use client';

import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { mainNav } from '@/config/navigation';
import { Link, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

export function SiteHeader() {
  const t = useTranslations('Nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 px-4 pt-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-2xl border border-white/10 bg-navy-900/85 px-4 py-2.5 text-white shadow-lg shadow-navy-950/10 backdrop-blur-md sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2" aria-label="Team Real Estate">
          <Image
            src="/logo/team-logo-negatif.png"
            alt="Team Real Estate"
            width={132}
            height={122}
            className="h-10 w-auto"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-white"
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <div className="flex items-center gap-0.5 rounded-full bg-white/10 p-1 text-xs font-semibold">
            {routing.locales.map((loc) => (
              <Link
                key={loc}
                href={pathname}
                locale={loc}
                className={`rounded-full px-2.5 py-1 uppercase transition-colors ${
                  loc === locale ? 'bg-white text-navy-900' : 'text-white/70 hover:text-white'
                }`}
              >
                {loc}
              </Link>
            ))}
          </div>
          <Button asChild variant="accent" size="sm">
            <Link href="/vendre">{t('estimate')}</Link>
          </Button>
        </div>

        <button
          type="button"
          className="rounded-full p-2 text-white lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={open}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open ? (
        <div className="mx-auto mt-2 flex max-w-7xl flex-col gap-1 rounded-2xl border border-white/10 bg-navy-900/95 p-3 text-white shadow-lg backdrop-blur-md lg:hidden">
          {mainNav.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-2.5 text-sm font-medium text-white/85 hover:bg-white/10 hover:text-white"
            >
              {t(item.key)}
            </Link>
          ))}
          <div className="mt-1 flex items-center justify-between gap-3 border-t border-white/10 pt-3">
            <div className="flex items-center gap-0.5 rounded-full bg-white/10 p-1 text-xs font-semibold">
              {routing.locales.map((loc) => (
                <Link
                  key={loc}
                  href={pathname}
                  locale={loc}
                  className={`rounded-full px-2.5 py-1 uppercase transition-colors ${
                    loc === locale ? 'bg-white text-navy-900' : 'text-white/70 hover:text-white'
                  }`}
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
