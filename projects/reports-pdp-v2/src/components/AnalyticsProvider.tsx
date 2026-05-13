'use client';
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useCallback,
  type ReactNode,
} from 'react';
import type {
  AnalyticsContext as AnalyticsContextType,
  AnalyticsEvent,
  AnalyticsEventType,
} from '@/types/schema';

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// dataLayer push — queues if dataLayer not yet initialised
// ─────────────────────────────────────────────────────────────────────────────
function pushToDataLayer(payload: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(payload);
}

// ─────────────────────────────────────────────────────────────────────────────
// Context shape — { context, dispatch } as per PRD §47 spec
// ─────────────────────────────────────────────────────────────────────────────
interface AnalyticsCtxValue {
  context: AnalyticsContextType;
  dispatch: (event: AnalyticsEvent) => void;
}

const AnalyticsCtx = createContext<AnalyticsCtxValue | null>(null);

interface AnalyticsProviderProps {
  context: AnalyticsContextType;
  children: ReactNode;
}

export function AnalyticsProvider({ context, children }: AnalyticsProviderProps) {
  const fired = useRef(false);

  // ── Stable dispatch — merges defaultProps + event props + event type key ──
  const dispatch = useCallback(
    (event: AnalyticsEvent) => {
      pushToDataLayer({
        event: event.type,
        report_title: context.reportTitle,
        product_code: context.productCode,
        industry: context.industry,
        region: context.region,
        report_type: context.reportType,
        variant: context.variant,
        ...context.defaultProps,
        ...event.props,
      });
    },
    [context],
  );

  // ── Fire product_page_view once on mount (ref guards StrictMode double-invoke) ──
  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    dispatch({ type: 'product_page_view', props: {} });
  }, [dispatch]);

  // ── Scroll-depth observer: fires at 25/50/75/100 — each threshold once ──
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const tripped = new Set<number>();
    const thresholds = [25, 50, 75, 100];

    const onScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const pct = Math.round((window.scrollY / docHeight) * 100);
      thresholds.forEach((t) => {
        if (pct >= t && !tripped.has(t)) {
          tripped.add(t);
          dispatch({ type: 'scroll_depth', props: { scroll_pct: t } });
        }
      });
    };

    let raf = 0;
    const handler = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(onScroll);
    };

    window.addEventListener('scroll', handler, { passive: true });
    return () => {
      window.removeEventListener('scroll', handler);
      cancelAnimationFrame(raf);
    };
  }, [dispatch]);

  return (
    <AnalyticsCtx.Provider value={{ context, dispatch }}>
      {children}
    </AnalyticsCtx.Provider>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// useAnalyticsEvent — primary hook for component-level event dispatch
// Returns stable dispatch fn — takes a full AnalyticsEvent object
// ─────────────────────────────────────────────────────────────────────────────
export function useAnalyticsEvent(): (event: AnalyticsEvent) => void {
  const ctx = useContext(AnalyticsCtx);
  return useCallback(
    (event: AnalyticsEvent) => {
      if (!ctx) {
        if (process.env.NODE_ENV === 'development') {
          console.warn('[AnalyticsProvider] useAnalyticsEvent called outside AnalyticsProvider');
        }
        return;
      }
      ctx.dispatch(event);
    },
    [ctx],
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// useAnalyticsPush — convenience hook with (eventType, props?) call signature
// Mirrors the PRD §47 push() API. Internally wraps dispatch.
// ─────────────────────────────────────────────────────────────────────────────
export function useAnalyticsPush(): (
  event: AnalyticsEventType,
  props?: Record<string, unknown>,
) => void {
  const ctx = useContext(AnalyticsCtx);
  return useCallback(
    (event: AnalyticsEventType, props?: Record<string, unknown>) => {
      if (!ctx) {
        if (process.env.NODE_ENV === 'development') {
          console.warn('[AnalyticsProvider] useAnalyticsPush called outside AnalyticsProvider');
        }
        return;
      }
      ctx.dispatch({ type: event, props: props ?? {} });
    },
    [ctx],
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// useAnalyticsContext — for reading context props (report title, variant, etc.)
// ─────────────────────────────────────────────────────────────────────────────
export function useAnalyticsContext(): AnalyticsContextType | null {
  const ctx = useContext(AnalyticsCtx);
  return ctx?.context ?? null;
}
