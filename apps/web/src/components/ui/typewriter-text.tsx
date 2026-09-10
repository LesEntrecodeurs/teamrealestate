'use client';

import { useEffect, useState } from 'react';

const TYPE_SPEED_MS = 45;
const DELETE_SPEED_MS = 25;
const PAUSE_MS = 1800;

export function TypewriterText({ phrases, className }: { phrases: string[]; className?: string }) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [text, setText] = useState('');
  const [phase, setPhase] = useState<'typing' | 'deleting'>('typing');

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    if (reducedMotion || phrases.length === 0) return;
    const current = phrases[phraseIndex] ?? '';

    if (phase === 'typing') {
      if (text.length < current.length) {
        const id = setTimeout(() => setText(current.slice(0, text.length + 1)), TYPE_SPEED_MS);
        return () => clearTimeout(id);
      }
      const id = setTimeout(() => setPhase('deleting'), PAUSE_MS);
      return () => clearTimeout(id);
    }

    if (text.length > 0) {
      const id = setTimeout(() => setText(text.slice(0, -1)), DELETE_SPEED_MS);
      return () => clearTimeout(id);
    }
    setPhraseIndex((i) => (i + 1) % phrases.length);
    setPhase('typing');
  }, [text, phase, phraseIndex, phrases, reducedMotion]);

  const display = reducedMotion ? (phrases[0] ?? '') : text;

  return (
    <span className={className}>
      <span aria-hidden="true" className="sm:whitespace-nowrap">
        {display}
        {!reducedMotion ? (
          <span
            className="ml-0.5 inline-block w-[2px] animate-pulse bg-current align-[-0.1em]"
            style={{ height: '0.85em' }}
          />
        ) : null}
      </span>
      <span className="sr-only">{phrases[0]}</span>
    </span>
  );
}
