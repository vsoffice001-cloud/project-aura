'use client';

/**
 * CompetitorLandscapeSection — v0.4 §14 Competitor Landscape
 *
 * @what  Premium competitor intelligence view:
 *        - Inline narrative lede w/ bold metrics (refs canonical)
 *        - MetricStrip: 4 stats (# players · top-3 share · avg fleet age · HHI)
 *        - KenBubbleChart: x=revenue · y=growth · z=fleet capacity · 8-10 players
 *          · top-3 named · rest gated via PremiumLockCard compact overlay on lower half
 *        - PropertyTable: comparison matrix · top 3 visible · 2 cols gated
 *        - SourceCluster (IBISWorld · company filings · Ken estimate)
 *        - InsightBox closer: concentration play + 3PL pharma opportunity
 *
 * @why   PRD V2.1 §5.14 + competitor section spec. McKinsey/IBISWorld web-PDP
 *        density for competitor landscape: bubble positioning chart + structured
 *        comparison matrix is the dual-view standard for 3PL/logistics research.
 *
 * @when  v0.4 PDP body §14. Below §13 Demand-Supply Gap · above §15 Regulatory.
 *
 * Source: IBISWorld I5301 · company ASX/private filings · Ken Primary survey 2024.
 *
 * @relatedDoc projects/v1-product-page-ver0.4/docs/CHARTS-TABLES-PATTERNS.md §3.5
 * @relatedDoc projects/v1-product-page-ver0.4/docs/REF-PATTERNS-ADOPTION.md §5
 */

import { SectionLabel } from '@kenresearch/design-system/atoms';
import { MetricStrip } from '@/components/atoms/MetricStrip';
import { InsightBox } from '@/components/atoms/InsightBox';
import { SourceCluster } from '@/components/atoms/SourceCluster';
import { GatedBlock } from '@/components/atoms/GatedBlock';
import { PremiumLockCard } from '@/components/atoms/PremiumLockCard';
import {
  PropertyTable,
  type PlayerColumn,
  type PlayerProperty,
  KenBubbleChart,
  type BubblePoint,
  ChartFigure,
  KEN_CHART_SERIES_ARRAY,
} from '@kenresearch/design-system/charts';
import { getSources } from '@/lib/sources';

// ─────────────────────────────────────────────────────────────────
// Data · IBISWorld I5301 + company filings + Ken Primary survey 2024
// ─────────────────────────────────────────────────────────────────

const METRICS = [
  {
    eyebrow: 'Active operators',
    value: '200+',
    descriptor: 'Including long-tail Tier-3 regional',
  },
  {
    eyebrow: 'Top-3 revenue share',
    value: '~42%',
    descriptor: 'Linfox · Toll · Americold combined',
  },
  {
    eyebrow: 'Avg reefer fleet age',
    value: '7.2 yrs',
    descriptor: 'Industry weighted average · 2023',
  },
  {
    eyebrow: 'Market conc. (HHI)',
    value: '1,180',
    descriptor: 'Moderately concentrated · HHI <1,500',
  },
];

// x = revenue band AUD Mn (midpoint) · y = YoY revenue growth % · z = fleet capacity (pallets 000s)
// Top 3 named · rest gated blur applied below
const BUBBLE_DATA: BubblePoint[] = [
  { name: 'Linfox',         x: 850,  y: 8.2,  z: 280, color: KEN_CHART_SERIES_ARRAY[0] },
  { name: 'Toll Group',     x: 720,  y: 6.8,  z: 210, color: KEN_CHART_SERIES_ARRAY[0] },
  { name: 'Americold',      x: 480,  y: 11.4, z: 180, color: KEN_CHART_SERIES_ARRAY[1] },
  { name: 'NewCold',        x: 210,  y: 18.2, z: 95,  color: KEN_CHART_SERIES_ARRAY[2] },
  { name: 'Australia Post', x: 380,  y: 5.1,  z: 140, color: KEN_CHART_SERIES_ARRAY[2] },
  { name: 'OOCL Logistics', x: 160,  y: 7.4,  z: 58,  color: KEN_CHART_SERIES_ARRAY[3] },
  { name: 'Visy Logistics', x: 140,  y: 4.8,  z: 52,  color: KEN_CHART_SERIES_ARRAY[3] },
  { name: 'DP World Aus',   x: 120,  y: 9.1,  z: 44,  color: KEN_CHART_SERIES_ARRAY[4] },
  { name: 'Swire Cold',     x: 95,   y: 12.3, z: 36,  color: KEN_CHART_SERIES_ARRAY[4] },
];

