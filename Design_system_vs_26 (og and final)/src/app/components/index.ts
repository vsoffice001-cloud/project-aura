/**
 * VS Design System - Component Library Exports
 * 
 * Centralized export file for all design system components.
 * Import components using: import { Button, CTALink, InlineLink } from '@/app/components'
 */

// 🎯 CORE INTERACTIVE COMPONENTS (Link & CTA System)
export { Button } from './Button';
export type { ButtonVariant, ButtonSize, ButtonBackground } from './Button';

export { CTALink } from './CTALink';
export type { CTALinkVariant, CTALinkSize } from './CTALink';

export { InlineLink } from './InlineLink';

// Animation Components
export { AnimatedArrow } from './AnimatedArrow';

// 🏷️ BADGE & LABEL SYSTEM
// Badge.tsx: Unified component for Badges, Section Labels, and Chapter Labels
export { Badge, SectionLabel } from './Badge';
export type { BadgeVariant, BadgeSize, BadgeTheme, BadgeMode, BadgeProps } from './Badge';
// Convenience wrappers (pre-configured Badge patterns)
export { StepPill, ObjectivePill, ObjectivePillInteractive } from './Badge';
export { InfoCardLabel, CategoryBadge, StatusBadge, InfoBadge, MutedBadge, ClickableBadge } from './Badge';
export { BADGE_TOKENS } from './Badge';

// Label.tsx: Semantic <label> for forms (NOT for section headers)
export { Label } from './Label';
export type { LabelVariant } from './Label';

// 💡 ATOMS (v4.0 — Report Store)
export { Tooltip } from './Tooltip';
export { ViewToggle } from './ViewToggle';
export type { ViewMode } from './ViewToggle';
export { FadeInSection } from './FadeInSection';

// 🧱 MOLECULES (v4.0 — Report Store)
export {
  IndustryBadge,
  CardMetaRow,
  CardFooterRow,
  ReportGridCard,
  HorizontalScroll,
  ScrollFade,
  AnalystPickCardB,
  StatCard,
  DataHighlightCard,
  EmptyState,
  BackToTop,
  SkeletonCard,
  CardReveal,
  RevealImage,
} from './molecules';
export type { CardMetaVariant } from './molecules';

// Demo/Testing Components
export { LinkSystemDemo } from './LinkSystemDemo';
export { ButtonDocumentation } from './ButtonDocumentation';
export { AnimatedArrowDemo } from './AnimatedArrowDemo';
export { ShimmerDemo } from './ShimmerDemo';

// Layout Components
export { Container } from './Container';
export { Navbar } from './Navbar';
export { DesignSystemDashboard } from './DesignSystemDashboard';

// Resource System Components
export { ResourceCard } from './ResourceCard';
export { SubtleVariantSwitcher } from './SubtleVariantSwitcher';

// Case Study Section Components (Organisms)
export { HeroSection } from './HeroSection';
export { ClientContextSection } from './ClientContextSection';
export { ChallengesSection } from './ChallengesSection';
export { EngagementObjectivesSection } from './EngagementObjectivesSection';
export { MethodologySection } from './MethodologySection';
export { ImpactSection } from './ImpactSection';
export { ValuePillarsSection } from './ValuePillarsSection';
export { TestimonialSection } from './TestimonialSection';
export { ResourcesSection } from './ResourcesSection';
export { FinalCTASection } from './FinalCTASection';
export { NextSectionCTA } from './NextSectionCTA';

// Content Components — Foundations
export {
  DocSection,
  ColorsContent,
  TypographyContent,
  SpacingContent,
  LayoutGridContent,
  ElevationContent,
  BorderRadiusContent
} from './FoundationsContent';
// Re-exported "All Tokens" pages (originally from their own files, barrel-exported via FoundationsContent)
export {
  AllColorsPaletteContent,
  AllTypographyTokensContent,
  AllSpacingTokensContent,
  AllLayoutGridTokensContent,
  AllElevationTokensContent,
  AllBorderRadiusTokensContent
} from './FoundationsContent';

