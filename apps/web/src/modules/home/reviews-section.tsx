import { Star } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Counter } from '@/components/ui/counter';
import { Reveal } from '@/components/ui/reveal';

/**
 * Placeholder reviews — E06 (Google My Business/Places API integration) is
 * not wired up yet. Rating and count are illustrative, not real figures.
 */
export function ReviewsSection() {
  const t = useTranslations('HomePage.reviews');

  const reviews = [
    { author: t('review1Author'), body: t('review1Body') },
    { author: t('review2Author'), body: t('review2Body') },
    { author: t('review3Author'), body: t('review3Body') }
  ];

  return (
    <section className="border-y border-navy-100 bg-ecru-100">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:py-24">
        <div className="mb-12 flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {t('eyebrow')}
            </p>
            <h2 className="font-display text-3xl font-medium text-foreground sm:text-4xl">
              {t('title')}
            </h2>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="font-display text-5xl font-medium text-foreground">
              <Counter value="4.9" durationMs={800} />
            </span>
            <div>
              <div className="flex gap-0.5 text-accent">
                {['s1', 's2', 's3', 's4', 's5'].map((key) => (
                  <Star key={key} className="size-4 fill-current" />
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                <Counter value="128" /> {t('reviewsCount')}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-3">
          {reviews.map((review, i) => (
            <Reveal key={review.author} delay={i * 100} className="border-t border-navy-200 pt-6">
              <span className="font-display text-4xl leading-none text-accent">&ldquo;</span>
              <p className="mt-2 text-sm text-muted-foreground">{review.body}</p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-foreground">
                {review.author}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
