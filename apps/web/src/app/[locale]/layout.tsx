import type { Metadata } from 'next';
import { Red_Hat_Display } from 'next/font/google';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { ScrollToTop } from '@/components/ui/scroll-to-top';
import { routing } from '@/i18n/routing';
import '../globals.css';

const redHatDisplay = Red_Hat_Display({
  subsets: ['latin'],
  variable: '--font-red-hat-display',
  display: 'swap'
});

export const metadata: Metadata = {
  title: {
    default: 'Team Real Estate — Agence immobilière à Luxembourg',
    template: '%s — Team Real Estate'
  },
  description:
    "L'immobilier joue collectif. Achat, location, vente et estimation avec l'équipe Team Real Estate à Luxembourg-Ville."
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} className={redHatDisplay.variable}>
      <body className="flex min-h-svh flex-col antialiased">
        <NextIntlClientProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          <ScrollToTop />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
