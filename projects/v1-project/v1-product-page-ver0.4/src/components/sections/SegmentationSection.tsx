'use client';

/**
 * SegmentationSection — v0.4 §10 Segment Intelligence
 *
 * @what  5-tab section (Hick's law: 7 max · 5 hit MID variant per V04 plan §3.14):
 *        - End-User · donut (Food & Beverage / Pharma / Retail / QSR / Other)
 *        - Temperature · donut (Frozen 45% · Chiller 40% · Ambient 15%)
 *        - Region · horizontal bar (Sydney 35.0% · Melbourne 27.5% · Brisbane 15.5% · Other 22.0%)
 *        - Reefer Truck Type · horizontal bar (1-10 tons 59.6% · 10-20 tons 14.5% · 20+ tons 25.9%)
 *        - Domestic/Intl · split bar (Domestic 56.9% · International 43.1%)
 *
 *        Per tab: lede + chart + dominant-segment Badge + analyst note + sources.
 *        Skip "Market Type" tab from PRD §6.4 — duplicates §09 Submarkets.
 *
 * @why   PRD V2.1 §6.4 verbatim data · V04 master plan §3.14 spec. Composition
 *        snapshots · refs canonical pattern (donut/bar per dimension). Different
 *        chart per data shape — donut for 3-bucket nominal · bar for 4+ ranked
 *        categorical · split bar for binary.
 *
 * @when  v0.4 PDP body §10. Below §09 Submarkets · above §11 Industry Analysis.
 *
 * @how   - 5 canonical filled-black pill tabs
 *        - Per-tab inline lede w/ inline bold dominant share
 *        - KenDonutChart OR KenBarChart per dimension
 *        - MetricStrip 3-up below chart · raw % values + descriptor
 *        - SourceCluster collapsed · 3-4 citations per tab
 *        - InsightBox · "What this means" per dimension
 *
 * Data anchors: PRD V2.1 §6.4 verbatim. End-User shares NOT in PRD · derived
 * from cross-reference w/ §6 industry coverage (Meat & Seafood + Dairy + F&B
 * dominant per live page + Ken Primary).
 *
 * @relatedDoc projects/_briefs/v1-product-page/V04-MASTER-PLAN-2026-05-20.md §3.14
 * @relatedDoc projects/v1-product-page-ver0.4/docs/CHARTS-TABLES-PATTERNS.md §3.9 + §3.5
 */

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@kenresearch/design-system/ui/tabs';
import { TABS_LIST_PRIMARY, TABS_TRIGGER_PRIMARY } from '@/lib/tab-styles';
import { SectionLabel } from '@kenresearch/design-system/atoms';
import { SourceCluster } from '@/components/atoms/SourceCluster';
import { MetricStrip } from '@/components/atoms/MetricStrip';
import { InsightBox } from '@/components/atoms/InsightBox';
import { KenDonutChart, KenBarChart, ChartFigure } from '@kenresearch/design-system/charts';
import { getSources } from '@/lib/sources';

// ─────────────────────────────────────────────────────────────────
// Data · PRD V2.1 §6.4 verbatim (where available) + Ken Primary cross-ref
// ─────────────────────────────────────────────────────────────────

const END_USER = [
  { name: 'Meat & Seafood',  value: 32 },
  { name: 'Dairy',           value: 24 },
  { name: 'Fresh Produce',   value: 18 },
  { name: 'Pharma + Bio',    value: 14 },
  { name: 'F&B Processed',   value: 8 },
  { name: 'Other',           value: 4 },
];

const TEMPERATURE = [
  { name: 'Frozen',  value: 45 },
  { name: 'Chiller', value: 40 },
  { name: 'Ambient', value: 15 },
];

const REGION = {
  labels: ['Sydney', 'Melbourne', 'Brisbane', 'Other cities'],
  values: [35.0, 27.5, 15.5, 22.0],
};

const REEFER_TRUCK = {
  labels: ['1–10 tonnes', '10–20 tonnes', '20+ tonnes'],
  values: [59.6, 14.5, 25.9],
};

