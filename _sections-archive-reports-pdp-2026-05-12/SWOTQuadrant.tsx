'use client';

/**
 * SWOTQuadrant — Row 17 — Recipe report-detail.md line 58
 * bg: white · spacing: lg · motion: Framer stagger 80ms
 * 2×2 grid. Top 3 bullets public; full expansion lead-gated.
 * Analyst note at bottom.
 */

import { motion, useReducedMotion } from 'framer-motion';
import { Check } from 'lucide-react';
import {
  SectionWrapper,
  SectionHeading,
  SectionLabel,
  Card,
  Badge,
} from '@kenresearch/design-system/atoms';
import { AccessLevelGate } from '@/components/AccessLevelGate';
import { useLeadFormModal } from '@/components/LeadFormModalProvider';
import { useAnalytics } from '@/hooks/useAnalytics';
import type { QuadrantModule } from '@/types/schema';

interface Props {
  data: QuadrantModule | null;
  reportSlug: string;
}

type QuadrantType = 'strength' | 'weakness' | 'opportunity' | 'threat';

const QUADRANT_META: Record<
  QuadrantType,
  { label: string; badgeTheme: string; analystNote?: string }
> = {
  strength: { label: 'Strengths', badgeTheme: 'success' },
  weakness: { label: 'Weaknesses', badgeTheme: 'warning' },
  opportunity: { label: 'Opportunities', badgeTheme: 'info' },
  threat: { label: 'Threats', badgeTheme: 'neutral' },
};

const LEAD_GATED_ACCESS = {
  level: 'lead-gated' as const,
  ctaTrigger: 'sample' as const,
  paywallSelector: '.kr-paywall-swot',
  schemaIsAccessibleForFree: false,
};

interface QuadrantCardProps {
  type: QuadrantType;
  bullets: string[];
  index: number;
  prefersReduced: boolean | null;
  onUnlock: () => void;
}

function QuadrantCard({
  type,
  bullets,
  index,
  prefersReduced,
  onUnlock,
}: QuadrantCardProps) {
  const meta = QUADRANT_META[type];
  const publicBullets = bullets.slice(0, 3);
  const extraBullets = bullets.slice(3);

  return (
    <motion.div
      initial={prefersReduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.4,
        ease: 'easeOut',
        delay: prefersReduced ? 0 : Math.min(index, 7) * 0.08,
      }}
    >
      <Card variant="white" padding="md" className="h-full flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <div className="inline-flex">
            <SectionLabel background="light" variant="default">
              {meta.label.toUpperCase()}
            </SectionLabel>
          </div>
          <Badge theme={meta.badgeTheme as 'success' | 'warning' | 'info' | 'neutral'} size="sm">
            {meta.label}
          </Badge>
        </div>

        {/* Public bullets — top 3 */}
        <ul className="flex flex-col gap-2" role="list">
          {publicBullets.map((bullet, i) => (
            <li
              key={i}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 'var(--space-2)',
                fontSize: 'var(--typography-size-sm)',
                color: 'var(--surface-text)',
                lineHeight: 1.6,
              }}
            >
              <Check
                size={13}
                aria-hidden="true"
                style={{
                  flexShrink: 0,
                  marginTop: '3px',
                  color: 'var(--surface-text-muted)',
                }}
              />
              {bullet}
            </li>
          ))}
        </ul>

        {/* Gated expansion — bullets 4+ */}
        {extraBullets.length > 0 && (
          <AccessLevelGate
            access={LEAD_GATED_ACCESS}
            moduleId="swot-expansion"
            sectionName="SWOTQuadrant"
            fallback={
              <button
                type="button"
                onClick={onUnlock}
                style={{
                  fontSize: 'var(--typography-size-compact)',
                  color: 'var(--color-brand-red)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0',
                  fontWeight: 500,
                  textAlign: 'left',
                  minHeight: '44px',
                }}
              >
                Show {extraBullets.length} more — submit to unlock
              </button>
            }
          >
            <ul className="flex flex-col gap-2 pt-2 border-t border-[var(--border-soft)]" role="list">
              {extraBullets.map((bullet, i) => (
                <li
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 'var(--space-2)',
                    fontSize: 'var(--typography-size-sm)',
                    color: 'var(--surface-text)',
                    lineHeight: 1.6,
                  }}
                >
                  <Check
                    size={13}
                    aria-hidden="true"
                    style={{
                      flexShrink: 0,
                      marginTop: '3px',
                      color: 'var(--surface-text-muted)',
                    }}
                  />
                  {bullet}
                </li>
              ))}
            </ul>
          </AccessLevelGate>
        )}
      </Card>
    </motion.div>
  );
}

export function SWOTQuadrant({ data, reportSlug }: Props) {
  const prefersReduced = useReducedMotion();
  const { openForm } = useLeadFormModal();
  const dispatch = useAnalytics();

  if (!data || !data.quadrants || data.quadrants.length === 0) return null;

  const handleUnlock = () => {
    dispatch('lead_wall_triggered', {
      section_name: 'SWOTQuadrant',
      access_level: 'lead-gated',
    });
    openForm('sample', { reportSlug, sectionName: 'SWOTQuadrant' });
  };

  const orderedTypes: QuadrantType[] = [
    'strength',
    'weakness',
    'opportunity',
    'threat',
  ];

  const quadrantMap = Object.fromEntries(
    data.quadrants.map((q) => [q.type, q]),
  ) as Record<QuadrantType, (typeof data.quadrants)[number] | undefined>;

  // Analyst note — from any quadrant that has one, or default
  const analystNote =
    data.quadrants.find((q) => q.analystNote)?.analystNote ??
    'Market fragmentation creates simultaneous risk and opportunity — operators with integrated cold-storage and cold-transport capabilities are best positioned for the 2024–2027 growth window.';

  return (
    <SectionWrapper
      background="white"
      spacing="lg"
      maxWidth="wide"
      id="sec-swot"
    >
      {/* Header */}
      <motion.div
        initial={prefersReduced ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="inline-flex mb-3">
          <SectionLabel background="light" variant="default">
            SWOT ANALYSIS
          </SectionLabel>
        </div>
        <SectionHeading level={2} align="left">
          {data.heading}
        </SectionHeading>
      </motion.div>

      {/* 2×2 Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-8">
        {orderedTypes.map((type, index) => {
          const q = quadrantMap[type];
          if (!q) return null;
          return (
            <QuadrantCard
              key={type}
              type={type}
              bullets={q.bullets}
              index={index}
              prefersReduced={prefersReduced}
              onUnlock={handleUnlock}
            />
          );
        })}
      </div>

      {/* Analyst note */}
      <motion.div
        initial={prefersReduced ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.4, ease: 'easeOut', delay: prefersReduced ? 0 : 0.24 }}
        style={{
          marginTop: 'var(--space-8)',
          padding: 'var(--space-4) var(--space-5)',
          borderLeft: '2px solid var(--color-ramp-warm-400)',
          background: 'var(--color-ramp-warm-50)',
          borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
        }}
      >
        <p
          style={{
            fontSize: 'var(--typography-size-sm)',
            color: 'var(--surface-text-muted)',
            fontStyle: 'italic',
            lineHeight: 1.65,
          }}
        >
          {analystNote}
        </p>
        <p
          style={{
            fontSize: 'var(--typography-size-compact)',
            color: 'var(--surface-text-muted)',
            marginTop: 'var(--space-2)',
            fontWeight: 500,
          }}
        >
          — Geetanshi Chugh, Senior Analyst, Logistics &amp; Supply Chain
        </p>
      </motion.div>
    </SectionWrapper>
  );
}
