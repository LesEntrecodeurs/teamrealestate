import { useTranslations } from 'next-intl';
import { PageHeader } from '@/components/layout/page-header';
import { AgencySection } from '@/modules/home/agency-section';
import { TeamSection } from '@/modules/home/team-section';
import { WhyTeam } from '@/modules/home/why-team';

export default function AgencyPage() {
  const t = useTranslations('AgencyPage');

  return (
    <>
      <PageHeader eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />
      <AgencySection />
      <TeamSection />
      <WhyTeam />
    </>
  );
}
