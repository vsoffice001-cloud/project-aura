/**
 * data.ts — Sample-report viewer types + Chapter Extended TOC data
 *
 * SECTION A: SampleReportPreview types/consts (tocItems · TOCState · getChapterState)
 * SECTION B: ChapterExtendedTOC data (2-phase + 3-phase · filters · stats)
 */

// ══════════════════════════════════════════════════════════════════════
// SECTION A · Sample Report Viewer (§22 SamplePreviewSection)
// ══════════════════════════════════════════════════════════════════════

/** 3-state sidebar collapse */
export type TOCState = 'open' | 'compressed' | 'minimal';

/** Per-chapter state: past (read) · present (active) · future (upcoming) · locked (gated) */
export type ChapterState = 'past' | 'present' | 'future' | 'locked';

/** TOC entry for sidebar navigation */
export interface TOCItem {
  number: number;
  title: string;
  pages: number;
  timeMin: number;
  unlocked: boolean;
}

/** Australia Cold Chain · 10-chapter preview TOC */
export const tocItems: TOCItem[] = [
  { number: 1,  title: 'Executive Summary',           pages: 12,  timeMin: 5,  unlocked: true  },
  { number: 2,  title: 'Market Overview & Definition', pages: 18,  timeMin: 8,  unlocked: true  },
  { number: 9,  title: 'Full Table of Contents',      pages: 4,   timeMin: 2,  unlocked: true  },
  { number: 11, title: 'Research Methodology',        pages: 16,  timeMin: 7,  unlocked: true  },
  { number: 3,  title: 'Scope & Coverage',            pages: 14,  timeMin: 6,  unlocked: false },
  { number: 4,  title: 'Market Size & Growth',        pages: 28,  timeMin: 12, unlocked: false },
  { number: 5,  title: 'Submarkets',                  pages: 24,  timeMin: 10, unlocked: false },
  { number: 6,  title: 'Segment Intelligence',        pages: 32,  timeMin: 14, unlocked: false },
  { number: 7,  title: 'Competitor Landscape',        pages: 26,  timeMin: 11, unlocked: false },
  { number: 8,  title: 'Future Outlook & Scenarios',  pages: 20,  timeMin: 9,  unlocked: false },
];

/** Accessible chapters in scroll order (matches chapter IDs in DOM) */
export const accessibleChapterOrder = [1, 2, 9, 11];

/** Maps chapter number → DOM element id */
export const chapterIdMap: Record<number, string> = {
  1:  'chapter-1-summary',
  2:  'chapter-2-overview',
  9:  'chapter-9-extended',
  11: 'chapter-11-methodology',
};

/**
 * Returns visual state for a TOC item given accessibility + current reading position.
 * past = unlocked + before active · present = active · future = unlocked + after ·
 * locked = not unlocked
 */
export function getChapterState(
  chapterNumber: number,
  isAccessible: boolean,
  activeChapter: number,
): ChapterState {
  if (!isAccessible) return 'locked';
  const order = accessibleChapterOrder;
  const activeIdx = order.indexOf(activeChapter);
  const thisIdx   = order.indexOf(chapterNumber);
  if (thisIdx < activeIdx) return 'past';
  if (thisIdx === activeIdx) return 'present';
  return 'future';
}

// ══════════════════════════════════════════════════════════════════════
// SECTION B · ChapterExtendedTOC — Static data, types, constants
// ══════════════════════════════════════════════════════════════════════

/**
 * ChapterExtendedTOC — Static data, types, constants
 *
 * @what  Two phase-grouping variants over the real v0.4 PDP's 23 sections.
 *        2-phase (default · simple preview) = Market Assessment + Strategy & Outlook.
 *        3-phase (deeper · secondary) = Foundation + Competitive Intelligence + Outlook & Strategy.
 *
 * @why   Mirrors actual v0.4 PDP structure (23 sections · post §22 Sample drop).
 *        Section numbers/titles match PDP_SECTIONS in phase-2/page.tsx verbatim.
 *
 * Source: V0_lite_report-legacy chrome (canonical) · content rebuilt 2026-05-22.
 */

import { Target, TrendingUp, PieChart } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

// ── Types ──────────────────────────────────────────────

export type TocVariant = '2-phase' | '3-phase';

export interface ExtendedSubsection {
  number: string;
  title: string;
}

export interface ExtendedSection {
  number: string;
  title: string;
  expandable: boolean;
  subsections?: ExtendedSubsection[];
}

