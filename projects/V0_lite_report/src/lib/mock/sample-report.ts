/**
 * SampleReportPreview — Static data, types, and constants
 *
 * Extracted from the ~1028-line monolith as part of Tier 4 decomposition.
 * Contains all chapter data, TOC items, Extended TOC phases/filters,
 * and helper functions used by the sub-components.
 *
 * This file has NO React dependencies — pure data and types only.
 */

import { Target, TrendingUp, PieChart } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

// ── Types ──────────────────────────────────────────────

export type TOCState = 'open' | 'compressed' | 'minimal';
export type TocVariant = '2-phase' | '3-phase';
export type ChapterState = 'past' | 'present' | 'future' | 'locked';

export interface TOCItem {
  number: number;
  title: string;
  pages: string;
  time: string;
  unlocked: boolean;
  isLink?: boolean;
}

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

// ── Sidebar TOC Items ──────────────────────────────────

export const tocItems: TOCItem[] = [
  { number: 1, title: 'Executive Summary', pages: '1-5', time: '4m', unlocked: true },
  { number: 2, title: 'Market Overview & Definition', pages: '6-15', time: '8m', unlocked: true },
  { number: 3, title: 'AI Technology Landscape', pages: '16-30', time: '12m', unlocked: false },
  { number: 4, title: 'Market Size & Forecast', pages: '31-55', time: '18m', unlocked: false },
  { number: 5, title: 'Application Segmentation', pages: '56-85', time: '22m', unlocked: false },
  { number: 6, title: 'Competitive Landscape', pages: '86-110', time: '20m', unlocked: false },
  { number: 9, title: 'Extended Report Structure', pages: '—', time: '—', unlocked: false, isLink: true },
  { number: 11, title: 'Our Approach', pages: '—', time: '—', unlocked: false, isLink: true },
  { number: 7, title: 'Company Profiles', pages: '111-150', time: '28m', unlocked: false },
  { number: 8, title: 'Future Outlook & Opportunities', pages: '151-165', time: '12m', unlocked: false },
];

// Accessible chapters in page order (for past/present/future state logic)
export const accessibleChapterOrder = [1, 2, 9, 11];

// Chapter ID mapping for scroll navigation
export const chapterIdMap: Record<number, string> = {
  1: 'chapter-1-summary',
  2: 'chapter-2-overview',
  9: 'chapter-9-extended',
  11: 'chapter-11-methodology',
};

export function getChapterState(
  itemNumber: number,
  isAccessible: boolean,
  activeChapter: number
): ChapterState {
  if (!isAccessible) return 'locked';
  if (itemNumber === activeChapter) return 'present';
  const activeIndex = accessibleChapterOrder.indexOf(activeChapter);
  const itemIndex = accessibleChapterOrder.indexOf(itemNumber);
  if (itemIndex < activeIndex) return 'past';
  return 'future';
}

// ── Extended TOC Data ──────────────────────────────────

