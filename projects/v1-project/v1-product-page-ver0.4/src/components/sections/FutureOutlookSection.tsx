'use client';

/**
 * FutureOutlookSection — v0.4 §16 Future Outlook
 *
 * @what  Scenario-driven forward-looking section:
 *        - Inline narrative lede w/ 3-scenario framing (refs canonical)
 *        - MetricStrip: 4 stats (base CAGR · bull CAGR · bear CAGR · forecast confidence)
 *        - KenScenarioFanChart: 3-scenario area-spline 2022–2027
 *        - ScenarioDriverMatrix: 3-col Bear/Base/Bull × 5 driver rows
 *        - 3 scenario cards: 1 visible (base) · 2 gated (bear + bull detail)
 *        - SourceCluster (Ken projections · macro models · industry forecasts)
 *        - InsightBox closer: pharma + reefer electrification as base→bull tipping point
 *
 * @why   PRD V2.1 §5.16 + outlook section spec. Oxford Economics / Ken forecast
 *        model. 3-scenario fan is the canonical format for 5-yr market projections
 *        in B2B research (McKinsey Scenarios · IBISWorld outlook modules ·
 *        Forrester Wave outlook). Driver matrix lets stakeholders map their
 *        own assumptions to a scenario.
 *
 * @when  v0.4 PDP body §16. Below §15 Regulatory · above §17 Opportunities.
 *
 * Source: Ken Forecast Model 2025 · Oxford Economics 2025 · Industry forecasts.
 *
 * @relatedDoc projects/v1-product-page-ver0.4/docs/CHARTS-TABLES-PATTERNS.md §3.7
 */

import { SectionLabel } from '@kenresearch/design-system/atoms';
import { MetricStrip } from '@/components/atoms/MetricStrip';
import { InsightBox } from '@/components/atoms/InsightBox';
import { SourceCluster } from '@/components/atoms/SourceCluster';
import { GatedBlock } from '@/components/atoms/GatedBlock';
import { PremiumLockCard } from '@/components/atoms/PremiumLockCard';
import { ScenarioDriverMatrix, type ScenarioDriver } from '@/components/atoms/ScenarioDriverMatrix';
import { KenScenarioFanChart, ChartFigure, KEN_CHART_SERIES_ARRAY } from '@kenresearch/design-system/charts';
import { getSources } from '@/lib/sources';

// ─────────────────────────────────────────────────────────────────
// Data · Ken Forecast Model 2025 + Oxford Economics
// Base 10.3% CAGR · Bear 7.1% · Bull 13.8%
// Anchor: 2022 = AUD 6,547.8 Mn (actual)
// ─────────────────────────────────────────────────────────────────

const LABELS = ['2022', '2023', '2024', '2025', '2026F', '2027F'];

// Base 10.3% CAGR from 6547.8
const BASE_DATA = [6548, 7223, 7965, 8786, 9690, 10705];
// Bear 7.1% CAGR from 6547.8
const BEAR_DATA = [6548, 7013, 7511, 8044, 8611, 9218];
// Bull 13.8% CAGR from 6547.8
const BULL_DATA = [6548, 7451, 8479, 9649, 10981, 12497];

const METRICS = [
  {
    eyebrow: 'Base CAGR · 2022–2027',
    value: '10.3%',
    descriptor: 'Structural demand acceleration',
  },
  {
    eyebrow: 'Bull CAGR · upside',
    value: '13.8%',
    descriptor: 'Pharma + EV fleet + export surge',
  },
  {
    eyebrow: 'Bear CAGR · downside',
    value: '7.1%',
    descriptor: 'Macro slowdown + regulatory drag',
  },
  {
    eyebrow: 'Forecast confidence',
    value: '74%',
    descriptor: 'Base case · analyst-rated',
  },
];

