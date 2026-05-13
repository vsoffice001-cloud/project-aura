import { useState } from 'react';
import { HeroSection } from '@/app/components/HeroSection';
import { ClientContextSection } from '@/app/components/ClientContextSection';
import { ChallengesSection } from '@/app/components/ChallengesSection';
import { EngagementObjectivesSection } from '@/app/components/EngagementObjectivesSection';
import { MethodologySection } from '@/app/components/MethodologySection';
import { ImpactSection } from '@/app/components/ImpactSection';
import { ClientEndorsementSection } from '@/app/components/ClientEndorsementSection';
import { FinalCTASection } from '@/app/components/FinalCTASection';
import { ResourcesSection } from '@/app/components/ResourcesSection';
import { Navbar } from '@/app/components/Navbar';
import { ReadingProgressBar } from '@/app/components/ReadingProgressBar';
import { StickyCTA } from '@/app/components/StickyCTA';
import { ContactModal } from '@/app/components/ContactModal';
import { SearchModal } from '@/app/components/SearchModal';

function App() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const challenges = [
    {
      number: "01",
      title: "Market Visibility Gaps",
      questions: [
        "What is the actual size of the Indian transformer bushing market?",
        "How much is addressable by the client today?",
        "Which segments represent the highest-value opportunities?"
      ]
    },
    {
      number: "02",
      title: "Competitive Blind Spots",
      questions: [
        "How does Yash's portfolio compare with competitors?",
        "What differentiated the fastest-growing players?",
        "Where are the white spaces in product range?"
      ]
    },
    {
      number: "03",
      title: "Supply Chain Risks",
      questions: [
        "What percentage depends on imports vs domestic production?",
        "Which suppliers pose pricing or lead-time risks?",
        "What are the procurement bottlenecks?"
      ]
    },
    {
      number: "04",
      title: "Investor Narrative Weakness",
      questions: [
        "How to articulate market opportunity clearly?",
        "Which growth levers matter to stakeholders?",
        "What pathways justify capacity expansion?"
      ]
    }
  ];

  const engagementObjectives = [
    {
      number: "01",
      title: "Build a High-Resolution TAM–SAM–SOM Model",
      description: "Develop a voltage-wise, application-wise, and customer cluster-wise mapping of the transformer bushing market, grounded in primary interviews, utility procurement cycles, and OEM expansion plans."
    },
    {
      number: "02",
      title: "Construct a Competitor Intelligence System",
      description: "Evaluate 10+ manufacturers (domestic and international) on product depth, price competitiveness, certifications, reliability KPIs, and strategic differentiators."
    },
    {
      number: "03",
      title: "Conduct a Supply Chain & Import Dependency Audit",
      description: "Analyze sourcing flows for key ceramic, condenser, and insulation components; benchmark supplier ecosystems; assess risks and cost levers."
    },
    {
      number: "04",
      title: "Deliver an Investor-Ready Strategic Narrative",
      description: "Translate insights into a growth story that strengthens valuation logic and provides a credible roadmap for capacity planning and market penetration."
    }
  ];

  const methodologySteps = [
    {
      number: "01",
      title: "Function-Level Integration Mapping",
      description: "Conducted comprehensive mapping across Finance, HR, Supply Chain, Sales, Quality, and Regulatory Affairs. Identified cultural, process, and compliance gaps between entities. Developed harmonization pathways aligned with governance standards."
    },
    {
      number: "02",
      title: "SOP & Risk Practice Benchmarking",
      description: "Benchmarked existing SOPs, audit findings, risk controls, and compliance mechanisms against governance standards. Highlighted high-priority remediation areas and designed a unified compliance framework."
    },
    {
      number: "03",
      title: "SEBI Compliance Support",
      description: "Developed a comprehensive IPO readiness report aligned with SEBI disclosure requirements. Built investor inputs across market potential, business strengths, risk factors, and long-term opportunity mapping."
    }
  ];

  const impactMetrics = [
    {
      value: "₹110 Cr",
      label: "Total Addressable Market",
      description: "Sell-side positioning achieved for transformer bushing market evaluation"
    },
    {
      value: "₹68 Cr",
      label: "Serviceable Market Opportunity",
      description: "Identified high-voltage segment opportunity with competitive positioning insights"
    },
    {
      value: "3.2x",
      label: "Market Growth Potential",
      description: "Projected expansion driven by grid modernization and renewable energy integration"
    },
    {
      value: "15%",
      label: "Market Share Target",
      description: "Strategic positioning identified through competitive benchmarking and gap analysis"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Reading Progress Bar */}
      <ReadingProgressBar />
      
      {/* Navbar */}
      <Navbar 
        onOpenSearch={() => setIsSearchModalOpen(true)}
        onOpenContact={() => setIsContactModalOpen(true)}
      />
      
      {/* Hero Section with variant switcher */}
      <HeroSection enableVariantSwitcher={true} />
      
      {/* Content Sections - Higher z-index to overlay sticky hero */}
      <div className="relative bg-white" style={{ zIndex: 2 }}>
        <ClientContextSection />
        <ChallengesSection challenges={challenges} />
        <EngagementObjectivesSection objectives={engagementObjectives} />
        <MethodologySection steps={methodologySteps} />
        <ImpactSection metrics={impactMetrics} />
        <ClientEndorsementSection 
          variant="dribbble-card"
          enableVariantSwitcher={true}
        />
        <FinalCTASection variant="dark" enableVariantSwitcher={true} />
        <ResourcesSection />
      </div>

      {/* Sticky CTA */}
      <StickyCTA onOpenContact={() => setIsContactModalOpen(true)} />

      {/* Modals */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
      <SearchModal 
        isOpen={isSearchModalOpen} 
        onClose={() => setIsSearchModalOpen(false)} 
      />
    </div>
  );
}

export default App;
