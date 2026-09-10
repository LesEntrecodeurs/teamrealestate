'use client';

import { useEffect, useRef } from 'react';

/**
 * Callback to the small 2x2 cyan "window" square in the logo (under the A
 * of TEAM) — scattered faintly across the hero background, drifting at
 * different rates on scroll for a bit of depth.
 */
const SQUARES = [
  { id: 'sq-1', top: '14%', left: '7%', size: 14, speed: 0.15, opacity: 0.14 },
  { id: 'sq-2', top: '24%', left: '80%', size: 10, speed: 0.28, opacity: 0.12 },
  { id: 'sq-3', top: '70%', left: '16%', size: 18, speed: 0.1, opacity: 0.1 },
  { id: 'sq-4', top: '38%', left: '92%', size: 12, speed: 0.32, opacity: 0.16 },
  { id: 'sq-5', top: '82%', left: '58%', size: 9, speed: 0.2, opacity: 0.12 },
  { id: 'sq-6', top: '6%', left: '46%', size: 11, speed: 0.36, opacity: 0.1 },
  { id: 'sq-7', top: '56%', left: '3%', size: 16, speed: 0.18, opacity: 0.13 },
  { id: 'sq-8', top: '10%', left: '64%', size: 8, speed: 0.24, opacity: 0.11 }
] as const;

export function HeroSquares() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const items = Array.from(container.children) as HTMLElement[];
    let frame = 0;

    function onScroll() {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;
        for (const item of items) {
          const speed = Number(item.dataset.speed);
          item.style.transform = `translateY(${y * speed}px)`;
        }
        frame = 0;
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {SQUARES.map((square) => (
        <span
          key={square.id}
          data-speed={square.speed}
          className="absolute rounded-sm bg-cyan-300"
          style={{
            top: square.top,
            left: square.left,
            width: square.size,
            height: square.size,
            opacity: square.opacity
          }}
        />
      ))}
    </div>
  );
}
