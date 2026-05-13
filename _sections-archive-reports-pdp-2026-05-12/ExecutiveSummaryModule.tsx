'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { TrendingUp, BarChart3, PieChart, Users, BookOpen } from 'lucide-react';
import {
  Button,
  Card,
  SectionHeading,
  SectionLabel,
  SectionWrapper,
  Badge,
} from '@kenresearch/design-system/atoms';
import { useLeadFormModal } from '@/components/LeadFormModalProvider';
import { useAnalytics } from '@/hooks/useAnalytics';
import type { ExecutiveSummary, BuyerUseCase } from '@/types/schema';

const ICON_MAP: Record<string, React.ReactNode> = {
  TrendingUp: <TrendingUp className="h-4 w-4" aria-hidden />,
  BarChart3:  <BarChart3  className="h-4 w-4" aria-hidden />,
  PieChart:   <PieChart   className="h-4 w-4" aria-hidden />,
  Users:      <Users      className="h-4 w-4" aria-hidden />,
  BookOpen:   <BookOpen   className="h-4 w-4" aria-hidden />,
};

const USE_CASE_LABELS: Record<BuyerUseCase, string> = {
  'market-entry': 'Market Entry',
  'competitive-benchmarking': 'Benchmarking',
  'investment-screening': 'Investment Screening',
  'expansion-planning': 'Expansion',
  'supply-chain-strategy': 'Supply Chain',
  'procurement-planning': 'Procurement',
  'product-strategy': 'Product Strategy',
  'growth-decisions': 'Growth Decisions',
};

const CATEGORY_THEME = {
  demand:      'info',
  forecast:    'purple',
  segments:    'neutral',
  competition: 'warm',
  methodology: 'muted',
} as const;

interface ExecutiveSummaryModuleProps {
  summary: ExecutiveSummary;
  reportSlug: string;
}

/**
 * ExecutiveSummaryModule — recipe row 7.
 * bg: white · spacing: lg · motion: Framer fade-up.
 * 2-col desktop, stacked mobile.
 * Left: label + heading + opening + drivers + decision utility.
 * Right: takeaway cards (3-5) + contextual CTA card.
 */
export function ExecutiveSummaryModule({ summary, reportSlug }: ExecutiveSummaryModuleProps) {
  const prefersReduced = useReducedMotion();
  const { openForm } = useLeadFormModal();
  const dispatch = useAnalytics();

  const handleCTA = () => {
    const trigger = summary.ctaTrigger === 'sample' ? 'sample' : 'analyst-call';
    dispatch(trigger === 'sample' ? 'sample_cta_click' : 'analyst_cta_click', {
      cta_location: 'executive_summary',
      section_name: 'ExecutiveSummaryModule',
    });
    openForm(trigger, {
      reportSlug,
      ctaLocation: 'executive_summary',
      sectionName: 'ExecutiveSummaryModule',
    });
  };

  const fadeUp = prefersReduced
    ? {}
    : { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-40px' } };

  const driverBullets = summary.paragraphs.growthDrivers.split(',').map((s) => s.trim()).filter(Boolean);
  const decisionBullets = summary.paragraphs.decisionUtility.split(', ').map((s) => s.trim()).filter(Boolean);

  return (
    <SectionWrapper background="white" spacing="lg" id="executive-summary">
      <motion.div
        {...fadeUp}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start"
      >
        {/* LEFT — narrative */}
        <div className="space-y-6">
          <div className="space-y-2">
            <SectionLabel background="light">Executive Summary</SectionLabel>
            <SectionHeading level={2} align="left">
              {summary.insightLine}
            </SectionHeading>
          </div>

          <p className="text-[var(--typography-size-base)] font-[var(--typography-family-body)] leading-relaxed">
            {summary.paragraphs.marketOverview}
          </p>

          <div>
            <p
              className="text-[var(--typography-size-xs)] uppercase tracking-wider font-[var(--typography-family-body)] font-semibold mb-2"
              style={{ opacity: 0.5 }}
            >
              Growth Drivers
            </p>
            <ul className="space-y-1" role="list">
              {driverBullets.slice(0, 5).map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-2 text-[var(--typography-size-compact)] font-[var(--typography-family-body)] leading-snug"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0 bg-[var(--color-accent-purple)]" aria-hidden />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p
              className="text-[var(--typography-size-xs)] uppercase tracking-wider font-[var(--typography-family-body)] font-semibold mb-2"
              style={{ opacity: 0.5 }}
            >
              What this report decides
            </p>
            <ul className="space-y-1" role="list">
              {decisionBullets.slice(0, 6).map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-2 text-[var(--typography-size-compact)] font-[var(--typography-family-body)] leading-snug"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0 bg-[var(--color-brand-red)]" aria-hidden />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {/* Buyer use case chips */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {summary.buyerUseCaseChips.map((uc) => (
              <Badge key={uc} theme="muted" variant="pill" size="xs">
                {USE_CASE_LABELS[uc]}
              </Badge>
            ))}
          </div>
        </div>

        {/* RIGHT — takeaway cards + CTA */}
        <div className="space-y-3">
          {summary.takeawayCards.slice(0, 8).map((card, i) => (
            <motion.div
              key={card.id}
              initial={prefersReduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: 'easeOut' }}
            >
              <Card variant="white" padding="sm" shadow="sm">
                <div className="flex items-start gap-3">
                  <div
                    className="shrink-0 flex items-center justify-center h-8 w-8 rounded-[var(--radius-button)]"
                    style={{ backgroundColor: 'var(--color-ramp-purple-50)', color: 'var(--color-accent-purple)' }}
                    aria-hidden
                  >
                    {ICON_MAP[card.icon] ?? <TrendingUp className="h-4 w-4" />}
                  </div>
                  <div className="space-y-0.5 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-[var(--typography-size-compact)] font-[var(--typography-family-body)] font-semibold leading-snug">
                        {card.title}
                      </p>
                      <Badge
                        theme={CATEGORY_THEME[card.category] ?? 'muted'}
                        variant="pill"
                        size="xs"
                      >
                        {card.category}
                      </Badge>
                    </div>
                    <p className="text-[var(--typography-size-compact)] font-[var(--typography-family-body)] leading-snug" style={{ opacity: 0.7 }}>
                      {card.body}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}

          {/* Contextual CTA card */}
          <Card variant="warm" padding="md" shadow="none">
            <p
              className="text-[var(--typography-size-xs)] uppercase tracking-wider font-[var(--typography-family-body)] font-semibold mb-2"
              style={{ opacity: 0.6 }}
            >
              {summary.ctaTrigger === 'sample' ? 'Get the full report' : 'Speak with the analyst'}
            </p>
            <p className="text-[var(--typography-size-compact)] font-[var(--typography-family-body)] mb-4" style={{ opacity: 0.75 }}>
              {summary.ctaTrigger === 'sample'
                ? '57 pages · 16 charts · Primary research · Published Q1 2026.'
                : '30-minute call — scope, methodology, or customization queries.'}
            </p>
            <Button variant="brand" size="md" onClick={handleCTA}>
              {summary.ctaTrigger === 'sample' ? 'Download Sample Report' : 'Talk to Analyst'}
            </Button>
          </Card>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
