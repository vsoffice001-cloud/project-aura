'use client';

/**
 * MarketSizeSection — v0.4 §08 Market Size & Growth (REBUILD v3 · 2026-05-21)
 *
 * @what  Premium combo view · no tabs · no overlay drift · modal dataset:
 *        - Sharp claim H2 + 1-line opener
 *        - MilestoneRow · single-line tabular at all widths (no orphan wraps)
 *        - One ColumnChart spanning full decade
 *        - Phase strip BELOW chart marks Pre-COVID / COVID / Recovery / Forecast
 *        - Source line + "View dataset" modal trigger paired on same row
 *        - Annotations sit BELOW chart in narrative blocks (not overlaid)
 *        - SegmentSplitBar · labels below bar (overflow fix)
 *        - Dataset opens in DS Dialog modal (Radix) · NOT inline disclosure
 *          (reusable pattern for §09 · §13 · §16 · §22)
 *
 * @why   v2 used absolute overlay layer over Highcharts → wrong x-coords at all widths
 *        (Highcharts plot-area has internal padding, no exposed API). Per aura-qa
 *        diagnosis: drop overlay pattern entirely · move annotations to narrative
 *        cards BELOW chart. Zero coord-drift risk · works at any width.
 *
 * @when  v0.4 PDP body §08. Below §07 Ecosystem.
 *
 * @how   1. MilestoneRow → flex-nowrap + responsive font sizes (no orphans)
 *        2. Chart stays bare ColumnChart · NO overlay
 *        3. Phase strip · 11-col CSS grid below chart · 4 phase colors
 *        4. AnnotationCards · 3 cards in row below chart · each cites year + driver
 *        5. SegmentSplitBar · label always below bar (no inline overflow)
 *        6. Unified dataset disclosure unchanged (worked already)
 *
 * Source: PRD V2.1 §6.3 + §6.4 segment split + methodology §19.
 * QA fixes: aura-qa 2026-05-21 (bugs 1-7 surgical fixes per Option B).
 * Live-alignment pass 2026-05-21: CAGR 10.03% → 10.3% (matches live PDP) ·
 * annotation drivers re-based to live language ("growing phase" · cold-transport
 * share rising · Lineage geographic expansion) · caption notes AUD anchors
 * are PRD-derived (live PDP doesn't expose annual figures).
 */

import { Table2, Download } from 'lucide-react';
import { SectionLabel } from '@kenresearch/design-system/atoms';
import { SourceCluster } from '@/components/atoms/SourceCluster';
import { GatedBlock } from '@/components/atoms/GatedBlock';
import { PremiumLockCard } from '@/components/atoms/PremiumLockCard';
import { InsightBox } from '@/components/atoms/InsightBox';
import { TableShell } from '@/components/atoms/TableShell';
import { getSources } from '@/lib/sources';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@kenresearch/design-system/ui/dialog';
import { KenColumnChart, ChartFigure, KEN_CHART_SERIES_ARRAY } from '@kenresearch/design-system/charts';

// ─────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────

type Phase = 'Pre-COVID' | 'COVID' | 'Recovery' | 'Forecast';

interface YearPoint {
  year: string;
  value: number;
  phase: Phase;
  isAnchor: boolean;
  isProjected: boolean;
}

const SERIES: YearPoint[] = [
  { year: '2017',  value: 4231.1,  phase: 'Pre-COVID', isAnchor: true,  isProjected: false },
  { year: '2018',  value: 4616.1,  phase: 'Pre-COVID', isAnchor: false, isProjected: false },
  { year: '2019',  value: 5036.2,  phase: 'Pre-COVID', isAnchor: false, isProjected: false },
  { year: '2020',  value: 5494.6,  phase: 'COVID',     isAnchor: false, isProjected: false },
  { year: '2021',  value: 5994.9,  phase: 'COVID',     isAnchor: false, isProjected: false },
  { year: '2022',  value: 6547.8,  phase: 'Recovery',  isAnchor: true,  isProjected: false },
  { year: '2023',  value: 7204.6,  phase: 'Recovery',  isAnchor: false, isProjected: true  },
  { year: '2024',  value: 7927.4,  phase: 'Forecast',  isAnchor: false, isProjected: true  },
  { year: '2025',  value: 8722.9,  phase: 'Forecast',  isAnchor: false, isProjected: true  },
  { year: '2026',  value: 9598.0,  phase: 'Forecast',  isAnchor: false, isProjected: true  },
  { year: '2027F', value: 10705.0, phase: 'Forecast',  isAnchor: true,  isProjected: true  },
];

