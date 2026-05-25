'use client';

/**
 * TableShell · canonical refs-style data table for v0.4 PDP.
 *
 * @what  Borderless-frame data table w/ refs-canonical aesthetic:
 *        top hairline · 11px DM Sans uppercase headers · 13-14px DM Sans body cells ·
 *        40-48px row · per-row bottom hairline · subtle black-50 hover · tabular-nums
 *        forced on numeric cols · italic on flagged interpretation col.
 *
 * @why   5 sections re-implement table chrome w/ subtle drift. Single source of truth
 *        keeps refs-canonical look across PDP. Refs: rainbow-pothos + merged-report
 *        deliverable tables (CHARTS-TABLES-PATTERNS.md §6).
 *
 * @when  Any tabular data in section content. Use over raw `<table>`. Skip only if
 *        special chrome needed (PropertyTable row-headers · OpportunityRankingTable
 *        score bars).
 *
 * @how
 *   ```tsx
 *   <TableShell
 *     ariaLabel="Shelf-life matrix"
 *     columns={[
 *       { key: 'product', label: 'Product class', align: 'left' },
 *       { key: 'temp',    label: 'Temperature',   align: 'left', numeric: false },
 *       { key: 'shelf',   label: 'Shelf life',    align: 'left' },
 *       { key: 'tech',    label: 'Tech requirement', italic: true },
 *     ]}
 *     rows={SHELF_LIFE_MATRIX}
 *   />
 *   ```
 *
 * @relatedDoc projects/v1-product-page-ver0.4/docs/CHARTS-TABLES-PATTERNS.md §6
 * @relatedDoc projects/v1-product-page-ver0.4/docs/POLISH-PLAN-2026-05-22.md Stream 2
 */

import type { ReactNode } from 'react';

/** Phase value → canonical pill style. S3-2026-05-22. */
const PHASE_PILL_STYLES: Record<string, { bg: string; color: string }> = {
  'Pre-COVID': { bg: 'var(--black-50, rgba(0,0,0,0.04))',      color: 'var(--semantic-ink-muted)' },
  'COVID':     { bg: 'rgba(195, 198, 249, 0.20)',              color: 'var(--periwinkle-800, #7075c8)' },
  'Recovery':  { bg: 'rgba(249, 155, 133, 0.18)',              color: 'rgba(176, 84, 60, 0.95)' },
  'Forecast':  { bg: 'var(--color-forecast-bg, rgba(195,198,249,0.20))', color: 'var(--color-forecast-text, rgba(112,117,200,0.95))' },
};

function PhasePill({ phase }: { phase: string }) {
  const style = PHASE_PILL_STYLES[phase] ?? {
    bg: 'var(--black-50, rgba(0,0,0,0.04))',
    color: 'var(--semantic-ink-muted)',
  };
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '2px 10px',
        borderRadius: '4px',
        fontSize: '11px',
        fontWeight: 500,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        background: style.bg,
        color: style.color,
      }}
    >
      {phase}
    </span>
  );
}

export interface TableColumn {
  /** Row property key */
  key: string;
  /** Header label · 11px uppercase */
  label: string;
  /** Align · default left · use 'right' for numeric */
  align?: 'left' | 'right' | 'center';
  /** Force tabular-nums + lining-nums on this column */
  numeric?: boolean;
  /** Render in italic ink-muted (interpretation/tech col) · S3-2026-05-22: same 13.5px as body cols */
  italic?: boolean;
  /** Column min-width · default auto */
  minWidth?: string;
  /** Render cell value as canonical phase pill · maps to PHASE_PILL_STYLES. S3-2026-05-22. */
  phasePill?: boolean;
}

export interface TableShellProps {
  columns: TableColumn[];
  /** Rows · each row is keyed by column.key */
  rows: Array<Record<string, ReactNode>>;
  /** Min width for horizontal scroll · default 640 */
  minWidth?: number;
  /** Show subtle hover bg · default true */
  hoverable?: boolean;
  /** ARIA label for the table */
  ariaLabel: string;
  /**
   * Make header sticky w/ backdrop blur · for modal-bound tables. S3-2026-05-22.
   * Adds position:sticky + top:0 + bg-white-95 + backdrop-blur to thead cells.
   */
  stickyHeader?: boolean;
  /** Optional className · applied to outer scroll wrapper */
  className?: string;
}

export function TableShell({
  columns,
  rows,
  minWidth = 640,
  hoverable = true,
  ariaLabel,
  stickyHeader = false,
  className,
}: TableShellProps) {
  return (
    <div
      className={['overflow-x-auto -mx-4 sm:-mx-6 lg:mx-0', className ?? ''].join(' ')}
    >
      <table
        className="w-full font-body border-separate"
        style={{ borderSpacing: 0, minWidth: `${minWidth}px` }}
        aria-label={ariaLabel}
      >
        <thead>
          <tr>
            {columns.map((col, i) => (
              <th
                key={col.key}
                scope="col"
                className="font-medium text-[var(--semantic-ink-strong)] uppercase tracking-[0.08em]"
                style={{
                  fontSize: '11px',
                  textAlign: col.align ?? 'left',
                  padding: '14px 16px 14px 0',
                  paddingLeft: i === 0 ? '16px' : 0,
                  paddingRight: i === columns.length - 1 ? '16px' : '16px',
                  borderTop: '1px solid var(--black-200, #e5e5e5)',
                  borderBottom: '1px solid var(--black-200, #e5e5e5)',
                  minWidth: col.minWidth,
                  whiteSpace: 'nowrap',
                  // stickyHeader: position + solid bg to occlude rows scrolling beneath
                  ...(stickyHeader ? {
                    position: 'sticky' as const,
                    top: 0,
                    zIndex: 10,
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(8px)',
                  } : {
                    backgroundColor: 'var(--color-foundation-white, #ffffff)',
                  }),
                }}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => (
            <tr
              key={rowIdx}
              className={hoverable ? 'hover:bg-[var(--black-50,rgba(0,0,0,0.04))] transition-colors' : ''}
            >
              {columns.map((col, colIdx) => {
                const value = row[col.key];
                const isFirst = colIdx === 0;
                const isLast = colIdx === columns.length - 1;
                // phasePill renderer: render string values as canonical phase pill
                const cellContent = col.phasePill && typeof value === 'string'
                  ? <PhasePill phase={value} />
                  : value;
                return (
                  <td
                    key={col.key}
                    style={{
                      // S3-2026-05-22: italic col same 13.5px as body cols (size shift = hierarchy break)
                      fontSize: '13.5px',
                      lineHeight: 1.5,
                      padding: '14px 16px 14px 0',
                      paddingLeft: isFirst ? '16px' : 0,
                      paddingRight: isLast ? '16px' : '16px',
                      textAlign: col.align ?? 'left',
                      borderBottom: '1px solid var(--black-100, #f5f5f5)',
                      color: col.italic
                        ? 'var(--semantic-ink-muted)'
                        : isFirst
                          ? 'var(--semantic-ink-strong)'
                          : 'var(--semantic-ink-body)',
                      fontStyle: col.italic ? 'italic' : 'normal',
                      fontWeight: isFirst ? 500 : 400,
                      fontVariantNumeric: col.numeric ? 'tabular-nums lining-nums' : undefined,
                      verticalAlign: 'top',
                    }}
                  >
                    {cellContent}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