export const extendedTocPhases2: ExtendedPhase[] = [
  {
    id: 1,
    label: 'PHASE 1',
    title: 'Market Assessment Phase',
    description: 'Comprehensive market overview, AI technology landscape, segmentation, competitive analysis, and application-level deep-dives',
    icon: Target,
    chapters: 11,
    sections: [
      { number: '1', title: 'Executive Summary', expandable: false },
      {
        number: '2',
        title: 'AI in Healthcare Market Overview',
        expandable: true,
        subsections: [
          { number: '2.1', title: 'Key Insights and Strategic Recommendations' },
          { number: '2.2', title: 'Global AI in Healthcare Market Overview' },
          { number: '2.3', title: 'Definition, Scope & Taxonomy' },
          { number: '2.4', title: 'Evolution of AI in Healthcare Ecosystem' },
          { number: '2.5', title: 'Regulatory Framework Analysis (FDA, EMA, NMPA)' },
          { number: '2.6', title: 'Market Drivers and Growth Factors' },
          { number: '2.7', title: 'Market Challenges and Restraints' },
        ],
      },
      {
        number: '3',
        title: 'AI in Healthcare Market Analysis',
        expandable: true,
        subsections: [
          { number: '3.1', title: 'Market Size and Forecast (2024-2030)' },
          { number: '3.2', title: 'Historical Growth Analysis (2019-2024)' },
          { number: '3.3', title: 'Market Dynamics, Trends & Investment Flow' },
        ],
      },
      {
        number: '4',
        title: 'Technology Segmentation (ML, NLP, Computer Vision, Gen AI)',
        expandable: true,
        subsections: [
          { number: '4.1', title: 'Machine Learning & Deep Learning Applications' },
          { number: '4.2', title: 'Natural Language Processing in Clinical Settings' },
          { number: '4.3', title: 'Computer Vision for Medical Imaging' },
          { number: '4.4', title: 'Generative AI in Drug Discovery & Documentation' },
          { number: '4.5', title: 'Technology Convergence & Hybrid Models' },
        ],
      },
      {
        number: '5',
        title: 'Application Segmentation (Drug Discovery, Diagnostics, Precision Medicine)',
        expandable: true,
        subsections: [
          { number: '5.1', title: 'AI-Driven Drug Discovery & Development' },
          { number: '5.2', title: 'Diagnostic Imaging & Pathology' },
          { number: '5.3', title: 'Precision Medicine & Genomics' },
          { number: '5.4', title: 'Clinical Trial Optimization' },
          { number: '5.5', title: 'Remote Patient Monitoring & Telehealth' },
        ],
      },
      {
        number: '6',
        title: 'Regional Market Analysis (50+ Countries)',
        expandable: true,
        subsections: [
          { number: '6.1', title: 'North America (US, Canada)' },
          { number: '6.2', title: 'Europe (UK, Germany, France, Nordics)' },
          { number: '6.3', title: 'Asia-Pacific (China, Japan, India, Australia)' },
          { number: '6.4', title: 'Middle East & Africa' },
          { number: '6.5', title: 'Latin America' },
        ],
      },
      {
        number: '7',
        title: 'Competitive Landscape & Market Share',
        expandable: true,
        subsections: [
          { number: '7.1', title: 'Market Concentration & Herfindahl Index' },
          { number: '7.2', title: 'Strategic Group Mapping' },
          { number: '7.3', title: 'M&A Activity & Partnership Analysis' },
          { number: '7.4', title: 'Startup Ecosystem & Venture Funding' },
        ],
      },
      { number: '8', title: 'Key Company Profiles (200+ Players)', expandable: false },
      { number: '9', title: 'End-User Analysis (Hospitals, Pharma, Payers)', expandable: false },
      { number: '10', title: 'Pricing & Deployment Model Analysis', expandable: false },
      { number: '11', title: 'SWOT & Porter\'s Five Forces', expandable: false },
    ],
  },
  {
    id: 2,
    label: 'PHASE 2',
    title: 'Go-To-Market Strategy Phase',
    description: 'Strategic recommendations, market entry frameworks, investment analysis, and actionable roadmap for AI healthcare stakeholders',
    icon: TrendingUp,
    chapters: 15,
    sections: [
      {
        number: '12',
        title: 'Market Entry Strategies by Region',
        expandable: true,
        subsections: [
          { number: '12.1', title: 'Greenfield vs. Partnership Entry Models' },
          { number: '12.2', title: 'Regulatory Fast-Track Pathways by Region' },
          { number: '12.3', title: 'Local Payor & Reimbursement Navigation' },
        ],
      },
      {
        number: '13',
        title: 'Investment & Funding Landscape',
        expandable: true,
        subsections: [
          { number: '13.1', title: 'Venture Capital & Private Equity Trends' },
          { number: '13.2', title: 'Public Market Activity & IPO Pipeline' },
          { number: '13.3', title: 'Government Grants & Research Funding' },
          { number: '13.4', title: 'Corporate Venture Arms & Strategic Investors' },
        ],
      },
      {
        number: '14',
        title: 'Risk Assessment & Regulatory Mitigation',
        expandable: true,
        subsections: [
          { number: '14.1', title: 'FDA AI/ML Regulatory Framework (SaMD)' },
          { number: '14.2', title: 'EU AI Act Compliance Requirements' },
          { number: '14.3', title: 'Data Privacy & HIPAA Considerations' },
          { number: '14.4', title: 'Clinical Validation & Evidence Standards' },
        ],
      },
      { number: '15', title: 'Future Market Outlook (2025-2030)', expandable: false },
      { number: '16', title: 'Strategic Recommendations for Stakeholders', expandable: false },
      {
        number: '17',
        title: 'Implementation Roadmap & Timeline',
        expandable: true,
        subsections: [
          { number: '17.1', title: 'Phase-Gate Implementation Framework' },
          { number: '17.2', title: 'Technology Stack Selection Criteria' },
          { number: '17.3', title: 'Change Management & Clinician Training' },
          { number: '17.4', title: 'ROI Milestones & Success Benchmarks' },
        ],
      },
      { number: '18', title: 'Success Metrics & KPIs', expandable: false },
      { number: '19', title: 'Partnership & Ecosystem Opportunities', expandable: false },
      { number: '20', title: 'AI/ML Technology Integration Playbook', expandable: false },
      { number: '21', title: 'Ethical AI & Data Governance Considerations', expandable: false },
      { number: '22', title: 'Clinician & Patient Adoption Insights', expandable: false },
      { number: '23', title: 'Go-To-Market & Commercialization Strategy', expandable: false },
      { number: '24', title: 'Sales Channel & Distribution Optimization', expandable: false },
      { number: '25', title: 'Conclusion & Key Takeaways', expandable: false },
      { number: '26', title: 'Appendix & Data Tables', expandable: false },
    ],
  },
];

