'use client';

/**
 * TableShell · base semantic table primitive for all Ken data tables.
 *
 * WHY  · Ref 1 + Ref 2 DOM probes measured consistent table chrome:
 *        periwinkle-tinted header wash · horizontal-only row borders ·
 *        NO vertical grid lines · density variants per table purpose.
 *        Previous design nested <table> inside TableShell's own <table>
 *        → invalid HTML + 3 hydration errors confirmed in showcase console.
 *
 * WHAT · Renders a `<div>` wrapper containing a `<table>`. Children MUST be
 *        `<thead>` + `<tbody>` ONLY — no outer `<table>` wrapper from consumer.
 *        TableShell owns the <table> element. Header bg, sticky, density all
 *        applied internally via CSS custom properties + Tailwind child combinators.
 *
 * BREAKING CHANGE (Sprint B.1 2026-05-25):
 *   BEFORE: <TableShell><table>...</table></TableShell>   → invalid HTML (nested <table>)
 *   AFTER:  <TableShell><thead>...</thead><tbody>...</tbody></TableShell>  → valid HTML
 *   PropertyTable + RankingTable updated to match.
 *
 * WHEN · Wrap ALL Ken data tables.
 *        PropertyTable: variant="card" headerStyle="wash"        density="comfortable"
 *        RankingTable:  variant="card" headerStyle="wash"        density="standard"
 *        Open tables:   variant="open" headerStyle="transparent"
 *
 * WHERE · `design-system/core-v2/src/charts/primitives/TableShell.tsx`
 *         Consumed via `@kenresearch/design-system/charts`.
 *
 * HOW  · ```tsx
 *        <TableShell variant="card" headerStyle="wash" density="comfortable" stickyHeader>
 *          <thead><tr><th scope="col">Name</th>...</tr></thead>
 *          <tbody><tr><td>Value</td></tr></tbody>
 *        </TableShell>
 *        ```
 *
 * Sticky mechanics (pure CSS):
 *   stickyHeader=true → thead th get position:sticky; top:0; z-index:1.
 *   Background is pre-filled (NOT toggled on engage — ref-canonical).
 *   Signal: 2px border-bottom on sticky (vs 1px non-sticky). No shadow.
 *
 * A11y · `<caption>` via caption prop → visually hidden (sr-only).
 *        `ariaLabel` on `<table>` element. Use `<th scope="col|row">` in children.
 *
 * @relatedDoc REF-TABLES-DEEP-MINE-2026-05-25.md (33 tables · canonical table spec)
 * @promotedFrom projects/v1-project/v1-product-page-ver0.4 (new)
 */

import { createContext, useContext, useMemo } from 'react';
import type { ReactNode, CSSProperties } from 'react';
import { cn } from '../../lib/cn';
import { KEN_TABLE, KEN_TABLE_DENSITY } from '../theme/tokens';

// ─── Density context ─────────────────────────────────────────────────────────

/** Row density name → pixel height. */
export type TableDensity = 'compact' | 'standard' | 'comfortable' | 'spacious';

/** Card: Ref 1 bordered rounded card. Open: Ref 2 flush editorial. */
export type TableVariant = 'card' | 'open';

/** wash: periwinkle tint. transparent: border-bottom only. inverted: solid brand periwinkle. */
export type TableHeaderStyle = 'wash' | 'transparent' | 'inverted';

/**
 * TableDensityContext · provides row height (px number) to child rows.
 * HOW · `const rowHeightPx = useTableDensity();` inside child row component.
 */
export const TableDensityContext = createContext<number>(KEN_TABLE_DENSITY.standard);

/** Read the current table row height in px from nearest TableShell ancestor. */
export function useTableDensity(): number {
  return useContext(TableDensityContext);
}

// ─── Props ───────────────────────────────────────────────────────────────────

