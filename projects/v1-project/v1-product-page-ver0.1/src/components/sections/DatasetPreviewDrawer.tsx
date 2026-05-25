'use client';

/**
 * CRAFT (aura-craft step 4.5 · 2026-05-12)
 * Section type: Drawer (overlay · no SectionWrapper)
 * Lead element: drawer header (h2 text-base font-display font-light · truncated title)
 * Support: table with visible rows + blurred locked rows + paywall message + CTA footer
 * Type rhythm: lg/sm/base/micro — header h2 = text-base · table th = text-2xs uppercase · td = text-compact · footer CTA = DS Button
 * Motion event: spring entrance 280/30 (stiffness 280 damping 30 per SKILL.md spec · 0.8 mass)
 *   desktop = x: 100%→0 (right-slide) · mobile = y: 100%→0 (bottom-sheet) · backdrop opacity 220ms
 *   — useReducedMotion: duration: 0 → instant render (shouldReduceMotion passed to transition)
 * Depth: shadow-modal (-8px 0 32px rgba 0.12 desktop · 0 -8px 32px rgba 0.12 mobile)
 *   focus trap active when open · ESC closes · body scroll locked
 * Mobile override: bottom-sheet (max-h-[85dvh] · rounded-t-2xl) · drag handle visible at top
 */

/**
 * DatasetPreviewDrawer — modal drawer (PRD §21 · recipe row 13)
 *
 * Desktop: right-slide panel
 * Mobile: bottom-sheet
 *
 * Access tiers:
 *   public:         3 rows + column names · remaining rows blurred
 *   lead-unlocked:  8-10 rows + sample CSV export
 *   paid:           full · CSV/Excel export
 *
 * A11y:
 *   role="dialog" aria-modal="true" aria-labelledby
 *   Focus trap when open · ESC closes
 *   .kr-paywall-dataset on locked rows · aria-hidden + visible aria-label on overlay
 *
 * Animation: Framer AnimatePresence · useReducedMotion mandatory
 * No SectionWrapper (utility component).
 */

import { useEffect, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { X, Download } from 'lucide-react';
import { Button } from '@kenresearch/design-system/atoms';

// ─── Types ─────────────────────────────────────────────────────────────────

export interface DatasetColumn {
  id: string;
  label: string;
  format?: 'text' | 'currency' | 'percent' | 'year' | 'number';
  align?: 'left' | 'center' | 'right';
}

export interface DatasetRow {
  id: string;
  cells: { columnId: string; value: string | number }[];
}

export type DrawerAccessTier = 'public' | 'lead-unlocked' | 'paid';

export interface DatasetPreviewDrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  columns: DatasetColumn[];
  rows: DatasetRow[];
  publicRows?: number;
  leadRows?: number;
  accessTier?: DrawerAccessTier;
  onUnlock?: () => void;
  onExportCSV?: () => void;
  onExportExcel?: () => void;
}

// ─── Focus trap hook (inline — TODO: promote to DS atom after sprint) ───────

function useFocusTrap(ref: React.RefObject<HTMLDivElement | null>, active: boolean) {
  useEffect(() => {
    if (!active || !ref.current) return;
    const el = ref.current;

    const focusables = el.querySelectorAll<HTMLElement>(
      'a[href],button:not([disabled]),textarea,input,select,[tabindex]:not([tabindex="-1"])',
    );
    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };

    el.addEventListener('keydown', handleKeyDown);
    first?.focus();
    return () => el.removeEventListener('keydown', handleKeyDown);
  }, [active, ref]);
}

// ─── Cell formatter ─────────────────────────────────────────────────────────

function formatCell(value: string | number, format?: DatasetColumn['format']): string {
  if (format === 'currency') return typeof value === 'number' ? value.toLocaleString() : String(value);
  if (format === 'percent') return typeof value === 'number' ? `${value}%` : String(value);
  if (format === 'year') return String(value);
  return String(value);
}

// ─── Paywall overlay ────────────────────────────────────────────────────────

