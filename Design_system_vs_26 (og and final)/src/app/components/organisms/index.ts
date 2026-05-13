/**
 * Product Page Organisms barrel export
 *
 * Cross-pillar reusable section organisms for Product pages (Report Store, Surveys).
 * Each organism composes SectionWrapper + SectionHeading + molecule(s) into a
 * configurable section template.
 *
 * NOTE: Consulting (Display page) organisms live flat in /src/app/components/
 * (HeroSection, ChallengesSection, ImpactSection, etc. — 10 total).
 */
export { ProductHero } from './ProductHero';
export type { ProductHeroProps } from './ProductHero';

export { FeaturedCarousel } from './FeaturedCarousel';
export type { FeaturedCarouselProps } from './FeaturedCarousel';

export { StatsRow } from './StatsRow';
export type { StatsRowProps, StatItem } from './StatsRow';

export { BrowseGrid } from './BrowseGrid';
export type { BrowseGridProps } from './BrowseGrid';

export { CTABanner } from './CTABanner';
export type { CTABannerProps } from './CTABanner';

export { ProductPageTemplate } from './ProductPageTemplate';
export type { ProductPageTemplateProps } from './ProductPageTemplate';

// ── Report Store Organisms (v4.3) ────────────────────────────
export { ReportStoreHero } from './ReportStoreHero';
export { FeaturedResearch } from './FeaturedResearch';
export { ListingToolbar } from './ListingToolbar';
export { CardListing } from './CardListing';
export { FiltersPanel } from './FiltersPanel';
export { IndustrySidebar } from './IndustrySidebar';
export { IndustryFocusBanner } from './IndustryFocusBanner';

export { DailyDataHighlights } from './DailyDataHighlights';
export { AnalystPicks } from './AnalystPicks';
export { IndustrySectorsGrid } from './IndustrySectorsGrid';

// ── Report Store Section Organisms (v4.3 — Phase 4) ─────────
export { KeyMarketIndicators } from './KeyMarketIndicators';
export { RecommendedForYou } from './RecommendedForYou';
export { CustomResearchCTA } from './CustomResearchCTA';
export { TrendingTopics } from './TrendingTopics';
export { TopDownloads } from './TopDownloads';
export { RecentlyViewed } from './RecentlyViewed';
export { UpcomingReports } from './UpcomingReports';
export { ResearchMethodology } from './ResearchMethodology';
export { NewsletterSignup } from './NewsletterSignup';
export { IndustrySpotlight } from './IndustrySpotlight';
export { ComparisonTable } from './ComparisonTable';
export { ReportPreview } from './ReportPreview';
export { TestimonialsRS } from './TestimonialsRS';
export { QuickAccessBar } from './QuickAccessBar';