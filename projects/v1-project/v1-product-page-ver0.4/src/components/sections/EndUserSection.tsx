'use client';

/**
 * EndUserSection — v0.4 §12 End-User Deep Dives
 *
 * @what  3-tab section (V04 master plan §3.16):
 *        - Sectors · 4 deep-dive cards (Meat & Seafood · Pharma + Bio · RTE Meals · Dairy)
 *          · each w/ inline lede + key metrics + analyst voice
 *        - Shelf-Life Matrix · table (product · temp range · shelf life · tech requirement)
 *          · refs canonical data-dense matrix · PRD §8.11 verbatim
 *        - Players & 3PL · 3PL-vs-Owned split bar + named operator list per sector
 *
 *        Per-tab analyst voice + SourceCluster + InsightBox.
 *
 * @why   PRD V2.1 §6.4 + §8.11 explicit · end-user analysis is high-value
 *        intelligence asset · refs canonical narrative + table pattern (NOT
 *        chart-heavy · narrative + data-density section per V04 plan).
 *
 * @when  v0.4 PDP body §12. Below §11 Industry Analysis · above §13 D-S Gap.
 *
 * @how   - 3 canonical filled-black pill tabs
 *        - Sectors: 2-up card grid · border-left accent · inline KPI stat strip per card
 *        - Shelf-Life Matrix: data table · canonical horizontal-rule pattern · 40px rows
 *        - Players & 3PL: SegmentSplitBar pattern (refs canonical · matches §08+§10)
 *        - InsightBox closer
 *
 * Data anchors: PRD V2.1 §6.4 verbatim end-user share + §8.11 product-handling
 * matrix. Player attribution from §07 Ecosystem + Ken Primary segment survey.
 *
 * @relatedDoc projects/_briefs/v1-product-page/V04-MASTER-PLAN-2026-05-20.md §3.16
 */

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@kenresearch/design-system/ui/tabs';
import { TABS_LIST_PRIMARY, TABS_TRIGGER_PRIMARY } from '@/lib/tab-styles';
import { SectionLabel } from '@kenresearch/design-system/atoms';
import { SourceCluster } from '@/components/atoms/SourceCluster';
import { MetricStrip } from '@/components/atoms/MetricStrip';
import { InsightBox } from '@/components/atoms/InsightBox';
import { getSources } from '@/lib/sources';
import { KEN_CHART_SERIES_ARRAY } from '@kenresearch/design-system/charts';
import { TableShell } from '@/components/atoms/TableShell';

// ─────────────────────────────────────────────────────────────────
// Data · PRD V2.1 §6.4 verbatim + §8.11 handling matrix
// ─────────────────────────────────────────────────────────────────

interface SectorCard {
  name: string;
  share: string;       // PRD verbatim share
  revenue: string;     // AUD Mn 2022
  cagr: string;        // forward forecast
  lead: string;        // 1-line analyst lead
  body: string;        // 2-3 sentence narrative
  drivers: readonly string[];
}

const SECTORS: readonly SectorCard[] = [
  {
    name: 'Meat & Seafood',
    share: '43.8%',
    revenue: 'AUD 2,867.1 Mn',
    cagr: '8.4%',
    lead: 'The volume engine · export-protein-led growth.',
    body: 'Beef + lamb + dairy-adjacent processed proteins drive the largest end-user vertical. Export demand to East Asia + Middle East sustains volume · domestic retail consolidation adds steady base.',
    drivers: [
      'Beef + lamb export volume (East Asia · Middle East)',
      'Domestic retail consolidation · Coles + Woolworths DC capex',
      'MLA processing capacity additions through 2027',
    ],
  },
  {
    name: 'Fruits & Vegetables',
    share: '23.0%',
    revenue: 'AUD 1,506.7 Mn',
    cagr: '7.2%',
    lead: 'The seasonality tier · chiller-dominated demand.',
    body: 'Fresh produce + horticulture exports + domestic supermarket cold-chain. Chiller capacity (0–8°C) is the dominant capacity class. Demand peaks Oct–Mar (summer harvest) · creates seasonal Tier-1 utilization spikes.',
    drivers: [
      'Horticulture export to Asian markets',
      'Domestic supermarket fresh-grocery growth',
      'Climate-adapted growing region shifts',
    ],
  },
  {
    name: 'Pharma + Biologics',
    share: '17.0%',
    revenue: 'AUD 1,112.4 Mn',
    cagr: '12.4%',
    lead: 'The margin tier · highest CAGR · TGA-compliant capacity moat.',
    body: 'Vaccines + biologics + temperature-sensitive therapies. TGA Cold Chain Guideline 2023 enforces facility audit cycles · creates Tier-1 operator moat. Premium pricing 25–35% above blended-market rates.',
    drivers: [
      'Vaccine + biologic distribution volume',
      'TGA compliance audit cycle 2024-27',
      'Clinical trial cold-chain expansion',
    ],
  },
  {
    name: 'Confectionery + RTE',
    share: '9.8%',
    revenue: 'AUD 641.5 Mn',
    cagr: '8.9%',
    lead: 'The brand-led tier · ambient + chiller mixed handling.',
    body: 'Chocolate + premium confectionery (temperature-controlled) + ready-to-eat meals. Domestic brand growth (Cadbury · Allen\'s · plant-based RTE startups) · convenience retail expansion.',
    drivers: [
      'Premium chocolate ambient cold-chain (16–18°C)',
      'RTE meal-kit fulfilment · direct-to-consumer',
      'Convenience-format retail growth',
    ],
  },
];

