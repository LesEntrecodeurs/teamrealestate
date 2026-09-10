'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Animates from 0 to the first integer found in `value` once it scrolls
 * into view, preserving any prefix/suffix text around the number
 * (e.g. "+200", "16 ans").
 */
export function Counter({ value, durationMs = 1200 }: { value: string; durationMs?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value.replace(/\d+/, '0'));
  const match = value.match(/\d+/);
  const target = match ? Number(match[0]) : null;

  useEffect(() => {
    const node = ref.current;
    if (!node || target === null) {
      setDisplay(value);
      return;
    }

    const numericTarget = target;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();

        const start = performance.now();
        function tick(now: number) {
          const progress = Math.min((now - start) / durationMs, 1);
          const eased = 1 - (1 - progress) ** 3;
          const current = Math.round(numericTarget * eased);
          setDisplay(value.replace(/\d+/, String(current)));
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [target, value, durationMs]);

  return <span ref={ref}>{display}</span>;
}
