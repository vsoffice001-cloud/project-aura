/**
 * ReportStoreListingPage — Wave 4 RS organism composition reference
 *
 * WHY:   Proves listing IA + filter system + ReportCard variants in a single
 *        reference page. Validates that Wave 4 parity-merged organisms
 *        compose correctly from `@kenresearch/design-system` without
 *        re-implementing any atoms, molecules, or organisms.
 *
 * WHAT:  Full listing page: DummyHeader → MegaBreadcrumb → ListingContextBanner →
 *        ListingToolbar → [IndustrySidebar | CardListing] → ExploreByRegion →
 *        IndustryReportSection → TrendingTopics → DummyFooter.
 *        ReportCard variants: featured (1) · grid (8) · list (4) · compact (4).
 *        MobileFilterSheet rendered but hidden until toolbar trigger fires.
 *
 * WHEN:  Development reference · proves organism composition ROI.
 *        Not a production page — replace mock data w/ real API before shipping.
 *
 * WHERE: projects/reports-pdp-v2/src/app/report-store-listing/page.tsx
 *
 * HOW:   `useReportFilters` DS hook owns all filter/sort/pagination state.
 *        viewMode + mobileSheetOpen via local useState.
 *        All data in MOCK_* constants below — TODO markers at every call site.
 *
 * @variant editorial-light (RS listing recipe default)
 * @a11y   skip-link · <main id="main-content"> · semantic landmarks · ARIA on chips
 * @tokens zero hardcoded hex — all via DS token vars
 */
'use client';

import { useState } from 'react';

// ── Organisms ─────────────────────────────────────────────────────────────────
import {
  DummyHeader,
  DummyFooter,
  MegaBreadcrumb,
  ListingContextBanner,
  ListingToolbar,
  IndustrySidebar,
  CardListing,
  ExploreByRegion,
  IndustryReportSection,
  TrendingTopics,
  type BreadcrumbItem,
  type IndustryEntry,
  type RegionEntry,
  type RegionReport,
  type IndustryReportSectionProps,
} from '@kenresearch/design-system/organisms';

// ── Molecules ─────────────────────────────────────────────────────────────────
import { MobileFilterSheet, ReportCard } from '@kenresearch/design-system/molecules';

// ── DS hook ───────────────────────────────────────────────────────────────────
import { useReportFilters } from '@kenresearch/design-system/hooks';

// ── DS types ──────────────────────────────────────────────────────────────────
import type {
  ReportItem,
  IndustryData,
} from '@kenresearch/design-system/types';

import type { ViewMode } from '@kenresearch/design-system/atoms';

// =============================================================================
// MOCK DATA — TODO: replace w/ real API calls
// =============================================================================