export interface TableShellProps {
  /**
   * MUST be `<thead>` + `<tbody>` ONLY — NO outer `<table>` wrapper.
   * TableShell renders the `<table>` element internally.
   */
  children: ReactNode;
  /**
   * Card: Ref 1 style — border 1px rgb(208,203,232) + 10px radius + overflow clip.
   * Open: Ref 2 style — no border, no radius, flush editorial.
   * @default 'card'
   */
  variant?: TableVariant;
  /**
   * wash: rgb(248,247,254) periwinkle wash (standard data tables).
   * transparent: no fill + 1px border-bottom only (editorial/qualitative).
   * inverted: rgb(91,79,207) solid brand periwinkle + white text (emphasis/featured).
   * @default 'wash'
   */
  headerStyle?: TableHeaderStyle;
  /**
   * Row density. compact=28px · standard=40px · comfortable=45px · spacious=48px
   * @default 'standard'
   */
  density?: TableDensity;
  /**
   * Sticky thead. Pure CSS position:sticky. 2px border-bottom = sticky signal.
   * Pre-filled background (not toggled on engage) per ref-canonical pattern.
   * Card variant auto-provides scroll parent via overflow:auto.
   * @default false
   */
  stickyHeader?: boolean;
  /**
   * Alternate even-row background wash.
   * @default false
   */
  alternateRows?: boolean;
  /**
   * Horizontal overflow scroll on wrapper.
   * @default true for card · false for open
   */
  scrollX?: boolean;
  /** Additional class names on the outer wrapper div */
  className?: string;
  /** Visually hidden caption for screen readers. */
  caption?: string;
  /** aria-label on the `<table>` element. */
  ariaLabel?: string;
  /**
   * @deprecated Use `headerStyle="wash"` or `headerStyle="transparent"`.
   * Kept for backward compat — ignored when headerStyle is explicitly set.
   */
  headerWash?: boolean;
}

// ─── Helper ───────────────────────────────────────────────────────────────────

function resolveHeaderBg(style: TableHeaderStyle): string {
  switch (style) {
    case 'wash':        return KEN_TABLE.headerWash;      // rgb(248,247,254)
    case 'transparent': return 'transparent';
    case 'inverted':    return KEN_TABLE.headerInverted;  // rgb(91,79,207)
  }
}

// ─── Component ───────────────────────────────────────────────────────────────

