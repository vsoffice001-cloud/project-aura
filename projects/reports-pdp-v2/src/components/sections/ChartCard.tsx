'use client';

/**
 * CRAFT (aura-craft step 4.5 · 2026-05-12)
 * Section type: Chart card (wrapper — used by MarketSizeChart · SegmentIntelligenceModule · FutureOutlookModule)
 * Lead element: chart viz (Zone 5 · children prop · min-h-[220px] · full-width)
 * Support: title (h3 text-lg font-display font-light) + insight line (text-compact italic · muted) + source note (text-2xs)
 * Type rhythm: 2xl/base italic/sm/xs — chart title = text-lg (scale: could be text-xl; DECISION: text-lg appropriate for card-level heading)
 *   insight = text-compact italic · controls zone = text-compact · source = text-2xs
 * Motion event: hydration fade 400ms (whileInView opacity 0→1 · 450ms ease-out) — 1 event per chart card
 *   — useReducedMotion: initial:{} → no entrance animation · chart renders at final opacity
 * Depth: Card variant="outlined" shadow="sm" (border present + subtle shadow · matches card-chart default per DESIGN.md)
 *   dataset preview strip: warm-100 bg + border-soft (secondary depth within card)
 *   access zone border-top: 1px solid border-soft (internal divider)
 * Mobile override: controls zone flex-wrap · min-h-[220px] viz always maintained · dataset CTA stacks below controls
 */

/**
 * ChartCard — 8-zone reusable chart wrapper (PRD §20 · recipe row 12)
 *
 * Zones (in order):
 *   1. HEADER     — eyebrow label · methodology badge (right slot)
 *   2. TITLE      — h3 chart title (Serif)
 *   3. INSIGHT    — 1-line analyst takeaway
 *   4. CONTROLS   — toggles / timeframe / view modes (passed as ReactNode)
 *   5. VIZ        — chart body slot (children prop)
 *   6. DATASET    — "View Dataset" CTA + 3-row preview table peek
 *   7. SOURCE     — Source / Last updated (small text, text-secondary)
 *   8. ACCESS+CTA — lock state UI + CTA pair (if access != 'public')
 *
 * No SectionWrapper (utility component used inside other sections).
 * Variant: editorial-light throughout.
 */

import { type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Lock } from 'lucide-react';
import {
  Card,
  SectionLabel,
  Badge,
  Button,
} from '@kenresearch/design-system/atoms';

// ─── Types ─────────────────────────────────────────────────────────────────

export interface ChartCardDataset {
  publicRows: number;
  leadRows: number;
  fullRowCount: number;
  onView?: () => void;
}

export interface ChartCardSource {
  label: string;
  lastUpdated: string;
}

export type ChartCardAccess = 'public' | 'metered' | 'lead-gated' | 'login-gated' | 'paid';

export interface ChartCardCTA {
  label: string;
  onClick: () => void;
  variant?: 'brand' | 'secondary';
}

export interface ChartCardProps {
  eyebrow?: string;
  methodologyBadge?: string;
  title: string;
  insight?: string;
  controls?: ReactNode;
  children?: ReactNode;
  dataset?: ChartCardDataset;
  source: ChartCardSource;
  access: ChartCardAccess;
  primaryCTA?: ChartCardCTA;
  secondaryCTA?: ChartCardCTA;
  className?: string;
  id?: string;
}

// ─── Lock state helpers ─────────────────────────────────────────────────────

const ACCESS_LABELS: Record<ChartCardAccess, string> = {
  public: '',
  metered: 'Sign in to unlock full access',
  'lead-gated': 'Share your details to unlock this chart',
  'login-gated': 'Sign in to view',
  paid: 'Request full report access',
};

// ─── ChartCard ──────────────────────────────────────────────────────────────