// TODO: replace w/ real API — GET /api/reports?industry=Healthcare&page=1
const MOCK_REPORTS: ReportItem[] = [
  {
    id: 'hc-001',
    image: 'https://placehold.co/400x260/f5f2f1/333333?text=Healthcare+AI',
    title: 'AI in Healthcare Market: Diagnostics, Imaging & Drug Discovery 2024-2030',
    industry: 'Healthcare',
    subcat: 'AI & Digital Health',
    projection: '38.5% CAGR 2024-2030',
    region: 'North America',
    date: 'May 2025',
    format: 'PDF',
    description: 'Comprehensive analysis of AI adoption across radiology, pathology, and genomics drug discovery pipelines.',
  },
  {
    id: 'hc-002',
    image: 'https://placehold.co/400x260/f0eeec/333333?text=MedTech',
    title: 'Minimally Invasive Surgery Devices: Global Market Outlook 2025-2031',
    industry: 'Healthcare',
    subcat: 'MedTech',
    projection: '11.2% CAGR 2025-2031',
    region: 'Europe',
    date: 'Apr 2025',
    format: 'PDF',
  },
  {
    id: 'hc-003',
    image: 'https://placehold.co/400x260/ede9e7/444444?text=GLP-1',
    title: 'GLP-1 Receptor Agonist Market: Obesity & Diabetes Therapeutics 2024-2029',
    industry: 'Healthcare',
    subcat: 'Pharmaceuticals',
    projection: '22.1% CAGR 2024-2029',
    region: 'North America',
    date: 'Mar 2025',
    format: 'PDF',
    description: 'GLP-1 pipeline analysis covering Ozempic, Wegovy, Mounjaro and next-gen oral formulations.',
  },
  {
    id: 'hc-004',
    image: 'https://placehold.co/400x260/f5f2f1/333333?text=Telehealth',
    title: 'Telehealth & Virtual Care Platform Market: Post-Pandemic Normalisation 2024-2030',
    industry: 'Healthcare',
    subcat: 'Digital Health',
    projection: '16.4% CAGR 2024-2030',
    region: 'Asia Pacific',
    date: 'Feb 2025',
    format: 'PDF',
  },
  {
    id: 'hc-005',
    image: 'https://placehold.co/400x260/eceae8/333333?text=Oncology',
    title: 'CAR-T Cell Therapy Market: Manufacturing Scale-up & Cost Dynamics 2025-2032',
    industry: 'Healthcare',
    subcat: 'Oncology',
    projection: '27.8% CAGR 2025-2032',
    region: 'North America',
    date: 'Jan 2025',
    format: 'PDF',
  },
  {
    id: 'hc-006',
    image: 'https://placehold.co/400x260/f5f2f1/333333?text=Diagnostics',
    title: 'Point-of-Care Diagnostics Market: Rapid Testing & Lab-on-Chip 2024-2030',
    industry: 'Healthcare',
    subcat: 'Diagnostics',
    projection: '9.6% CAGR 2024-2030',
    region: 'Europe',
    date: 'Dec 2024',
    format: 'PDF',
  },
  {
    id: 'hc-007',
    image: 'https://placehold.co/400x260/edeae7/333333?text=Wearables',
    title: 'Medical Wearables & Remote Patient Monitoring 2024-2030',
    industry: 'Healthcare',
    subcat: 'Digital Health',
    projection: '14.3% CAGR 2024-2030',
    region: 'Global',
    date: 'Nov 2024',
    format: 'PDF',
  },
  {
    id: 'hc-008',
    image: 'https://placehold.co/400x260/f5f2f1/333333?text=Mental+Health',
    title: 'Digital Mental Health Platform Market: App-Based Therapy & AI Coaching 2025-2031',
    industry: 'Healthcare',
    subcat: 'AI & Digital Health',
    projection: '19.2% CAGR 2025-2031',
    region: 'North America',
    date: 'Oct 2024',
    format: 'PDF',
  },
  {
    id: 'hc-009',
    image: 'https://placehold.co/400x260/ede9e7/333333?text=Biomarkers',
    title: 'Liquid Biopsy & Biomarker Discovery Market 2025-2032',
    industry: 'Healthcare',
    subcat: 'Diagnostics',
    projection: '24.7% CAGR 2025-2032',
    region: 'North America',
    date: 'Sep 2024',
    format: 'PDF',
  },
  {
    id: 'hc-010',
    image: 'https://placehold.co/400x260/f5f2f1/333333?text=Genomics',
    title: 'Clinical Genomics & NGS Market: Sequencing Cost Inflection 2024-2031',
    industry: 'Healthcare',
    subcat: 'Genomics',
    projection: '18.1% CAGR 2024-2031',
    region: 'Global',
    date: 'Aug 2024',
    format: 'PDF',
  },
  {
    id: 'hc-011',
    image: 'https://placehold.co/400x260/eceae8/333333?text=Hospital+IT',
    title: 'Hospital Information Systems & EHR Market: Cloud Migration Wave 2024-2030',
    industry: 'Healthcare',
    subcat: 'Digital Health',
    projection: '12.5% CAGR 2024-2030',
    region: 'Asia Pacific',
    date: 'Jul 2024',
    format: 'PDF',
    description: 'Covers Epic, Cerner, Oracle Health migrations plus emerging India & APAC vendors.',
  },
  {
    id: 'hc-012',
    image: 'https://placehold.co/400x260/f5f2f1/333333?text=Drug+Delivery',
    title: 'Advanced Drug Delivery Systems Market: Nanoparticle & Transdermal 2025-2032',
    industry: 'Healthcare',
    subcat: 'Pharmaceuticals',
    projection: '10.9% CAGR 2025-2032',
    region: 'Europe',
    date: 'Jun 2024',
    format: 'PDF',
  },
  {
    id: 'hc-013',
    image: 'https://placehold.co/400x260/edeae8/333333?text=Robotic+Surgery',
    title: 'Surgical Robotics Market: Soft-Tissue & Orthopaedic Systems 2024-2031',
    industry: 'Healthcare',
    subcat: 'MedTech',
    projection: '20.4% CAGR 2024-2031',
    region: 'North America',
    date: 'May 2024',
    format: 'PDF',
  },
  {
    id: 'hc-014',
    image: 'https://placehold.co/400x260/f5f2f1/333333?text=Vaccine',
    title: 'mRNA Vaccine & Immunotherapy Platform Market 2025-2032',
    industry: 'Healthcare',
    subcat: 'Pharmaceuticals',
    projection: '31.2% CAGR 2025-2032',
    region: 'Global',
    date: 'Apr 2024',
    format: 'PDF',
  },
];

