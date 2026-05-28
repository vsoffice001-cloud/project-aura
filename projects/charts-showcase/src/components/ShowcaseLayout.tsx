'use client';

/**
 * ShowcaseLayout · 3-pane shell + context providers · Sprint B.3.
 *
 * Grid:
 *   <md: [240px_1fr] → sidebar hidden (drawer) + content
 *   lg+: [240px_1fr_320px] → sidebar + content + right panel
 *
 * Top bar: 56px sticky row 1, spans all columns.
 * Sidebar: sticky top 56px, max-h calc(100vh-56px).
 * Content: padded, max-width 900px auto. Viewport mode: constrained width.
 * Right panel: sticky top 56px, hidden <lg.
 *
 * @module charts-showcase/components/ShowcaseLayout
 */

import type { ReactNode } from 'react';
import type { Demo } from '@/lib/demo-registry';
import { ShowcaseProviders, useViewport } from '@/lib/context';
import type { ViewportMode } from '@/lib/context';
import { ShowcaseTopBar } from './ShowcaseTopBar';
import { ShowcaseSidebar } from './ShowcaseSidebar';
import { ShowcaseRightPanel } from './ShowcaseRightPanel';

// ─── Viewport widths ──────────────────────────────────────────────────────────

const VIEWPORT_WIDTHS: Record<ViewportMode, number | null> = {
  desktop: null,
  tablet: 1024,
  mobile: 390,
};

// ─── Inner layout reads viewport from context ─────────────────────────────────

interface ShowcaseLayoutProps {
  demos: Demo[];
  allDemos: Demo[];
  children: ReactNode;
}

function LayoutInner({ demos, allDemos, children }: ShowcaseLayoutProps) {
  const { viewport } = useViewport();
  const constrainedWidth = VIEWPORT_WIDTHS[viewport];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateRows: '56px 1fr',
        minHeight: '100vh',
      }}
      className="showcase-grid"
    >
      {/* Skip link — keyboard navigation shortcut · visually hidden until focused */}
      <a
        href="#showcase-main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[200] focus:rounded font-body"
        style={{
          padding: '8px 16px',
          background: 'var(--color-foundation-black, #0a0a0c)',
          color: 'var(--color-foundation-white, #fafafa)',
          textDecoration: 'none',
          fontSize: '13px',
          fontWeight: 500,
        }}
      >
        Skip to main content
      </a>

      {/* Top bar — col 1/-1 row 1 */}
      <ShowcaseTopBar />

      {/* Sidebar — col 1 row 2 · sticky */}
      <ShowcaseSidebar demos={demos} allDemos={allDemos} />

      {/* Content pane — col 2 row 2 */}
      <main
        id="showcase-main-content"
        tabIndex={-1}
        aria-label="Component showcase content"
        style={{
          gridRow: '2',
          padding: 'clamp(20px, 3vw, 40px)',
          // G.6 FIX: overflow-x:hidden moved to inner wrapper below.
          // Setting overflow-x:hidden here forced overflow-y to 'auto' (CSS spec:
          // mixed visible/hidden overflow values are coerced — both become auto).
          // This gave <main> an implicit scroll context, which combined with
          // overscroll-behavior-y:contain blocked iOS scroll-chain to page.
          // overflow-x clipping now lives on the inner constraint wrapper only.
          minWidth: 0,
          outline: 'none',
        }}
        className="showcase-main"
      >
        {/* Viewport constraint wrapper */}
        <div
          style={{
            maxWidth: constrainedWidth ? `${constrainedWidth}px` : '900px',
            margin: '0 auto',
            overflowX: 'hidden', // G.6: moved from <main> — prevents horizontal bleed without scroll-context trap
            ...(constrainedWidth ? {
              border: '1px dashed rgba(91,79,207,0.3)',
              borderRadius: '4px',
              padding: '0',
              outline: 'none',
            } : {}),
          }}
          aria-label={constrainedWidth ? `Viewport preview at ${constrainedWidth}px` : undefined}
        >
          {children}
          {/* Attribution mark · DS-driven · CSS class reads --ds-author-watermark · removable only by editing DS base.css. */}
          <div className="ds-author-mark" aria-label="Project attribution" />
        </div>
      </main>

      {/* Right panel — col 3 row 2 · hidden <lg */}
      <ShowcaseRightPanel />
    </div>
  );
}

export function ShowcaseLayout(props: ShowcaseLayoutProps) {
  return (
    <ShowcaseProviders>
      <LayoutInner {...props} />
    </ShowcaseProviders>
  );
}
