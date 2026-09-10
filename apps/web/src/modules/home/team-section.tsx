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
      <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
        <span className="h-1.5 w-6 rounded-full bg-accent" />
        {t('eyebrow')}
      </p>
      <h2 className="max-w-xl font-display text-3xl font-bold text-foreground sm:text-4xl">
        {t('title')}
      </h2>

      <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5 lg:gap-8">
        {team.map((member, i) => (
          <Reveal key={member.name} delay={i * 70} className="group">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-navy-900 ring-1 ring-navy-900/5 transition-shadow duration-500 group-hover:shadow-xl group-hover:shadow-navy-900/20">
              <Image
                src={member.photo}
                alt={member.name}
                fill
                sizes="(min-width: 1024px) 20vw, 33vw"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-950/10 to-transparent" />
              <span className="absolute left-4 top-4 font-display text-xs font-bold text-white/40">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="font-display text-lg font-bold leading-tight text-white">
                  {member.name}
                </p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-cyan-300">
                  {member.role}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
