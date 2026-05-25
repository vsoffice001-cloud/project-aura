'use client';

/**
 * MetricStrip · borderless stat callouts in n-up grid · refs canonical.
 *
 * @what  3-5 stat callouts in horizontal grid · each = eyebrow + serif num +
 *        italic descriptor. NO card chrome · NO bg · whitespace isolation only.
 *        Auto-wraps on narrow viewports to 2-up or 1-col. Mirrors merged-report
 *        + rainbow-pothos opening metric strip verbatim.
 *
 * @why   Refs always open data-heavy sections w/ 3-5 borderless stat callouts.
 *        Establishes context before prose explanation. Number-to-label scale
 *        ratio drives hierarchy · NOT card chrome. Reusable across §01 · §03 ·
 *        §07 · §09 · §11 · §13 · §14 · §16 · §18.
 *
 * @when  Use as section opener metric strip OR as per-tab stat row.
 *        Typical: 3-up (mobile-friendly · default grid) · 4-up at >1024px.
 *
 * @how   ```tsx
 *        <MetricStrip
 *          metrics={[
 *            { eyebrow: 'Pallets · 2022', value: '1.2 Mn', descriptor: 'Total operational capacity' },
 *            { eyebrow: 'Avg price', value: 'AUD 28', descriptor: 'Per pallet · per month' },
 *            { eyebrow: 'Occupancy', value: '78%', descriptor: 'Industry weighted average' },
 *            { eyebrow: 'Operators', value: '200–250', descriptor: 'Including long tail' },
 *          ]}
 *        />
 *        ```
 *
 * Variants via prop:
 * - `columns: 'auto' | 2 | 3 | 4 | 5` · default 'auto' (3-up tablet · 4-up desktop)
 * - `accent: 'none' | 'first' | 'last' | index` · highlights one metric brand-red
 *
 * Project-local atom · promote to DS at 2nd consumer (anti-bloat).
 *
 * @relatedDoc projects/v1-product-page-ver0.4/docs/REF-PATTERNS-ADOPTION.md §6
 * @relatedDoc projects/v1-product-page-ver0.4/docs/FONT-PAIRING-GUIDE.md §3
 */

export interface Metric {
  /** Uppercase tracked label · 2-4 words · ink-subtle */
  eyebrow: string;
  /** Value · serif display · tabular-nums · ink-strong (or brand-red if accented) */
  value: string;
  /** Italic descriptor · 4-8 words · ink-muted · optional */
  descriptor?: string;
  /** Optional unit suffix · appears inline in subtle weight (e.g. "Mn" · "%") */
  unit?: string;
}

export interface MetricStripProps {
  /** 3-5 stat callouts · grid auto-wraps */
  metrics: Metric[];
  /** Grid columns · default 'auto' (3-up tablet · 4-up >1024px · clamps to metrics.length) */
  columns?: 'auto' | 2 | 3 | 4 | 5;
  /**
   * @deprecated S3-2026-05-22 · accent prop deprecated · brand-red reserved for section-level callouts only.
   * Still accepted for back-compat but value renders in ink-strong regardless.
   * Never use brand-red inside MetricStrip.
   */
  accent?: 'none' | 'first' | 'last' | number;
  /** Optional className passthrough */
  className?: string;
}

function resolveAccentIndex(
  accent: MetricStripProps['accent'],
  count: number
): number | null {
  if (accent === undefined || accent === 'none') return null;
  if (accent === 'first') return 0;
  if (accent === 'last') return count - 1;
  if (typeof accent === 'number' && accent >= 0 && accent < count) return accent;
  return null;
}

/**
 * getValueSize · responsive clamp based on column count and metric count.
 * S3-2026-05-22: reduce font at 4-5 up so long values ("AUD 1.8 Bn") fit one line.
 */
function getValueSize(columns: MetricStripProps['columns'], count: number): string {
  const effectiveCols = columns === 'auto' ? (count >= 4 ? 4 : count) : (columns as number);
  if (effectiveCols >= 5) return 'clamp(18px, 2.2vw, 28px)';
  if (effectiveCols >= 4) return 'clamp(20px, 2.4vw, 32px)';
  return 'clamp(24px, 2.8vw, 36px)';
}

function gridColsClass(columns: MetricStripProps['columns'], count: number): string {
  // Cap at metric count
  const cap = (n: number) => Math.min(n, count);
  if (columns === 2) return `grid-cols-1 sm:grid-cols-${cap(2)}`;
  if (columns === 3) return `grid-cols-1 sm:grid-cols-2 md:grid-cols-${cap(3)}`;
  if (columns === 4) return `grid-cols-1 sm:grid-cols-2 lg:grid-cols-${cap(4)}`;
  if (columns === 5) return `grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-${cap(5)}`;
  // 'auto' · scale by metric count
  if (count <= 2) return 'grid-cols-1 sm:grid-cols-2';
  if (count === 3) return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3';
  if (count === 4) return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4';
  return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5';
}

export function MetricStrip({
  metrics,
  columns = 'auto',
  accent = 'none',
  className,
}: MetricStripProps) {
  if (!metrics.length) return null;
  // accent prop deprecated S3-2026-05-22 · kept for back-compat · ignored in render
  // resolveAccentIndex kept for back-compat; brand-red on values is banned per plan §G rule 4
  void accent; // suppress unused-param warning · prop kept for API back-compat

  return (
    <div
      role="group"
      aria-label="Key metrics"
      className={[
        'grid gap-x-6 gap-y-6 sm:gap-x-8',
        gridColsClass(columns, metrics.length),
        className ?? '',
      ].join(' ')}
    >
      {metrics.map((m, i) => {
        return (
          <div key={`${m.eyebrow}-${i}`} className="min-w-0">
            <p
              className="font-body uppercase tracking-[0.14em] text-[var(--semantic-ink-subtle)] mb-2"
              style={{ fontSize: '10px', fontWeight: 600 }}
            >
              {m.eyebrow}
            </p>
            <p
              className="font-display font-light leading-[1]"
              style={{
                color: 'var(--semantic-ink-strong)',
                fontSize: getValueSize(columns, metrics.length),
                fontVariantNumeric: 'tabular-nums lining-nums',
                letterSpacing: '-0.022em',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {m.value}
              {m.unit && (
                <span
                  className="text-[var(--semantic-ink-subtle)] ml-1"
                  style={{ fontSize: '0.55em', letterSpacing: '0' }}
                >
                  {m.unit}
                </span>
              )}
            </p>
            {m.descriptor && (
              <p
                className="font-body italic text-[var(--semantic-ink-muted)] mt-2"
                style={{ fontSize: '11.5px', lineHeight: 1.4 }}
              >
                {m.descriptor}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
