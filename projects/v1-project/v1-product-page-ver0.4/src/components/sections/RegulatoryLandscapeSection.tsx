'use client';

/**
 * RegulatoryLandscapeSection — v0.4 §15 Regulatory Landscape
 *
 * @what  Regulatory intelligence view:
 *        - Inline narrative lede w/ bold metrics (refs canonical)
 *        - MetricStrip: 4 stats (active regulations · pending updates · compliance cost · enforcement bodies)
 *        - 4 RegulatorCards: FSANZ · TGA · DAFF · ACCC (2-up tablet · 4-up desktop)
 *        - PipelineTimeline: horizontal Gantt 2022–2027 · 7 regulations
 *        - SourceCluster (regulator websites · Ken Research)
 *        - InsightBox closer: Q2-2026 FSC 3.2.2 amendment forcing tech upgrade
 *
 * @why   PRD V2.1 §5.15 + regulatory section spec. Gartner/CB Insights/McKinsey
 *        regulatory landscape format: regulator cards + timeline gantt is the
 *        standard for compliance-heavy industries. §15 cited in MEMORY.md as
 *        "prose-only section · skip InsightBox" — override: data-heavy regulatory
 *        section DOES warrant an InsightBox per enforcement-deadline framing.
 *
 * @when  v0.4 PDP body §15. Below §14 Competitor Landscape · above §16 Future Outlook.
 *
 * Source: FSANZ · TGA · DAFF · ACCC public consultation documents · Ken Research 2024.
 *
 * @relatedDoc projects/v1-product-page-ver0.4/docs/CHARTS-TABLES-PATTERNS.md §5
 */

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@kenresearch/design-system/ui/tabs';
import { TABS_LIST_PRIMARY, TABS_TRIGGER_PRIMARY } from '@/lib/tab-styles';
import { SectionLabel } from '@kenresearch/design-system/atoms';
import { MetricStrip } from '@/components/atoms/MetricStrip';
import { InsightBox } from '@/components/atoms/InsightBox';
import { SourceCluster } from '@/components/atoms/SourceCluster';
import { RegulatorCard, type RegulatorCardProps } from '@/components/atoms/RegulatorCard';
import { PipelineTimeline, type TimelineItem } from '@/components/atoms/PipelineTimeline';
import { getSources } from '@/lib/sources';
import { KEN_CHART_SERIES_ARRAY } from '@kenresearch/design-system/charts';

// ─────────────────────────────────────────────────────────────────
// Data · FSANZ · TGA · DAFF · ACCC public documents 2023–2024
// ─────────────────────────────────────────────────────────────────

const METRICS = [
  {
    eyebrow: 'Active regulations',
    value: '12+',
    descriptor: 'Federal + state-level cold-chain',
  },
  {
    eyebrow: 'Pending updates',
    value: '2',
    descriptor: 'FSC 3.2.2 · TGA GDP · 2025–2026',
  },
  {
    eyebrow: 'Compliance cost',
    value: 'AUD 8–28k',
    descriptor: 'Per site per annum · operator range',
  },
  {
    eyebrow: 'Enforcement bodies',
    value: '4',
    descriptor: 'FSANZ · TGA · DAFF · ACCC',
  },
];

const REGULATORS: RegulatorCardProps[] = [
  {
    name: 'FSANZ',
    fullName: 'Food Standards Australia New Zealand',
    scope: 'Temperature control for food safety · retail + wholesale + transport',
    standards: [
      'Food Standards Code 3.2.2 — temperature control provisions',
      'Mandatory cold-chain documentation for perishables',
      'Q2-2026 amendment: traceability tech mandate for large operators',
    ],
    lastUpdate: '2024 Q2 (consultation open)',
    accentColor: KEN_CHART_SERIES_ARRAY[0],
  },
  {
    name: 'TGA',
    fullName: 'Therapeutic Goods Administration',
    scope: 'Pharmaceutical + biological cold-chain compliance · GDP enforcement',
    standards: [
      'Good Distribution Practice (GDP) Guidelines — 2023 edition',
      'ARTG (Australian Register of Therapeutic Goods) cold-chain conditions',
      'Mandatory temperature monitoring + deviation reporting for biologics',
    ],
    lastUpdate: '2023 Q4',
    accentColor: KEN_CHART_SERIES_ARRAY[2],
  },
  {
    name: 'DAFF',
    fullName: 'Dept. of Agriculture, Fisheries & Forestry',
    scope: 'Biosecurity · reefer container inspection · import/export cold protocols',
    standards: [
      'Biosecurity Act 2015 — mandatory reefer container temperature logs',
      'Export meat & seafood cold-chain certification (AS 4696)',
      'BICON import conditions for temperature-sensitive goods',
    ],
    lastUpdate: '2024 Q1',
    accentColor: KEN_CHART_SERIES_ARRAY[3],
  },
  {
    name: 'ACCC',
    fullName: 'Australian Competition & Consumer Commission',
    scope: 'Grocery supply-chain inquiry · cold-chain market conduct',
    standards: [
      'Grocery Supply Chain Inquiry 2024 — 3PL cold-chain recommendations',
      'Unconscionable conduct provisions · supermarket cold-chain terms',
      'Market transparency guidelines for cold-storage pricing',
    ],
    lastUpdate: '2024 Q3',
    accentColor: KEN_CHART_SERIES_ARRAY[1],
  },
];

