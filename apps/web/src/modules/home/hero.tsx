'use client';

import { ArrowRight, Sliders, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
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
    <section
      id="top"
      className="relative -mt-[92px] overflow-hidden bg-navy-950 pt-[92px] pb-20 sm:-mt-[116px] sm:pt-[116px] sm:pb-24"
      style={{ clipPath: 'polygon(0 0, 100% 0, 100% 97%, 0 100%)' }}
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

      <div className="relative flex min-h-[520px] flex-col sm:min-h-[600px] lg:min-h-[70vh]">
        <div className="flex flex-1 items-center">
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

        <div className="relative mx-auto mt-8 w-full max-w-7xl px-6 sm:px-8">
          <div className="relative overflow-hidden rounded-2xl border border-white/25 bg-white/12 p-2 shadow-2xl shadow-black/40 backdrop-blur-2xl backdrop-saturate-150">
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent"
              aria-hidden
            />
            <div className="relative z-10 mb-3 flex w-fit gap-1 rounded-xl bg-black/15 p-1">
              <button
                type="button"
                onClick={() => setMode('ai')}
                className={cn(
                  'flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300',
                  mode === 'ai'
                    ? 'bg-white text-navy-900 shadow-sm'
                    : 'text-white/70 hover:text-white'
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
                    : 'text-white/70 hover:text-white'
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
            <div className="relative z-10 grid p-3 sm:p-4">
              <form
                className={cn(
                  'col-start-1 row-start-1 flex flex-col gap-3 transition-all duration-300 ease-out',
                  mode === 'ai'
                    ? 'translate-y-0 opacity-100'
                    : 'pointer-events-none -translate-y-1 opacity-0'
                )}
                onSubmit={submitAi}
              >
                <p className="text-sm text-white/75">{t('aiHelper')}</p>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={t('aiPlaceholder')}
                    className="h-13 flex-1 rounded-md border border-white/25 bg-white/10 px-4 text-sm text-white placeholder:text-white/50 focus:border-cyan-300 focus:outline-none"
                  />
                  <Button type="submit" variant="accent" size="lg" className="shrink-0">
                    {t('aiSubmit')}
                    <ArrowRight className="size-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-white/60">
                  <span>{t('tryLabel')}</span>
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setQuery(s)}
                      className="rounded-full border border-white/25 px-3 py-1.5 text-white/80 transition-colors hover:border-white/50 hover:text-white"
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
                <p className="text-sm text-white/75">{t('filterHelper')}</p>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                  <div className="flex flex-1 flex-col gap-1.5 text-xs font-medium text-white/75">
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
                  <label className="flex flex-1 flex-col gap-1.5 text-xs font-medium text-white/75">
                    {t('filterLocation')}
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder={t('filterLocationPlaceholder')}
                      className="h-13 rounded-md border border-white/25 bg-white/10 px-3 text-sm text-white placeholder:text-white/50 focus:border-cyan-300 focus:outline-none"
                    />
                  </label>
                  <label className="flex flex-1 flex-col gap-1.5 text-xs font-medium text-white/75">
                    {t('filterBudget')}
                    <input
                      type="text"
                      inputMode="numeric"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      placeholder="750 000"
                      className="h-13 rounded-md border border-white/25 bg-white/10 px-3 text-sm text-white placeholder:text-white/50 focus:border-cyan-300 focus:outline-none"
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
      </div>
    </section>
  );
}
