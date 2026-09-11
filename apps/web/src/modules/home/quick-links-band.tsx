import { Calculator, Key, MessageCircle, Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

const links = [
  { key: 'estimate', href: '/vendre', icon: Calculator },
  { key: 'buy', href: '/acheter', icon: Search },
  { key: 'rent', href: '/louer', icon: Key },
  { key: 'contact', href: '/contact', icon: MessageCircle }
] as const;

export function QuickLinksBand() {
  const t = useTranslations('HomePage.quickLinks');

  return (
    <div className="relative z-10 mx-auto -mt-10 w-full max-w-5xl px-6 sm:-mt-14 sm:px-8">
      <div className="rounded-2xl bg-background px-6 py-6 sm:rounded-3xl sm:px-10 sm:py-8">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {links.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-navy-900 transition-colors hover:text-cyan-600"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-cyan-100 text-cyan-600">
                <link.icon className="size-4" />
              </span>
              {t(`${link.key}Label`)}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
