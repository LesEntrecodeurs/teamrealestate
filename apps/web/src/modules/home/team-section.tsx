import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/ui/reveal';

/**
 * Photos pulled from the com agency's mockup deck (Présentation SITE WEB.pptx)
 * — visibly mismatched styles between them (studio headshot, casual office,
 * lifestyle shot) suggest these are stock placeholders picked to fill the
 * layout, not the real team's photos. Confirm with the client before ship;
 * see docs/charte-graphique.md.
 *
 * `focus` compensates for how differently each placeholder frames its
 * subject (Pol's is already a tight crop, Camille's is a wide seated shot)
 * so the faces read at a similar size across the grid — real photos should
 * make this unnecessary.
 */
const team = [
  {
    name: 'Jonathan Forrett',
    roleKey: 'roleCofounder',
    photo: '/team/jonathan-forrett.jpg',
    focus: { scale: 1.2, position: '50% 22%' }
  },
  {
    name: 'Jean-Marc Estgen',
    roleKey: 'roleCofounder',
    photo: '/team/jean-marc-estgen.jpg',
    focus: { scale: 1.2, position: '50% 28%' }
  },
  {
    name: 'Camille Origer',
    roleKey: 'roleRental',
    photo: '/team/camille-origer.jpg',
    focus: { scale: 2.2, position: '50% 16%' }
  },
  {
    name: 'Pol Faber',
    roleKey: 'roleLegal',
    photo: '/team/pol-faber.jpg',
    focus: { scale: 1, position: '50% 22%' }
  },
  {
    name: 'Yasmine Khelifi',
    roleKey: 'roleValuation',
    photo: '/team/yasmine-khelifi.jpg',
    focus: { scale: 1.3, position: '50% 20%' }
  }
] as const;

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
                style={
                  {
                    objectPosition: member.focus.position,
                    transformOrigin: member.focus.position,
                    '--base-scale': member.focus.scale
                  } as React.CSSProperties
                }
                className="scale-[var(--base-scale)] object-cover transition-transform duration-700 group-hover:scale-[calc(var(--base-scale)*1.08)]"
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
                  {t(member.roleKey)}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
