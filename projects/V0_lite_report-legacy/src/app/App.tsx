import '../styles/fonts.css';
import '../styles/theme.css';
/**
 * App — Root component for the Healthcare Market Analysis Landing Page
 *
 * Page flow: Hero → SampleReportPreview → Slideshow → ReportHighlights → FAQ → CTASection
 *
 * Structural elements:
 *   - ScrollProgress: Brand-red top bar tracking scroll depth (brand red is
 *     appropriate here — it's a persistent visual indicator drawing attention
 *     to engagement depth, effectively serving as a soft conversion signal)
 *   - ScrollToTop: Black utility FAB (92% foundation tier — NOT purple/red,
 *     because it's a navigation aid, not a CTA or decorative accent)
 *   - AnalyticsDashboard: Hidden dev tool (Ctrl+Shift+A)
 *
 * Post-audit state (Feb 26, 2026):
 *   - Tier 4 decomposition complete (SampleReportPreview split into 6 files)
 *   - Tier 5 polish & accessibility complete
 *   - All sidebar, separator, and utility element colors verified against 92-5-3
 */
/* Mobile-first responsive application */
import { useState } from 'react';
import { NewHeader } from './components/NewHeader';
import { HeroSection } from './components/HeroSection';
import { SampleReportPreview } from './components/SampleReportPreview';
import { SlideshowSection, type SlideshowVariant } from './components/SlideshowSection';
import { ReportHighlights } from './components/ReportHighlights';
import { FAQSection } from './components/FAQSection';
import { CTASection } from './components/CTASection';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { ScrollProgress } from '@/design-system';
import { ScrollToTop } from '@/design-system';

export default function App() {
  const [slideshowVariant, setSlideshowVariant] = useState<SlideshowVariant>('light');

  return (
    <div className="min-h-screen bg-white overflow-x-clip">
      {/* Scroll Progress Indicator */}
      <ScrollProgress />
      
      <NewHeader />
      <main id="main-content">
        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. Sample Report Preview with Side TOC */}
        <SampleReportPreview />

        {/* 3. Slideshow Section - PPT deck preview */}
        <SlideshowSection
          variant={slideshowVariant}
          onVariantChange={setSlideshowVariant}
        />

        {/* 4. Report Highlights */}
        <ReportHighlights />

        {/* 5. FAQ */}
        <FAQSection />

        {/* 6. CTA Section */}
        <CTASection />
      </main>
      
      {/* Scroll to Top Button */}
      <ScrollToTop />
      
      {/* Analytics Dashboard - Toggle with Ctrl+Shift+A */}
      <AnalyticsDashboard />
    </div>
  );
}