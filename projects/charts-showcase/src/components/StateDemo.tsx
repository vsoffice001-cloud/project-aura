'use client';

/**
 * StateDemo · Side-by-side or tabbed state preview.
 *
 * Shows the 4 states: normal · loading · empty · error.
 * Uses DS state atoms: ChartSkeleton · TableSkeleton · ChartEmptyState · ErrorState.
 * Tab strip for switching. DS Button atoms for tabs.
 *
 * @module charts-showcase/components/StateDemo
 */

import { useState, useRef } from 'react';
import {
  ChartSkeleton,
  TableSkeleton,
  ChartEmptyState,
  ErrorState,
} from '@kenresearch/design-system/charts';
import { Button } from '@kenresearch/design-system/atoms';
import { HitArea } from './HitArea';
import type { Demo } from '@/lib/demo-registry';

type StateTab = 'normal' | 'loading' | 'empty' | 'error';

interface StateDemoProps {
  demo: Demo;
}

// Tab label display
const TAB_LABELS: Record<StateTab, string> = {
  normal: 'Normal',
  loading: 'Loading',
  empty: 'Empty',
  error: 'Error',
};

export function StateDemo({ demo }: StateDemoProps) {
  const { stateDemos, skeletonType, category } = demo;
  if (!stateDemos) return null;

  const availableTabs: StateTab[] = ['normal'];
  if (stateDemos.loading) availableTabs.push('loading');
  if (stateDemos.empty) availableTabs.push('empty');
  if (stateDemos.error) availableTabs.push('error');
  if (availableTabs.length <= 1) return null; // only normal = skip strip

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [activeTab, setActiveTab] = useState<StateTab>(availableTabs[0]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const tablistRef = useRef<HTMLDivElement>(null);

  const isTable = category === 'table';

  const handleTabKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, idx: number) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const next = (idx + 1) % availableTabs.length;
      setActiveTab(availableTabs[next]);
      const btns = tablistRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
      btns?.[next]?.focus();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prev = (idx - 1 + availableTabs.length) % availableTabs.length;
      setActiveTab(availableTabs[prev]);
      const btns = tablistRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
      btns?.[prev]?.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      setActiveTab(availableTabs[0]);
      const btns = tablistRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
      btns?.[0]?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      setActiveTab(availableTabs[availableTabs.length - 1]);
      const btns = tablistRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
      btns?.[availableTabs.length - 1]?.focus();
    }
  };

  // mt-6 (24px) per spacing spec: canvas card → state demo strip
  return (
    <div className="mt-6">
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '12px',
          paddingTop: '16px',
          borderTop: '1px solid rgba(0,0,0,0.06)',
        }}
      >
        <span
          id={`state-label-${demo.id}`}
          className="font-body uppercase tracking-[0.1em] text-[var(--semantic-ink-muted)]"
          style={{ fontSize: '9px', fontWeight: 700 }}
        >
          States
        </span>
        <div
          ref={tablistRef}
          role="tablist"
          aria-labelledby={`state-label-${demo.id}`}
          className="flex gap-1.5"
        >
          {availableTabs.map((tab, idx) => (
              <Button
                key={tab}
                role="tab"
                variant={activeTab === tab ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setActiveTab(tab)}
                aria-selected={activeTab === tab}
                aria-controls={`state-panel-${demo.id}`}
                id={`state-tab-${demo.id}-${tab}`}
                tabIndex={activeTab === tab ? 0 : -1}
                onKeyDown={(e: React.KeyboardEvent<HTMLButtonElement>) => handleTabKeyDown(e, idx)}
                pill
                className="!min-h-[44px] !px-4"
              >
                {TAB_LABELS[tab]}
              </Button>
          ))}
        </div>
      </div>

      {/* State canvas */}
      <div
        role="tabpanel"
        id={`state-panel-${demo.id}`}
        aria-labelledby={`state-tab-${demo.id}-${activeTab}`}
        style={{
          background: 'var(--semantic-bg-page, #f5f2f1)',
          border: '1px solid rgba(0,0,0,0.06)',
          borderRadius: '6px',
          padding: '16px',
          minHeight: '180px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {activeTab === 'normal' && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '24px',
            }}
          >
            <span
              className="font-body"
              style={{
                fontSize: '13px',
                color: 'var(--semantic-ink-body)',
                textAlign: 'center',
              }}
            >
              Normal state — data loaded and rendered in the demo canvas above.
            </span>
            <span
              className="font-body"
              style={{
                fontSize: '11px',
                color: 'var(--semantic-ink-muted)',
                textAlign: 'center',
                maxWidth: '48ch',
              }}
            >
              See the chart preview above. Use Loading / Empty / Error tabs to preview failure states.
            </span>
          </div>
        )}

        {activeTab === 'loading' && (
          isTable
            ? <TableSkeleton rows={4} cols={4} density="standard" variant="card" />
            : <ChartSkeleton type={skeletonType ?? 'generic'} height={200} />
        )}

        {activeTab === 'empty' && (
          <ChartEmptyState
            title="No data available"
            description={isTable
              ? 'No rows match the current filter criteria.'
              : 'Market data for this segment isn\'t available in the selected date range.'}
            cta={{ label: 'Clear filters', onClick: () => {} }}
          />
        )}

        {activeTab === 'error' && (
          <ErrorState
            title="Failed to load"
            message={stateDemos.error ?? 'Data failed to load. Check your connection.'}
            onRetry={() => {}}
          />
        )}
      </div>
    </div>
  );
}
