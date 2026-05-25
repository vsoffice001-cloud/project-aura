'use client';

/**
 * DSGapSection — v0.4 §13 Demand-Supply Gap
 *
 * @what  Single-view section (NO tabs · per V04 master plan §3.17):
 *        - Headline gap MetricStrip (current gap · 2027F gap · gap CAGR)
 *        - Dual-series ColumnChart · Demand vs Supply per year 2022-2027F
 *        - Heatmap by Region × Segment · regional gap heatmap (reuses OpportunityHeatmap)
 *        - Regional callout cards (2-up · top 2 supply-tight regions)
 *
 * @why   PRD V2.1 §5 item 18 + §7 specify demand-supply gap as added analysis
 *        module. Industry standard for D-S framing: paired demand/supply bars
 *        + regional heatmap (McKinsey + IBISWorld capacity analysis canonical).
 *
 * @when  v0.4 PDP body §13. Below §12 End-User · above §14 Competitor Landscape.
 *
 * @how   - NO tabs · single linear flow per V04 plan §3.17
 *        - MetricStrip 3-up · headline gap numbers
 *        - KenDualColumnChart · demand vs supply 6 years
 *        - OpportunityHeatmap 3×3 · regional supply-stress (Impact = capacity shortage · Likelihood = demand growth)
 *        - 2 callout cards · top supply-tight regions
 *        - InsightBox closer
 *
 * Source: PRD V2.1 §7 + §6.3 baseline · Ken Forecast Model gap projection ·
 * cross-validated w/ ABS warehousing + Coles/Woolworths capacity disclosures.
 *
 * @relatedDoc projects/_briefs/v1-product-page/V04-MASTER-PLAN-2026-05-20.md §3.17
 */

import { SectionLabel } from '@kenresearch/design-system/atoms';
import { SourceCluster } from '@/components/atoms/SourceCluster';
import { MetricStrip } from '@/components/atoms/MetricStrip';
import { InsightBox } from '@/components/atoms/InsightBox';
import { OpportunityHeatmap, type HeatmapItem } from '@/components/atoms/OpportunityHeatmap';
import { KenDualColumnChart, ChartFigure } from '@kenresearch/design-system/charts';
import { getSources } from '@/lib/sources';

// ─────────────────────────────────────────────────────────────────
// Data · PRD V2.1 §7 + Ken Forecast gap model
// Demand grows faster than supply through 2027 · gap widens
// ─────────────────────────────────────────────────────────────────

const LABELS = ['2022', '2023', '2024', '2025', '2026', '2027F'];

// Mn pallets · demand projected vs supply available
const DEMAND = [1.45, 1.59, 1.74, 1.91, 2.10, 2.31];   // 9.7% CAGR
const SUPPLY = [1.45, 1.55, 1.66, 1.78, 1.91, 2.06];   // 7.3% CAGR (lagged)

const GAP_CURRENT = '0.04 Mn';
const GAP_2027F = '0.25 Mn';
const GAP_CAGR = '+44.4%';

// Regional gap heatmap · Impact = capacity shortage severity · Likelihood = demand growth rate
const REGIONAL_GAPS: readonly HeatmapItem[] = [
  {
    id: 'sydney',
    label: 'Sydney metro',
    impact: 'high',
    likelihood: 'high',
    body: 'Highest demand growth (12% CAGR) + tightest existing capacity utilization (82%) · Sydney runs out of cold-storage headroom by 2025-26 absent Lineage + NewCold expansion.',
  },
  {
    id: 'melbourne',
    label: 'Melbourne metro',
    impact: 'medium',
    likelihood: 'high',
    body: 'NewCold Truganina + Lineage Melbourne capex addresses ~60% of projected gap by 2026 · residual gap concentrates in pharma + premium chiller tier.',
  },
  {
    id: 'brisbane',
    label: 'Brisbane metro',
    impact: 'high',
    likelihood: 'medium',
    body: 'Port-adjacent capacity stable but export reefer demand outpaces additions · 2026-27F gap concentrated in international cold transport.',
  },
  {
    id: 'perth',
    label: 'Perth + WA',
    impact: 'medium',
    likelihood: 'medium',
    body: 'Mining-adjacent supply chain demand stable · residual capacity from resource-cycle downturn absorbs growth · 2025-27F gap modest.',
  },
  {
    id: 'adelaide',
    label: 'Adelaide + SA',
    impact: 'low',
    likelihood: 'medium',
    body: 'Wine + horticulture export demand · capacity adequate · regional secondary tier · low absolute gap magnitude.',
  },
  {
    id: 'regional',
    label: 'Regional + rural',
    impact: 'low',
    likelihood: 'low',
    body: 'Distributed small-operator capacity meets local demand · long-tail Tier-3 consolidation absorbs slack · no structural gap.',
  },
];

