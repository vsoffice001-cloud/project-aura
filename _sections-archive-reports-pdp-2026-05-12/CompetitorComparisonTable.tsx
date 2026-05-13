'use client';

/**
 * CompetitorComparisonTable — sub-component of CompetitorLandscapeModule
 * shadcn Table · top 3 public rows · extended lead-gated
 */

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { AccessLevelGate } from '@/components/AccessLevelGate';
import { Badge } from '@kenresearch/design-system/atoms';
import type { MatrixModule } from '@/types/schema';

const LEAD_GATED_ACCESS = {
  level: 'lead-gated' as const,
  ctaTrigger: 'sample' as const,
  paywallSelector: '.kr-paywall-competitor-table',
  schemaIsAccessibleForFree: false,
};

interface Props {
  matrix: MatrixModule;
  reportSlug: string;
  onUnlock: () => void;
}

function fmtCell(format: string | undefined, val: string | number): string {
  if (format === 'percent' && typeof val === 'number') return `${val}%`;
  if (format === 'number' && typeof val === 'number') return val.toLocaleString();
  return String(val ?? '');
}

export function CompetitorComparisonTable({ matrix, onUnlock }: Props) {
  const columns = matrix.columns.slice(0, 6);
  const publicRows = matrix.rows.slice(0, 3);
  const gatedRows = matrix.rows.slice(3);

  return (
    <div
      style={{
        overflowX: 'auto',
        borderRadius: 'var(--radius-card)',
        border: '1px solid var(--border-soft)',
        background: '#ffffff',
      }}
    >
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead
                key={col.id}
                style={{
                  textAlign: col.align ?? 'left',
                  fontSize: 'var(--typography-size-compact)',
                  fontWeight: 600,
                  color: 'var(--surface-text)',
                  whiteSpace: 'nowrap',
                }}
              >
                {col.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {publicRows.map((row) => (
            <TableRow key={row.id}>
              {columns.map((col) => {
                const cell = row.cells.find((c) => c.columnId === col.id);
                return (
                  <TableCell
                    key={col.id}
                    style={{
                      textAlign: col.align ?? 'left',
                      fontSize: 'var(--typography-size-compact)',
                      color: 'var(--surface-text)',
                      whiteSpace: col.id === 'services' ? 'normal' : 'nowrap',
                      maxWidth: col.id === 'services' ? '240px' : undefined,
                    }}
                  >
                    {fmtCell(col.format, cell?.value ?? '')}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}

          {/* Gated rows gate row */}
          {gatedRows.length > 0 && (
            <TableRow>
              <TableCell colSpan={columns.length} style={{ padding: 0 }}>
                <AccessLevelGate
                  access={LEAD_GATED_ACCESS}
                  moduleId="competitor-table-extended"
                  sectionName="CompetitorLandscapeModule"
                  fallback={
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 'var(--space-4)',
                        padding: 'var(--space-3) var(--space-4)',
                        background: 'var(--color-ramp-warm-50)',
                        flexWrap: 'wrap',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                        <span
                          style={{
                            fontSize: 'var(--typography-size-compact)',
                            color: 'var(--surface-text-muted)',
                          }}
                        >
                          {gatedRows.length} more players
                        </span>
                        <Badge theme="neutral" size="sm">Lead-gated</Badge>
                      </div>
                      <button
                        type="button"
                        onClick={onUnlock}
                        style={{
                          padding: 'var(--space-2) var(--space-4)',
                          borderRadius: 'var(--radius-button)',
                          border: 'none',
                          background: 'var(--color-brand-red)',
                          color: '#ffffff',
                          fontSize: 'var(--typography-size-compact)',
                          fontWeight: 500,
                          cursor: 'pointer',
                          minHeight: '44px',
                          transition: 'background-color 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'var(--color-brand-red-dark, #8a1519)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'var(--color-brand-red)';
                        }}
                      >
                        Unlock full table
                      </button>
                    </div>
                  }
                >
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <tbody>
                      {gatedRows.map((row) => (
                        <tr key={row.id}>
                          {columns.map((col) => {
                            const cell = row.cells.find((c) => c.columnId === col.id);
                            return (
                              <td
                                key={col.id}
                                style={{
                                  padding: '12px 16px',
                                  textAlign: col.align ?? 'left',
                                  fontSize: 'var(--typography-size-compact)',
                                  color: 'var(--surface-text)',
                                  borderTop: '1px solid var(--border-soft)',
                                  whiteSpace: col.id === 'services' ? 'normal' : 'nowrap',
                                }}
                              >
                                {fmtCell(col.format, cell?.value ?? '')}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </AccessLevelGate>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
