'use client';

import { ArrowRight, Search, Sliders } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { HeroSquares } from '@/components/ui/hero-squares';
import { SelectField } from '@/components/ui/select-field';
import { TypewriterText } from '@/components/ui/typewriter-text';
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
    <>
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

        <div className="relative flex min-h-[380px] flex-col justify-center pb-16 sm:min-h-[440px] sm:pb-20 lg:min-h-[48vh]">
          <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-6 text-white sm:px-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="mb-5 text-sm font-medium uppercase tracking-[0.15em] text-cyan-300">
                {t('eyebrow')}
              </p>
              <h1 className="font-display text-5xl font-bold leading-[1.05] sm:text-7xl sm:leading-[0.98] lg:text-8xl">
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

      <div className="relative z-10 mx-auto -mt-10 w-full max-w-7xl px-6 sm:-mt-14 sm:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-500 via-cyan-600 to-navy-900 p-3 shadow-2xl shadow-navy-950/60 ring-1 ring-white/15 sm:p-4">
          <div
            className="pointer-events-none absolute -right-12 -top-20 size-64 rounded-full bg-white/15 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-16 left-1/4 size-56 rounded-full bg-navy-900/20 blur-3xl"
            aria-hidden
          />

          <form className="relative flex flex-col gap-3 p-1 sm:p-2" onSubmit={handleSearch}>
            <p className="text-base font-medium text-white/80">{t('aiHelper')}</p>

            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-white/50" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t('aiPlaceholder')}
                  className="h-14 w-full rounded-md border border-white/15 bg-white/5 pl-11 pr-4 text-base text-white placeholder:text-white/45 focus:border-white focus:outline-none"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setFiltersOpen((v) => !v)}
                  aria-expanded={filtersOpen}
                  aria-label={t('filterType')}
                  className={cn(
                    'flex h-14 shrink-0 items-center justify-center rounded-md border px-4 transition-colors',
                    filtersOpen
                      ? 'border-white bg-white text-cyan-700'
                      : 'border-white/30 bg-white/10 text-white hover:bg-white/20'
                  )}
                >
                  <Sliders className="size-5" />
                </button>
                <Button
                  type="submit"
                  size="lg"
                  className="flex-1 bg-white text-base text-cyan-700 hover:bg-navy-950 hover:text-white sm:flex-none"
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
              <div className="overflow-hidden">
                <div className="flex flex-col gap-3 border-t border-white/10 pt-4 sm:flex-row sm:items-end">
                  <div className="flex flex-1 flex-col gap-1.5 text-sm font-semibold text-white/80">
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
                  <label className="flex flex-1 flex-col gap-1.5 text-sm font-semibold text-white/80">
                    {t('filterLocation')}
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder={t('filterLocationPlaceholder')}
                      className="h-13 rounded-md border border-white/15 bg-white/5 px-3 text-base text-white placeholder:text-white/45 focus:border-white focus:outline-none"
                    />
                  </label>
                  <label className="flex flex-1 flex-col gap-1.5 text-sm font-semibold text-white/80">
                    {t('filterBudget')}
                    <input
                      type="text"
                      inputMode="numeric"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      placeholder="750 000"
                      className="h-13 rounded-md border border-white/15 bg-white/5 px-3 text-base text-white placeholder:text-white/45 focus:border-white focus:outline-none"
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-1 text-sm text-white/60">
              <span className="font-medium">{t('tryLabel')}</span>
              {suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setQuery(s)}
                  className="rounded-full border border-white/20 px-3 py-1.5 font-medium text-white/80 transition-colors hover:border-white/40 hover:text-white"
                >
                  {s}
                </button>
              ))}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
