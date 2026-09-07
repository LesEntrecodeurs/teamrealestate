import { useTranslations } from 'next-intl';

/**
 * Real headshots are pending from the client — until then we show a
 * branded initials avatar rather than a stock photo standing in for a
 * named person.
 */
const team = [
  { name: 'Jonathan Forrett', role: 'Cofondateur' },
  { name: 'Jean-Marc Estgen', role: 'Cofondateur' },
  { name: 'Camille Origer', role: 'Location & gestion' },
  { name: 'Pol Faber', role: 'Juridique & notariat' },
  { name: 'Yasmine Khelifi', role: 'Estimation & analyse' }
];

function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('');
}

export function TeamSection() {
  const t = useTranslations('HomePage.team');

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:py-28">
      <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-accent">
        <span className="h-px w-6 bg-accent" />
        {t('eyebrow')}
      </p>
      <h2 className="max-w-xl font-display text-3xl font-medium text-foreground sm:text-4xl">
        {t('title')}
      </h2>

      <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
        {team.map((member) => (
          <div
            key={member.name}
            className="flex flex-col items-center text-center sm:items-start sm:text-left"
          >
            <div className="flex aspect-square w-full items-center justify-center rounded-2xl bg-navy-900 font-display text-3xl font-medium text-cyan-300">
              {initials(member.name)}
            </div>
            <p className="mt-4 text-sm font-semibold text-foreground">{member.name}</p>
            <p className="text-sm text-secondary">{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
