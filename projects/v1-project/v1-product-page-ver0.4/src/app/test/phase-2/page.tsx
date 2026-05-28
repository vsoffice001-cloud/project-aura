'use client';

/**
 * Phase 2 · Dynamic Multi-Report Test Page
 *
 * @what  Data-driven PDP page supporting 3 report variants:
 *        1. Australia Cold Chain (default)
 *        2. India Pharma Logistics (?report=india-pharma)
 *        3. SE Asia Quick Commerce (?report=sea-quick-commerce)
 *
 *        Sections auto-hide when report.sections.<key> === null.
 *        No gap left — section simply doesn't render.
 *        SideTOC items are computed from live sections (skipped = not in TOC).
 *
 * @why   Sprint G.12 Task 4 — dynamic modular content. Single page composition
 *        supports multiple report archetypes without duplicate routes.
 *
 * @how   useSearchParams() reads ?report= → getReport(id) resolves ReportData.
 *        BODY_SECTIONS filtered by section availability → drives SideTOCV04 items.
 *        Section render map pattern: each section guarded by
 *        `report.sections.<key> && <Section />`.
 *
 * @baseline
 *        AU Cold Chain: 21 body sections · 3 full-width · 0 skipped
 *        India Pharma:  19 body sections · 3 full-width · 2 skipped (countryInfra · endUser)
 *        SEA Q-Com:     16 body sections · 3 full-width · 5 skipped (countryInfra · taxonomy · endUser · dsGap · macro)
 */

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { DummyHeaderV04 } from '@/components/chrome/DummyHeaderV04';
import { SideTOCV04, type SideTOCItem } from '@/components/chrome/SideTOCV04';
import { PageProgressBar } from '@/components/chrome/PageProgressBar';
import { ReportHeroV04 } from '@/components/sections/ReportHeroV04';
import { ExecutiveSummarySection } from '@/components/sections/ExecutiveSummarySection';
import { ScopeAndCoverageSection } from '@/components/sections/ScopeAndCoverageSection';
import { TaxonomySection } from '@/components/sections/TaxonomySection';
import { CountryInfrastructureSection } from '@/components/sections/CountryInfrastructureSection';
import { MarketOverviewGenesisSection } from '@/components/sections/MarketOverviewGenesisSection';
import { DefinitionsSection } from '@/components/sections/DefinitionsSection';
import { EcosystemSection } from '@/components/sections/EcosystemSection';
import { MarketSizeSection } from '@/components/sections/MarketSizeSection';
import { SubmarketsSection } from '@/components/sections/SubmarketsSection';
import { SegmentationSection } from '@/components/sections/SegmentationSection';
import { IndustryAnalysisSection } from '@/components/sections/IndustryAnalysisSection';
import { EndUserSection } from '@/components/sections/EndUserSection';
import { DSGapSection } from '@/components/sections/DSGapSection';
import { CompetitorLandscapeSection } from '@/components/sections/CompetitorLandscapeSection';
import { RegulatoryLandscapeSection } from '@/components/sections/RegulatoryLandscapeSection';
import { FutureOutlookSection } from '@/components/sections/FutureOutlookSection';
import { OpportunitiesSection } from '@/components/sections/OpportunitiesSection';
import { MacroeconomicSection } from '@/components/sections/MacroeconomicSection';
import { MethodologySection } from '@/components/sections/MethodologySection';
import { TOCSection } from '@/components/sections/TOCSection';
import { FAQsSection } from '@/components/sections/FAQsSection';
import { ReportPreviewSlideshow, type SlideshowVariant } from '@/components/sections/ReportPreviewSlideshow';
import { RelatedReportsSection } from '@/components/sections/RelatedReportsSection';
import { GetFullAccessSection } from '@/components/sections/GetFullAccessSection';
import { getReport, ALL_REPORTS } from '@/data/reports';

// ─────────────────────────────────────────────────────────────────────────────
// All possible body sections (master list · presence filtered per report)
// ─────────────────────────────────────────────────────────────────────────────

