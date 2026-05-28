'use client';

/**
 * MethodologySection — v0.4 §19 Methodology
 *
 * @what  Trust-building transparency section · full visibility (no gating):
 *        - Inline narrative lede: 3 pillars · 240+ interviews · 18-month window · 5 datasets
 *        - MetricStrip: 4 stats (primary interviews · secondary sources · data points · validation rounds)
 *        - ProcessFlowDiagram: 4-step horizontal flow (Define · Collect · Triangulate · Validate)
 *        - MethodologyPillar: 3-col grid (Primary · Secondary · Quantitative modeling)
 *        - KenDonutChart: sample composition by respondent role (C-suite/Ops/SC/Consultants)
 *        - SourceCluster meta (Ken Research methodology framework)
 *        - InsightBox: "Every number sourced · click any citation for primary trace"
 *
 * @why   Methodology is the trust anchor for B2B research buyers — Gartner / Forrester /
 *        IBISWorld all feature detailed methodology sections to establish data credibility
 *        before enterprise buyers consider purchase. NO gating here: transparency is the
 *        product differentiator. Buyer who sees rigorous methodology → higher conversion.
 *
 * @when  v0.4 PDP body §19 · below §18 Macro · above §20 TOC.
 *
 * Source: Ken Research methodology framework · 2024.
 *
 * @relatedDoc projects/v1-product-page-ver0.4/docs/REF-PATTERNS-ADOPTION.md §7
 */

import { SectionLabel } from '@kenresearch/design-system/atoms';
import { MetricStrip } from '@/components/atoms/MetricStrip';
import { InsightBox } from '@/components/atoms/InsightBox';
import { SourceCluster } from '@/components/atoms/SourceCluster';
import { ProcessFlowDiagram } from '@/components/atoms/ProcessFlowDiagram';
import { MethodologyPillar } from '@/components/atoms/MethodologyPillar';
import { KenDonutChart, ChartFigure, KEN_CHART_SERIES_ARRAY } from '@kenresearch/design-system/charts';
import { getSources } from '@/lib/sources';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@kenresearch/design-system/ui/tabs';
import { TABS_LIST_PRIMARY, TABS_TRIGGER_PRIMARY } from '@/lib/tab-styles';

// ─────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────

const METRICS = [
  {
    eyebrow: 'Primary interviews',
    value: '240+',
    descriptor: 'CATI + CAPI · NDA-protected',
  },
  {
    eyebrow: 'Secondary source datasets',
    value: '5',
    descriptor: 'ABS · RBA · ASX · TGA · RWTA',
  },
  {
    eyebrow: 'Data points analyzed',
    value: '8,400+',
    descriptor: 'Across 18-month rolling window',
  },
  {
    eyebrow: 'Validation rounds',
    value: '3',
    descriptor: 'Analyst · peer review · client sign-off',
  },
];

// Donut chart · interview respondent composition
const COMPOSITION_DATA = [
  { name: 'C-suite / Directors',    value: 35 },
  { name: 'Operations',             value: 30 },
  { name: 'Supply chain',           value: 20 },
  { name: 'Consultants / Advisors', value: 15 },
];

// ─────────────────────────────────────────────────────────────────
// Section
// ─────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────
// Tab styling · canonical filled-black pill (matches §04 · §05 · §07 · §11)
// ─────────────────────────────────────────────────────────────────

// Tab styling · canonical pill style per tab-styles.ts (Sprint 4 fix)