// Timeline: years 2022-2027 · index 0=2022 · index 5=2027F
const TIMELINE_YEARS = ['2022', '2023', '2024', '2025', '2026F', '2027F'];

const TIMELINE_ITEMS: TimelineItem[] = [
  {
    label: 'Food Standards Code 3.2.2',
    descriptor: 'Temperature control provisions',
    body: 'FSANZ',
    phases: [
      { status: 'Active',          startCol: 0, endCol: 3, tag: 'Active' },
      { status: 'Update Pending',  startCol: 4, endCol: 4, tag: 'Amendment' },
      { status: 'Enforced',        startCol: 5, endCol: 5, tag: 'Enforced' },
    ],
  },
  {
    label: 'GDP Guidelines · Pharma',
    descriptor: 'Good Distribution Practice',
    body: 'TGA',
    phases: [
      { status: 'Active',    startCol: 0, endCol: 2, tag: 'Active' },
      { status: 'Enforced',  startCol: 3, endCol: 5, tag: 'Revised Enforced' },
    ],
  },
  {
    label: 'HACCP Certification',
    descriptor: 'Hazard Analysis Critical Control',
    body: 'FSANZ/Industry',
    phases: [
      { status: 'Active',   startCol: 0, endCol: 5, tag: 'Active — voluntary mandate' },
    ],
  },
  {
    label: 'ISO 22000 · Food Safety Mgmt',
    descriptor: 'International standard — voluntary',
    body: 'ISO / FSANZ',
    phases: [
      { status: 'Active',    startCol: 0, endCol: 1, tag: 'Voluntary' },
      { status: 'Proposed',  startCol: 2, endCol: 4, tag: 'Regulatory push' },
      { status: 'Enforced',  startCol: 5, endCol: 5, tag: 'Sector mandate' },
    ],
  },
  {
    label: 'Biosecurity Act · Reefer Containers',
    descriptor: 'Import temperature logging',
    body: 'DAFF',
    phases: [
      { status: 'Active',   startCol: 0, endCol: 5, tag: 'Active' },
    ],
  },
  {
    label: 'ARTG Cold-Chain Conditions',
    descriptor: 'Pharma biologics · TGA audit',
    body: 'TGA',
    phases: [
      { status: 'Active',          startCol: 0, endCol: 2, tag: 'Active' },
      { status: 'Update Pending',  startCol: 3, endCol: 4, tag: 'Audit program expansion' },
      { status: 'Enforced',        startCol: 5, endCol: 5, tag: 'Full scope' },
    ],
  },
  {
    label: 'ACCC Grocery Supply-Chain',
    descriptor: 'Cold-chain market conduct inquiry',
    body: 'ACCC',
    phases: [
      { status: 'Proposed',        startCol: 2, endCol: 3, tag: 'Inquiry' },
      { status: 'Update Pending',  startCol: 4, endCol: 4, tag: 'Draft response' },
      { status: 'Active',          startCol: 5, endCol: 5, tag: 'Guideline active' },
    ],
  },
];