interface ShelfLifeRow {
  product: string;
  temp: string;
  shelf: string;
  tech: string;
}

const SHELF_LIFE_MATRIX: readonly ShelfLifeRow[] = [
  { product: 'Fresh beef · chilled',       temp: '−1 to +2°C',  shelf: '14–21 days',  tech: 'Vacuum + MAP packaging · chiller transport' },
  { product: 'Frozen meat',                temp: '−18°C or lower', shelf: '6–12 months', tech: 'Blast freezer + frozen reefer + cold-room storage' },
  { product: 'Fresh fish · whole',         temp: '0 to +2°C',   shelf: '5–7 days',    tech: 'Ice + insulated container · domestic + airfreight' },
  { product: 'Fresh dairy · pasteurized',  temp: '+2 to +4°C',  shelf: '14 days',     tech: 'Chiller DC + last-mile reefer · TGA-aligned audit' },
  { product: 'Fresh produce · leafy',      temp: '+0 to +4°C',  shelf: '5–10 days',   tech: 'Chiller + RH 90%+ · ethylene control' },
  { product: 'Vaccine · refrigerated',     temp: '+2 to +8°C',  shelf: '6–24 months', tech: 'TGA-compliant Tier-1 facility · GPS+temp-logger reefer' },
  { product: 'Vaccine · ultra-cold',       temp: '−60 to −80°C',shelf: '12 months',   tech: 'Ultra-low-temp freezer · dry-ice last-mile · audit-trail' },
  { product: 'Ice cream · frozen',         temp: '−25°C or lower', shelf: '12 months',   tech: 'Deep-freeze chamber + reefer fleet · brand-protected' },
  { product: 'Chocolate · premium',        temp: '+16 to +18°C',shelf: '12 months',   tech: 'Ambient-cool + humidity-controlled · seasonal handling' },
  { product: 'RTE meal · chilled',         temp: '+0 to +4°C',  shelf: '7–10 days',   tech: 'Chiller + flash-cool · last-mile <2hr from DC' },
];

const PLAYERS_3PL = {
  threePL: 56.4,
  owned: 43.6,
};

const NAMED_PLAYERS_3PL = [
  { sector: 'Meat & Seafood',    primary: 'Lineage · Americold · Linfox',         secondary: 'Toll · Don Watson' },
  { sector: 'Fruits & Vegetables', primary: 'Coles Primary Connect · Woolworths',   secondary: 'Costa Group · Perfection Fresh' },
  { sector: 'Pharma + Biologics', primary: 'DHL Supply Chain · Linfox · Toll',     secondary: 'Specialty TGA-compliant Tier-1' },
  { sector: 'Confectionery + RTE', primary: 'Linfox · Toll · NewCold',              secondary: 'Brand-owned DC (Cadbury · Allen\'s)' },
];

// ─────────────────────────────────────────────────────────────────
// Tab styling · canonical
// ─────────────────────────────────────────────────────────────────

// Tab styling · canonical pill style per tab-styles.ts (Sprint 4 fix)

// ─────────────────────────────────────────────────────────────────
// SectorCard · per-sector deep dive
// ─────────────────────────────────────────────────────────────────

