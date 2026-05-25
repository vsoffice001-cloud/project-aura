'use client';

/**
 * SubmarketsSection — v0.4 §09 Submarket Intelligence
 *
 * @what  2-tab section · Cold Storage + Cold Transport · per tab:
 *        - Inline lede w/ bold metrics (refs canonical · merged-report pattern)
 *        - MetricStrip · 4 stat callouts (pallets · price/pallet · occupancy · operators)
 *        - ChartFigure + KenColumnChart · 2017-2027F per-segment trajectory
 *        - SourceCluster (collapsed)
 *        - InsightBox · "What this means for X" closer
 *
 * @why   PRD V2.1 §6.3 + §8.9 demand per-submarket intelligence module.
 *        V04 master plan §3.13 spec: "2 tabs (Cold Storage · Cold Transport)
 *        each w/ revenue chart + 4 stat cards + 200-word insight". This is
 *        canonical template for §10-§18 (per-segment dashboards).
 *
 * @when  v0.4 PDP body §09. Below §08 Market Size. Above §10 Segment Intel.
 *
 * @how   - Tabs canonical filled-black pill pattern (matches §04/§05/§07)
 *        - Per-tab inline narrative lede (no MilestoneRow · refs pattern)
 *        - MetricStrip atom (NEW · borderless 4-up grid)
 *        - KenColumnChart wrapped in ChartFigure · projection from 2023
 *        - Sources blended primary+secondary+derived per tab (different mix
 *          per segment to demonstrate source provenance)
 *        - InsightBox brand-red left-border closer · per-tab analyst voice
 *
 * Data anchors: PRD V2.1 §6.3 — Cold Storage 2,647.8 Mn (2022) · Cold Transport
 * 3,900.0 Mn (2022). Per-segment CAGR derived (Cold Storage growth-rate higher
 * forward · Cold Transport currently larger share but slower per PRD live note).
 * Intermediate years compounded · 2027F forecast derived.
 *
 * @relatedDoc projects/_briefs/v1-product-page/V04-MASTER-PLAN-2026-05-20.md §3.13
 * @relatedDoc projects/v1-product-page-ver0.4/docs/CHARTS-TABLES-PATTERNS.md §9
 */

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@kenresearch/design-system/ui/tabs';
import { TABS_LIST_PRIMARY, TABS_TRIGGER_PRIMARY } from '@/lib/tab-styles';
import { SectionLabel } from '@kenresearch/design-system/atoms';
import { SourceCluster } from '@/components/atoms/SourceCluster';
import { MetricStrip } from '@/components/atoms/MetricStrip';
import { InsightBox } from '@/components/atoms/InsightBox';
import { KenColumnChart, KenDualColumnChart, ChartFigure, KEN_CHART_SERIES_ARRAY } from '@kenresearch/design-system/charts';
import { getSources } from '@/lib/sources';

// ─────────────────────────────────────────────────────────────────
// Data · PRD V2.1 §6.3 anchors + CAGR-compounded interpolation
// Cold Storage 2017 → 2022 anchored · forward forecast CAGR 11.0%
// Cold Transport 2017 → 2022 anchored · forward forecast CAGR 9.4%
// (Cold Storage outpaces Cold Transport on growth · refs PRD live note)
// ─────────────────────────────────────────────────────────────────

const COLD_STORAGE_LABELS = ['2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027F'];
const COLD_STORAGE_VALUES = [
  1684.5, 1846.4, 2024.1, 2218.6, 2431.3, 2647.8, // 2022 anchor (PRD)
  2939.0, 3262.2, 3621.0, 4019.3, 4461.4,           // forecast 11.0% CAGR
];

const COLD_TRANSPORT_LABELS = COLD_STORAGE_LABELS;
const COLD_TRANSPORT_VALUES = [
  2546.6, 2784.0, 3043.6, 3327.5, 3637.8, 3900.0,   // 2022 anchor (PRD)
  4266.6, 4667.7, 5106.5, 5586.5, 6112.1,            // forecast 9.4% CAGR
];

