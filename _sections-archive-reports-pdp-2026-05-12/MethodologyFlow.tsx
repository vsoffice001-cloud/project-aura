'use client';

/**
 * MethodologyFlow — Row 28 — Recipe report-detail.md line 69
 * bg: warm-300 · spacing: lg · motion: Framer fade-up
 * 6 steps: Secondary · Primary · Triangulation · Sanity Check · Forecast Modeling · Analyst Validation
 * Desktop: horizontal flow w/ connecting arrows · Mobile: vertical <ol> numbered
 * AccessLevelGate per step tier
 */

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import {
  SectionWrapper,
  SectionHeading,
  SectionLabel,
  Card,
  Badge,
  Button,
} from '@kenresearch/design-system/atoms';
import { AccessLevelGate } from '@/components/AccessLevelGate';
import { useLeadFormModal } from '@/components/LeadFormModalProvider';
import { useAnalytics } from '@/hooks/useAnalytics';
import type { Methodology } from '@/types/schema';

type MethodologyStepKey = Methodology['steps'][number];

interface StepConfig {
  key: MethodologyStepKey;
  label: string;
  description: string;
  accessTier: 'public' | 'lead-gated' | 'paid';
  accessNote?: string;
}

const STEP_CONFIGS: StepConfig[] = [
  {
    key: 'secondary-research',
    label: 'Secondary Research',
    description: 'Company reports, trade publications, government databases (Department of Agriculture, IMF, World Bank, NMIS), industry associations.',
    accessTier: 'public',
  },
  {
    key: 'primary-research',
    label: 'Primary Research',
    description: 'CATI interviews with 30+ cold chain operators — C-level, directors, and business development heads across Sydney, Melbourne, Brisbane, Perth, and Adelaide.',
    accessTier: 'public',
  },
  {
    key: 'triangulation',
    label: 'Data Triangulation',
    description: 'Cross-validation of primary and secondary data sources. Pallet counts, occupancy rates, and revenue estimates reconciled across captive and non-captive operators.',
    accessTier: 'lead-gated',
    accessNote: 'Triangulation methodology detail available with sample download.',
  },
  {
    key: 'sanity-checking',
    label: 'Sanity Checking',
    description: 'Desk-based validation of pallet/warehouse counts, financial parameters. NMIS warehouse data used as primary cross-check reference.',
    accessTier: 'public',
  },
  {
    key: 'forecast-modeling',
    label: 'Forecast Modeling',
    description: 'Bottom-up forecast model with demand-side and supply-side inputs. GDP, population, trade, and infrastructure variables integrated.',
    accessTier: 'paid',
    accessNote: 'Full forecast model and assumptions available with report access.',
  },
  {
    key: 'analyst-validation',
    label: 'Analyst Validation',
    description: 'Senior analyst review of all findings, narrative, and data integrity. Final sign-off by lead analyst with 6+ years APAC cold chain coverage.',
    accessTier: 'paid',
    accessNote: 'Analyst notes and validation summary in full report.',
  },
];

const ACCESS_MAP = {
  'lead-gated': {
    level: 'lead-gated' as const,
    ctaTrigger: 'sample' as const,
    paywallSelector: '.kr-paywall-methodology-triangulation',
    schemaIsAccessibleForFree: false,
  },
  paid: {
    level: 'paid' as const,
    ctaTrigger: 'sample' as const,
    paywallSelector: '.kr-paywall-methodology-model',
    schemaIsAccessibleForFree: false,
  },
};

interface Props {
  methodology: Methodology | null;
  reportSlug: string;
}

interface StepCardProps {
  config: StepConfig;
  stepNumber: number;
  index: number;
  prefersReduced: boolean | null;
}

