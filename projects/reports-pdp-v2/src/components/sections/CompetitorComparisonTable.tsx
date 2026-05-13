'use client';

/**
 * CRAFT (aura-craft step 4.5 · 2026-05-12)
 * Lead: competitor names (text-base font-display font-medium — th scope="row" · public minimum; deep data locked)
 * Type rhythm: xl/—/sm/micro — SectionHeading level={3} = xl · competitor names = text-base · table cell values = text-sm · lock badge = text-xs micro
 * Motion: static + lock-row blur — locked rows get backdrop-filter blur(2px) + Lock icon · no entrance animation on table (scannable structure must not animate)
 *   — useReducedMotion: n/a (static table · blur is CSS not Framer)
 * Depth: borders — <table> with border-collapse + column dividers · alternating row warm-50 bg · no card shadow (embedded in Competitor module white card)
 * Mobile: horizontal scroll via overflow-x-auto · sticky first column (competitor name) · default
 */

/**
 * CompetitorComparisonTable — Detailed competitor comparison (recipe row 24)
 *
 * Variant: editorial-light
 * NO SectionWrapper — rendered INSIDE CompetitorLandscapeModule (plain Card chrome)
 * Cat 4.5 compliance: parent owns SectionWrapper
 *
 * Access: lead-gated — full table locked. Public: company names visible.
 * Locked rows show visible aria-label "Locked — sign in to unlock"
 *
 * A11y: <table> with <thead> <tbody> <th scope="col"> + <th scope="row">
 * useReducedMotion mandatory
 */

import { motion, useReducedMotion } from 'framer-motion';
import { Lock } from 'lucide-react';
import {
  SectionHeading,
  SectionLabel,
  Badge,
  Button,
  Card,
} from '@kenresearch/design-system/atoms';
import type { MatrixModule } from '@/types/schema';
import { useLeadFormModal } from '@/components/LeadFormModalProvider';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface CompetitorComparisonTableProps {
  matrix: MatrixModule;
  reportSlug?: string;
  isUnlocked?: boolean;
}

// ─── Main component ──────────────────────────────────────────────────────────