// First 3 fully named · rest gated — split at index 3 for gated overlay
const VISIBLE_BUBBLE_COUNT = 3;

// PropertyTable data
const PROPERTIES: PlayerProperty[] = [
  { property: 'HQ',               sublabel: 'Primary base' },
  { property: 'Founded' },
  { property: 'Fleet size',       sublabel: 'Reefer units · est.' },
  { property: 'Temperature range' },
  { property: 'Pan-AU coverage' },
  { property: 'Tech stack',       sublabel: 'Key platform' },
  { property: 'Revenue band',     sublabel: 'AUD · FY24 est.' },
];

const PLAYERS: PlayerColumn[] = [
  {
    name: 'Linfox',
    descriptor: 'Private · Pratt family',
    values: [
      'Melbourne, VIC',
      '1956',
      '~1,800 reefer units',
      '-25°C to +18°C',
      'All states + NT',
      'SAP TM + Linfox Digital',
      'AUD 700–950 Mn',
    ],
  },
  {
    name: 'Toll Group',
    descriptor: 'Japan Post subsidiary',
    values: [
      'Melbourne, VIC',
      '1888',
      '~1,300 reefer units',
      '-20°C to +15°C',
      'All states',
      'TMS proprietary + SAP EWM',
      'AUD 600–780 Mn',
    ],
  },
  {
    name: 'Americold',
    descriptor: 'NYSE:COLD',
    values: [
      'Sydney, NSW',
      '1903 (US)',
      '~950 pallets · 6 DCs',
      '-30°C to +10°C (frozen + chilled)',
      'NSW · VIC · QLD · WA',
      'Americold OS · WMS proprietary',
      'AUD 420–530 Mn (AU rev)',
    ],
  },
  // Gated players (blurred)
  {
    name: 'NewCold',
    descriptor: 'Private · NL-HQ',
    gated: true,
    values: [
      'Melbourne, VIC',
      '2012',
      '~600 pallets · 2 DCs',
      '-25°C to +4°C (deep freeze focus)',
      'VIC · QLD (expanding)',
      'NewCold OS (proprietary · IoT-native)',
      'AUD 160–220 Mn',
    ],
  },
  {
    name: 'Australia Post',
    descriptor: 'Government enterprise',
    gated: true,
    values: [
      'Melbourne, VIC',
      '1809',
      '~750 reefer units',
      '+2°C to +8°C (parcel pharma focus)',
      'All states + territories',
      'StarTrack Cold proprietary',
      'AUD 310–390 Mn (cold-chain div)',
    ],
  },
];

const VISIBLE_PLAYERS = 3; // first 3 shown · rest gated

