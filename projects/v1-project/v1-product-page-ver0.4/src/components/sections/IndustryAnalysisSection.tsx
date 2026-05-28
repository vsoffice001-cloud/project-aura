'use client';

/**
 * IndustryAnalysisSection — v0.4 §11 Industry Analysis
 *
 * @what  4-tab section (V04 master plan §3.15):
 *        - SWOT · 2×2 typographic grid (Strengths · Weaknesses · Opportunities · Threats)
 *        - Drivers · 4 driver cards w/ impact badges
 *        - Challenges · 4 challenge-solution paired cards
 *        - Trends & Tech · 4 trend cards (IoT · digitization · e-commerce · sustainability)
 *
 * @why   Industry context · narrative-led · NOT chart section. Refs canonical
 *        (rainbow-pothos zone insights · merged-report 3-source convergence)
 *        use typographic emphasis over data viz for industry analysis. Cards
 *        w/ minimal chrome · brand-red accents for impact level.
 *
 * @when  v0.4 PDP body §11. Below §10 Segment Intelligence · above §12 End-User.
 *
 * @how   - 4 canonical filled-black pill tabs
 *        - SWOT 2×2 inline CSS grid (no new molecule · anti-bloat · promote later)
 *        - Each quadrant: eyebrow + 3-4 bullet points · brand-red dot
 *        - Drivers/Challenges/Trends: card-grid 2-up @ md · 4-up @ lg
 *        - InsightBox section closer · per-tab analyst voice
 *
 * Source: PRD V2.1 §6 + Ken Primary industry survey (Q3-Q4 2024) + live page
 * driver list ("Strong end user demand · meat/seafood/dairy · rising consumption
 * · e-commerce popularity"). SWOT derived via Ken analyst judgment + cross-ref
 * w/ §07 Ecosystem competitor profile + §10 Segmentation breakdown.
 *
 * @relatedDoc projects/_briefs/v1-product-page/V04-MASTER-PLAN-2026-05-20.md §3.15
 */

import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@kenresearch/design-system/ui/tabs';
import { TABS_LIST_PRIMARY, TABS_TRIGGER_PRIMARY } from '@/lib/tab-styles';
import { SectionLabel } from '@kenresearch/design-system/atoms';
import { SourceCluster } from '@/components/atoms/SourceCluster';
import { InsightBox } from '@/components/atoms/InsightBox';
import { SwotMatrix } from '@/components/atoms/SwotMatrix';
import { SwotMatrixSimple } from '@/components/atoms/SwotMatrixSimple';
import { SwotMatrixImpact, type ImpactPoint } from '@/components/atoms/SwotMatrixImpact';
import { TowsCrosswalk } from '@/components/atoms/TowsCrosswalk';
import { OpportunityHeatmap, type HeatmapItem } from '@/components/atoms/OpportunityHeatmap';
import { KenBarChart, KenBubbleChart, ChartFigure } from '@kenresearch/design-system/charts';
import { getSources } from '@/lib/sources';

// ─────────────────────────────────────────────────────────────────
// Data · SWOT (derived) · Drivers + Challenges + Trends (PRD + live page)
// ─────────────────────────────────────────────────────────────────

const SWOT = {
  strengths: {
    label: 'Strengths',
    points: [
      'Geographic advantage · island-nation logistics moat',
      'Established Tier-1 operators (Lineage · Americold · NewCold) w/ 25%+ share',
      'TGA-compliant pharma cold-chain expertise · premium pricing tier',
      'Strong export demand from meat + dairy verticals',
    ],
  },
  weaknesses: {
    label: 'Weaknesses',
    points: [
      'High energy + diesel cost structure vs APAC peers',
      'Fragmented long tail · 200+ small operators · low scale economies',
      'Pre-EV reefer fleet → 5-yr capex headwind (AUD 280 Mn committed)',
      'Limited regional cold-chain infrastructure outside top-3 metros',
    ],
  },
  opportunities: {
    label: 'Opportunities',
    points: [
      'Pharma + biologics cold-chain demand · 12.4% CAGR through 2027',
      'EV reefer transition · early movers reset margin floors 2025-27',
      'Asian protein export growth · International cold transport 11.4% CAGR',
      'Coles + Woolworths Primary Connect DC capex → automation play',
    ],
  },
  threats: {
    label: 'Threats',
    points: [
      'Energy price volatility · 18-22% of opex for frozen operators',
      'Carbon compliance costs · NSW + Vic scope-3 reporting from 2026',
      'Consolidation pressure on Tier-3 operators · roll-up by Tier-1+2',
      'Climate stress on Sydney basin cold-chain corridor by 2027',
    ],
  },
} as const;

