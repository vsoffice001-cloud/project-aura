'use client';

/**
 * ShowcaseTopBar · Sticky top bar · Sprint B.3.
 *
 * Left: Ken Research logo text · "Chart Library Showcase"
 * Center: Search input (filters demos by name/category) · `/` shortcut to focus
 * Right: Viewport switcher · A11y overlay toggle · Reduced-motion toggle
 *
 * Sticky · backdrop-blur 8px · bg rgba(245,242,241,0.92)
 * 56px height · border-bottom hairline
 *
 * @module charts-showcase/components/ShowcaseTopBar
 */

import { useRef, useEffect, useCallback } from 'react';
import { useSearch, useSidebar, useViewport, useA11yOverlay, useReducedMotionMode } from '@/lib/context';
import type { ViewportMode, ReducedMotionMode } from '@/lib/context';
import { Button } from '@kenresearch/design-system/atoms';
import { HitArea } from './HitArea';
import { Search, Menu, X, Monitor, Tablet, Smartphone, Eye, EyeOff, Accessibility } from 'lucide-react';
import { DEMOS } from '@/lib/demo-registry';

// ─── Viewport dimensions map ─────────────────────────────────────────────────

const VIEWPORT_MAP: Record<ViewportMode, { label: string; width: number | null; Icon: React.ElementType }> = {
  desktop: { label: '1440', width: null, Icon: Monitor },
  tablet:  { label: '1024', width: 1024,  Icon: Tablet },
  mobile:  { label: '390',  width: 390,   Icon: Smartphone },
};

// ─── Reduced motion mode cycle ────────────────────────────────────────────────

const MOTION_CYCLE: ReducedMotionMode[] = ['system', 'force-reduced', 'force-on'];
const MOTION_LABELS: Record<ReducedMotionMode, string> = {
  'system': 'Motion: system',
  'force-reduced': 'Motion: off',
  'force-on': 'Motion: on',
};
const MOTION_ARIA: Record<ReducedMotionMode, string> = {
  'system': 'Toggle reduced motion — currently using system preference',
  'force-reduced': 'Toggle reduced motion — currently forced off (all animation disabled)',
  'force-on': 'Toggle reduced motion — currently forced on (animation enabled regardless of system)',
};

// ─── Icon button wrapper — DS Button ghost/secondary variant ─────────────────
// Uses DS Button for a11y + DS hover state + shimmer. active=true → secondary, false → ghost.