export const extendedTocStats2: ExtendedStats = { pages: 165, chapters: 26, companies: 200, segmentations: 7 };

export const extendedFooterSummary2: FooterSummary = {
  title: 'Complete Report Coverage',
  description: '200+ detailed sections across two strategic phases of the global AI in healthcare market',
  sections: [
    { value: 142, label: 'Assessment' },
    { value: 108, label: 'Strategy Sections' },
  ],
};

export const extendedTocPhases3: ExtendedPhase[] = [
  {
    id: 1,
    label: 'PHASE 1',
    title: 'Market Foundation',
    description: 'Core market overview, AI technology landscape, and comprehensive market sizing with historical and forecast analysis',
    icon: Target,
    chapters: 6,
    sections: [
      { number: '1', title: 'Executive Summary', expandable: false },
      {
        number: '2',
        title: 'AI in Healthcare Market Overview',
        expandable: true,
        subsections: [
          { number: '2.1', title: 'Key Insights and Strategic Recommendations' },
          { number: '2.2', title: 'Global AI in Healthcare Market Overview' },
          { number: '2.3', title: 'Definition, Scope & Taxonomy' },
          { number: '2.4', title: 'Evolution of AI in Healthcare Ecosystem' },
          { number: '2.5', title: 'Regulatory Framework Analysis (FDA, EMA, NMPA)' },
        ],
      },
      {
        number: '3',
        title: 'Market Analysis & Forecast',
        expandable: true,
        subsections: [
          { number: '3.1', title: 'Market Size and Forecast (2024-2030)' },
          { number: '3.2', title: 'Historical Growth Analysis (2019-2024)' },
          { number: '3.3', title: 'Market Dynamics, Trends & Investment Flow' },
        ],
      },
      {
        number: '4',
        title: 'Technology Segmentation (ML, NLP, Computer Vision, Gen AI)',
        expandable: true,
        subsections: [
          { number: '4.1', title: 'Machine Learning & Deep Learning Applications' },
          { number: '4.2', title: 'Natural Language Processing in Clinical Settings' },
          { number: '4.3', title: 'Computer Vision for Medical Imaging' },
          { number: '4.4', title: 'Generative AI in Drug Discovery & Documentation' },
        ],
      },
      {
        number: '5',
        title: 'Application Segmentation (Drug Discovery, Diagnostics)',
        expandable: true,
        subsections: [
          { number: '5.1', title: 'AI-Driven Drug Discovery & Development' },
          { number: '5.2', title: 'Diagnostic Imaging & Pathology' },
          { number: '5.3', title: 'Precision Medicine & Genomics' },
        ],
      },
      {
        number: '6',
        title: 'Regional Market Analysis (50+ Countries)',
        expandable: true,
        subsections: [
          { number: '6.1', title: 'North America (US, Canada)' },
          { number: '6.2', title: 'Europe (UK, Germany, France, Nordics)' },
          { number: '6.3', title: 'Asia-Pacific (China, Japan, India, Australia)' },
          { number: '6.4', title: 'Middle East, Africa & Latin America' },
        ],
      },
    ],
  },
  {
    id: 2,
    label: 'PHASE 2',
    title: 'Competitive Intelligence',
    description: 'Deep-dive into competitive landscape, company profiles, end-user analysis, and strategic positioning frameworks',
    icon: PieChart,
    chapters: 5,
    sections: [
      {
        number: '7',
        title: 'Competitive Landscape & Market Share',
        expandable: true,
        subsections: [
          { number: '7.1', title: 'Market Concentration & Herfindahl Index' },
          { number: '7.2', title: 'Strategic Group Mapping' },
          { number: '7.3', title: 'M&A Activity & Partnership Analysis' },
        ],
      },
      { number: '8', title: 'Key Company Profiles (200+ Players)', expandable: false },
      {
        number: '9',
        title: 'End-User Analysis (Hospitals, Pharma, Payers)',
        expandable: true,
        subsections: [
          { number: '9.1', title: 'Hospital Systems & IDN Adoption Patterns' },
          { number: '9.2', title: 'Pharmaceutical & Biotech Use Cases' },
          { number: '9.3', title: 'Payer & Insurance AI Integration' },
        ],
      },
      { number: '10', title: 'Pricing & Deployment Model Analysis', expandable: false },
      { number: '11', title: 'SWOT & Porter\'s Five Forces', expandable: false },
    ],
  },
  {
    id: 3,
    label: 'PHASE 3',
    title: 'Go-To-Market Strategy',
    description: 'Actionable market entry strategies, investment landscape, implementation roadmap, and commercialization playbook',
    icon: TrendingUp,
    chapters: 15,
    sections: [
      {
        number: '12',
        title: 'Market Entry Strategies by Region',
        expandable: true,
        subsections: [
          { number: '12.1', title: 'Greenfield vs. Partnership Entry Models' },
          { number: '12.2', title: 'Regulatory Fast-Track Pathways by Region' },
          { number: '12.3', title: 'Local Payor & Reimbursement Navigation' },
        ],
      },
      {
        number: '13',
        title: 'Investment & Funding Landscape',
        expandable: true,
        subsections: [
          { number: '13.1', title: 'Venture Capital & Private Equity Trends' },
          { number: '13.2', title: 'Public Market Activity & IPO Pipeline' },
          { number: '13.3', title: 'Government Grants & Research Funding' },
        ],
      },
      {
        number: '14',
        title: 'Risk Assessment & Regulatory Mitigation',
        expandable: true,
        subsections: [
          { number: '14.1', title: 'FDA AI/ML Regulatory Framework (SaMD)' },
          { number: '14.2', title: 'EU AI Act Compliance Requirements' },
          { number: '14.3', title: 'Data Privacy & HIPAA Considerations' },
        ],
      },
      { number: '15', title: 'Future Market Outlook (2025-2030)', expandable: false },
      { number: '16', title: 'Strategic Recommendations', expandable: false },
      {
        number: '17',
        title: 'Implementation Roadmap & Timeline',
        expandable: true,
        subsections: [
          { number: '17.1', title: 'Phase-Gate Implementation Framework' },
          { number: '17.2', title: 'Technology Stack Selection Criteria' },
          { number: '17.3', title: 'Change Management & Clinician Training' },
        ],
      },
      { number: '18', title: 'Success Metrics & KPIs', expandable: false },
      { number: '19', title: 'Partnership & Ecosystem Opportunities', expandable: false },
      { number: '20', title: 'AI/ML Technology Integration Playbook', expandable: false },
      { number: '21', title: 'Ethical AI & Data Governance', expandable: false },
      { number: '22', title: 'Clinician & Patient Adoption Insights', expandable: false },
      { number: '23', title: 'Commercialization Strategy', expandable: false },
      { number: '24', title: 'Sales Channel & Distribution', expandable: false },
      { number: '25', title: 'Conclusion & Key Takeaways', expandable: false },
      { number: '26', title: 'Appendix & Data Tables', expandable: false },
    ],
  },
];

export const extendedTocStats3: ExtendedStats = { pages: 210, chapters: 26, companies: 200, segmentations: 9 };

export const extendedFooterSummary3: FooterSummary = {
  title: 'Complete Report Coverage',
  description: '250+ detailed sections across three strategic phases of the global AI in healthcare market',
  sections: [
    { value: 78, label: 'Foundation' },
    { value: 64, label: 'Intelligence' },
    { value: 108, label: 'Strategy Sections' },
  ],
};

export const extendedFilters: FilterOption[] = [
  { id: 'all', label: 'All Chapters' },
  { id: 'phase1', label: 'Phase 1' },
  { id: 'phase2', label: 'Phase 2' },
  { id: 'phase3', label: 'Phase 3' },
];