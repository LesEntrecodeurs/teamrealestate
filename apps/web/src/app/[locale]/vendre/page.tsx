'use client';

import { Calculator, Send } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';

export default function SellPage() {
  const t = useTranslations('SellPage');
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="bg-navy-900 px-6 py-28 text-white sm:px-8 sm:py-36">
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <span className="flex size-14 items-center justify-center rounded-2xl bg-white/10">
          <Calculator className="size-7 text-cyan-300" />
        </span>
        <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-cyan-300">
          {t('eyebrow')}
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">{t('title')}</h1>
        <p className="mt-5 max-w-lg text-white/70">{t('subtitle')}</p>

        <div className="mt-10 w-full max-w-md rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur">
          {submitted ? (
            <p className="text-sm text-cyan-300">{t('notifySuccess')}</p>
          ) : (
            <form
              className="flex flex-col gap-3 sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              <label className="sr-only" htmlFor="notify-email">
                {t('notifyTitle')}
              </label>
              <input
                id="notify-email"
                type="email"
                required
                placeholder={t('emailPlaceholder')}
                className="h-12 flex-1 rounded-xl border border-white/15 bg-white/5 px-4 text-sm text-white placeholder:text-white/40 focus:border-cyan-400 focus:outline-none"
              />
              <Button type="submit" variant="accent">
                {t('notifySubmit')}
              </Button>
            </form>
          )}
          <p className="mt-3 text-xs text-white/50">{t('notifyTitle')}</p>
        </div>

        <div className="mt-10 flex flex-col items-center gap-3">
          <p className="text-sm text-white/60">{t('orContact')}</p>
          <Button asChild variant="outline-invert" size="lg">
            <Link href="/contact">
              {t('contactCta')}
              <Send className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