export interface ExtendedPhase {
  id: number;
  label: string;
  title: string;
  description: string;
  icon: LucideIcon;
  chapters: number;
  sections: ExtendedSection[];
}

export interface ExtendedStats {
  pages: number;
  chapters: number;
  companies: number;
  segmentations: number;
}

export interface FooterSummary {
  title: string;
  description: string;
  sections: { value: number; label: string }[];
}

export interface FilterOption {
  id: string;
  label: string;
}

// ─────────────────────────────────────────────────────────────────
// 2-PHASE VARIANT · DEFAULT PREVIEW
// Split: Market Assessment (§01-13 · 13ch) + Strategy & Outlook (§14-23 · 10ch)
// ─────────────────────────────────────────────────────────────────

export const extendedTocPhases2: ExtendedPhase[] = [
  {
    id: 1,
    label: 'PHASE 1',
    title: 'Market Assessment',
    description:
      'Foundational context · definitions · market sizing · segmentation · and demand-supply analysis. Covers Australia cold chain ecosystem · 8-state infrastructure · 6 end-user verticals · and the AUD 6,547.8 Mn 2022 base year through to the demand-supply gap diagnosis.',
    icon: Target,
    chapters: 13,
    sections: [
      { number: '1', title: 'Executive Summary', expandable: false },
      {
        number: '2',
        title: 'Scope & Coverage',
        expandable: true,
        subsections: [
          { number: '2.1', title: 'Geographic Coverage — All 8 States & Territories' },
          { number: '2.2', title: 'End-User Verticals — Meat · Seafood · Pharma · Dairy · Produce · Retail' },
          { number: '2.3', title: 'Service Types — Cold Storage vs Cold Transport' },
        ],
      },
      {
        number: '3',
        title: 'Country & Infrastructure',
        expandable: true,
        subsections: [
          { number: '3.1', title: 'Cold Chain Infrastructure Index by State' },
          { number: '3.2', title: 'Transport Corridor Analysis — Intrastate · Interstate' },
          { number: '3.3', title: 'Port & Export Cold Chain — Key Hubs' },
        ],
      },
      {
        number: '4',
        title: 'Market Overview',
        expandable: true,
        subsections: [
          { number: '4.1', title: 'Cold Chain Ecosystem Overview' },
          { number: '4.2', title: 'Market Genesis & Evolution Timeline' },
          { number: '4.3', title: 'Seasonality & Demand Patterns' },
        ],
      },
      { number: '5', title: 'Definitions', expandable: false },
      { number: '6', title: 'Taxonomy', expandable: false },
      {
        number: '7',
        title: 'Market Ecosystem',
        expandable: true,
        subsections: [
          { number: '7.1', title: 'Cold Chain Value-Chain Overview' },
          { number: '7.2', title: 'Cold Storage Operator Tiers' },
          { number: '7.3', title: 'Cold Transport Players & 3PL Landscape' },
          { number: '7.4', title: 'Industry Associations — RWTA · AFCC' },
        ],
      },
      {
        number: '8',
        title: 'Market Size & Growth (2022–2027)',
        expandable: true,
        subsections: [
          { number: '8.1', title: 'Market Size 2022 — AUD 6,547.8 Mn (Historical)' },
          { number: '8.2', title: 'Forecast 2027 — AUD 10,705 Mn at 10.03% CAGR' },
          { number: '8.3', title: 'Market Dynamics & Investment Flow' },
        ],
      },
      {
        number: '9',
        title: 'Submarkets',
        expandable: true,
        subsections: [
          { number: '9.1', title: 'Cold Storage — Revenue · Pallet Positions · Tier Analysis' },
          { number: '9.2', title: 'Cold Transport — Refrigerated Freight & Last-Mile' },
        ],
      },
      {
        number: '10',
        title: 'Segment Intelligence',
        expandable: true,
        subsections: [
          { number: '10.1', title: 'By End-User Vertical · 6 categories' },
          { number: '10.2', title: 'By Temperature · Frozen · Chiller · Ambient' },
          { number: '10.3', title: 'By Region · All 8 States & Territories' },
          { number: '10.4', title: 'By Reefer Truck Type · Small · Medium · Large' },
          { number: '10.5', title: 'By Mode · Domestic vs International' },
        ],
      },
      {
        number: '11',
        title: 'Industry Analysis',
        expandable: true,
        subsections: [
          { number: '11.1', title: 'SWOT Analysis · 4 variants' },
          { number: '11.2', title: 'Growth Drivers · Ranked' },
          { number: '11.3', title: 'Challenges & Restraints · Heatmap' },
          { number: '11.4', title: 'Industry Trends · Impact × Time-to-Mainstream' },
        ],
      },
      {
        number: '12',
        title: 'End-User Deep Dives',
        expandable: true,
        subsections: [
          { number: '12.1', title: 'Sector Profiles — Meat · Seafood · Pharma · Dairy · Produce' },
          { number: '12.2', title: 'Shelf-Life × Temperature Matrix' },
          { number: '12.3', title: 'Players & 3PL Adoption' },
        ],
      },
      { number: '13', title: 'Demand-Supply Gap Analysis', expandable: false },
    ],
  },
  {
    id: 2,
    label: 'PHASE 2',
    title: 'Strategy & Outlook',
    description:
      'Competitive landscape · regulatory pipeline · 3-scenario forecast · ranked opportunities · macro linkages · and full research methodology. Closes with FAQs · related reports · and access pathway. Covers AUD 10.7 Bn 2027 baseline · 7 prioritized opportunities · and 3 future scenarios.',
    icon: TrendingUp,
    chapters: 10,
    sections: [
      {
        number: '14',
        title: 'Competitor Landscape',
        expandable: true,
        subsections: [
          { number: '14.1', title: 'Market Concentration & HHI Analysis' },
          { number: '14.2', title: 'Top 3 Players · Linfox · Toll · Australia Post' },
          { number: '14.3', title: 'Property Comparison Matrix · HQ · Fleet · Tech Stack' },
          { number: '14.4', title: 'M&A Activity & Partnerships 2020–2024' },
        ],
      },
      {
        number: '15',
        title: 'Regulatory Landscape',
        expandable: true,
        subsections: [
          { number: '15.1', title: 'Regulator Profiles · FSANZ · TGA · DAFF · ACCC' },
          { number: '15.2', title: 'Standards Pipeline Timeline 2022–2027' },
          { number: '15.3', title: 'Compliance Cost Bands & Enforcement' },
        ],
      },
      {
        number: '16',
        title: 'Future Outlook',
        expandable: true,
        subsections: [
          { number: '16.1', title: 'Scenario A — Bear · Trade Disruption' },
          { number: '16.2', title: 'Scenario B — Base · Existing Trajectory' },
          { number: '16.3', title: 'Scenario C — Bull · Policy Catalyst + Tech' },
          { number: '16.4', title: 'Driver Matrix · Macro · Tech · Regulatory · Trade · Consumer' },
        ],
      },
      {
        number: '17',
        title: 'Opportunities',
        expandable: true,
        subsections: [
          { number: '17.1', title: 'Top 3 · Pharma 3PL · IoT SaaS · Last-Mile Reefer' },
          { number: '17.2', title: 'Regional White Spots · Perth · Darwin · Regional QLD' },
          { number: '17.3', title: 'Frozen Ready-Meal & Cross-Dock Plays' },
          { number: '17.4', title: 'Renewable-Energy Reefer · Solar · Electric' },
        ],
      },
      {
        number: '18',
        title: 'Macroeconomic Indicators',
        expandable: true,
        subsections: [
          { number: '18.1', title: 'GDP × Cold-Chain Demand Correlation' },
          { number: '18.2', title: 'CPI · Disposable Income · Trade Balance' },
          { number: '18.3', title: 'AUD/USD FX Impact on Import-Linked Cold Chain' },
        ],
      },
      {
        number: '19',
        title: 'Research Methodology',
        expandable: true,
        subsections: [
          { number: '19.1', title: 'Primary Research · 240+ Executive Interviews' },
          { number: '19.2', title: 'Secondary Research · ABS · RBA · World Bank' },
          { number: '19.3', title: 'Quantitative Modeling · Regression on 18 Variables' },
          { number: '19.4', title: 'Process Flow · Scope → Collect → Triangulate → Validate' },
        ],
      },
      { number: '20', title: 'Table of Contents (Full)', expandable: false },
      { number: '21', title: 'Frequently Asked Questions', expandable: false },
      { number: '22', title: 'Related Reports & Adjacent Research', expandable: false },
      { number: '23', title: 'Get Full Access', expandable: false },
    ],
  },
];

