'use client';

/**
 * ReportDetailPage — Phase A (rows 1-7) + Phase B1 (rows 8-15) + Phase B2 (rows 16-23) + Phase C (rows 24-34) composer.
 * Server-component-friendly shell; individual sections are 'use client' where needed.
 *
 * Variant: editorial-A (editorial-light, warm/white alternation).
 * PRD recipe: design-system/recipes/report-detail.md.
 */

import type {
  ReportDetailV2,
  MarketOverviewModule as MarketOverviewModuleType,
  DefinitionsModule,
  TaxonomyModule,
  EcosystemModule,
  ChartModule,
  QuadrantModule,
  CardGridModule,
  FlowModule,
  IssueTableModule,
  MatrixModule,
  TimelineModule,
  NodesModule,
  MacroPanelModule,
} from '@/types/schema';
import { TopNavigation } from '@kenresearch/design-system/organisms';
import { Breadcrumb } from '@/components/sections/Breadcrumb';
import { ReportPDPHero } from '@/components/sections/ReportPDPHero';
import { ReportIntelligenceSnapshot } from '@/components/sections/ReportIntelligenceSnapshot';
import { StickyNavBar } from '@/components/sections/StickyNavBar';
import { KeyStatsStrip } from '@/components/sections/KeyStatsStrip';
import { ExecutiveSummaryModule } from '@/components/sections/ExecutiveSummaryModule';
// Phase B1 imports
import { ReportScopeModule } from '@/components/sections/ReportScopeModule';
import { MarketOverviewModule } from '@/components/sections/MarketOverviewModule';
import { MarketDefinitionsBlock } from '@/components/sections/MarketDefinitionsBlock';
import { TaxonomyTree } from '@/components/sections/TaxonomyTree';
import { EcosystemTierGrid } from '@/components/sections/EcosystemTierGrid';
import { MarketSizeChart } from '@/components/sections/MarketSizeChart';
import { InlineCTA1 } from '@/components/sections/InlineCTA1';
import { SegmentIntelligenceModule } from '@/components/sections/SegmentIntelligenceModule';
// Phase B2 imports
import { IndustryAnalysisModule } from '@/components/sections/IndustryAnalysisModule';
import { SWOTQuadrant } from '@/components/sections/SWOTQuadrant';
import { GrowthDriversCardGrid } from '@/components/sections/GrowthDriversCardGrid';
import { ValueChainStepper } from '@/components/sections/ValueChainStepper';
import { ChallengesSolutionsTable } from '@/components/sections/ChallengesSolutionsTable';
import { InlineCTA2 } from '@/components/sections/InlineCTA2';
import { CompetitorLandscapeModule } from '@/components/sections/CompetitorLandscapeModule';
import { RecentTrendsCardGrid } from '@/components/sections/RecentTrendsCardGrid';
// Phase C imports
import { EmergingTechNodes } from '@/components/sections/EmergingTechNodes';
import { RegulatoryCardStack } from '@/components/sections/RegulatoryCardStack';
import { FutureOutlookModule } from '@/components/sections/FutureOutlookModule';
import { MacroIndicatorPanel } from '@/components/sections/MacroIndicatorPanel';
import { MethodologyFlow } from '@/components/sections/MethodologyFlow';
import { TableOfContentsModule } from '@/components/sections/TableOfContentsModule';
import { ReportFAQ } from '@/components/sections/ReportFAQ';
import { RelatedReportsModule } from '@/components/sections/RelatedReportsModule';
import { ReportFactsBlock } from '@/components/sections/ReportFactsBlock';
import { FinalCTABlock } from '@/components/sections/FinalCTABlock';
import { Footer } from '@/components/sections/Footer';
import { StickyCTA } from '@/components/sections/StickyCTA';
import { ReadingProgressBar } from '@/components/sections/ReadingProgressBar';

// ── TopNavigation stub config ─────────────────────────────────────────────────
// TODO: replace w/ real nav config from CMS / nav-config.ts
// Minimal required props — logo, isAuthenticated, navigation callbacks.
const KEN_LOGO = (
  <span
    className="font-[var(--typography-family-display)] font-medium text-[var(--typography-size-base)] tracking-tight"
    aria-label="Ken Research"
  >
    Ken Research
  </span>
);

