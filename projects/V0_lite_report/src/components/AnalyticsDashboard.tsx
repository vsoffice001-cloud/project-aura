'use client';

import { useState, useEffect } from 'react';
import { X, BarChart3 } from 'lucide-react';
import { useFocusTrap, useKeyboardNavigation } from '@kenresearch/design-system/hooks';

/**
 * AnalyticsDashboard — dev/internal engagement metrics overlay.
 *
 * Toggle: Ctrl+Shift+A. Modal w/ focus trap + Escape close.
 * Per user decision: KEEP, no dev gate (always available).
 *
 * STUB STATE (Phase C step 7c): wireframe-only — `useAnalytics` hook (229 LOC)
 * deferred. Real impl reads session events from a localStorage tracker, surfaces:
 *   - sessionDuration, scrollDepth, engagementScore
 *   - clicksByElement, slideViews, faqExpansions, ctaClicks
 *   - exportData (JSON download), clearData (confirm)
 *
 * @port simplified V0_lite_report-legacy/src/app/components/AnalyticsDashboard.tsx
 */
export function AnalyticsDashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useFocusTrap(isOpen);

  useKeyboardNavigation({
    onEscape: () => setIsOpen(false),
    enabled: isOpen,
  });

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Analytics Dashboard"
    >
      <div
        ref={containerRef}
        className="bg-[var(--color-foundation-white)] rounded-[var(--radius-card)] shadow-[var(--shadow-xl)] max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
      >
        <div className="flex items-center justify-between p-6 border-b border-[var(--border-soft)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[var(--color-accent-purple)]/10 flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-[var(--color-accent-purple)]" strokeWidth={2} />
            </div>
            <div>
              <h2 className="text-[var(--typography-size-base)] font-medium text-[var(--surface-text)]">
                Analytics Dashboard
              </h2>
              <p className="text-[var(--typography-size-compact)] text-[var(--surface-text-muted)]">
                Session Engagement Metrics — Ctrl+Shift+A toggle
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-full hover:bg-[var(--tint-soft)] flex items-center justify-center transition-colors"
            aria-label="Close analytics dashboard"
          >
            <X className="h-4 w-4 text-[var(--surface-text-muted)]" />
          </button>
        </div>

        <div className="p-8 text-center">
          <p className="text-[var(--typography-size-sm)] text-[var(--surface-text-muted)] mb-2">
            Analytics dashboard — stub
          </p>
          <p className="text-[var(--typography-size-xs)] text-[var(--surface-text-subtle)] max-w-md mx-auto">
            <code>useAnalytics</code> hook (229 LOC localStorage tracker) deferred.
            Real metrics (session duration, scroll depth, engagement score, slide views,
            FAQ expansions, CTA clicks) wire up Phase E or post-handover.
          </p>
        </div>
      </div>
    </div>
  );
}
