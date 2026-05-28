'use client';

/**
 * OpportunitiesSection — v0.4 §17 Opportunities
 *
 * @what  7-opportunity ranked table · McKinsey/CB Insights density · selective gating:
 *        - Inline narrative lede · 7 areas · top-3 TAM claim
 *        - MetricStrip: 4 stats (opportunity count · top-3 TAM · avg time-to-monetize · weighted score)
 *        - OpportunityRankingTable: 7 rows · top 3 visible · bottom 4 gated
 *        - SourceCluster (Ken Research analysis + industry interviews + macro models)
 *        - InsightBox closer: Pharma 3PL + IoT single-play vertical integration
 *
 * @why   Opportunity ranking is the highest-value section for enterprise buyers —
 *        it converts data → action. McKinsey / Bain / IBISWorld all lead opportunity
 *        sections with a ranked table + scoring rationale. Top-3 visible creates
 *        enough signal to establish credibility; bottom-4 gating creates lead hook.
 *
 * @when  v0.4 PDP body §17 · below §16 Future Outlook · above §18 Macro.
 *
 * Source: Ken Research analysis 2024 · industry interviews · macro models.
 *
 * @relatedDoc projects/v1-product-page-ver0.4/docs/CHARTS-TABLES-PATTERNS.md §4
 */

import { SectionLabel } from '@kenresearch/design-system/atoms';
import { MetricStrip } from '@/components/atoms/MetricStrip';
import { InsightBox } from '@/components/atoms/InsightBox';
import { SourceCluster } from '@/components/atoms/SourceCluster';
import { GatedBlock } from '@/components/atoms/GatedBlock';
import { PremiumLockCard } from '@/components/atoms/PremiumLockCard';
import { RankingTable, type RankingRow } from '@kenresearch/design-system/charts';
import { getSources } from '@/lib/sources';

// ─────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────

// S3-2026-05-22 · Dropped "7 opportunity areas" metric (redundant with prose lede)
// 3-up grid gives each remaining stat more breathing room · "AUD 1.8 Bn" fits one line
const METRICS = [
  {
    eyebrow: 'Top-3 combined TAM',
    value: '~AUD 1.8 Bn',
    descriptor: 'Pharma 3PL · IoT SaaS · Last-mile reefer',
  },
  {
    eyebrow: 'Avg time-to-monetize',
    value: '15.6 mo',
    descriptor: 'Across all 7 opportunities',
  },
  {
    eyebrow: 'Top weighted score',
    value: '8.7',
    descriptor: 'Pharma cold-chain 3PL · highest composite',
  },
];

// ─────────────────────────────────────────────────────────────────
// Data · Bug 5 fix (A.2 · 2026-05-25)
// Moved from OpportunityRankingTable local constant to section-level
// so RankingTable (DS component) can receive ALL rows in one array.
// Was: 2 separate <table> elements (top-3 + gated-4) → width mismatch + density mismatch
// Fix: single RankingTable + gatedContent slot for bottom-4 rows
// TODO: replace w/ real API — opportunity ranking endpoint
// ─────────────────────────────────────────────────────────────────

const RANKING_COLUMNS = {
  primaryMetric: 'TAM (AUD Mn)',
  score1: 'Impact (1-10)',
  score2: 'Feasibility (1-10)',
  chip: 'Time-to-monetize',
  weightedScore: 'Score',
};

