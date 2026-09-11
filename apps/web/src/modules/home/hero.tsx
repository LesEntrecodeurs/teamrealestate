'use client';

import { ArrowRight, Search, Sliders, X } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { HeroSquares } from '@/components/ui/hero-squares';
import { SelectField } from '@/components/ui/select-field';
import { TypewriterText } from '@/components/ui/typewriter-text';
import { luxembourgCommunes } from '@/config/communes';
import { useRouter } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

export function Hero() {
  const t = useTranslations('HomePage.hero');
  const router = useRouter();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [type, setType] = useState('');
  const [location, setLocation] = useState('');
  const [budget, setBudget] = useState('');

  const suggestions = [t('try1'), t('try2'), t('try3')];
  const imageRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const image = imageRef.current;
    const section = heroSectionRef.current;
    if (!image || !section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const MAX_SCALE = 1.15;
    const MIN_SCALE = 1;
    let frame = 0;

    function onScroll() {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const progress = Math.min(window.scrollY / (section?.offsetHeight ?? 1), 1);
        const scale = MAX_SCALE - (MAX_SCALE - MIN_SCALE) * progress;
        if (image) image.style.transform = `scale(${scale})`;
        frame = 0;
      });
    }

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set('q', query.trim());
    if (type) params.set('type', type);
    if (location.trim()) params.set('location', location.trim());
    if (budget.trim()) params.set('budget', budget.trim());
    router.push(`/acheter${params.toString() ? `?${params.toString()}` : ''}`);
  }

  return (
    <section
      id="top"
      ref={heroSectionRef}
      className="relative -mt-[92px] overflow-hidden bg-navy-950 pt-[92px] sm:-mt-[116px] sm:pt-[116px]"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div ref={imageRef} className="absolute inset-0 origin-center">
          <Image
            src="https://images.unsplash.com/photo-1516550893923-42d28e5677af?q=80&w=2400&auto=format&fit=crop"
            alt=""
            fill
            priority
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-navy-950/65" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/10 to-transparent" />
      </div>

      <HeroSquares />

      <div className="relative flex min-h-[540px] flex-col pb-20 sm:min-h-[640px] sm:pb-24 lg:min-h-[68vh]">
        <div className="flex flex-1 flex-col justify-center gap-10 sm:gap-12">
          <div className="mx-auto mt-6 w-full max-w-7xl px-6 text-white sm:mt-0 sm:px-8">
            <p className="mb-5 text-sm font-medium uppercase tracking-[0.15em] text-cyan-300">
              {t('eyebrow')}
            </p>
            <h1 className="font-display text-5xl font-bold leading-[1.05] sm:text-7xl sm:leading-[0.98] lg:text-8xl">
              {t('title1')}
              <br />
              <span className="inline-block min-h-[2.1em] align-top sm:min-h-0">
                <TypewriterText phrases={t.raw('titleRotating')} className="text-cyan-300" />
              </span>
            </h1>
          </div>

          <form
            className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-3 px-6 sm:px-8"
            onSubmit={handleSearch}
          >
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-navy-400 sm:left-5 sm:size-5" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t('aiPlaceholder')}
                  className="h-12 w-full rounded-xl border border-navy-100 bg-white pl-11 pr-10 text-sm text-navy-900 shadow-lg shadow-navy-950/15 placeholder:text-navy-400 focus:border-cyan-500 focus:outline-none sm:h-16 sm:pl-13 sm:pr-11 sm:text-base"
                />
                {query ? (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    aria-label={t('aiSubmit')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-400 hover:text-navy-700 sm:right-4"
                  >
                    <X className="size-4 sm:size-5" />
                  </button>
                ) : null}
              </div>
              <div className="flex gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() => setFiltersOpen((v) => !v)}
                  aria-expanded={filtersOpen}
                  aria-label={t('filterType')}
                  title={t('filterType')}
                  className={cn(
                    'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border bg-white shadow-lg shadow-navy-950/15 transition-colors sm:h-16 sm:w-16',
                    filtersOpen
                      ? 'border-cyan-500 text-cyan-600'
                      : 'border-navy-100 text-navy-700 hover:border-navy-300'
                  )}
                >
                  <Sliders className="size-4 sm:size-5" />
                </button>
                <Button
                  type="submit"
                  variant="accent"
                  size="lg"
                  className="h-12 flex-1 rounded-xl text-sm shadow-lg shadow-navy-950/15 sm:h-16 sm:flex-none sm:text-base"
                >
                  {t('aiSubmit')}
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            </div>

            <div
              className={cn(
                'grid transition-all duration-300 ease-out',
                filtersOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              )}
            >
              <div className={filtersOpen ? 'overflow-visible' : 'overflow-hidden'}>
                <div className="flex flex-col gap-3 pt-1 sm:flex-row">
                  <div className="flex-1 rounded-xl border border-navy-100 bg-white px-2 shadow-md shadow-navy-950/10">
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
                  <div className="flex-1 rounded-xl border border-navy-100 bg-white px-2 shadow-md shadow-navy-950/10">
                    <SelectField
                      value={location}
                      onChange={setLocation}
                      placeholder={t('filterLocationPlaceholder')}
                      ariaLabel={t('filterLocation')}
                      searchable
                      searchPlaceholder={t('filterLocationSearchPlaceholder')}
                      options={luxembourgCommunes.map((commune) => ({
                        value: commune,
                        label: commune
                      }))}
                    />
                  </div>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder={t('filterBudget')}
                    className="h-11 flex-1 rounded-xl border border-navy-100 bg-white px-4 text-sm text-navy-900 shadow-md shadow-navy-950/10 placeholder:text-navy-400 focus:border-cyan-500 focus:outline-none sm:h-13 sm:px-5 sm:text-base"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-white/70 sm:text-sm">
              <span className="font-medium">{t('tryLabel')}</span>
              {suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setQuery(s)}
                  className="rounded-xl border border-white/25 bg-white/10 px-2.5 py-1 font-medium text-white/85 transition-colors hover:border-white/45 hover:bg-white/20 sm:px-3 sm:py-1.5"
                >
                  {s}
                </button>
              ))}
            </div>
          </form>
        </div>
      </div>

      <svg
        className="absolute inset-x-0 bottom-0 h-16 w-full text-card sm:h-24"
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
  );
}