// Drivers w/ impact score 1-10 · ranked horizontal bars (industry standard per
// IBISWorld/Statista/McKinsey driver lists). Score = analyst judgment from
// PRD CAGR contribution + Ken Primary survey weighting.
const DRIVERS = [
  {
    label: 'Strong end-user demand · meat/seafood/dairy',
    score: 9.2,
    impact: 'High',
    body: 'Meat & seafood + dairy + pharma drive 70%+ of revenue · sustained AUD growth through 2027.',
  },
  {
    label: 'E-grocery acceleration · Coles + Woolworths',
    score: 8.7,
    impact: 'High',
    body: 'Coles + Woolworths refrigerated DC capex doubled 2020-24 · last-mile reefer volume up 38% post-COVID.',
  },
  {
    label: 'Pharma cold-chain compliance · TGA 2023',
    score: 8.4,
    impact: 'High',
    body: 'TGA Cold Chain Guideline 2023 enforces facility audit cycles · creates Tier-1 operator moat.',
  },
  {
    label: 'Export protein demand · East Asia + Middle East',
    score: 7.1,
    impact: 'Medium',
    body: 'Beef + lamb + dairy exports to East Asia + Middle East · International cold transport 11.4% CAGR.',
  },
  {
    label: 'EV reefer transition · cost-structure reset',
    score: 6.5,
    impact: 'Medium',
    body: 'Linfox + Toll AUD 280 Mn EV commitment 2025-27 · early movers reset margin floors.',
  },
];

// Challenges scored on Impact × Likelihood 3×3 (Gartner risk-matrix canonical).
// Both axes analyst-judgment · documented from Ken Primary + PRD §9 risk factors.
const CHALLENGES: readonly HeatmapItem[] = [
  {
    id: 'energy',
    label: 'Energy cost volatility',
    impact: 'high',
    likelihood: 'high',
    body: 'EV reefer transition + on-site solar reduce frozen opex 18-22% by 2027. Operators not on transition path face structural margin compression.',
  },
  {
    id: 'carbon',
    label: 'Carbon compliance · scope-3 from 2026',
    impact: 'high',
    likelihood: 'medium',
    body: 'NSW + Vic scope-3 reporting mandates 2026 · audit-ready Tier-1s capture FMCG + pharma contracts w/ ESG commitments.',
  },
  {
    id: 'consolidation',
    label: 'Long-tail fragmentation · Tier-3 roll-up',
    impact: 'medium',
    likelihood: 'high',
    body: 'Tier-1+2 consolidation roll-up · 25.6% → 35% combined share by 2027F · Tier-3 operators face structural margin compression + M&A pressure.',
  },
  {
    id: 'regional',
    label: 'Regional infrastructure gap',
    impact: 'medium',
    likelihood: 'medium',
    body: 'Lineage + NewCold port-adjacent expansion · Brisbane + Melbourne capex 2024-26 · regional cities outside top-3 metros remain underserved.',
  },
  {
    id: 'climate',
    label: 'Climate stress on Sydney corridor',
    impact: 'high',
    likelihood: 'low',
    body: 'Heatwave + bushfire stress on Sydney basin cold-chain corridor by 2027 · low likelihood near-term but high impact when realized.',
  },
  {
    id: 'talent',
    label: 'Cold-chain talent shortage',
    impact: 'medium',
    likelihood: 'low',
    body: 'Specialized refrigeration engineers + TGA-trained QA staff in short supply · low-likelihood gradual constraint.',
  },
];

