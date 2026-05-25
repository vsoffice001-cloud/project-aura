'use client';

/**
 * CRAFT (aura-craft step 4.5 · 2026-05-12)
 * Section type: content-dense (narrative lead)
 * Lead element: narrative lead (insight line text-base font-display font-light · big stat visual anchor sticky on desktop)
 * Support: h3 narrative sub-sections (text-compact uppercase tracking-wider · muted eyebrow style)
 *   + analyst note callout (Card · red alert icon · italic body copy)
 * Type rhythm: 2xl/lg/base/xs — insight line text-base (could be text-lg for more presence; DECISION: text-base per content density)
 *   visual anchor stats = text-lg tabular-nums · source note = text-2xs
 * Motion event: 2 events — insight line fade-up (1) + narrative sections stagger (1) · visual anchor slide-in (counts as 3rd)
 *   DECISION: 3 events at max budget — respect limit; no additional animations added here
 *   — useReducedMotion disables all; content renders at final state
 * Depth: Card variant="white" shadow="md" on visual anchor (sticky card needs strong shadow for floating appearance)
 *   Card variant="outlined" shadow="none" on analyst note (border only — lighter weight)
 * Mobile override: visual anchor moves below narrative (md:sticky md:top-24 only applies md+) · 1-col layout
 */

/**
 * MarketOverviewModule — Research narrative + visual anchor (PRD §15)
 *
 * Variant: editorial-light
 * Background: white · spacing: lg (LOCK 3)
 * Access: public
 *
 * PRD §15 rule: No long-text without visual anchor + source note
 */

import { motion, useReducedMotion } from 'framer-motion';
import { BarChart3, AlertCircle } from 'lucide-react';
import {
  SectionWrapper,
  SectionHeading,
  Card,
  Button,
} from '@kenresearch/design-system/atoms';
import type { MarketOverviewModule as MarketOverviewModuleType } from '@/types/schema';
import { useLeadFormModal } from '@/components/LeadFormModalProvider';

export interface MarketOverviewModuleProps {
  module: MarketOverviewModuleType;
  reportSlug: string;
}

export function MarketOverviewModule({ module: mod, reportSlug }: MarketOverviewModuleProps) {
  const shouldReduceMotion = useReducedMotion();
  const { openForm } = useLeadFormModal();

  return (
    <SectionWrapper background="white" spacing="lg" id="market-overview">
      <div className="flex flex-col gap-8">
        <SectionHeading level={2} eyebrow="Market Overview" align="left">
          {mod.heading ?? 'Market Overview'}
        </SectionHeading>

        {/* Insight line */}
        <motion.p
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-base font-display font-light leading-relaxed"
          style={{ color: 'var(--color-foundation-black)' }}
        >
          {mod.insightLine}
        </motion.p>

        {/* Two-column: narrative (L) + visual anchor (R) */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-8 lg:gap-12 items-start">
          {/* Narrative sections */}
          <div className="flex flex-col gap-6">
            {mod.narrativeSections.map((section, i) => (
              <motion.div
                key={section.h3}
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-2"
              >
                <h3
                  className="text-compact font-body font-semibold uppercase tracking-wider"
                  style={{ color: 'var(--surface-text-muted)' }}
                >
                  {section.h3}
                </h3>
                <p
                  className="text-sm font-body leading-relaxed"
                  style={{ color: 'var(--color-foundation-black)' }}
                >
                  {section.body}
                </p>
              </motion.div>
            ))}

            {/* Analyst note callout */}
            {mod.analystNote && (
              <motion.div
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <Card variant="outlined" padding="md" shadow="none">
                  <div className="flex gap-3 items-start">
                    <AlertCircle
                      size={18}
                      className="flex-shrink-0 mt-0.5"
                      style={{ color: 'var(--color-brand-red)' }}
                      aria-hidden="true"
                    />
                    <div>
                      <p
                        className="text-2xs font-body font-semibold uppercase tracking-wider mb-1"
                        style={{ color: 'var(--surface-text-muted)' }}
                      >
                        Analyst note
                      </p>
                      <p
                        className="text-compact font-body italic leading-relaxed"
                        style={{ color: 'var(--color-foundation-black)' }}
                      >
                        {mod.analystNote}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Visual anchor — stat callout (Wave 2 replaces with ChartCard) */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="md:sticky md:top-24"
          >
            <Card variant="white" padding="lg" shadow="md">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <BarChart3 size={16} style={{ color: 'var(--color-brand-red)' }} aria-hidden="true" />
                  <p
                    className="text-2xs font-body font-semibold uppercase tracking-wider"
                    style={{ color: 'var(--surface-text-muted)' }}
                  >
                    Key metrics
                  </p>
                </div>

                {/* Public minimum stats — visible HTML text */}
                <dl className="flex flex-col gap-4">
                  {[
                    { term: 'Market Size 2022', value: 'AUD 6,547.8 Mn', note: 'Base year' },
                    { term: 'Forecast 2027', value: 'AUD 10,705.0 Mn', note: 'Projected' },
                    { term: 'CAGR 2022-2027', value: '10.03%', note: 'Growth rate' },
                  ].map((item) => (
                    <div key={item.term}>
                      <dt
                        className="text-2xs font-body uppercase tracking-wider mb-0.5"
                        style={{ color: 'var(--surface-text-muted)' }}
                      >
                        {item.term}
                      </dt>
                      <dd
                        className="text-lg font-display font-light tabular-nums leading-tight"
                        style={{ color: 'var(--color-foundation-black)' }}
                      >
                        {item.value}
                      </dd>
                      <dd className="text-2xs" style={{ color: 'var(--surface-text-muted)' }}>
                        {item.note}
                      </dd>
                    </div>
                  ))}
                </dl>

                {/* Chart placeholder — Wave 2 wires live chart */}
                <div
                  className="h-[120px] rounded-[var(--radius-card)] flex items-center justify-center"
                  style={{
                    backgroundColor: 'var(--color-ramp-warm-100)',
                    border: '1px solid var(--border-soft)',
                  }}
                  role="img"
                  aria-label="Market size trend chart — loads after hydration"
                >
                  <p className="text-2xs" style={{ color: 'var(--surface-text-muted)' }}>
                    Chart · Wave 2
                  </p>
                </div>

                <p className="text-2xs" style={{ color: 'var(--surface-text-muted)' }}>
                  Source: Ken Research analysis
                </p>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* CTA */}
        <div>
          <Button
            variant="secondary"
            size="md"
            onClick={() =>
              openForm('sample', {
                reportSlug,
                ctaLocation: 'market-overview',
                sectionName: 'market-overview',
              })
            }
          >
            Download Sample Report
          </Button>
        </div>
      </div>
    </SectionWrapper>
  );
}
