'use client';

/**
 * ChartCard — PRD §20 ChartCard 8-zone standard
 * Reusable. Used by MarketSizeChart (row 13), FutureOutlookModule (row 26), etc.
 *
 * 8 zones in order:
 * 1. HEADER   — eyebrow + access badge
 * 2. TITLE    — H3 chart title
 * 3. INSIGHT  — 1-line analyst takeaway
 * 4. CONTROLS — toggles / timeframe / view modes
 * 5. VIZ      — chart body (Highcharts, dynamic import ssr:false)
 * 6. DATASET  — preview rows, "View Dataset" link
 * 7. SOURCE   — source · last updated
 * 8. ACCESS+CTA — lock state · CTA pair
 *
 * Motion rule: opacity ONLY (no y-translate) to avoid Highcharts -1×-1 dim bug (LEARNINGS).
 */

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { motion, useReducedMotion } from 'framer-motion';
import { Badge } from '@kenresearch/design-system/atoms';
import { AccessLevelGate } from '@/components/AccessLevelGate';
import { DatasetPreviewDrawer } from '@/components/sections/DatasetPreviewDrawer';
import { useLeadFormModal } from '@/components/LeadFormModalProvider';
import { useAnalytics } from '@/hooks/useAnalytics';
import type { ChartModule, ChartControl, AccessLevel } from '@/types/schema';
import {
  ExternalLink,
  Lock,
  ArrowUpRight,
} from 'lucide-react';

// ─── Dynamic chart import (ssr:false — Highcharts requires window) ───────────
// TODO: replace placeholder w/ real @ken-research/charts LineChart / AreaChart
const ChartPlaceholder = dynamic(
  () =>
    Promise.resolve(
      function ChartPlaceholderComp({ title }: { title: string }) {
        return (
          <div
            style={{
              width: '100%',
              minHeight: '260px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--color-ramp-warm-100)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--surface-text-muted)',
              fontSize: 'var(--typography-size-sm)',
              fontStyle: 'italic',
            }}
          >
            Chart: {title} (Phase C — Highcharts wire)
          </div>
        );
      },
    ),
  { ssr: false },
);

// ─── Access badge label map ───────────────────────────────────────────────────
const ACCESS_BADGE_LABEL: Record<AccessLevel, string> = {
  public: 'Public',
  metered: 'Preview',
  'lead-gated': 'Lead required',
  'login-gated': 'Login required',
  paid: 'Paid access',
  hidden: 'Hidden',
};

const ACCESS_BADGE_THEME: Record<AccessLevel, 'neutral' | 'success' | 'warning' | 'error'> = {
  public: 'success',
  metered: 'neutral',
  'lead-gated': 'warning',
  'login-gated': 'warning',
  paid: 'error',
  hidden: 'neutral',
};