// Trends positioned on Impact × Time-to-mainstream (McKinsey/PwC tech-trends pattern).
// X = years to mainstream (0-1 = now · 2 = 2-3yr · 3 = 5+yr) · Y = business impact 1-10 · Z = market opportunity scale
const TRENDS = [
  {
    label: 'IoT + telematics',
    timeToMainstream: 0.5,   // already in adoption
    impactScore: 7.2,
    magnitude: 35,            // relative market opportunity
    body: 'Per-pallet temperature + GPS tracking now standard on Tier-1 reefer fleets · creates audit trail for TGA + customer contracts.',
  },
  {
    label: 'Warehouse automation',
    timeToMainstream: 1.5,
    impactScore: 8.6,
    magnitude: 60,
    body: 'ASRS + robotic pick-pack lines in next-gen DCs · Coles Wetherill Park + NewCold Truganina lead operational deployment.',
  },
  {
    label: 'E-commerce last-mile',
    timeToMainstream: 0.8,
    impactScore: 8.1,
    magnitude: 50,
    body: 'Direct-to-consumer frozen + chilled fulfillment · drives mid-size reefer fleet growth + suburban micro-fulfillment centers.',
  },
  {
    label: 'Sustainability + ESG',
    timeToMainstream: 2.2,
    impactScore: 7.8,
    magnitude: 45,
    body: 'Refrigerant transition (HFC → CO2 + ammonia) · EV reefer fleet · solar-on-roof DCs · scope-3 emissions reporting mandatory 2026.',
  },
  {
    label: 'EV reefer fleet',
    timeToMainstream: 1.8,
    impactScore: 8.3,
    magnitude: 55,
    body: 'Linfox + Toll AUD 280 Mn commitment 2025-27 · mid-size class first · TCO parity 2026 · heavy class follows 2027+.',
  },
  {
    label: 'Blockchain traceability',
    timeToMainstream: 3.0,
    impactScore: 5.4,
    magnitude: 18,
    body: 'Provenance + custody chain for pharma + premium protein exports · adoption slow · mostly pilots · long-tail commercialization.',
  },
];

// ─────────────────────────────────────────────────────────────────
// SWOT impact-annotated data · for SwotMatrixImpact variant
// (analyst-judgment 3-tier · documented · refs canonical for scored SWOT)
// ─────────────────────────────────────────────────────────────────

const SWOT_IMPACT = {
  strengths: {
    label: 'Strengths',
    points: [
      { text: 'Geographic advantage · island-nation logistics moat', impact: 'high' as const },
      { text: 'Established Tier-1 operators (Lineage · Americold · NewCold) w/ 25%+ share', impact: 'high' as const },
      { text: 'TGA-compliant pharma cold-chain expertise · premium pricing tier', impact: 'medium' as const },
      { text: 'Strong export demand from meat + dairy verticals', impact: 'medium' as const },
    ] satisfies readonly ImpactPoint[],
  },
  weaknesses: {
    label: 'Weaknesses',
    points: [
      { text: 'High energy + diesel cost structure vs APAC peers', impact: 'high' as const },
      { text: 'Pre-EV reefer fleet → 5-yr capex headwind (AUD 280 Mn committed)', impact: 'high' as const },
      { text: 'Fragmented long tail · 200+ small operators · low scale economies', impact: 'medium' as const },
      { text: 'Limited regional cold-chain infrastructure outside top-3 metros', impact: 'low' as const },
    ] satisfies readonly ImpactPoint[],
  },
  opportunities: {
    label: 'Opportunities',
    points: [
      { text: 'Pharma + biologics cold-chain demand · 12.4% CAGR through 2027', impact: 'high' as const },
      { text: 'EV reefer transition · early movers reset margin floors 2025-27', impact: 'high' as const },
      { text: 'Asian protein export growth · International cold transport 11.4% CAGR', impact: 'medium' as const },
      { text: 'Coles + Woolworths Primary Connect DC capex → automation play', impact: 'medium' as const },
    ] satisfies readonly ImpactPoint[],
  },
  threats: {
    label: 'Threats',
    points: [
      { text: 'Energy price volatility · 18-22% of opex for frozen operators', impact: 'high' as const },
      { text: 'Carbon compliance costs · NSW + Vic scope-3 reporting from 2026', impact: 'medium' as const },
      { text: 'Consolidation pressure on Tier-3 operators · roll-up by Tier-1+2', impact: 'medium' as const },
      { text: 'Climate stress on Sydney basin cold-chain corridor by 2027', impact: 'low' as const },
    ] satisfies readonly ImpactPoint[],
  },
};