export function MethodologySection() {
  return (
    <section
      id="methodology"
      aria-labelledby="methodology-heading"
      className="px-4 sm:px-6 lg:px-12 max-w-[1100px] mx-auto w-full scroll-mt-[120px]"
    >
      {/* Header · always visible */}
      <div className="inline-flex mb-3">
        <SectionLabel background="light" variant="accent">
          Section 19 · Methodology
        </SectionLabel>
      </div>

      <h2
        id="methodology-heading"
        className="font-display font-light text-[clamp(28px,3vw,39px)] leading-[1.15] tracking-[-0.015em] text-[var(--semantic-ink-strong)] mb-3"
      >
        Three research pillars — every number traceable to source
      </h2>

      {/* Lede · always visible */}
      <p
        className="font-body text-[var(--semantic-ink-body)] max-w-[64ch] mb-2"
        style={{ fontSize: '17px', lineHeight: 1.65 }}
      >
        <strong className="font-medium text-[var(--semantic-ink-strong)]">3 research pillars</strong>{' '}
        — primary field work · secondary dataset validation · quantitative modeling —
        triangulated across{' '}
        <strong className="font-medium text-[var(--color-brand-red,#b01f24)]">240+ primary interviews</strong>
        ,{' '}
        <strong className="font-medium text-[var(--semantic-ink-strong)]">18-month data window</strong>
        , and{' '}
        <strong className="font-medium text-[var(--semantic-ink-strong)]">5 external datasets</strong>{' '}
        (ABS · RBA · ASX filings · TGA · RWTA member directory).
      </p>
      <p
        className="font-body italic text-[var(--semantic-ink-muted)] max-w-[60ch] mb-10"
        style={{ fontSize: '14px', lineHeight: 1.55 }}
      >
        No black-box assumptions. Every figure derives from an auditable chain from raw data to published number.
      </p>

      {/* 4-tab content · Overview · Process · Pillars · Sample */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className={TABS_LIST_PRIMARY}>
          {[
            { v: 'overview', label: 'Overview' },
            { v: 'process',  label: 'Process' },
            { v: 'pillars',  label: 'Pillars' },
            { v: 'sample',   label: 'Sample' },
          ].map((t) => (
            <TabsTrigger key={t.v} value={t.v} className={TABS_TRIGGER_PRIMARY}>
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Tab 1 · Overview · 4 stats */}
        <TabsContent value="overview" className="mt-0">
          <MetricStrip metrics={METRICS} columns={4} accent={0} />
        </TabsContent>

        {/* Tab 2 · Process · 4-step flow */}
        <TabsContent value="process" className="mt-0">
          <p
            className="font-body uppercase tracking-[0.12em] text-[var(--semantic-ink-muted)] mb-4"
            style={{ fontSize: '10px', fontWeight: 600 }}
          >
            Research process · 4-step framework
          </p>
          <ProcessFlowDiagram />
        </TabsContent>

        {/* Tab 3 · Pillars · 3-col grid */}
        <TabsContent value="pillars" className="mt-0">
          <p
            className="font-body uppercase tracking-[0.12em] text-[var(--semantic-ink-muted)] mb-1.5"
            style={{ fontSize: '10px', fontWeight: 600 }}
          >
            Three research pillars
          </p>
          <p
            className="font-body italic text-[var(--semantic-ink-muted)] mb-6"
            style={{ fontSize: '13px', lineHeight: 1.5 }}
          >
            Primary research anchors · secondary validation · quantitative model outputs.
          </p>
          <MethodologyPillar />
        </TabsContent>

        {/* Tab 4 · Sample · donut chart */}
        <TabsContent value="sample" className="mt-0">
          <p
            className="font-body uppercase tracking-[0.12em] text-[var(--semantic-ink-muted)] mb-1.5"
            style={{ fontSize: '10px', fontWeight: 600 }}
          >
            Primary research · respondent composition
          </p>
          <p
            className="font-body italic text-[var(--semantic-ink-muted)] mb-5"
            style={{ fontSize: '13px', lineHeight: 1.5 }}
          >
            Interview sample by respondent function · n=240+ · 2023–2024 fieldwork.
          </p>
          <div className="max-w-[420px]">
            <ChartFigure
              eyebrow="Sample composition · by role"
              title="Interview respondents by function (n=240+)"
              insight="C-suite + Ops = 65% of sample — ensures access to both strategic direction and operational ground truth."
              unit="%"
              legend={[
                { kind: 'solid', color: KEN_CHART_SERIES_ARRAY[0], label: 'C-suite / Directors (35%)' },
                { kind: 'solid', color: KEN_CHART_SERIES_ARRAY[1], label: 'Operations (30%)' },
                { kind: 'solid', color: KEN_CHART_SERIES_ARRAY[2], label: 'Supply chain (20%)' },
                { kind: 'solid', color: KEN_CHART_SERIES_ARRAY[3], label: 'Consultants / Advisors (15%)' },
              ]}
              figcaption="CATI + CAPI methodology. All respondents under NDA. Coverage: Tier-1, Tier-2, and independent operators across all Australian states and NT."
            >
              <KenDonutChart
                data={COMPOSITION_DATA}
                height={240}
                centerLabel="n=240+"
                centerSubLabel="interviews"
                unit="%"
                ariaLabel="Interview respondent composition by role · C-suite 35% · Ops 30% · Supply chain 20% · Consultants 15%"
              />
            </ChartFigure>
          </div>
        </TabsContent>
      </Tabs>

      {/* SourceCluster meta · always visible · trust anchor */}
      <SourceCluster
        citations={getSources([
          'ken-primary-coldchain-2024',
          'abs-warehousing-2023',
          'ken-forecast-coldchain-2025',
          'ken-cagr-historical-2024',
          'ken-interpolation-2024',
        ])}
        defaultOpen={true}
        className="mb-12 mt-10"
      />

      {/* InsightBox closer · always visible · trust anchor */}
      <InsightBox
        eyebrow="Our commitment · full traceability"
        lead="Every number sourced · click any citation for primary trace."
        body={
          <>
            Ken Research methodology follows a{' '}
            <strong className="font-medium text-[var(--semantic-ink-strong)]">
              3-validation standard
            </strong>
            : analyst-level review · independent peer review · client-side sign-off before
            publication. All primary interview data is held under NDA; summary statistics are
            disclosed, not individual respondent data. Secondary sources are linked in the
            SourceCluster above — click ↗ to verify any citation directly.{' '}
            <strong className="font-medium text-[var(--semantic-ink-strong)]">
              No number is unattributed.
            </strong>
          </>
        }
      />
    </section>
  );
}
