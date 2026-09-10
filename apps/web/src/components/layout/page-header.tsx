export function PageHeader({
  eyebrow,
  title,
  subtitle
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="bg-navy-900 px-6 pb-16 pt-28 text-white sm:px-8 sm:pt-36 lg:pb-20">
      <div className="mx-auto max-w-4xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-cyan-300">
          {eyebrow}
        </p>
        <h1 className="font-display text-4xl font-bold sm:text-5xl">{title}</h1>
        {subtitle ? <p className="mt-4 max-w-xl text-white/75">{subtitle}</p> : null}
      </div>
    </div>
  );
}
