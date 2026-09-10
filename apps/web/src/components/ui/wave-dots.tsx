export function WaveDots({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 1440 64" preserveAspectRatio="none" className={className} aria-hidden="true">
      <path
        d="M0,32 C120,2 240,2 360,32 C480,62 600,62 720,32 C840,2 960,2 1080,32 C1200,62 1320,62 1440,32"
        fill="none"
        strokeWidth="5"
        strokeLinecap="round"
        className="stroke-cyan-500"
      />
      <circle cx="120" cy="6" r="4" className="fill-cyan-400" />
      <circle cx="360" cy="58" r="3" className="fill-cyan-300" />
      <circle cx="720" cy="58" r="4" className="fill-cyan-400" />
      <circle cx="1080" cy="6" r="3" className="fill-cyan-300" />
      <circle cx="1320" cy="58" r="4" className="fill-cyan-400" />
    </svg>
  );
}
