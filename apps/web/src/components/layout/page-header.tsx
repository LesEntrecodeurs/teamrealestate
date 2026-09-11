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
    <div className="border-b border-border px-6 pb-10 pt-28 sm:px-8 sm:pt-36 lg:pb-12">
      <div className="mx-auto max-w-4xl">
        <p className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-accent">
          <span className="h-1.5 w-6 rounded-full bg-accent" />
          {eyebrow}
        </p>
        <h1 className="font-display text-4xl font-bold text-foreground sm:text-5xl">{title}</h1>
        {subtitle ? <p className="mt-4 max-w-xl text-muted-foreground">{subtitle}</p> : null}
      </div>
    </div>
  );
}
