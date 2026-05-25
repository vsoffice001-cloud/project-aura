'use client';

/**
 * RelatedReportCard · vertical card for related Ken Research reports.
 *
 * @what  Vertical card · standard chrome · no per-card color headers.
 *        White bg · 1px black-100 border · 16px radius · subtle hover shadow lift.
 *        Top section: uniform category label (DM Sans 10px uppercase ink-subtle).
 *        Mid section: title (Noto Serif 18px 400) + description (DM Sans 13px ink-body).
 *        Bottom: meta row (pages · year · price) + "View →" link.
 *
 * @why   S8 2026-05-22 · removed per-card color-strip headers (chart colors
 *        repurposed for nav = semantic confusion). Standard uniform chrome per
 *        report-store canonical pattern (scannable · no chart-palette confusion).
 *
 * @when  §22 Related Reports · 4-col grid (2-col tablet · 1-col mobile).
 *
 * @how   ```tsx
 *        <RelatedReportCard
 *          category="Pharma Logistics"
 *          title="Australia Pharma Logistics Market 2023-2028"
 *          description="End-to-end pharmaceutical cold-chain logistics market..."
 *          meta={{ pages: 198, year: 2023, priceBand: 'AUD 3,800+' }}
 *          href="/reports/australia-pharma-logistics"
 *        />
 *        ```
 *
 * Project-local atom · promote to DS at 2nd consumer.
 */

import { motion, useReducedMotion } from 'framer-motion';

export interface RelatedReportCardProps {
  /** Category label · e.g. "Pharma Logistics" · "Cold Chain" */
  category: string;
  /** Report title · 2-line max */
  title: string;
  /** Short description · 3-line max */
  description: string;
  /** Footer meta · pages · year · price band */
  meta: {
    pages: number;
    year: number;
    priceBand: string;
  };
  /** Link href to the report page */
  href: string;
  /**
   * @deprecated colorVariant removed (S8 2026-05-22) · all cards uniform chrome.
   * Prop accepted for backwards-compat but has no effect.
   */
  colorVariant?: string;
  /** Optional className */
  className?: string;
}

export function RelatedReportCard({
  category,
  title,
  description,
  meta,
  href,
  className,
}: RelatedReportCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      whileHover={shouldReduceMotion ? {} : { y: -2 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      className={[
        'flex flex-col max-w-[280px] w-full',
        'rounded-[16px] border border-[var(--black-100,#f5f5f5)]',
        'bg-[var(--color-foundation-white,#ffffff)]',
        'overflow-hidden',
        className ?? '',
      ].join(' ')}
      style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
      onMouseEnter={(e) => {
        if (!shouldReduceMotion) {
          (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 12px rgba(0,0,0,0.06)';
          (e.currentTarget as HTMLElement).style.borderColor = 'var(--black-200,#e5e5e5)';
        }
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)';
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--black-100,#f5f5f5)';
      }}
    >
      {/* Top section · category label · uniform across all cards */}
      <div className="px-5 pt-5 pb-3">
        <span
          className="font-body uppercase"
          style={{
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '0.12em',
            color: 'var(--semantic-ink-subtle)',
          }}
        >
          {category}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 px-5 pb-4 gap-2">
        {/* Report title · Noto Serif 18px · 2-line clamp */}
        <h3
          className="font-display text-[var(--semantic-ink-strong)] leading-snug"
          style={{
            fontSize: '16px',
            fontWeight: 400,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: 1.3,
          }}
        >
          {title}
        </h3>

        {/* Description · DM Sans 13px · 3-line clamp */}
        <p
          className="font-body text-[var(--semantic-ink-body)] flex-1"
          style={{
            fontSize: '13px',
            lineHeight: 1.55,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {description}
        </p>
      </div>

      {/* Footer */}
      <div
        className="px-5 py-3 border-t border-[var(--black-100,#f5f5f5)] flex items-center justify-between gap-2"
      >
        {/* Meta row · pages · year · price band */}
        <div className="flex items-center gap-3">
          <span
            className="font-body text-[var(--semantic-ink-subtle)]"
            style={{ fontSize: '11px', fontVariantNumeric: 'tabular-nums' }}
          >
            {meta.pages}pp
          </span>
          <span
            className="font-body text-[var(--semantic-ink-subtle)]"
            style={{ fontSize: '11px', fontVariantNumeric: 'tabular-nums' }}
          >
            {meta.year}
          </span>
          <span
            className="font-body text-[var(--semantic-ink-subtle)]"
            style={{ fontSize: '11px' }}
          >
            {meta.priceBand}
          </span>
        </div>

        {/* View report link · DM Sans 11px uppercase ink-muted · hover ink-strong */}
        <a
          href={href}
          className="font-body uppercase tracking-[0.08em] text-[var(--semantic-ink-muted)] hover:text-[var(--semantic-ink-strong)] transition-colors flex-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-red,#b01f24)] rounded-[2px]"
          style={{ fontSize: '10px', fontWeight: 600 }}
          aria-label={`View report: ${title}`}
        >
          View →
        </a>
      </div>
    </motion.article>
  );
}
