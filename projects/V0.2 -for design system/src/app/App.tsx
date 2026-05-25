import { useState, useEffect, lazy, Suspense } from 'react';
import { Header } from '@/app/components/Header';
import { HeroSection } from '@/app/components/HeroSection';
import { MarketOverview } from '@/app/components/MarketOverview';
import { ScopeOfReport } from '@/app/components/ScopeOfReport';
import { MarketAnalysis } from '@/app/components/MarketAnalysis';
import { MarketDataTable } from '@/app/components/MarketDataTable';
import { SegmentationSection } from '@/app/components/SegmentationSection';
import { RegionalComparison } from '@/app/components/RegionalComparison';
import { GrowthDriversChallenges } from '@/app/components/GrowthDriversChallenges';
import { CompetitiveLandscape } from '@/app/components/CompetitiveLandscape';
import { TableOfContentsSection } from '@/app/components/TableOfContentsSection';
import { TargetAudience } from '@/app/components/TargetAudience';
import { ResearchMethodology } from '@/app/components/ResearchMethodology';
import { FAQSection } from '@/app/components/FAQSection';
import { RelatedReports } from '@/app/components/RelatedReports';
import { FinalCTA } from '@/app/components/FinalCTA';
import { Footer } from '@/app/components/Footer';
import { FloatingCTA } from '@/app/components/FloatingCTA';
import { TableOfContentsSidebar } from '@/app/components/TableOfContentsSidebar';
import { AudioPlayerProvider, PlayerVariantSwitcher } from '@/app/components/AudioPlayer';

// Lazy load the DesignSystem page
const DesignSystem = lazy(() => 
  import('@/app/pages/DesignSystem').then(module => ({ default: module.DesignSystem }))
);

// Lazy load the MindMapDemo page
const MindMapDemo = lazy(() => 
  import('@/app/pages/MindMapDemo').then(module => ({ default: module.MindMapDemo }))
);

// Lazy load the StakeholderIconsPage
const StakeholderIconsPage = lazy(() => 
  import('@/app/pages/StakeholderIconsPage').then(module => ({ default: module.StakeholderIconsPage }))
);

// Lazy load the SegmentationIconsPage
const SegmentationIconsPage = lazy(() => 
  import('@/app/pages/SegmentationIconsPage').then(module => ({ default: module.SegmentationIconsPage }))
);

// Lazy load the ChartsShowcasePage
const ChartsShowcasePage = lazy(() => 
  import('@/app/pages/ChartsShowcasePage').then(module => ({ default: module.ChartsShowcasePage }))
);

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    // Handle browser back/forward buttons
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    
    // Intercept link clicks for client-side navigation
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && link.href && link.origin === window.location.origin) {
        const url = new URL(link.href);
        if (url.pathname === '/design-system' || url.pathname === '/mind-map-demo' || url.pathname === '/stakeholder-icons' || url.pathname === '/segmentation-icons' || url.pathname === '/charts-showcase' || url.pathname === '/') {
          e.preventDefault();
          window.history.pushState({}, '', link.href);
          setCurrentPath(url.pathname);
          window.scrollTo(0, 0);
        }
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  // If on design system page, show only that
  if (currentPath === '/design-system') {
    return (
      <Suspense fallback={
        <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#7f5fe3] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-[#525252]">Loading Design System...</p>
          </div>
        </div>
      }>
        <DesignSystem />
      </Suspense>
    );
  }

  // If on mind map demo page, show only that
  if (currentPath === '/mind-map-demo') {
    return (
      <Suspense fallback={
        <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#7f5fe3] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-[#525252]">Loading Mind Map Demo...</p>
          </div>
        </div>
      }>
        <MindMapDemo />
      </Suspense>
    );
  }

  // If on stakeholder icons page, show only that
  if (currentPath === '/stakeholder-icons') {
    return (
      <Suspense fallback={
        <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#7f5fe3] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-[#525252]">Loading Stakeholder Icons...</p>
          </div>
        </div>
      }>
        <StakeholderIconsPage />
      </Suspense>
    );
  }

  // If on segmentation icons page, show only that
  if (currentPath === '/segmentation-icons') {
    return (
      <Suspense fallback={
        <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#7f5fe3] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-[#525252]">Loading Segmentation Icons...</p>
          </div>
        </div>
      }>
        <SegmentationIconsPage />
      </Suspense>
    );
  }

  // If on charts showcase page, show only that
  if (currentPath === '/charts-showcase') {
    return (
      <Suspense fallback={
        <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#7f5fe3] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-[#525252]">Loading Charts Showcase...</p>
          </div>
        </div>
      }>
        <ChartsShowcasePage />
      </Suspense>
    );
  }

  // Otherwise show the main landing page
  return (
    <AudioPlayerProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <HeroSection />
        
        <div className="flex">
          <TableOfContentsSidebar />
          
          <main className="flex-1 pb-16 min-w-0">
            <MarketOverview />
            <ScopeOfReport />
            <MarketAnalysis />
            <MarketDataTable />
            <SegmentationSection />
            <RegionalComparison />
            <GrowthDriversChallenges />
            <CompetitiveLandscape />
            <TableOfContentsSection />
            <TargetAudience />
            <ResearchMethodology />
            <FAQSection />
            <RelatedReports />
            <FinalCTA />
          </main>
        </div>
        
        <Footer />
        <FloatingCTA />
        <PlayerVariantSwitcher />
      </div>
    </AudioPlayerProvider>
  );
}