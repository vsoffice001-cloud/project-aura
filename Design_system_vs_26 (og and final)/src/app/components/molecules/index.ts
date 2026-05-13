/**
 * Molecules barrel export (v4.3)
 *
 * Atomic Design hierarchy:
 * - Atoms:      Badge, Button, CTALink, InlineLink, Container, Tooltip, ViewToggle,
 *               FadeInSection, FilterCheckbox, FilterChip, FilterSearchInput
 * - Molecules:  IndustryBadge, CardMetaRow, CardFooterRow, ReportCard, HorizontalScroll,
 *               FilterAccordion, SidebarPanel, ActiveFilterChipBar, etc.
 * - Organisms:  Section components (HomeSectionsA/B/C, IndustryReportSection)
 * - Templates:  Page layouts
 * - Pages:      App.tsx
 */
export { IndustryBadge } from "./IndustryBadge";
export { CardMetaRow } from "./CardMetaRow";
export type { CardMetaVariant } from "./CardMetaRow";
export { CardFooterRow } from "./CardFooterRow";
export { ReportCard } from "./ReportCard";
export type { ReportCardLayout, ReportCardProps } from "./ReportCard";
/** @deprecated Use ReportCard with layout="grid" | "list" instead */
export { ReportGridCard } from "./ReportGridCard";
export { HorizontalScroll } from "./HorizontalScroll";
export { ScrollFade } from "./ScrollFade";
export { AnalystPickCardB } from "./AnalystPickCardB";
export { StatCard } from "./StatCard";
export { DataHighlightCard } from "./DataHighlightCard";
export { EmptyState } from "./EmptyState";
export { BackToTop } from "./BackToTop";
export { SkeletonCard } from "./SkeletonCard";
export { CardReveal } from "./CardReveal";
export { RevealImage } from "./RevealImage";

// ── Surveys pillar molecules (v4.2) ──────────────────────
export { CompletionBadge } from "./CompletionBadge";
export { SurveyCard } from "./SurveyCard";
export type { SurveyCardLayout, SurveyCardProps } from "./SurveyCard";
export { ResponseChart } from "./ResponseChart";
export { QuestionPreview } from "./QuestionPreview";
export type { QuestionType, QuestionPreviewProps } from "./QuestionPreview";
export { SurveySkeleton } from "./SurveySkeleton";

// ── Filter system molecules (v4.2 extraction) ───────────
export { FilterAccordion } from "./FilterAccordion";
export { SidebarPanel } from "./SidebarPanel";
export { ActiveFilterChipBar } from "./ActiveFilterChip";
export { MobileFilterSheet } from "./MobileFilterSheet";

// ── v4.3 additions ──────────────────────────────────────
export { CategoryListCard } from "./CategoryListCard";
export { LoadMoreSentinel } from "./LoadMoreSentinel";