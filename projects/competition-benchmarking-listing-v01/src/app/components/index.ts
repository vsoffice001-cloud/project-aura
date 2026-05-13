/**
 * Ken Bold Design System — Components barrel export
 * v4.2
 *
 * Atomic Design hierarchy with barrel exports for AI-assisted page assembly.
 * Import pattern: import { ReportCard, Badge, Container } from "./components";
 *
 * ┌─────────────┬──────────────────────────────────────────────────────────────┐
 * │ Layer       │ Components                                                  │
 * ├─────────────┼──────────────────────────────────────────────────────────────┤
 * │ Atoms       │ Badge, Button, CTALink, InlineLink, Container,              │
 * │             │ FilterCheckbox, FilterChip, FilterSearchInput, Tooltip,     │
 * │             │ ViewToggle, IconBadge, CategoryListItem, AnimatedArrow,     │
 * │             │ ActiveFilterChip, SectionHeading, SectionWrapper,           │
 * │             │ FadeInSection, Card                                         │
 * ├─────────────┼──────────────────────────────────────────────────────────────┤
 * │ Molecules   │ (re-exported from ./molecules barrel)                       │
 * ├─────────────┼──────────────────────────────────────────────────────────────┤
 * │ Organisms   │ ReportCard, ReportStoreHero, FeaturedResearch,              │
 * │             │ IndustrySectorsGrid, IndustryReportSection,                 │
 * │             │ IndustrySidebar, FiltersPanel, ListingContextBanner,        │
 * │             │ ListingToolbar, CardListing,                                │
 * │             │ MobileFilterSheet, MobileFilterBar, CustomResearchCTA,      │
 * │             │ RecommendedForYou, AnalystPicks, TrendingStatistics,        │
 * │             │ DailyDataHighlights, QuickAccess, TopDownloads,             │
 * │             │ TrendingTopics, ExploreByRegion, Testimonials,              │
 * │             │ UpcomingReports, NewsletterSignup, Header, Footer           │
 * ├─────────────┼──────────────────────────────────────────────────────────────┤
 * │ Templates   │ ReportStorePage                                             │
 * ├─────────────┼──────────────────────────────────────────────────────────────┤
 * │ Hooks       │ (re-exported from ./hooks barrel)                           │
 * └─────────────┴──────────────────────────────────────────────────────────────┘
 */

/* ═══════════════════════════════════════════════════════════
   ATOMS
   ═══════════════════════════════════════════════════════════ */
export { Badge } from "./Badge";
export { Button } from "./Button";
export { CTALink } from "./CTALink";
export { InlineLink } from "./InlineLink";
export { Container } from "./Container";
export { Tooltip } from "./Tooltip";
export { ViewToggle } from "./ViewToggle";
export type { ViewMode } from "./ViewToggle";
export { IconBadge } from "./IconBadge";
export { CategoryListItem } from "./CategoryListItem";
export { AnimatedArrow } from "./AnimatedArrow";
export { FilterCheckbox } from "./FilterCheckbox";
export { FilterChip } from "./FilterChip";
export { FilterSearchInput } from "./FilterSearchInput";
export { SectionHeading } from "./SectionHeading";
export { SectionWrapper } from "./SectionWrapper";
export { FadeInSection } from "./FadeInSection";
export { Card } from "./Card";

/* ═══════════════════════════════════════════════════════════
   MOLECULES (re-export barrel)
   ═══════════════════════════════════════════════════════════ */
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
  FilterAccordion,
  SidebarPanel,
  ActiveFilterChip,
  CategoryListCard,
  LoadMoreSentinel,
} from "./molecules";

export type {
  CardMetaVariant,
  FilterAccordionVariant,
  ActiveFilterType,
  CategoryListCardItem,
  CategoryListCardProps,
  LoadMoreSentinelProps,
} from "./molecules";

/* ═══════════════════════════════════════════════════════════
   ORGANISMS
   ═══════════════════════════════════════════════════════════ */
export { ReportCard } from "./ReportCard";
export type { ReportCardData, ReportCardVariant } from "./ReportCard";
export { ReportStoreHero } from "./ReportStoreHero";
export { FeaturedResearch } from "./FeaturedResearch";
export { IndustrySectorsGrid } from "./IndustrySectorsGrid";
export { IndustryReportSection } from "./IndustryReportSection";
export { IndustrySidebar } from "./IndustrySidebar";
export { FiltersPanel } from "./FiltersPanel";
export { ListingContextBanner } from "./ListingContextBanner";
export { ListingToolbar } from "./ListingToolbar";
export type { ListingToolbarProps } from "./ListingToolbar";
export { CardListing } from "./CardListing";
export type { CardListingProps } from "./CardListing";
export { MobileFilterSheet } from "./MobileFilterSheet";
export { MobileFilterBar } from "./MobileFilterBar";
export { CustomResearchCTA } from "./CustomResearchCTA";
export { RecommendedForYou } from "./RecommendedForYou";
export { AnalystPicks } from "./AnalystPicks";
export { TrendingStatistics } from "./TrendingStatistics";
export { DailyDataHighlights } from "./DailyDataHighlights";
export { QuickAccess } from "./QuickAccess";
export { TopDownloads } from "./TopDownloads";
export { TrendingTopics } from "./TrendingTopics";
export { ExploreByRegion } from "./ExploreByRegion";
export { Testimonials } from "./Testimonials";
export { UpcomingReports } from "./UpcomingReports";
export { NewsletterSignup } from "./NewsletterSignup";
export { Header } from "./Header";
export { Footer } from "./Footer";

/* ═══════════════════════════════════════════════════════════
   TEMPLATES
   ═══════════════════════════════════════════════════════════ */
export { ReportStorePage } from "./ReportStorePage";

/* ═══════════════════════════════════════════════════════════
   HOOKS (re-export barrel)
   ═══════════════════════════════════════════════════════════ */
export {
  useReportFilters,
  useProgressiveLoad,
  useCrossfade,
  useMountTransition,
} from "./hooks";

/* ═══════════════════════════════════════════════════════════
   DATA & UTILITIES
   ═══════════════════════════════════════════════════════════ */
export { iconColors } from "./iconColors";
export { industryIconMap } from "./industryIconMap";