// TODO: replace w/ real API — GET /api/taxonomy/industries
const MOCK_INDUSTRIES: IndustryData[] = [
  { label: 'Healthcare', count: 142, subs: ['AI & Digital Health', 'Diagnostics', 'MedTech', 'Oncology', 'Pharmaceuticals', 'Genomics'] },
  { label: 'Technology', count: 198, subs: ['AI & ML', 'Semiconductors', 'Cloud', 'Cybersecurity', 'Edge Computing'] },
  { label: 'Energy', count: 87, subs: ['Renewables', 'Green Hydrogen', 'Battery Storage', 'Oil & Gas', 'Carbon Capture'] },
  { label: 'Financial Services', count: 134, subs: ['Banking', 'Insurance', 'Embedded Finance', 'Crypto', 'Fintech'] },
  { label: 'Automotive', count: 76, subs: ['EV', 'ADAS', 'Connected Car', 'Autonomous', 'Components'] },
  { label: 'Consumer Goods', count: 93, subs: ['FMCG', 'Luxury', 'D2C', 'Packaging', 'Retail Tech'] },
];

// TODO: replace w/ real API — GET /api/taxonomy/tags?industry=Healthcare
const MOCK_TAGS_BY_INDUSTRY: Record<string, string[]> = {
  Healthcare: ['AI', 'GLP-1', 'mRNA', 'Robotics', 'Diagnostics', 'Telehealth', 'Wearables', 'Oncology'],
  Technology: ['Generative AI', 'LLM', 'Quantum', 'Edge', 'Cloud', 'IoT'],
  Energy: ['Solar', 'Wind', 'Green H2', 'BESS', 'Carbon Credits'],
  'Financial Services': ['BNPL', 'Crypto', 'RegTech', 'Open Banking'],
  Automotive: ['BEV', 'FCEV', 'LiDAR', 'V2X', 'OTA Updates'],
  'Consumer Goods': ['Premiumisation', 'D2C', 'Sustainable Packaging'],
};

// TODO: replace w/ real API — GET /api/taxonomy/regions
const MOCK_REGION_DATA: RegionEntry[] = [
  {
    name: 'North America',
    reports: 4820,
    countries: ['USA', 'Canada', 'Mexico'],
    trending: ['Generative AI', 'GLP-1', 'Embedded Finance'],
  },
  {
    name: 'Europe',
    reports: 3640,
    countries: ['Germany', 'UK', 'France', 'Nordics', 'BENELUX'],
    trending: ['Green Hydrogen', 'EV Market', 'Digital Euro'],
  },
  {
    name: 'Asia Pacific',
    reports: 5120,
    countries: ['China', 'India', 'Japan', 'South Korea', 'ASEAN'],
    trending: ['Semiconductor', 'EV Battery', 'GenAI Adoption'],
  },
  {
    name: 'GCC & Middle East',
    reports: 1230,
    countries: ['Saudi Arabia', 'UAE', 'Qatar', 'Kuwait'],
    trending: ['Vision 2030', 'Neom', 'Sovereign AI'],
  },
  {
    name: 'Latin America',
    reports: 890,
    countries: ['Brazil', 'Mexico', 'Argentina', 'Chile'],
    trending: ['Agri-Tech', 'Fintech', 'E-Commerce'],
  },
  {
    name: 'Africa',
    reports: 460,
    countries: ['Nigeria', 'South Africa', 'Kenya', 'Egypt'],
    trending: ['Mobile Money', 'Agri-Finance', 'Off-Grid Energy'],
  },
];

