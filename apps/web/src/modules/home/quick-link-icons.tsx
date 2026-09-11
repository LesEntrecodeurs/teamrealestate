import type { SVGProps } from 'react';

/** Hand-drawn icon set for the homepage quick-links band — a house-based glyph per action, kept in the same stroke language as lucide (round caps/joins, 1.75 weight) so they sit naturally next to the rest of the UI. */

function IconBase({ children, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {children}
    </svg>
  );
}

export function EstimateIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5" />
      <path d="M9 17v-3M12 17v-5.5M15 17v-2" />
    </IconBase>
  );
}

export function BuyIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5" />
      <path d="M9 21v-5.5h6V21" />
      <path d="m9.5 12 2 2 3-3" />
    </IconBase>
  );
}

export function RentIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <circle cx="8" cy="8" r="4" />
      <path d="M11 11 20.5 20.5" />
      <path d="M15.5 16 18 18.5" />
      <path d="M13 18.5 15 20.5" />
    </IconBase>
  );
}

export function ContactIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7a2.5 2.5 0 0 1-2.5 2.5H10l-4.5 4v-4H6.5A2.5 2.5 0 0 1 4 13.5v-7Z" />
      <circle cx="8.7" cy="10" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="12" cy="10" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="15.3" cy="10" r="0.9" fill="currentColor" stroke="none" />
    </IconBase>
  );
}
