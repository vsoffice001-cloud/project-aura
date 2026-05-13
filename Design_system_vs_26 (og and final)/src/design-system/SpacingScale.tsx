/**
 * SpacingScale Component
 * 
 * Visualizes the spacing scale system (4px base unit).
 * Helps designers and developers understand spacing consistency.
 */

import React from 'react';
import { spacing } from './tokens';

export interface SpacingScaleItemProps {
  /** Spacing key (e.g., 4, 6, 8) */
  scale: keyof typeof spacing.px;
  /** Show size in pixels */
  showPx?: boolean;
  /** Show size in rem */
  showRem?: boolean;
  /** Show Tailwind class */
  showTailwind?: boolean;
}

/**
 * SpacingScaleItem - Single spacing visualization
 */
export function SpacingScaleItem({
  scale,
  showPx = true,
  showRem = true,
  showTailwind = false,
}: SpacingScaleItemProps) {
  const pxValue = spacing.px[scale];
  const remValue = spacing.rem[scale];

  return (
    <div className="flex items-center gap-4">
      <div 
        className="h-8 bg-black"
        style={{ width: `${pxValue}px` }}
        aria-label={`Spacing: ${pxValue}px`}
      />
      <div className="flex gap-4 text-sm">
        {showRem && (
          <span className="font-mono w-20 text-black">{remValue}</span>
        )}
        {showPx && (
          <span className="text-black/60">{pxValue}px</span>
        )}
        {showTailwind && (
          <span className="text-black/40 font-mono">
            gap-{scale}, p-{scale}
          </span>
        )}
      </div>
    </div>
  );
}

/**
 * SpacingScale - Full spacing scale visualization
 */
export interface SpacingScaleProps {
  /** Show specific scales or all */
  scales?: (keyof typeof spacing.px)[];
  /** Show pixels */
  showPx?: boolean;
  /** Show rem values */
  showRem?: boolean;
  /** Show Tailwind utility classes */
  showTailwind?: boolean;
}

export function SpacingScale({
  scales,
  showPx = true,
  showRem = true,
  showTailwind = false,
}: SpacingScaleProps) {
  const defaultScales: (keyof typeof spacing.px)[] = [1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20];
  const displayScales = scales || defaultScales;

  return (
    <div className="space-y-4">
      {displayScales.map((scale) => (
        <SpacingScaleItem
          key={scale}
          scale={scale}
          showPx={showPx}
          showRem={showRem}
          showTailwind={showTailwind}
        />
      ))}
    </div>
  );
}

/**
 * SpacingExample - Shows spacing in a real component context
 */
export interface SpacingExampleProps {
  /** Spacing scale to demonstrate */
  gap: keyof typeof spacing.px;
  /** Type of layout */
  layout?: 'vertical' | 'horizontal' | 'grid';
  /** Number of items */
  itemCount?: number;
}

export function SpacingExample({
  gap,
  layout = 'horizontal',
  itemCount = 3,
}: SpacingExampleProps) {
  const gapValue = spacing.rem[gap];

  const layoutClasses = {
    vertical: 'flex flex-col',
    horizontal: 'flex',
    grid: 'grid grid-cols-3',
  };

  return (
    <div className="bg-black/5 rounded-[5px] p-6">
      <div className="mb-3 text-xs text-black/60">
        Gap: {spacing.px[gap]}px ({gapValue}) • Layout: {layout}
      </div>
      <div 
        className={layoutClasses[layout]}
        style={{ gap: gapValue }}
      >
        {Array.from({ length: itemCount }).map((_, i) => (
          <div
            key={i}
            className="bg-black/20 rounded-[5px] p-4 flex items-center justify-center"
            style={{ minWidth: layout === 'horizontal' ? '80px' : undefined }}
          >
            <span className="text-sm font-bold text-black/60">{i + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * SpacingComparison - Compare two different spacing values
 */
export interface SpacingComparisonProps {
  gap1: keyof typeof spacing.px;
  gap2: keyof typeof spacing.px;
}

export function SpacingComparison({
  gap1,
  gap2,
}: SpacingComparisonProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <SpacingExample gap={gap1} itemCount={3} />
      <SpacingExample gap={gap2} itemCount={3} />
    </div>
  );
}

/**
 * SectionSpacingGuide - Shows recommended section spacing
 */
export function SectionSpacingGuide() {
  return (
    <div className="space-y-6">
      <div className="border-l-4 border-black/20 pl-4">
        <h4 className="text-sm font-bold text-black mb-2">Section Vertical Padding</h4>
        <div className="space-y-2 text-sm text-black/70">
          <div className="flex justify-between">
            <span>Mobile:</span>
            <span className="font-mono">py-16 ({spacing.px[16]}px)</span>
          </div>
          <div className="flex justify-between">
            <span>Desktop:</span>
            <span className="font-mono">py-20 ({spacing.px[20]}px)</span>
          </div>
        </div>
      </div>

      <div className="border-l-4 border-black/20 pl-4">
        <h4 className="text-sm font-bold text-black mb-2">Grid Gaps</h4>
        <div className="space-y-2 text-sm text-black/70">
          <div className="flex justify-between">
            <span>Standard:</span>
            <span className="font-mono">gap-6 ({spacing.px[6]}px)</span>
          </div>
          <div className="flex justify-between">
            <span>Large:</span>
            <span className="font-mono">gap-8 ({spacing.px[8]}px)</span>
          </div>
        </div>
      </div>

      <div className="border-l-4 border-black/20 pl-4">
        <h4 className="text-sm font-bold text-black mb-2">Card Padding</h4>
        <div className="space-y-2 text-sm text-black/70">
          <div className="flex justify-between">
            <span>Small:</span>
            <span className="font-mono">p-6 ({spacing.px[6]}px)</span>
          </div>
          <div className="flex justify-between">
            <span>Medium:</span>
            <span className="font-mono">p-8 ({spacing.px[8]}px)</span>
          </div>
          <div className="flex justify-between">
            <span>Large:</span>
            <span className="font-mono">p-12 ({spacing.px[12]}px)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
