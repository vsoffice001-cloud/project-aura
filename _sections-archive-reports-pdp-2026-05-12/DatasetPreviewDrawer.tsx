'use client';

/**
 * DatasetPreviewDrawer — PRD §21
 * Shows 3 / 8-10 / full rows per access tier.
 * "Unlock Full Dataset" CTA → openForm('dataset-unlock')
 * Built on shadcn Dialog.
 */

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useLeadFormModal } from '@/components/LeadFormModalProvider';
import { useAnalytics } from '@/hooks/useAnalytics';
import type { DatasetPreview, AccessLevel } from '@/types/schema';
import { Lock, Download, X } from 'lucide-react';

interface Props {
  open: boolean;
  onClose: () => void;
  dataset: DatasetPreview;
  accessLevel: AccessLevel;
  reportSlug: string;
  chartId?: string;
  chartTitle?: string;
}

function getVisibleRowCount(
  accessLevel: AccessLevel,
  dataset: DatasetPreview,
): number {
  if (accessLevel === 'paid' || accessLevel === 'login-gated') {
    return dataset.fullRowCount;
  }
  if (accessLevel === 'lead-gated') {
    return dataset.leadRows;
  }
  return dataset.publicRows;
}

function formatCell(value: string | number, format: string): string {
  if (typeof value === 'number') {
    if (format === 'currency') return value.toLocaleString('en-AU', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
    if (format === 'percent') return `${value}%`;
    if (format === 'year') return String(value);
    return value.toLocaleString();
  }
  return String(value);
}

export function DatasetPreviewDrawer({
  open,
  onClose,
  dataset,
  accessLevel,
  reportSlug,
  chartId,
  chartTitle,
}: Props) {
  const { openForm } = useLeadFormModal();
  const dispatch = useAnalytics();

  const visibleCount = getVisibleRowCount(accessLevel, dataset);
  const visibleRows = dataset.rows.slice(0, visibleCount);
  const lockedRows = dataset.rows.slice(visibleCount);
  const hasLockedRows = lockedRows.length > 0;

  const handleUnlock = () => {
    dispatch('dataset_unlock_click', {
      section_name: 'DatasetPreviewDrawer',
      chart_id: chartId,
      access_level: accessLevel,
    });
    openForm('dataset-unlock', {
      reportSlug,
      chartId,
      sectionName: 'DatasetPreviewDrawer',
      ctaLocation: 'dataset_drawer',
    });
    onClose();
  };

  const handleExport = () => {
    dispatch('dataset_preview_click', {
      section_name: 'DatasetPreviewDrawer',
      chart_id: chartId,
    });
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        style={{
          maxWidth: '720px',
          width: '95vw',
          maxHeight: '85vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 'var(--radius-card)',
          padding: 0,
        }}
      >
        {/* Header */}
        <DialogHeader
          style={{
            padding: 'var(--space-6)',
            borderBottom: '1px solid var(--border-soft)',
            flexShrink: 0,
          }}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <DialogTitle
                style={{
                  fontFamily: 'var(--typography-family-display)',
                  fontSize: 'var(--typography-size-base)',
                  fontWeight: 600,
                  color: 'var(--surface-text)',
                }}
              >
                {chartTitle ?? 'Dataset Preview'}
              </DialogTitle>
              <DialogDescription
                style={{
                  fontSize: 'var(--typography-size-compact)',
                  color: 'var(--surface-text-muted)',
                  marginTop: 'var(--space-1)',
                }}
              >
                {hasLockedRows
                  ? `Showing ${visibleCount} of ${dataset.fullRowCount} rows`
                  : `All ${dataset.fullRowCount} rows`}{' '}
                · Last updated {dataset.lastUpdated}
              </DialogDescription>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close dataset preview"
              style={{
                padding: 'var(--space-2)',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                color: 'var(--surface-text-muted)',
                minWidth: '44px',
                minHeight: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>
        </DialogHeader>

        {/* Table — scrollable body */}
        <div style={{ overflowY: 'auto', flex: 1 }}>
          <Table>
            <TableHeader>
              <TableRow>
                {dataset.columns.map((col) => (
                  <TableHead
                    key={col.id}
                    style={{
                      textAlign: col.align ?? 'left',
                      fontSize: 'var(--typography-size-compact)',
                      fontWeight: 600,
                      color: 'var(--surface-text)',
                      position: 'sticky',
                      top: 0,
                      background: 'var(--color-ramp-warm-50)',
                    }}
                  >
                    {col.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Visible rows */}
              {visibleRows.map((row) => (
                <TableRow key={row.id}>
                  {dataset.columns.map((col) => {
                    const cell = row.cells.find((c) => c.columnId === col.id);
                    return (
                      <TableCell
                        key={col.id}
                        style={{
                          textAlign: col.align ?? 'left',
                          fontSize: 'var(--typography-size-sm)',
                          color: 'var(--surface-text)',
                        }}
                      >
                        {cell ? formatCell(cell.value, col.format) : '—'}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}

              {/* Locked rows — blurred placeholder */}
              {hasLockedRows && (
                <TableRow>
                  <TableCell
                    colSpan={dataset.columns.length}
                    style={{ padding: 0 }}
                  >
                    <div
                      style={{
                        filter: 'blur(4px)',
                        userSelect: 'none',
                        pointerEvents: 'none',
                        opacity: 0.5,
                      }}
                      aria-hidden="true"
                    >
                      {lockedRows.slice(0, 3).map((row) => (
                        <div
                          key={row.id}
                          style={{
                            display: 'grid',
                            gridTemplateColumns: `repeat(${dataset.columns.length}, 1fr)`,
                            padding: 'var(--space-3) var(--space-4)',
                            borderBottom: '1px solid var(--border-soft)',
                            fontSize: 'var(--typography-size-sm)',
                            color: 'var(--surface-text-muted)',
                          }}
                        >
                          {dataset.columns.map((col) => {
                            const cell = row.cells.find((c) => c.columnId === col.id);
                            return (
                              <span key={col.id}>
                                {cell ? formatCell(cell.value, col.format) : '—'}
                              </span>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Footer */}
        <div
          style={{
            borderTop: '1px solid var(--border-soft)',
            padding: 'var(--space-4) var(--space-6)',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--space-4)',
            flexWrap: 'wrap',
            background: 'var(--color-ramp-warm-50)',
          }}
        >
          <p
            style={{
              fontSize: 'var(--typography-size-compact)',
              color: 'var(--surface-text-muted)',
            }}
          >
            Source: {dataset.sourceNote}
            {dataset.methodologyNote && (
              <span> · {dataset.methodologyNote}</span>
            )}
          </p>

          <div className="flex items-center gap-3">
            {dataset.exportEnabled.sample && (
              <button
                type="button"
                onClick={handleExport}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  padding: 'var(--space-2) var(--space-4)',
                  borderRadius: 'var(--radius-button)',
                  border: '1px solid var(--border-soft)',
                  background: 'transparent',
                  cursor: 'pointer',
                  fontSize: 'var(--typography-size-sm)',
                  color: 'var(--surface-text)',
                  minHeight: '44px',
                }}
              >
                <Download size={14} aria-hidden="true" />
                Export Sample
              </button>
            )}

            {hasLockedRows && (
              <button
                type="button"
                onClick={handleUnlock}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  padding: 'var(--space-2) var(--space-4)',
                  borderRadius: 'var(--radius-button)',
                  border: 'none',
                  background: 'var(--color-brand-red)',
                  cursor: 'pointer',
                  fontSize: 'var(--typography-size-sm)',
                  fontWeight: 500,
                  color: '#ffffff',
                  minHeight: '44px',
                  transition: 'background-color 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget).style.backgroundColor = 'var(--color-brand-red-dark, #8a1519)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget).style.backgroundColor = 'var(--color-brand-red)';
                }}
              >
                <Lock size={14} aria-hidden="true" />
                Unlock Full Dataset
              </button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