function IconBtn({
  onClick,
  ariaLabel,
  ariaPressed,
  active,
  children,
}: {
  onClick: () => void;
  ariaLabel: string;
  ariaPressed?: boolean;
  active?: boolean;
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <HitArea>
      <Button
        variant={active ? 'secondary' : 'ghost'}
        size="xs"
        onClick={onClick}
        ariaLabel={ariaLabel}
        aria-pressed={ariaPressed}
      >
        {children}
      </Button>
    </HitArea>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export function ShowcaseTopBar() {
  const { search, setSearch } = useSearch();
  const { sidebarOpen, setSidebarOpen } = useSidebar();
  const { viewport, setViewport } = useViewport();
  const { a11yOverlay, setA11yOverlay } = useA11yOverlay();
  const { motionMode, setMotionMode } = useReducedMotionMode();
  const searchRef = useRef<HTMLInputElement>(null);

  // `/` key focuses search input — classic Storybook/Linear pattern
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (
      e.key === '/' &&
      !(e.target instanceof HTMLInputElement) &&
      !(e.target instanceof HTMLTextAreaElement)
    ) {
      e.preventDefault();
      searchRef.current?.focus();
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Cycle reduced-motion mode
  const cycleMotionMode = () => {
    const idx = MOTION_CYCLE.indexOf(motionMode);
    const next = MOTION_CYCLE[(idx + 1) % MOTION_CYCLE.length];
    setMotionMode(next);
  };

  const currentViewportWidth = VIEWPORT_MAP[viewport].width;

  return (
    <header
      style={{
        gridColumn: '1 / -1',
        gridRow: '1',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        height: '56px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '0 16px',
        background: 'rgba(245, 242, 241, 0.92)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        borderBottom: '1px solid rgba(0,0,0,0.08)',
      }}
    >
      {/* Left: hamburger (mobile) + identity */}
      <div className="flex items-center gap-3 flex-none" style={{ minWidth: 0 }}>
        {/* Mobile hamburger */}
        <div className="md:hidden">
          <HitArea>
            <Button
              variant="ghost"
              size="xs"
              iconOnly
              icon={sidebarOpen
                ? <X size={16} aria-hidden="true" />
                : <Menu size={16} aria-hidden="true" />
              }
              onClick={() => setSidebarOpen(!sidebarOpen)}
              ariaLabel={sidebarOpen ? 'Close navigation' : 'Open navigation'}
            />
          </HitArea>
        </div>

        {/* Logo mark */}
        <div className="flex items-baseline gap-2">
          <span
            className="font-display font-light text-[var(--semantic-ink-strong)]"
            style={{ fontSize: '14px', letterSpacing: '-0.01em', lineHeight: 1 }}
          >
            Ken Research
          </span>
          <span
            className="font-body text-[var(--semantic-ink-subtle)]"
            style={{ fontSize: '10px', fontWeight: 500 }}
          >
            /
          </span>
          <span
            className="font-body text-[var(--semantic-ink-muted)] hidden sm:inline"
            style={{ fontSize: '11px' }}
          >
            Chart Library
          </span>
          <span
            className="font-body font-medium rounded-full hidden sm:inline"
            style={{
              fontSize: '9px',
              background: 'rgba(148, 136, 236, 0.12)',
              color: 'rgb(91, 79, 207)',
              padding: '2px 6px',
              letterSpacing: '0.04em',
            }}
          >
            v0.1.0
          </span>
        </div>
      </div>

      {/* Center: search + shortcut hint */}
      <div className="flex items-center gap-2 flex-1" style={{ maxWidth: '360px', margin: '0 auto' }}>
        <div
          className="flex items-center gap-2 w-full"
          style={{
            background: 'rgba(255,255,255,0.8)',
            border: '1px solid rgba(0,0,0,0.1)',
            borderRadius: '6px',
            padding: '0 10px',
            height: '34px',
          }}
        >
          <Search
            size={13}
            aria-hidden="true"
            style={{ color: 'var(--semantic-ink-subtle)', flexShrink: 0 }}
          />
          <input
            ref={searchRef}
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search components… ( / )"
            aria-label="Search chart components"
            className="font-body"
            style={{
              flex: 1,
              border: 'none',
              background: 'transparent',
              outline: 'none',
              fontSize: '12px',
              color: 'var(--semantic-ink-strong)',
              lineHeight: 1,
            }}
          />
          {search ? (
            <Button
              variant="ghost"
              size="xs"
              iconOnly
              icon={<X size={11} aria-hidden="true" />}
              onClick={() => setSearch('')}
              ariaLabel="Clear search"
            />
          ) : null}
        </div>
      </div>

      {/* Right: viewport switcher · a11y toggle · motion toggle · demo count */}
      <div className="flex items-center gap-2 flex-none ml-auto">

        {/* Demo count */}
        {search ? (
          <span
            className="font-body text-[var(--semantic-ink-subtle)] hidden md:block"
            style={{ fontSize: '10px', whiteSpace: 'nowrap' }}
          >
            {DEMOS.filter(d =>
              d.name.toLowerCase().includes(search.toLowerCase()) ||
              d.category.toLowerCase().includes(search.toLowerCase()) ||
              d.description.toLowerCase().includes(search.toLowerCase())
            ).length} demos
          </span>
        ) : (
          <span
            className="font-body text-[var(--semantic-ink-subtle)] hidden md:block"
            style={{ fontSize: '10px', whiteSpace: 'nowrap' }}
          >
            {DEMOS.length} demos
          </span>
        )}

        {/* Separator */}
        <div className="hidden sm:block" style={{ width: '1px', height: '20px', background: 'rgba(0,0,0,0.1)' }} />

        {/* Viewport switcher — desktop only */}
        <div className="hidden sm:flex items-center gap-1">
          {(['desktop', 'tablet', 'mobile'] as ViewportMode[]).map((v) => {
            const { label, Icon } = VIEWPORT_MAP[v];
            const active = viewport === v;
            return (
              <IconBtn
                key={v}
                onClick={() => setViewport(v)}
                ariaLabel={`Preview at ${label}px viewport`}
                ariaPressed={active}
                active={active}
                title={`${label}px`}
              >
                <Icon size={13} aria-hidden="true" />
                <span
                  className="font-body hidden lg:inline"
                  style={{ fontSize: '10px', fontWeight: 600 }}
                >
                  {label}
                </span>
              </IconBtn>
            );
          })}
        </div>

        {/* Separator */}
        <div className="hidden sm:block" style={{ width: '1px', height: '20px', background: 'rgba(0,0,0,0.1)' }} />

        {/* A11y overlay toggle */}
        <IconBtn
          onClick={() => setA11yOverlay(!a11yOverlay)}
          ariaLabel={a11yOverlay ? 'Hide a11y overlay' : 'Show a11y overlay — reveals aria labels and focus order'}
          ariaPressed={a11yOverlay}
          active={a11yOverlay}
          title="A11y overlay"
        >
          {a11yOverlay ? <Eye size={13} aria-hidden="true" /> : <EyeOff size={13} aria-hidden="true" />}
          <span className="font-body hidden lg:inline" style={{ fontSize: '10px', fontWeight: 600 }}>
            A11y
          </span>
        </IconBtn>

        {/* Reduced motion toggle */}
        <IconBtn
          onClick={cycleMotionMode}
          ariaLabel={MOTION_ARIA[motionMode]}
          ariaPressed={motionMode !== 'system'}
          active={motionMode !== 'system'}
          title={MOTION_LABELS[motionMode]}
        >
          <Accessibility size={13} aria-hidden="true" />
          <span className="font-body hidden lg:inline" style={{ fontSize: '10px', fontWeight: 600 }}>
            {motionMode === 'system' ? 'System' : motionMode === 'force-reduced' ? 'Off' : 'On'}
          </span>
        </IconBtn>

        {/* Viewport width display when not desktop */}
        {currentViewportWidth && (
          <span
            className="font-body text-[var(--semantic-ink-subtle)] hidden sm:block"
            style={{
              fontSize: '9px',
              fontWeight: 600,
              fontFamily: 'ui-monospace, monospace',
              background: 'rgba(91,79,207,0.08)',
              color: 'rgb(91,79,207)',
              padding: '2px 6px',
              borderRadius: '3px',
            }}
          >
            {currentViewportWidth}px
          </span>
        )}
      </div>
    </header>
  );
}
