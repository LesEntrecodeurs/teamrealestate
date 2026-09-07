'use client';

import { Mail, MapPin, Phone } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';

export default function ContactPage() {
  const t = useTranslations('ContactPage');
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <PageHeader eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 px-6 py-16 sm:px-8 lg:grid-cols-[1.2fr_1fr]">
        <form
          className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6"
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
                  rows={5}
                  className="rounded-xl border border-border bg-background px-3 py-2.5 text-sm focus:border-secondary focus:outline-none"
                />
              </label>
              <Button type="submit" variant="primary" size="lg" className="mt-2 w-fit">
                {t('submit')}
              </Button>
            </>
          )}
        </form>

        <div className="flex flex-col gap-6">
          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 size-5 shrink-0 text-secondary" />
            <div>
              <p className="text-sm font-semibold text-foreground">{t('addressTitle')}</p>
              <p className="whitespace-pre-line text-sm text-muted-foreground">{t('address')}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="mt-0.5 size-5 shrink-0 text-secondary" />
            <div>
              <p className="text-sm font-semibold text-foreground">{t('phoneTitle')}</p>
              <a
                href="tel:+35227991400"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                +352 27 99 14 00
              </a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Mail className="mt-0.5 size-5 shrink-0 text-secondary" />
            <div>
              <p className="text-sm font-semibold text-foreground">{t('emailTitle')}</p>
              <a
                href="mailto:contact@teamrealestate.eu"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                contact@teamrealestate.eu
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
