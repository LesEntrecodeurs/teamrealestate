'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function PropertyContactForm({ listingTitle }: { listingTitle: string }) {
  const t = useTranslations('ListingDetail');
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
      <h2 className="font-display text-xl font-bold text-foreground">{t('contactFormTitle')}</h2>
      <p className="mt-1.5 text-sm text-muted-foreground">{t('contactFormSubtitle')}</p>

      <form
        className="mt-6 flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
      >
        {submitted ? (
          <p className="py-8 text-center text-secondary">{t('submitSuccess')}</p>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5 text-sm font-medium text-foreground">
                {t('nameLabel')}
                <input
                  required
                  type="text"
                  className="h-11 rounded-xl border border-border bg-background px-3 text-sm focus:border-secondary focus:outline-none"
                />
              </label>
              <label className="flex flex-col gap-1.5 text-sm font-medium text-foreground">
                {t('phoneLabel')}
                <input
                  type="tel"
                  className="h-11 rounded-xl border border-border bg-background px-3 text-sm focus:border-secondary focus:outline-none"
                />
              </label>
            </div>
            <label className="flex flex-col gap-1.5 text-sm font-medium text-foreground">
              {t('emailLabel')}
              <input
                required
                type="email"
                className="h-11 rounded-xl border border-border bg-background px-3 text-sm focus:border-secondary focus:outline-none"
              />
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-medium text-foreground">
              {t('messageLabel')}
              <textarea
                required
                rows={4}
                defaultValue={t('messagePlaceholder', { title: listingTitle })}
                className="rounded-xl border border-border bg-background px-3 py-2.5 text-sm focus:border-secondary focus:outline-none"
              />
            </label>
            <Button type="submit" variant="primary" size="lg" className="mt-2 w-fit">
              {t('submit')}
            </Button>
          </>
        )}
      </form>
    </div>
  );
}