export const extendedTocStats2: ExtendedStats = { pages: 240, chapters: 23, companies: 20, segmentations: 5 };

export const extendedFooterSummary2: FooterSummary = {
  title: 'Complete Report Coverage',
  description:
    '200+ detailed sections across two strategic phases of the Australia cold chain market — from market sizing through go-to-market strategy.',
  sections: [
    { value: 127, label: 'Assessment Sections' },
    { value: 98, label: 'Strategy Sections' },
  ],
};

// ─────────────────────────────────────────────────────────────────
// 3-PHASE VARIANT · SECONDARY (DEEPER GROUPING)
// Split: Foundation (§01-08 · 8ch) + Intelligence (§09-15 · 7ch) + Outlook (§16-23 · 8ch)
// ─────────────────────────────────────────────────────────────────

export const extendedTocPhases3: ExtendedPhase[] = [
  {
    id: 1,
    label: 'PHASE 1',
    title: 'Market Foundation',
    description:
      'Context · scope · infrastructure · market overview · definitions · taxonomy · ecosystem · and core market sizing. Establishes the Australia cold chain landscape · AUD 6,547.8 Mn 2022 base · and ecosystem players.',
    icon: Target,
    chapters: 8,
    sections: [
      { number: '1', title: 'Executive Summary', expandable: false },
      {
        number: '2',
        title: 'Scope & Coverage',
        expandable: true,
        subsections: [
          { number: '2.1', title: 'Geographic Coverage — 8 States & Territories' },
          { number: '2.2', title: 'End-User Verticals — 6 Categories' },
          { number: '2.3', title: 'Service Types — Storage vs Transport' },
        ],
      },
      {
        number: '3',
        title: 'Country & Infrastructure',
        expandable: true,
        subsections: [
          { number: '3.1', title: 'Cold Chain Infrastructure Index by State' },
          { number: '3.2', title: 'Transport Corridor Analysis' },
          { number: '3.3', title: 'Port & Export Cold Chain Hubs' },
        ],
      },
      {
        number: '4',
        title: 'Market Overview',
        expandable: true,
        subsections: [
          { number: '4.1', title: 'Cold Chain Ecosystem Overview' },
          { number: '4.2', title: 'Market Genesis & Evolution' },
          { number: '4.3', title: 'Seasonality & Demand Patterns' },
        ],
      },
      { number: '5', title: 'Definitions', expandable: false },
      { number: '6', title: 'Taxonomy', expandable: false },
      {
        number: '7',
        title: 'Market Ecosystem',
        expandable: true,
        subsections: [
          { number: '7.1', title: 'Cold Chain Value-Chain Overview' },
          { number: '7.2', title: 'Cold Storage Operator Tiers' },
          { number: '7.3', title: 'Cold Transport & 3PL Landscape' },
          { number: '7.4', title: 'Industry Associations — RWTA · AFCC' },
        ],
      },
      {
        number: '8',
        title: 'Market Size & Growth (2022–2027)',
        expandable: true,
        subsections: [
          { number: '8.1', title: 'Market Size 2022 — AUD 6,547.8 Mn' },
          { number: '8.2', title: 'Forecast 2027 — AUD 10,705 Mn · 10.03% CAGR' },
          { number: '8.3', title: 'Market Dynamics & Investment Flow' },
        ],
      },
    ],
  },
  {
    id: 2,
    label: 'PHASE 2',
    title: 'Competitive Intelligence',
    description:
      'Submarkets · segmentation · industry analysis · end-user deep dives · demand-supply gap · competitor landscape · and regulatory environment. Profiles top 3 players · 7 prioritized opportunities · and 4 regulatory bodies.',
    icon: PieChart,
    chapters: 7,
    sections: [
      {
        number: '9',
        title: 'Submarkets',
        expandable: true,
        subsections: [
          { number: '9.1', title: 'Cold Storage — Revenue · Pallets · Tiers' },
          { number: '9.2', title: 'Cold Transport — Freight & Last-Mile' },
        ],
      },
      {
        number: '10',
        title: 'Segment Intelligence',
        expandable: true,
        subsections: [
          { number: '10.1', title: 'By End-User · 6 verticals' },
          { number: '10.2', title: 'By Temperature · 3 zones' },
          { number: '10.3', title: 'By Region · 8 states' },
          { number: '10.4', title: 'By Reefer Truck · 3 sizes' },
          { number: '10.5', title: 'By Mode · Domestic · International' },
        ],
      },
      {
        number: '11',
        title: 'Industry Analysis',
        expandable: true,
        subsections: [
          { number: '11.1', title: 'SWOT · 4 variants' },
          { number: '11.2', title: 'Drivers · Ranked' },
          { number: '11.3', title: 'Challenges · Heatmap' },
          { number: '11.4', title: 'Trends · Impact × Time' },
        ],
      },
      {
        number: '12',
        title: 'End-User Deep Dives',
        expandable: true,
        subsections: [
          { number: '12.1', title: 'Sector Profiles · 5 verticals' },
          { number: '12.2', title: 'Shelf-Life × Temperature Matrix' },
          { number: '12.3', title: 'Players & 3PL Adoption' },
        ],
      },
      { number: '13', title: 'Demand-Supply Gap Analysis', expandable: false },
      {
        number: '14',
        title: 'Competitor Landscape',
        expandable: true,
        subsections: [
          { number: '14.1', title: 'Market Concentration & HHI' },
          { number: '14.2', title: 'Top 3 Players · Bubble + Table' },
          { number: '14.3', title: 'Property Comparison Matrix' },
          { number: '14.4', title: 'M&A Activity 2020–2024' },
        ],
      },
      {
        number: '15',
        title: 'Regulatory Landscape',
        expandable: true,
        subsections: [
          { number: '15.1', title: 'Regulator Profiles · 4 bodies' },
          { number: '15.2', title: 'Standards Pipeline Timeline' },
          { number: '15.3', title: 'Compliance Cost & Enforcement' },
        ],
      },
    ],
  },
  {
    id: 3,
    label: 'PHASE 3',
    title: 'Outlook & Strategy',
    description:
      'Future outlook · prioritized opportunities · macroeconomic linkages · full methodology · and report meta (TOC · FAQ · related · access). 3-scenario forecast · 7 ranked opportunities · 5 macro indicators · 240+ primary interviews.',
    icon: TrendingUp,
    chapters: 8,
    sections: [
      {
        number: '16',
        title: 'Future Outlook',
        expandable: true,
        subsections: [
          { number: '16.1', title: 'Scenario A — Bear · Trade Disruption' },
          { number: '16.2', title: 'Scenario B — Base · Existing Trajectory' },
          { number: '16.3', title: 'Scenario C — Bull · Policy + Tech Catalyst' },
          { number: '16.4', title: 'Driver Matrix · 5 dimensions' },
        ],
      },
      {
        number: '17',
        title: 'Opportunities',
        expandable: true,
        subsections: [
          { number: '17.1', title: 'Top 3 · Pharma 3PL · IoT · Last-Mile Reefer' },
          { number: '17.2', title: 'Regional White Spots' },
          { number: '17.3', title: 'Frozen Ready-Meal & Cross-Dock' },
          { number: '17.4', title: 'Renewable-Energy Reefer' },
        ],
      },
      {
        number: '18',
        title: 'Macroeconomic Indicators',
        expandable: true,
        subsections: [
          { number: '18.1', title: 'GDP × Cold-Chain Demand' },
          { number: '18.2', title: 'CPI · Income · Trade Balance' },
          { number: '18.3', title: 'AUD/USD FX Linkages' },
        ],
      },
      {
        number: '19',
        title: 'Research Methodology',
        expandable: true,
        subsections: [
          { number: '19.1', title: '240+ Primary Interviews' },
          { number: '19.2', title: 'Secondary Sources · ABS · RBA · World Bank' },
          { number: '19.3', title: 'Quantitative Modeling' },
          { number: '19.4', title: 'Process Flow · 4 stages' },
        ],
      },
      { number: '20', title: 'Table of Contents (Full)', expandable: false },
      { number: '21', title: 'Frequently Asked Questions', expandable: false },
      { number: '22', title: 'Related Reports', expandable: false },
      { number: '23', title: 'Get Full Access', expandable: false },
    ],
  },
];

export const extendedTocStats3: ExtendedStats = { pages: 240, chapters: 23, companies: 20, segmentations: 5 };

export const extendedFooterSummary3: FooterSummary = {
  title: 'Complete Report Coverage',
  description:
    '230+ detailed sections across three strategic phases of the Australia cold chain market — from foundational sizing through competitive intelligence to forward outlook.',
  sections: [
    { value: 68, label: 'Foundation' },
    { value: 86, label: 'Intelligence' },
    { value: 76, label: 'Outlook' },
  ],
};

// ── Filter Options ─────────────────────────────────────

export const extendedFilters: FilterOption[] = [
  { id: 'all', label: 'All Chapters' },
  { id: 'phase1', label: 'Phase 1' },
  { id: 'phase2', label: 'Phase 2' },
  { id: 'phase3', label: 'Phase 3' },
];
