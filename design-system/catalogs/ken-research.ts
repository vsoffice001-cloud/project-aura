/**
 * ken-research.ts — Canonical Ken Research catalogs
 *
 * SOURCE OF TRUTH for industries · regions · countries · trending tags across
 * ALL Ken Research consumer pages. Sourced verbatim from
 * `projects/report-store-v07/src/app/components/data.ts`.
 *
 * WHY: Multiple consumer pages (competition-benchmarking-listing-v01,
 *      future surveys-listing, sector-landing, etc) re-derived these catalogs
 *      from scratch in their own mock-data — drift inevitable. This file
 *      gives every page one canonical import.
 *
 * USAGE:
 *   import { INDUSTRIES, REGIONS, COUNTRIES, COUNTRIES_BY_REGION, TRENDING_TAGS, METHODOLOGY_LABELS } from '@/design-system/catalogs/ken-research';
 *
 *   For consumer pages that don't share an alias path, copy this file into
 *   `<project>/src/lib/catalogs/ken-research.ts` and re-import. Sync any
 *   future updates from the canonical file in `design-system/catalogs/`.
 *
 * UPDATED: 2026-05-07 (initial extraction from RS-v07/data.ts)
 *
 * MUST stay in sync with:
 *   - projects/report-store-v07/src/app/components/data.ts (industries, regions, trendingTopics)
 *
 * If RS-v07 data.ts changes, update this file + log to docs/CHANGELOG.md.
 */

// ─────────────────────────────────────────────────────────────────────────
// Industries — 14 Ken industries (full names; display + selection key identical)
// ─────────────────────────────────────────────────────────────────────────

export const INDUSTRIES = [
  'Healthcare',
  'Technology & Telecom',
  'Banking & Financial Services',
  'Energy & Utilities',
  'Consumer & Retail',
  'Manufacturing',
  'Automotive & Transportation',
  'Food & Beverage',
  'Education & Training',
  'Defense & Security',
  'Agriculture',
  'Media & Entertainment',
  'Mining & Chemicals',
  'Public Sector',
] as const;

export type Industry = typeof INDUSTRIES[number];

// ─────────────────────────────────────────────────────────────────────────
// Regions — 6 Ken region groupings
// ─────────────────────────────────────────────────────────────────────────

export const REGIONS = [
  'GCC & Middle East',
  'India & South Asia',
  'Southeast Asia',
  'Europe',
  'Americas',
  'Africa',
] as const;

export type Region = typeof REGIONS[number];

// ─────────────────────────────────────────────────────────────────────────
// Countries by region (per RS data.ts geographyData)
// ─────────────────────────────────────────────────────────────────────────

export const COUNTRIES_BY_REGION: Record<Region, string[]> = {
  'GCC & Middle East': ['UAE', 'Saudi Arabia', 'Qatar', 'Kuwait'],
  'India & South Asia': ['India', 'Bangladesh', 'Sri Lanka'],
  'Southeast Asia': ['Singapore', 'Indonesia', 'Malaysia', 'Thailand'],
  'Europe': ['UK', 'Germany', 'France', 'Netherlands'],
  'Americas': ['USA', 'Canada', 'Brazil', 'Mexico'],
  'Africa': ['Nigeria', 'South Africa', 'Kenya', 'Egypt'],
};

export const COUNTRIES = Object.values(COUNTRIES_BY_REGION).flat();

// ─────────────────────────────────────────────────────────────────────────
// Trending tags — 10 cross-cutting topic tags (independent of industry)
// ─────────────────────────────────────────────────────────────────────────

export const TRENDING_TAGS = [
  'Artificial Intelligence',
  'Electric Vehicles',
  'Quick Commerce',
  'Green Hydrogen',
  'Digital Payments',
  'Telemedicine',
  'Cloud Computing',
  'Cybersecurity',
  'Renewable Energy',
  'Supply Chain Tech',
] as const;

export type TrendingTag = typeof TRENDING_TAGS[number];

// ─────────────────────────────────────────────────────────────────────────
// Common research methodology labels
// (Used in competition-benchmarking, surveys, sector-landing)
// ─────────────────────────────────────────────────────────────────────────

export const METHODOLOGY_LABELS: Record<string, string> = {
  'mystery-shopping': 'Mystery shopping',
  'expert-interview': 'Expert interview',
  'public-data': 'Public data scrape',
  'hybrid': 'Hybrid',
};

// ─────────────────────────────────────────────────────────────────────────
// Common competitor-set sizes (Competition Benchmarking)
// ─────────────────────────────────────────────────────────────────────────

export const COMPETITOR_SET_SIZES = ['3-5', '5-10', '10+'] as const;
export type CompetitorSetSize = typeof COMPETITOR_SET_SIZES[number];
