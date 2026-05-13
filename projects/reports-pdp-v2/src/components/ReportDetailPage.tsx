'use client';

/**
 * ReportDetailPage — FINAL compositor (Wave 4 · all 37 organisms)
 *
 * Render order (Wave 1 · 8 organisms):
 *   SkipLink · TopNavigation · Breadcrumb · ReportPDPHero
 *   ReportIntelligenceSnapshot · StickyNavBar · KeyStatsStrip
 *   ExecutiveSummaryModule · ReportScopeModule · MarketOverviewModule
 *
 * Render order (Wave 2 · 9 organisms):
 *   MarketDefinitionsBlock · TaxonomyTree · EcosystemTierGrid
 *   MarketSizeChart · InlineCTA1 · SegmentIntelligenceModule
 *   IndustryAnalysisModule (Wave 3 children)
 *
 * Render order (Wave 3 · standalone):
 *   InlineCTA2 · CompetitorLandscapeModule · RecentTrendsCardGrid
 *   EmergingTechNodes · RegulatoryCardStack
 *
 * Render order (Wave 4 · closing + overlays):
 *   FutureOutlookModule · MacroIndicatorPanel · MethodologyFlow
 *   TableOfContentsModule · ReportFAQ · RelatedReportsModule
 *   ReportFactsBlock · FinalCTABlock
 *   + overlays: StickyCTA · ReadingProgressBar
 */

import { SkipLink } from '@kenresearch/design-system/atoms';
import { TopNavigation } from '@kenresearch/design-system/organisms';
import type {
  ReportDetailV2,
  MarketOverviewModule as MarketOverviewModuleType,
  DefinitionsModule,
  TaxonomyModule,
  EcosystemModule,
  ChartModule,
} from '@/types/schema';

// Minimal nav logo for Wave 1 smoke-check
function KenLogo() {
  return (
    <span className="font-display font-light text-sm tracking-tight">
      Ken Research
    </span>
  );
}
import { Breadcrumb } from './sections/Breadcrumb';
import { ReportPDPHero } from './sections/ReportPDPHero';
import { ReportIntelligenceSnapshot } from './sections/ReportIntelligenceSnapshot';
import { StickyNavBar } from './sections/StickyNavBar';
import { KeyStatsStrip } from './sections/KeyStatsStrip';
import { ExecutiveSummaryModule } from './sections/ExecutiveSummaryModule';
import { ReportScopeModule } from './sections/ReportScopeModule';
import { MarketOverviewModule } from './sections/MarketOverviewModule';
// Wave 2 imports
import { MarketDefinitionsBlock, type DefinitionsModuleExtended } from './sections/MarketDefinitionsBlock';
import { TaxonomyTree } from './sections/TaxonomyTree';
import { EcosystemTierGrid } from './sections/EcosystemTierGrid';
import { MarketSizeChart } from './sections/MarketSizeChart';
import { InlineCTA1 } from './sections/InlineCTA1';
import { SegmentIntelligenceModule } from './sections/SegmentIntelligenceModule';
import { IndustryAnalysisModule } from './sections/IndustryAnalysisModule';
// Wave 3 imports — IndustryAnalysis children (no SectionWrapper)
import { SWOTQuadrant } from './sections/SWOTQuadrant';
import { GrowthDriversCardGrid } from './sections/GrowthDriversCardGrid';
import { ValueChainStepper } from './sections/ValueChainStepper';
import { ChallengesSolutionsTable } from './sections/ChallengesSolutionsTable';
// Wave 3 imports — standalone sections
import { InlineCTA2 } from './sections/InlineCTA2';
import { CompetitorLandscapeModule } from './sections/CompetitorLandscapeModule';
import type { CompetitorLandscape } from './sections/CompetitorLandscapeModule';
import { RecentTrendsCardGrid } from './sections/RecentTrendsCardGrid';
import { EmergingTechNodes } from './sections/EmergingTechNodes';
import { RegulatoryCardStack } from './sections/RegulatoryCardStack';
// Wave 4 imports — closing modules + overlays
import { FutureOutlookModule } from './sections/FutureOutlookModule';
import { MacroIndicatorPanel } from './sections/MacroIndicatorPanel';
import { MethodologyFlow } from './sections/MethodologyFlow';
import { TableOfContentsModule } from './sections/TableOfContentsModule';
import { ReportFAQ } from './sections/ReportFAQ';
import { RelatedReportsModule } from './sections/RelatedReportsModule';
import { ReportFactsBlock } from './sections/ReportFactsBlock';
import { FinalCTABlock } from './sections/FinalCTABlock';
import { StickyCTA } from './sections/StickyCTA';
import { ReadingProgressBar } from './sections/ReadingProgressBar';
import { SchemaInjector } from './SchemaInjector';
import type { QuadrantModule, CardGridModule, FlowModule, IssueTableModule, MatrixModule, NodesModule, MacroPanelModule } from '@/types/schema';
// ChartModule already imported above in Wave 1 types block

