'use client';

/**
 * AsyncFetchDemo · Simulates a real async data fetch for charts.
 *
 * WHY  · Proves ChartSkeleton → loaded → error → retry real-world flow.
 *        Registry-driven — registered as id='state-async-fetch' in demo-registry.
 *
 * WHAT · Renders ChartSkeleton for 1.5s, then resolves to KenColumnChart.
 *        "Refetch" button triggers loading again.
 *        "Simulate error" forces error state → ErrorState with retry CTA.
 *
 * HOW  · useState for: 'idle' | 'loading' | 'loaded' | 'error'.
 *        setTimeout mocks fetch. useReducedMotion honors accessibility.
 *
 * @module charts-showcase/components/AsyncFetchDemo
 */

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { ChartSkeleton, ErrorState, ChartFigure, KEN_CHART_SERIES_ARRAY } from '@kenresearch/design-system/charts';
import { Button } from '@kenresearch/design-system/atoms';

const KenColumnChart = dynamic(
  () => import('@kenresearch/design-system/charts').then(m => m.KenColumnChart),
  { ssr: false }
);

// ─── Mock data ─────────────────────────────────────────────────────────────────

const MOCK_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MOCK_DATA   = [420, 390, 445, 510, 480, 560, 530, 580, 610, 575, 640, 720];

// ─── Types ──────────────────────────────────────────────────────────────────

type FetchState = 'idle' | 'loading' | 'loaded' | 'error';

// ─── Component ───────────────────────────────────────────────────────────────

export function AsyncFetchDemo() {
  const [fetchState, setFetchState] = useState<FetchState>('loading');
  const [forceError, setForceError] = useState(false);

  // Simulate async fetch
  useEffect(() => {
    if (fetchState !== 'loading') return;
    const timer = setTimeout(() => {
      if (forceError) {
        setFetchState('error');
      } else {
        setFetchState('loaded');
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [fetchState, forceError]);

  const handleRefetch = () => {
    setFetchState('loading');
  };

  const handleRetry = () => {
    setForceError(false);
    setFetchState('loading');
  };

  const handleSimulateError = () => {
    setForceError(true);
    setFetchState('loading');
  };

  return (
    <div>
      {/* Controls */}
      <div
        className="flex flex-wrap items-center gap-3"
        style={{ marginBottom: '16px' }}
      >
        <span
          className="font-body uppercase tracking-[0.1em] text-[var(--semantic-ink-subtle)]"
          style={{ fontSize: '9px', fontWeight: 700 }}
        >
          Async demo
        </span>

        {/* State badge */}
        <span
          className="font-body"
          style={{
            fontSize: '10px',
            fontWeight: 600,
            fontFamily: 'ui-monospace, monospace',
            padding: '2px 8px',
            borderRadius: '4px',
            background: fetchState === 'loaded'
              ? 'rgba(34,197,94,0.1)'
              : fetchState === 'error'
                ? 'rgba(176,31,36,0.1)'
                : 'rgba(148,136,236,0.1)',
            color: fetchState === 'loaded'
              ? 'rgb(22,101,52)'
              : fetchState === 'error'
                ? 'var(--color-brand-red,#b01f24)'
                : 'rgb(91,79,207)',
          }}
        >
          {fetchState}
        </span>

        {/* Refetch */}
        <Button
          variant="secondary"
          size="xs"
          onClick={handleRefetch}
          disabled={fetchState === 'loading'}
          aria-label="Refetch chart data"
        >
          Refetch
        </Button>

        {/* Simulate error */}
        <Button
          variant="secondary"
          size="xs"
          onClick={handleSimulateError}
          disabled={fetchState === 'loading'}
          aria-label="Simulate fetch error"
        >
          Simulate error
        </Button>
      </div>

      {/* Chart canvas */}
      <div
        style={{
          background: '#ffffff',
          border: '1px solid rgba(0,0,0,0.08)',
          borderRadius: '8px',
          padding: '24px',
          minHeight: '320px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {fetchState === 'loading' && (
          <ChartSkeleton type="bar" height={280} />
        )}

        {fetchState === 'loaded' && (
          <ChartFigure
            eyebrow="MONTHLY REVENUE · LIVE ASYNC"
            title="Revenue by month · AUD Mn"
            unit="AUD Mn"
            insight="Async fetch resolved — real data rendered. Skeleton replaced seamlessly."
            legend={[{ kind: 'solid', color: KEN_CHART_SERIES_ARRAY[0], label: 'Monthly revenue' }]}
          >
            <KenColumnChart
              labels={MOCK_LABELS}
              data={MOCK_DATA}
              height={280}
              unit="AUD Mn"
              ariaLabel="Async-loaded monthly revenue column chart"
            />
          </ChartFigure>
        )}

        {fetchState === 'error' && (
          <ErrorState
            title="Failed to load"
            message="Simulated network error. Click retry to reload with fresh data."
            onRetry={handleRetry}
          />
        )}
      </div>

      {/* Flow description */}
      <div
        style={{
          marginTop: '12px',
          padding: '10px 14px',
          background: 'rgba(148,136,236,0.04)',
          border: '1px solid rgba(148,136,236,0.12)',
          borderRadius: '5px',
        }}
      >
        <p
          className="font-body text-[var(--semantic-ink-muted)]"
          style={{ fontSize: '11px', lineHeight: 1.6 }}
        >
          <strong style={{ color: 'var(--semantic-ink-body)' }}>Flow:</strong>{' '}
          loading (ChartSkeleton 1.5s) → loaded (KenColumnChart) → on Refetch → loading again.
          Simulate error forces ErrorState with retry CTA → retrying clears error flag → normal load.
        </p>
      </div>
    </div>
  );
}
