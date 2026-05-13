'use client';

/**
 * MarketSizeChart — Row 13 — Recipe report-detail.md line 54
 * bg: white · spacing: lg
 * Thin shell: renders ChartCard w/ the market-size ChartModule.
 * Also renders supporting sub-charts (cold-storage, cold-transport).
 */

import { motion, useReducedMotion } from 'framer-motion';
import {
  SectionWrapper,
  SectionHeading,
  SectionLabel,
} from '@kenresearch/design-system/atoms';
import { ChartCard } from '@/components/sections/ChartCard';
import type { ChartModule } from '@/types/schema';

interface Props {
  /** Primary market-size chart module */
  module: ChartModule;
  /** Supporting sub-charts (cold storage, cold transport, etc.) */
  subModules?: ChartModule[];
  reportSlug: string;
}

export function MarketSizeChart({ module, subModules, reportSlug }: Props) {
  const prefersReduced = useReducedMotion();

  return (
    <SectionWrapper
      background="white"
      spacing="lg"
      maxWidth="wide"
      id="sec-sizing"
    >
      <motion.div
        initial={prefersReduced ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="inline-flex mb-3">
          <SectionLabel background="light" variant="default">
            MARKET SIZE &amp; FORECAST
          </SectionLabel>
        </div>
        <SectionHeading level={2} align="left">
          Market Size
        </SectionHeading>
        <p
          style={{
            fontSize: 'var(--typography-size-sm)',
            color: 'var(--surface-text-muted)',
            marginTop: 'var(--space-3)',
            maxWidth: '60ch',
            lineHeight: 1.6,
          }}
        >
          Historic market size and five-year forecast for the Australia Cold Chain Market.
        </p>
      </motion.div>

      {/* Primary chart */}
      <div className="mt-8">
        <ChartCard module={module} reportSlug={reportSlug} />
      </div>

      {/* Sub-charts — 2-col desktop */}
      {subModules && subModules.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {subModules.map((sub) => (
            <ChartCard key={sub.id} module={sub} reportSlug={reportSlug} />
          ))}
        </div>
      )}
    </SectionWrapper>
  );
}