export function TableShell({
  children,
  variant = 'card',
  headerStyle,
  density = 'standard',
  stickyHeader = false,
  alternateRows = false,
  scrollX,
  className,
  caption,
  ariaLabel,
  headerWash,
}: TableShellProps) {
  // Resolve headerStyle: explicit prop wins · fall back to legacy headerWash boolean
  const resolvedHeaderStyle: TableHeaderStyle =
    headerStyle ?? (headerWash === false ? 'transparent' : 'wash');

  const effectiveScrollX = scrollX ?? (variant === 'card');
  const rowHeightPx = KEN_TABLE_DENSITY[density];
  const headerBg = resolveHeaderBg(resolvedHeaderStyle);

  // ─── Outer wrapper style ──────────────────────────────────────────────────

  const wrapperStyle = useMemo<CSSProperties>(() => {
    const base: CSSProperties = {
      background: 'transparent',
      margin: '28px 0',
      ['--row-height' as string]: `${rowHeightPx}px`,
    };
    if (variant === 'card') {
      return {
        ...base,
        // Ref 1 canonical: rgb(208,203,232) periwinkle-tinted border · 10px radius
        border: `1px solid ${KEN_TABLE.cardBorder}`,
        borderRadius: '10px',
        overflow: effectiveScrollX ? 'auto' : 'hidden',
      };
    }
    return {
      ...base,
      border: 'none',
      borderRadius: 0,
      overflow: effectiveScrollX ? 'auto' : 'visible',
    };
  }, [variant, effectiveScrollX, rowHeightPx]);

  // ─── Table-level Tailwind classes ─────────────────────────────────────────
  // Dynamic headerBg must go via inline style on thead (not Tailwind arbitrary).
  // Static structural classes use Tailwind child combinator selectors.

  const tableClasses = cn(
    // Cell corner rule (UNIVERSAL): radius=0 on cells · wrapper clips corners
    '[&_td]:rounded-none [&_th]:rounded-none',
    // No vertical grid: border-right/left on cells = 0
    '[&_td]:border-r-0 [&_td]:border-l-0',
    '[&_th]:border-r-0 [&_th]:border-l-0',
    // Horizontal row dividers in tbody (1px hairline)
    '[&_tbody_tr]:border-b [&_tbody_tr]:border-[rgba(0,0,0,0.08)]',
    // Card: last tbody row → no border-bottom (wrapper border closes it)
    variant === 'card' && [
      '[&_tbody_tr:last-child_td]:border-b-0',
      '[&_tbody_tr:last-child_th]:border-b-0',
    ],
    // Open: last tbody row → explicit 1px bottom border (Ref 2 canonical)
    variant === 'open' && [
      '[&_tbody_tr:last-child_td]:border-b',
      '[&_tbody_tr:last-child_td]:border-[rgb(228,226,240)]',
    ],
    // Transparent header: only border-bottom separates header from body
    resolvedHeaderStyle === 'transparent' && [
      '[&_thead_th]:border-b [&_thead_th]:border-[rgb(228,226,240)]',
    ],
    // Inverted header: white text (bg applied via inline style on thead)
    resolvedHeaderStyle === 'inverted' && '[&_thead_th]:text-white',
    // Sticky header: position:sticky + z-index + 2px border-bottom signal
    stickyHeader && [
      '[&_thead_th]:sticky [&_thead_th]:top-0 [&_thead_th]:z-[1]',
      '[&_thead_th]:border-b-2 [&_thead_th]:border-[rgba(0,0,0,0.12)]',
    ],
    // Alternating row wash
    alternateRows && '[&_tbody_tr:nth-child(even)]:bg-[rgb(252,251,255)]',
  );

  // Header bg applied via CSS custom property --ts-th-bg on <table> element.
  // Tailwind v4 arbitrary class `bg-[var(--ts-th-bg,transparent)]` reads it on thead th.
  // This ensures sticky header background is pre-filled (not transparent when sticking).
  const theadThBgClass = headerBg !== 'transparent'
    ? '[&_thead_th]:bg-[var(--ts-th-bg,transparent)]'
    : '';

  return (
    <TableDensityContext.Provider value={rowHeightPx}>
      <div
        className={cn('tableshell', className)}
        style={wrapperStyle}
      >
        <table
          aria-label={ariaLabel}
          style={{
            borderCollapse: 'collapse',
            width: '100%',
            ['--row-height' as string]: `${rowHeightPx}px`,
            // Inject --ts-th-bg at table level so thead th can inherit via var()
            ...(headerBg !== 'transparent' ? { ['--ts-th-bg' as string]: headerBg } : {}),
          }}
          className={cn(tableClasses, theadThBgClass)}
        >
          {caption && <caption className="sr-only">{caption}</caption>}
          {children}
        </table>
      </div>
    </TableDensityContext.Provider>
  );
}

// ─── Note on sticky + header bg ───────────────────────────────────────────────
// stickyHeader=true requires parent overflow:auto (provided by card variant).
// For stickyHeader on open variant: wrap consumer in a fixed-height div w/ overflow:auto.
// The 2px border-bottom on sticky th is THE ref-canonical signal (no shadow, no transition).
// Background is set via --ts-th-bg CSS custom property on <table> element,
// read by thead th via bg-[var(--ts-th-bg)] Tailwind v4 arbitrary class.
// This ensures sticky th background is pre-filled (not transparent when sticking).
// ─────────────────────────────────────────────────────────────────────────────

// Re-export token values for convenience
export { KEN_TABLE, KEN_TABLE_DENSITY };