const ALL_BODY_SECTIONS: Array<SideTOCItem & { availabilityKey: keyof ReturnType<typeof getReport>['sections'] }> = [
  { id: 'executive-summary', number: '01', title: 'Executive Summary',       availabilityKey: 'executiveSummary' },
  { id: 'scope',             number: '02', title: 'Scope & Coverage',         availabilityKey: 'scope' },
  { id: 'country-infra',     number: '03', title: 'Country & Infrastructure', availabilityKey: 'countryInfra' },
  { id: 'market-overview',   number: '04', title: 'Market Overview',          availabilityKey: 'marketOverview' },
  { id: 'definitions',       number: '05', title: 'Definitions',              availabilityKey: 'definitions' },
  { id: 'taxonomy',          number: '06', title: 'Taxonomy',                 availabilityKey: 'taxonomy' },
  { id: 'ecosystem',         number: '07', title: 'Market Ecosystem',         availabilityKey: 'ecosystem' },
  { id: 'market-size',       number: '08', title: 'Market Size & Growth',     availabilityKey: 'marketSize' },
  { id: 'submarkets',        number: '09', title: 'Submarkets',               availabilityKey: 'submarkets' },
  { id: 'segmentation',      number: '10', title: 'Segment Intelligence',     availabilityKey: 'segmentation' },
  { id: 'industry',          number: '11', title: 'Industry Analysis',        availabilityKey: 'industry' },
  { id: 'end-user',          number: '12', title: 'End-User Deep Dives',      availabilityKey: 'endUser' },
  { id: 'ds-gap',            number: '13', title: 'Demand-Supply Gap',        availabilityKey: 'dsGap' },
  { id: 'competitor',        number: '14', title: 'Competitor Landscape',     availabilityKey: 'competitor' },
  { id: 'regulatory',        number: '15', title: 'Regulatory Landscape',     availabilityKey: 'regulatory' },
  { id: 'future-outlook',    number: '16', title: 'Future Outlook',           availabilityKey: 'futureOutlook' },
  { id: 'opportunities',     number: '17', title: 'Opportunities',            availabilityKey: 'opportunities' },
  { id: 'macro',             number: '18', title: 'Macroeconomic Indicators', availabilityKey: 'macro' },
  { id: 'methodology',       number: '19', title: 'Methodology',              availabilityKey: 'methodology' },
  { id: 'toc',               number: '20', title: 'Table of Contents',        availabilityKey: 'toc' },
  { id: 'faq',               number: '21', title: 'FAQs',                     availabilityKey: 'faq' },
];

// ─────────────────────────────────────────────────────────────────────────────
// Variant switcher chip (periwinkle pills · 44px touch target)
// ─────────────────────────────────────────────────────────────────────────────

