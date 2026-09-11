'use client';

import { ArrowRight, Search, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { SelectField } from '@/components/ui/select-field';
import { luxembourgLocations } from '@/config/communes';
import { useRouter } from '@/i18n/navigation';

export function ListingsFilterBar({
  basePath,
  initial
}: {
  basePath: '/acheter' | '/louer';
  initial: { q?: string; type?: string; location?: string; budget?: string };
}) {
  const t = useTranslations('ListingsPage');
  const router = useRouter();
  const [q, setQ] = useState(initial.q ?? '');
  const [type, setType] = useState(initial.type ?? '');
  const [location, setLocation] = useState(initial.location ?? '');
  const [budget, setBudget] = useState(initial.budget ?? '');

  const hasActiveFilters = Boolean(q || type || location || budget);

  function apply(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q.trim()) params.set('q', q.trim());
    if (type) params.set('type', type);
    if (location.trim()) params.set('location', location.trim());
    if (budget.trim()) params.set('budget', budget.trim());
    router.push(`${basePath}${params.toString() ? `?${params.toString()}` : ''}`);
  }

  function reset() {
    setQ('');
    setType('');
    setLocation('');
    setBudget('');
    router.push(basePath);
  }

  return (
    <form
      onSubmit={apply}
      className="flex flex-col gap-3 rounded-2xl border border-navy-100 bg-white p-3 shadow-lg shadow-navy-950/10"
    >
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-navy-400" />
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t('searchPlaceholder')}
          aria-label={t('searchLabel')}
          className="h-13 w-full rounded-xl border border-navy-100 bg-white pl-11 pr-4 text-sm text-navy-900 shadow-md shadow-navy-950/10 placeholder:text-navy-400 focus:border-cyan-500 focus:outline-none sm:text-base"
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
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
            options={luxembourgLocations.map((commune) => ({ value: commune, label: commune }))}
          />
        </div>
        <input
          type="text"
          inputMode="numeric"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          placeholder={t('filterBudgetPlaceholder')}
          aria-label={t('filterBudget')}
          className="h-13 flex-1 rounded-xl border border-navy-100 bg-white px-4 text-sm text-navy-900 shadow-md shadow-navy-950/10 placeholder:text-navy-400 focus:border-cyan-500 focus:outline-none sm:text-base"
        />
        <div className="flex gap-2">
          {hasActiveFilters ? (
            <Button type="button" variant="outline" size="lg" onClick={reset} className="shrink-0">
              <X className="size-4" />
              {t('filterReset')}
            </Button>
          ) : null}
          <Button type="submit" variant="accent" size="lg" className="flex-1 sm:flex-none">
            {t('filterSubmit')}
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>
    </form>
  );
}