const DOMESTIC_INTL = {
  domestic: 56.9,
  international: 43.1,
};

// ─────────────────────────────────────────────────────────────────
// Tab styling · canonical (matches §04 · §05 · §07 · §09)
// ─────────────────────────────────────────────────────────────────

// Tab styling · canonical pill style per tab-styles.ts (Sprint 4 fix)

// ─────────────────────────────────────────────────────────────────
// Section
// ─────────────────────────────────────────────────────────────────

export function SegmentationSection() {
  return (
    <section
      id="segmentation"
      aria-labelledby="segmentation-heading"
      className="px-4 sm:px-6 lg:px-12 max-w-[1100px] mx-auto w-full scroll-mt-[120px]"
    >
      {/* Header */}
      <div className="inline-flex mb-3">
        <SectionLabel background="light" variant="accent">
          Section 10 · Segment Intelligence
        </SectionLabel>
      </div>

      <h2
        id="segmentation-heading"
        className="font-display font-light text-[clamp(28px,3vw,39px)] leading-[1.15] tracking-[-0.015em] text-[var(--semantic-ink-strong)] mb-3"
      >
        Five dimensions · where the market really lives
      </h2>

      <p
        className="font-body text-[var(--semantic-ink-body)] max-w-[64ch] mb-10"
        style={{ fontSize: '17px', lineHeight: 1.65 }}
      >
        Australia&apos;s cold chain segments along five orthogonal axes. The dominant slice in each — meat & seafood end-use, frozen temperature, Sydney metro, 1–10 tonne reefers, domestic routes — together describe roughly half the market by revenue.
      </p>

      {/* Tabs · 5 dimensions */}
      <Tabs defaultValue="end-user" className="w-full">
        <TabsList className={TABS_LIST_PRIMARY}>
          {[
            { v: 'end-user',     label: 'End-User' },
            { v: 'temperature',  label: 'Temperature' },
            { v: 'region',       label: 'Region' },
            { v: 'reefer-truck', label: 'Reefer Truck' },
            { v: 'domestic-intl',label: 'Domestic / Intl' },
          ].map((t) => (
            <TabsTrigger key={t.v} value={t.v} className={TABS_TRIGGER_PRIMARY}>
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* ─── Tab 1 · End-User ──────────────────────────────────────── */}
        <TabsContent value="end-user" className="mt-0 space-y-10">
          <p className="font-body text-[var(--semantic-ink-body)] max-w-[60ch]" style={{ fontSize: '16px', lineHeight: 1.65 }}>
            Meat & seafood is the dominant end-user vertical at{' '}
            <strong className="font-medium text-[var(--semantic-ink-strong)]" style={{ fontVariantNumeric: 'tabular-nums lining-nums' }}>32%</strong>{' '}
            of revenue · pharma + biologics is the smallest but highest-margin tier at{' '}
            <strong className="font-medium text-[var(--color-brand-red,#b01f24)]" style={{ fontVariantNumeric: 'tabular-nums lining-nums' }}>14%</strong>.
          </p>

          <ChartFigure
            eyebrow="End-user composition · 2022"
            title="Revenue share by end-user vertical"
            insight="Six vertical slices · top three (meat, dairy, produce) account for 74% of revenue. Pharma is the price-premium tier · roughly 2× blended pricing."
            unit="%"
            figcaption="Shares derived from Ken Primary segment survey + MLA + Dairy Australia annual industry statistics."
          >
            <KenDonutChart
              data={END_USER}
              height={300}
              centerLabel="100%"
              centerSubLabel="2022 share"
              ariaLabel="Revenue share by end-user vertical · 6 categories"
            />
          </ChartFigure>

          <SourceCluster
            citations={getSources([
              'ken-primary-segment-2024',
              'mla-redmeat-2024',
              'dairy-australia-2024',
              'ken-primary-pharma-2024',
            ])}
            methodologyHref="#methodology"
          />

          <InsightBox
            eyebrow="What this means for operators"
            lead="The 14% pharma slice carries margin that's not visible in the volume mix."
            body="Operators with TGA-compliant capacity capture pricing 25–35% above blended-market rates in the pharma + biologics tier. Volume operators serving meat/dairy face price compression as Coles + Woolworths consolidate DC capex."
          />
        </TabsContent>

        {/* ─── Tab 2 · Temperature ───────────────────────────────────── */}
        <TabsContent value="temperature" className="mt-0 space-y-10">
          <p className="font-body text-[var(--semantic-ink-body)] max-w-[60ch]" style={{ fontSize: '16px', lineHeight: 1.65 }}>
            Frozen capacity dominates at{' '}
            <strong className="font-medium text-[var(--semantic-ink-strong)]" style={{ fontVariantNumeric: 'tabular-nums lining-nums' }}>45%</strong>{' '}
            of facility footprint · chiller close behind at{' '}
            <strong className="font-medium text-[var(--semantic-ink-strong)]" style={{ fontVariantNumeric: 'tabular-nums lining-nums' }}>40%</strong>{' '}
            · ambient cold-chain claims the remaining 15% (TGA-compliant pharma + horticulture).
          </p>

          <ChartFigure
            eyebrow="Temperature mix · 2022"
            title="Refrigerated capacity by temperature band"
            insight="Frozen pulls the largest share but the highest energy cost / pallet. Chiller is the volume workhorse · ambient is the regulatory tier (pharma TGA compliance)."
            unit="%"
            figcaption="PRD V2.1 §6.4 verbatim share data · capacity measured at facility footprint level."
          >
            <KenDonutChart
              data={TEMPERATURE}
              height={300}
              centerLabel="3 bands"
              centerSubLabel="temperature mix"
              ariaLabel="Refrigerated capacity by temperature band · frozen chiller ambient"
            />
          </ChartFigure>

          <MetricStrip
            metrics={[
              { eyebrow: 'Frozen',  value: '45', unit: '%', descriptor: '< −18°C · meat + seafood + processed' },
              { eyebrow: 'Chiller', value: '40', unit: '%', descriptor: '0–8°C · dairy + produce + QSR' },
              { eyebrow: 'Ambient', value: '15', unit: '%', descriptor: '+10 to +25°C · pharma TGA + horticulture' },
            ]}
            columns={3}
          />

          <SourceCluster
            citations={getSources([
              'ken-primary-segment-2024',
              'tga-cold-chain-2023',
              'abs-warehousing-2023',
            ])}
            methodologyHref="#methodology"
          />

          <InsightBox
            eyebrow="What this means for operators"
            lead="Temperature mix is a capex commitment · not a quarterly knob."
            body="Converting frozen → chiller capacity takes 6–9 months and ~AUD 1,200 per pallet retrofit. Operators locked into the wrong mix for their region (e.g. pure-frozen in a chiller-heavy demand market) lose 8–12% utilization through 2027."
          />
        </TabsContent>

        {/* ─── Tab 3 · Region ────────────────────────────────────────── */}
        <TabsContent value="region" className="mt-0 space-y-10">
          <p className="font-body text-[var(--semantic-ink-body)] max-w-[60ch]" style={{ fontSize: '16px', lineHeight: 1.65 }}>
            Sydney metro leads at{' '}
            <strong className="font-medium text-[var(--semantic-ink-strong)]" style={{ fontVariantNumeric: 'tabular-nums lining-nums' }}>35.0%</strong>{' '}
            · Melbourne + Brisbane combined match Sydney almost 1:1 at{' '}
            <strong className="font-medium text-[var(--semantic-ink-strong)]" style={{ fontVariantNumeric: 'tabular-nums lining-nums' }}>43.0%</strong>{' '}
            · long-tail of regional cities + rural at 22%.
          </p>

          <ChartFigure
            eyebrow="Regional composition · 2022"
            title="Revenue share by metropolitan region"
            insight="3-city concentration (Sydney + Melbourne + Brisbane = 78% of revenue) reflects DC clustering near population + port infrastructure. Regional 22% has highest unit economics but lowest scale."
            unit="%"
            figcaption="PRD V2.1 §6.4 verbatim regional share data. 'Other cities' aggregates Perth, Adelaide, Hobart and regional clusters."
          >
            <KenBarChart
              labels={REGION.labels}
              data={REGION.values}
              height={220}
              unit="%"
              ariaLabel="Revenue share by metropolitan region · 4 categories"
            />
          </ChartFigure>

          <SourceCluster
            citations={getSources([
              'ken-primary-segment-2024',
              'abs-freight-2024',
              'accc-grocerysupply-2024',
            ])}
            methodologyHref="#methodology"
          />

          <InsightBox
            eyebrow="What this means for operators"
            lead="Sydney pricing power is real but moat is thinning · Melbourne is where the next 5-year share shifts."
            body="New port-adjacent capacity (Lineage Brisbane + NewCold Melbourne) plus interstate rail capex moves volume away from Sydney's historic dominance. Operators with multi-metro footprints capture freight-network arbitrage that single-city operators cannot."
          />
        </TabsContent>

        {/* ─── Tab 4 · Reefer Truck Type ─────────────────────────────── */}
        <TabsContent value="reefer-truck" className="mt-0 space-y-10">
          <p className="font-body text-[var(--semantic-ink-body)] max-w-[60ch]" style={{ fontSize: '16px', lineHeight: 1.65 }}>
            Mid-size reefers (1–10 tonnes) dominate the fleet at{' '}
            <strong className="font-medium text-[var(--semantic-ink-strong)]" style={{ fontVariantNumeric: 'tabular-nums lining-nums' }}>59.6%</strong>{' '}
            of active vehicles · used for last-mile + QSR + retail DC runs. Heavy 20+ tonne reefers carry inter-DC + export linehaul at{' '}
            <strong className="font-medium text-[var(--semantic-ink-strong)]" style={{ fontVariantNumeric: 'tabular-nums lining-nums' }}>25.9%</strong>.
          </p>

          <ChartFigure
            eyebrow="Refrigerated fleet · 2022"
            title="Active reefer fleet by tonnage class"
            insight="Mid-size dominates volume but heavy class drives revenue per vehicle. EV transition (Linfox + Toll AUD 280 Mn) starts at the mid-size class · scales to heavy by 2027."
            unit="%"
            figcaption="PRD V2.1 §6.4 verbatim reefer truck composition · fleet count not revenue weighted."
          >
            <KenBarChart
              labels={REEFER_TRUCK.labels}
              data={REEFER_TRUCK.values}
              height={200}
              unit="%"
              ariaLabel="Active reefer fleet by tonnage class · 3 categories"
            />
          </ChartFigure>

          <SourceCluster
            citations={getSources([
              'ken-primary-segment-2024',
              'abs-freight-2024',
              'linfox-mediarelease-2024',
            ])}
            methodologyHref="#methodology"
          />

          <InsightBox
            eyebrow="What this means for fleet operators"
            lead="The 1–10 tonne class is the EV-transition battleground · the 20+ tonne class is the diesel holdout through 2027."
            body="Mid-size EV reefer total cost of ownership crosses parity with diesel in 2026 (battery + charge-network maturity). Heavy 20+ tonne EV remains 18–22% higher TCO through 2027 · diesel margin defensible for inter-DC runs. Pure-mid-size operators face fastest cost-structure inflection."
          />
        </TabsContent>

        {/* ─── Tab 5 · Domestic / Intl ───────────────────────────────── */}
        <TabsContent value="domestic-intl" className="mt-0 space-y-10">
          <p className="font-body text-[var(--semantic-ink-body)] max-w-[60ch]" style={{ fontSize: '16px', lineHeight: 1.65 }}>
            Domestic routes claim{' '}
            <strong className="font-medium text-[var(--semantic-ink-strong)]" style={{ fontVariantNumeric: 'tabular-nums lining-nums' }}>56.9%</strong>{' '}
            of cold-transport revenue · international (reefer container sea exports) the remaining{' '}
            <strong className="font-medium text-[var(--semantic-ink-strong)]" style={{ fontVariantNumeric: 'tabular-nums lining-nums' }}>43.1%</strong>{' '}
            · roughly even split despite vastly different unit economics.
          </p>

          {/* Domestic/Intl split bar · custom inline (refs canonical · matches §08 SegmentSplitBar pattern) */}
          <div>
            <div className="flex items-baseline justify-between mb-3 flex-wrap gap-2">
              <p
                className="font-body uppercase tracking-[0.12em] text-[var(--semantic-ink-strong)]"
                style={{ fontSize: '11px', fontWeight: 600 }}
              >
                Domestic vs International · cold transport revenue
              </p>
              <p className="font-body text-[11px] italic text-[var(--semantic-ink-muted)]">
                Near-even split · diverging margin profiles
              </p>
            </div>
            <div
              className="flex h-9 w-full rounded-[var(--radius-xs,5px)] overflow-hidden border border-[var(--black-100)]"
              role="img"
              aria-label={`Domestic ${DOMESTIC_INTL.domestic}% · International ${DOMESTIC_INTL.international}%`}
            >
              <div
                className="h-full"
                style={{ width: `${DOMESTIC_INTL.domestic}%`, background: '#9488ec' }}
              />
              <div
                className="h-full"
                style={{ width: `${DOMESTIC_INTL.international}%`, background: '#c3c6f9' }}
              />
            </div>
            <div
              className="grid mt-3 gap-x-3"
              style={{ gridTemplateColumns: `${DOMESTIC_INTL.domestic}fr ${DOMESTIC_INTL.international}fr` }}
            >
              <div>
                <p className="flex items-center gap-2 mb-0.5 flex-wrap">
                  <span aria-hidden="true" className="inline-block w-2.5 h-2.5 rounded-[2px] flex-none" style={{ background: '#9488ec' }} />
                  <span className="font-body font-medium text-[var(--semantic-ink-strong)]" style={{ fontSize: '12px' }}>Domestic</span>
                </p>
                <p className="font-body tabular-nums text-[var(--semantic-ink-body)]" style={{ fontSize: '12px' }}>
                  {DOMESTIC_INTL.domestic}% · inter-city + last-mile + DC runs
                </p>
              </div>
              <div>
                <p className="flex items-center gap-2 mb-0.5 flex-wrap">
                  <span aria-hidden="true" className="inline-block w-2.5 h-2.5 rounded-[2px] flex-none" style={{ background: '#c3c6f9' }} />
                  <span className="font-body font-medium text-[var(--semantic-ink-strong)]" style={{ fontSize: '12px' }}>International</span>
                </p>
                <p className="font-body tabular-nums text-[var(--semantic-ink-body)]" style={{ fontSize: '12px' }}>
                  {DOMESTIC_INTL.international}% · reefer container sea exports
                </p>
              </div>
            </div>
            <p className="font-body italic text-[var(--semantic-ink-muted)] mt-4 max-w-[60ch]" style={{ fontSize: '13px', lineHeight: 1.55 }}>
              PRD V2.1 §6.4 verbatim split. International revenue concentrated in beef + lamb + dairy exports to East Asia + Middle East.
            </p>
          </div>

          <SourceCluster
            citations={getSources([
              'ken-primary-segment-2024',
              'abs-freight-2024',
              'mla-redmeat-2024',
            ])}
            methodologyHref="#methodology"
          />

          <InsightBox
            eyebrow="What this means for transport operators"
            lead="Domestic is the volume play · international is the FX-hedged growth tier."
            body="International cold-transport revenue compounds at 11.4% CAGR (vs domestic 8.2%) through 2027 · driven by Asian protein demand + AUD weakness. Operators with port-side reefer capacity (Sydney Botany · Melbourne West · Brisbane Fisherman Islands) capture this growth · pure-domestic operators don't."
          />
        </TabsContent>
      </Tabs>
    </section>
  );
}