interface Props {
  report: ReportDetailV2;
}

export function ReportDetailPage({ report }: Props) {
  const slug = report.slug;

  // Derive nav sections from toc (showInNavigation=true)
  const navSections = (report.toc ?? [])
    .filter((e: import('@/types/schema').TocEntry) => e.showInNavigation)
    .map((e: import('@/types/schema').TocEntry) => ({ id: e.id, label: e.title }));

  // ── Phase B1 module helpers (all derived from report.modules[]) ─────────────
  const marketOverviewModule = report.modules.find(
    (m): m is MarketOverviewModuleType => m.type === 'marketOverview',
  ) ?? null;

  const definitionModules = report.modules.filter(
    (m): m is DefinitionsModule => m.type === 'definitions',
  );

  const taxonomyModule = report.modules.find(
    (m): m is TaxonomyModule => m.type === 'taxonomy',
  ) ?? null;

  const ecosystemModules = report.modules.filter(
    (m): m is EcosystemModule => m.type === 'ecosystem',
  );

  // Primary market-size chart = highest-priority chart in 'sizing' group
  const sizingCharts = report.modules.filter(
    (m): m is ChartModule =>
      m.type === 'chart' && (m.groupKey === 'sizing' || m.groupKey === 'overview'),
  ).sort((a, b) => b.priority - a.priority);
  const primarySizingChart = sizingCharts[0] ?? null;
  const subSizingCharts = sizingCharts.slice(1, 3); // cold-storage + cold-transport

  // Segmentation charts
  const segmentCharts = report.modules.filter(
    (m): m is ChartModule =>
      m.type === 'chart' && m.groupKey === 'segmentation',
  );

  // ── Phase B2 module helpers ────────────────────────────────────────────────
  // Row 17 — SWOT (quadrant variant='swot' in dynamics group)
  const swotModule = report.modules.find(
    (m): m is QuadrantModule =>
      m.type === 'quadrant' && (m as QuadrantModule).variant === 'swot',
  ) ?? null;

  // Row 18 — Growth Drivers (cardGrid variant='drivers')
  const growthDriversModule = report.modules.find(
    (m): m is CardGridModule =>
      m.type === 'cardGrid' && (m as CardGridModule).variant === 'drivers',
  ) ?? null;

  // Row 19 — Value Chain (flow variant='value-chain')
  const valueChainModule = report.modules.find(
    (m): m is FlowModule =>
      m.type === 'flow' && (m as FlowModule).variant === 'value-chain',
  ) ?? null;

  // Row 20 — Challenges & Solutions (issueTable)
  const challengesModule = report.modules.find(
    (m): m is IssueTableModule => m.type === 'issueTable',
  ) ?? null;

  // Row 22 — Competitor Landscape sources
  const competitorMarketShareChart = report.modules.find(
    (m): m is ChartModule =>
      m.type === 'chart' && m.groupKey === 'competition',
  ) ?? null;

  const competitorMatrix = report.modules.find(
    (m): m is MatrixModule =>
      m.type === 'matrix' && (m as MatrixModule).variant === 'comparison',
  ) ?? null;

  const positioningQuadrant = report.modules.find(
    (m): m is QuadrantModule =>
      m.type === 'quadrant' && (m as QuadrantModule).variant === 'positioning',
  ) ?? null;

  const competitorTimeline = report.modules.find(
    (m): m is TimelineModule => m.type === 'timeline',
  ) ?? null;

  // Row 23 — Recent Trends (cardGrid variant='trends')
  const recentTrendsModule = report.modules.find(
    (m): m is CardGridModule =>
      m.type === 'cardGrid' && (m as CardGridModule).variant === 'trends',
  ) ?? null;

  // ── Phase C module helpers ────────────────────────────────────────────────

  // Row 24 — Emerging Tech (nodes type='constellation')
  const emergingTechModule = report.modules.find(
    (m): m is NodesModule => m.type === 'nodes',
  ) ?? null;

  // Row 25 — Regulatory (cardGrid variant='regulatory')
  const regulatoryModule = report.modules.find(
    (m): m is CardGridModule =>
      m.type === 'cardGrid' && (m as CardGridModule).variant === 'regulatory',
  ) ?? null;

  // Row 26 — Future Outlook chart (groupKey='future')
  const futureOutlookChart = report.modules.find(
    (m): m is ChartModule =>
      m.type === 'chart' && m.groupKey === 'future',
  ) ?? null;

  // Row 27 — Macro Indicators (macroPanel)
  const macroModule = report.modules.find(
    (m): m is MacroPanelModule => m.type === 'macroPanel',
  ) ?? null;

  // Row 28 — Methodology (from top-level report.methodology)
  const methodologyData = report.methodology ?? null;

  return (
    <>
      {/* Row 1 — Navbar (white · CSS scroll) */}
      <TopNavigation
        logo={KEN_LOGO}
        isAuthenticated={false}
        user={null}
        onNavigate={(path) => {
          if (typeof window !== 'undefined') window.location.href = path;
        }}
        onSignOut={() => {}}
        items={[
          { id: 'industries', label: 'Industries' },
          { id: 'reports', label: 'Report Store' },
          { id: 'about', label: 'About' },
        ]}
      />

      {/* Row 2 — Breadcrumb (white · sm) */}
      <Breadcrumb crumbs={report.heroCockpit.breadcrumb} />

      {/* Rows 3-7 inside <main> */}
      <main id="pdp-main" className="xl:pl-0">
        {/* Row 3 — ReportPDPHero (warm-300 · xl) */}
        <ReportPDPHero
          cockpit={report.heroCockpit}
          authors={report.authors}
          reportSlug={slug}
        />

        {/* Row 4 — ReportIntelligenceSnapshot (white · lg) */}
        <ReportIntelligenceSnapshot snapshot={report.intelligenceSnapshot} />

        {/* Row 5 — StickyNavBar (sticky · CSS sticky + Framer) */}
        <StickyNavBar
          sections={navSections}
          reportTitle={report.title}
          reportSlug={slug}
        />

        {/* Row 6 — KeyStatsStrip (warm-300 · md) */}
        <KeyStatsStrip stats={report.keyStats} />

        {/* Row 7 — ExecutiveSummaryModule (white · lg) */}
        <ExecutiveSummaryModule
          summary={report.executiveSummary}
          reportSlug={slug}
        />

        {/* ── Phase B1 — rows 8-15 ─────────────────────────────────────────── */}

        {/* Row 8 — ReportScopeModule (warm-300 · lg) */}
        <ReportScopeModule scope={report.reportScope} />

        {/* Row 9 — MarketOverviewModule (white · lg) */}
        {marketOverviewModule && (
          <MarketOverviewModule overview={marketOverviewModule} />
        )}

        {/* Row 10 — MarketDefinitionsBlock (warm-300 · lg) */}
        {definitionModules.length > 0 && (
          <MarketDefinitionsBlock definitions={definitionModules} />
        )}

        {/* Row 11 — TaxonomyTree (white · lg) */}
        {taxonomyModule && <TaxonomyTree taxonomy={taxonomyModule} />}

        {/* Row 12 — EcosystemTierGrid (warm-300 · lg) */}
        {ecosystemModules.length > 0 && (
          <EcosystemTierGrid ecosystems={ecosystemModules} />
        )}

        {/* Row 13 — MarketSizeChart (white · lg) */}
        {primarySizingChart && (
          <MarketSizeChart
            module={primarySizingChart}
            subModules={subSizingCharts}
            reportSlug={slug}
          />
        )}

        {/* Row 14 — InlineCTA1 (warm-300 · sm) */}
        <InlineCTA1 reportSlug={slug} />

        {/* Row 15 — SegmentIntelligenceModule (white · lg) */}
        {segmentCharts.length > 0 && (
          <SegmentIntelligenceModule segments={segmentCharts} />
        )}

        {/* ── Phase B2 — rows 16-23 ─────────────────────────────────────────── */}

        {/* Row 16 — IndustryAnalysisModule (warm-300 · lg · header strip) */}
        <IndustryAnalysisModule />

        {/* Row 17 — SWOTQuadrant (white · lg · stagger 80ms) */}
        {swotModule && <SWOTQuadrant data={swotModule} reportSlug={slug} />}

        {/* Row 18 — GrowthDriversCardGrid (warm-300 · lg · CardReveal stagger 80ms) */}
        {growthDriversModule && (
          <GrowthDriversCardGrid drivers={growthDriversModule} />
        )}

        {/* Row 19 — ValueChainStepper (white · lg · reveal left-to-right) */}
        {valueChainModule && <ValueChainStepper stages={valueChainModule} reportSlug={slug} />}

        {/* Row 20 — ChallengesSolutionsTable (warm-300 · lg · stagger 60ms) */}
        {challengesModule && (
          <ChallengesSolutionsTable pairs={challengesModule} />
        )}

        {/* Row 21 — InlineCTA2 (white · sm · fade-up) */}
        <InlineCTA2 reportSlug={slug} />

        {/* Row 22 — CompetitorLandscapeModule (warm-300 · lg · fade-up) */}
        <CompetitorLandscapeModule
          marketShareChart={competitorMarketShareChart}
          comparisonMatrix={competitorMatrix}
          positioningQuadrant={positioningQuadrant}
          competitorTimeline={competitorTimeline}
          reportSlug={slug}
        />

        {/* Row 23 — RecentTrendsCardGrid (white · lg · CardReveal stagger 80ms) */}
        {recentTrendsModule && (
          <RecentTrendsCardGrid trends={recentTrendsModule} />
        )}

        {/* ── Phase C — rows 24-34 ─────────────────────────────────────────── */}

        {/* Row 24 — EmergingTechNodes (warm-300 · lg · node stagger 80ms) */}
        {emergingTechModule && (
          <EmergingTechNodes tech={emergingTechModule} />
        )}

        {/* Row 25 — RegulatoryCardStack (white · lg · stagger 60ms) */}
        {regulatoryModule && (
          <RegulatoryCardStack regulations={regulatoryModule} />
        )}

        {/* Row 26 — FutureOutlookModule (warm-300 · lg · chart fade-up) */}
        <FutureOutlookModule
          chart={futureOutlookChart}
          reportSlug={slug}
          marketSize="AUD 6,547.8 Mn"
          forecastValue="AUD 10,705.0 Mn"
          cagr="10.03%"
          period="2022-2027"
        />

        {/* Row 27 — MacroIndicatorPanel (white · lg · fade-up) */}
        {macroModule && (
          <MacroIndicatorPanel macro={macroModule} />
        )}

        {/* Row 28 — MethodologyFlow (warm-300 · lg · fade-up) */}
        <MethodologyFlow methodology={methodologyData} reportSlug={slug} />

        {/* Row 29 — TableOfContentsModule (white · lg · accordion) */}
        <TableOfContentsModule toc={report.toc} reportSlug={slug} />

        {/* Row 30 — ReportFAQ (warm-300 · lg · native details/summary) */}
        <ReportFAQ entries={report.faq} />

        {/* Row 31 — RelatedReportsModule (white · lg · scroll-snap carousel) */}
        <RelatedReportsModule related={report.related} />

        {/* Row 32 — ReportFactsBlock (warm-300 · md · RSC-compatible · GEO/AI) */}
        <ReportFactsBlock facts={report.reportFacts} answers={report.answerBlocks} />

        {/* Row 33 — FinalCTABlock (black · xl · cinematic-dark · fade-up) */}
        <FinalCTABlock reportSlug={slug} />
      </main>

      {/* Row 34 — Footer (black · shim) */}
      <Footer />

      {/* Root-mount fixed-position floaters */}
      <StickyCTA reportSlug={slug} />
      <ReadingProgressBar />
    </>
  );
}