// Scenario driver matrix · 5 driver categories
const SCENARIO_DRIVERS: ScenarioDriver[] = [
  {
    category: 'Macro',
    descriptor: 'GDP · consumer spend · trade',
    bear: { direction: '↓', label: 'GDP contraction · import slowdown' },
    base: { direction: '→', label: 'Steady 2.8% GDP growth · stable trade' },
    bull: { direction: '↑↑', label: 'Export boom · China re-engagement' },
  },
  {
    category: 'Tech adoption',
    descriptor: 'Automation · IoT · cold-chain SaaS',
    bear: { direction: '↓', label: 'Adoption delayed · capex constrained' },
    base: { direction: '↑', label: 'IoT + WMS adoption moderate pace' },
    bull: { direction: '↑↑', label: 'Rapid automation · EV reefer fleet ramp' },
  },
  {
    category: 'Regulatory',
    descriptor: 'FSC 3.2.2 · TGA GDP · compliance',
    bear: { direction: '↓↓', label: 'High compliance cost · operator exit' },
    base: { direction: '→', label: 'Compliance absorbed · tech migration' },
    bull: { direction: '↑', label: 'Regulatory moat · premium pricing power' },
  },
  {
    category: 'Trade · export',
    descriptor: 'Meat · seafood · dairy export volumes',
    bear: { direction: '↓', label: 'Ag trade headwinds · currency risk' },
    base: { direction: '↑', label: 'Steady export CAGR 5-7% · key proteins' },
    bull: { direction: '↑↑', label: 'Asia-Pacific demand surge · new routes' },
  },
  {
    category: 'Consumer',
    descriptor: 'E-grocery · pharma · premium retail',
    bear: { direction: '↓', label: 'E-grocery growth stalls · basket contraction' },
    base: { direction: '↑', label: 'Pharma biologics + e-grocery steady ramp' },
    bull: { direction: '↑↑', label: 'Pharma biologics accelerate · premium retail' },
  },
];

// Scenario summary cards · 1 visible (base) · 2 gated (bear/bull)
interface ScenarioCard {
  scenario: 'Bear' | 'Base' | 'Bull';
  cagr: string;
  target: string;
  drivers: string[];
  color: string;
}

const SCENARIO_CARDS: ScenarioCard[] = [
  {
    scenario: 'Base',
    cagr: '10.3%',
    target: 'AUD 10.7 Bn by 2027F',
    drivers: [
      'Pharma biologics cold-chain expanding 14% YoY',
      'E-grocery fulfillment capacity adds 120k+ pallets 2024–26',
      'Lineage + NewCold expansion absorbs structural demand growth',
    ],
    color: KEN_CHART_SERIES_ARRAY[0],
  },
  {
    scenario: 'Bull',
    cagr: '13.8%',
    target: 'AUD 12.5 Bn by 2027F',
    drivers: [
      'China ag-import re-engagement accelerates protein exports',
      'EV reefer fleet ramp drops transport COGS 12–18%',
      'Biosimilars + vaccine cold-chain creates new demand tier',
    ],
    color: KEN_CHART_SERIES_ARRAY[3],
  },
  {
    scenario: 'Bear',
    cagr: '7.1%',
    target: 'AUD 9.2 Bn by 2027F',
    drivers: [
      'RBA rate cycle delays operator capex · supply lag widens',
      'FSC 3.2.2 compliance cost forces Tier-3 operator exit',
      'E-grocery growth plateaus at 8% vs 15% base assumption',
    ],
    color: KEN_CHART_SERIES_ARRAY[2],
  },
];

function ScenarioSummaryCard({ card }: { card: ScenarioCard }) {
  return (
    <article
      className="border-l-[3px] pl-5 py-2"
      style={{ borderColor: card.color }}
      aria-label={`${card.scenario} scenario · ${card.cagr} CAGR · ${card.target}`}
    >
      <div className="flex items-baseline gap-3 mb-2 flex-wrap">
        <p
          className="font-body font-semibold uppercase tracking-[0.1em] text-[var(--semantic-ink-strong)]"
          style={{ fontSize: '11px' }}
        >
          {card.scenario}
        </p>
        <p
          className="font-display font-light tabular-nums"
          style={{ fontSize: 'clamp(22px,2.5vw,30px)', color: card.color, letterSpacing: '-0.02em' }}
        >
          {card.cagr}
        </p>
        <p
          className="font-body italic text-[var(--semantic-ink-muted)]"
          style={{ fontSize: '13px' }}
        >
          CAGR · {card.target}
        </p>
      </div>
      <ul className="space-y-1.5">
        {card.drivers.map((d, i) => (
          <li
            key={i}
            className="flex items-start gap-2 font-body text-[var(--semantic-ink-body)]"
            style={{ fontSize: '12.5px', lineHeight: 1.5 }}
          >
            <span
              aria-hidden="true"
              className="inline-block flex-none rounded-full mt-[7px]"
              style={{ width: '4px', height: '4px', background: card.color }}
            />
            {d}
          </li>
        ))}
      </ul>
    </article>
  );
}