// ─────────────────────────────────────────────────────────────────
// TOWS crosswalk data · 4 strategic intersection cells
// SO = Leverage strengths to capture opportunities
// ST = Defend strengths against threats
// WO = Improve weaknesses by pursuing opportunities
// WT = Avoid · minimize weaknesses + dodge threats
// ─────────────────────────────────────────────────────────────────

const TOWS = {
  so: {
    title: 'Leverage',
    strategies: [
      'Use Tier-1 scale + TGA expertise to capture 12.4% pharma CAGR',
      'Apply geographic moat to Asian protein export · 11.4% int\'l transport CAGR',
      'Re-deploy Lineage capacity into Coles/Woolworths DC automation contracts',
    ],
  },
  st: {
    title: 'Defend',
    strategies: [
      'Lock multi-year energy contracts via Tier-1 negotiating leverage',
      'Use TGA + scope-3 audit-readiness as Tier-1 differentiation vs entrants',
      'Build climate-resilient Sydney capacity additions to maintain corridor moat',
    ],
  },
  wo: {
    title: 'Improve',
    strategies: [
      'EV reefer capex transition · convert weakness to 2025-27 cost-floor advantage',
      'Roll-up Tier-3 long tail to address fragmentation · capture economies',
      'Add port-adjacent regional capacity to close metro-only infrastructure gap',
    ],
  },
  wt: {
    title: 'Avoid',
    strategies: [
      'Exit sub-scale regional routes vulnerable to climate stress + low margin',
      'Avoid pure-diesel fleet expansion · structural cost compression by 2027',
      'Defer capex on facilities w/o scope-3 audit pathway · stranded asset risk',
    ],
  },
};

// ─────────────────────────────────────────────────────────────────
// Tab styling · canonical
// ─────────────────────────────────────────────────────────────────

// Tab styling · canonical pill style per tab-styles.ts (Sprint 4 fix)

// SwotQuadrant inline removed 2026-05-21 · replaced by SwotMatrix atom
// (`src/components/atoms/SwotMatrix.tsx`) · 4-quadrant + center donut + hover
// elevation pattern. User requested scalable modern viz.

// ─────────────────────────────────────────────────────────────────
// SwotVariantSwitcher · 4 SWOT viz variants selectable via pill row
// Lets user/stakeholder compare patterns inline · ships all 4 alongside
// ─────────────────────────────────────────────────────────────────

type SwotVariant = 'simple' | 'impact' | 'donut' | 'tows';

const VARIANT_PILLS: Array<{ key: SwotVariant; label: string; desc: string }> = [
  { key: 'simple', label: 'Simple',  desc: '2×2 · refs canonical' },
  { key: 'impact', label: 'Impact',  desc: '2×2 · w/ tier pills' },
  { key: 'donut',  label: 'Donut',   desc: '2×2 · center viz' },
  { key: 'tows',   label: 'TOWS',    desc: 'Strategic crosswalk' },
];