export function CompetitorLandscapeSection() {
  return (
    <section
      id="competitor"
      aria-labelledby="competitor-heading"
      className="px-4 sm:px-6 lg:px-12 max-w-[1100px] mx-auto w-full scroll-mt-[120px]"
    >
      {/* Header */}
      <div className="inline-flex mb-3">
        <SectionLabel background="light" variant="accent">
          Section 14 · Competitor Landscape
        </SectionLabel>
      </div>

      <h2
        id="competitor-heading"
        className="font-display font-light text-[clamp(28px,3vw,39px)] leading-[1.15] tracking-[-0.015em] text-[var(--semantic-ink-strong)] mb-3"
      >
        Concentrated at the top — fragmented in the tail
      </h2>

      {/* Lede · inline narrative w/ bold metrics · refs canonical */}
      <p
        className="font-body text-[var(--semantic-ink-body)] max-w-[64ch] mb-2"
        style={{ fontSize: '17px', lineHeight: 1.65 }}
      >
        <strong className="font-medium text-[var(--semantic-ink-strong)]">3 dominant 3PL players</strong>{' '}
        control ~<strong className="font-medium text-[var(--semantic-ink-strong)]">42%</strong> of Australia&apos;s
        reefer fleet capacity — Linfox, Toll, and Americold lock the pharma + major retail verticals.
        The remaining <strong className="font-medium text-[var(--semantic-ink-strong)]">200+ operators</strong>{' '}
        fragment across regional cold storage, specialist frozen, and emerging automated facilities.
        HHI of <strong className="font-medium text-[var(--semantic-ink-strong)]">1,180</strong> classifies
        as moderately concentrated — room for disruption remains concentrated in the niche temp and
        pharma compliance tiers.
      </p>
      <p
        className="font-body italic text-[var(--semantic-ink-muted)] max-w-[60ch] mb-10"
        style={{ fontSize: '14px', lineHeight: 1.55 }}
      >
        Market structure: scale-then-specialize — pure-play frozen is losing share to integrated cold-chain operators.
      </p>

      {/* MetricStrip · 4 stats */}
      <div className="mb-12">
        <MetricStrip metrics={METRICS} columns={4} accent={1} />
      </div>

      {/* Bubble chart · top 3 labeled · rest gated */}
      <div className="mb-4">
        <ChartFigure
          eyebrow="Competitor positioning · revenue × growth × fleet capacity"
          title="Australia cold chain · 3PL player landscape 2024"
          insight="NewCold and Swire Cold are the high-growth outliers — smaller revenue base but fastest capacity ramp rate. Linfox and Toll anchor on scale; pharma-specialist niche remains underserved."
          unit="AUD Mn revenue (x-axis)"
          legend={[
            { kind: 'dot', color: KEN_CHART_SERIES_ARRAY[0], label: 'Top-3 players · named' },
            { kind: 'dot', color: KEN_CHART_SERIES_ARRAY[2], label: 'Mid-tier · partial gated' },
            { kind: 'dot', color: KEN_CHART_SERIES_ARRAY[4], label: 'Emerging / niche · gated' },
          ]}
          figcaption="X = revenue band midpoint (AUD Mn) · Y = YoY revenue growth % · Bubble size = reefer pallet capacity (000s). Revenue estimates per Ken Primary survey + company filings."
        >
          {/* Full chart visible · bottom-half gated overlay */}
          <div className="relative">
            <KenBubbleChart
              data={BUBBLE_DATA}
              height={400}
              xAxisTitle="Revenue (AUD Mn)"
              yAxisTitle="Revenue growth (% YoY)"
              bubbleOpacity={0.55}
              showLabels={true}
              ariaLabel="Australia cold chain competitor bubble chart · revenue vs growth vs fleet capacity"
            />
            {/* Gated overlay · covers lower 50% where smaller players cluster */}
            <div
              className="absolute bottom-0 left-0 right-0"
              style={{ height: '50%' }}
            >
              <GatedBlock
                blurStrength={4}
                gauzeOpacity={0.5}
                lockCard={
                  <PremiumLockCard
                    tier="lead"
                    variant="compact"
                    headline={`${BUBBLE_DATA.length - VISIBLE_BUBBLE_COUNT} additional players · full positioning data`}
                    primaryCta={{ label: 'Talk to expert', href: '/contact-expert?ref=14-bubble-gated' }}
                  />
                }
              >
                {/* Invisible placeholder for grid stacking · actual chart above */}
                <div style={{ height: '160px' }} aria-hidden="true" />
              </GatedBlock>
            </div>
          </div>
        </ChartFigure>
      </div>

      {/* Sources + PropertyTable */}
      <SourceCluster
        citations={getSources([
          'ibisworld-competitor-2024',
          'company-filings-reefer-2024',
          'ken-primary-coldchain-2024',
          'ken-competitor-estimate-2024',
        ])}
        methodologyHref="#methodology"
        className="mb-10"
      />

      {/* PropertyTable · comparison matrix */}
      <div className="mb-3">
        <p
          className="font-body uppercase tracking-[0.12em] text-[var(--semantic-ink-subtle)] mb-3"
          style={{ fontSize: '10px', fontWeight: 600 }}
        >
          Player comparison · key properties
        </p>
        {/* Bug 6 fix (A.2 · 2026-05-25): row height was 72px — exceeds ref comfortable range (45-48px)
            Fix: density="comfortable" = 45px per KEN_TABLE_DENSITY · headerWash applied via DS TableShell */}
        <PropertyTable
          properties={PROPERTIES}
          players={PLAYERS}
          gatedFrom={VISIBLE_PLAYERS}
          density="comfortable"
        />
      </div>

      {/* InsightBox closer */}
      <div className="mt-12">
        <InsightBox
          eyebrow="Concentration play · what this means for cold-chain investors"
          lead="Linfox + Toll lock pharma · 3PL space wide open for niche temp."
          body={
            <>
              The top-3 concentration in pharma cold-chain limits competitive entry for generalist 3PLs.
              Niche temp (ultra-frozen biologics, vaccine cold-chain, premium seafood export) remains fragmented —
              the highest EBIT-margin tier with the lightest incumbent coverage.{' '}
              <strong className="font-medium text-[var(--semantic-ink-strong)]">NewCold&apos;s 18% growth rate</strong>{' '}
              vs Linfox&apos;s 8.2% signals where the structural shift is landing.
            </>
          }
        />
      </div>
    </section>
  );
}
