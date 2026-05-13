'use client';

/**
 * FutureOutlookModule — Row 26 — Recipe report-detail.md line 67
 * bg: warm-300 · spacing: lg · motion: Framer chart fade-up
 * Forecast summary (2-col card) · Chart (ChartCard reuse) · Drivers · Assumptions preview (last 2 locked) · Dataset CTA
 */

import { motion, useReducedMotion } from 'framer-motion';
import { Lock } from 'lucide-react';
import {
  SectionWrapper,
  SectionHeading,
  SectionLabel,
  Card,
  Badge,
  Button,
} from '@kenresearch/design-system/atoms';
import { AccessLevelGate } from '@/components/AccessLevelGate';
import { ChartCard } from '@/components/sections/ChartCard';
import { useLeadFormModal } from '@/components/LeadFormModalProvider';
import { useAnalytics } from '@/hooks/useAnalytics';
import type { ChartModule } from '@/types/schema';

const FORECAST_DRIVERS = [
  'E-commerce growth driving last-mile cold delivery demand across metro and regional Australia.',
  'Pharmaceutical cold chain expansion linked to rising healthcare spend and biotech logistics.',
  'International food trade regulations tightening temperature compliance requirements.',
  'IoT-enabled monitoring reducing spoilage costs and enabling premium service pricing.',
];

const FORECAST_ASSUMPTIONS = [
  'Base-year GDP growth maintained at 2.1% through 2024 per IMF APAC outlook.',
  'No major global cold chain supply disruption through forecast period.',
  'Perishable e-commerce share of total e-commerce grows from 6% to 9% by 2027.',
  'Average warehouse utilization improves from 78% to 84% as new capacity comes online.', // locked
  'Refrigerated transport fleet expands at 6% annually in line with demand trajectory.', // locked
];

const LOCKED_FROM_INDEX = 3; // last 2 assumptions gated

const LEAD_GATED_ACCESS = {
  level: 'paid' as const,
  ctaTrigger: 'dataset-unlock' as const,
  paywallSelector: '.kr-paywall-forecast-assumptions',
  schemaIsAccessibleForFree: false,
};

interface Props {
  chart: ChartModule | null;
  reportSlug: string;
  marketSize?: string;
  forecastValue?: string;
  cagr?: string;
  period?: string;
}

