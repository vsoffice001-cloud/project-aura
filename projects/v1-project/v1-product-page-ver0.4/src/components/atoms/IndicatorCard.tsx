'use client';

/**
 * IndicatorCard · macro indicator card · borderless · §18 Macroeconomic Indicators.
 *
 * @what  Single macro indicator card · borderless · indicator name + current value
 *        (32px serif display) + trend arrow + YoY change pill + optional short
 *        descriptor. Grid of 5 cards (2-row: 3+2) · matches ref macro panel pattern.
 *
 * @why   Macro indicator panels in McKinsey / CB Insights / Oxford Economics use
 *        borderless cards with large serif number + directional arrow + YoY delta
 *        chip to communicate direction + magnitude at a glance before users read
 *        the supporting chart. Grid of 5 fills visual space cleanly at 2+3 rows.
 *
 * @when  §18 Macroeconomic Indicators · above KenMultiLineChart · after MetricStrip.
 *
 * @how   ```tsx
 *        <IndicatorCard
 *          name="GDP Growth"
 *          value="2.8%"
 *          trend="up"
 *          yoyChange="+0.4pp"
 *          descriptor="2024 actual · RBA estimate"
 *          year="2024"
 *        />
 *        ```
 *
 * Trend arrow: ↑ for up · ↓ for down · → for neutral.
 * S3-2026-05-22: ALL arrows → ink-muted neutral (arrow shape carries direction · no color).
 * NO green on positive · NO red on negative per COLOR-USAGE-GUIDE §2.3.
 * YoY pill: neutral black-50/ink-body for ALL trends (no color distinction).
 *
 * @relatedDoc projects/v1-product-page-ver0.4/docs/COLOR-USAGE-GUIDE.md §2.3 (negative semantics)
 * @relatedDoc projects/v1-product-page-ver0.4/docs/REF-PATTERNS-ADOPTION.md §5
 */

export type IndicatorTrend = 'up' | 'down' | 'neutral';

export interface IndicatorCardProps {
  /** Indicator name · 2-4 words */
  name: string;
  /** Display value · 32px serif · e.g. "2.8%" · "AUD/USD 0.66" */
  value: string;
  /** Trend direction · drives arrow + pill color */
  trend: IndicatorTrend;
  /** YoY change label · e.g. "+0.4pp" · "−1.2pp" · "+3.1%" */
  yoyChange: string;
  /** Optional short descriptor · 8 words max · italic muted */
  descriptor?: string;
  /** Optional year or period label · small uppercase */
  year?: string;
  /** Optional className passthrough */
  className?: string;
}

function TrendArrow({ trend }: { trend: IndicatorTrend }) {
  if (trend === 'neutral') {
    return (
      <span
        aria-label="Neutral trend"
        style={{ color: 'var(--semantic-ink-muted)', fontSize: '14px' }}
      >
        →
      </span>
    );
  }
  if (trend === 'up') {
    // S3-2026-05-22 · positive arrow → neutral ink-muted (arrow shape carries semantic · no color needed)
    return (
      <span
        aria-label="Upward trend"
        style={{ color: 'var(--semantic-ink-muted)', fontSize: '14px' }}
      >
        ↑
      </span>
    );
  }
  // down · NOT brand-red · ink-muted (neutral) per COLOR-USAGE-GUIDE §2.3
  return (
    <span
      aria-label="Downward trend"
      style={{ color: 'var(--semantic-ink-muted)', fontSize: '14px' }}
    >
      ↓
    </span>
  );
}

function YoyPill({ change, trend }: { change: string; trend: IndicatorTrend }) {
  // S3-2026-05-22 · positive pill → neutral black-50/ink-body (no color · direction carries semantic)
  // growth-soft tokens reserved for standalone "growth" chips NOT tied to IndicatorCard
  void trend;
  return (
    <span
      className="inline-block rounded-[3px] px-1.5 py-0.5 font-body tabular-nums"
      style={{
        fontSize: '11px',
        fontWeight: 500,
        background: 'var(--black-50, rgba(0,0,0,0.04))',
        color: 'var(--semantic-ink-body)',
      }}
    >
      {change}
    </span>
  );
}

export function IndicatorCard({
  name,
  value,
  trend,
  yoyChange,
  descriptor,
  year,
  className,
}: IndicatorCardProps) {
  return (
    <article
      className={['min-w-0', className ?? ''].join(' ')}
      aria-label={`${name} · ${value} · ${yoyChange} YoY`}
    >
      {/* Name + year eyebrow */}
      <div className="flex items-baseline justify-between gap-2 mb-2">
        <p
          className="font-body uppercase tracking-[0.12em] text-[var(--semantic-ink-subtle)]"
          style={{ fontSize: '10px', fontWeight: 600 }}
        >
          {name}
        </p>
        {year && (
          <p
            className="font-body text-[var(--semantic-ink-subtle)] flex-none"
            style={{ fontSize: '10px' }}
          >
            {year}
          </p>
        )}
      </div>

      {/* Value + trend arrow */}
      <div className="flex items-baseline gap-2 mb-2">
        <p
          className="font-display font-light tabular-nums leading-[1]"
          style={{
            /* S3 2026-05-22 · cap at clamp(28px, 3vw, 36px) · IndicatorCard context (4-5 grid) */
            fontSize: 'clamp(28px, 3vw, 36px)',
            color: 'var(--semantic-ink-strong)',
            fontVariantNumeric: 'tabular-nums lining-nums',
            letterSpacing: '-0.02em',
          }}
        >
          {value}
        </p>
        <TrendArrow trend={trend} />
      </div>

      {/* YoY pill · trend-aware color per S5 */}
      <div className="flex items-center gap-2 mb-2">
        <YoyPill change={yoyChange} trend={trend} />
        <span
          className="font-body italic text-[var(--semantic-ink-muted)]"
          style={{ fontSize: '10.5px' }}
        >
          YoY
        </span>
      </div>

      {/* Optional descriptor */}
      {descriptor && (
        <p
          className="font-body italic text-[var(--semantic-ink-muted)] mt-1"
          style={{ fontSize: '11px', lineHeight: 1.4 }}
        >
          {descriptor}
        </p>
      )}
    </article>
  );
}
