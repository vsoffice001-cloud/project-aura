'use client';

/**
 * DemoCanvas · Per-demo card with live chart preview + controls.
 *
 * Renders:
 *   - Anchor <section id={demo.id}> for hash nav
 *   - Header: category tag · demo name (h3) · description
 *   - Controls: variant toggle · surface toggle
 *   - Chart canvas: white card · chart or primitive preview
 *   - State demo (if demo.stateDemos defined)
 *   - IntersectionObserver: sets active demo in context when in viewport
 *
 * @module charts-showcase/components/DemoCanvas
 */

import { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { ChartFigure, ChartReveal, LazyChart, KEN_CHART_SERIES_ARRAY } from '@kenresearch/design-system/charts';
import { Button } from '@kenresearch/design-system/atoms';
import { DEMOS } from '@/lib/demo-registry';
import type { Demo, DemoSurface } from '@/lib/demo-registry';
import { useDemoActive, useA11yOverlay } from '@/lib/context';
import { HitArea } from './HitArea';
import { VariantToggle } from './VariantToggle';
import { StateDemo } from './StateDemo';

// ─── Dynamic imports for Highcharts (browser-only) ────────────────────────────
// SSR disabled at chart level — showcase page is 'use client' but Highcharts
// requires window at module level. Dynamic import is the correct pattern here.

const KenColumnChart     = dynamic(() => import('@kenresearch/design-system/charts').then(m => m.KenColumnChart),     { ssr: false });
const KenBarChart        = dynamic(() => import('@kenresearch/design-system/charts').then(m => m.KenBarChart),        { ssr: false });
const KenDualColumnChart = dynamic(() => import('@kenresearch/design-system/charts').then(m => m.KenDualColumnChart), { ssr: false });
const KenBubbleChart     = dynamic(() => import('@kenresearch/design-system/charts').then(m => m.KenBubbleChart),     { ssr: false });
const KenDonutChart      = dynamic(() => import('@kenresearch/design-system/charts').then(m => m.KenDonutChart),      { ssr: false });
const KenMultiLineChart  = dynamic(() => import('@kenresearch/design-system/charts').then(m => m.KenMultiLineChart),  { ssr: false });
const KenScenarioFanChart= dynamic(() => import('@kenresearch/design-system/charts').then(m => m.KenScenarioFanChart),{ ssr: false });
// Sprint C: 4 new charts (CSS-grid + Highcharts treemap)
const KenTreemap         = dynamic(() => import('@kenresearch/design-system/charts').then(m => m.KenTreemap),         { ssr: false });
const KenHeatmap         = dynamic(() => import('@kenresearch/design-system/charts').then(m => m.KenHeatmap),         { ssr: false });
const KenKeywordScatter  = dynamic(() => import('@kenresearch/design-system/charts').then(m => m.KenKeywordScatter),  { ssr: false });
const KenGanttTimeline   = dynamic(() => import('@kenresearch/design-system/charts').then(m => m.KenGanttTimeline),   { ssr: false });
const PropertyTable      = dynamic(() => import('@kenresearch/design-system/charts').then(m => m.PropertyTable),      { ssr: false });
const RankingTable       = dynamic(() => import('@kenresearch/design-system/charts').then(m => m.RankingTable),       { ssr: false });
// Sprint G.11: 4 new Highcharts charts + 4 new DS tables
const KenWaterfallChart        = dynamic(() => import('@kenresearch/design-system/charts').then(m => m.KenWaterfallChart),        { ssr: false });
const KenStackedBarChart       = dynamic(() => import('@kenresearch/design-system/charts').then(m => m.KenStackedBarChart),       { ssr: false });
const KenSparklineChart        = dynamic(() => import('@kenresearch/design-system/charts').then(m => m.KenSparklineChart),        { ssr: false });
const KenRadarChart            = dynamic(() => import('@kenresearch/design-system/charts').then(m => m.KenRadarChart),            { ssr: false });
const KenMatrixComparisonTable = dynamic(() => import('@kenresearch/design-system/charts').then(m => m.KenMatrixComparisonTable), { ssr: false });
const KenTimeSeriesTable       = dynamic(() => import('@kenresearch/design-system/charts').then(m => m.KenTimeSeriesTable),       { ssr: false });
const KenScorecardTable        = dynamic(() => import('@kenresearch/design-system/charts').then(m => m.KenScorecardTable),        { ssr: false });
const KenHierarchyTable        = dynamic(() => import('@kenresearch/design-system/charts').then(m => m.KenHierarchyTable),        { ssr: false });

// ─── Map: demo.name → dynamic component ──────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyComponent = React.ComponentType<any>;

const DYNAMIC_MAP: Record<string, AnyComponent> = {
  KenColumnChart,
  KenBarChart,
  KenDualColumnChart,
  KenBubbleChart,
  KenDonutChart,
  KenMultiLineChart,
  KenScenarioFanChart,
  KenTreemap,
  KenHeatmap,
  KenKeywordScatter,
  KenGanttTimeline,
  KenWaterfallChart,
  KenStackedBarChart,
  KenSparklineChart,
  KenRadarChart,
  KenMatrixComparisonTable,
  KenTimeSeriesTable,
  KenScorecardTable,
  KenHierarchyTable,
  PropertyTable,
  RankingTable,
};

// ─── Category badge colors ────────────────────────────────────────────────────

const CATEGORY_COLORS: Record<string, string> = {
  primitive: 'rgba(148, 136, 236, 0.12)',
  chart:     'rgba(168, 183, 240, 0.15)',
  table:     'rgba(192, 132, 252, 0.12)',
  state:     'rgba(0, 0, 0, 0.06)',
};

const CATEGORY_TEXT_COLORS: Record<string, string> = {
  primitive: 'rgb(91, 79, 207)',
  chart:     'rgb(60, 80, 180)',
  table:     'rgb(126, 34, 206)',
  state:     'var(--semantic-ink-muted)',
};

// ─── ChartFigure wrapper data ─────────────────────────────────────────────────

function getChartFigureProps(demo: Demo, props: Record<string, unknown>) {
  // Only wrap charts/tables with ChartFigure — not primitives or state atoms
  if (demo.isPrimitive || demo.category === 'state') return null;

  const figProps: Record<string, unknown> = {
    title: demo.name + ' · Demo',
    eyebrow: demo.category.toUpperCase() + ' · DEMO',
  };

  // Chart-specific figure metadata
  if (demo.id === 'chart-column') {
    figProps.title = `Revenue by period · ${(props.unit as string) ?? 'AUD Mn'}`;
    figProps.insight = 'Revenue accelerates in H2 across all variants.';
    figProps.unit = props.unit as string;
    figProps.legend = [{ kind: 'solid', color: KEN_CHART_SERIES_ARRAY[0], label: 'Revenue' }];
  } else if (demo.id === 'chart-bar') {
    figProps.title = 'Revenue share by metro · %';
    figProps.unit = '%';
    figProps.legend = [{ kind: 'solid', color: KEN_CHART_SERIES_ARRAY[0], label: 'Revenue share %' }];
  } else if (demo.id === 'chart-dual-column') {
    figProps.title = 'Cold Storage vs Cold Transport · AUD Mn';
    figProps.unit = 'AUD Mn';
    figProps.legend = [
      { kind: 'solid', color: KEN_CHART_SERIES_ARRAY[0], label: 'Cold Storage' },
      { kind: 'solid', color: KEN_CHART_SERIES_ARRAY[1], label: 'Cold Transport' },
    ];
  } else if (demo.id === 'chart-bubble') {
    figProps.title = 'Market participants · x = revenue · y = growth · z = capacity';
    figProps.unit = 'AUD Mn';
    figProps.legend = [
      { kind: 'dot', color: KEN_CHART_SERIES_ARRAY[0], label: 'Tier-1 operators' },
      { kind: 'dot', color: KEN_CHART_SERIES_ARRAY[2], label: 'Mid-tier' },
    ];
  } else if (demo.id === 'chart-donut') {
    figProps.title = 'Revenue share by end-user sector';
    figProps.unit = '%';
    figProps.legend = [
      { kind: 'dot', color: KEN_CHART_SERIES_ARRAY[0], label: 'Meat & Seafood' },
      { kind: 'dot', color: KEN_CHART_SERIES_ARRAY[1], label: 'Dairy' },
      { kind: 'dot', color: KEN_CHART_SERIES_ARRAY[2], label: 'Pharma' },
      { kind: 'dot', color: KEN_CHART_SERIES_ARRAY[3], label: 'Retail / QSR' },
      { kind: 'dot', color: KEN_CHART_SERIES_ARRAY[4], label: 'Other' },
    ];
  } else if (demo.id === 'chart-multiline') {
    figProps.title = '6 macro indicators · % YoY';
    figProps.unit = '% YoY';
    const series = props.series as Array<{ name: string }> | undefined;
    if (series) {
      figProps.legend = series.map((s, i) => ({
        kind: 'line' as const,
        color: KEN_CHART_SERIES_ARRAY[i % KEN_CHART_SERIES_ARRAY.length],
        label: s.name,
      }));
    }
  } else if (demo.id === 'chart-scenario') {
    figProps.title = 'Market size under Bear / Base / Bull scenarios · AUD Mn';
    figProps.unit = 'AUD Mn';
    figProps.legend = [
      { kind: 'line',   color: KEN_CHART_SERIES_ARRAY[0], label: 'Base · 10.3% CAGR' },
      { kind: 'dashed', color: KEN_CHART_SERIES_ARRAY[3], label: 'Bull · 13.8% CAGR' },
      { kind: 'dashed', color: KEN_CHART_SERIES_ARRAY[2], label: 'Bear · 7.1% CAGR' },
    ];
  } else if (demo.id === 'table-property' || demo.id === 'table-ranking') {
    // Table demos — no ChartFigure wrapper needed
    return null;
  }

  return figProps;
}

// ─── Primitive canvas (non-chart demos) ──────────────────────────────────────

function PrimitiveCanvas({ demo }: { demo: Demo }) {
  if (demo.name === 'ChartFigure') {
    return (
      <ChartFigure
        eyebrow={demo.defaultProps.eyebrow as string}
        title={demo.defaultProps.title as string}
        subtitle={demo.defaultProps.subtitle as string}
        unit={demo.defaultProps.unit as string}
        insight={demo.defaultProps.insight as string}
        legend={demo.defaultProps.legend as Parameters<typeof ChartFigure>[0]['legend']}
        figcaption={demo.defaultProps.figcaption as string}
        source={demo.defaultProps.source as Parameters<typeof ChartFigure>[0]['source']}
        dataAsOf={demo.defaultProps.dataAsOf as Parameters<typeof ChartFigure>[0]['dataAsOf']}
        enableExport={demo.defaultProps.enableExport as boolean}
        exportFilename={demo.defaultProps.exportFilename as string}
        dataTable={demo.defaultProps.dataTable as Parameters<typeof ChartFigure>[0]['dataTable']}
      >
        <div
          style={{
            height: 160,
            background: 'rgba(148,136,236,0.08)',
            borderRadius: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-hidden="true"
        >
          <span className="font-body" style={{ fontSize: '12px', color: 'var(--semantic-ink-muted)' }}>
            Chart slot · inner content renders here
          </span>
        </div>
      </ChartFigure>
    );
  }

  if (demo.name === 'ChartReveal') {
    return (
      <ChartReveal>
        <div
          style={{
            height: 100,
            background: 'rgba(148,136,236,0.08)',
            borderRadius: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-hidden="true"
        >
          <span className="font-body" style={{ fontSize: '12px', color: 'var(--semantic-ink-muted)' }}>
            Inner content — fades in on scroll entrance
          </span>
        </div>
      </ChartReveal>
    );
  }

  // TableShell — render with variant from activeVariant (passed via parent)
  return null;
}

// ─── Main component ───────────────────────────────────────────────────────────

interface DemoCanvasProps {
  demo: Demo;
  /**
   * Zero-based index within category group.
   * Drives card-level bg alternation (3-pane card pattern — NOT full-page section alternation).
   * Even = white · odd = rgba(245,242,241,0.6) warm wash.
   * Decision: showcase is 3-pane single-scroll · card-level alternation chosen over section-level.
   */
  cardIndex?: number;
}

// ─── A11y overlay component ───────────────────────────────────────────────────

function A11yOverlay({ demo, containerRef }: { demo: Demo; containerRef: React.RefObject<HTMLDivElement | null> }) {
  const [items, setItems] = useState<Array<{ id: string; label: string; x: number; y: number; hasAriaLabel: boolean }>>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const found: typeof items = [];
    const focusable = containerRef.current.querySelectorAll<HTMLElement>(
      'button, a, input, select, textarea, [tabindex]:not([tabindex="-1"]), [role="button"], svg[aria-label]'
    );
    let order = 1;
    focusable.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const parentRect = containerRef.current!.getBoundingClientRect();
      const ariaLabel = el.getAttribute('aria-label') || el.getAttribute('title') || el.textContent?.trim().slice(0, 30) || '';
      const hasAriaLabel = Boolean(el.getAttribute('aria-label'));
      if (rect.width > 0 && rect.height > 0) {
        found.push({
          id: `a11y-${order}`,
          label: ariaLabel,
          x: rect.left - parentRect.left,
          y: rect.top - parentRect.top,
          hasAriaLabel,
        });
        order++;
      }
    });

    // Also scan for aria-label on non-interactive elements (chart containers, figures)
    const labeled = containerRef.current.querySelectorAll<HTMLElement>('[aria-label]:not(button):not(a):not(input)');
    labeled.forEach((el, labelIdx) => {
      const rect = el.getBoundingClientRect();
      const parentRect = containerRef.current!.getBoundingClientRect();
      const ariaLabel = el.getAttribute('aria-label') ?? '';
      if (ariaLabel && rect.width > 0) {
        found.push({
          id: `a11y-labeled-${labelIdx}-${ariaLabel.slice(0, 20)}`,
          label: ariaLabel,
          x: rect.left - parentRect.left + 4,
          y: rect.top - parentRect.top + 4,
          hasAriaLabel: true,
        });
      }
    });

    setItems(found);
  }, [containerRef, demo.id]);

  if (items.length === 0) {
    return (
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 20,
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          className="font-body"
          style={{
            fontSize: '11px',
            color: 'rgba(91,79,207,0.7)',
            background: 'rgba(255,255,255,0.9)',
            padding: '4px 8px',
            borderRadius: '4px',
            border: '1px dashed rgba(91,79,207,0.3)',
          }}
        >
          No focusable elements / aria-labels detected in this demo
        </span>
      </div>
    );
  }

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 20,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    >
      {items.map((item, idx) => (
        <div
          key={item.id}
          style={{
            position: 'absolute',
            left: Math.max(0, item.x),
            top: Math.max(0, item.y),
            display: 'flex',
            alignItems: 'flex-start',
            gap: '4px',
          }}
        >
          {/* Focus order badge */}
          <span
            style={{
              background: item.hasAriaLabel ? 'rgba(34, 197, 94, 0.9)' : 'rgba(234, 179, 8, 0.9)',
              color: '#fff',
              fontSize: '9px',
              fontWeight: 700,
              fontFamily: 'ui-monospace, monospace',
              padding: '1px 4px',
              borderRadius: '3px',
              lineHeight: 1.4,
              boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
              flexShrink: 0,
            }}
          >
            {idx + 1}
          </span>
          {/* Aria label callout */}
          {item.label && (
            <span
              style={{
                background: 'rgba(255,255,255,0.95)',
                color: item.hasAriaLabel ? 'rgb(22,101,52)' : 'rgb(113,63,18)',
                border: `1px solid ${item.hasAriaLabel ? 'rgba(34,197,94,0.4)' : 'rgba(234,179,8,0.5)'}`,
                fontSize: '9px',
                fontFamily: 'ui-monospace, monospace',
                padding: '2px 5px',
                borderRadius: '3px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                maxWidth: '160px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {item.label}
            </span>
          )}
        </div>
      ))}
      {/* Legend */}
      <div
        style={{
          position: 'absolute',
          bottom: 8,
          right: 8,
          display: 'flex',
          gap: '6px',
          alignItems: 'center',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '9px', color: 'var(--semantic-ink-muted)', background: 'rgba(255,255,255,0.9)', padding: '2px 6px', borderRadius: '3px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: 'rgba(34,197,94,0.8)', display: 'inline-block' }} />
          has aria-label
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '9px', color: 'var(--semantic-ink-muted)', background: 'rgba(255,255,255,0.9)', padding: '2px 6px', borderRadius: '3px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: 'rgba(234,179,8,0.8)', display: 'inline-block' }} />
          missing
        </span>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function DemoCanvas({ demo, cardIndex = 0 }: DemoCanvasProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  // Ref for the chart canvas region — focus moves here after variant/surface switch
  // so keyboard users land on updated content (not left on toggle button).
  const contentRegionRef = useRef<HTMLDivElement>(null);
  const { setActiveDemo } = useDemoActive();
  const { a11yOverlay } = useA11yOverlay();

  const [activeVariantId, setActiveVariantId] = useState<string>(
    demo.variants?.[0]?.id ?? ''
  );
  const [activeSurface, setActiveSurface] = useState<DemoSurface>('light');

  // Focus-shift: move focus to content region after variant change.
  // tabIndex={-1} on contentRegionRef div makes it programmatically focusable
  // without entering natural tab order. preventScroll avoids jarring scroll jump.
  const handleVariantChange = useCallback((id: string) => {
    setActiveVariantId(id);
    // Defer to next tick so React has committed the new variant render
    requestAnimationFrame(() => {
      contentRegionRef.current?.focus({ preventScroll: true });
    });
  }, []);

  // Focus-shift: move focus to content region after surface change.
  const handleSurfaceChange = useCallback((surface: DemoSurface) => {
    setActiveSurface(surface);
    setSideBySideState(false);
    requestAnimationFrame(() => {
      contentRegionRef.current?.focus({ preventScroll: true });
    });
  }, []);

  const handleSideBySideToggle = useCallback(() => {
    setSideBySideState(prev => !prev);
    requestAnimationFrame(() => {
      contentRegionRef.current?.focus({ preventScroll: true });
    });
  }, []);

  // Intersection observer: set active demo when section enters viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActiveDemo(demo); },
      { threshold: 0.15, rootMargin: '-56px 0px 0px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [demo, setActiveDemo]);

  // Merge defaultProps + active variant props
  const mergedProps = useMemo(() => {
    const variantProps = demo.variants?.find(v => v.id === activeVariantId)?.props ?? {};
    return { ...demo.defaultProps, ...variantProps };
  }, [demo.defaultProps, demo.variants, activeVariantId]);

  const [sideBySide, setSideBySideState] = useState(false);
  const isDarkSurface = activeSurface === 'dark' && !sideBySide;
  const hasSurfaces = (demo.surfaces?.length ?? 0) > 1;
  const hasVariants = (demo.variants?.length ?? 0) > 0;
  const chartFigureProps = getChartFigureProps(demo, mergedProps);

  // Resolve dynamic component or static component
  const DynComponent = DYNAMIC_MAP[demo.name] ?? null;
  const isTable = demo.category === 'table';

  // TableShell demo — special multi-variant render
  const isTableShellDemo = demo.name === 'TableShell';

  // ─── Dev-time DYNAMIC_MAP completeness assertion ───────────────────────────
  // Warns if any chart/table demo has no DYNAMIC_MAP entry AND no static Component.
  // Catches silently-blank canvases when registry grows without DYNAMIC_MAP update.
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') return;
    const missing = DEMOS
      .filter(d => (d.category === 'chart' || d.category === 'table') && !d.isPrimitive)
      .filter(d => !DYNAMIC_MAP[d.name])
      .map(d => d.name);
    if (missing.length > 0) {
      console.warn(`[charts-showcase] DYNAMIC_MAP missing entries: ${missing.join(', ')}`);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount

  // Card-level bg alternation — 3-pane showcase pattern (NOT full-page section alternation).
  // Even cards = white · odd = warm wash rgba(245,242,241,0.6).
  const cardBg = cardIndex % 2 === 0
    ? 'rgba(255,255,255,1)'
    : 'rgba(245,242,241,0.6)';

  return (
    <section
      id={demo.id}
      ref={sectionRef}
      aria-labelledby={`demo-title-${demo.id}`}
      style={{
        marginBottom: '48px',
        scrollMarginTop: '72px',
        background: cardBg,
        borderRadius: '8px',
        padding: '24px',
        border: '1px solid rgba(0,0,0,0.05)',
      }}
    >
      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="mb-4">
        {/* Category + name row — mb-1 between title and description per spacing spec */}
        <div className="flex items-center gap-3 flex-wrap mb-1">
          <span
            className="font-body uppercase tracking-[0.1em]"
            style={{
              fontSize: '9px',
              fontWeight: 700,
              background: CATEGORY_COLORS[demo.category],
              color: CATEGORY_TEXT_COLORS[demo.category],
              padding: '3px 8px',
              borderRadius: '3px',
            }}
          >
            {demo.category}
          </span>
          <h3
            id={`demo-title-${demo.id}`}
            className="font-display text-[var(--semantic-ink-strong)]"
            style={{ fontSize: 'clamp(16px, 1.5vw, 20px)', fontWeight: 500, lineHeight: 1.2, letterSpacing: '-0.01em' }}
          >
            {demo.name}
          </h3>
        </div>
        {/* Description — mb-4 per spacing spec (subtitle → controls) */}
        <p
          className="font-body text-[var(--semantic-ink-muted)] mb-4"
          style={{ fontSize: '12px', lineHeight: 1.6, maxWidth: '72ch' }}
        >
          {demo.description}
        </p>
      </div>

      {/* ── Controls — mb-3 (12px) per spacing spec (controls → canvas) ── */}
      {(hasVariants || hasSurfaces) && (
        <div className="flex flex-wrap gap-3 items-center mb-3">
          {hasVariants && demo.variants && (
            <VariantToggle
              variants={demo.variants}
              activeId={activeVariantId}
              onChange={handleVariantChange}
              label="Variant"
            />
          )}
          {hasSurfaces && (
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className="font-body uppercase tracking-[0.1em] text-[var(--semantic-ink-muted)]"
                style={{ fontSize: '10px', fontWeight: 600 }}
              >
                Surface
              </span>
              {(['light', 'dark'] as DemoSurface[]).map((s) => (
                <HitArea key={s}>
                  <Button
                    variant={(activeSurface === s && !sideBySide) ? 'primary' : 'secondary'}
                    size="xs"
                    onClick={() => handleSurfaceChange(s)}
                    ariaLabel={`Preview on ${s} surface`}
                    aria-pressed={activeSurface === s && !sideBySide}
                    pill
                  >
                    {s}
                  </Button>
                </HitArea>
              ))}
              {/* Side-by-side comparison */}
              <HitArea>
                <Button
                  variant={sideBySide ? 'primary' : 'secondary'}
                  size="xs"
                  onClick={handleSideBySideToggle}
                  ariaLabel={sideBySide ? 'Disable side-by-side comparison' : 'Enable side-by-side comparison'}
                  aria-pressed={sideBySide}
                  pill
                >
                  Compare ↔
                </Button>
              </HitArea>
            </div>
          )}
        </div>
      )}

      {/* ── Demo canvas ─────────────────────────────────────────────── */}
      {/*
        contentRegionRef: programmatically focused after variant/surface switch
        so keyboard users land on updated content (not left on toggle button).
        tabIndex={-1}: focusable via JS without entering tab order.
        aria-live="polite": screen reader announces content changes.
      */}
      <div
        ref={contentRegionRef}
        tabIndex={-1}
        role="region"
        aria-live="polite"
        aria-label={`${demo.name} demo canvas — ${activeVariantId || 'default'} variant`}
        style={{ outline: 'none' }}
      >
      {sideBySide && demo.category === 'chart' && DynComponent ? (
        // Side-by-side surface comparison layout
        <div
          ref={canvasRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '12px',
            position: 'relative',
          }}
        >
          {(['light', 'dark'] as DemoSurface[]).map((s) => (
            <div
              key={s}
              // Bible § 5.1: each compare cell owns its own surface attribute + CSS var scope.
              // data-surface drives chart-internal CSS cascade where selector-based overrides apply.
              // CSS vars injected at cell level (NOT outer wrapper) — independent surface adapt.
              data-surface={s}
              data-variant-section={s === 'dark' ? 'cinematic' : undefined}
              style={{
                background: s === 'dark' ? '#0a0a0c' : '#ffffff',
                border: s === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.08)',
                borderRadius: '8px',
                padding: s === 'dark' ? '32px 20px 20px' : '20px',
                position: 'relative',
                // G.5: native scrollbar + form control color-scheme per surface
                colorScheme: s === 'dark' ? 'dark' : 'light',
                // Bible § 5.1: own CSS variable scope per cell — light and dark inject independently.
                // Both sides declared so cascade is self-contained regardless of outer page theme.
                ...(s === 'dark' ? {
                  '--semantic-ink-strong':  'rgba(255, 255, 255, 0.92)',
                  '--semantic-ink-body':    'rgba(255, 255, 255, 0.75)',
                  '--semantic-ink-muted':   'rgba(255, 255, 255, 0.62)',
                  '--semantic-ink-subtle':  'rgba(255, 255, 255, 0.42)',
                  '--semantic-ink-faint':   'rgba(255, 255, 255, 0.25)',
                  '--border-hairline':      'rgba(255, 255, 255, 0.12)',
                  '--border-default':       'rgba(255, 255, 255, 0.18)',
                  '--surface-text':         'rgba(255, 255, 255, 0.92)',
                  '--surface-text-muted':   'rgba(255, 255, 255, 0.65)',
                } as React.CSSProperties : {
                  '--semantic-ink-strong':  'rgba(0, 0, 0, 0.92)',
                  '--semantic-ink-body':    'rgba(0, 0, 0, 0.75)',
                  '--semantic-ink-muted':   'rgba(0, 0, 0, 0.62)',
                  '--semantic-ink-subtle':  'rgba(0, 0, 0, 0.42)',
                  '--semantic-ink-faint':   'rgba(0, 0, 0, 0.18)',
                  '--border-hairline':      'rgba(0, 0, 0, 0.08)',
                  '--border-default':       'rgba(0, 0, 0, 0.18)',
                } as React.CSSProperties),
              }}
            >
              {/* Surface label */}
              <div
                style={{
                  position: 'absolute',
                  top: '8px',
                  left: '12px',
                }}
              >
                <span
                  className="font-body uppercase tracking-[0.08em]"
                  style={{
                    fontSize: '9px',
                    fontWeight: 700,
                    color: s === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.3)',
                  }}
                >
                  {s}
                </span>
              </div>
              {chartFigureProps
                ? (
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  <ChartFigure {...(chartFigureProps as any)} surface={s}>
                    <DynComponent {...mergedProps} surface={s} />
                  </ChartFigure>
                )
                : <DynComponent {...mergedProps} surface={s} />
              }
            </div>
          ))}
          {a11yOverlay && <A11yOverlay demo={demo} containerRef={canvasRef} />}
        </div>
      ) : (
        <div
          ref={canvasRef}
          style={{
            background: isDarkSurface ? '#0a0a0c' : '#ffffff',
            border: isDarkSurface ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.08)',
            borderRadius: '8px',
            padding: isDarkSurface ? '40px 24px' : '24px',
            overflow: 'hidden',
            position: 'relative',
            // G.2: smooth canvas bg transition on surface toggle — no flash
            transition: 'background-color 200ms ease-out, border-color 200ms ease-out, padding 200ms ease-out',
            // G.5: native scrollbar + form control color-scheme to match surface — no flash
            colorScheme: isDarkSurface ? 'dark' : 'light',
            // G.6 A11y fix: re-declare semantic-ink CSS vars for dark surface scope.
            // DemoCanvas dark mode sets data-variant-section="cinematic" but the page
            // html element lacks data-variant="cinematic-dark" (showcase is NOT a full
            // cinematic-dark page). cinematic-dark.css [data-variant="cinematic-dark"]
            // selector never fires — semantic-ink tokens stay at near-black light values.
            // Fix: inline var overrides on the card itself. ChartFigure uses these vars
            // via Tailwind arbitrary-value classes on semantic-ink tokens — cascade resolves.
            // WCAG 2.2 AA: on #0a0a0c bg — on-dark-strong 16.59:1 · on-dark-muted 7.66:1
            ...(isDarkSurface ? {
              '--semantic-ink-strong':  'rgba(255, 255, 255, 0.92)',
              '--semantic-ink-body':    'rgba(255, 255, 255, 0.75)',
              '--semantic-ink-muted':   'rgba(255, 255, 255, 0.62)',
              '--semantic-ink-subtle':  'rgba(255, 255, 255, 0.42)',
              '--semantic-ink-faint':   'rgba(255, 255, 255, 0.25)',
              '--surface-text':         'rgba(255, 255, 255, 0.92)',
              '--surface-text-muted':   'rgba(255, 255, 255, 0.65)',
            } as React.CSSProperties : {}),
          }}
          data-variant-section={isDarkSurface ? 'cinematic' : undefined}
        >
          {/* Primitive demos (ChartFigure, ChartReveal) */}
          {demo.isPrimitive && demo.category !== 'state' && (
            isTableShellDemo
              ? <TableShellAllVariants activeVariantId={activeVariantId} />
              : <PrimitiveCanvas demo={demo} />
          )}

          {/* State demos (ChartSkeleton, TableSkeleton, ChartEmptyState, ErrorState) */}
          {demo.category === 'state' && (
            <demo.Component {...mergedProps} />
          )}

          {/* Chart demos
              G.5: LazyChart wraps below-fold charts (cardIndex ≥ 2) to defer
              Highcharts/D3 render until chart approaches viewport.
              First 2 cards in each category render immediately (above fold).
              BUG-FIX G.12: sparkline uses 120px LazyChart placeholder (not 360px)
              since SVG renders at 80px max height — avoids large empty whitespace. */}
          {demo.category === 'chart' && DynComponent && (
            cardIndex >= 2 ? (
              <LazyChart height={demo.id === 'sparkline-kpi-grid' ? 120 : 360} rootMargin="200px">
                {chartFigureProps
                  ? (
                    <ChartReveal>
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      <ChartFigure {...(chartFigureProps as any)} surface={isDarkSurface ? 'dark' : 'light'}>
                        <DynComponent
                          {...mergedProps}
                          surface={isDarkSurface ? 'dark' : 'light'}
                        />
                      </ChartFigure>
                    </ChartReveal>
                  )
                  : <DynComponent {...mergedProps} surface={isDarkSurface ? 'dark' : 'light'} />
                }
              </LazyChart>
            ) : (
              chartFigureProps
                ? (
                  <ChartReveal>
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    <ChartFigure {...(chartFigureProps as any)} surface={isDarkSurface ? 'dark' : 'light'}>
                      <DynComponent
                        {...mergedProps}
                        surface={isDarkSurface ? 'dark' : 'light'}
                      />
                    </ChartFigure>
                  </ChartReveal>
                )
                : <DynComponent {...mergedProps} surface={isDarkSurface ? 'dark' : 'light'} />
            )
          )}

          {/* Table demos
              G.5: LazyChart wraps below-fold table demos */}
          {isTable && DynComponent && (
            cardIndex >= 2 ? (
              <LazyChart height={300} rootMargin="200px">
                <DynComponent {...mergedProps} />
              </LazyChart>
            ) : (
              <DynComponent {...mergedProps} />
            )
          )}

          {/* A11y overlay */}
          {a11yOverlay && <A11yOverlay demo={demo} containerRef={canvasRef} />}
        </div>
      )}
      </div>{/* /contentRegionRef — focus target for variant/surface switch */}

      {/* ── State demo strip ─────────────────────────────────────────── */}
      {demo.stateDemos && (
        <StateDemo demo={demo} />
      )}

      {/* ── Known issues ──────────────────────────────────────────────── */}
      {demo.knownIssues && (
        <div
          style={{
            marginTop: '12px',
            padding: '10px 14px',
            background: 'rgba(176, 31, 36, 0.06)',
            border: '1px solid rgba(176, 31, 36, 0.15)',
            borderRadius: '5px',
          }}
        >
          <p
            className="font-body"
            style={{ fontSize: '11px', color: 'var(--color-brand-red, #b01f24)', lineHeight: 1.6 }}
          >
            <strong>Known issue:</strong> {demo.knownIssues}
          </p>
        </div>
      )}
    </section>
  );
}

// ─── TableShell multi-variant demo ───────────────────────────────────────────

import { TableShell } from '@kenresearch/design-system/charts';

function TableShellAllVariants({ activeVariantId }: { activeVariantId: string }) {
  const configs: Array<{
    id: string;
    label: string;
    variant: 'card' | 'open';
    headerStyle: 'wash' | 'transparent' | 'inverted';
    density: 'compact' | 'standard' | 'comfortable' | 'spacious';
  }> = [
    { id: 'card-wash', label: 'Card · Wash header', variant: 'card', headerStyle: 'wash', density: 'standard' },
    { id: 'card-inverted', label: 'Card · Inverted header', variant: 'card', headerStyle: 'inverted', density: 'standard' },
    { id: 'open-transparent', label: 'Open · Transparent header', variant: 'open', headerStyle: 'transparent', density: 'compact' },
  ];

  const config = configs.find(c => c.id === activeVariantId) ?? configs[0];

  return (
    <TableShell
      ariaLabel={`TableShell ${config.label} demo`}
      variant={config.variant}
      headerStyle={config.headerStyle}
      density={config.density}
      caption={`TableShell ${config.label} demonstration`}
    >
      <thead>
        <tr>
          {['Column A', 'Column B', 'Column C', 'Column D'].map((h) => (
            <th
              key={h}
              scope="col"
              className="font-body"
              style={{
                textAlign: 'left',
                padding: '10px 14px',
                fontSize: '11px',
                fontWeight: 600,
                whiteSpace: 'nowrap',
              }}
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[1, 2, 3, 4].map((r) => (
          <tr key={r}>
            {['Alpha', 'Beta', 'Gamma', 'Delta'].map((c) => (
              <td
                key={c}
                className="font-body"
                style={{
                  padding: '10px 14px',
                  fontSize: '12px',
                  color: 'var(--semantic-ink-body)',
                }}
              >
                {c} {r}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </TableShell>
  );
}
