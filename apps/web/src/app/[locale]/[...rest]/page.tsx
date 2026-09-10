import { notFound } from 'next/navigation';

/**
 * Next.js only auto-renders a nested not-found.tsx when notFound() is
 * called from within that route segment — an arbitrary unmatched path
 * otherwise bubbles to the root 404. This catch-all matches every
 * otherwise-unmatched path under a locale and triggers it explicitly.
 */
export default function CatchAll() {
  notFound();
}
