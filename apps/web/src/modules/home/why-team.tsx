import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/ui/reveal';

export function WhyTeam() {
  const t = useTranslations('HomePage.why');

  const items = [
    { n: '01', title: t('item1Title'), body: t('item1Body') },
    { n: '02', title: t('item2Title'), body: t('item2Body') },
    { n: '03', title: t('item3Title'), body: t('item3Body') },
    { n: '04', title: t('item4Title'), body: t('item4Body') }
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:py-28">
      <div className="mb-14 grid grid-cols-1 gap-6 lg:grid-cols-12">
        <p className="text-sm font-medium uppercase tracking-[0.15em] text-accent lg:col-span-3">
          {t('eyebrow')}
        </p>
        <h2 className="font-display text-3xl font-medium text-foreground sm:text-4xl lg:col-span-9">
          {t('title')}
        </h2>
      </div>

      <div>
        {items.map((item, i) => (
          <Reveal key={item.n} delay={i * 80}>
            <div className="grid grid-cols-1 gap-4 border-t border-navy-100 py-8 sm:grid-cols-12 sm:gap-8">
              <span className="font-display text-4xl text-navy-300 sm:col-span-2">{item.n}</span>
              <p className="font-semibold text-foreground sm:col-span-3">{item.title}</p>
              <p className="text-sm text-muted-foreground sm:col-span-7">{item.body}</p>
            </div>
          </Reveal>
        ))}
        <div className="border-t border-navy-100" />
      </div>
    </section>
  );
}