const ALL_OPPORTUNITIES: RankingRow[] = [
  {
    rank: 1,
    name: 'Pharma cold-chain 3PL expansion',
    detail: 'TGA GDP-compliant 3PL offering for biologics + biosimilar distribution',
    primaryMetric: 820,
    primaryMetricPrefix: 'AUD',
    primaryMetricUnit: 'Mn',
    score1: 9.2,
    score2: 7.8,
    chipLabel: '18mo',
    chipUrgency: 'medium',
    weightedScore: 8.7,
  },
  {
    rank: 2,
    name: 'IoT temp-monitoring SaaS',
    detail: 'Real-time sensor + analytics platform sold to operators as managed service',
    primaryMetric: 560,
    primaryMetricPrefix: 'AUD',
    primaryMetricUnit: 'Mn',
    score1: 8.4,
    score2: 8.6,
    chipLabel: '12mo',
    chipUrgency: 'fast',
    weightedScore: 8.5,
  },
  {
    rank: 3,
    name: 'Last-mile reefer delivery',
    detail: 'Urban last-mile cold delivery for e-grocery + meal-kit + pharma DTC',
    primaryMetric: 420,
    primaryMetricPrefix: 'AUD',
    primaryMetricUnit: 'Mn',
    score1: 7.9,
    score2: 7.5,
    chipLabel: '14mo',
    chipUrgency: 'medium',
    weightedScore: 7.7,
  },
  {
    rank: 4,
    name: 'Regional distribution hub (Perth/Darwin)',
    detail: 'Greenfield hub in underserved WA/NT markets · long-term anchor contracts',
    primaryMetric: 310,
    primaryMetricPrefix: 'AUD',
    primaryMetricUnit: 'Mn',
    score1: 7.4,
    score2: 6.2,
    chipLabel: '30mo',
    chipUrgency: 'slow',
    weightedScore: 6.9,
  },
  {
    rank: 5,
    name: 'Frozen ready-meal logistics',
    detail: 'Dedicated frozen SKU logistics for meal-prep brands + QSR supply chains',
    primaryMetric: 230,
    primaryMetricPrefix: 'AUD',
    primaryMetricUnit: 'Mn',
    score1: 6.8,
    score2: 7.1,
    chipLabel: '9mo',
    chipUrgency: 'fast',
    weightedScore: 6.8,
  },
  {
    rank: 6,
    name: 'Cross-dock pallet pooling',
    detail: 'Shared pallet pooling network for regional cold-chain operators',
    primaryMetric: 185,
    primaryMetricPrefix: 'AUD',
    primaryMetricUnit: 'Mn',
    score1: 6.2,
    score2: 7.4,
    chipLabel: '8mo',
    chipUrgency: 'fast',
    weightedScore: 6.7,
  },
  {
    rank: 7,
    name: 'Renewable-energy reefer (solar/electric)',
    detail: 'Solar-powered storage + EV reefer fleet — ESG positioning + cost reduction',
    primaryMetric: 210,
    primaryMetricPrefix: 'AUD',
    primaryMetricUnit: 'Mn',
    score1: 6.5,
    score2: 5.8,
    chipLabel: '24mo',
    chipUrgency: 'slow',
    weightedScore: 6.2,
  },
];

const TOP_ROWS = ALL_OPPORTUNITIES.slice(0, 3);
const GATED_ROWS = ALL_OPPORTUNITIES.slice(3);

// ─────────────────────────────────────────────────────────────────
// Section
// ─────────────────────────────────────────────────────────────────