function ReportVariantSwitcher({
  activeId,
  onChange,
}: {
  activeId: string;
  onChange: (id: string) => void;
}) {
  return (
    <div
      role="group"
      aria-label="Select report variant"
      className="flex flex-wrap gap-2"
    >
      {ALL_REPORTS.map((report) => {
        const isActive = report.meta.id === activeId;
        return (
          <button
            key={report.meta.id}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(report.meta.id)}
            style={{
              minHeight: '44px',
              paddingInline: 'var(--space-4, 16px)',
              paddingBlock: 'var(--space-2, 8px)',
              borderRadius: '999px',
              border: isActive
                ? '1.5px solid var(--color-chart-periwinkle, rgb(91,79,207))'
                : '1.5px solid rgba(91,79,207,0.25)',
              background: isActive
                ? 'rgba(91,79,207,0.08)'
                : 'transparent',
              color: isActive
                ? 'var(--color-chart-periwinkle, rgb(91,79,207))'
                : 'var(--semantic-ink-muted, rgba(0,0,0,0.5))',
              fontSize: '13px',
              fontFamily: 'var(--font-body, "DM Sans", sans-serif)',
              fontWeight: isActive ? 600 : 400,
              cursor: 'pointer',
              transition: 'background 150ms ease, border-color 150ms ease, color 150ms ease',
              whiteSpace: 'nowrap',
            }}
          >
            {report.meta.chipLabel}
          </button>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Report meta bar (shows above hero · variant switcher + report title chip)
// ─────────────────────────────────────────────────────────────────────────────

function ReportMetaBar({
  activeId,
  sectionsRendered,
  sectionsSkipped,
  onReportChange,
}: {
  activeId: string;
  sectionsRendered: number;
  sectionsSkipped: number;
  onReportChange: (id: string) => void;
}) {
  return (
    <div
      style={{
        background: 'var(--color-foundation-white, #ffffff)',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
      }}
    >
      <div
        style={{
          maxWidth: 'var(--container-page, 1240px)',
          margin: '0 auto',
          padding: 'var(--space-3, 12px) var(--space-6, 24px)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: 'var(--space-4, 16px)',
          justifyContent: 'space-between',
        }}
      >
        {/* Left: switcher */}
        <ReportVariantSwitcher activeId={activeId} onChange={onReportChange} />

        {/* Right: section count badge */}
        <div
          style={{
            fontSize: '12px',
            fontFamily: 'var(--font-body, "DM Sans", sans-serif)',
            color: 'var(--semantic-ink-muted, rgba(0,0,0,0.45))',
            whiteSpace: 'nowrap',
          }}
          aria-live="polite"
          aria-label={`${sectionsRendered} sections rendered, ${sectionsSkipped} skipped`}
        >
          {sectionsRendered} sections · {sectionsSkipped} skipped
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Inner page — reads searchParams (needs Suspense wrapper for useSearchParams)
// ─────────────────────────────────────────────────────────────────────────────

function Phase2Inner() {
  const searchParams = useSearchParams();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [slideshowVariant, setSlideshowVariant] = useState<SlideshowVariant>('light');
  const [activeReportId, setActiveReportId] = useState<string>(
    () => searchParams.get('report') ?? 'australia-cold-chain'
  );

  const report = getReport(activeReportId);
  const { sections } = report;

  // Build TOC items from active sections (respects per-report tocOverrides)
  const activeTocItems: SideTOCItem[] = report.tocOverrides
    ? report.tocOverrides.filter((o) => {
        const match = ALL_BODY_SECTIONS.find((s) => s.id === o.id);
        return match ? sections[match.availabilityKey] !== null : false;
      })
    : ALL_BODY_SECTIONS.filter((s) => sections[s.availabilityKey] !== null).map(({ id, number, title }) => ({
        id,
        number,
        title,
      }));

  const sectionsRendered = activeTocItems.length;
  const sectionsSkipped = ALL_BODY_SECTIONS.length - sectionsRendered;

  // Handle variant chip click — update state (URL update is progressive enhancement)
  function handleReportChange(id: string) {
    setActiveReportId(id);
    // Progressive enhancement: update URL without full navigation
    const url = new URL(window.location.href);
    url.searchParams.set('report', id);
    window.history.pushState({}, '', url.toString());
  }

  return (
    <>
      <PageProgressBar />
      <DummyHeaderV04 mobileOpen={drawerOpen} onMobileOpenChange={setDrawerOpen} />

      {/* Report variant switcher bar */}
      <ReportMetaBar
        activeId={activeReportId}
        sectionsRendered={sectionsRendered}
        sectionsSkipped={sectionsSkipped}
        onReportChange={handleReportChange}
      />

      <main id="main">
        {/* Hero — always rendered · data-driven via ReportHeroV04Props */}
        <ReportHeroV04
          eyebrow={report.hero.eyebrow}
          title={report.hero.title}
          promise={report.hero.promise}
          stats={report.hero.stats}
        />

        {/* ─── 2-col body · SideTOC left · §01-§21 content right ─── */}
        <div className="bg-[var(--color-foundation-white,#ffffff)]">
          <div className="mx-auto max-w-[var(--container-page,1240px)] flex">
            <SideTOCV04
              sections={activeTocItems}
              scrollOffset={108}
              drawerOpen={drawerOpen}
              onDrawerOpenChange={setDrawerOpen}
            />

            {/* Right content col · §01-§21 report body sections */}
            <div className="flex-1 min-w-0">
              <div className="space-y-16 py-12 lg:py-16">

                {/* §01 Executive Summary */}
                {sections.executiveSummary && (
                  <ExecutiveSummarySection key={`${activeReportId}-exec`} />
                )}

                {/* §02 Scope & Coverage */}
                {sections.scope && (
                  <ScopeAndCoverageSection key={`${activeReportId}-scope`} />
                )}

                {/* §03 Country & Infrastructure · null for India Pharma + SEA Q-Com */}
                {sections.countryInfra && (
                  <CountryInfrastructureSection key={`${activeReportId}-country-infra`} />
                )}

                {/* §04 Market Overview */}
                {sections.marketOverview && (
                  <MarketOverviewGenesisSection key={`${activeReportId}-market-overview`} />
                )}

                {/* §05 Definitions */}
                {sections.definitions && (
                  <DefinitionsSection key={`${activeReportId}-definitions`} />
                )}

                {/* §06 Taxonomy · null for SEA Q-Com */}
                {sections.taxonomy && (
                  <TaxonomySection key={`${activeReportId}-taxonomy`} />
                )}

                {/* §07 Market Ecosystem */}
                {sections.ecosystem && (
                  <EcosystemSection key={`${activeReportId}-ecosystem`} />
                )}

                {/* §08 Market Size & Growth */}
                {sections.marketSize && (
                  <MarketSizeSection key={`${activeReportId}-market-size`} />
                )}

                {/* §09 Submarkets */}
                {sections.submarkets && (
                  <SubmarketsSection key={`${activeReportId}-submarkets`} />
                )}

                {/* §10 Segment Intelligence */}
                {sections.segmentation && (
                  <SegmentationSection key={`${activeReportId}-segmentation`} />
                )}

                {/* §11 Industry Analysis */}
                {sections.industry && (
                  <IndustryAnalysisSection key={`${activeReportId}-industry`} />
                )}

                {/* §12 End-User Deep Dives · null for India Pharma + SEA Q-Com */}
                {sections.endUser && (
                  <EndUserSection key={`${activeReportId}-end-user`} />
                )}

                {/* §13 Demand-Supply Gap · null for SEA Q-Com */}
                {sections.dsGap && (
                  <DSGapSection key={`${activeReportId}-ds-gap`} />
                )}

                {/* §14 Competitor Landscape */}
                {sections.competitor && (
                  <CompetitorLandscapeSection key={`${activeReportId}-competitor`} />
                )}

                {/* §15 Regulatory Landscape */}
                {sections.regulatory && (
                  <RegulatoryLandscapeSection key={`${activeReportId}-regulatory`} />
                )}

                {/* §16 Future Outlook */}
                {sections.futureOutlook && (
                  <FutureOutlookSection key={`${activeReportId}-future-outlook`} />
                )}

                {/* §17 Opportunities */}
                {sections.opportunities && (
                  <OpportunitiesSection key={`${activeReportId}-opportunities`} />
                )}

                {/* §18 Macroeconomic Indicators · null for SEA Q-Com */}
                {sections.macro && (
                  <MacroeconomicSection key={`${activeReportId}-macro`} />
                )}

                {/* §19 Methodology */}
                {sections.methodology && (
                  <MethodologySection key={`${activeReportId}-methodology`} />
                )}

                {/* §20 Table of Contents */}
                {sections.toc && (
                  <TOCSection key={`${activeReportId}-toc`} />
                )}

                {/* §21 FAQs */}
                {sections.faq && (
                  <FAQsSection key={`${activeReportId}-faq`} />
                )}

              </div>
            </div>
          </div>
        </div>

        {/* §22-§24 · full-width below 2-col body · no SideTOC chrome */}
        {sections.reportPreview && (
          <ReportPreviewSlideshow
            variant={slideshowVariant}
            onVariantChange={setSlideshowVariant}
          />
        )}
        {sections.relatedReports && <RelatedReportsSection />}
        {sections.getFullAccess && <GetFullAccessSection />}

        {/* Attribution mark */}
        <div className="ds-author-mark" aria-label="Project attribution" />
      </main>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page export — wraps inner in Suspense (Next 15 useSearchParams requirement)
// ─────────────────────────────────────────────────────────────────────────────

export default function Phase2TestPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
      <Phase2Inner />
    </Suspense>
  );
}
