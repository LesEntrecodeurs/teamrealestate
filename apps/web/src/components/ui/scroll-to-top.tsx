'use client';

import { ArrowUp } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export function ScrollToTop() {
  const t = useTranslations('Footer');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 640);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label={t('backToTop')}
      className={cn(
        'fixed right-5 bottom-5 z-40 flex size-11 items-center justify-center rounded-full border border-navy-100 bg-white text-navy-900 shadow-lg shadow-navy-900/15 transition-all duration-300 hover:border-cyan-400 hover:text-cyan-600 sm:right-8 sm:bottom-8',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0'
      )}
    >
      <ArrowUp className="size-5" />
    </button>
  );
}
