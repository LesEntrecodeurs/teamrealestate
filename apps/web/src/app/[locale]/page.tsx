import { AgencySection } from '@/modules/home/agency-section';
import { CtaBand } from '@/modules/home/cta-band';
import { EstimatorTeaser } from '@/modules/home/estimator-teaser';
import { FeaturedListings } from '@/modules/home/featured-listings';
import { Hero } from '@/modules/home/hero';
import { TeamSection } from '@/modules/home/team-section';
import { WhyTeam } from '@/modules/home/why-team';

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedListings />
      <AgencySection />
      <TeamSection />
      <WhyTeam />
      <EstimatorTeaser />
      <CtaBand />
    </>
  );
}