function StepCard({ config, stepNumber, index, prefersReduced }: StepCardProps) {
  const isPublic = config.accessTier === 'public';
  const accessControl = isPublic
    ? null
    : ACCESS_MAP[config.accessTier as keyof typeof ACCESS_MAP];

  const stepContent = (
    <Card variant="white" padding="md" className="h-full flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div
          className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm"
          style={{
            background: isPublic ? 'var(--color-brand-red, #b01f24)' : 'var(--color-ramp-periwinkle-200)',
            color: isPublic ? 'var(--color-foundation-white)' : 'var(--color-ramp-periwinkle-700, #4338ca)',
          }}
          aria-hidden="true"
        >
          {stepNumber}
        </div>
        <h3
          className="font-[var(--typography-family-display)] font-semibold leading-tight"
          style={{ fontSize: 'var(--typography-size-base)', color: 'var(--color-foundation-black)' }}
        >
          {config.label}
        </h3>
      </div>

      <p
        className="leading-relaxed"
        style={{ fontSize: 'var(--typography-size-sm)', color: 'var(--color-neutral-700, #374151)' }}
      >
        {config.description}
      </p>

      <div className="mt-auto">
        <Badge theme={isPublic ? 'neutral' : config.accessTier === 'lead-gated' ? 'purple' : 'neutral'}>
          {isPublic ? 'Public' : config.accessTier === 'lead-gated' ? 'Lead-gated' : 'Report access'}
        </Badge>
      </div>
    </Card>
  );

  const wrappedContent = (
    <motion.div
      initial={prefersReduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
      className="h-full"
    >
      {stepContent}
    </motion.div>
  );

  if (!accessControl) return wrappedContent;

  return (
    <motion.div
      initial={prefersReduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
      className="h-full"
    >
      <AccessLevelGate
        access={accessControl}
        sectionName="MethodologyFlow"
      >
        {stepContent}
      </AccessLevelGate>
    </motion.div>
  );
}

export function MethodologyFlow({ methodology, reportSlug }: Props) {
  const prefersReduced = useReducedMotion();
  const { openForm } = useLeadFormModal();
  const dispatch = useAnalytics();

  const handleSampleDownload = () => {
    dispatch('sample_cta_click', {
      section_name: 'MethodologyFlow',
      cta_location: 'methodology-footer',
    });
    openForm('sample', { reportSlug, sectionName: 'MethodologyFlow' });
  };

  // Determine which steps to render from methodology or fall back to STEP_CONFIGS
  const stepsToRender = methodology?.steps
    ? STEP_CONFIGS.filter((c) => methodology.steps.includes(c.key))
    : STEP_CONFIGS;

  if (stepsToRender.length === 0) return null;

  return (
    <SectionWrapper background="warm" spacing="lg" id="sec-methodology">
      <SectionLabel>Methodology</SectionLabel>
      <SectionHeading level={2} className="mt-2 mb-8">
        Research Methodology
      </SectionHeading>

      {/* Desktop: horizontal flow grid · Mobile: vertical stack */}
      {/* ol for semantic step ordering */}
      <ol
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 list-none m-0 p-0"
        aria-label="Research methodology steps"
      >
        {stepsToRender.map((config, i) => (
          <li key={config.key} className="h-full">
            <StepCard
              config={config}
              stepNumber={i + 1}
              index={i}
              prefersReduced={prefersReduced}
            />
          </li>
        ))}
      </ol>

      {/* Connecting arrow decoration — desktop only, purely decorative */}
      <div className="hidden lg:flex items-center justify-center mt-6 gap-2" aria-hidden="true">
        <div
          className="h-px flex-1"
          style={{ background: 'var(--border-default)' }}
        />
        <ArrowUpRight size={16} style={{ color: 'var(--color-neutral-400, #9ca3af)' }} />
        <div
          className="h-px flex-1"
          style={{ background: 'var(--border-default)' }}
        />
      </div>

      {/* Bottom CTA */}
      <div className="mt-10 flex justify-center">
        <Button
          variant="brand"
          size="lg"
          onClick={handleSampleDownload}
          animatedArrow
        >
          Download Sample Report
        </Button>
      </div>
    </SectionWrapper>
  );
}
