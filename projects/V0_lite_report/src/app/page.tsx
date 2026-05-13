import { ScrollProgress, ScrollToTop } from '@kenresearch/design-system/atoms';
import {
  Footer,
  CTASection,
  FAQSection,
  HeroSection,
  ReportHighlights,
  KeyStats,
  SlideshowSection,
} from '@/components/sections';
import { SampleReportPreview } from '@/components/sample-report';
import { AnalyticsDashboard } from '@/components/AnalyticsDashboard';

export default function HomePage() {
  return (
    <>
      <ScrollProgress />
      <HeroSection />

      <KeyStats region="global" />
      <ReportHighlights />
      <SampleReportPreview />
      <SlideshowSection />
      <FAQSection />
      <CTASection />

      <Footer />
      <ScrollToTop />
      <AnalyticsDashboard />
    </>
  );
}