// Content Components — Components
export {
  FormInputsContent,
  CardsContent,
  NavigationContent,
  FeedbackContent,
  IconsContent
} from './ComponentsContent';
// Re-exported documentation pages (originally from their own files, barrel-exported via ComponentsContent)
export {
  ButtonDocumentation as ButtonDocumentationPage,
  LinksDocumentation as LinksDocumentationPage,
  BadgeLabelsDocumentation as BadgeLabelsDocumentationPage
} from './ComponentsContent';

// Content Components — Patterns
export {
  PageLayoutsContent,
  ContentPatternsContent,
  BackgroundsContent
} from './PatternsContent';

// Content Components — Motion
export {
  MotionPrinciplesContent,
  DurationScaleContent,
  TransitionsContent,
  MicroInteractionsContent
} from './MotionContent';

// Content Components — Guidelines
export {
  AccessibilityContent,
  ResponsiveDesignContent,
  BestPracticesContent
} from './GuidelinesContent';

// Content Components — Resources
export {
  DownloadsContent,
  CodeSnippetsContent,
  DesignTokensContent
} from './ResourcesContent';

// Utility Components
export { CodeBlockWithCopy } from './CodeBlockWithCopy';
export { CollapsibleSection } from './CollapsibleSection';
export { VariantSwitcher } from './VariantSwitcher';
export { ReadingProgressBar } from './ReadingProgressBar';
export { TableOfContents } from './TableOfContents';

// 📐 LAYOUT & SECTION COMPONENTS (v3.3, evolved v4.0)
export { SectionHeading } from './SectionHeading';
export { SectionWrapper } from './SectionWrapper';
export { Card } from './Card';
export type { CardVariant, CardPadding, CardShadow } from './Card';

// ⬆️ SCROLL COMPONENTS (v3.3)
export { ScrollToTop } from './ScrollToTop';
export { ScrollProgress } from './ScrollProgress';

// 🎨 ICON COLOR SYSTEM (v3.3)
export { iconColors, getIconColor } from './iconColors';
export type { IconColorType } from './iconColors';

// Modal/Overlay Components
export { ContactModal } from './ContactModal';
export { StickyCTA } from './StickyCTA';

// 📦 DATA & UTILITIES (v4.3 — Report Store)
export type {
  ReportItem, IndustryData, RegionData, StatData,
  DataHighlight, AnalystPick, SectorItem, SortKey, SortOption,
} from './data';
export {
  REPORT_IMAGES, FEATURED_REPORTS, RECOMMENDED_REPORTS, ALL_REPORTS,
  STAT_DATA, DATA_HIGHLIGHTS, ANALYST_PICKS, SECTORS,
  FULL_INDUSTRIES, TAGS_BY_INDUSTRY, FULL_REGIONS,
  PUBLISH_YEARS, FORMATS, TOTAL_REPORTS_IN_CATALOG, PAGE_SIZE,
  SORT_OPTIONS, HERO_CONFIG, CTA_CONFIG,
} from './data';
export { industryIconMap, getIndustryIcon } from './industryIconMap';

// 🧩 REPORT STORE ATOMS (v4.3)
export { IconBadge } from './IconBadge';
export { CategoryListItem } from './CategoryListItem';

// 🏗️ REPORT STORE ORGANISMS (v4.3)
export {
  ReportStoreHero,
  FeaturedResearch,
  ListingToolbar,
  CardListing,
  FiltersPanel,
  IndustrySidebar,
  DailyDataHighlights,
  AnalystPicks,
  IndustrySectorsGrid,
  KeyMarketIndicators,
  RecommendedForYou,
  CustomResearchCTA,
  TrendingTopics,
  TopDownloads,
  RecentlyViewed,
  UpcomingReports,
  ResearchMethodology,
  NewsletterSignup,
  IndustrySpotlight,
  ComparisonTable,
  ReportPreview,
  TestimonialsRS,
  QuickAccessBar,
} from './organisms';

// 📄 REPORT STORE TEMPLATE (v4.3)
export { ReportStorePage } from './ReportStorePage';

// 🔧 FILTER ATOMS (v4.2-4.3)
export { FilterCheckbox } from './FilterCheckbox';
export { FilterChip } from './FilterChip';
export { FilterSearchInput } from './FilterSearchInput';
export { FilterSectionHeader } from './FilterSectionHeader';
export { FilterCheckboxItem } from './FilterCheckboxItem';
export { FilterIndustryItem } from './FilterIndustryItem';