// RegionReport shape for ExploreByRegion top-3 derivation
// TODO: replace w/ real API — same as MOCK_REPORTS but typed to RegionReport
const MOCK_REGION_REPORTS: RegionReport[] = MOCK_REPORTS.map((r) => ({
  id: r.id,
  title: r.title,
  industry: r.industry,
  date: r.date,
  downloads: '12,345',
  region: r.region,
}));

// TODO: replace w/ real API — GET /api/taxonomy/breadcrumb?industry=Healthcare
const MOCK_BREADCRUMB_ITEMS: BreadcrumbItem[] = [
  { id: 'home', label: 'Home', href: '/' },
  {
    id: 'reports',
    label: 'Report Store',
    href: '/report-store',
    siblings: [
      { id: 'industries-hub', label: 'Industries Hub', href: '/industries' },
      { id: 'reports', label: 'Report Store', href: '/report-store', active: true },
      { id: 'surveys', label: 'Surveys', href: '/surveys' },
    ],
  },
  {
    id: 'healthcare',
    label: 'Healthcare',
    href: '/report-store/healthcare',
    siblings: [
      { id: 'technology', label: 'Technology', href: '/report-store/technology' },
      { id: 'energy', label: 'Energy', href: '/report-store/energy' },
      { id: 'healthcare', label: 'Healthcare', href: '/report-store/healthcare', active: true },
      { id: 'bfsi', label: 'Financial Services', href: '/report-store/financial-services' },
      { id: 'automotive', label: 'Automotive', href: '/report-store/automotive' },
    ],
    children: [
      { id: 'ai-digital-health', label: 'AI & Digital Health', href: '/report-store/healthcare/ai-digital-health', active: true },
      { id: 'medtech', label: 'MedTech', href: '/report-store/healthcare/medtech' },
      { id: 'pharma', label: 'Pharmaceuticals', href: '/report-store/healthcare/pharmaceuticals' },
      { id: 'diagnostics', label: 'Diagnostics', href: '/report-store/healthcare/diagnostics' },
      { id: 'oncology', label: 'Oncology', href: '/report-store/healthcare/oncology' },
    ],
  },
  {
    id: 'ai-digital-health',
    label: 'AI & Digital Health',
    href: '/report-store/healthcare/ai-digital-health',
  },
];

// TODO: replace w/ real API — GET /api/industries?full=true (for ListingContextBanner)
const MOCK_INDUSTRY_ENTRIES: IndustryEntry[] = MOCK_INDUSTRIES.map((ind) => ({
  name: ind.label,
  count: ind.count,
  subcategories: ind.subs,
}));

// TODO: replace w/ real API — GET /api/industries?for=browse-section
const MOCK_INDUSTRY_REPORT_SECTION: IndustryReportSectionProps['industries'] = [
  {
    name: 'Healthcare',
    count: 142,
    subcategories: ['Diagnostics', 'MedTech', 'Pharmaceuticals', 'AI & Digital Health', 'Oncology'],
    reports: MOCK_REPORTS.slice(0, 8).map((r) => ({
      id: r.id,
      image: r.image,
      title: r.title,
      industry: r.industry,
      subcat: r.subcat,
      projection: r.projection ?? null,
      region: r.region,
      date: r.date,
      description: r.description,
    })),
  },
  {
    name: 'Technology',
    count: 198,
    subcategories: ['AI & ML', 'Semiconductors', 'Cloud', 'Cybersecurity'],
    reports: MOCK_REPORTS.slice(2, 8).map((r) => ({
      id: r.id,
      image: r.image,
      title: r.title.replace('Healthcare', 'Technology'),
      industry: 'Technology',
      subcat: 'AI & ML',
      projection: '41.2% CAGR 2024-2031',
      region: 'Global',
      date: r.date,
    })),
  },
  {
    name: 'Energy',
    count: 87,
    subcategories: ['Renewables', 'Green Hydrogen', 'Battery Storage', 'Carbon Capture'],
    reports: MOCK_REPORTS.slice(4, 10).map((r) => ({
      id: `en-${r.id}`,
      image: r.image,
      title: r.title.replace('Healthcare', 'Energy'),
      industry: 'Energy',
      subcat: 'Renewables',
      projection: '28.4% CAGR 2024-2030',
      region: 'Europe',
      date: r.date,
    })),
  },
  {
    name: 'Financial Services',
    count: 134,
    subcategories: ['Banking', 'Insurance', 'Embedded Finance', 'Fintech'],
    reports: MOCK_REPORTS.slice(0, 6).map((r) => ({
      id: `fs-${r.id}`,
      image: r.image,
      title: r.title.replace('Healthcare', 'Finance'),
      industry: 'Financial Services',
      subcat: 'Fintech',
      projection: '15.6% CAGR 2024-2030',
      region: 'North America',
      date: r.date,
    })),
  },
];

