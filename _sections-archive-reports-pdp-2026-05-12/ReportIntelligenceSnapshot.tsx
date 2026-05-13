'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { FileText, BarChart3, PieChart, Users, Briefcase, Package } from 'lucide-react';
import {
  Badge,
  Card,
  SectionHeading,
  SectionLabel,
  SectionWrapper,
} from '@kenresearch/design-system/atoms';
import type { ReportSnapshot, BuyerUseCase } from '@/types/schema';

const USE_CASE_LABELS: Record<BuyerUseCase, string> = {
  'market-entry': 'Market Entry',
  'competitive-benchmarking': 'Competitive Benchmarking',
  'investment-screening': 'Investment Screening',
  'expansion-planning': 'Expansion Planning',
  'supply-chain-strategy': 'Supply Chain Strategy',
  'procurement-planning': 'Procurement Planning',
  'product-strategy': 'Product Strategy',
  'growth-decisions': 'Growth Decisions',
};

const OUTPUT_ICONS: Record<string, { icon: React.ReactNode; label: string }> = {
  pdf: { icon: <FileText className="h-4 w-4" aria-hidden />, label: 'PDF Report' },
  charts: { icon: <BarChart3 className="h-4 w-4" aria-hidden />, label: 'Charts' },
  tables: { icon: <Package className="h-4 w-4" aria-hidden />, label: 'Data Tables' },
  sample: { icon: <FileText className="h-4 w-4" aria-hidden />, label: 'Sample' },
  'analyst-call': { icon: <Users className="h-4 w-4" aria-hidden />, label: 'Analyst Call' },
  customization: { icon: <Briefcase className="h-4 w-4" aria-hidden />, label: 'Customization' },
  excel: { icon: <PieChart className="h-4 w-4" aria-hidden />, label: 'Excel' },
};

interface ReportIntelligenceSnapshotProps {
  snapshot: ReportSnapshot;
}

// Framer Variants — transition wired per-card via `transition` prop (avoids TargetResolver typing issues)
const cardHidden = { opacity: 0, y: 20 };
const cardVisible = { opacity: 1, y: 0 };

/**
 * ReportIntelligenceSnapshot — recipe row 4.
 * bg: white · spacing: lg · motion: Framer whileInView stagger.
 * 6-card responsive grid: Market Size · Forecast · Segments · Companies · Use Cases · Outputs.
 */
export function ReportIntelligenceSnapshot({ snapshot }: ReportIntelligenceSnapshotProps) {
  const prefersReduced = useReducedMotion();

  const cards = [
    {
      id: 'market-size',
      title: 'Market Size',
      content: (
        <div className="space-y-1">
          <p className="text-[var(--typography-size-xl)] font-[var(--typography-family-display)] font-light tabular-nums leading-none">
            {snapshot.marketSize.unit} {snapshot.marketSize.value.toLocaleString('en-AU')}
          </p>
          <p className="text-[var(--typography-size-xs)] font-[var(--typography-family-body)]" style={{ opacity: 0.6 }}>
            {snapshot.marketSize.year} · {snapshot.marketSize.sourceNote}
          </p>
        </div>
      ),
    },
    {
      id: 'forecast',
      title: 'Forecast',
      content: (
        <div className="space-y-2">
          <p className="text-[var(--typography-size-xl)] font-[var(--typography-family-display)] font-light tabular-nums leading-none">
            {snapshot.forecast.unit} {snapshot.forecast.value.toLocaleString('en-AU')}
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            <Badge theme="purple" variant="pill" size="xs">
              CAGR {snapshot.forecast.cagr}% ({snapshot.forecast.period})
            </Badge>
            <span className="text-[var(--typography-size-xs)] font-[var(--typography-family-body)]" style={{ opacity: 0.6 }}>
              by {snapshot.forecast.year}
            </span>
          </div>
        </div>
      ),
    },
    {
      id: 'segments',
      title: 'Segments',
      content: (
        <div className="flex flex-wrap gap-1.5">
          {snapshot.segments.primary.map((seg) => (
            <Badge
              key={seg}
              theme={seg === snapshot.segments.dominant ? 'neutral' : 'muted'}
              variant="rounded"
              size="xs"
              bordered={seg === snapshot.segments.dominant}
            >
              {seg}
            </Badge>
          ))}
        </div>
      ),
    },
    {
      id: 'companies',
      title: 'Major Companies',
      content: (
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2 items-center">
            {snapshot.majorCompanies.logos.map((co) => (
              <span
                key={co.name}
                className="text-[var(--typography-size-xs)] font-[var(--typography-family-body)] font-medium px-2 py-0.5 rounded border border-[var(--border-default)] bg-[var(--color-foundation-white)]"
              >
                {co.name}
              </span>
            ))}
          </div>
          {snapshot.majorCompanies.lockedFullCount && (
            <p className="text-[var(--typography-size-xs)] font-[var(--typography-family-body)]" style={{ opacity: 0.55 }}>
              + {snapshot.majorCompanies.lockedFullCount} players tracked
            </p>
          )}
        </div>
      ),
    },
    {
      id: 'use-cases',
      title: 'Buyer Use Cases',
      content: (
        <div className="flex flex-wrap gap-1.5">
          {snapshot.buyerUseCases.map((uc) => (
            <Badge key={uc} theme="info" variant="pill" size="xs">
              {USE_CASE_LABELS[uc]}
            </Badge>
          ))}
        </div>
      ),
    },
    {
      id: 'outputs',
      title: 'Available Outputs',
      content: (
        <div className="flex flex-wrap gap-3">
          {snapshot.availableOutputs.map((out) => {
            const entry = OUTPUT_ICONS[out];
            if (!entry) return null;
            return (
              <div key={out} className="flex items-center gap-1.5 text-[var(--typography-size-xs)] font-[var(--typography-family-body)]" style={{ opacity: 0.75 }}>
                <span className="text-[var(--color-accent-purple)]">{entry.icon}</span>
                {entry.label}
              </div>
            );
          })}
        </div>
      ),
    },
  ];

  return (
    <SectionWrapper background="white" spacing="lg" id="intelligence-snapshot">
      <div className="mb-8 space-y-2">
        <SectionLabel background="light">Research Intelligence</SectionLabel>
        <SectionHeading level={2} align="left">
          Market Intelligence at a Glance
        </SectionHeading>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, i) => (
          <motion.div
            key={card.id}
            initial={prefersReduced ? false : cardHidden}
            whileInView={prefersReduced ? undefined : cardVisible}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
          >
            <Card variant="white" padding="md" shadow="sm" className="h-full">
              <p
                className="text-[var(--typography-size-xs)] uppercase tracking-wider font-[var(--typography-family-body)] font-semibold mb-3"
                style={{ opacity: 0.5 }}
              >
                {card.title}
              </p>
              {card.content}
            </Card>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
