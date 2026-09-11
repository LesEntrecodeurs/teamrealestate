'use client';

import { useEffect, useState } from 'react';

const TYPE_SPEED_MS = 35;
const DELETE_SPEED_MS = 18;
const PAUSE_MS = 2200;

/**
 * Types out each phrase, pauses, deletes, moves to the next — for an
 * <input placeholder>, which can only ever be a plain string (no JSX/cursor
 * span like TypewriterText renders for the hero headline).
 */
export function useRotatingPlaceholder(phrases: string[], active = true) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [text, setText] = useState('');
  const [phase, setPhase] = useState<'typing' | 'deleting'>('typing');

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    if (!active || reducedMotion || phrases.length === 0) return;
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
  }, [text, phase, phraseIndex, phrases, active, reducedMotion]);

  if (!active || reducedMotion) return phrases[0] ?? '';
  return text;
}
