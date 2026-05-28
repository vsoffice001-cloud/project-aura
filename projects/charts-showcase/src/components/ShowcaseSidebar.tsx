'use client';

/**
 * ShowcaseSidebar · TOC with category groups + active highlight + hash sync.
 *
 * Groups demos by category (primitive · chart · table · state).
 * Per-demo: anchor link <a href="#demo-id"> scrolls-into-view + focuses target.
 * Active demo: periwinkle wash bg + brand-red 3px left border.
 * IntersectionObserver driven (set by DemoCanvas) via DemoActiveContext.
 * Hash sync: update URL on click · read URL hash on mount + scroll to anchor.
 * Search filter from context.
 *
 * A11y · Anchor click scrolls AND focuses target section so keyboard users land
 *        in the right place (not left on sidebar link). Respects prefers-reduced-motion.
 *
 * @module charts-showcase/components/ShowcaseSidebar
 */

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import type { Demo, DemoCategory } from '@/lib/demo-registry';
import { CATEGORY_META, CATEGORY_ORDER } from '@/lib/demo-registry';
import { useDemoActive, useSearch, useSidebar, useCategoryFilter } from '@/lib/context';
import { Button } from '@kenresearch/design-system/atoms';
import { HitArea } from './HitArea';
import { X } from 'lucide-react';

// ─── Category header ──────────────────────────────────────────────────────────

function CategoryHeader({ label, count }: { label: string; count: number }) {
  return (
    <h3
      className="flex items-center justify-between font-body uppercase tracking-[0.12em] text-[var(--semantic-ink-muted)]"
      style={{
        padding: '10px 16px 6px',
        marginTop: '8px',
        fontSize: '9px',
        fontWeight: 700,
      }}
    >
      <span>{label}</span>
      <span
        className="font-body text-[var(--semantic-ink-muted)]"
        style={{ fontSize: '10px', fontWeight: 400 }}
      >
        {count}
      </span>
    </h3>
  );
}

// ─── Demo link ────────────────────────────────────────────────────────────────