export function FutureOutlookSection() {
  const baseCard = SCENARIO_CARDS.find((c) => c.scenario === 'Base')!;
  const gatedCards = SCENARIO_CARDS.filter((c) => c.scenario !== 'Base');

  return (
    <section
      id="future-outlook"
      aria-labelledby="future-outlook-heading"
      className="px-4 sm:px-6 lg:px-12 max-w-[1100px] mx-auto w-full scroll-mt-[120px]"
    >
      {/* Header */}
      <div className="inline-flex mb-3">
        <SectionLabel background="light" variant="accent">
          Section 16 · Future Outlook
        </SectionLabel>
      </div>

      <h2
        id="future-outlook-heading"
        className="font-display font-light text-[clamp(28px,3vw,39px)] leading-[1.15] tracking-[-0.015em] text-[var(--semantic-ink-strong)] mb-3"
      >
        Three futures — one structural growth story
      </h2>

      {/* Lede · scenario framing · refs canonical */}
      <p
        className="font-body text-[var(--semantic-ink-body)] max-w-[64ch] mb-2"
        style={{ fontSize: '17px', lineHeight: 1.65 }}
      >
        <strong className="font-medium text-[var(--semantic-ink-strong)]">3 futures · 5-year window</strong>{' '}
        — the base case projects Australia&apos;s cold chain reaching{' '}
        <strong className="font-medium text-[var(--color-brand-red,#b01f24)]">AUD 10.7 Bn by 2027</strong>{' '}
        at a <strong className="font-medium text-[var(--color-brand-red,#b01f24)]">10.3% CAGR</strong>.
        The bull scenario adds pharma-biologics acceleration + reefer fleet electrification to push the
        market toward{' '}
        <strong className="font-medium text-[var(--semantic-ink-strong)]">AUD 12.5 Bn at 13.8% CAGR</strong>.
        The bear scenario — macro slowdown + regulatory compliance drag — still delivers{' '}
        <strong className="font-medium text-[var(--semantic-ink-strong)]">7.1% growth to AUD 9.2 Bn</strong>,
        confirming structural demand regardless of scenario.
      </p>
      <p
        className="font-body italic text-[var(--semantic-ink-muted)] max-w-[60ch] mb-10"
        style={{ fontSize: '14px', lineHeight: 1.55 }}
      >
        All scenarios point upward — the question is how fast and which segments capture the delta.
      </p>

      {/* MetricStrip · 4 stats */}
      <div className="mb-12">
        <MetricStrip metrics={METRICS} columns={4} accent={0} />
      </div>

      {/* Scenario fan chart */}
      <div className="mb-4">
        <ChartFigure
          eyebrow="3-scenario projection · 2022–2027"
          title="Australia cold chain market · Bear / Base / Bull scenarios"
          insight="Base case (solid line) tracks structural demand growth at 10.3% CAGR. Bull and Bear scenarios bound the uncertainty fan — all three converge above 2022 actuals by 2027F."
          unit="AUD Mn"
          legend={[
            { kind: 'line', color: KEN_CHART_SERIES_ARRAY[0], label: 'Base · 10.3% CAGR (solid)' },
            { kind: 'dashed', color: KEN_CHART_SERIES_ARRAY[3], label: 'Bull · 13.8% CAGR (dashed)' },
            { kind: 'dashed', color: KEN_CHART_SERIES_ARRAY[2], label: 'Bear · 7.1% CAGR (dashed)' },
          ]}
          figcaption="2022 anchor = AUD 6,547.8 Mn (Ken Primary + ABS actual). 2023–2027F projected per Ken Forecast Model Monte Carlo overlay. Fan shading represents uncertainty band between Bear and Bull scenarios."
        >
          <KenScenarioFanChart
            labels={LABELS}
            bearData={BEAR_DATA}
            baseData={BASE_DATA}
            bullData={BULL_DATA}
            height={380}
            unit="AUD Mn"
            ariaLabel="Australia Cold Chain 3-scenario fan chart · Bear / Base / Bull 2022–2027"
          />
        </ChartFigure>
      </div>

      {/* SourceCluster */}
      <SourceCluster
        citations={getSources([
          'ken-scenario-forecast-2025',
          'ken-forecast-coldchain-2025',
          'industry-macro-forecast-2025',
          'ken-primary-coldchain-2024',
        ])}
        methodologyHref="#methodology"
        className="mb-12"
      />

      {/* Scenario Driver Matrix */}
      <div className="mb-12">
        <p
          className="font-body uppercase tracking-[0.12em] text-[var(--semantic-ink-subtle)] mb-1.5"
          style={{ fontSize: '10px', fontWeight: 600 }}
        >
          Driver assumptions by scenario
        </p>
        <p
          className="font-body italic text-[var(--semantic-ink-muted)] mb-5"
          style={{ fontSize: '13px', lineHeight: 1.5 }}
        >
          How each macro and sector driver changes across Bear / Base / Bull scenarios.
        </p>
        <ScenarioDriverMatrix drivers={SCENARIO_DRIVERS} />
      </div>

      {/* Scenario summary cards · 1 visible · 2 gated */}
      <div className="mb-12">
        <p
          className="font-body uppercase tracking-[0.12em] text-[var(--semantic-ink-subtle)] mb-5"
          style={{ fontSize: '10px', fontWeight: 600 }}
        >
          Scenario details · key drivers
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Base card · always visible */}
          <ScenarioSummaryCard card={baseCard} />

          {/* Bull card · gated */}
          <GatedBlock
            blurStrength={5}
            lockCard={
              <PremiumLockCard
                tier="lead"
                variant="compact"
                headline="Bull scenario drivers + assumptions"
                primaryCta={{ label: 'Talk to expert', href: '/contact-expert?ref=16-bull-scenario' }}
              />
            }
          >
            <ScenarioSummaryCard card={gatedCards[0]} />
          </GatedBlock>

          {/* Bear card · gated */}
          <GatedBlock
            blurStrength={5}
            lockCard={
              <PremiumLockCard
                tier="lead"
                variant="compact"
                headline="Bear scenario drivers + assumptions"
                primaryCta={{ label: 'Talk to expert', href: '/contact-expert?ref=16-bear-scenario' }}
              />
            }
          >
            <ScenarioSummaryCard card={gatedCards[1]} />
          </GatedBlock>
        </div>
      </div>

      {/* InsightBox closer */}
      <InsightBox
        eyebrow="Watch · base→bull tipping point indicators"
        lead="Pharma demand + reefer fleet electrification = base→bull tipping point Q4-2025."
        body={
          <>
            Two catalysts accelerate the market from base to bull before 2026:{' '}
            (1) <strong className="font-medium text-[var(--semantic-ink-strong)]">Pharma biologics</strong> — if
            TGA ARTG approvals for domestic biosimilar manufacturing accelerate, cold-chain demand from
            pharma distribution adds 1.2–1.8% to effective market CAGR. (2){' '}
            <strong className="font-medium text-[var(--semantic-ink-strong)]">EV reefer fleet rollout</strong>{' '}
            — Linfox + Toll&apos;s AUD 280 Mn EV fleet commitment (2024–2027) structurally lowers cold-transport
            COGS, enabling price competition that expands addressable end-user markets. Watch Q4-2025
            fleet deployment data + TGA biosimilar approval pipeline as leading indicators.
          </>
        }
      />
    </section>
  );
}