const PAGE_SIZE = 12;

// =============================================================================
// PAGE COMPONENT
// =============================================================================

export default function ReportStoreListingPage() {
  // ── View toggle ─────────────────────────────────────────────────────────────
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  // ── Mobile filter sheet ──────────────────────────────────────────────────────
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);

  // ── Filter / sort / pagination via DS hook ───────────────────────────────────
  // TODO: replace allReports + fullIndustries w/ real API data
  const filters = useReportFilters({
    allReports: MOCK_REPORTS,
    fullIndustries: MOCK_INDUSTRIES,
    tagsByIndustry: MOCK_TAGS_BY_INDUSTRY,
    pageSize: PAGE_SIZE,
  });

  // Pre-select Healthcare to demonstrate ListingContextBanner Zone A + Zone B
  // In production this comes from route params / URL search params
  const demoIndustry = filters.selectedIndustry ?? 'Healthcare';

  return (
    <>
      {/* ── Skip navigation ───────────────────────────────────────────────── */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:rounded-md focus:font-medium"
        style={{
          backgroundColor: 'var(--color-brand-red)',
          color: 'var(--color-surface-primary)',
          fontSize: 'var(--text-sm)',
        }}
      >
        Skip to main content
      </a>

      {/* ── Header ───────────────────────────────────────────────────────── */}
      <DummyHeader />

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <main id="main-content">

        {/* Section: Breadcrumb — white border-bottom */}
        <div
          className="border-b"
          style={{
            backgroundColor: 'var(--color-surface-primary)',
            borderColor: 'var(--color-border-subtle)',
            paddingBlock: 'var(--space-3)',
            paddingInline: 'var(--space-6)',
          }}
        >
          <div style={{ maxWidth: 'var(--container-content)', marginInline: 'auto' }}>
            {/* TODO: replace w/ real API — GET /api/taxonomy/breadcrumb?industry=Healthcare */}
            <MegaBreadcrumb
              breadcrumbItems={MOCK_BREADCRUMB_ITEMS}
              colorScheme="light"
            />
          </div>
        </div>

        {/* Section: Context Banner — dark hero (industry) + light chips (filters) */}
        {/* TODO: replace w/ real API — filter state from useReportFilters hook */}
        <ListingContextBanner
          industries={MOCK_INDUSTRY_ENTRIES}
          selectedIndustry={demoIndustry}
          selectedSubIndustries={filters.selectedSubIndustries}
          selectedTags={filters.selectedTags}
          selectedRegions={filters.selectedRegions}
          selectedYears={filters.selectedYears}
          searchQuery={filters.searchQuery}
          filteredCount={filters.filtered.length}
          onRemoveIndustry={() => filters.setSelectedIndustry(null)}
          onRemoveSubIndustry={(v) =>
            filters.setSelectedSubIndustries((prev) => prev.filter((x) => x !== v))
          }
          onRemoveTag={(v) =>
            filters.setSelectedTags((prev) => prev.filter((x) => x !== v))
          }
          onRemoveRegion={(v) =>
            filters.setSelectedRegions((prev) => prev.filter((x) => x !== v))
          }
          onRemoveYear={(v) =>
            filters.setSelectedYears((prev) => prev.filter((x) => x !== v))
          }
          onRemoveSearch={() => filters.setSearchQuery('')}
          onClearAll={filters.clearAllFilters}
          onSubcategoryClick={(sub) =>
            filters.setSelectedSubIndustries((prev) =>
              prev.includes(sub) ? prev.filter((x) => x !== sub) : [...prev, sub]
            )
          }
        />

        {/* Section: Listing area — white */}
        <section
          aria-label="Report listing"
          style={{
            backgroundColor: 'var(--color-surface-primary)',
            paddingBlock: 'var(--space-8)',
            paddingInline: 'var(--space-6)',
          }}
        >
          <div
            style={{
              maxWidth: 'var(--container-content)',
              marginInline: 'auto',
            }}
          >
            {/* Toolbar — back · count · view toggle · sort · mobile filter btn */}
            {/* TODO: replace w/ real API — resultCount from filters.filtered.length */}
            <ListingToolbar
              resultCount={filters.filtered.length}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              sortBy={filters.sortBy}
              onSortChange={filters.setSortBy}
              activeFilterCount={filters.activeFilterCount}
              onOpenMobileFilters={() => setMobileSheetOpen(true)}
              onBack={() => console.log('navigate: back to report store')}
              selectedIndustry={demoIndustry}
            />

            {/* Sidebar + card grid layout */}
            <div className="flex gap-6 items-start">

              {/* Left: IndustrySidebar — sticky · lg+ only */}
              {/* TODO: replace w/ real API — regions + publishYears from API */}
              <aside
                className="hidden lg:block flex-shrink-0"
                style={{ width: '15rem' }}
                aria-label="Filter sidebar"
              >
                <IndustrySidebar
                  filters={filters}
                  regions={filters.filteredSidebarIndustries.map((ind) => ({
                    label: ind.label,
                    count: ind.count,
                  }))}
                  publishYears={['2025', '2024', '2023', '2022', '2021']}
                  catalogTotal={50000}
                />
              </aside>

              {/* Right: ReportCard variants + CardListing */}
              <div className="flex-1 min-w-0">

                {/*
                  ── VARIANT: featured (1×) ─────────────────────────────────────
                  Full-bleed hero overlay · CTA prominent · top of listing.
                  TODO: replace w/ real API — featured report from editorial curation endpoint
                */}
                <div
                  className="mb-6"
                  aria-label="Featured report"
                  role="region"
                >
                  <p
                    className="mb-3 uppercase tracking-widest"
                    style={{
                      fontSize: 'var(--text-xs)',
                      color: 'var(--color-text-secondary)',
                    }}
                  >
                    Featured
                  </p>
                  <ReportCard
                    id={MOCK_REPORTS[0].id}
                    image={MOCK_REPORTS[0].image}
                    title={MOCK_REPORTS[0].title}
                    industry={MOCK_REPORTS[0].industry}
                    subcat={MOCK_REPORTS[0].subcat}
                    projection={MOCK_REPORTS[0].projection}
                    region={MOCK_REPORTS[0].region}
                    date={MOCK_REPORTS[0].date}
                    description={MOCK_REPORTS[0].description}
                    variant="featured"
                  />
                </div>

                {/*
                  ── VARIANT: grid (8×) / list (4×) ────────────────────────────
                  CardListing handles grid↔list toggle via viewMode prop.
                  grid: 3-col grid of ReportCard variant="grid".
                  list: stacked horizontal ReportCard variant="list" rows.
                  TODO: replace w/ real API — paginated from filters.paginated
                */}
                <CardListing
                  items={filters.filtered}
                  paginated={filters.paginated}
                  viewMode={viewMode}
                  loading={false}
                  currentPage={filters.currentPage}
                  totalPages={filters.totalPages}
                  pageSize={PAGE_SIZE}
                  onPageChange={filters.handlePageChange}
                  onClearFilters={filters.clearAllFilters}
                />

                {/*
                  ── VARIANT: compact (4×) ──────────────────────────────────────
                  Ranked top-N rail. rank={1-4} for numbered badge.
                  Positioned below the paginated grid as "Top Downloads" context.
                  TODO: replace w/ real API — GET /api/reports?sort=downloads&limit=4
                */}
                <section
                  aria-label="Top downloaded reports"
                  className="mt-10"
                >
                  <p
                    className="mb-3 uppercase tracking-widest"
                    style={{
                      fontSize: 'var(--text-xs)',
                      color: 'var(--color-text-secondary)',
                    }}
                  >
                    Top Downloads
                  </p>
                  <div className="flex flex-col gap-2">
                    {MOCK_REPORTS.slice(1, 5).map((report, idx) => (
                      <ReportCard
                        key={report.id}
                        id={report.id}
                        image={report.image}
                        title={report.title}
                        industry={report.industry}
                        subcat={report.subcat}
                        projection={report.projection}
                        region={report.region}
                        date={report.date}
                        variant="compact"
                        rank={idx + 1}
                      />
                    ))}
                  </div>
                </section>

              </div>
            </div>
          </div>
        </section>

        {/* Section: Explore by Region — white */}
        <section
          aria-label="Explore reports by region"
          style={{
            backgroundColor: 'var(--color-surface-primary)',
            paddingBlock: 'var(--space-12)',
            paddingInline: 'var(--space-6)',
          }}
        >
          {/* TODO: replace w/ real API — GET /api/regions + GET /api/reports?sort=downloads */}
          <ExploreByRegion
            regions={MOCK_REGION_DATA}
            reports={MOCK_REGION_REPORTS}
            onRegionClick={(value) =>
              console.log('region filter:', value)
            }
          />
        </section>

        {/* Section: Browse Other Industries — warm bg break */}
        <section
          aria-label="Browse reports by industry"
          style={{
            backgroundColor: 'var(--warm-100, var(--color-surface-secondary))',
            paddingBlock: 'var(--space-12)',
            paddingInline: 'var(--space-6)',
          }}
        >
          {/* TODO: replace w/ real API — GET /api/industries?full=true&limit=14 */}
          <div style={{ maxWidth: 'var(--container-content)', marginInline: 'auto' }}>
            <IndustryReportSection
              industries={MOCK_INDUSTRY_REPORT_SECTION}
              sectionLabel="Browse Industries"
              sectionTitle="Discover Reports by Industry"
              sectionSubtitle="Explore 50,000+ market intelligence reports across 14 industries and 120+ subcategories."
              onIndustrySelect={(name) =>
                console.log('navigate: industry select →', name)
              }
              onViewReport={(id) =>
                console.log('navigate: view report →', id)
              }
            />
          </div>
        </section>

        {/* Section: Trending Topics — white */}
        <section
          aria-label="Trending research topics"
          style={{
            backgroundColor: 'var(--color-surface-primary)',
          }}
        >
          {/* TODO: replace w/ real API — GET /api/topics?sort=trending&limit=10 */}
          <TrendingTopics
            onTopicClick={(topic) =>
              console.log('topic filter:', topic)
            }
          />
        </section>

      </main>

      {/* ── Mobile Filter Sheet (off-canvas · hidden until trigger) ──────── */}
      {/* TODO: replace w/ real API — filter state from useReportFilters hook  */}
      <MobileFilterSheet
        isOpen={mobileSheetOpen}
        onClose={() => setMobileSheetOpen(false)}
        activeCount={filters.activeFilterCount}
        resultCount={filters.filtered.length}
        onClearAll={filters.clearAllFilters}
      >
        {/*
          Pass same FiltersPanel content as desktop sidebar.
          IndustrySidebar composes SidebarPanel + FiltersPanel internally —
          for mobile we compose FiltersPanel directly.
          TODO: import FiltersPanel from @kenresearch/design-system/organisms
          and pass filters prop here for full parity with desktop sidebar.
        */}
        <div
          style={{ padding: 'var(--space-4)', fontSize: 'var(--text-sm)' }}
          aria-label="Mobile filter options"
          role="region"
        >
          <p style={{ color: 'var(--color-text-secondary)' }}>
            Filter panel content — compose{' '}
            <code>&lt;FiltersPanel filters={'{filters}'} /&gt;</code>{' '}
            here for full mobile parity with the desktop sidebar.
          </p>
        </div>
      </MobileFilterSheet>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <DummyFooter />
    </>
  );
}
