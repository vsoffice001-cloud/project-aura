'use client';

/**
 * charts-showcase · Shared context
 *
 * DemoActiveContext: tracks currently active demo (right panel shows its props/code).
 * Set by DemoCanvas on intersection. Read by ShowcaseRightPanel.
 *
 * SearchContext: search query from ShowcaseTopBar down to ShowcaseSidebar + page.
 *
 * ReducedMotionContext: 'system' | 'force-reduced' | 'force-on'. Persists to localStorage.
 * ViewportContext: 'desktop' | 'tablet' | 'mobile'. Controls content pane width cap.
 * A11yOverlayContext: boolean toggle. Reveals aria-label callouts + focus order.
 * CategoryFilterContext: set of visible categories. Persists to localStorage.
 */

import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Demo, DemoCategory } from './demo-registry';

// ─── Demo active context ──────────────────────────────────────────────────────

interface DemoActiveContextValue {
  activeDemo: Demo | null;
  setActiveDemo: (demo: Demo | null) => void;
}

const DemoActiveContext = createContext<DemoActiveContextValue>({
  activeDemo: null,
  setActiveDemo: () => {},
});

export function useDemoActive() {
  return useContext(DemoActiveContext);
}

// ─── Search context ───────────────────────────────────────────────────────────

interface SearchContextValue {
  search: string;
  setSearch: (q: string) => void;
}

const SearchContext = createContext<SearchContextValue>({
  search: '',
  setSearch: () => {},
});

export function useSearch() {
  return useContext(SearchContext);
}

// ─── Sidebar open context (mobile) ───────────────────────────────────────────

interface SidebarContextValue {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const SidebarContext = createContext<SidebarContextValue>({
  sidebarOpen: false,
  setSidebarOpen: () => {},
});

export function useSidebar() {
  return useContext(SidebarContext);
}

// ─── Reduced motion context ───────────────────────────────────────────────────

export type ReducedMotionMode = 'system' | 'force-reduced' | 'force-on';

interface ReducedMotionContextValue {
  motionMode: ReducedMotionMode;
  setMotionMode: (mode: ReducedMotionMode) => void;
}

const ReducedMotionContext = createContext<ReducedMotionContextValue>({
  motionMode: 'system',
  setMotionMode: () => {},
});

export function useReducedMotionMode() {
  return useContext(ReducedMotionContext);
}

// ─── Viewport context ─────────────────────────────────────────────────────────

export type ViewportMode = 'desktop' | 'tablet' | 'mobile';

interface ViewportContextValue {
  viewport: ViewportMode;
  setViewport: (v: ViewportMode) => void;
}

const ViewportContext = createContext<ViewportContextValue>({
  viewport: 'desktop',
  setViewport: () => {},
});

export function useViewport() {
  return useContext(ViewportContext);
}

// ─── A11y overlay context ─────────────────────────────────────────────────────

interface A11yOverlayContextValue {
  a11yOverlay: boolean;
  setA11yOverlay: (v: boolean) => void;
}

const A11yOverlayContext = createContext<A11yOverlayContextValue>({
  a11yOverlay: false,
  setA11yOverlay: () => {},
});

export function useA11yOverlay() {
  return useContext(A11yOverlayContext);
}

// ─── Category filter context ──────────────────────────────────────────────────

const ALL_CATEGORIES: DemoCategory[] = ['primitive', 'chart', 'table', 'state'];

interface CategoryFilterContextValue {
  visibleCategories: Set<DemoCategory>;
  toggleCategory: (cat: DemoCategory) => void;
  resetCategories: () => void;
}

const CategoryFilterContext = createContext<CategoryFilterContextValue>({
  visibleCategories: new Set(ALL_CATEGORIES),
  toggleCategory: () => {},
  resetCategories: () => {},
});

export function useCategoryFilter() {
  return useContext(CategoryFilterContext);
}

// ─── Combined provider ────────────────────────────────────────────────────────

function safeLocalGet(key: string, fallback: string): string {
  try { return localStorage.getItem(key) ?? fallback; } catch { return fallback; }
}
function safeLocalSet(key: string, value: string) {
  try { localStorage.setItem(key, value); } catch { /* noop */ }
}

export function ShowcaseProviders({ children }: { children: ReactNode }) {
  const [activeDemo, setActiveDemoState] = useState<Demo | null>(null);
  const [search, setSearch] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [motionMode, setMotionModeState] = useState<ReducedMotionMode>('system');
  const [viewport, setViewportState] = useState<ViewportMode>('desktop');
  const [a11yOverlay, setA11yOverlay] = useState(false);
  const [visibleCategories, setVisibleCategories] = useState<Set<DemoCategory>>(
    new Set(ALL_CATEGORIES)
  );

  // Hydrate motionMode from localStorage
  useEffect(() => {
    const stored = safeLocalGet('showcase-motion-mode', 'system') as ReducedMotionMode;
    if (['system', 'force-reduced', 'force-on'].includes(stored)) {
      setMotionModeState(stored);
    }
  }, []);

  // Hydrate visibleCategories from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('showcase-visible-cats');
      if (stored) {
        const parsed = JSON.parse(stored) as DemoCategory[];
        setVisibleCategories(new Set(parsed));
      }
    } catch { /* noop */ }
  }, []);

  // Inject reduced-motion override style when force-reduced
  useEffect(() => {
    const id = 'showcase-rm-override';
    let el = document.getElementById(id) as HTMLStyleElement | null;
    if (motionMode === 'force-reduced') {
      if (!el) {
        el = document.createElement('style');
        el.id = id;
        document.head.appendChild(el);
      }
      el.textContent = '* { animation: none !important; transition: none !important; } html { scroll-behavior: auto !important; }';
    } else {
      el?.remove();
    }
  }, [motionMode]);

  const setActiveDemo = useCallback((demo: Demo | null) => {
    setActiveDemoState(demo);
  }, []);

  const setMotionMode = useCallback((mode: ReducedMotionMode) => {
    setMotionModeState(mode);
    safeLocalSet('showcase-motion-mode', mode);
  }, []);

  const setViewport = useCallback((v: ViewportMode) => {
    setViewportState(v);
  }, []);

  const toggleCategory = useCallback((cat: DemoCategory) => {
    setVisibleCategories(prev => {
      const next = new Set(prev);
      if (next.has(cat)) {
        next.delete(cat);
      } else {
        next.add(cat);
      }
      safeLocalSet('showcase-visible-cats', JSON.stringify([...next]));
      return next;
    });
  }, []);

  const resetCategories = useCallback(() => {
    setVisibleCategories(new Set(ALL_CATEGORIES));
    safeLocalSet('showcase-visible-cats', JSON.stringify(ALL_CATEGORIES));
  }, []);

  return (
    <ReducedMotionContext.Provider value={{ motionMode, setMotionMode }}>
      <ViewportContext.Provider value={{ viewport, setViewport }}>
        <A11yOverlayContext.Provider value={{ a11yOverlay, setA11yOverlay }}>
          <CategoryFilterContext.Provider value={{ visibleCategories, toggleCategory, resetCategories }}>
            <SearchContext.Provider value={{ search, setSearch }}>
              <SidebarContext.Provider value={{ sidebarOpen, setSidebarOpen }}>
                <DemoActiveContext.Provider value={{ activeDemo, setActiveDemo }}>
                  {children}
                </DemoActiveContext.Provider>
              </SidebarContext.Provider>
            </SearchContext.Provider>
          </CategoryFilterContext.Provider>
        </A11yOverlayContext.Provider>
      </ViewportContext.Provider>
    </ReducedMotionContext.Provider>
  );
}
