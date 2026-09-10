import type { routing } from '@/i18n/routing';

type Locale = (typeof routing.locales)[number];

function FlagFr({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 3 2" className={className} aria-hidden="true">
      <rect width="3" height="2" fill="#fff" />
      <rect width="1" height="2" fill="#002395" />
      <rect x="2" width="1" height="2" fill="#ED2939" />
    </svg>
  );
}

function FlagEn({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 30" className={className} aria-hidden="true">
      <rect width="60" height="30" fill="#012169" />
      <path d="M0,0 60,30 M60,0 0,30" stroke="#fff" strokeWidth="6" />
      <path d="M0,0 30,15 M60,0 30,15 M0,30 30,15 M60,30 30,15" stroke="#C8102E" strokeWidth="4" />
      <path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  );
}

function FlagDe({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 3 2" className={className} aria-hidden="true">
      <rect width="3" height="2" fill="#FFCE00" />
      <rect width="3" height="1.333" fill="#DD0000" />
      <rect width="3" height="0.667" fill="#000" />
    </svg>
  );
}

const flags: Record<Locale, (props: { className?: string }) => React.JSX.Element> = {
  fr: FlagFr,
  en: FlagEn,
  de: FlagDe
};

export function FlagIcon({ locale, className }: { locale: Locale; className?: string }) {
  const Flag = flags[locale];
  return <Flag className={className} />;
}