function DemoLink({
  demo,
  isActive,
  onClick,
}: {
  demo: Demo;
  isActive: boolean;
  onClick: () => void;
}) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Scroll active link into view in sidebar
  useEffect(() => {
    if (isActive && linkRef.current) {
      linkRef.current.scrollIntoView({
        block: 'nearest',
        behavior: prefersReducedMotion ? 'instant' : 'smooth',
      });
    }
  }, [isActive, prefersReducedMotion]);

  return (
    <a
      ref={linkRef}
      href={`#${demo.id}`}
      onClick={(e) => {
        e.preventDefault();
        const target = document.getElementById(demo.id);
        if (target) {
          // Scroll to target with reduced-motion respect
          target.scrollIntoView({
            behavior: prefersReducedMotion ? 'instant' : 'smooth',
            block: 'start',
          });
          history.replaceState(null, '', `#${demo.id}`);
          // Move keyboard focus to target section so SR users land in content.
          // tabindex="-1" added transiently — target already has scrollMarginTop
          // and aria-labelledby from DemoCanvas, so focus is meaningful.
          if (!target.hasAttribute('tabindex')) {
            target.setAttribute('tabindex', '-1');
          }
          target.focus({ preventScroll: true });
        }
        onClick();
      }}
      aria-current={isActive ? 'location' : undefined}
      className="block font-body"
      style={{
        padding: '6px 16px 6px 14px',  /* py-1.5 per spacing spec */
        fontSize: '12px',
        lineHeight: 1.35,
        color: isActive ? 'rgb(91, 79, 207)' : 'var(--semantic-ink-body)',
        background: isActive ? 'rgba(148, 136, 236, 0.1)' : 'transparent',
        borderLeft: isActive ? '3px solid var(--color-brand-red, #b01f24)' : '3px solid transparent',
        fontWeight: isActive ? 600 : 400,
        textDecoration: 'none',
        transition: 'all 0.15s',
        display: 'block',
      }}
    >
      {demo.name}
    </a>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

interface ShowcaseSidebarProps {
  demos: Demo[];
  allDemos: Demo[];
}

// ─── Category filter section ──────────────────────────────────────────────────

function CategoryFilter() {
  const { visibleCategories, toggleCategory, resetCategories } = useCategoryFilter();
  const allChecked = CATEGORY_ORDER.every(c => visibleCategories.has(c));

  return (
    <div style={{ borderTop: '1px solid rgba(0,0,0,0.06)', marginTop: '8px', paddingTop: '8px' }}>
      <div
        className="flex items-center justify-between"
        style={{ padding: '10px 16px 8px' }}
      >
        <span
          className="font-body uppercase tracking-[0.12em] text-[var(--semantic-ink-muted)]"
          style={{ fontSize: '9px', fontWeight: 700 }}
        >
          Filter
        </span>
        {!allChecked && (
          <Button
            variant="ghost"
            size="xs"
            onClick={resetCategories}
            ariaLabel="Reset category filters"
          >
            Reset
          </Button>
        )}
      </div>
      <div style={{ padding: '0 16px 12px' }}>
        {CATEGORY_ORDER.map((cat) => {
          const meta = CATEGORY_META[cat];
          const checked = visibleCategories.has(cat);
          return (
            <label
              key={cat}
              className="flex items-center gap-2 font-body"
              style={{
                fontSize: '12px',
                color: 'var(--semantic-ink-body)',
                cursor: 'pointer',
                padding: '4px 0',
                userSelect: 'none',
              }}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggleCategory(cat as DemoCategory)}
                aria-label={`Show ${meta.label} demos`}
                style={{
                  accentColor: 'rgb(91,79,207)',
                  width: '13px',
                  height: '13px',
                  flexShrink: 0,
                }}
              />
              {meta.label}
            </label>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export function ShowcaseSidebar({ demos, allDemos }: ShowcaseSidebarProps) {
  const { activeDemo, setActiveDemo } = useDemoActive();
  const { search } = useSearch();
  const { sidebarOpen, setSidebarOpen } = useSidebar();
  const drawerRef = useRef<HTMLElement>(null);

  // On mount: read URL hash → scroll to that demo
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      const el = document.getElementById(hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
        const found = allDemos.find(d => d.id === hash);
        if (found) setActiveDemo(found);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Focus trap: when mobile drawer opens, trap keyboard focus inside
  useEffect(() => {
    if (!sidebarOpen) return;
    const drawer = drawerRef.current;
    if (!drawer) return;

    const focusable = drawer.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;

    // Focus first focusable element
    (focusable[0] as HTMLElement).focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSidebarOpen(false);
        return;
      }
      if (e.key !== 'Tab') return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        (last as HTMLElement).focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        (first as HTMLElement).focus();
      }
    };

    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [sidebarOpen, setSidebarOpen]);

  // Group filtered demos by category
  const grouped = CATEGORY_ORDER.map(cat => ({
    cat,
    meta: CATEGORY_META[cat],
    demos: demos.filter(d => d.category === cat),
  })).filter(g => g.demos.length > 0);

  const sidebarContent = (
    <nav
      aria-label="Chart library navigation"
      style={{
        width: '100%',
        paddingTop: '8px',
        paddingBottom: '24px',
        overflowY: 'auto',
        height: '100%',
      }}
    >
      {/* Library label */}
      <div
        style={{ padding: '12px 16px 4px' }}
      >
        <p
          className="font-body uppercase tracking-[0.12em] text-[var(--semantic-ink-muted)]"
          style={{ fontSize: '9px', fontWeight: 700 }}
        >
          @kenresearch/design-system
        </p>
        <p
          className="font-body text-[var(--semantic-ink-muted)]"
          style={{ fontSize: '10px' }}
        >
          charts barrel · v0.1.0
        </p>
      </div>

      <div style={{ height: '1px', background: 'rgba(0,0,0,0.06)', margin: '8px 16px' }} />

      {/* Search result count */}
      {search && (
        <div style={{ padding: '6px 16px' }}>
          <p
            className="font-body text-[var(--semantic-ink-muted)]"
            style={{ fontSize: '10px' }}
          >
            {demos.length} result{demos.length !== 1 ? 's' : ''} for &ldquo;{search}&rdquo;
          </p>
        </div>
      )}

      {demos.length === 0 && (
        <div style={{ padding: '16px' }}>
          <p
            className="font-body italic text-[var(--semantic-ink-muted)]"
            style={{ fontSize: '12px' }}
          >
            No demos match search.
          </p>
        </div>
      )}

      {/* Category groups */}
      {grouped.map(({ cat, meta, demos: catDemos }) => (
        <div key={cat}>
          <CategoryHeader label={meta.label} count={catDemos.length} />
          {catDemos.map(demo => (
            <DemoLink
              key={demo.id}
              demo={demo}
              isActive={activeDemo?.id === demo.id}
              onClick={() => setSidebarOpen(false)}
            />
          ))}
        </div>
      ))}

      {/* Filter section */}
      <CategoryFilter />
    </nav>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        aria-label="Sidebar navigation"
        style={{
          gridColumn: '1',
          gridRow: '2',
          position: 'sticky',
          top: '56px',
          height: 'calc(100vh - 56px)',
          overflowY: 'auto',
          borderRight: '1px solid rgba(0,0,0,0.06)',
          background: 'var(--semantic-bg-page, #f5f2f1)',
        }}
        className="md:block"
        id="showcase-sidebar-desktop"
      >
        {sidebarContent}
      </aside>

      {/* Mobile drawer overlay */}
      {sidebarOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            display: 'flex',
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation drawer"
        >
          {/* Backdrop */}
          <div
            style={{ flex: 1, background: 'rgba(0,0,0,0.4)' }}
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer */}
          <aside
            ref={drawerRef}
            style={{
              width: '280px',
              background: 'var(--semantic-bg-page, #f5f2f1)',
              height: '100%',
              overflowY: 'auto',
              boxShadow: '4px 0 24px rgba(0,0,0,0.12)',
              order: -1,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px',
                borderBottom: '1px solid rgba(0,0,0,0.06)',
              }}
            >
              <span
                className="font-body font-medium text-[var(--semantic-ink-strong)]"
                style={{ fontSize: '13px' }}
              >
                Navigation
              </span>
              <HitArea>
                <Button
                  variant="ghost"
                  size="xs"
                  iconOnly
                  icon={<X size={16} aria-hidden="true" />}
                  onClick={() => setSidebarOpen(false)}
                  ariaLabel="Close navigation"
                />
              </HitArea>
            </div>
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {sidebarContent}
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