export function OpportunitiesSection() {
  return (
    <section
      id="opportunities"
      aria-labelledby="opportunities-heading"
      className="px-4 sm:px-6 lg:px-12 max-w-[1100px] mx-auto w-full scroll-mt-[120px]"
    >
      {/* Header */}
      <div className="inline-flex mb-3">
        <SectionLabel background="light" variant="accent">
          Section 17 · Opportunities
        </SectionLabel>
      </div>

      <h2
        id="opportunities-heading"
        className="font-display font-light text-[clamp(28px,3vw,39px)] leading-[1.15] tracking-[-0.015em] text-[var(--semantic-ink-strong)] mb-3"
      >
        Seven entry points — ranked by the only metric that matters
      </h2>

      {/* Lede */}
      <p
        className="font-body text-[var(--semantic-ink-body)] max-w-[64ch] mb-2"
        style={{ fontSize: '17px', lineHeight: 1.65 }}
      >
        <strong className="font-medium text-[var(--semantic-ink-strong)]">7 opportunity areas</strong>
        {' '}ranked by impact × feasibility —{' '}
        <strong className="font-medium text-[var(--semantic-ink-strong)]">top 3</strong>{' '}
        capture approximately{' '}
        <strong className="font-medium text-[var(--color-brand-red,#b01f24)]">AUD 1.8 Bn TAM</strong>
        {' '}across pharma 3PL expansion, IoT monitoring SaaS, and last-mile reefer delivery.
        Score = 0.5 × Impact + 0.3 × Feasibility + 0.2 × (1 – Time-penalty).
      </p>
      <p
        className="font-body italic text-[var(--semantic-ink-muted)] max-w-[60ch] mb-10"
        style={{ fontSize: '14px', lineHeight: 1.55 }}
      >
        Each opportunity is independently sized · not additive · operators can pursue in parallel.
      </p>

      {/* MetricStrip */}
      <div className="mb-12">
        <MetricStrip metrics={METRICS} columns={3} />
      </div>

      {/* Opportunity ranking table */}
      <div className="mb-8">
        <p
          className="font-body uppercase tracking-[0.12em] text-[var(--semantic-ink-muted)] mb-1.5"
          style={{ fontSize: '10px', fontWeight: 600 }}
        >
          Ranked opportunities · impact × feasibility · Australia Cold Chain 2024
        </p>
        <p
          className="font-body italic text-[var(--semantic-ink-muted)] mb-5"
          style={{ fontSize: '13px', lineHeight: 1.5 }}
        >
          Top 3 opportunities visible · access full table below.
        </p>
        {/* Bug 5 fix (A.2 · 2026-05-25): single RankingTable (DS component) replaces
            2 split <table> elements that had width mismatch (864px vs 830px) +
            density mismatch (45px vs 62px). gatedContent slot handles bottom-4 rows.
            Header opacity raised 0.45 → 0.60 (WCAG fix inside RankingTable). */}
        <RankingTable
          rows={TOP_ROWS}
          columns={RANKING_COLUMNS}
          topHighlightCount={3}
          density="standard"
          stickyHeader={true}
          ariaLabel="Opportunity ranking table · 7 Australia cold-chain opportunities"
          footnote="Weighted Score = 0.5 × Impact + 0.3 × Feasibility + 0.2 × (1 – Time-penalty) · Ken Research analysis 2024"
          gatedContent={
            <GatedBlock
              blurStrength={5}
              gauzeOpacity={0.45}
              lockCard={
                <PremiumLockCard
                  tier="lead"
                  variant="compact"
                  headline="See full 7-opportunity ranked table w/ TAM, score + time-to-monetize"
                  primaryCta={{ label: 'Talk to expert', href: '/contact-expert?ref=17-opp-ranking' }}
                />
              }
              className="mt-0 rounded-t-none border-t-0"
            >
              {/* Gated rows 4-7 · same column order as top table */}
              <table
                className="w-full min-w-[720px] font-body"
                aria-hidden="true"
                style={{ borderCollapse: 'collapse' }}
              >
                <tbody>
                  {GATED_ROWS.map((row) => (
                    <tr
                      key={row.rank}
                      className="border-b border-[rgba(0,0,0,0.08)]"
                      style={{ height: '40px' }}
                    >
                      <td className="py-2.5 pr-4 align-middle">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full font-body font-semibold text-[11px] bg-[rgba(0,0,0,0.04)] text-[var(--semantic-ink-muted)]">
                          {row.rank}
                        </span>
                      </td>
                      <td className="py-2.5 pr-5 align-middle min-w-[160px]">
                        <p className="font-body font-medium text-[var(--semantic-ink-strong)] leading-snug text-[13px] mb-0.5">{row.name}</p>
                        <p className="font-body text-[var(--semantic-ink-muted)] leading-snug text-[11px]">{row.detail}</p>
                      </td>
                      <td className="py-2.5 pr-5 align-middle text-right whitespace-nowrap">
                        <span className="font-body tabular-nums text-[var(--semantic-ink-body)] text-[13px]">
                          {row.primaryMetricPrefix} {row.primaryMetric.toLocaleString('en-US')} {row.primaryMetricUnit}
                        </span>
                      </td>
                      <td className="py-2.5 pr-5 align-middle">
                        <span className="font-body text-[var(--semantic-ink-body)] text-[12px]">{row.score1.toFixed(1)}</span>
                      </td>
                      <td className="py-2.5 pr-5 align-middle">
                        <span className="font-body text-[var(--semantic-ink-body)] text-[12px]">{row.score2.toFixed(1)}</span>
                      </td>
                      <td className="py-2.5 pr-5 align-middle">
                        <span className="font-body text-[11px]">{row.chipLabel}</span>
                      </td>
                      <td className="py-2.5 align-middle text-right">
                        <span className="font-body font-medium tabular-nums text-[var(--semantic-ink-body)] text-[13px]">{row.weightedScore.toFixed(1)}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </GatedBlock>
          }
        />
      </div>

      {/* SourceCluster */}
      <SourceCluster
        citations={getSources([
          'ken-primary-coldchain-2024',
          'ken-primary-pharma-2024',
          'ken-forecast-coldchain-2025',
          'industry-macro-forecast-2025',
          'tga-cold-chain-2023',
        ])}
        methodologyHref="#methodology"
        className="mb-12"
      />

      {/* InsightBox closer */}
      <InsightBox
        eyebrow="Analyst take · convergence play"
        lead="Pharma 3PL + IoT monitoring — single play, vertically integrate sub-AUD 80M acquisition target."
        body={
          <>
            The top-ranked opportunity (Pharma 3PL) and #2 (IoT SaaS) are complementary, not
            competing.{' '}
            <strong className="font-medium text-[var(--semantic-ink-strong)]">
              A TGA GDP-compliant 3PL operator
            </strong>{' '}
            that embeds real-time IoT temperature monitoring owns both the physical asset and the
            data layer — enabling SaaS margin on top of logistics revenue. Target: a regional
            pharma cold-chain operator at <strong className="font-medium text-[var(--semantic-ink-strong)]">
              sub-AUD 80M acquisition cost
            </strong>{' '}
            (2–3× EBITDA) with GPS + sensor infrastructure already in place.
            This is the play before a global 3PL captures the fragmented sub-scale operators.
          </>
        }
      />
    </section>
  );
}