export function ChartCard({
  eyebrow,
  methodologyBadge,
  title,
  insight,
  controls,
  children,
  dataset,
  source,
  access,
  primaryCTA,
  secondaryCTA,
  className,
  id,
}: ChartCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const isLocked = access !== 'public';
  const insightId = id ? `${id}-insight` : undefined;

  return (
    <motion.div
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      <Card variant="outlined" padding="lg" shadow="sm">
        <div className="flex flex-col gap-5">

          {/* Zone 1: HEADER — eyebrow + methodology badge */}
          {(eyebrow || methodologyBadge) && (
            <div className="flex items-center justify-between gap-3 flex-wrap">
              {eyebrow && (
                <SectionLabel variant="default">{eyebrow}</SectionLabel>
              )}
              {methodologyBadge && (
                <Badge theme="neutral" size="sm">{methodologyBadge}</Badge>
              )}
            </div>
          )}

          {/* Zone 2: TITLE */}
          <h3
            className="text-lg font-display font-light leading-snug"
            style={{ color: 'var(--color-foundation-black)' }}
            id={id}
          >
            {title}
          </h3>

          {/* Zone 3: INSIGHT */}
          {insight && (
            <p
              id={insightId}
              className="text-compact font-body italic leading-relaxed"
              style={{ color: 'var(--surface-text-muted)' }}
            >
              {insight}
            </p>
          )}

          {/* Zone 4: CONTROLS */}
          {controls && (
            <div className="flex items-center gap-2 flex-wrap">
              {controls}
            </div>
          )}

          {/* Zone 5: VIZ — chart body slot */}
          <div
            role="img"
            aria-labelledby={id}
            aria-describedby={insightId}
            className="w-full min-h-[220px] relative"
          >
            {children}
          </div>

          {/* Zone 6: DATASET — preview CTA */}
          {dataset && (
            <div
              className="flex items-center justify-between gap-3 py-3 px-4 rounded-[var(--radius-card)]"
              style={{ backgroundColor: 'var(--color-ramp-warm-100)', border: '1px solid var(--border-soft)' }}
            >
              <p className="text-compact font-body" style={{ color: 'var(--surface-text-muted)' }}>
                <span style={{ color: 'var(--color-foundation-black)', fontWeight: 500 }}>
                  {dataset.publicRows}
                </span>
                {' '}of{' '}
                <span style={{ color: 'var(--color-foundation-black)', fontWeight: 500 }}>
                  {dataset.fullRowCount}
                </span>
                {' '}rows visible
              </p>
              {dataset.onView && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={dataset.onView}
                  aria-label="View full dataset"
                >
                  View Dataset
                </Button>
              )}
            </div>
          )}

          {/* Zone 7: SOURCE */}
          <p className="text-2xs font-body" style={{ color: 'var(--surface-text-muted)' }}>
            Source: {source.label} &middot; Last updated: {source.lastUpdated}
          </p>

          {/* Zone 8: ACCESS+CTA — lock state + CTA pair */}
          {(isLocked || primaryCTA || secondaryCTA) && (
            <div
              className="flex flex-col gap-3 pt-3"
              style={{ borderTop: '1px solid var(--border-soft)' }}
            >
              {isLocked && (
                <div className="flex items-center gap-2">
                  <Lock
                    size={14}
                    style={{ color: 'var(--surface-text-muted)' }}
                    aria-hidden="true"
                  />
                  <p
                    className="text-compact font-body"
                    style={{ color: 'var(--surface-text-muted)' }}
                    aria-label={`Locked — ${ACCESS_LABELS[access]}`}
                  >
                    {ACCESS_LABELS[access]}
                  </p>
                </div>
              )}

              <div className="flex gap-3 flex-wrap">
                {primaryCTA && (
                  <Button
                    variant={primaryCTA.variant === 'brand' ? 'brand' : 'secondary'}
                    size="md"
                    onClick={primaryCTA.onClick}
                  >
                    {primaryCTA.label}
                  </Button>
                )}
                {secondaryCTA && (
                  <Button
                    variant="secondary"
                    size="md"
                    onClick={secondaryCTA.onClick}
                  >
                    {secondaryCTA.label}
                  </Button>
                )}
              </div>
            </div>
          )}

        </div>
      </Card>
    </motion.div>
  );
}