function SwotVariantSwitcher({
  swot,
  swotImpact,
  tows,
}: {
  swot: typeof SWOT;
  swotImpact: typeof SWOT_IMPACT;
  tows: typeof TOWS;
}) {
  const [variant, setVariant] = useState<SwotVariant>('simple');

  return (
    <div className="space-y-6">
      {/* Variant selector row · small pills · subtle · selector context */}
      <div className="flex items-center gap-2 flex-wrap">
        <span
          className="font-body uppercase tracking-[0.12em] text-[var(--semantic-ink-muted)] mr-2"
          style={{ fontSize: '10px', fontWeight: 600 }}
        >
          View as
        </span>
        {VARIANT_PILLS.map((p) => {
          const active = variant === p.key;
          return (
            <button
              key={p.key}
              type="button"
              onClick={() => setVariant(p.key)}
              aria-pressed={active}
              className="font-body transition-all rounded-full px-3 py-1"
              style={{
                fontSize: '11.5px',
                fontWeight: active ? 600 : 500,
                background: active ? 'var(--color-foundation-black, #000)' : 'transparent',
                color: active ? '#ffffff' : 'var(--semantic-ink-body)',
                border: `1px solid ${active ? 'var(--color-foundation-black, #000)' : 'var(--black-200, #e5e5e5)'}`,
                letterSpacing: '0.02em',
              }}
            >
              {p.label}
            </button>
          );
        })}
        <span
          className="font-body italic text-[var(--semantic-ink-muted)] ml-2"
          style={{ fontSize: '11.5px' }}
        >
          {VARIANT_PILLS.find((p) => p.key === variant)?.desc}
        </span>
      </div>

      {/* Variant render · all 4 share the SWOT inventory · TOWS uses strategic intersections */}
      {variant === 'simple' && (
        <SwotMatrixSimple
          strengths={swot.strengths}
          weaknesses={swot.weaknesses}
          opportunities={swot.opportunities}
          threats={swot.threats}
        />
      )}
      {variant === 'impact' && (
        <SwotMatrixImpact
          strengths={swotImpact.strengths}
          weaknesses={swotImpact.weaknesses}
          opportunities={swotImpact.opportunities}
          threats={swotImpact.threats}
        />
      )}
      {variant === 'donut' && (
        <SwotMatrix
          strengths={swot.strengths}
          weaknesses={swot.weaknesses}
          opportunities={swot.opportunities}
          threats={swot.threats}
        />
      )}
      {variant === 'tows' && (
        <TowsCrosswalk so={tows.so} st={tows.st} wo={tows.wo} wt={tows.wt} />
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Section
// ─────────────────────────────────────────────────────────────────

export function IndustryAnalysisSection() {
  return (
    <section
      id="industry"
      aria-labelledby="industry-heading"
      className="px-4 sm:px-6 lg:px-12 max-w-[1100px] mx-auto w-full scroll-mt-[120px]"
    >
      <div className="inline-flex mb-3">
        <SectionLabel background="light" variant="accent">
          Section 11 · Industry Analysis
        </SectionLabel>
      </div>

      <h2
        id="industry-heading"
        className="font-display font-light text-[clamp(28px,3vw,39px)] leading-[1.15] tracking-[-0.015em] text-[var(--semantic-ink-strong)] mb-3"
      >
        The forces shaping the next five years
      </h2>

      <p className="font-body text-[var(--semantic-ink-body)] max-w-[64ch] mb-10" style={{ fontSize: '17px', lineHeight: 1.65 }}>
        Cold chain is currently in its <em className="not-italic font-medium text-[var(--semantic-ink-strong)]">growing phase</em>, driven by logistics-provider collaboration and geographic advantage. SWOT analysis · macroeconomic drivers · operating challenges · and technology trends together define the operating environment through 2027.
      </p>

      <Tabs defaultValue="swot" className="w-full">
        <TabsList className={TABS_LIST_PRIMARY}>
          {[
            { v: 'swot',       label: 'SWOT' },
            { v: 'drivers',    label: 'Drivers' },
            { v: 'challenges', label: 'Challenges' },
            { v: 'trends',     label: 'Trends & Tech' },
          ].map((t) => (
            <TabsTrigger key={t.v} value={t.v} className={TABS_TRIGGER_PRIMARY}>
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* ─── SWOT · 4 selectable variants 2026-05-21 (user-requested A/B/C/D test):
              - Donut       · SwotMatrix (2×2 + center decorative donut · template aesthetic)
              - Simple      · SwotMatrixSimple (2×2 + tinted bg + icons · refs canonical)
              - Impact      · SwotMatrixImpact (2×2 + per-bullet HIGH/MED/LOW pills · McKinsey/IBISWorld)
              - TOWS        · TowsCrosswalk (strategic intersections · McKinsey Quarterly pattern)
              Variant selector via small pill row above the matrix · default 'simple'. ─── */}
        <TabsContent value="swot" className="mt-0 space-y-10">
          <SwotVariantSwitcher
            swot={SWOT}
            swotImpact={SWOT_IMPACT}
            tows={TOWS}
          />

          <SourceCluster
            citations={getSources([
              'ken-primary-coldchain-2024',
              'tga-cold-chain-2023',
              'mla-redmeat-2024',
              'ken-primary-consolidation-2024',
            ])}
            methodologyHref="#methodology"
          />

          <InsightBox
            eyebrow="What this means for strategic positioning"
            lead="The opportunity-tier dominates the threat-tier · but only for operators that capex on time."
            body="Pharma + EV reefer + Asian export growth together represent 30%+ of forecast revenue lift through 2027. Operators that fail to invest in TGA-compliant capacity OR EV fleet OR port-adjacent footprint capture the historical 9-10% CAGR but miss the 12-14% premium tier. The strength-side moats (Lineage scale · TGA expertise · export demand) protect Tier-1 only — long-tail Tier-3 faces structural roll-up."
          />
        </TabsContent>

        {/* ─── Drivers · ranked horizontal bars (IBISWorld/Statista/McKinsey canonical)
              Replaces 2-up card grid 2026-05-22 · industry web-PDP standard for
              ranked drivers · reuses KenBarChart wrapper. Narrative cards below
              chart for analyst voice per driver. ─── */}
        <TabsContent value="drivers" className="mt-0 space-y-10">
          <ChartFigure
            eyebrow="Market drivers · impact-ranked"
            title="Top 5 drivers shaping Australia cold chain · 2024-27F"
            insight="Demand + e-grocery + pharma compliance lead at 8.4-9.2 impact score · all favor capacity-expansion capex. Export + EV reefer trail at 6-7 score · favor specific operator classes."
            unit="impact score"
            figcaption="Score 1-10 · Ken analyst judgment from PRD CAGR contribution + Ken Primary survey weighting · cross-validated w/ live page driver list."
          >
            <KenBarChart
              labels={DRIVERS.map((d) => d.label)}
              data={DRIVERS.map((d) => d.score)}
              height={280}
              ariaLabel="Top 5 cold-chain market drivers ranked by impact score"
            />
          </ChartFigure>

          {/* Per-driver narrative · ink-body bullets w/ inline body · matches refs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 mt-8">
            {DRIVERS.map((d, i) => (
              <article key={i} className="border-l-2 border-[var(--color-brand-red,#b01f24)] pl-5 py-1">
                <div className="flex items-baseline justify-between gap-3 mb-1.5 flex-wrap">
                  <p
                    className="font-body font-medium text-[var(--semantic-ink-strong)]"
                    style={{ fontSize: '13.5px' }}
                  >
                    {d.label}
                  </p>
                  <span
                    className="font-body uppercase tracking-[0.1em] text-[var(--color-brand-red,#b01f24)] flex-none"
                    style={{ fontSize: '9.5px', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}
                  >
                    {d.score.toFixed(1)} · {d.impact}
                  </span>
                </div>
                <p className="font-body text-[var(--semantic-ink-body)]" style={{ fontSize: '13px', lineHeight: 1.55 }}>
                  {d.body}
                </p>
              </article>
            ))}
          </div>

          <SourceCluster
            citations={getSources([
              'ken-primary-coldchain-2024',
              'coles-fy25h1-2025',
              'woolworths-fy24-2024',
              'tga-cold-chain-2023',
              'mla-redmeat-2024',
            ])}
            methodologyHref="#methodology"
          />

          <InsightBox
            eyebrow="What this means for capex planning"
            lead="High-impact drivers all favor capacity expansion · medium-impact favors export-side positioning."
            body="3 of 4 high-impact drivers (demand · e-grocery · pharma compliance) all point to refrigerated DC + TGA-compliant capacity additions through 2027. Export-protein driver favors port-adjacent reefer transport capacity — different capex profile, different operator class."
          />
        </TabsContent>

        {/* ─── Challenges · Impact × Likelihood 3×3 heatmap (Gartner canonical)
              Replaces paired-card grid 2026-05-22 · industry web-PDP standard
              for challenge/risk framing · OpportunityHeatmap molecule (reusable
              §13 D-S Gap · §17 Opportunities). Click any challenge dot to
              expand narrative below grid. ─── */}
        <TabsContent value="challenges" className="mt-0 space-y-10">
          <ChartFigure
            eyebrow="Challenge prioritization"
            title="Impact × Likelihood matrix · 6 cold-chain challenges"
            insight="Energy volatility sits top-right (critical · high impact + high likelihood). Carbon compliance + consolidation pressure are the medium-term challenges. Click any challenge to expand its mitigation narrative."
            figcaption="3×3 matrix · Ken Primary risk scoring + cross-validated w/ PRD §9 risk factors. Click challenge labels for full body."
          >
            <OpportunityHeatmap
              items={CHALLENGES}
              xLabel="Likelihood"
              yLabel="Impact"
            />
          </ChartFigure>

          <SourceCluster
            citations={getSources([
              'ken-primary-coldchain-2024',
              'linfox-mediarelease-2024',
              'accc-grocerysupply-2024',
              'ken-primary-consolidation-2024',
            ])}
            methodologyHref="#methodology"
          />

          <InsightBox
            eyebrow="What this means for risk management"
            lead="Energy + carbon are the structural risks · fragmentation is the consolidation tailwind."
            body="Operators not on EV reefer transition path by 2026 face 18-22% margin compression. Scope-3 carbon reporting from 2026 favors Tier-1+2 with audit-ready systems. Long-tail Tier-3 fragmentation is the M&A pipeline for the next 5 years."
          />
        </TabsContent>

        {/* ─── Trends & Tech · Impact × Time bubble chart (McKinsey/PwC canonical)
              Replaces 4 trend cards 2026-05-22 · industry web-PDP standard for
              tech-trend roundup · KenBubbleChart wrapper (reusable §07 ecosystem
              + §14 competitor positioning). Bubble size = market opportunity
              magnitude. ─── */}
        <TabsContent value="trends" className="mt-0 space-y-10">
          <ChartFigure
            eyebrow="Trends · Impact × Time-to-mainstream"
            title="6 cold-chain trends positioned · 2024-27F"
            insight="Warehouse automation + EV reefer fleet sit top-left (high impact · near mainstream). Sustainability + blockchain trail in adoption but blockchain magnitude is small. Bubble size = relative market opportunity."
            unit="impact score"
            figcaption="X = years to mainstream · Y = business impact (1-10) · bubble = relative market opportunity. Ken analyst judgment from PRD §10 + industry adoption surveys."
          >
            <KenBubbleChart
              data={TRENDS.map((t) => ({
                name: t.label,
                x: t.timeToMainstream,
                y: t.impactScore,
                z: t.magnitude,
              }))}
              height={420}
              xAxisTitle="Years to mainstream"
              yAxisTitle="Business impact"
              ariaLabel="6 cold-chain tech trends positioned by impact × time-to-mainstream"
            />
          </ChartFigure>

          {/* Per-trend narrative · cards below bubble · same pattern as Drivers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 mt-8">
            {TRENDS.map((t, i) => (
              <article key={i} className="border-l-2 border-[var(--periwinkle-500,#c3c6f9)] pl-5 py-1">
                <div className="flex items-baseline justify-between gap-3 mb-1.5 flex-wrap">
                  <p
                    className="font-body font-medium text-[var(--semantic-ink-strong)]"
                    style={{ fontSize: '13.5px' }}
                  >
                    {t.label}
                  </p>
                  <span
                    className="font-body uppercase tracking-[0.1em] text-[var(--periwinkle-700,#8b90e0)] flex-none"
                    style={{ fontSize: '9.5px', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}
                  >
                    {t.timeToMainstream < 1 ? '<1yr' : t.timeToMainstream < 2 ? '1-2yr' : t.timeToMainstream < 3 ? '2-3yr' : '3+yr'} · {t.impactScore.toFixed(1)}
                  </span>
                </div>
                <p className="font-body text-[var(--semantic-ink-body)]" style={{ fontSize: '13px', lineHeight: 1.55 }}>
                  {t.body}
                </p>
              </article>
            ))}
          </div>

          <SourceCluster
            citations={getSources([
              'ken-primary-coldchain-2024',
              'linfox-mediarelease-2024',
              'coles-fy25h1-2025',
              'tga-cold-chain-2023',
            ])}
            methodologyHref="#methodology"
          />

          <InsightBox
            eyebrow="What this means for tech investment"
            lead="IoT + automation are table stakes by 2027 · sustainability is the differentiator."
            body="Per-pallet IoT + WMS automation are commodity capabilities by 2026. Operators that lead on refrigerant transition + EV fleet + scope-3 reporting capture premium contract pricing from FMCG + pharma customers w/ ESG commitments. Trail edge = compliance-cost burden."
          />
        </TabsContent>
      </Tabs>
    </section>
  );
}