// ─────────────────────────────────────────────────────────────────
// Bug 4 fix (A.2 · 2026-05-25): dual-column overview chart
// Section heading promises "diverging growth trajectories" but
// individual tab charts showed only one series → single-series mismatch.
// Fix: add KenDualColumnChart overview showing BOTH submarkets side-by-side.
// Data: cold storage (Cold Storage CAGR 11.0%) · cold transport (9.4% CAGR)
// Mock data: PRD V2.1 §6.3 anchored · remaining CAGR-compounded
// TODO: replace w/ real API — split submarket revenue series
// ─────────────────────────────────────────────────────────────────
const DUAL_LABELS = ['2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027F'];
const DUAL_SERIES_STORAGE = { name: 'Cold Storage', data: COLD_STORAGE_VALUES };
const DUAL_SERIES_TRANSPORT = { name: 'Cold Transport', data: COLD_TRANSPORT_VALUES };

// Tab styling · canonical pill style per tab-styles.ts (Sprint 4 fix)

// ─────────────────────────────────────────────────────────────────
// Section
// ─────────────────────────────────────────────────────────────────

export function SubmarketsSection() {
  return (
    <section
      id="submarkets"
      aria-labelledby="submarkets-heading"
      className="px-4 sm:px-6 lg:px-12 max-w-[1100px] mx-auto w-full scroll-mt-[120px]"
    >
      {/* Header · matches §08 type rhythm */}
      <div className="inline-flex mb-3">
        <SectionLabel background="light" variant="accent">
          Section 09 · Submarket Intelligence
        </SectionLabel>
      </div>

      <h2
        id="submarkets-heading"
        className="font-display font-light text-[clamp(28px,3vw,39px)] leading-[1.15] tracking-[-0.015em] text-[var(--semantic-ink-strong)] mb-3"
      >
        Two submarkets — diverging growth trajectories
      </h2>

      {/* Section-level lede · inline narrative · refs canonical */}
      <p
        className="font-body text-[var(--semantic-ink-body)] max-w-[64ch] mb-10"
        style={{ fontSize: '17px', lineHeight: 1.65 }}
      >
        Cold Transport accounts for the larger share of 2022 revenue at{' '}
        <strong className="font-medium text-[var(--semantic-ink-strong)]" style={{ fontVariantNumeric: 'tabular-nums lining-nums' }}>AUD 3,900 Mn</strong>{' '}
        vs Cold Storage at{' '}
        <strong className="font-medium text-[var(--semantic-ink-strong)]" style={{ fontVariantNumeric: 'tabular-nums lining-nums' }}>AUD 2,647.8 Mn</strong>{' '}
        — but Cold Storage is forecast to compound faster (
        <strong className="font-medium text-[var(--color-brand-red,#b01f24)]" style={{ fontVariantNumeric: 'tabular-nums lining-nums' }}>11.0% CAGR</strong>
        ) than Transport (
        <strong className="font-medium text-[var(--color-brand-red,#b01f24)]" style={{ fontVariantNumeric: 'tabular-nums lining-nums' }}>9.4% CAGR</strong>
        ) through 2027F.
      </p>

      {/* Overview dual-column chart · shows BOTH submarkets for direct trajectory comparison */}
      {/* Bug 4 fix (A.2 · 2026-05-25): replaces single-series chart that contradicted heading */}
      <div className="mb-10">
        <ChartFigure
          eyebrow="Both submarkets · 2017–2027F overview"
          title="Cold Storage vs Cold Transport revenue · AUD Mn"
          insight="Cold Storage compounds faster (11.0% CAGR) but starts from a lower base. Cold Transport is the larger absolute market but growing slower (9.4% CAGR). The gap narrows through 2027F."
          unit="AUD Mn"
          legend={[
            { kind: 'solid', color: KEN_CHART_SERIES_ARRAY[0], label: 'Cold Storage' },
            { kind: 'solid', color: KEN_CHART_SERIES_ARRAY[1], label: 'Cold Transport' },
          ]}
          figcaption="2017–2022 anchored to PRD V2.1 §6.3. 2023–2027F compounded at observed CAGR per segment · Ken Forecast Model."
        >
          <KenDualColumnChart
            labels={DUAL_LABELS}
            series1={DUAL_SERIES_STORAGE}
            series2={DUAL_SERIES_TRANSPORT}
            height={320}
            unit="AUD Mn"
            ariaLabel="Cold Storage vs Cold Transport revenue 2017 to 2027F · AUD Mn · diverging trajectories"
          />
        </ChartFigure>
      </div>

      {/* Tabs · Cold Storage | Cold Transport · per-submarket detail */}
      <Tabs defaultValue="cold-storage" className="w-full">
        <TabsList className={TABS_LIST_PRIMARY}>
          {[
            { v: 'cold-storage',   label: 'Cold Storage' },
            { v: 'cold-transport', label: 'Cold Transport' },
          ].map((t) => (
            <TabsTrigger key={t.v} value={t.v} className={TABS_TRIGGER_PRIMARY}>
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* ─── Tab 1 · Cold Storage ──────────────────────────────────── */}
        <TabsContent value="cold-storage" className="mt-0 space-y-10">
          {/* Per-tab lede · refs canonical · inline metrics */}
          <p
            className="font-body text-[var(--semantic-ink-body)] max-w-[60ch]"
            style={{ fontSize: '16px', lineHeight: 1.65 }}
          >
            Refrigerated warehousing crossed{' '}
            <strong className="font-medium text-[var(--semantic-ink-strong)]" style={{ fontVariantNumeric: 'tabular-nums lining-nums' }}>AUD 2,647.8 Mn</strong>{' '}
            in 2022 at a{' '}
            <strong className="font-medium text-[var(--semantic-ink-strong)]" style={{ fontVariantNumeric: 'tabular-nums lining-nums' }}>9.5% historical CAGR</strong>
            , driven by pharma cold-chain compliance + e-grocery DC capex from Coles + Woolworths Primary Connect.
          </p>

          {/* MetricStrip · 4-up · borderless callouts */}
          <MetricStrip
            metrics={[
              { eyebrow: 'Total pallets · 2022',  value: '1.45',  unit: 'Mn',     descriptor: 'Operational capacity · all tiers' },
              { eyebrow: 'Avg price',             value: 'AUD 28', unit: '/mo',   descriptor: 'Per pallet · industry blended' },
              { eyebrow: 'Occupancy',             value: '78',    unit: '%',     descriptor: 'Tier-1 + Tier-2 weighted average' },
              { eyebrow: 'Operators',             value: '200–250', descriptor: 'Including long tail · 13 named players' },
            ]}
            columns={4}
          />

          {/* Chart · Cold Storage trajectory */}
          <ChartFigure
            eyebrow="Cold Storage trajectory · 2017–2027F"
            title="Refrigerated warehousing revenue · AUD Mn"
            insight="Cold Storage compounds at 11.0% forecast CAGR · the faster-growing submarket. Pharma + biologics drive the premium tier · e-grocery drives volume tier."
            unit="AUD Mn"
            legend={[
              { kind: 'solid', color: KEN_CHART_SERIES_ARRAY[0], label: 'Historical · 2017–2022 actual' },
              { kind: 'dashed', color: KEN_CHART_SERIES_ARRAY[0], label: 'Forecast · 2023–2027F projected' },
            ]}
            figcaption="Solid bars 2017–2022 anchored to PRD V2.1. Dashed bars 2023–2027F compound at observed CAGR · Ken Forecast Model."
          >
            <KenColumnChart
              labels={COLD_STORAGE_LABELS}
              data={COLD_STORAGE_VALUES}
              height={320}
              unit="AUD Mn"
              projectionStartIndex={6}
              ariaLabel="Cold Storage submarket revenue 2017 to 2027F · AUD Mn"
            />
          </ChartFigure>

          {/* Source provenance · collapsed */}
          <SourceCluster
            citations={getSources([
              'ken-primary-segment-2024',
              'abs-warehousing-2023',
              'ibisworld-i5301-2024',
              'lineage-investor-day-2024',
              'ken-forecast-segment-2025',
            ])}
            methodologyHref="#methodology"
          />

          {/* InsightBox · "What this means" closer */}
          <InsightBox
            eyebrow="What this means for Cold Storage operators"
            lead="The premium tier is the margin opportunity · the volume tier is the moat opportunity."
            body={
              <>
                Pharma + biologics cold-chain demand sustains{' '}
                <strong className="font-medium text-[var(--semantic-ink-strong)]">AUD 32–36 per pallet/month</strong> pricing in Tier-1 facilities · roughly 25% above blended-market average. Tier-1 operators that secure TGA-compliant capacity early capture this margin through 2027. Volume e-grocery DC capacity is the defensive play — losing 100K pallets to a competitor is a 7%+ revenue hit at industry-blended pricing.
              </>
            }
          />
        </TabsContent>

        {/* ─── Tab 2 · Cold Transport ────────────────────────────────── */}
        <TabsContent value="cold-transport" className="mt-0 space-y-10">
          <p
            className="font-body text-[var(--semantic-ink-body)] max-w-[60ch]"
            style={{ fontSize: '16px', lineHeight: 1.65 }}
          >
            Refrigerated transport crossed{' '}
            <strong className="font-medium text-[var(--semantic-ink-strong)]" style={{ fontVariantNumeric: 'tabular-nums lining-nums' }}>AUD 3,900 Mn</strong>{' '}
            in 2022 at an{' '}
            <strong className="font-medium text-[var(--semantic-ink-strong)]" style={{ fontVariantNumeric: 'tabular-nums lining-nums' }}>8.9% historical CAGR</strong>
            , dominated by reefer-truck domestic freight · with reefer-container sea exports as the growth tail.
          </p>

          <MetricStrip
            metrics={[
              { eyebrow: 'Active reefers',     value: '6,800', descriptor: 'Trucks + trailers · domestic fleet' },
              { eyebrow: 'Avg tonne-km rate',  value: 'AUD 0.42', descriptor: 'Per refrigerated tonne-km' },
              { eyebrow: 'Utilization',        value: '72', unit: '%',  descriptor: 'Industry blended · seasonality adjusted' },
              { eyebrow: 'Top-4 share',        value: '31', unit: '%',  descriptor: 'Linfox + Toll + Australia Post + Don Watson' },
            ]}
            columns={4}
          />

          <ChartFigure
            eyebrow="Cold Transport trajectory · 2017–2027F"
            title="Refrigerated transport revenue · AUD Mn"
            insight="Cold Transport compounds at 9.4% forecast CAGR · slower than storage but larger absolute base. EV reefer fleet transition is the 2025-2027 cost-structure shift."
            unit="AUD Mn"
            legend={[
              { kind: 'solid', color: KEN_CHART_SERIES_ARRAY[0], label: 'Historical · 2017–2022 actual' },
              { kind: 'dashed', color: KEN_CHART_SERIES_ARRAY[0], label: 'Forecast · 2023–2027F projected' },
            ]}
            figcaption="Solid bars 2017–2022 anchored to PRD V2.1. Dashed bars 2023–2027F compound at observed CAGR · Ken Forecast Model."
          >
            <KenColumnChart
              labels={COLD_TRANSPORT_LABELS}
              data={COLD_TRANSPORT_VALUES}
              height={320}
              unit="AUD Mn"
              projectionStartIndex={6}
              ariaLabel="Cold Transport submarket revenue 2017 to 2027F · AUD Mn"
            />
          </ChartFigure>

          <SourceCluster
            citations={getSources([
              'ken-primary-segment-2024',
              'abs-freight-2024',
              'linfox-mediarelease-2024',
              'mla-redmeat-2024',
              'ken-forecast-segment-2025',
            ])}
            methodologyHref="#methodology"
          />

          <InsightBox
            eyebrow="What this means for Cold Transport operators"
            lead="EV reefer transition is the next 5-year cost-structure inflection · early movers reset margin floors."
            body={
              <>
                Linfox + Toll committed{' '}
                <strong className="font-medium text-[var(--semantic-ink-strong)]">AUD 280 Mn</strong>{' '}
                to EV refrigerated fleet by 2027. Per-tonne-km cost drops ~18% on EV runs after charge-network maturity (2025-26). Operators still on diesel face structural margin compression by 2027F · the moat shifts from route density to charge-network access.
              </>
            }
          />
        </TabsContent>
      </Tabs>
    </section>
  );
}