// S3-2026-05-22 · Sequential color narrative: neutral → cool (disruption) → warm (recovery) → cool (forecast)
// Recovery = coral-soft (NOT bright coral) · Forecast = periwinkle (syncs with chart forecast bars)
const PHASE_COLORS: Record<Phase, { bg: string; text: string }> = {
  'Pre-COVID': { bg: 'var(--black-50, rgba(0,0,0,0.04))',      text: 'var(--semantic-ink-muted)' },
  'COVID':     { bg: 'rgba(195, 198, 249, 0.20)',              text: 'var(--periwinkle-800, #7075c8)' },
  'Recovery':  { bg: 'rgba(249, 155, 133, 0.18)',              text: 'rgba(176, 84, 60, 0.95)' },
  // S3-2026-05-22 · Forecast → periwinkle (syncs w/ dashed forecast bars in chart)
  'Forecast':  { bg: 'var(--color-forecast-bg, rgba(195,198,249,0.20))', text: 'var(--color-forecast-text, rgba(112,117,200,0.95))' },
};

const SEGMENT_2022 = {
  coldStorage: 2647.8,
  coldTransport: 3900.0,
  total: 6547.8,
};

// Annotation drivers · re-based to live kenresearch.com PDP language (verbatim where possible)
// 2020 = COVID step (pharma + e-commerce echoed on live)
// 2022 = cold transport share rising (live: "increase in share of cold transport market")
// 2025 = Lineage geographic expansion (live: "Lineage is capitalizing the market opportunity · covering maximum provinces")
const ANNOTATIONS: { year: string; label: string; body: string }[] = [
  {
    year: '2020',
    label: 'COVID demand step',
    body: 'Pharma cold-chain demand + e-commerce perishables surge sustain growth despite disruption — meat, seafood and dairy lead end-user pull.',
  },
  {
    year: '2022',
    label: 'Cold transport share rises',
    body: 'Cold transport segment outpaces storage growth · market enters "growing phase" on logistics-provider collaboration and geographic advantage.',
  },
  {
    year: '2025',
    label: 'Lineage geographic expansion',
    body: 'Lineage capitalizes opportunity by covering maximum provinces · Americold, NewCold and DP World scale alongside.',
  },
];

// MilestoneRow REMOVED 2026-05-21 · 5-column arrow-stat-arrow-stat-arrow-stat grid
// failed UX (11 visual elements competing · no story rhythm · 2022 over-dominant).
// Metrics now inline in lede paragraph (refs canonical · merged-report pattern).
// Kept in git history for reference. Pattern: any timeline/trajectory anchor data
// goes inline in prose · not in a chart-axis-style grid above the chart.

// ─────────────────────────────────────────────────────────────────
// PhaseStrip · 11-col grid below chart · marks Pre-COVID/COVID/Recovery/Forecast
// (Each cell aligned w/ year label · zero coord-drift risk)
// ─────────────────────────────────────────────────────────────────

