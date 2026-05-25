'use client';

/**
 * SourceCluster · render typed provenance citations below charts/data blocks.
 *
 * @what  Collapsed-by-default citation strip · shows tier count pills + chevron ·
 *        click expands full list with formatted lines, URL anchors, internal notes.
 *        Replaces wallpaper "Ken Research Analysis" strings.
 *
 * @why   Original always-expanded layout took 200-300px vertical · stole space
 *        around section + in modal occluded the dataset table. Collapsed pattern
 *        keeps SEO crawlable content (DOM-rendered always · just visually
 *        collapsed) while restoring whitespace rhythm.
 *
 * @when  Below every <ColumnChart>, <HistoricalProjectedAreaChart>, MilestoneRow,
 *        SegmentSplitBar where data needs attribution. Skip only where data is
 *        trivially public OR a downstream block cites the same sources <1 viewport.
 *
 * @how   ```tsx
 *        <SourceCluster
 *          citations={getSources([...])}
 *          methodologyHref="#methodology"
 *          defaultOpen={false} // optional · true if context demands visible
 *        />
 *        ```
 *
 * Project-local · promote to DS at 2nd consumer.
 */

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { SOURCE_TIER_META, type SourceCitation, type SourceTier } from '@/lib/types/sources';

interface SourceClusterProps {
  /** Array of citation objects · use getSources(ids[]) from lib/sources */
  citations: SourceCitation[];
  /** Optional anchor href to methodology section · adds trailing link */
  methodologyHref?: string;
  /** Default-open state · default false (collapsed) · pass true for footer/methodology contexts */
  defaultOpen?: boolean;
  /** Optional className passthrough */
  className?: string;
}

function formatCitationLine(c: SourceCitation): string {
  const period = c.period ? `${c.period} ${c.year}` : `${c.year}`;
  if (c.tier === 'derived') {
    return `${c.org} · ${period}`;
  }
  if (c.title) {
    return `${c.org} · ${c.title} · ${period}`;
  }
  return `${c.org} · ${period}`;
}

function tierOrder(t: SourceTier): number {
  if (t === 'primary') return 0;
  if (t === 'secondary') return 1;
  return 2;
}

export function SourceCluster({
  citations,
  methodologyHref,
  defaultOpen = false,
  className,
}: SourceClusterProps) {
  const [open, setOpen] = useState(defaultOpen);

  if (!citations.length) return null;

  const sorted = [...citations].sort((a, b) => tierOrder(a.tier) - tierOrder(b.tier));
  const tierCounts: Record<SourceTier, number> = {
    primary: citations.filter((c) => c.tier === 'primary').length,
    secondary: citations.filter((c) => c.tier === 'secondary').length,
    derived: citations.filter((c) => c.tier === 'derived').length,
  };

  const totalCount = citations.length;

  return (
    <div className={['mt-3', className].filter(Boolean).join(' ')}>
      {/* Collapsed header · always visible · chevron toggle · tier counts inline */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="source-cluster-list"
        className="inline-flex flex-wrap items-center gap-3 font-body group cursor-pointer hover:text-[var(--color-brand-red,#b01f24)] transition-colors"
        style={{ fontSize: '10px' }}
      >
        <ChevronDown
          size={12}
          aria-hidden="true"
          className="transition-transform text-[var(--semantic-ink-subtle)]"
          style={{ transform: open ? 'rotate(0deg)' : 'rotate(-90deg)' }}
        />
        <span className="uppercase tracking-[0.12em] text-[var(--semantic-ink-subtle)] group-hover:text-[var(--color-brand-red,#b01f24)]" style={{ fontWeight: 600 }}>
          Sources · {totalCount}
        </span>
        {(['primary', 'secondary', 'derived'] as SourceTier[]).map((tier) => {
          const count = tierCounts[tier];
          if (count === 0) return null;
          const meta = SOURCE_TIER_META[tier];
          return (
            <span
              key={tier}
              className="inline-flex items-center gap-1.5 text-[var(--semantic-ink-body)]"
              title={meta.description}
            >
              <span
                aria-hidden="true"
                className="inline-block w-1.5 h-1.5 rounded-full"
                style={{ background: meta.dotColor }}
              />
              <span style={{ fontWeight: 500, fontVariantNumeric: 'tabular-nums' }}>
                {count} {meta.label.toLowerCase()}
              </span>
            </span>
          );
        })}
        {methodologyHref && (
          <span className="font-body uppercase tracking-[0.08em] text-[var(--semantic-ink-subtle)] ml-auto" style={{ fontWeight: 500 }}>
            view all →
          </span>
        )}
      </button>

      {/* Expanded list · DOM-rendered always for SEO · just visually collapsed */}
      {open && (
        <ul
          id="source-cluster-list"
          className="space-y-1.5 mt-3 pl-5 border-l border-[var(--black-100)]"
        >
          {sorted.map((c) => {
            const meta = SOURCE_TIER_META[c.tier];
            return (
              <li
                key={c.id}
                className="flex items-start gap-2 font-body text-[var(--semantic-ink-body)]"
                style={{ fontSize: '11px', lineHeight: 1.5 }}
              >
                <span
                  aria-hidden="true"
                  className="inline-block flex-none rounded-full mt-[6px]"
                  style={{ width: '5px', height: '5px', background: meta.dotColor }}
                />
                <span className="min-w-0 flex-1">
                  <span style={{ color: meta.textColor }}>{formatCitationLine(c)}</span>
                  {c.url && (
                    <>
                      {' '}
                      <a
                        href={c.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--semantic-ink-subtle)] hover:text-[var(--color-brand-red,#b01f24)] underline decoration-dotted underline-offset-2 transition-colors"
                      >
                        ↗
                      </a>
                    </>
                  )}
                  {c.internalNote && (
                    <span className="block text-[var(--semantic-ink-subtle)] italic mt-0.5" style={{ fontSize: '10.5px' }}>
                      {c.internalNote}
                    </span>
                  )}
                </span>
              </li>
            );
          })}
          {methodologyHref && (
            <li className="pt-2">
              <a
                href={methodologyHref}
                className="inline-flex items-center gap-1 font-body uppercase tracking-[0.08em] text-[var(--semantic-ink-subtle)] hover:text-[var(--color-brand-red,#b01f24)] transition-colors"
                style={{ fontSize: '10px', fontWeight: 600 }}
              >
                Full methodology · §19
                <span aria-hidden="true">→</span>
              </a>
            </li>
          )}
        </ul>
      )}

      {/* SEO-only mirror · hidden visually · ensures search bots crawl citation text
          even when collapsed. Removes hidden-content-penalty risk. */}
      {!open && (
        <ul className="sr-only">
          {sorted.map((c) => (
            <li key={`sr-${c.id}`}>{formatCitationLine(c)}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
