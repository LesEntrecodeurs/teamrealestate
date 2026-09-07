import { useTranslations } from 'next-intl';

export default function LegalNoticePage() {
  const t = useTranslations('LegalPage');

  return (
    <div className="mx-auto max-w-3xl px-6 py-28 sm:px-8">
      <h1 className="font-display text-3xl font-medium text-foreground">{t('legalNoticeTitle')}</h1>
      <p className="mt-6 text-muted-foreground">{t('placeholder')}</p>
    </div>
  );
}
