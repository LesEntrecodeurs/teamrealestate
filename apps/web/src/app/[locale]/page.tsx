import { EstimatorTeaser } from '@/modules/home/estimator-teaser';
import { FeaturedListings } from '@/modules/home/featured-listings';
import { Hero } from '@/modules/home/hero';
import { LuxembourgMapSection } from '@/modules/home/luxembourg-map-section';
import { StatsBand } from '@/modules/home/stats-band';
import { WhyTeam } from '@/modules/home/why-team';

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBand />
      <FeaturedListings />
      <LuxembourgMapSection />
      <WhyTeam />
      <EstimatorTeaser />
    </>
  );
}
