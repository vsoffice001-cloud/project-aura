'use client';

/**
 * CRAFT (aura-craft step 4.5 · 2026-05-12)
 * Section type: Executive summary
 * Lead element: insight quote (text-lg font-display font-light · red left-border accent — boardroom pull-quote visual)
 * Support: 3-col narrative paragraphs (text-sm · muted eyebrow labels uppercase) + takeaway cards grid
 * Type rhythm: 2xl/lg/base/xs (content-dense · insight line at text-lg · card titles at text-compact · labels text-compact uppercase)
 * Motion event: static narrative · whileInView fade-up on insight line (single event) + stagger on cards (1 event total)
 *   — DECISION: 2 motion events visible max here (insight + cards stagger count as 2) · within budget
 *   — useReducedMotion disables all · renders content at final state
 * Depth: borders + warm bg accent — Card variant="outlined" shadow="none" on takeaway cards (border present)
 *   insight quote has red left-border (2px) creating depth contrast without shadow
 * Mobile override: 3-col narrative → 1-col · takeaway cards 1-col sm:2-col lg:3-col · insight quote full-width
 */

/**
 * ExecutiveSummaryModule — Boardroom-style brief (PRD §13)
 *
 * Variant: editorial-light
 * Background: white · spacing: lg (LOCK 3)
 * Access: public
 */

import { motion, useReducedMotion } from 'framer-motion';
import {
  TrendingUp,
  BarChart3,
  PieChart,
  Users,
  BookOpen,
} from 'lucide-react';
import {
  SectionWrapper,
  SectionHeading,
  Card,
  Badge,
  Button,
} from '@kenresearch/design-system/atoms';
import type { ExecutiveSummary } from '@/types/schema';
import { useLeadFormModal } from '@/components/LeadFormModalProvider';

export interface ExecutiveSummaryModuleProps {
  summary: ExecutiveSummary;
  reportSlug: string;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  TrendingUp: <TrendingUp size={18} aria-hidden="true" />,
  BarChart3: <BarChart3 size={18} aria-hidden="true" />,
  PieChart: <PieChart size={18} aria-hidden="true" />,
  Users: <Users size={18} aria-hidden="true" />,
  BookOpen: <BookOpen size={18} aria-hidden="true" />,
};

const CATEGORY_THEME: Record<string, 'neutral' | 'info' | 'purple' | 'success' | 'warm'> = {
  demand: 'info',
  forecast: 'purple',
  segments: 'neutral',
  competition: 'warm',
  methodology: 'success',
};

const USE_CASE_LABELS: Record<string, string> = {
  'market-entry': 'Market Entry',
  'competitive-benchmarking': 'Competitive Benchmarking',
  'investment-screening': 'Investment Screening',
  'expansion-planning': 'Expansion Planning',
  'supply-chain-strategy': 'Supply Chain Strategy',
  'procurement-planning': 'Procurement Planning',
  'product-strategy': 'Product Strategy',
  'growth-decisions': 'Growth Decisions',
};

export function ExecutiveSummaryModule({ summary, reportSlug }: ExecutiveSummaryModuleProps) {
  const shouldReduceMotion = useReducedMotion();
  const { openForm } = useLeadFormModal();

  return (
    <SectionWrapper background="white" spacing="lg" id="exec-summary">
      <div className="flex flex-col gap-10">
        <SectionHeading level={2} eyebrow="Executive Summary" align="left">
          Research brief
        </SectionHeading>

        {/* Insight line */}
        <motion.p
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg font-display font-light leading-relaxed border-l-2 pl-5"
          style={{
            color: 'var(--color-foundation-black)',
            borderLeftColor: 'var(--color-brand-red)',
          }}
        >
          {summary.insightLine}
        </motion.p>

        {/* Narrative paragraphs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { id: 'overview', label: 'Market Overview', text: summary.paragraphs.marketOverview },
            { id: 'drivers', label: 'Growth Drivers', text: summary.paragraphs.growthDrivers },
            { id: 'utility', label: 'Decision Utility', text: summary.paragraphs.decisionUtility },
          ].map((para, i) => (
            <motion.div
              key={para.id}
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-2"
            >
              <h3
                className="text-compact font-body font-semibold uppercase tracking-wider"
                style={{ color: 'var(--surface-text-muted)' }}
              >
                {para.label}
              </h3>
              <p
                className="text-sm font-body leading-relaxed"
                style={{ color: 'var(--color-foundation-black)' }}
              >
                {para.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Takeaway cards */}
        <div className="flex flex-col gap-4">
          <h3
            className="text-compact font-body font-semibold uppercase tracking-wider"
            style={{ color: 'var(--surface-text-muted)' }}
          >
            Key takeaways
          </h3>
          <ul
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            aria-label="Key research takeaways"
          >
            {summary.takeawayCards.map((card, i) => (
              <motion.li
                key={card.id}
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.4, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              >
                <Card variant="outlined" padding="md" shadow="none" hover>
                  <div className="flex flex-col gap-3">
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-button)]"
                      style={{ backgroundColor: 'var(--color-ramp-warm-200)' }}
                      aria-hidden="true"
                    >
                      <span style={{ color: 'var(--color-brand-red)' }}>
                        {ICON_MAP[card.icon] ?? <BarChart3 size={18} />}
                      </span>
                    </div>

                    <Badge
                      variant="pill"
                      size="xs"
                      theme={CATEGORY_THEME[card.category] ?? 'neutral'}
                      bordered
                    >
                      {card.category}
                    </Badge>

                    <div>
                      <h4
                        className="text-compact font-body font-semibold mb-1"
                        style={{ color: 'var(--color-foundation-black)' }}
                      >
                        {card.title}
                      </h4>
                      <p
                        className="text-compact font-body leading-relaxed"
                        style={{ color: 'var(--surface-text-muted)' }}
                      >
                        {card.body}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Buyer use case chips */}
        <div className="flex flex-col gap-3">
          <p
            className="text-compact font-body font-semibold uppercase tracking-wider"
            style={{ color: 'var(--surface-text-muted)' }}
          >
            Use this report for
          </p>
          <ul className="flex flex-wrap gap-2" aria-label="Use case applications">
            {summary.buyerUseCaseChips.map((uc) => (
              <li key={uc}>
                <Badge variant="pill" size="sm" theme="neutral" bordered interactive>
                  {USE_CASE_LABELS[uc] ?? uc}
                </Badge>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div>
          <Button
            variant="brand"
            size="md"
            animatedArrow
            onClick={() =>
              openForm('sample', {
                reportSlug,
                ctaLocation: 'exec-summary',
                sectionName: 'executive-summary',
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
