'use client';

/**
 * Phase 2 · Chrome Test Page (Header + Hero + SideTOC + PageProgressBar)
 *
 * @what  Wires full chrome: DummyHeaderV04 (w/ hamburger lifted state) →
 *        Hero → 2-col body (SideTOC L · 25 sentinel sections R) →
 *        PageProgressBar (top 2px brand-red).
 * @why   Verify chrome composition + responsive behavior across 3 breakpoints
 *        before building actual body sections in Phase 3.
 */

import { useState } from 'react';
import { BarChart3, TrendingUp, Globe } from 'lucide-react';
import { DummyHeaderV04 } from '@/components/chrome/DummyHeaderV04';
import { SideTOCV04, type SideTOCItem } from '@/components/chrome/SideTOCV04';
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
import { PageProgressBar } from '@/components/chrome/PageProgressBar';
import { ReportHeroV04 } from '@/components/sections/ReportHeroV04';

// Sprint 4 2026-05-22 · BODY_SECTIONS = §01-§21 only (21 entries)
// §22 Sample Preview + §23 Related Reports + §24 Get Full Access escape the SideTOC
// and render full-width below the 2-col body container.
const BODY_SECTIONS: SideTOCItem[] = [
  { id: 'executive-summary',  number: '01', title: 'Executive Summary' },
  { id: 'scope',              number: '02', title: 'Scope & Coverage' },
  { id: 'country-infra',      number: '03', title: 'Country & Infrastructure' },
  { id: 'market-overview',    number: '04', title: 'Market Overview' },
  { id: 'definitions',        number: '05', title: 'Definitions' },
  { id: 'taxonomy',           number: '06', title: 'Taxonomy' },
  { id: 'ecosystem',          number: '07', title: 'Market Ecosystem' },
  { id: 'market-size',        number: '08', title: 'Market Size & Growth' },
  { id: 'submarkets',         number: '09', title: 'Submarkets' },
  { id: 'segmentation',       number: '10', title: 'Segment Intelligence' },
  { id: 'industry',           number: '11', title: 'Industry Analysis' },
  { id: 'end-user',           number: '12', title: 'End-User Deep Dives' },
  { id: 'ds-gap',             number: '13', title: 'Demand-Supply Gap' },
  { id: 'competitor',         number: '14', title: 'Competitor Landscape' },
  { id: 'regulatory',         number: '15', title: 'Regulatory Landscape' },
  { id: 'future-outlook',     number: '16', title: 'Future Outlook' },
  { id: 'opportunities',      number: '17', title: 'Opportunities' },
  { id: 'macro',              number: '18', title: 'Macroeconomic Indicators' },
  { id: 'methodology',        number: '19', title: 'Methodology' },
  { id: 'toc',                number: '20', title: 'Table of Contents' },
  { id: 'faq',                number: '21', title: 'FAQs' },
];