// ─── Control chip ─────────────────────────────────────────────────────────────
function ControlChip({
  control,
  activeValue,
  onChange,
}: {
  control: ChartControl;
  activeValue: string;
  onChange: (val: string) => void;
}) {
  if (!control.options) return null;
  return (
    <div
      role="group"
      aria-label={control.label}
      style={{ display: 'flex', gap: 'var(--space-1)', flexWrap: 'wrap' }}
    >
      {control.options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          aria-pressed={activeValue === opt.value}
          onClick={() => onChange(opt.value)}
          style={{
            padding: 'var(--space-1) var(--space-3)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid',
            borderColor:
              activeValue === opt.value
                ? 'var(--color-brand-red)'
                : 'var(--border-soft)',
            background:
              activeValue === opt.value
                ? 'var(--color-brand-red)'
                : 'transparent',
            color:
              activeValue === opt.value
                ? '#ffffff'
                : 'var(--surface-text-muted)',
            fontSize: 'var(--typography-size-compact)',
            fontWeight: activeValue === opt.value ? 500 : 400,
            cursor: 'pointer',
            minHeight: '36px',
            transition: 'background-color 0.15s ease, border-color 0.15s ease',
          }}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

// ─── Dataset mini-preview (3 rows visible inline) ────────────────────────────
function DatasetMiniPreview({
  module,
  onOpenDrawer,
}: {
  module: ChartModule;
  onOpenDrawer: () => void;
}) {
  const { datasetPreview } = module;
  const accessLevel = module.zones.accessState.level;
  const visibleCount = Math.min(datasetPreview.publicRows, datasetPreview.rows.length);
  const previewRows = datasetPreview.rows.slice(0, visibleCount);

  return (
    <div>
      {/* Mini table header */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${datasetPreview.columns.length}, 1fr)`,
          padding: 'var(--space-2) var(--space-3)',
          background: 'var(--color-ramp-warm-100)',
          borderRadius: 'var(--radius-sm) var(--radius-sm) 0 0',
          borderBottom: '1px solid var(--border-soft)',
        }}
      >
        {datasetPreview.columns.map((col) => (
          <span
            key={col.id}
            style={{
              fontSize: 'var(--typography-size-compact)',
              fontWeight: 600,
              color: 'var(--surface-text)',
              textAlign: col.align ?? 'left',
            }}
          >
            {col.label}
          </span>
        ))}
      </div>

      {/* Preview rows */}
      {previewRows.map((row) => (
        <div
          key={row.id}
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${datasetPreview.columns.length}, 1fr)`,
            padding: 'var(--space-2) var(--space-3)',
            borderBottom: '1px solid var(--border-soft)',
          }}
        >
          {datasetPreview.columns.map((col) => {
            const cell = row.cells.find((c) => c.columnId === col.id);
            const value = cell?.value;
            return (
              <span
                key={col.id}
                style={{
                  fontSize: 'var(--typography-size-sm)',
                  color: 'var(--surface-text-muted)',
                  textAlign: col.align ?? 'left',
                }}
              >
                {typeof value === 'number'
                  ? col.format === 'currency'
                    ? value.toLocaleString('en-AU', { minimumFractionDigits: 1 })
                    : col.format === 'percent'
                    ? `${value}%`
                    : String(value)
                  : value ?? '—'}
              </span>
            );
          })}
        </div>
      ))}

      {/* Blurred locked rows indicator */}
      {datasetPreview.fullRowCount > visibleCount && (
        <div
          aria-hidden="true"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${datasetPreview.columns.length}, 1fr)`,
            padding: 'var(--space-2) var(--space-3)',
            borderBottom: '1px solid var(--border-soft)',
            filter: 'blur(3px)',
            userSelect: 'none',
            pointerEvents: 'none',
            opacity: 0.4,
          }}
        >
          {datasetPreview.columns.map((col) => (
            <span
              key={col.id}
              style={{
                fontSize: 'var(--typography-size-sm)',
                color: 'var(--surface-text-muted)',
              }}
            >
              {col.format === 'year' ? '20**' : '****'}
            </span>
          ))}
        </div>
      )}

      {/* "View Dataset" link */}
      <button
        type="button"
        onClick={onOpenDrawer}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-1)',
          marginTop: 'var(--space-2)',
          padding: 'var(--space-1) 0',
          fontSize: 'var(--typography-size-compact)',
          color: accessLevel === 'public' ? 'var(--color-brand-red)' : 'var(--surface-text-muted)',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontWeight: 500,
          minHeight: '36px',
        }}
      >
        {accessLevel !== 'public' && (
          <Lock size={11} aria-hidden="true" />
        )}
        View Dataset
        <ExternalLink size={11} aria-hidden="true" />
      </button>
    </div>
  );
}

// ─── Main ChartCard ───────────────────────────────────────────────────────────
interface ChartCardProps {
  module: ChartModule;
  reportSlug: string;
  /** Override heading for display */
  headingOverride?: string;
}

export function ChartCard({ module, reportSlug, headingOverride }: ChartCardProps) {
  const prefersReduced = useReducedMotion();
  const dispatch = useAnalytics();
  const { openForm } = useLeadFormModal();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [controlValues, setControlValues] = useState<Record<string, string>>(
    () =>
      Object.fromEntries(
        (module.zones.controls ?? []).map((c) => [
          c.id,
          c.defaultValue ?? c.options?.[0]?.value ?? '',
        ]),
      ),
  );

  const handleControlChange = useCallback(
    (controlId: string, value: string) => {
      setControlValues((prev) => ({ ...prev, [controlId]: value }));
      dispatch('chart_filter_change', {
        section_name: 'ChartCard',
        chart_id: module.id,
        control_id: controlId,
        value,
      });
    },
    [dispatch, module.id],
  );

  const handleOpenDrawer = useCallback(() => {
    dispatch('dataset_preview_click', {
      section_name: 'ChartCard',
      chart_id: module.id,
    });
    setDrawerOpen(true);
  }, [dispatch, module.id]);

  const handleCTA = useCallback(() => {
    const trigger = module.zones.cta?.trigger ?? 'sample';
    dispatch('sample_cta_click', {
      section_name: 'ChartCard',
      chart_id: module.id,
      cta_location: 'chart_footer',
    });
    openForm(trigger, {
      reportSlug,
      chartId: module.id,
      sectionName: 'ChartCard',
      ctaLocation: 'chart_footer',
    });
  }, [dispatch, module, openForm, reportSlug]);

  const accessLevel = module.zones.accessState.level;
  const title = headingOverride ?? module.zones.title;

  return (
    <>
      {/* Opacity-only animation — no y-translate (LEARNINGS: Highcharts -1×-1 dim bug) */}
      <motion.div
        initial={prefersReduced ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          borderRadius: 'var(--radius-card)',
          border: '1px solid var(--border-soft)',
          background: '#ffffff',
          overflow: 'hidden',
        }}
      >
        {/* ── ZONE 1: HEADER ─────────────────────────────────────────────────── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 'var(--space-4) var(--space-6)',
            borderBottom: '1px solid var(--border-soft)',
            background: 'var(--color-ramp-warm-50)',
            flexWrap: 'wrap',
            gap: 'var(--space-2)',
          }}
        >
          <span
            style={{
              fontSize: 'var(--typography-size-compact)',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: 'var(--surface-text-muted)',
            }}
          >
            {module.zones.eyebrow ?? 'Market Data'}
          </span>
          <Badge
            theme={ACCESS_BADGE_THEME[accessLevel]}
            size="sm"
          >
            {ACCESS_BADGE_LABEL[accessLevel]}
          </Badge>
        </div>

        <div style={{ padding: 'var(--space-6)' }}>
          {/* ── ZONE 2: TITLE ────────────────────────────────────────────────── */}
          <h3
            style={{
              fontFamily: 'var(--typography-family-display)',
              fontSize: 'var(--typography-size-lg)',
              fontWeight: 600,
              color: 'var(--surface-text)',
              marginBottom: module.zones.insightLine ? 'var(--space-2)' : 'var(--space-4)',
              lineHeight: 1.3,
            }}
          >
            {title}
          </h3>

          {/* ── ZONE 3: INSIGHT ──────────────────────────────────────────────── */}
          {module.zones.insightLine && (
            <p
              style={{
                fontSize: 'var(--typography-size-sm)',
                color: 'var(--surface-text-muted)',
                marginBottom: 'var(--space-4)',
                lineHeight: 1.5,
                fontStyle: 'italic',
                borderLeft: '2px solid var(--color-brand-red)',
                paddingLeft: 'var(--space-3)',
              }}
            >
              {module.zones.insightLine}
            </p>
          )}

          {/* ── ZONE 4: CONTROLS ─────────────────────────────────────────────── */}
          {module.zones.controls && module.zones.controls.length > 0 && (
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 'var(--space-3)',
                marginBottom: 'var(--space-5)',
              }}
            >
              {module.zones.controls.map((control: ChartControl) => (
                <ControlChip
                  key={control.id}
                  control={control}
                  activeValue={controlValues[control.id] ?? ''}
                  onChange={(val) => handleControlChange(control.id, val)}
                />
              ))}
            </div>
          )}

          {/* ── ZONE 5: VIZ ──────────────────────────────────────────────────── */}
          <AccessLevelGate
            access={module.zones.accessState}
            moduleId={module.id}
            sectionName="ChartCard"
          >
            <div style={{ marginBottom: 'var(--space-5)' }}>
              <ChartPlaceholder title={title} />
            </div>
          </AccessLevelGate>

          {/* ── ZONE 6: DATASET ──────────────────────────────────────────────── */}
          <div
            style={{
              marginBottom: 'var(--space-5)',
              paddingTop: 'var(--space-4)',
              borderTop: '1px solid var(--border-soft)',
            }}
          >
            <p
              style={{
                fontSize: 'var(--typography-size-compact)',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: 'var(--surface-text)',
                marginBottom: 'var(--space-3)',
              }}
            >
              Dataset Preview
            </p>
            <DatasetMiniPreview module={module} onOpenDrawer={handleOpenDrawer} />
          </div>

          {/* ── ZONE 7: SOURCE ───────────────────────────────────────────────── */}
          <div
            style={{
              paddingTop: 'var(--space-3)',
              borderTop: '1px solid var(--border-soft)',
              marginBottom: 'var(--space-4)',
            }}
          >
            <p
              style={{
                fontSize: 'var(--typography-size-compact)',
                color: 'var(--surface-text-muted)',
              }}
            >
              Source: {module.zones.sourceNote} · Last updated {module.datasetPreview.lastUpdated}
            </p>
          </div>
        </div>

        {/* ── ZONE 8: ACCESS + CTA ─────────────────────────────────────────────── */}
        <div
          style={{
            borderTop: '1px solid var(--border-soft)',
            padding: 'var(--space-4) var(--space-6)',
            background:
              accessLevel === 'public'
                ? 'var(--color-ramp-warm-50)'
                : 'var(--color-ramp-warm-100)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 'var(--space-3)',
          }}
        >
          {/* Access state label */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              fontSize: 'var(--typography-size-sm)',
              color: 'var(--surface-text-muted)',
            }}
          >
            {accessLevel !== 'public' && (
              <Lock size={13} aria-hidden="true" />
            )}
            <span>
              {accessLevel === 'public'
                ? 'Public preview data'
                : accessLevel === 'metered'
                ? 'Preview — limited interactions'
                : 'Unlock for full dataset access'}
            </span>
          </div>

          {/* CTA — contextual */}
          {module.zones.cta && (
            <button
              type="button"
              onClick={handleCTA}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                padding: 'var(--space-2) var(--space-5)',
                borderRadius: 'var(--radius-button)',
                border: accessLevel === 'public' ? '1px solid var(--border-soft)' : 'none',
                background:
                  accessLevel === 'public'
                    ? 'transparent'
                    : 'var(--color-brand-red)',
                cursor: 'pointer',
                fontSize: 'var(--typography-size-sm)',
                fontWeight: 500,
                color:
                  accessLevel === 'public' ? 'var(--surface-text)' : '#ffffff',
                minHeight: '44px',
                transition: 'background-color 0.2s ease, border-color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                if (accessLevel !== 'public') {
                  (e.currentTarget).style.backgroundColor = 'var(--color-brand-red-dark, #8a1519)';
                }
              }}
              onMouseLeave={(e) => {
                if (accessLevel !== 'public') {
                  (e.currentTarget).style.backgroundColor = 'var(--color-brand-red)';
                }
              }}
            >
              {module.zones.cta.label}
              <ArrowUpRight
                size={14}
                aria-hidden="true"
                style={{ transform: 'rotate(45deg)' }}
              />
            </button>
          )}
        </div>
      </motion.div>

      {/* Dataset drawer */}
      <DatasetPreviewDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        dataset={module.datasetPreview}
        accessLevel={accessLevel}
        reportSlug={reportSlug}
        chartId={module.id}
        chartTitle={title}
      />
    </>
  );
}
