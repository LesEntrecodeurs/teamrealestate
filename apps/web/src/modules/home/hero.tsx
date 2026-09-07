'use client';

import { ArrowRight, Sliders, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function Hero() {
  const t = useTranslations('HomePage.hero');
  const [mode, setMode] = useState<'ai' | 'filters'>('ai');

  const suggestions = [t('try1'), t('try2'), t('try3')];

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1516550893923-42d28e5677af?q=80&w=2400&auto=format&fit=crop"
          alt=""
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/85 via-navy-950/55 to-navy-950/90" />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col gap-10 px-6 pb-16 pt-20 text-white sm:px-8 sm:pt-28 lg:pb-24 lg:pt-36">
        <div className="max-w-2xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-cyan-300">
            {t('eyebrow')}
          </p>
          <h1 className="font-display text-5xl font-medium leading-[1.05] sm:text-6xl lg:text-7xl">
            {t('title1')}
            <br />
            <span className="text-cyan-300">{t('title2')}</span>
          </h1>
          <p className="mt-6 max-w-xl text-base text-white/80 sm:text-lg">{t('subtitle')}</p>
        </div>

        <div className="w-full max-w-3xl rounded-2xl border border-white/15 bg-navy-950/60 p-3 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-4">
          <div className="mb-4 flex w-fit gap-1 rounded-full bg-white/10 p-1">
            <button
              type="button"
              onClick={() => setMode('ai')}
              className={cn(
                'flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors',
                mode === 'ai' ? 'bg-secondary text-secondary-foreground' : 'text-white/70'
              )}
            >
              <Sparkles className="size-4" />
              {t('tabAi')}
            </button>
            <button
              type="button"
              onClick={() => setMode('filters')}
              className={cn(
                'flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors',
                mode === 'filters' ? 'bg-white text-navy-900' : 'text-white/70'
              )}
            >
              <Sliders className="size-4" />
              {t('tabFilters')}
            </button>
          </div>

          {mode === 'ai' ? (
            <div className="flex flex-col gap-3">
              <p className="px-1 text-sm text-white/70">{t('aiHelper')}</p>
              <div className="flex flex-col gap-2 sm:flex-row">
                <input
                  type="text"
                  placeholder={t('aiPlaceholder')}
                  className="h-13 flex-1 rounded-xl border border-white/15 bg-white/5 px-4 text-sm text-white placeholder:text-white/40 focus:border-cyan-400 focus:outline-none"
                />
                <Button variant="accent" size="lg" className="shrink-0">
                  {t('aiSubmit')}
                  <ArrowRight className="size-4" />
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-2 px-1 pt-1 text-xs text-white/60">
                <span>{t('tryLabel')}</span>
                {suggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className="rounded-full border border-white/15 px-3 py-1.5 transition-colors hover:border-white/40 hover:text-white"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
              <label className="flex flex-1 flex-col gap-1.5 text-xs font-medium text-white/70">
                {t('filterType')}
                <select className="h-13 rounded-xl border border-white/15 bg-white/5 px-3 text-sm text-white focus:border-cyan-400 focus:outline-none">
                  <option className="text-navy-900">{t('filterTypeAny')}</option>
                  <option className="text-navy-900">{t('filterTypeApartment')}</option>
                  <option className="text-navy-900">{t('filterTypeHouse')}</option>
                </select>
              </label>
              <label className="flex flex-1 flex-col gap-1.5 text-xs font-medium text-white/70">
                {t('filterLocation')}
                <input
                  type="text"
                  placeholder={t('filterLocationPlaceholder')}
                  className="h-13 rounded-xl border border-white/15 bg-white/5 px-3 text-sm text-white placeholder:text-white/40 focus:border-cyan-400 focus:outline-none"
                />
              </label>
              <label className="flex flex-1 flex-col gap-1.5 text-xs font-medium text-white/70">
                {t('filterBudget')}
                <input
                  type="text"
                  placeholder="750 000 €"
                  className="h-13 rounded-xl border border-white/15 bg-white/5 px-3 text-sm text-white placeholder:text-white/40 focus:border-cyan-400 focus:outline-none"
                />
              </label>
              <Button variant="accent" size="lg" className="shrink-0">
                {t('filterSubmit')}
                <ArrowRight className="size-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