interface ReportDetailPageProps {
  report: ReportDetailV2;
}

export function ReportDetailPage({ report }: ReportDetailPageProps) {
  // ── Wave 1 module finds ───────────────────────────────────────────────────
  const marketOverviewMod = report.modules.find(
    (m): m is MarketOverviewModuleType => m.type === 'marketOverview',
  );

  // ── Wave 4 module finds ───────────────────────────────────────────────────
  const forecastChartMod = report.modules.find(
    (m): m is ChartModule => m.type === 'chart' && m.id === 'm-future-chain',
  );

  const macroPanelMod = report.modules.find(
    (m): m is MacroPanelModule => m.type === 'macroPanel',
  );

  // ── Wave 3 module finds ───────────────────────────────────────────────────
  const swotMod = report.modules.find(
    (m): m is QuadrantModule => m.type === 'quadrant' && (m as QuadrantModule).variant === 'swot',
  ) as QuadrantModule | undefined;

  const driversMod = report.modules.find(
    (m): m is CardGridModule => m.type === 'cardGrid' && (m as CardGridModule).variant === 'drivers',
  ) as CardGridModule | undefined;

  const valueChainMod = report.modules.find(
    (m): m is FlowModule => m.type === 'flow' && (m as FlowModule).variant === 'value-chain',
  ) as FlowModule | undefined;

  const challengesMod = report.modules.find(
    (m): m is IssueTableModule => m.type === 'issueTable',
  ) as IssueTableModule | undefined;

  const trendsMod = report.modules.find(
    (m): m is CardGridModule => m.type === 'cardGrid' && (m as CardGridModule).variant === 'trends',
  ) as CardGridModule | undefined;

  const emergingTechMod = report.modules.find(
    (m): m is NodesModule => m.type === 'nodes',
  ) as NodesModule | undefined;

  const regulatoryMod = report.modules.find(
    (m): m is CardGridModule => m.type === 'cardGrid' && (m as CardGridModule).variant === 'regulatory',
  ) as CardGridModule | undefined;

  const competitorMatrixMod = report.modules.find(
    (m): m is MatrixModule => m.type === 'matrix' && (m as MatrixModule).variant === 'comparison',
  ) as MatrixModule | undefined;

  // Build CompetitorLandscape from hero cockpit + matrix module
  const competitorLandscape: CompetitorLandscape = {
    overview:
      'Australia cold chain market has 200–250 active players. Highly fragmented with Lineage leading at 12.5% pallet share.', // TODO: backend wire
    totalPlayers: '200–250', // TODO: backend wire
    cards: competitorMatrixMod
      ? competitorMatrixMod.rows.map((row) => {
          const getName = (colId: string) =>
            row.cells.find((c) => c.columnId === colId)?.value;
          return {
            id: row.id,
            name: String(getName('name') ?? 'Unknown'),
            estYear: typeof getName('est') === 'number' ? (getName('est') as number) : undefined,
            services: String(getName('services') ?? ''),
            pallets: typeof getName('pallets') === 'number' ? (getName('pallets') as number) : undefined,
            occupancyPct: typeof getName('occupancy') === 'number' ? (getName('occupancy') as number) : undefined,
            facilities: typeof getName('warehouses') === 'number' ? (getName('warehouses') as number) : undefined,
            tech: getName('tech') ? String(getName('tech')) : undefined,
            marketSharePct: undefined, // TODO: backend wire — compute from pallet share chart
          };
        })
      : [],
    comparisonMatrix: competitorMatrixMod,
  };

  // ── Wave 2 module finds ───────────────────────────────────────────────────
  const definitionMods = report.modules.filter(
    (m): m is DefinitionsModule => m.type === 'definitions',
  ) as DefinitionsModuleExtended[];

  const taxonomyMod = report.modules.find(
    (m): m is TaxonomyModule => m.type === 'taxonomy',
  );

  const ecosystemMods = report.modules.filter(
    (m): m is EcosystemModule => m.type === 'ecosystem',
  );

  const marketSizeMod = report.modules.find(
    (m): m is ChartModule => m.type === 'chart' && m.id === 'm-chart-historic',
  );

  // Breadcrumb crumbs from heroCockpit
  const breadcrumbs = report.heroCockpit.breadcrumb;

  return (
    <>
      {/* Schema JSON-LD — server-rendered structured data (PRD §44) */}
      <SchemaInjector schemaMeta={report.schemaMeta} faq={report.faq} />

      {/* Skip link — a11y: keyboard users skip to main content */}
      <SkipLink targetId="pdp-main" label="Skip to report content" />

      {/* DS TopNavigation — canonical navbar */}
      <TopNavigation
        logo={<KenLogo />}
        isAuthenticated={false}
        onNavigate={(path) => { window.location.href = path; }}
        onSignOut={() => { /* no-op for Wave 1 */ }}
      />

      {/* TopNavigation's built-in SkipLink targets #main-content · alias span here */}
      <span id="main-content" aria-hidden="true" />

      <main id="pdp-main" tabIndex={-1}>
        {/* 1. Breadcrumb — white / sm */}
        <Breadcrumb crumbs={breadcrumbs} />

        {/* 2. ReportPDPHero — warm / xl */}
        <ReportPDPHero
          cockpit={report.heroCockpit}
          authors={report.authors}
          reportSlug={report.slug}
        />

        {/* 3. ReportIntelligenceSnapshot — white / lg */}
        <ReportIntelligenceSnapshot snapshot={report.intelligenceSnapshot} />

        {/* 4. StickyNavBar — sticky / no SectionWrapper */}
        <StickyNavBar sections={report.toc} reportSlug={report.slug} />

        {/* 5. KeyStatsStrip — warm / md */}
        <KeyStatsStrip stats={report.keyStats} reportSlug={report.slug} />

        {/* 6. ExecutiveSummaryModule — white / lg */}
        <ExecutiveSummaryModule summary={report.executiveSummary} reportSlug={report.slug} />

        {/* 7. ReportScopeModule — warm / lg */}
        <ReportScopeModule scope={report.reportScope} />

        {/* 8. MarketOverviewModule — white / lg */}
        {marketOverviewMod && (
          <MarketOverviewModule module={marketOverviewMod} reportSlug={report.slug} />
        )}

        {/* ── Wave 2 organisms ─────────────────────────────────────────────── */}

        {/* 9. MarketDefinitionsBlock — warm / lg */}
        {definitionMods.length > 0 && (
          <MarketDefinitionsBlock definitions={definitionMods} />
        )}

        {/* 10. TaxonomyTree — white / lg */}
        {taxonomyMod && (
          <TaxonomyTree taxonomy={taxonomyMod} reportSlug={report.slug} />
        )}

        {/* 11. EcosystemTierGrid — warm / lg */}
        {ecosystemMods.length > 0 && (
          <EcosystemTierGrid ecosystem={ecosystemMods} reportSlug={report.slug} />
        )}

        {/* 12. MarketSizeChart — white / lg (ChartCard sits inside) */}
        <MarketSizeChart data={marketSizeMod} reportSlug={report.slug} />

        {/* 13. InlineCTA1 — warm / sm */}
        <InlineCTA1 reportSlug={report.slug} />

        {/* 14. SegmentIntelligenceModule — white / lg */}
        <SegmentIntelligenceModule reportSlug={report.slug} />

        {/* 15. IndustryAnalysisModule — warm / lg — Wave 3 children */}
        <IndustryAnalysisModule>
          {swotMod && <SWOTQuadrant swot={swotMod} />}
          {driversMod && <GrowthDriversCardGrid drivers={driversMod} />}
          {valueChainMod && <ValueChainStepper stages={valueChainMod} />}
          {challengesMod && <ChallengesSolutionsTable rows={challengesMod} />}
        </IndustryAnalysisModule>

        {/* ── Wave 3 standalone sections ────────────────────────────────────── */}

        {/* 16. InlineCTA2 — white / sm */}
        <InlineCTA2 reportSlug={report.slug} />

        {/* 17. CompetitorLandscapeModule — warm / lg (CompetitorComparisonTable nested inside) */}
        <CompetitorLandscapeModule
          landscape={competitorLandscape}
          reportSlug={report.slug}
        />

        {/* 18. RecentTrendsCardGrid — white / lg */}
        {trendsMod && (
          <RecentTrendsCardGrid trends={trendsMod} />
        )}

        {/* 19. EmergingTechNodes — warm / lg */}
        {emergingTechMod && (
          <EmergingTechNodes techs={emergingTechMod} />
        )}

        {/* 20. RegulatoryCardStack — white / lg */}
        {regulatoryMod && (
          <RegulatoryCardStack
            regulations={regulatoryMod}
            reportSlug={report.slug}
          />
        )}

        {/* ── Wave 4: Closing modules ──────────────────────────────────────── */}

        {/* 26. FutureOutlookModule — warm / lg */}
        <FutureOutlookModule
          forecastChart={forecastChartMod}
          reportSlug={report.slug}
        />

        {/* 27. MacroIndicatorPanel — white / lg */}
        <MacroIndicatorPanel
          macroModule={macroPanelMod}
          reportSlug={report.slug}
        />

        {/* 28. MethodologyFlow — warm / lg */}
        <MethodologyFlow
          methodology={report.methodology}
          reportSlug={report.slug}
        />

        {/* 29. TableOfContentsModule — white / lg */}
        <TableOfContentsModule
          toc={report.toc}
          reportSlug={report.slug}
        />

        {/* 30. ReportFAQ — warm / lg */}
        <ReportFAQ
          faq={report.faq}
          reportSlug={report.slug}
        />

        {/* 31. RelatedReportsModule — white / lg */}
        <RelatedReportsModule reports={report.related} />

        {/* 32. ReportFactsBlock — warm / md */}
        <ReportFactsBlock
          facts={report.reportFacts}
          answers={report.answerBlocks}
        />

        {/* 33. FinalCTABlock — black / xl */}
        <FinalCTABlock reportSlug={report.slug} />

      </main>

      {/* Footer shim — kenresearch.com owns site footer per 2026-05-12 decision */}
      <footer
        className="py-8 text-center text-compact"
        style={{ backgroundColor: 'var(--color-foundation-white)', borderTop: '1px solid var(--border-soft)', color: 'var(--surface-text-muted)' }}
        aria-label="Site footer"
      >
        <p>© 2026 Ken Research Pvt. Ltd. · All rights reserved.</p>
      </footer>

      {/* ── Overlays (outside <main>) ────────────────────────────────────── */}

      {/* 36. StickyCTA — always-on bottom mobile / right rail desktop */}
      <StickyCTA />

      {/* 37. ReadingProgressBar — fixed top · hidden over hero */}
      <ReadingProgressBar />
    </>
  );
}
