import { Navbar } from '@/app/components/Navbar';
import { ReadingProgressBar } from '@/app/components/ReadingProgressBar';
import { HeroSection } from '@/app/components/HeroSection';
import { ClientContextSection } from '@/app/components/ClientContextSection';
import { ChallengesSection } from '@/app/components/ChallengesSection';
import { EngagementObjectivesSection } from '@/app/components/EngagementObjectivesSection';
import { MethodologySection } from '@/app/components/MethodologySection';
import { ImpactSection } from '@/app/components/ImpactSection';
import { ClientEndorsementSection } from '@/app/components/ClientEndorsementSection';
import { FinalCTASection } from '@/app/components/FinalCTASection';
import { ResourcesSection } from '@/app/components/ResourcesSection';
import { caseStudyContent as c } from '@/app/data/caseStudyContent';
import { DealTombstoneRail } from './DealTombstoneRail';

export function TemplateA() {
  return (
    <div data-template="a">
      <ReadingProgressBar />
      <Navbar />
      <DealTombstoneRail />
      <HeroSection />
      <div className="relative bg-white" style={{ zIndex: 2 }}>
        <ClientContextSection />
        <ChallengesSection challenges={c.challenges} />
        <EngagementObjectivesSection objectives={c.objectives} />
        <MethodologySection steps={c.methodology} />
        <ImpactSection metrics={c.impact} />
        <ClientEndorsementSection variant="dribbble-card" />
        <FinalCTASection variant="dark" />
        <ResourcesSection cardStyle="bordered" />
      </div>
    </div>
  );
}