function PaywallRow({ colCount }: { colCount: number }) {
  return (
    <tr className="kr-paywall-dataset" aria-hidden="true">
      <td
        colSpan={colCount}
        className="relative py-2 px-3"
        style={{ filter: 'blur(4px)', userSelect: 'none' }}
      >
        <div className="h-4 rounded" style={{ backgroundColor: 'var(--color-ramp-warm-200)' }} />
      </td>
    </tr>
  );
}

// ─── DatasetPreviewDrawer ───────────────────────────────────────────────────

export function DatasetPreviewDrawer({
  open,
  onClose,
  title,
  columns,
  rows,
  publicRows = 3,
  leadRows = 8,
  accessTier = 'public',
  onUnlock,
  onExportCSV,
  onExportExcel,
}: DatasetPreviewDrawerProps) {
  const shouldReduceMotion = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = 'dataset-drawer-title';

  useFocusTrap(panelRef, open);

  // ESC close
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Determine visible vs locked row counts
  const visibleCount =
    accessTier === 'paid' ? rows.length :
    accessTier === 'lead-unlocked' ? Math.min(leadRows, rows.length) :
    Math.min(publicRows, rows.length);
  const lockedCount = rows.length - visibleCount;

  // CTA copy per tier
  const unlockCopy =
    accessTier === 'public' ? 'Unlock Full Dataset' :
    accessTier === 'lead-unlocked' ? 'Request Full Report' :
    'Download CSV';

  // Framer variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const panelVariants = {
    hidden: { x: '100%', opacity: shouldReduceMotion ? 1 : 0.8 },
    visible: { x: 0, opacity: 1 },
    exit: { x: '100%', opacity: 0 },
  };

  const sheetVariants = {
    hidden: { y: '100%', opacity: shouldReduceMotion ? 1 : 0.8 },
    visible: { y: 0, opacity: 1 },
    exit: { y: '100%', opacity: 0 },
  };

  const transition = shouldReduceMotion
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 380, damping: 38, mass: 0.8 };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-40"
            style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Desktop: right-side panel */}
          <motion.div
            key="panel-desktop"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={transition}
            className="fixed right-0 top-0 bottom-0 z-50 w-full hidden md:flex flex-col rounded-l-2xl overflow-hidden"
            style={{
              maxWidth: '480px',
              backgroundColor: 'var(--color-foundation-white)',
              boxShadow: '-8px 0 32px rgba(0,0,0,0.12)',
            }}
          >
            <DrawerContents
              titleId={titleId}
              title={title}
              columns={columns}
              rows={rows}
              visibleCount={visibleCount}
              lockedCount={lockedCount}
              accessTier={accessTier}
              unlockCopy={unlockCopy}
              onClose={onClose}
              onUnlock={onUnlock}
              onExportCSV={onExportCSV}
              onExportExcel={onExportExcel}
            />
          </motion.div>

          {/* Mobile: bottom sheet */}
          <motion.div
            key="sheet-mobile"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${titleId}-mobile`}
            variants={sheetVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={transition}
            className="fixed bottom-0 left-0 right-0 z-50 flex flex-col md:hidden max-h-[85dvh] rounded-t-2xl overflow-hidden"
            style={{
              backgroundColor: 'var(--color-foundation-white)',
              boxShadow: '0 -8px 32px rgba(0,0,0,0.12)',
            }}
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-1" aria-hidden="true">
              <div
                className="w-10 h-1 rounded-full"
                style={{ backgroundColor: 'var(--border-default)' }}
              />
            </div>
            <DrawerContents
              titleId={`${titleId}-mobile`}
              title={title}
              columns={columns}
              rows={rows}
              visibleCount={visibleCount}
              lockedCount={lockedCount}
              accessTier={accessTier}
              unlockCopy={unlockCopy}
              onClose={onClose}
              onUnlock={onUnlock}
              onExportCSV={onExportCSV}
              onExportExcel={onExportExcel}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Drawer contents (shared between desktop panel + mobile sheet) ──────────

interface DrawerContentsProps {
  titleId: string;
  title: string;
  columns: DatasetColumn[];
  rows: DatasetRow[];
  visibleCount: number;
  lockedCount: number;
  accessTier: DrawerAccessTier;
  unlockCopy: string;
  onClose: () => void;
  onUnlock?: () => void;
  onExportCSV?: () => void;
  onExportExcel?: () => void;
}

function DrawerContents({
  titleId,
  title,
  columns,
  rows,
  visibleCount,
  lockedCount,
  accessTier,
  unlockCopy,
  onClose,
  onUnlock,
  onExportCSV,
  onExportExcel,
}: DrawerContentsProps) {
  const visibleRows = rows.slice(0, visibleCount);
  const showExport = accessTier === 'paid' || accessTier === 'lead-unlocked';

  return (
    <>
      {/* Header */}
      <div
        className="flex items-center justify-between gap-3 px-5 py-4 shrink-0"
        style={{ borderBottom: '1px solid var(--border-soft)' }}
      >
        <h2
          id={titleId}
          className="text-base font-display font-light leading-snug truncate"
          style={{ color: 'var(--color-foundation-black)' }}
        >
          {title}
        </h2>
        <Button
          variant="secondary"
          size="sm"
          onClick={onClose}
          ariaLabel="Close dataset drawer"
        >
          <X size={16} aria-hidden="true" />
        </Button>
      </div>

      {/* Body — scrollable table */}
      <div className="flex-1 overflow-y-auto px-5 py-4">
        <div className="overflow-x-auto">
          <table className="w-full text-compact font-body border-collapse">
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-default)' }}>
                {columns.map((col) => (
                  <th
                    key={col.id}
                    scope="col"
                    className="py-2 px-3 text-left text-2xs font-body font-semibold uppercase tracking-wider"
                    style={{
                      color: 'var(--surface-text-muted)',
                      textAlign: col.align ?? 'left',
                    }}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Visible rows */}
              {visibleRows.map((row) => (
                <tr
                  key={row.id}
                  style={{ borderBottom: '1px solid var(--border-soft)' }}
                >
                  {columns.map((col) => {
                    const cell = row.cells.find((c) => c.columnId === col.id);
                    return (
                      <td
                        key={col.id}
                        className="py-2.5 px-3"
                        style={{
                          color: 'var(--color-foundation-black)',
                          textAlign: col.align ?? 'left',
                        }}
                      >
                        {cell ? formatCell(cell.value, col.format) : '—'}
                      </td>
                    );
                  })}
                </tr>
              ))}

              {/* Locked/blurred rows */}
              {lockedCount > 0 && (
                Array.from({ length: Math.min(lockedCount, 3) }).map((_, i) => (
                  <PaywallRow key={`locked-${i}`} colCount={columns.length} />
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Paywall overlay message (not aria-hidden — it's the accessible explanation) */}
        {lockedCount > 0 && (
          <div
            className="mt-4 py-3 px-4 rounded-[var(--radius-card)] text-center"
            style={{ backgroundColor: 'var(--color-ramp-warm-100)', border: '1px solid var(--border-soft)' }}
            aria-label={`${lockedCount} additional rows locked — sign in to unlock`}
          >
            <p className="text-compact font-body" style={{ color: 'var(--surface-text-muted)' }}>
              +{lockedCount} rows locked
            </p>
          </div>
        )}
      </div>

      {/* Footer — CTA */}
      <div
        className="shrink-0 px-5 py-4 flex flex-col gap-3"
        style={{ borderTop: '1px solid var(--border-soft)' }}
      >
        {showExport && (
          <div className="flex gap-2 flex-wrap">
            {onExportCSV && (
              <Button
                variant="secondary"
                size="sm"
                onClick={onExportCSV}
                ariaLabel="Export dataset as CSV"
              >
                <Download size={14} aria-hidden="true" className="mr-1.5" />
                CSV
              </Button>
            )}
            {onExportExcel && accessTier === 'paid' && (
              <Button
                variant="secondary"
                size="sm"
                onClick={onExportExcel}
                ariaLabel="Export dataset as Excel"
              >
                <Download size={14} aria-hidden="true" className="mr-1.5" />
                Excel
              </Button>
            )}
          </div>
        )}

        {onUnlock && (
          <Button
            variant="brand"
            size="md"
            onClick={onUnlock}
          >
            {unlockCopy}
          </Button>
        )}
      </div>
    </>
  );
}