export function CompetitorComparisonTable({
  matrix,
  reportSlug = '',
  isUnlocked = false,
}: CompetitorComparisonTableProps) {
  const { openForm } = useLeadFormModal();
  const shouldReduceMotion = useReducedMotion() ?? false;

  // Public minimum: company names always visible (col "name")
  // All other columns locked unless isUnlocked
  const PUBLIC_COLS = new Set(['name']);
  const LOCK_AFTER_ROW = 2; // rows beyond index 2 blurred if not unlocked

  return (
    <div id="competitor-comparison-table" className="flex flex-col gap-4">
      <div>
        <SectionLabel>Competitive Intelligence</SectionLabel>
        <SectionHeading level={3} align="left">
          {matrix.heading ?? 'Top Cold Chain Players — Comparison'}
        </SectionHeading>
        <p className="mt-1 text-compact font-body" style={{ color: 'var(--surface-text-muted)' }}>
          Detailed benchmarking across facilities, technology, and market position.
        </p>
      </div>

      <Card padding="sm" className="overflow-hidden">
        {/* Lock overlay for gated state */}
        {!isUnlocked && (
          <div
            className="mb-4 rounded-[var(--radius-sm)] p-3 flex items-center gap-2"
            style={{
              backgroundColor: 'var(--color-ramp-warm-100)',
              border: '1px solid var(--border-default)',
            }}
            aria-live="polite"
          >
            <Lock size={14} style={{ color: 'var(--surface-text-muted)' }} aria-hidden="true" />
            <p className="text-compact font-body" style={{ color: 'var(--surface-text-muted)' }}>
              <span role="img" aria-label="Locked — sign in to unlock full comparison table">
                Full comparison locked — submit a quick form to unlock.
              </span>
            </p>
            <Button
              variant="brand"
              size="sm"
              onClick={() =>
                openForm('analyst-call', {
                  reportSlug,
                  ctaLocation: 'competitor-comparison-table',
                  sectionName: 'competitor-landscape',
                })
              }
              className="ml-auto shrink-0"
            >
              Talk to Analyst
            </Button>
          </div>
        )}

        <div className="overflow-x-auto">
          <table
            className="w-full text-sm font-body border-collapse min-w-[600px]"
            aria-label="Competitor comparison table"
          >
            <thead>
              <tr style={{ backgroundColor: 'var(--color-ramp-warm-100)' }}>
                {matrix.columns.map((col) => (
                  <th
                    key={col.id}
                    scope="col"
                    className="px-3 py-2.5 text-left text-compact font-display font-medium"
                    style={{
                      color: 'var(--surface-text-muted)',
                      borderBottom: '2px solid var(--border-default)',
                      minWidth: col.id === 'name' ? '140px' : '80px',
                    }}
                  >
                    {col.label}
                    {!isUnlocked && !PUBLIC_COLS.has(col.id) && (
                      <Lock
                        size={10}
                        className="inline ml-1 opacity-50"
                        aria-label="locked"
                      />
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {matrix.rows.map((row, rowIdx) => {
                const isRowLocked = !isUnlocked && rowIdx > LOCK_AFTER_ROW;
                return (
                  <motion.tr
                    key={row.id}
                    initial={shouldReduceMotion ? {} : { opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.3,
                      delay: shouldReduceMotion ? 0 : rowIdx * 0.05,
                    }}
                    style={{
                      backgroundColor: row.emphasis
                        ? 'var(--color-ramp-warm-100)'
                        : rowIdx % 2 === 0
                        ? 'var(--color-foundation-white)'
                        : 'transparent',
                      borderBottom: '1px solid var(--border-soft)',
                      filter: isRowLocked ? 'blur(3px)' : 'none',
                      userSelect: isRowLocked ? 'none' : 'auto',
                    }}
                    aria-label={isRowLocked ? 'Locked — sign in to unlock' : undefined}
                  >
                    {matrix.columns.map((col) => {
                      const cell = row.cells.find((c) => c.columnId === col.id);
                      const isColLocked = !isUnlocked && !PUBLIC_COLS.has(col.id);
                      const displayValue = isColLocked ? '—' : (cell?.value ?? '—');

                      if (col.id === 'name') {
                        return (
                          <th
                            key={col.id}
                            scope="row"
                            className="px-3 py-2.5 text-left text-compact font-display font-medium"
                            style={{ color: 'var(--color-foundation-black)' }}
                          >
                            {cell?.value ?? '—'}
                          </th>
                        );
                      }

                      return (
                        <td
                          key={col.id}
                          className="px-3 py-2.5 text-compact font-body"
                          style={{
                            color: isColLocked ? 'var(--surface-text-muted)' : 'var(--color-foundation-black)',
                            textAlign: col.align === 'right' ? 'right' : col.align === 'center' ? 'center' : 'left',
                          }}
                        >
                          {isColLocked ? (
                            <span role="img" aria-label="Locked — sign in to unlock">
                              <Lock size={12} aria-hidden="true" className="inline opacity-30" />
                            </span>
                          ) : (
                            <>
                              {typeof displayValue === 'number'
                                ? col.format === 'percent'
                                  ? `${displayValue}%`
                                  : displayValue.toLocaleString()
                                : displayValue}
                              {cell?.badge && (
                                <Badge theme="muted" variant="rounded" className="ml-1">
                                  {cell.badge}
                                </Badge>
                              )}
                            </>
                          )}
                        </td>
                      );
                    })}
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Locked rows indicator */}
        {!isUnlocked && matrix.rows.length > LOCK_AFTER_ROW + 1 && (
          <div
            className="mt-3 flex items-center justify-center gap-2 py-2 rounded"
            style={{ backgroundColor: 'var(--color-ramp-warm-100)' }}
            aria-live="polite"
          >
            <Lock size={12} aria-hidden="true" style={{ color: 'var(--surface-text-muted)' }} />
            <span className="text-compact font-body" style={{ color: 'var(--surface-text-muted)' }}>
              {matrix.rows.length - LOCK_AFTER_ROW - 1} more rows locked
            </span>
          </div>
        )}
      </Card>
    </div>
  );
}