export function FutureOutlookModule({
  chart,
  reportSlug,
  marketSize = 'AUD 6,547.8 Mn',
  forecastValue = 'AUD 10,705.0 Mn',
  cagr = '10.03%',
  period = '2022-2027',
}: Props) {
  const prefersReduced = useReducedMotion();
  const { openForm } = useLeadFormModal();
  const dispatch = useAnalytics();

  const handleDatasetUnlock = () => {
    dispatch('dataset_unlock_click', {
      section_name: 'FutureOutlookModule',
      cta_location: 'section-footer',
    });
    openForm('dataset-unlock', { reportSlug, sectionName: 'FutureOutlook' });
  };

  return (
    <SectionWrapper background="warm" spacing="lg" id="sec-future">
      <SectionLabel>Forecast</SectionLabel>
      <SectionHeading level={2} className="mt-2 mb-8">
        Future Outlook {period}
      </SectionHeading>

      {/* Forecast summary — 2-col card */}
      <motion.div
        initial={prefersReduced ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-48px' }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="mb-8"
      >
        <Card variant="white" padding="lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left — key numbers */}
            <div className="flex flex-col gap-5">
              <div>
                <p
                  className="text-xs uppercase tracking-wider mb-1 font-medium"
                  style={{ color: 'var(--color-neutral-500, #6b7280)' }}
                >
                  Market size {period.split('-')[0]}
                </p>
                <p
                  className="font-[var(--typography-family-display)] font-semibold tabular-nums"
                  style={{ fontSize: 'var(--typography-size-2xl)', color: 'var(--color-foundation-black)' }}
                >
                  {marketSize}
                </p>
              </div>
              <div>
                <p
                  className="text-xs uppercase tracking-wider mb-1 font-medium"
                  style={{ color: 'var(--color-neutral-500, #6b7280)' }}
                >
                  Forecast {period.split('-')[1]}
                </p>
                <p
                  className="font-[var(--typography-family-display)] font-semibold tabular-nums"
                  style={{ fontSize: 'var(--typography-size-2xl)', color: 'var(--color-foundation-black)' }}
                >
                  {forecastValue}
                </p>
              </div>
              <div className="mt-auto pt-2">
                <Badge theme="purple">CAGR {cagr} ({period})</Badge>
              </div>
            </div>

            {/* Right — outlook paragraph */}
            <div className="flex flex-col justify-center gap-3">
              <p
                className="font-[var(--typography-family-display)] font-medium leading-snug"
                style={{ fontSize: 'var(--typography-size-lg)', color: 'var(--color-foundation-black)' }}
              >
                The market enters an accelerated growth trajectory through 2027.
              </p>
              <p
                className="leading-relaxed"
                style={{ fontSize: 'var(--typography-size-sm)', color: 'var(--color-neutral-700, #374151)' }}
              >
                Structural tailwinds — perishable goods demand, e-commerce, pharmaceutical cold chain expansion, and IoT investment — sustain above-average growth across both storage and transport segments. The {period.split('-')[1]} forecast reflects continued infrastructure investment across NSW, Victoria, and Queensland.
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Forecast chart — reuse ChartCard */}
      {chart && (
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-48px' }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-10"
        >
          <ChartCard module={chart} reportSlug={reportSlug} />
        </motion.div>
      )}

      {/* Drivers + Assumptions — 2-col grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Forecast drivers */}
        <div>
          <h3
            className="font-[var(--typography-family-display)] font-semibold mb-4"
            style={{ fontSize: 'var(--typography-size-lg)', color: 'var(--color-foundation-black)' }}
          >
            Key growth drivers
          </h3>
          <ul className="flex flex-col gap-3">
            {FORECAST_DRIVERS.map((d, i) => (
              <li key={i} className="flex items-start gap-3">
                <span
                  className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                  style={{ background: 'var(--color-brand-red, #b01f24)' }}
                  aria-hidden="true"
                >
                  <span
                    className="block w-1.5 h-1.5 rounded-full"
                    style={{ background: 'var(--color-foundation-white)' }}
                  />
                </span>
                <p style={{ fontSize: 'var(--typography-size-sm)', color: 'var(--color-neutral-700, #374151)', lineHeight: '1.6' }}>
                  {d}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Forecast assumptions — last 2 paid-gated */}
        <div>
          <h3
            className="font-[var(--typography-family-display)] font-semibold mb-4"
            style={{ fontSize: 'var(--typography-size-lg)', color: 'var(--color-foundation-black)' }}
          >
            Model assumptions preview
          </h3>
          <ul className="flex flex-col gap-3">
            {FORECAST_ASSUMPTIONS.map((a, i) => {
              if (i < LOCKED_FROM_INDEX) {
                return (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                      style={{ background: 'var(--color-ramp-periwinkle-200)' }}
                      aria-hidden="true"
                    >
                      <span
                        className="block w-1.5 h-1.5 rounded-full"
                        style={{ background: 'var(--color-ramp-periwinkle-700, #4338ca)' }}
                      />
                    </span>
                    <p style={{ fontSize: 'var(--typography-size-sm)', color: 'var(--color-neutral-700, #374151)', lineHeight: '1.6' }}>
                      {a}
                    </p>
                  </li>
                );
              }
              return null;
            })}
          </ul>

          {/* Locked assumptions */}
          <AccessLevelGate
            access={LEAD_GATED_ACCESS}
            sectionName="FutureOutlookModule"
          >
            <ul className="flex flex-col gap-3 mt-3">
              {FORECAST_ASSUMPTIONS.slice(LOCKED_FROM_INDEX).map((a, i) => (
                <li key={i} className="flex items-start gap-3 opacity-60">
                  <Lock size={16} className="shrink-0 mt-0.5" style={{ color: 'var(--color-neutral-400, #9ca3af)' }} />
                  <p style={{ fontSize: 'var(--typography-size-sm)', color: 'var(--color-neutral-500, #6b7280)', lineHeight: '1.6' }}>
                    {a}
                  </p>
                </li>
              ))}
            </ul>
          </AccessLevelGate>
        </div>
      </div>

      {/* Dataset unlock CTA */}
      <div className="mt-10 flex justify-center">
        <Button
          variant="secondary"
          size="lg"
          onClick={handleDatasetUnlock}
        >
          Unlock Forecast Data
        </Button>
      </div>
    </SectionWrapper>
  );
}
