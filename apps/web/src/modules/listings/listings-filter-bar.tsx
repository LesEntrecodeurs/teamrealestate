'use client';

import { ArrowRight, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { SelectField } from '@/components/ui/select-field';
import { luxembourgCommunes } from '@/config/communes';
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
  const [type, setType] = useState(initial.type ?? '');
  const [location, setLocation] = useState(initial.location ?? '');
  const [budget, setBudget] = useState(initial.budget ?? '');

  const hasActiveFilters = Boolean(initial.q || type || location || budget);

  function apply(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (initial.q) params.set('q', initial.q);
    if (type) params.set('type', type);
    if (location.trim()) params.set('location', location.trim());
    if (budget.trim()) params.set('budget', budget.trim());
    router.push(`${basePath}${params.toString() ? `?${params.toString()}` : ''}`);
  }

  function reset() {
    setType('');
    setLocation('');
    setBudget('');
    router.push(basePath);
  }

  return (
    <form
      onSubmit={apply}
      className="flex flex-col gap-3 rounded-2xl border border-navy-100 bg-white p-3 shadow-lg shadow-navy-950/10 sm:flex-row sm:items-end"
    >
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
          options={luxembourgCommunes.map((commune) => ({ value: commune, label: commune }))}
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
    </form>
  );
}
