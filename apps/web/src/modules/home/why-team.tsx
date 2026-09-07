import { Clock, Layers, RefreshCcw, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function WhyTeam() {
  const t = useTranslations('HomePage.why');

  const items = [
    { icon: Clock, title: t('item1Title'), body: t('item1Body') },
    { icon: Layers, title: t('item2Title'), body: t('item2Body') },
    { icon: RefreshCcw, title: t('item3Title'), body: t('item3Body') },
    { icon: Sparkles, title: t('item4Title'), body: t('item4Body') }
  ];

  return (
    <section className="bg-navy-50">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:py-28">
        <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-accent">
          <span className="h-px w-6 bg-accent" />
          {t('eyebrow')}
        </p>
        <h2 className="max-w-xl font-display text-3xl font-medium text-foreground sm:text-4xl">
          {t('title')}
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item.title} className="border-t border-navy-200 pt-6">
              <item.icon className="size-6 text-secondary" />
              <p className="mt-4 font-semibold text-foreground">{item.title}</p>
              <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
