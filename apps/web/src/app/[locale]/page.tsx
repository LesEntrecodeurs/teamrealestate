import { EstimatorTeaser } from '@/modules/home/estimator-teaser';
import { FeaturedListings } from '@/modules/home/featured-listings';
import { Hero } from '@/modules/home/hero';
import { LuxembourgMapSection } from '@/modules/home/luxembourg-map-section';
import { QuickLinksBand } from '@/modules/home/quick-links-band';
import { StatsBand } from '@/modules/home/stats-band';
import { WhyTeam } from '@/modules/home/why-team';

export default function HomePage() {
  return (
    <>
      <Hero />
      <QuickLinksBand />
      <FeaturedListings />
      <LuxembourgMapSection />
      <WhyTeam />
      <StatsBand />
      <EstimatorTeaser />
    </>
  );
}
