'use client';

/**
 * CRAFT (aura-craft step 4.5 · 2026-05-12)
 * Lead: challenge title (text-base font-display font-medium — draws eye before urgency badge)
 * Type rhythm: xl/base/sm/xs — SectionHeading level={3} = xl · challenge title = text-base · body rows = text-compact/text-sm · badge labels = text-xs
 * Motion: static · no entrance animation on table rows (PRD: research tables = scannable · motion distracts)
 *   card stack mobile: stagger 60ms fade-up (whileInView · once) — useReducedMotion disables
 * Depth: borders + alt-row — <table> row alternation via nth-child warm-50 bg · Card on mobile uses border (no shadow · nested in warm parent)
 * Mobile: card stack (dl per row) · desktop: real <table> with th scope · stack column default
 */

/**
 * ChallengesSolutionsTable — Challenge/solution pairs (recipe row 21)
 *
 * Variant: editorial-light
 * Background: warm-300 (NESTED — NO SectionWrapper · parent IndustryAnalysisModule handles bg)
 * Cat 4.5: no nested SectionWrapper
 *
 * Public: all challenges + solutions always visible
 * 6 fields: title · why it matters · solution · impact · urgency · related segment
 *
 * Desktop: real <table> with <thead> <tbody> <th scope="col">
 * Mobile (<md): card stack with definition-list <dl> <dt> <dd>
 *
 * A11y: table with scope · responsive card fallback
 * useReducedMotion mandatory · stagger 60ms
 */

import { motion, useReducedMotion } from 'framer-motion';
import {
  SectionHeading,
  SectionLabel,
  Badge,
  Card,
} from '@kenresearch/design-system/atoms';
import type { IssueTableModule, IssueRow } from '@/types/schema';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ChallengesSolutionsTableProps {
  rows: IssueTableModule;
}

// ─── Severity badge ──────────────────────────────────────────────────────────

// DS Badge uses 'theme' prop for color, 'variant' for shape
const SEVERITY_THEME: Record<string, 'brand' | 'muted' | 'neutral'> = {
  high: 'brand',
  medium: 'muted',
  low: 'neutral',
};

function SeverityBadge({ severity }: { severity?: 'low' | 'medium' | 'high' }) {
  if (!severity) return null;
  return (
    <Badge theme={SEVERITY_THEME[severity] ?? 'muted'} variant="rounded">
      {severity.charAt(0).toUpperCase() + severity.slice(1)}
    </Badge>
  );
}

// ─── Mobile card ─────────────────────────────────────────────────────────────

interface MobileCardProps {
  row: IssueRow;
  index: number;
  shouldReduceMotion: boolean;
}

function MobileCard({ row, index, shouldReduceMotion }: MobileCardProps) {
  return (
    <motion.li
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1],
        delay: shouldReduceMotion ? 0 : index * 0.06,
      }}
      className="list-none"
    >
      <Card padding="md">
        <dl className="flex flex-col gap-3">
          {/* Challenge */}
          <div>
            <dt className="text-compact font-display font-medium mb-0.5" style={{ color: 'var(--surface-text-muted)' }}>
              Challenge
            </dt>
            <dd className="text-base font-body leading-relaxed" style={{ color: 'var(--color-foundation-black)' }}>
              {row.problem}
            </dd>
          </div>

          {/* Why it matters */}
          {row.whyItMatters && (
            <div>
              <dt className="text-compact font-display font-medium mb-0.5" style={{ color: 'var(--surface-text-muted)' }}>
                Why it matters
              </dt>
              <dd className="text-compact font-body leading-relaxed" style={{ color: 'var(--color-foundation-black)' }}>
                {row.whyItMatters}
              </dd>
            </div>
          )}

          {/* Solution */}
          <div
            className="pt-3"
            style={{ borderTop: '1px solid var(--border-soft)' }}
          >
            <dt className="text-compact font-display font-medium mb-0.5" style={{ color: 'var(--surface-text-muted)' }}>
              Solution
            </dt>
            <dd className="text-compact font-body leading-relaxed" style={{ color: 'var(--color-foundation-black)' }}>
              {row.solution}
            </dd>
          </div>
        </dl>

        {/* Metadata row (outside dl per axe a11y) */}
        <div className="flex flex-wrap gap-2 pt-3 mt-3" style={{ borderTop: '1px solid var(--border-soft)' }}>
          {row.severity && <SeverityBadge severity={row.severity} />}
          {row.urgency && (
            <Badge theme="neutral" variant="rounded">
              {row.urgency.charAt(0).toUpperCase() + row.urgency.slice(1)} urgency
            </Badge>
          )}
          {row.relatedSegment && (
            <Badge theme="neutral" variant="rounded">{row.relatedSegment}</Badge>
          )}
        </div>
      </Card>
    </motion.li>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