function SectorCardEl({ data }: { data: SectorCard }) {
  return (
    <article className="border-l-2 border-[var(--color-brand-red,#b01f24)] pl-5 sm:pl-6 py-2 max-w-[60ch]">
      {/* Sector name + share badge */}
      <div className="flex items-baseline gap-3 mb-1 flex-wrap">
        <h3
          className="font-display font-light text-[var(--semantic-ink-strong)]"
          style={{ fontSize: '20px', letterSpacing: '-0.015em', lineHeight: 1.2 }}
        >
          {data.name}
        </h3>
        <span
          className="font-body uppercase tracking-[0.1em] text-[var(--color-brand-red,#b01f24)]"
          style={{ fontSize: '10.5px', fontWeight: 700 }}
        >
          {data.share} share
        </span>
      </div>

      {/* Lead · italic · ink-body */}
      <p
        className="font-body italic text-[var(--semantic-ink-body)] mb-3"
        style={{ fontSize: '14px', lineHeight: 1.5 }}
      >
        {data.lead}
      </p>

      {/* KPI row · revenue + CAGR · inline tabular */}
      <div className="flex items-baseline gap-x-6 gap-y-2 mb-3 flex-wrap">
        <div>
          <p className="font-body uppercase tracking-[0.12em] text-[var(--semantic-ink-muted)] mb-0.5" style={{ fontSize: '9.5px', fontWeight: 600 }}>
            2022 Revenue
          </p>
          <p
            className="font-display font-light text-[var(--semantic-ink-strong)] whitespace-nowrap"
            style={{ fontSize: '17px', letterSpacing: '-0.015em', fontVariantNumeric: 'tabular-nums lining-nums', lineHeight: 1 }}
          >
            {data.revenue}
          </p>
        </div>
        <div>
          <p className="font-body uppercase tracking-[0.12em] text-[var(--semantic-ink-muted)] mb-0.5" style={{ fontSize: '9.5px', fontWeight: 600 }}>
            CAGR · 2022-27F
          </p>
          <p
            className="font-display font-light text-[var(--color-brand-red,#b01f24)] whitespace-nowrap"
            style={{ fontSize: '17px', letterSpacing: '-0.015em', fontVariantNumeric: 'tabular-nums lining-nums', lineHeight: 1 }}
          >
            {data.cagr}
          </p>
        </div>
      </div>

      {/* Body prose */}
      <p
        className="font-body text-[var(--semantic-ink-body)] mb-3"
        style={{ fontSize: '13.5px', lineHeight: 1.6 }}
      >
        {data.body}
      </p>

      {/* Drivers · 3 bullets */}
      <ul className="space-y-1.5">
        {data.drivers.map((d, i) => (
          <li
            key={i}
            className="flex items-start gap-2 font-body text-[var(--semantic-ink-body)]"
            style={{ fontSize: '12.5px', lineHeight: 1.5 }}
          >
            <span
              aria-hidden="true"
              className="inline-block flex-none rounded-full mt-[7px]"
              style={{ width: '4px', height: '4px', background: 'var(--color-brand-red, #b01f24)' }}
            />
            <span>{d}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

// ─────────────────────────────────────────────────────────────────
// Section
// ─────────────────────────────────────────────────────────────────

export function EndUserSection() {
  return (
    <section
      id="end-user"
      aria-labelledby="end-user-heading"
      className="px-4 sm:px-6 lg:px-12 max-w-[1100px] mx-auto w-full scroll-mt-[120px]"
    >
      <div className="inline-flex mb-3">
        <SectionLabel background="light" variant="accent">
          Section 12 · End-User Deep Dives
        </SectionLabel>
      </div>

      <h2
        id="end-user-heading"
        className="font-display font-light text-[clamp(28px,3vw,39px)] leading-[1.15] tracking-[-0.015em] text-[var(--semantic-ink-strong)] mb-3"
      >
        Where the cold chain actually serves the economy
      </h2>

      <p
        className="font-body text-[var(--semantic-ink-body)] max-w-[64ch] mb-10"
        style={{ fontSize: '17px', lineHeight: 1.65 }}
      >
        Four end-user verticals account for{' '}
        <strong className="font-medium text-[var(--semantic-ink-strong)]" style={{ fontVariantNumeric: 'tabular-nums lining-nums' }}>93.6%</strong>{' '}
        of cold-chain revenue · meat & seafood lead at{' '}
        <strong className="font-medium text-[var(--semantic-ink-strong)]" style={{ fontVariantNumeric: 'tabular-nums lining-nums' }}>43.8%</strong>{' '}
        · pharma sits at just{' '}
        <strong className="font-medium text-[var(--semantic-ink-strong)]" style={{ fontVariantNumeric: 'tabular-nums lining-nums' }}>17.0%</strong>{' '}
        but compounds at the highest forward CAGR (
        <strong className="font-medium text-[var(--color-brand-red,#b01f24)]" style={{ fontVariantNumeric: 'tabular-nums lining-nums' }}>12.4%</strong>
        ).
      </p>

      <Tabs defaultValue="sectors" className="w-full">
        <TabsList className={TABS_LIST_PRIMARY}>
          {[
            { v: 'sectors',    label: 'Sectors' },
            { v: 'shelf-life', label: 'Shelf-Life Matrix' },
            { v: 'players',    label: 'Players & 3PL' },
          ].map((t) => (
            <TabsTrigger key={t.v} value={t.v} className={TABS_TRIGGER_PRIMARY}>
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* ─── Tab 1 · Sectors ────────────────────────────────────────── */}
        <TabsContent value="sectors" className="mt-0 space-y-10">
          <MetricStrip
            metrics={SECTORS.map((s) => ({
              eyebrow: s.name,
              value: s.share,
              descriptor: `${s.revenue} · ${s.cagr} CAGR`,
            }))}
            columns={4}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">
            {SECTORS.map((s) => (
              <SectorCardEl key={s.name} data={s} />
            ))}
          </div>

          <SourceCluster
            citations={getSources([
              'ken-primary-segment-2024',
              'mla-redmeat-2024',
              'dairy-australia-2024',
              'tga-cold-chain-2023',
            ])}
            methodologyHref="#methodology"
          />

          <InsightBox
            eyebrow="What this means for capacity planning"
            lead="Meat is the moat · pharma is the margin · produce is the seasonal hedge."
            body={
              <>
                Meat & seafood at 43.8% revenue share is the structural volume base · loss of major export contracts directly compresses Tier-1 utilization. Pharma at 17% but{' '}
                <strong className="font-medium text-[var(--semantic-ink-strong)]">12.4% CAGR</strong> is where 2027F margin growth sits · TGA-compliant capacity is the rate-limit. Fruits & veg seasonality drives Oct-Mar capacity peaks that operators must staff for · permanent over-build risk if utilization not modeled.
              </>
            }
          />
        </TabsContent>

        {/* ─── Tab 2 · Shelf-Life Matrix ──────────────────────────────── */}
        <TabsContent value="shelf-life" className="mt-0 space-y-10">
          <p className="font-body text-[var(--semantic-ink-body)] max-w-[60ch]" style={{ fontSize: '16px', lineHeight: 1.65 }}>
            Product-handling matrix · 10 representative product classes · temperature range · expected shelf life · cold-chain technology requirement. Source: PRD V2.1 §8.11 · operator-validated 2024.
          </p>

          {/* Shelf-Life Matrix · TableShell canonical atom */}
          <TableShell
            ariaLabel="Shelf-life matrix · product class vs temperature, shelf life, tech requirement"
            minWidth={700}
            columns={[
              { key: 'product', label: 'Product class' },
              { key: 'temp',    label: 'Temperature' },
              { key: 'shelf',   label: 'Shelf life' },
              { key: 'tech',    label: 'Tech requirement', italic: true },
            ]}
            rows={SHELF_LIFE_MATRIX.map((r) => ({
              product: r.product,
              temp:    r.temp,
              shelf:   r.shelf,
              tech:    r.tech,
            }))}
          />

          <SourceCluster
            citations={getSources([
              'ken-primary-coldchain-2024',
              'tga-cold-chain-2023',
              'afcc-standards-2023',
            ])}
            methodologyHref="#methodology"
          />

          <InsightBox
            eyebrow="What this means for facility design"
            lead="Single-temp facilities lock you into one sector · multi-temp capacity buys optionality."
            body="Pure-frozen facilities serve meat + ice cream but not pharma or chocolate. Multi-temp (frozen + chiller + ambient-cool zones) capacity captures premium-tier customers across pharma + dairy + confectionery · 18-22% margin uplift vs single-temp. Capex premium ~15% for the optionality."
          />
        </TabsContent>

        {/* ─── Tab 3 · Players & 3PL ──────────────────────────────────── */}
        <TabsContent value="players" className="mt-0 space-y-10">
          <p className="font-body text-[var(--semantic-ink-body)] max-w-[60ch]" style={{ fontSize: '16px', lineHeight: 1.65 }}>
            3PL operators dominate at{' '}
            <strong className="font-medium text-[var(--semantic-ink-strong)]" style={{ fontVariantNumeric: 'tabular-nums lining-nums' }}>56.4%</strong>{' '}
            of cold-chain revenue · brand-owned + in-house DC capacity claims the remaining{' '}
            <strong className="font-medium text-[var(--semantic-ink-strong)]" style={{ fontVariantNumeric: 'tabular-nums lining-nums' }}>43.6%</strong>
            . Mix varies by end-user vertical.
          </p>

          {/* 3PL vs Owned split bar · refs canonical SegmentSplitBar pattern */}
          <div>
            <div className="flex items-baseline justify-between mb-3 flex-wrap gap-2">
              <p
                className="font-body uppercase tracking-[0.12em] text-[var(--semantic-ink-strong)]"
                style={{ fontSize: '11px', fontWeight: 600 }}
              >
                3PL vs Owned · 2022 cold-chain revenue
              </p>
              <p className="font-body text-[11px] italic text-[var(--semantic-ink-muted)]">
                Diverging margin profiles
              </p>
            </div>
            <div
              className="flex h-9 w-full rounded-[var(--radius-xs,5px)] overflow-hidden border border-[var(--black-100)]"
              role="img"
              aria-label={`3PL ${PLAYERS_3PL.threePL}% · Owned ${PLAYERS_3PL.owned}%`}
            >
              <div className="h-full" style={{ width: `${PLAYERS_3PL.threePL}%`, background: KEN_CHART_SERIES_ARRAY[0] }} />
              <div className="h-full" style={{ width: `${PLAYERS_3PL.owned}%`, background: KEN_CHART_SERIES_ARRAY[1] }} />
            </div>
            <div
              className="grid mt-3 gap-x-3"
              style={{ gridTemplateColumns: `${PLAYERS_3PL.threePL}fr ${PLAYERS_3PL.owned}fr` }}
            >
              <div>
                <p className="flex items-center gap-2 mb-0.5 flex-wrap">
                  <span aria-hidden="true" className="inline-block w-2.5 h-2.5 rounded-[2px] flex-none" style={{ background: KEN_CHART_SERIES_ARRAY[0] }} />
                  <span className="font-body font-medium text-[var(--semantic-ink-strong)]" style={{ fontSize: '12px' }}>3PL operators</span>
                </p>
                <p className="font-body tabular-nums text-[var(--semantic-ink-body)]" style={{ fontSize: '12px' }}>
                  {PLAYERS_3PL.threePL}% · Lineage · Americold · Linfox · Toll · DHL
                </p>
              </div>
              <div>
                <p className="flex items-center gap-2 mb-0.5 flex-wrap">
                  <span aria-hidden="true" className="inline-block w-2.5 h-2.5 rounded-[2px] flex-none" style={{ background: KEN_CHART_SERIES_ARRAY[1] }} />
                  <span className="font-body font-medium text-[var(--semantic-ink-strong)]" style={{ fontSize: '12px' }}>Brand-owned + in-house</span>
                </p>
                <p className="font-body tabular-nums text-[var(--semantic-ink-body)]" style={{ fontSize: '12px' }}>
                  {PLAYERS_3PL.owned}% · Coles + Woolworths + brand DCs (Cadbury · Allen\'s)
                </p>
              </div>
            </div>
            <p className="font-body italic text-[var(--semantic-ink-muted)] mt-4 max-w-[60ch]" style={{ fontSize: '13px', lineHeight: 1.55 }}>
              Ken Primary segment survey 2024 · cross-validated w/ ABS freight + ASX-listed operator disclosures.
            </p>
          </div>

          {/* Named players table by sector · TableShell canonical atom */}
          <TableShell
            ariaLabel="Named 3PL players by end-user sector"
            minWidth={640}
            className="mt-8"
            columns={[
              { key: 'sector',    label: 'Sector' },
              { key: 'primary',   label: 'Primary 3PL players' },
              { key: 'secondary', label: 'Secondary · owned + niche', italic: true },
            ]}
            rows={NAMED_PLAYERS_3PL.map((r) => ({
              sector:    r.sector,
              primary:   r.primary,
              secondary: r.secondary,
            }))}
          />

          <SourceCluster
            citations={getSources([
              'ken-primary-segment-2024',
              'lineage-investor-day-2024',
              'americold-10k-2023',
              'linfox-mediarelease-2024',
              'coles-fy25h1-2025',
            ])}
            methodologyHref="#methodology"
          />

          <InsightBox
            eyebrow="What this means for ownership strategy"
            lead="3PL dominance is structural · brand-owned only wins where IP protection or seasonality demands it."
            body="3PL operators capture 56% revenue because cold-chain capex is heavy + utilization-sensitive. Brand-owned DCs win in: (1) seasonal-extreme verticals (Cadbury chocolate · Allen's confectionery · brand-protected handling); (2) supermarket scale where retailer captures DC margin (Coles Primary Connect · Woolworths). For pharma the 3PL bias is highest (>70%) due to TGA-compliance specialization."
          />
        </TabsContent>
      </Tabs>
    </section>
  );
}
