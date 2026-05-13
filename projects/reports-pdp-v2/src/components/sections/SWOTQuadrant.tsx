'use client';

/**
 * CRAFT (aura-craft step 4.5 · 2026-05-12)
 * Lead: quadrant heading (text-base font-display w/ accent letter-badge — SWOT letter is visual anchor)
 * Type rhythm: xl/base/sm/xs — SectionHeading level={3} = xl · quadrant h3 = text-base · bullets = text-compact · analyst note = text-compact italic
 * Motion: expand spring 200ms on accordion (ChevronDown rotate + bullet reveal) · stagger 80ms per quadrant card on view (whileInView · once)
 *   — useReducedMotion disables stagger; cards render at final opacity + position instantly
 * Depth: borders-only — Card with border (no shadow · nested in white panel · shadow would compete w/ parent)
 * Mobile: stack column · 1-col grid · expand button full accessible · default
 */

/**
 * SWOTQuadrant — 2×2 SWOT grid (recipe row 18)
 *
 * Variant: editorial-light
 * Background: white (NESTED — NO SectionWrapper · parent IndustryAnalysisModule handles bg)
 * Cat 4.5: no nested SectionWrapper
 *
 * Public: top 3 bullets per quadrant always visible.
 * Expandable: rest expandable (inline accordion — no DS Accordion atom yet)
 * Analyst note: bottom of section.
 *
 * A11y: each quadrant <section> with <h3> · keyboard-accessible Button expand
 * useReducedMotion mandatory
 *
 * TODO: promote Accordion to DS atom after sprint
 */

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import {
  SectionHeading,
  SectionLabel,
  Button,
  Divider,
  Card,
} from '@kenresearch/design-system/atoms';
// Badge not used in SWOTQuadrant — expand handled via Button + inline styles
import type { QuadrantModule } from '@/types/schema';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface SWOTQuadrantProps {
  swot: QuadrantModule;
}

// ─── Quadrant config ─────────────────────────────────────────────────────────

const QUADRANT_META: Record<
  'strength' | 'weakness' | 'opportunity' | 'threat',
  { label: string; eyebrow: string; accentVar: string }
> = {
  strength: {
    label: 'Strengths',
    eyebrow: 'S',
    accentVar: 'var(--color-ramp-periwinkle-500)',
  },
  weakness: {
    label: 'Weaknesses',
    eyebrow: 'W',
    accentVar: 'var(--color-ramp-coral-400)',
  },
  opportunity: {
    label: 'Opportunities',
    eyebrow: 'O',
    accentVar: 'var(--color-intent-success)',
  },
  threat: {
    label: 'Threats',
    eyebrow: 'T',
    accentVar: 'var(--color-intent-warning)',
  },
};

const PUBLIC_MIN = 3; // top 3 always visible

// ─── Single quadrant ─────────────────────────────────────────────────────────

interface QuadrantPanelProps {
  type: 'strength' | 'weakness' | 'opportunity' | 'threat';
  bullets: string[];
  analystNote?: string;
  delayIndex: number;
  shouldReduceMotion: boolean;
}

function QuadrantPanel({
  type,
  bullets,
  analystNote,
  delayIndex,
  shouldReduceMotion,
}: QuadrantPanelProps) {
  const [expanded, setExpanded] = useState(false);
  const meta = QUADRANT_META[type];
  const visibleBullets = expanded ? bullets : bullets.slice(0, PUBLIC_MIN);
  const hasMore = bullets.length > PUBLIC_MIN;

  return (
    <motion.section
      aria-label={`SWOT ${meta.label}`}
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
        delay: shouldReduceMotion ? 0 : delayIndex * 0.08,
      }}
    >
      <Card padding="md" className="h-full flex flex-col gap-4">
        {/* Quadrant header */}
        <div className="flex items-center gap-3">
          <span
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-display font-semibold shrink-0"
            style={{
              backgroundColor: meta.accentVar,
              color: 'var(--color-foundation-white)',
            }}
            aria-hidden="true"
          >
            {meta.eyebrow}
          </span>
          {/* text-xl per CRAFT brief: quadrant heading scale · builder default was text-base (too small for h3 lead) */}
          <h3 className="text-xl font-display font-medium" style={{ color: 'var(--color-foundation-black)' }}>
            {meta.label}
          </h3>
        </div>

        <Divider />

        {/* Bullets */}
        <ul className="flex flex-col gap-3 flex-1" role="list">
          {visibleBullets.map((bullet, i) => (
            <li key={i} className="flex gap-2.5 items-start">
              <span
                className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                style={{ backgroundColor: meta.accentVar }}
                aria-hidden="true"
              />
              <span className="text-compact font-body leading-relaxed" style={{ color: 'var(--color-foundation-black)' }}>
                {bullet}
              </span>
            </li>
          ))}
        </ul>

        {/* Expand toggle */}
        {hasMore && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpanded((prev) => !prev)}
            aria-expanded={expanded}
            aria-label={expanded ? `Collapse ${meta.label}` : `Expand ${meta.label} — ${bullets.length - PUBLIC_MIN} more`}
            className="self-start -ml-2 flex items-center gap-1"
          >
            <span>{expanded ? 'Show less' : `+${bullets.length - PUBLIC_MIN} more`}</span>
            <ChevronDown
              size={14}
              aria-hidden="true"
              className="transition-transform duration-200"
              style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
            />
          </Button>
        )}

        {/* Analyst note */}
        {analystNote && expanded && (
          <p
            className="text-compact font-body italic"
            style={{ color: 'var(--surface-text-muted)', borderTop: '1px solid var(--border-soft)', paddingTop: '0.75rem' }}
          >
            <span className="font-semibold not-italic" style={{ color: 'var(--color-foundation-black)' }}>
              Analyst note:{' '}
            </span>
            {analystNote}
          </p>
        )}
      </Card>
    </motion.section>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

export function SWOTQuadrant({ swot }: SWOTQuadrantProps) {
  const shouldReduceMotion = useReducedMotion() ?? false;

  if (!swot.quadrants || swot.quadrants.length === 0) return null;

  const strengthQ = swot.quadrants.find((q) => q.type === 'strength');
  const weaknessQ = swot.quadrants.find((q) => q.type === 'weakness');
  const opportunityQ = swot.quadrants.find((q) => q.type === 'opportunity');
  const threatQ = swot.quadrants.find((q) => q.type === 'threat');

  const ordered = [
    { data: strengthQ, type: 'strength' as const },
    { data: weaknessQ, type: 'weakness' as const },
    { data: opportunityQ, type: 'opportunity' as const },
    { data: threatQ, type: 'threat' as const },
  ].filter((q) => q.data);

  return (
    <div
      id="swot"
      className="py-10 md:py-14"
      style={{ backgroundColor: 'var(--color-foundation-white)' }}
      data-industry-child="swot"
    >
      <div className="flex flex-col gap-6">
        {/* Sub-heading */}
        <div>
          <SectionLabel>Industry Analysis</SectionLabel>
          <SectionHeading level={3} align="left">
            {swot.heading ?? 'SWOT Analysis'}
          </SectionHeading>
        </div>

        {/* 2×2 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {ordered.map(({ data, type }, idx) =>
            data ? (
              <QuadrantPanel
                key={type}
                type={type}
                bullets={data.bullets}
                analystNote={data.analystNote}
                delayIndex={idx}
                shouldReduceMotion={shouldReduceMotion}
              />
            ) : null,
          )}
        </div>
      </div>
    </div>
  );
}