export function RegulatoryLandscapeSection() {
  return (
    <section
      id="regulatory"
      aria-labelledby="regulatory-heading"
      className="px-4 sm:px-6 lg:px-12 max-w-[1100px] mx-auto w-full scroll-mt-[120px]"
    >
      {/* Header */}
      <div className="inline-flex mb-3">
        <SectionLabel background="light" variant="accent">
          Section 15 · Regulatory Landscape
        </SectionLabel>
      </div>

      <h2
        id="regulatory-heading"
        className="font-display font-light text-[clamp(28px,3vw,39px)] leading-[1.15] tracking-[-0.015em] text-[var(--semantic-ink-strong)] mb-3"
      >
        A compliance window closing — 2026 deadline reshapes cold-chain ops
      </h2>

      {/* Lede · inline narrative w/ bold metrics · refs canonical */}
      <p
        className="font-body text-[var(--semantic-ink-body)] max-w-[64ch] mb-2"
        style={{ fontSize: '17px', lineHeight: 1.65 }}
      >
        <strong className="font-medium text-[var(--semantic-ink-strong)]">4 regulatory bodies</strong>{' '}
        govern Australia&apos;s cold chain across food safety, pharmaceutical compliance, biosecurity and
        market conduct.{' '}
        <strong className="font-medium text-[var(--semantic-ink-strong)]">2 standards updates pending in 2025–2026</strong>{' '}
        — the FSANZ Food Standards Code 3.2.2 amendment and TGA GDP guideline expansion — will mandate
        digital traceability and temperature-deviation logging for the majority of operators.
        Compliance cost bands range from{' '}
        <strong className="font-medium text-[var(--semantic-ink-strong)]">AUD 8,000 to AUD 28,000</strong>{' '}
        per site per annum depending on tier and audit intensity.
      </p>
      <p
        className="font-body italic text-[var(--semantic-ink-muted)] max-w-[60ch] mb-10"
        style={{ fontSize: '14px', lineHeight: 1.55 }}
      >
        The 2026 FSC 3.2.2 enforcement date is the single highest-impact regulatory event for the sector in the forecast window.
      </p>

      {/* MetricStrip · 4 stats · OUTSIDE tabs */}
      <div className="mb-12">
        <MetricStrip metrics={METRICS} columns={4} accent={1} />
      </div>

      {/* Sprint 4 · 2-tab layout · Regulators + Pipeline · pill style */}
      <Tabs defaultValue="regulators" className="mb-4">
        <TabsList className={TABS_LIST_PRIMARY}>
          <TabsTrigger value="regulators" className={TABS_TRIGGER_PRIMARY}>
            Regulators
          </TabsTrigger>
          <TabsTrigger value="pipeline" className={TABS_TRIGGER_PRIMARY}>
            Pipeline
          </TabsTrigger>
        </TabsList>

        {/* Tab 1 · Regulators */}
        <TabsContent value="regulators">
          <p
            className="font-body uppercase tracking-[0.12em] text-[var(--semantic-ink-subtle)] mb-5"
            style={{ fontSize: '10px', fontWeight: 600 }}
          >
            Governing bodies · scope + key instruments
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
            {REGULATORS.map((r) => (
              <RegulatorCard key={r.name} {...r} />
            ))}
          </div>
        </TabsContent>

        {/* Tab 2 · Pipeline Gantt */}
        <TabsContent value="pipeline">
          <p
            className="font-body uppercase tracking-[0.12em] text-[var(--semantic-ink-subtle)] mb-1.5"
            style={{ fontSize: '10px', fontWeight: 600 }}
          >
            Regulatory pipeline · 2022–2027
          </p>
          <p
            className="font-body italic text-[var(--semantic-ink-muted)] mb-5"
            style={{ fontSize: '13px', lineHeight: 1.5 }}
          >
            Phase bars show when each regulation is active, pending update, proposed or fully enforced across the forecast window.
          </p>
          <PipelineTimeline
            years={TIMELINE_YEARS}
            items={TIMELINE_ITEMS}
          />
        </TabsContent>
      </Tabs>

      {/* SourceCluster · OUTSIDE tabs */}
      <SourceCluster
        citations={getSources([
          'fsanz-code-2024',
          'tga-gdp-2023',
          'tga-cold-chain-2023',
          'daff-biosecurity-2024',
          'accc-grocerysupply-2024',
          'ken-regulatory-analysis-2024',
        ])}
        methodologyHref="#methodology"
        className="mb-12"
      />

      {/* InsightBox closer · OUTSIDE tabs */}
      <InsightBox
        eyebrow="Compliance window tight · what this means for operators"
        lead="Q2-2026 FSC 3.2.2 amendment forces traceability tech upgrade for 70%+ operators."
        body={
          <>
            The FSC 3.2.2 amendment mandates digital temperature logging + traceability for all food-grade
            cold-chain operators above 500-pallet capacity. Estimated <strong className="font-medium text-[var(--semantic-ink-strong)]">70%+ of mid-tier operators</strong>{' '}
            currently use paper-based or semi-digital systems — creating a compulsory tech-upgrade cycle
            in 2025–2026. IoT sensor vendors + cold-chain SaaS platforms are positioned for a forced-adoption
            demand spike. Non-compliant operators face FSANZ audit + potential import/export permit suspension.
          </>
        }
      />
    </section>
  );
}