export default function Phase2TestPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [slideshowVariant, setSlideshowVariant] = useState<SlideshowVariant>('light');

  return (
    <>
      <PageProgressBar />
      <DummyHeaderV04 mobileOpen={drawerOpen} onMobileOpenChange={setDrawerOpen} />
      <main id="main">
        <ReportHeroV04
          eyebrow="LOGISTICS · AUSTRALIA · 2022–2027"
          title="Australia Cold Chain Market Outlook 2022–2027"
          promise="Market size, segmentation, competitor landscape, growth drivers, and forecast outlook for Australia's cold chain industry."
          stats={[
            { icon: BarChart3, value: 'AUD 6,547.8 Mn', label: 'Market Size 2022' },
            { icon: TrendingUp, value: '10.03%', label: 'CAGR 2022-2027' },
            { icon: Globe, value: 'AUD 10,705 Mn', label: 'Forecast 2027' },
          ]}
        />

        {/* ─── 2-col body · SideTOC left · §01-§21 content right ─── */}
        <div className="bg-[var(--color-foundation-white,#ffffff)]">
          <div className="mx-auto max-w-[var(--container-page,1240px)] flex">
            <SideTOCV04
              sections={BODY_SECTIONS}
              scrollOffset={108}
              drawerOpen={drawerOpen}
              onDrawerOpenChange={setDrawerOpen}
            />

            {/* Right content col · §01-§21 report body sections */}
            <div className="flex-1 min-w-0">
              <div className="space-y-16 py-12 lg:py-16">
                {BODY_SECTIONS.map((s) => {
                  // §01 Executive Summary
                  if (s.id === 'executive-summary') {
                    return <ExecutiveSummarySection key={s.id} />;
                  }
                  // §02 Scope & Coverage · chip-card groups (matches CMS flat field shape)
                  if (s.id === 'scope') {
                    return <ScopeAndCoverageSection key={s.id} />;
                  }
                  // §06 Taxonomy · MindMap (matches CMS Taxonomy tree shape)
                  if (s.id === 'taxonomy') {
                    return <TaxonomySection key={s.id} />;
                  }
                  // §03 Country & Infrastructure · single-tab macro indicator cards
                  if (s.id === 'country-infra') {
                    return <CountryInfrastructureSection key={s.id} />;
                  }
                  // §04 Market Overview & Genesis · 3 tabs (Overview · Genesis · Seasonality)
                  if (s.id === 'market-overview') {
                    return <MarketOverviewGenesisSection key={s.id} />;
                  }
                  // §05 Definitions · accordion · 7 cold-chain terms (DS AccordionListTemplate)
                  if (s.id === 'definitions') {
                    return <DefinitionsSection key={s.id} />;
                  }
                  // §07 Market Ecosystem · 4 tabs (Cold Chain overview · Cold Storage tiers · Cold Transport · Associations)
                  if (s.id === 'ecosystem') {
                    return <EcosystemSection key={s.id} />;
                  }
                  // §08 Market Size & Growth · 2 tabs (Historical · Forecast) · ChartCard + Ken Charts
                  if (s.id === 'market-size') {
                    return <MarketSizeSection key={s.id} />;
                  }
                  // §09 Submarket Intelligence · 2 tabs (Cold Storage · Cold Transport) · canonical template
                  if (s.id === 'submarkets') {
                    return <SubmarketsSection key={s.id} />;
                  }
                  // §10 Segment Intelligence · 5 tabs (End-User · Temperature · Region · Reefer Truck · Domestic/Intl)
                  if (s.id === 'segmentation') {
                    return <SegmentationSection key={s.id} />;
                  }
                  // §11 Industry Analysis · 4 tabs (SWOT · Drivers · Challenges · Trends)
                  if (s.id === 'industry') {
                    return <IndustryAnalysisSection key={s.id} />;
                  }
                  // §12 End-User Deep Dives · 3 tabs (Sectors · Shelf-Life Matrix · Players & 3PL)
                  if (s.id === 'end-user') {
                    return <EndUserSection key={s.id} />;
                  }
                  // §13 Demand-Supply Gap · dual-bar demand vs supply + regional heatmap + callouts
                  if (s.id === 'ds-gap') {
                    return <DSGapSection key={s.id} />;
                  }
                  // §14 Competitor Landscape · bubble chart + property matrix
                  if (s.id === 'competitor') {
                    return <CompetitorLandscapeSection key={s.id} />;
                  }
                  // §15 Regulatory Landscape · 2 tabs (Regulators · Pipeline)
                  if (s.id === 'regulatory') {
                    return <RegulatoryLandscapeSection key={s.id} />;
                  }
                  // §16 Future Outlook · scenario fan chart + driver matrix + scenario cards
                  if (s.id === 'future-outlook') {
                    return <FutureOutlookSection key={s.id} />;
                  }
                  // §17 Opportunities · ranked 7-opportunity table · top-3 visible · bottom-4 gated
                  if (s.id === 'opportunities') {
                    return <OpportunitiesSection key={s.id} />;
                  }
                  // §18 Macroeconomic Indicators · 2 tabs (Snapshot 2024 · Trends 2018-2027)
                  if (s.id === 'macro') {
                    return <MacroeconomicSection key={s.id} />;
                  }
                  // §19 Methodology · process flow + pillars + sample composition donut
                  if (s.id === 'methodology') {
                    return <MethodologySection key={s.id} />;
                  }
                  // §20 Table of Contents · ChapterExtendedTOC with 3-phase view
                  if (s.id === 'toc') {
                    return <TOCSection key={s.id} />;
                  }
                  // §21 FAQs · 12 Q&A items · accordion · first 2 open
                  if (s.id === 'faq') {
                    return <FAQsSection key={s.id} />;
                  }
                  return null;
                })}
              </div>
            </div>
          </div>
        </div>

        {/* S9 2026-05-22 · §22 + §23 + §24 OUTSIDE 2-col body · full-width · no SideTOC chrome
            These escape the SideTOC layout · PageProgressBar tracks full document scroll. */}
        <ReportPreviewSlideshow
          variant={slideshowVariant}
          onVariantChange={setSlideshowVariant}
        />   {/* §22 · slideshow carousel · 2026-05-22 */}
        <RelatedReportsSection />  {/* §23 · full-width */}
        <GetFullAccessSection />   {/* §24 · full-width */}
      </main>
    </>
  );
}
