import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { mainNav } from '@/config/navigation';
import { Link } from '@/i18n/navigation';

export function SiteFooter() {
  const t = useTranslations('Footer');
  const nav = useTranslations('Nav');

  return (
    <footer className="bg-navy-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-cyan-400">
          {t('writeUs')}
        </p>
        <a
          href="mailto:contact@teamrealestate.eu"
          className="group flex flex-wrap items-center gap-2 font-display text-2xl font-bold sm:gap-3 sm:text-3xl lg:text-5xl"
        >
          contact@teamrealestate.eu
          <ArrowUpRight className="size-6 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 sm:size-8 lg:size-10" />
        </a>

        <div className="mt-16 grid grid-cols-2 gap-8 border-t border-white/10 pt-10 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <Image
              src="/logo/team-logo-negatif.png"
              alt="Team Real Estate"
              width={132}
              height={122}
              className="h-12 w-auto"
            />
            <p className="mt-4 max-w-[22ch] text-sm text-navy-300">{t('tagline')}</p>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold">{t('servicesTitle')}</p>
            <ul className="space-y-2 text-sm text-navy-300">
              {mainNav.slice(0, 4).map((item) => (
                <li key={item.key}>
                  <Link href={item.href} className="transition-colors hover:text-white">
                    {nav(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold">{t('agencyTitle')}</p>
            <ul className="space-y-2 text-sm text-navy-300">
              <li>
                <Link href="/mentions-legales" className="transition-colors hover:text-white">
                  {t('legalNotice')}
                </Link>
              </li>
              <li>
                <Link href="/confidentialite" className="transition-colors hover:text-white">
                  {t('privacy')}
                </Link>
              </li>
              <li>
                <Link href="/conditions-generales" className="transition-colors hover:text-white">
                  {t('terms')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold">Luxembourg</p>
            <p className="text-sm text-navy-300">
              12 place de la Gare
              <br />
              L-1616 Luxembourg
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-xs text-navy-400">
          <p>
            © {new Date().getFullYear()} Team Real Estate S.à r.l. · {t('rightsReserved')}
          </p>
        </div>
      </div>
    </footer>
  );
}
