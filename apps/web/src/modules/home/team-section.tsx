import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/ui/reveal';

/**
 * Photos pulled from the com agency's mockup deck (Présentation SITE WEB.pptx)
 * — visibly mismatched styles between them (studio headshot, casual office,
 * lifestyle shot) suggest these are stock placeholders picked to fill the
 * layout, not the real team's photos. Confirm with the client before ship;
 * see docs/charte-graphique.md.
 */
const team = [
  { name: 'Jonathan Forrett', role: 'Cofondateur', photo: '/team/jonathan-forrett.jpg' },
  { name: 'Jean-Marc Estgen', role: 'Cofondateur', photo: '/team/jean-marc-estgen.jpg' },
  { name: 'Camille Origer', role: 'Location & gestion', photo: '/team/camille-origer.jpg' },
  { name: 'Pol Faber', role: 'Juridique & notariat', photo: '/team/pol-faber.jpg' },
  { name: 'Yasmine Khelifi', role: 'Estimation & analyse', photo: '/team/yasmine-khelifi.jpg' }
];

export function TeamSection() {
  const t = useTranslations('HomePage.team');

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:py-28">
      <p className="mb-3 text-sm font-medium uppercase tracking-[0.15em] text-accent">
        {t('eyebrow')}
      </p>
      <h2 className="max-w-xl font-display text-3xl font-bold text-foreground sm:text-4xl">
        {t('title')}
      </h2>

      <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
        {team.map((member, i) => (
          <Reveal
            key={member.name}
            delay={i * 70}
            className="flex flex-col items-center text-center sm:items-start sm:text-left"
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-navy-900">
              <Image
                src={member.photo}
                alt={member.name}
                fill
                sizes="(min-width: 1024px) 20vw, 33vw"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <p className="mt-4 text-sm font-semibold text-foreground">{member.name}</p>
            <p className="text-sm text-secondary">{member.role}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
