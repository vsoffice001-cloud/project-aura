'use client';

/**
 * RegulatoryCardStack — Row 25 — Recipe report-detail.md line 66
 * bg: white · spacing: lg · motion: Framer stagger 60ms
 * Vertical card stack — 5 callouts w/ Authority · What it governs · Impacted participants · Compliance relevance · Buyer implication
 * "Extended compliance detail" lead-gated overlay below stack
 */

import { motion, useReducedMotion } from 'framer-motion';
import {
  Shield,
  Snowflake,
  CheckCircle,
  AlertTriangle,
  Users,
  type LucideIcon,
} from 'lucide-react';
import {
  SectionWrapper,
  SectionHeading,
  SectionLabel,
  Card,
  Badge,
} from '@kenresearch/design-system/atoms';
import { AccessLevelGate } from '@/components/AccessLevelGate';
import type { CardGridModule } from '@/types/schema';

const ICON_MAP: Record<string, LucideIcon> = {
  Shield,
  Snowflake,
  CheckCircle,
  AlertTriangle,
  Users,
};

const COMPLIANCE_RELEVANCE: Record<number, string> = {
  0: 'High — all operators must comply',
  1: 'High — state + territory jurisdiction',
  2: 'High — industry standard for food businesses',
  3: 'Medium — import/export and pharma operators',
  4: 'High — all transport chain participants',
};

const IMPACTED_PARTICIPANTS: Record<number, string[]> = {
  0: ['3PL Operators', 'Food Processors', 'Pharma Distributors'],
  1: ['Warehouse Operators', 'Transport Companies'],
  2: ['Food Manufacturers', 'Cold Chain Operators'],
  3: ['Importers', 'Exporters', 'Pharma Logistics'],
  4: ['Drivers', 'Consignors', 'Loaders', 'Receivers'],
};

const BUYER_IMPLICATIONS: Record<number, string> = {
  0: 'Buyers must confirm operator FSANZ certification before committing procurement contracts.',
  1: 'Conduct state-specific compliance checks for multi-location cold storage expansion.',
  2: 'Preference HACCP-certified 3PL providers when evaluating vendor shortlists.',
  3: 'Pharma and agri-importers should budget for certification and treatment compliance costs.',
  4: 'Logistics procurement contracts must explicitly assign COR responsibilities per party.',
};

const LEAD_GATED_ACCESS = {
  level: 'lead-gated' as const,
  ctaTrigger: 'sample' as const,
  paywallSelector: '.kr-paywall-regulatory',
  schemaIsAccessibleForFree: false,
};

interface Props {
  regulations: CardGridModule | null;
}

interface RegCardProps {
  card: CardGridModule['cards'][number];
  index: number;
  prefersReduced: boolean | null;
}

function RegCard({ card, index, prefersReduced }: RegCardProps) {
  const Icon = card.icon ? (ICON_MAP[card.icon] ?? Shield) : Shield;
  const impacted = IMPACTED_PARTICIPANTS[index] ?? ['Operators'];
  const compliance = COMPLIANCE_RELEVANCE[index] ?? 'Medium';
  const buyerImplication = BUYER_IMPLICATIONS[index] ?? card.body;

  return (
    <motion.div
      initial={prefersReduced ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <Card variant="white" padding="lg" className="w-full">
        {/* Mobile: stacked · Desktop: 5-col grid */}
        <div className="flex flex-col md:grid md:grid-cols-[180px_1fr_200px_160px_1fr] gap-4 md:gap-6 md:items-start">

          {/* Col 1 — Authority */}
          <div className="flex items-start gap-3">
            <div
              className="shrink-0 w-9 h-9 rounded-md flex items-center justify-center mt-0.5"
              style={{ background: 'var(--color-ramp-warm-300)' }}
              aria-hidden="true"
            >
              <Icon size={18} style={{ color: 'var(--color-brand-red, #b01f24)' }} />
            </div>
            <h3
              className="font-[var(--typography-family-display)] font-semibold leading-snug"
              style={{ fontSize: 'var(--typography-size-base)', color: 'var(--color-foundation-black)' }}
            >
              {card.title}
            </h3>
          </div>

          {/* Col 2 — What it governs */}
          <div>
            <p
              className="text-xs uppercase tracking-wider mb-1 font-medium"
              style={{ color: 'var(--color-neutral-500, #6b7280)' }}
            >
              What it governs
            </p>
            <p style={{ fontSize: 'var(--typography-size-sm)', color: 'var(--color-neutral-700, #374151)', lineHeight: '1.6' }}>
              {card.body}
            </p>
          </div>

          {/* Col 3 — Impacted participants */}
          <div>
            <p
              className="text-xs uppercase tracking-wider mb-2 font-medium"
              style={{ color: 'var(--color-neutral-500, #6b7280)' }}
            >
              Impacted participants
            </p>
            <div className="flex flex-wrap gap-1.5">
              {impacted.map((p) => (
                <Badge key={p} theme="neutral">{p}</Badge>
              ))}
            </div>
          </div>

          {/* Col 4 — Compliance relevance */}
          <div>
            <p
              className="text-xs uppercase tracking-wider mb-2 font-medium"
              style={{ color: 'var(--color-neutral-500, #6b7280)' }}
            >
              Compliance relevance
            </p>
            <Badge theme="purple">{compliance}</Badge>
          </div>

          {/* Col 5 — Buyer implication */}
          <div>
            <p
              className="text-xs uppercase tracking-wider mb-1 font-medium"
              style={{ color: 'var(--color-neutral-500, #6b7280)' }}
            >
              Buyer implication
            </p>
            <p
              className="font-medium leading-relaxed"
              style={{ fontSize: 'var(--typography-size-sm)', color: 'var(--color-foundation-black)' }}
            >
              {buyerImplication}
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

export function RegulatoryCardStack({ regulations }: Props) {
  const prefersReduced = useReducedMotion();

  if (!regulations || regulations.cards.length === 0) return null;

  return (
    <SectionWrapper background="white" spacing="lg" id="sec-regulatory">
      <SectionLabel>Regulatory</SectionLabel>
      <SectionHeading level={2} className="mt-2 mb-8">
        {regulations.heading ?? 'Regulatory Landscape'}
      </SectionHeading>

      <div className="flex flex-col gap-4">
        {regulations.cards.map((card, i) => (
          <RegCard
            key={card.id}
            card={card}
            index={i}
            prefersReduced={prefersReduced}
          />
        ))}
      </div>

      {/* Lead-gated extended compliance detail */}
      <div className="mt-8">
        <AccessLevelGate
          access={LEAD_GATED_ACCESS}
          sectionName="RegulatoryCardStack"
        >
          {/* Extended detail — visible post-unlock (placeholder) */}
          <div
            className="rounded-lg border p-6"
            style={{ borderColor: 'var(--border-default)', background: 'var(--color-ramp-warm-300)' }}
          >
            <p style={{ fontSize: 'var(--typography-size-sm)', color: 'var(--color-neutral-700, #374151)' }}>
              Full compliance detail, penalty schedules, and jurisdiction-specific guidance available in the downloaded report.
            </p>
          </div>
        </AccessLevelGate>
      </div>
    </SectionWrapper>
  );
}
