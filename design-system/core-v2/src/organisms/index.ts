// Organisms barrel — populated in Phase C/D (report-store + V0.2_report ports)

// Navbar — promoted from topnav-v32 (Phase C step 4b-d, 2026-05-08)
export type { NavUser, AuthPopoverConfig, NavItemConfig, MegaMenuEntry } from './navbar/types';
export { TopNavigation, type TopNavigationProps } from './navbar/TopNavigation';
export { PrimaryNav, type PrimaryNavProps } from './navbar/PrimaryNav';
export { SecondaryBar, type SecondaryBarProps } from './navbar/SecondaryBar';
export { DesktopNavItems, type DesktopNavItemsProps } from './navbar/DesktopNavItems';
export { MobileControls, type MobileControlsProps } from './navbar/MobileControls';
export { TabletControls, type TabletControlsProps } from './navbar/TabletControls';
export { AuthPopover, type AuthPopoverProps } from './navbar/AuthPopover';

// Promoted from Design_system_vs_26 OG (DS Port Batch 7, 2026-05-13 · self-contained organisms)
export { BrowseGrid } from './BrowseGrid';
export { CTABanner } from './CTABanner';
export { ComparisonTable } from './ComparisonTable';
export { FeaturedCarousel } from './FeaturedCarousel';
export { IndustryFocusBanner } from './IndustryFocusBanner';
export { NewsletterSignup } from './NewsletterSignup';
export { ProductHero } from './ProductHero';
export { ProductPageTemplate } from './ProductPageTemplate';
export { QuickAccessBar } from './QuickAccessBar';
export { ResearchMethodology } from './ResearchMethodology';
export { StatsRow } from './StatsRow';
export { TestimonialsRS } from './TestimonialsRS';
export { TopDownloads } from './TopDownloads';
export { TrendingTopics } from './TrendingTopics';
export { UpcomingReports } from './UpcomingReports';

// Promoted from Design_system_vs_26 OG (DS Port Phase 2, 2026-05-13 · case-study sections w/ hooks lifted)
export { HeroSection } from './HeroSection';
export { ChallengesSection } from './ChallengesSection';
export { MethodologySection } from './MethodologySection';
export { ImpactSection } from './ImpactSection';
export { ResourcesSection } from './ResourcesSection';
export { ClientContextSection } from './ClientContextSection';
export { EngagementObjectivesSection } from './EngagementObjectivesSection';
export { TestimonialSection } from './TestimonialSection';
export { ValuePillarsSection } from './ValuePillarsSection';
export { FinalCTASection } from './FinalCTASection';
export { CaseStudyNavbar } from './CaseStudyNavbar';
export { ReadingProgressBar } from './ReadingProgressBar';
export { StickyCTA } from './StickyCTA';

// Promoted from Design_system_vs_26 OG (DS Port Phase 3, 2026-05-13 · adapter pattern — data via props)
export { AnalystPicks, type AnalystPicksProps } from './AnalystPicks';
export { CardListing, type CardListingProps } from './CardListing';
export { CustomResearchCTA, type CustomResearchCTAProps } from './CustomResearchCTA';
export { DailyDataHighlights, type DailyDataHighlightsProps } from './DailyDataHighlights';
export { FeaturedResearch, type FeaturedResearchProps } from './FeaturedResearch';
export { FiltersPanel, type FiltersPanelProps } from './FiltersPanel';
export { IndustrySectorsGrid, type IndustrySectorsGridProps } from './IndustrySectorsGrid';
export { IndustrySidebar, type IndustrySidebarProps } from './IndustrySidebar';
export { IndustrySpotlight, type IndustrySpotlightProps, type SpotlightStat } from './IndustrySpotlight';
export { KeyMarketIndicators, type KeyMarketIndicatorsProps } from './KeyMarketIndicators';
export { ListingToolbar, type ListingToolbarProps } from './ListingToolbar';
export { RecentlyViewed, type RecentlyViewedProps } from './RecentlyViewed';
export { RecommendedForYou, type RecommendedForYouProps } from './RecommendedForYou';
export { ReportPreview, type ReportPreviewProps } from './ReportPreview';
export { ReportStoreHero, type ReportStoreHeroProps } from './ReportStoreHero';