export function ChallengesSolutionsTable({ rows }: ChallengesSolutionsTableProps) {
  const shouldReduceMotion = useReducedMotion() ?? false;

  if (!rows.rows || rows.rows.length === 0) return null;

  return (
    <div
      id="challenges-solutions"
      className="py-10 md:py-14"
      style={{ backgroundColor: 'var(--color-ramp-warm-300)' }}
      data-industry-child="challenges"
    >
      <div className="flex flex-col gap-6">
        {/* Sub-heading */}
        <div>
          <SectionLabel>Challenges &amp; Solutions</SectionLabel>
          <SectionHeading level={3} align="left">
            {rows.heading ?? 'Major Challenges & Solutions'}
          </SectionHeading>
        </div>

        {/* Desktop table — hidden on mobile */}
        <div className="hidden md:block overflow-x-auto rounded-[var(--radius-card)] border" style={{ borderColor: 'var(--border-default)' }}>
          <table
            className="w-full text-sm font-body border-collapse"
            aria-label="Challenges and solutions table"
          >
            <thead>
              <tr style={{ backgroundColor: 'var(--color-ramp-warm-400, #ebe5e3)' }}>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-compact font-body font-semibold"
                  style={{ color: 'var(--color-foundation-black)', borderBottom: '2px solid var(--border-default)' }}
                >
                  Challenge
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-compact font-body font-semibold"
                  style={{ color: 'var(--color-foundation-black)', borderBottom: '2px solid var(--border-default)' }}
                >
                  Solution
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-center text-compact font-display font-medium"
                  style={{ color: 'var(--surface-text-muted)', borderBottom: '1px solid var(--border-default)' }}
                >
                  Severity
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-center text-compact font-display font-medium"
                  style={{ color: 'var(--surface-text-muted)', borderBottom: '1px solid var(--border-default)' }}
                >
                  Urgency
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-compact font-body font-semibold"
                  style={{ color: 'var(--color-foundation-black)', borderBottom: '2px solid var(--border-default)' }}
                >
                  Segment
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.rows.map((row, idx) => (
                <motion.tr
                  key={row.id}
                  initial={shouldReduceMotion ? {} : { opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.3,
                    delay: shouldReduceMotion ? 0 : idx * 0.06,
                  }}
                  style={{
                    backgroundColor: idx % 2 === 0 ? 'var(--color-foundation-white)' : 'var(--color-ramp-warm-100)',
                    borderBottom: '1px solid var(--border-soft)',
                  }}
                >
                  <td className="px-4 py-3 align-top text-compact font-body leading-relaxed" style={{ color: 'var(--color-foundation-black)' }}>
                    {row.problem}
                  </td>
                  <td className="px-4 py-3 align-top text-compact font-body leading-relaxed" style={{ color: 'var(--color-foundation-black)' }}>
                    {row.solution}
                  </td>
                  <td className="px-4 py-3 align-top text-center">
                    <SeverityBadge severity={row.severity} />
                  </td>
                  <td className="px-4 py-3 align-top text-center">
                    {row.urgency ? (
                      <Badge theme="neutral" variant="rounded">
                        {row.urgency.charAt(0).toUpperCase() + row.urgency.slice(1)}
                      </Badge>
                    ) : null}
                  </td>
                  <td className="px-4 py-3 align-top text-compact font-body" style={{ color: 'var(--surface-text-muted)' }}>
                    {row.relatedSegment ?? '—'}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile card stack — visible below md */}
        <ul className="flex md:hidden flex-col gap-4" aria-label="Challenges and solutions">
          {rows.rows.map((row, idx) => (
            <MobileCard
              key={row.id}
              row={row}
              index={idx}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
