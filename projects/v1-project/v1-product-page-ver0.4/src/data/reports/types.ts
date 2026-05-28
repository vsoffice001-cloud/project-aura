/**
 * Report Data Types — v0.4 multi-report architecture
 *
 * @what  Type definitions for the 3-variant report data system.
 *        Each ReportData instance controls which sections render + top-level meta.
 *        Per-section `null` = section not available → auto-hidden (no placeholder).
 *
 * @why   v0.4 was single-report hardcoded. Sprint G.12 Task 4 adds 2 more report
 *        archetypes (India Pharma · SE Asia Q-Commerce) with different section
 *        availability → needs data-gated conditional rendering.
 *
 * @when  Consumed by phase-2/page.tsx via useSearchParams report switcher.
 *        Sections themselves still own their visual data internally (backlog:
 *        per-section full data extraction → future sprint).
 *
 * @how   Two-tier: meta (top-level hero fields · switcher UI) + sections map
 *        (section presence/absence + override props where sections accept them).
 *        Sections that don't accept props are toggled on/off only.
 *
 * // TODO: replace w/ API call to /api/reports/:id once Django backend ships
 */

import type { LucideIcon } from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// Hero stat shape (matches ReportHeroV04Props)
// ─────────────────────────────────────────────────────────────────────────────

export interface HeroStat {
  /** Lucide icon component — must be a LucideIcon (ForwardRefExoticComponent) */
  icon: LucideIcon;
  value: string;
  label: string;
}

export interface ReportHeroData {
  eyebrow: string;
  title: string;
  promise: string;
  stats: [HeroStat, HeroStat, HeroStat];
  breadcrumb?: Array<{ label: string; href: string }>;
}

// ─────────────────────────────────────────────────────────────────────────────
// TOC item override (allows per-report section label customisation)
// ─────────────────────────────────────────────────────────────────────────────

export interface TocItemOverride {
  /** Section DOM id — must match BODY_SECTIONS id list */
  id: string;
  number: string;
  title: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Section availability map
// null  = section not applicable for this report → hidden, no gap
// true  = section present with hardcoded section-internal data
// object = section present + override props (only for sections that accept props)
// ─────────────────────────────────────────────────────────────────────────────

export type SectionPresence = true | null;

export interface SectionAvailabilityMap {
  executiveSummary: SectionPresence;
  scope: SectionPresence;
  countryInfra: SectionPresence;
  marketOverview: SectionPresence;
  definitions: SectionPresence;
  taxonomy: SectionPresence;
  ecosystem: SectionPresence;
  marketSize: SectionPresence;
  submarkets: SectionPresence;
  segmentation: SectionPresence;
  industry: SectionPresence;
  endUser: SectionPresence;
  dsGap: SectionPresence;
  competitor: SectionPresence;
  regulatory: SectionPresence;
  futureOutlook: SectionPresence;
  opportunities: SectionPresence;
  macro: SectionPresence;
  methodology: SectionPresence;
  toc: SectionPresence;
  faq: SectionPresence;
  // §22-§24 full-width escape sections
  reportPreview: SectionPresence;
  relatedReports: SectionPresence;
  getFullAccess: SectionPresence;
}

// ─────────────────────────────────────────────────────────────────────────────
// Report metadata
// ─────────────────────────────────────────────────────────────────────────────

export interface ReportMeta {
  /** URL slug used in ?report= query param */
  id: string;
  title: string;
  industry: string;
  region: string;
  fiscalYear: string;
  /** Short label for variant switcher chip */
  chipLabel: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Root report data type
// ─────────────────────────────────────────────────────────────────────────────

export interface ReportData {
  meta: ReportMeta;
  hero: ReportHeroData;
  /** Section availability — null = hidden, true = render w/ section-internal data */
  sections: SectionAvailabilityMap;
  /** Optional per-report TOC overrides. If absent, uses BODY_SECTIONS default. */
  tocOverrides?: TocItemOverride[];
}