function PhaseStrip() {
  // Group consecutive same-phase years into runs for cleaner labels
  type Run = { phase: Phase; start: number; end: number; count: number };
  const runs: Run[] = [];
  SERIES.forEach((p, i) => {
    const last = runs[runs.length - 1];
    if (last && last.phase === p.phase) {
      last.end = i;
      last.count += 1;
    } else {
      runs.push({ phase: p.phase, start: i, end: i, count: 1 });
    }
  });

  return (
    <div className="mt-4">
      <div
        className="grid gap-1"
        style={{ gridTemplateColumns: `repeat(${SERIES.length}, minmax(0, 1fr))` }}
        role="img"
        aria-label="Phase breakdown across 2017 to 2027F"
      >
        {runs.map((r) => {
          const c = PHASE_COLORS[r.phase];
          return (
            <div
              key={`${r.phase}-${r.start}`}
              className="rounded-[3px] px-2 py-1.5 text-center overflow-hidden"
              style={{
                gridColumn: `${r.start + 1} / span ${r.count}`,
                background: c.bg,
                color: c.text,
              }}
            >
              <p
                className="font-body tracking-[0.08em] uppercase truncate"
                style={{ fontSize: '10px', fontWeight: 600, lineHeight: 1.3 }}
              >
                {r.phase}
              </p>
              <p
                className="font-body tabular-nums truncate"
                style={{ fontSize: '10px', opacity: 0.85, lineHeight: 1.3 }}
              >
                {SERIES[r.start].year}{r.count > 1 ? `–${SERIES[r.end].year}` : ''}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// AnnotationCards · 3 narrative cards below chart · explain key years
// ─────────────────────────────────────────────────────────────────

// AnnotationCard · single card rendering · used both free + gated
function AnnotationCard({ year, label, body }: { year: string; label: string; body: string }) {
  return (
    <article className="border-l-2 border-[var(--color-brand-red,#b01f24)] pl-4 py-1 h-full min-w-0 w-full overflow-hidden">
      <p className="flex items-baseline gap-2 mb-1.5 flex-wrap">
        <span
          className="font-body text-[var(--color-brand-red,#b01f24)] font-medium"
          style={{ fontSize: '13px', letterSpacing: '0.02em', fontVariantNumeric: 'tabular-nums' }}
        >
          {year}
        </span>
        <span
          className="font-body font-medium text-[var(--semantic-ink-strong)]"
          style={{ fontSize: '14px' }}
        >
          {label}
        </span>
      </p>
      <p
        className="font-body text-[var(--semantic-ink-body)]"
        style={{ fontSize: '13px', lineHeight: 1.55 }}
      >
        {body}
      </p>
    </article>
  );
}

function AnnotationCards() {
  // Show first 2 cards free · gate the 3rd (Lineage detail · premium pipeline
  // intel · the "what they don't show you" hook).
  const freeCards = ANNOTATIONS.slice(0, 2);
  const gatedCard = ANNOTATIONS[2];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
      {freeCards.map((a) => (
        <AnnotationCard key={a.year} year={a.year} label={a.label} body={a.body} />
      ))}
      {gatedCard && (
        <GatedBlock
          lockCard={
            <PremiumLockCard
              tier="lead"
              variant="minimal"
              headline="Player-level pipeline intel"
              primaryCta={{ label: 'Talk to expert', href: '/contact-expert?ref=08-pipeline' }}
            />
          }
        >
          <AnnotationCard year={gatedCard.year} label={gatedCard.label} body={gatedCard.body} />
        </GatedBlock>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// SegmentSplitBar · 2022 composition · labels BELOW bar (no inline overflow)
// ─────────────────────────────────────────────────────────────────

function SegmentSplitBar() {
  const storagePct = (SEGMENT_2022.coldStorage / SEGMENT_2022.total) * 100;
  const transportPct = (SEGMENT_2022.coldTransport / SEGMENT_2022.total) * 100;
  return (
    <div className="mt-12 mb-2">
      <div className="flex items-baseline justify-between mb-3 flex-wrap gap-2">
        <p
          className="font-body uppercase tracking-[0.12em] text-[var(--semantic-ink-strong)]"
          style={{ fontSize: '11px', fontWeight: 600 }}
        >
          2022 composition · AUD 6,547.8 Mn split
        </p>
        <p className="font-body text-[11px] italic text-[var(--semantic-ink-subtle)]">
          Cold Transport leads · Cold Storage CAGR rising faster
        </p>
      </div>

      {/* Bar */}
      <div
        className="flex h-7 w-full rounded-[var(--radius-xs,5px)] overflow-hidden border border-[var(--black-100)]"
        role="img"
        aria-label={`Cold Storage ${storagePct.toFixed(1)}% · Cold Transport ${transportPct.toFixed(1)}%`}
      >
        <div
          className="h-full"
          style={{ width: `${storagePct}%`, background: KEN_CHART_SERIES_ARRAY[0] }}
        />
        <div
          className="h-full"
          style={{ width: `${transportPct}%`, background: KEN_CHART_SERIES_ARRAY[1] }}
        />
      </div>

      {/* Labels BELOW bar · grid matches segment widths · no overflow */}
      <div
        className="grid mt-2 gap-x-3"
        style={{ gridTemplateColumns: `${storagePct}fr ${transportPct}fr` }}
      >
        <div className="min-w-0">
          <p className="flex items-center gap-2 mb-0.5 flex-wrap">
            <span
              aria-hidden="true"
              className="inline-block w-2.5 h-2.5 rounded-[2px] flex-none"
              style={{ background: KEN_CHART_SERIES_ARRAY[0] }}
            />
            <span
              className="font-body font-medium text-[var(--semantic-ink-strong)]"
              style={{ fontSize: '12px' }}
            >
              Cold Storage
            </span>
          </p>
          <p className="font-body tabular-nums text-[var(--semantic-ink-body)]" style={{ fontSize: '12px' }}>
            AUD 2,647.8 Mn · {storagePct.toFixed(1)}%
          </p>
        </div>
        <div className="min-w-0">
          <p className="flex items-center gap-2 mb-0.5 flex-wrap">
            <span
              aria-hidden="true"
              className="inline-block w-2.5 h-2.5 rounded-[2px] flex-none"
              style={{ background: KEN_CHART_SERIES_ARRAY[1] }}
            />
            <span
              className="font-body font-medium text-[var(--semantic-ink-strong)]"
              style={{ fontSize: '12px' }}
            >
              Cold Transport
            </span>
          </p>
          <p className="font-body tabular-nums text-[var(--semantic-ink-body)]" style={{ fontSize: '12px' }}>
            AUD 3,900.0 Mn · {transportPct.toFixed(1)}%
          </p>
        </div>
      </div>

      <p className="font-body text-[11px] text-[var(--semantic-ink-subtle)] italic mt-3 max-w-[60ch]">
        2022 split per Ken Primary segment survey + ABS freight movement data.
      </p>

      {/* ──── 2027F projected split · gated preview ──── */}
      <div className="mt-6">
        <div className="flex items-baseline justify-between mb-3 flex-wrap gap-2">
          <p
            className="font-body uppercase tracking-[0.12em] text-[var(--semantic-ink-strong)]"
            style={{ fontSize: '11px', fontWeight: 600 }}
          >
            2027F composition · projected AUD 10,705 Mn split
          </p>
          <p className="font-body text-[11px] italic text-[var(--semantic-ink-subtle)]">
            Forecast composition · premium content
          </p>
        </div>

        <GatedBlock
          blurStrength={6}
          lockCard={
            <PremiumLockCard
              tier="lead"
              variant="compact"
              headline="See 2027F Cold Storage vs Cold Transport split + per-segment CAGR"
              primaryCta={{ label: 'Talk to expert', href: '/contact-expert?ref=08-2027f-split' }}
            />
          }
        >
          {/* Placeholder blurred composition · realistic-shape decoy values ·
              real backend MUST redact data server-side · CSS blur is decoy only */}
          <div className="flex h-7 w-full rounded-[var(--radius-xs,5px)] overflow-hidden border border-[var(--black-100)]" aria-hidden="true">
            <div className="h-full" style={{ width: '46%', background: KEN_CHART_SERIES_ARRAY[0] }} />
            <div className="h-full" style={{ width: '54%', background: KEN_CHART_SERIES_ARRAY[1] }} />
          </div>
          <div className="grid mt-2 gap-x-3" style={{ gridTemplateColumns: '46fr 54fr' }} aria-hidden="true">
            <div>
              <p className="font-body text-[var(--semantic-ink-strong)]" style={{ fontSize: '12px', fontWeight: 500 }}>Cold Storage</p>
              <p className="font-body text-[var(--semantic-ink-muted)]" style={{ fontSize: '12px' }}>AUD ████ Mn · ██%</p>
            </div>
            <div>
              <p className="font-body text-[var(--semantic-ink-strong)]" style={{ fontSize: '12px', fontWeight: 500 }}>Cold Transport</p>
              <p className="font-body text-[var(--semantic-ink-muted)]" style={{ fontSize: '12px' }}>AUD ████ Mn · ██%</p>
            </div>
          </div>
        </GatedBlock>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// DatasetModal · DS Dialog · trigger button + modal w/ table
// Reusable pattern for §09 · §13 · §16 · §22 chart sections
// ─────────────────────────────────────────────────────────────────

function DatasetModalTrigger() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-[var(--radius-xs,5px)] border border-[var(--black-200)] bg-[var(--color-foundation-white)] px-3 py-1.5 font-body text-[12px] font-medium text-[var(--semantic-ink-strong)] hover:border-[var(--semantic-ink-strong)] hover:text-[var(--color-brand-red,#b01f24)] transition-colors"
        >
          <Table2 size={13} aria-hidden="true" />
          View dataset
          <span className="font-normal text-[var(--semantic-ink-subtle)]">· 11 rows</span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-[760px] w-[calc(100vw-32px)] max-h-[85vh] overflow-hidden flex flex-col p-0 gap-0">
        <DialogHeader className="px-6 pt-5 pb-4 border-b border-[var(--black-100)]">
          <p className="font-body uppercase tracking-[0.12em] text-[var(--semantic-ink-subtle)] mb-1.5" style={{ fontSize: '10px', fontWeight: 600 }}>
            Section 08 · Market Size
          </p>
          <DialogTitle className="font-display font-light text-[var(--semantic-ink-strong)] tracking-tight" style={{ fontSize: '22px', lineHeight: 1.2 }}>
            Australia Cold Chain Market Size · 2017–2027F
          </DialogTitle>
          <DialogDescription className="font-body text-[13px] text-[var(--semantic-ink-body)] mt-1.5 max-w-[60ch]">
            Annual market size in AUD Mn · YoY growth · phase classification. 2017, 2022 and 2027 are PRD anchors · intermediate years compounded at observed CAGR.
          </DialogDescription>
        </DialogHeader>

        <div className="overflow-auto py-4 flex-1">
          {/* S3-2026-05-22 · migrated to TableShell · stickyHeader fixes occlude bug ·
              phasePill renderer applies canonical phase colors from TableShell token map */}
          <TableShell
            ariaLabel="Annual market size historical and forecast"
            stickyHeader
            minWidth={720}
            columns={[
              { key: 'year',   label: 'Year' },
              { key: 'size',   label: 'Size (AUD Mn)', numeric: true, align: 'right' },
              { key: 'yoy',    label: 'YoY', numeric: true, align: 'right' },
              { key: 'phase',  label: 'Phase', phasePill: true },
              { key: 'source', label: 'Source', italic: true },
            ]}
            rows={SERIES.map((row, i) => {
              const prev = i > 0 ? SERIES[i - 1].value : null;
              const growth = prev ? `${(((row.value - prev) / prev) * 100).toFixed(1)}%` : '—';
              return {
                year:   row.year,
                size:   row.value.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 }),
                yoy:    growth,
                phase:  row.phase,
                source: row.isAnchor ? 'PRD anchor' : row.isProjected ? 'Forecast · CAGR' : 'Interpolated · CAGR',
              };
            })}
          />
        </div>

        <DialogFooter className="px-6 py-4 border-t border-[var(--black-100)] flex flex-col items-stretch gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex-1 min-w-0">
            <SourceCluster
              citations={getSources([
                'ken-primary-coldchain-2024',
                'abs-warehousing-2023',
                'ken-forecast-coldchain-2025',
                'ken-cagr-historical-2024',
                'ken-interpolation-2024',
                'ken-phase-classification-2024',
              ])}
              methodologyHref="#methodology"
            />
          </div>
          <div className="flex-none">
            <button
              type="button"
              disabled
              className="inline-flex items-center gap-2 rounded-[var(--radius-xs,5px)] border border-[var(--black-200)] bg-[var(--black-50)] px-3 py-1.5 font-body text-[12px] font-medium text-[var(--semantic-ink-subtle)] cursor-not-allowed"
              title="Available on report unlock"
            >
              <Download size={13} aria-hidden="true" />
              Download CSV
              <span className="font-normal">· locked</span>
            </button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─────────────────────────────────────────────────────────────────
// Section
// ─────────────────────────────────────────────────────────────────

export function MarketSizeSection() {
  return (
    <section
      id="market-size"
      aria-labelledby="market-size-heading"
      // Padding 2026-05-21 v2: removed `py-16 lg:py-20` · parent wrapper
      // (test/phase-2/page.tsx) already applies `space-y-16 py-12 lg:py-16` · so
      // section-level py duplicated gap (160px between sections instead of 80px).
      // Now relies on parent rhythm only · matches refs 60-80px section spacing.
      className="px-4 sm:px-6 lg:px-12 max-w-[1100px] mx-auto w-full scroll-mt-[120px]"
    >
      {/* Header */}
      <div className="inline-flex mb-3">
        <SectionLabel background="light" variant="accent">
          Section 08 · Market Size & Growth
        </SectionLabel>
      </div>

      <h2
        id="market-size-heading"
        className="font-display font-light text-[clamp(28px,3vw,39px)] leading-[1.15] tracking-[-0.015em] text-[var(--semantic-ink-strong)] mb-3"
      >
        A decade of acceleration — from pandemic stress test to pharma pipeline
      </h2>

      {/* Lede · inline narrative w/ bold metrics (refs canonical · merged-report
          pattern). Killed MilestoneRow 5-column grid 2026-05-21 · 11 visual
          elements competing · no story rhythm. Inline metrics put numbers IN
          the story · not in a chart-axis-style grid above it. ~50px replaces
          ~140px · reclaims vertical · prose-led. */}
      <p
        className="font-body text-[var(--semantic-ink-body)] max-w-[64ch] mb-2"
        style={{ fontSize: '17px', lineHeight: 1.65 }}
      >
        Australia&apos;s cold chain expanded from{' '}
        <strong className="font-medium text-[var(--semantic-ink-strong)]" style={{ fontVariantNumeric: 'tabular-nums lining-nums' }}>
          AUD 4.2 Bn
        </strong>
        <span className="text-[var(--semantic-ink-subtle)]"> (2017)</span> to{' '}
        <strong className="font-medium text-[var(--semantic-ink-strong)]" style={{ fontVariantNumeric: 'tabular-nums lining-nums' }}>
          AUD 6.5 Bn
        </strong>
        <span className="text-[var(--semantic-ink-subtle)]"> (2022)</span> at a{' '}
        <strong className="font-medium text-[var(--semantic-ink-strong)]" style={{ fontVariantNumeric: 'tabular-nums lining-nums' }}>
          9.1% historical CAGR
        </strong>
        , and is projected to reach{' '}
        <strong className="font-medium text-[var(--color-brand-red,#b01f24)]" style={{ fontVariantNumeric: 'tabular-nums lining-nums' }}>
          AUD 10.7 Bn
        </strong>
        <span className="text-[var(--semantic-ink-subtle)]"> by 2027F</span> at a{' '}
        <strong className="font-medium text-[var(--color-brand-red,#b01f24)]" style={{ fontVariantNumeric: 'tabular-nums lining-nums' }}>
          10.3% forecast CAGR
        </strong>
        .
      </p>
      <p className="font-body italic text-[var(--semantic-ink-muted)] max-w-[60ch] mb-10" style={{ fontSize: '14px', lineHeight: 1.55 }}>
        The market sits in its growing phase — sustained, not slowing.
      </p>

      {/* Chart figure · KenColumnChart wrapped in ChartFigure (refs canonical
          anatomy · eyebrow + title + insight + unit + legend + figcaption).
          projectionStartIndex=6 dims/dashes 2023-2027F (forecast segment). */}
      <ChartFigure
        eyebrow="Market trajectory · historical + forecast"
        title="Australia cold chain market size · 2017 to 2027F"
        insight="Market crosses AUD 6.5 Bn in 2022 at 9.1% historical CAGR and is projected to reach AUD 10.7 Bn by 2027 at 10.3% forecast CAGR — sustained growth, not slowdown."
        unit="AUD Mn"
        legend={[
          { kind: 'solid', color: KEN_CHART_SERIES_ARRAY[0], label: 'Historical · 2017–2022 actual' },
          { kind: 'dashed', color: KEN_CHART_SERIES_ARRAY[0], label: 'Forecast · 2023–2027F projected' },
        ]}
        figcaption="Solid bars 2017–2022 are anchored to Ken Primary survey + ABS Cat. 8731 census. Dashed bars 2023–2027F compound at observed CAGR from Ken Forecast Model. Hover any bar for exact AUD Mn value."
      >
        <KenColumnChart
          labels={SERIES.map((d) => d.year)}
          data={SERIES.map((d) => d.value)}
          height={360}
          unit="AUD Mn"
          projectionStartIndex={6}
          ariaLabel="Australia Cold Chain market size · 2017 to 2027F · AUD Mn"
        />
      </ChartFigure>

      {/* Phase strip below chart · aligned columns · phase narrative */}
      <PhaseStrip />

      {/* Source provenance + dataset trigger · tight pairing w/ chart */}
      <div className="flex items-start justify-between gap-6 mt-5 flex-wrap">
        <div className="flex-1 min-w-0 max-w-[68ch]">
          <SourceCluster
            citations={getSources([
              'ken-primary-coldchain-2024',
              'abs-warehousing-2023',
              'lineage-investor-day-2024',
              'americold-10k-2023',
              'ken-forecast-coldchain-2025',
              'ken-interpolation-2024',
            ])}
            methodologyHref="#methodology"
          />
        </div>
        <div className="flex-none pt-1">
          <DatasetModalTrigger />
        </div>
      </div>

      {/* 3 narrative annotation cards · the WHY behind each inflection */}
      <AnnotationCards />

      {/* 2022 segment composition · labels below bar */}
      <SegmentSplitBar />

      {/* InsightBox · "What this means" section closer · refs canonical pattern.
          Translates data into stakeholder implication · italic thesis + body. */}
      <div className="mt-12">
        <InsightBox
          eyebrow="What this means for cold-chain operators"
          lead="The market is not in recovery · it is in structural acceleration."
          body={
            <>
              Growth from <strong className="font-medium text-[var(--semantic-ink-strong)]">AUD 6.5 Bn to AUD 10.7 Bn</strong> over five years is driven by pharma cold-chain expansion + e-grocery scaling + new Lineage capacity coming online 2024–26. Operators serving meat, dairy, and seafood face commoditized pricing; pharma + biologics remain the margin segment. Cold transport will outpace storage in CAGR through 2027.
            </>
          }
        />
      </div>
    </section>
  );
}
