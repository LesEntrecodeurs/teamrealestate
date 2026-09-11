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
    <div className="relative z-10 mx-auto -mt-16 w-full max-w-5xl px-6 sm:-mt-20 sm:px-8">
      <div className="rounded-2xl bg-background px-6 py-6 sm:rounded-3xl sm:px-10 sm:py-8">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {links.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className="group flex flex-col items-center gap-3 rounded-xl bg-white px-4 py-6 text-center text-sm font-semibold text-navy-900 transition-colors hover:text-cyan-600"
            >
              <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-100 to-cyan-50 text-cyan-600 shadow-inner shadow-cyan-900/5 transition-transform duration-300 group-hover:scale-105">
                <link.icon className="size-6" strokeWidth={1.75} />
              </span>
              {t(`${link.key}Label`)}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