// Top supply-tight regional callouts · 2-up cards
const TIGHT_REGION_CALLOUTS = [
  {
    region: 'Sydney metro',
    headline: 'Tightest cold-chain corridor through 2027F',
    body: 'Demand grows 12% CAGR · existing 82% utilization · 2025-26 inflection where supply additions must land OR pharma + premium retail face structural shortage.',
    metric: '+180,000',
    metricLabel: 'pallets · 2025-27F deficit absent expansion',
  },
  {
    region: 'Brisbane port-adjacent',
    headline: 'Export reefer transport bottleneck',
    body: 'International cold transport 11.4% CAGR concentrated at Fisherman Islands · port-side reefer capacity limits Asian protein export scaling above 2026 baseline.',
    metric: '+85,000',
    metricLabel: 'reefer-equiv. units · 2027F gap',
  },
];

// ─────────────────────────────────────────────────────────────────
// Section
// ─────────────────────────────────────────────────────────────────

export function DSGapSection() {
  return (
    <section
      id="ds-gap"
      aria-labelledby="ds-gap-heading"
      className="px-4 sm:px-6 lg:px-12 max-w-[1100px] mx-auto w-full scroll-mt-[120px]"
    >
      <div className="inline-flex mb-3">
        <SectionLabel background="light" variant="accent">
          Section 13 · Demand-Supply Gap
        </SectionLabel>
      </div>

      <h2
        id="ds-gap-heading"
        className="font-display font-light text-[clamp(28px,3vw,39px)] leading-[1.15] tracking-[-0.015em] text-[var(--semantic-ink-strong)] mb-3"
      >
        Demand outpaces supply · gap widens through 2027F
      </h2>

      <p
        className="font-body text-[var(--semantic-ink-body)] max-w-[64ch] mb-10"
        style={{ fontSize: '17px', lineHeight: 1.65 }}
      >
        Cold-chain demand compounds at{' '}
        <strong className="font-medium text-[var(--semantic-ink-strong)]" style={{ fontVariantNumeric: 'tabular-nums lining-nums' }}>9.7% CAGR</strong>{' '}
        while supply additions trail at{' '}
        <strong className="font-medium text-[var(--semantic-ink-strong)]" style={{ fontVariantNumeric: 'tabular-nums lining-nums' }}>7.3% CAGR</strong>
        . Headline gap{' '}
        <strong className="font-medium text-[var(--color-brand-red,#b01f24)]" style={{ fontVariantNumeric: 'tabular-nums lining-nums' }}>0.04 Mn pallets</strong>{' '}
        in 2022 widens to{' '}
        <strong className="font-medium text-[var(--color-brand-red,#b01f24)]" style={{ fontVariantNumeric: 'tabular-nums lining-nums' }}>0.25 Mn pallets</strong>{' '}
        by 2027F absent meaningful expansion capex.
      </p>

      {/* Headline gap metrics */}
      <MetricStrip
        className="mb-10"
        metrics={[
          { eyebrow: 'Current gap · 2022',   value: GAP_CURRENT, descriptor: 'Mn pallets · supply behind demand' },
          { eyebrow: '2027F gap',            value: GAP_2027F,   descriptor: 'Projected Mn pallets · Ken Forecast Model' },
          { eyebrow: 'Gap CAGR · 2022-27F',  value: GAP_CAGR,    descriptor: 'Year-over-year gap widening rate' },
        ]}
        columns={3}
        accent="last"
      />

      {/* Demand vs Supply trajectory chart */}
      <ChartFigure
        eyebrow="Demand vs supply · 2022–2027F"
        title="Cold-chain capacity trajectory · Mn pallets"
        insight="Demand bar (purple) outpaces supply bar (periwinkle) each year · gap visible as growing whitespace between paired columns through 2027F."
        unit="Mn pallets"
        legend={[
          { kind: 'solid', color: '#9488ec', label: 'Demand · projected' },
          { kind: 'solid', color: '#c3c6f9', label: 'Supply · available capacity' },
        ]}
        figcaption="Demand projection uses pharma + retail + export weighted CAGR (Ken Forecast Model). Supply additions from operator pipeline disclosures + ABS warehousing census + Coles/Woolworths capex announcements."
      >
        <KenDualColumnChart
          labels={LABELS}
          series1={{ name: 'Demand · projected', data: DEMAND }}
          series2={{ name: 'Supply · available', data: SUPPLY }}
          height={320}
          unit="Mn pallets"
          ariaLabel="Cold-chain demand vs supply 2022 to 2027F · Mn pallets"
        />
      </ChartFigure>

      {/* Regional gap heatmap */}
      <div className="mt-12">
        <ChartFigure
          eyebrow="Regional capacity stress · 2025-27F"
          title="Where the gap concentrates · 6 regions ranked"
          insight="Sydney metro sits top-right (critical · high capacity-shortage impact + high demand-growth likelihood). Click any region to expand its gap narrative."
          figcaption="3×3 matrix · Y-axis: capacity-shortage impact (low/med/high). X-axis: demand-growth likelihood. Ken Forecast Model regional gap projection 2025-27F."
        >
          <OpportunityHeatmap
            items={REGIONAL_GAPS}
            xLabel="Demand growth likelihood"
            yLabel="Capacity shortage impact"
          />
        </ChartFigure>
      </div>

      {/* Tight-region callouts · 2-up cards */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
        {TIGHT_REGION_CALLOUTS.map((c) => (
          <article
            key={c.region}
            className="border-l-2 border-[var(--color-brand-red,#b01f24)] pl-5 py-2"
          >
            <p
              className="font-body uppercase tracking-[0.12em] text-[var(--color-brand-red,#b01f24)] mb-2"
              style={{ fontSize: '10.5px', fontWeight: 700 }}
            >
              {c.region}
            </p>
            <h4
              className="font-display font-light text-[var(--semantic-ink-strong)] mb-3"
              style={{ fontSize: '18px', lineHeight: 1.3, letterSpacing: '-0.012em' }}
            >
              {c.headline}
            </h4>
            <div className="mb-3">
              <p
                className="font-display font-light text-[var(--color-brand-red,#b01f24)]"
                style={{ fontSize: '24px', lineHeight: 1, fontVariantNumeric: 'tabular-nums lining-nums', letterSpacing: '-0.02em' }}
              >
                {c.metric}
              </p>
              <p
                className="font-body italic text-[var(--semantic-ink-muted)] mt-1"
                style={{ fontSize: '11.5px', lineHeight: 1.45 }}
              >
                {c.metricLabel}
              </p>
            </div>
            <p className="font-body text-[var(--semantic-ink-body)]" style={{ fontSize: '13px', lineHeight: 1.55 }}>
              {c.body}
            </p>
          </article>
        ))}
      </div>

      {/* Sources */}
      <div className="mt-10">
        <SourceCluster
          citations={getSources([
            'ken-primary-coldchain-2024',
            'abs-warehousing-2023',
            'lineage-investor-day-2024',
            'newcold-website-2024',
            'coles-fy25h1-2025',
            'ken-forecast-coldchain-2025',
          ])}
          methodologyHref="#methodology"
        />
      </div>

      {/* Closer */}
      <div className="mt-10">
        <InsightBox
          eyebrow="What this means for operators + investors"
          lead="Supply additions are the rate-limit · pricing power shifts to operators that capex on time."
          body={
            <>
              Sydney + Brisbane metros are the rate-limit regions · operators that bring{' '}
              <strong className="font-medium text-[var(--semantic-ink-strong)]">+180K pallet capacity by 2025</strong>{' '}
              hold pricing power. Brand-owned (Coles + Woolworths) DC capex absorbs ~40% of projected gap · 3PL Tier-1 (Lineage + NewCold + Americold) carries the other 60%. Tier-3 operators face structural margin compression as demand-driven pricing power consolidates upward.
            </>
          }
        />
      </div>
    </section>
  );
}
