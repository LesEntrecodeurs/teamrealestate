'use client';

import { ArrowRight, Sliders, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { HeroSquares } from '@/components/ui/hero-squares';
import { SelectField } from '@/components/ui/select-field';
import { TypewriterText } from '@/components/ui/typewriter-text';
import { useRouter } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

export function Hero() {
  const t = useTranslations('HomePage.hero');
  const router = useRouter();
  const [mode, setMode] = useState<'ai' | 'filters'>('ai');
  const [query, setQuery] = useState('');
  const [type, setType] = useState('');
  const [location, setLocation] = useState('');
  const [budget, setBudget] = useState('');

  const suggestions = [t('try1'), t('try2'), t('try3')];

  function submitAi(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set('q', query.trim());
    router.push(`/acheter${params.toString() ? `?${params.toString()}` : ''}`);
  }

  function submitFilters(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (type) params.set('type', type);
    if (location.trim()) params.set('location', location.trim());
    if (budget.trim()) params.set('budget', budget.trim());
    router.push(`/acheter${params.toString() ? `?${params.toString()}` : ''}`);
  }

  return (
    <>
      <section
        id="top"
        className="relative -mt-[92px] overflow-hidden bg-navy-950 pt-[92px] sm:-mt-[116px] sm:pt-[116px]"
      >
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1516550893923-42d28e5677af?q=80&w=2400&auto=format&fit=crop"
            alt=""
            fill
            priority
            className="animate-hero-zoom object-cover"
          />
          <div className="absolute inset-0 bg-navy-950/65" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/10 to-transparent" />
        </div>

        <HeroSquares />

        <div className="relative flex min-h-[380px] flex-col justify-center pb-16 sm:min-h-[440px] sm:pb-20 lg:min-h-[48vh]">
          <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-6 text-white sm:px-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="mb-5 text-sm font-medium uppercase tracking-[0.15em] text-cyan-300">
                {t('eyebrow')}
              </p>
              <h1 className="font-display text-6xl font-medium leading-[0.98] sm:text-7xl lg:text-8xl">
                {t('title1')}
                <br />
                <TypewriterText phrases={t.raw('titleRotating')} className="text-cyan-300" />
              </h1>
            </div>
            <div className="flex items-center lg:col-span-4">
              <p className="max-w-sm text-base text-white/75 sm:text-lg">{t('subtitle')}</p>
            </div>
          </div>
        </div>

        <svg
          className="absolute inset-x-0 bottom-0 h-16 w-full text-ecru-50 sm:h-24"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            d="M0,64 C240,110 480,10 720,40 C960,70 1200,110 1440,48 L1440,120 L0,120 Z"
            fill="currentColor"
          />
        </svg>
      </section>

      <div className="relative z-10 mx-auto -mt-6 w-full max-w-7xl px-6 sm:-mt-8 sm:px-8">
        <div className="rounded-2xl border border-navy-100 bg-white p-2 shadow-2xl shadow-navy-900/15">
          <div className="mb-3 flex w-fit gap-1 rounded-xl bg-navy-50 p-1">
            <button
              type="button"
              onClick={() => setMode('ai')}
              className={cn(
                'flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300',
                mode === 'ai'
                  ? 'bg-white text-navy-900 shadow-sm'
                  : 'text-navy-600 hover:text-navy-900'
              )}
            >
              <Sparkles className="size-4" />
              {t('tabAi')}
            </button>
            <button
              type="button"
              onClick={() => setMode('filters')}
              className={cn(
                'flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300',
                mode === 'filters'
                  ? 'bg-white text-navy-900 shadow-sm'
                  : 'text-navy-600 hover:text-navy-900'
              )}
            >
              <Sliders className="size-4" />
              {t('tabFilters')}
            </button>
          </div>

          {/* Both forms are always mounted and stacked in the same grid cell —
              the container's height is the taller of the two at every
              breakpoint, so switching tabs never resizes the hero. Only
              opacity/translate animate. */}
          <div className="grid p-3 sm:p-4">
            <form
              className={cn(
                'col-start-1 row-start-1 flex flex-col gap-3 transition-all duration-300 ease-out',
                mode === 'ai'
                  ? 'translate-y-0 opacity-100'
                  : 'pointer-events-none -translate-y-1 opacity-0'
              )}
              onSubmit={submitAi}
            >
              <p className="text-sm text-navy-600">{t('aiHelper')}</p>
              <div className="flex flex-col gap-2 sm:flex-row">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t('aiPlaceholder')}
                  className="h-13 flex-1 rounded-md border border-navy-200 bg-white px-4 text-sm text-navy-900 placeholder:text-navy-500 focus:border-cyan-500 focus:outline-none"
                />
                <Button type="submit" variant="accent" size="lg" className="shrink-0">
                  {t('aiSubmit')}
                  <ArrowRight className="size-4" />
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-navy-600">
                <span>{t('tryLabel')}</span>
                {suggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setQuery(s)}
                    className="rounded-full border border-navy-200 px-3 py-1.5 text-navy-700 transition-colors hover:border-navy-400 hover:text-navy-900"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </form>

            <form
              className={cn(
                'col-start-1 row-start-1 flex flex-col gap-3 transition-all duration-300 ease-out',
                mode === 'filters'
                  ? 'translate-y-0 opacity-100'
                  : 'pointer-events-none translate-y-1 opacity-0'
              )}
              onSubmit={submitFilters}
            >
              <p className="text-sm text-navy-600">{t('filterHelper')}</p>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                <div className="flex flex-1 flex-col gap-1.5 text-xs font-medium text-navy-700">
                  {t('filterType')}
                  <SelectField
                    value={type}
                    onChange={setType}
                    placeholder={t('filterTypeAny')}
                    ariaLabel={t('filterType')}
                    options={[
                      { value: '', label: t('filterTypeAny') },
                      { value: 'apartment', label: t('filterTypeApartment') },
                      { value: 'house', label: t('filterTypeHouse') }
                    ]}
                  />
                </div>
                <label className="flex flex-1 flex-col gap-1.5 text-xs font-medium text-navy-700">
                  {t('filterLocation')}
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder={t('filterLocationPlaceholder')}
                    className="h-13 rounded-md border border-navy-200 bg-white px-3 text-sm text-navy-900 placeholder:text-navy-500 focus:border-cyan-500 focus:outline-none"
                  />
                </label>
                <label className="flex flex-1 flex-col gap-1.5 text-xs font-medium text-navy-700">
                  {t('filterBudget')}
                  <input
                    type="text"
                    inputMode="numeric"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="750 000"
                    className="h-13 rounded-md border border-navy-200 bg-white px-3 text-sm text-navy-900 placeholder:text-navy-500 focus:border-cyan-500 focus:outline-none"
                  />
                </label>
                <Button type="submit" variant="accent" size="lg" className="shrink-0">
                  {t('filterSubmit')}
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
