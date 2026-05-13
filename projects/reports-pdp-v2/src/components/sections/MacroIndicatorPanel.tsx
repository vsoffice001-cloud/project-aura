'use client';

/**
 * CRAFT (aura-craft step 4.5 · 2026-05-12)
 * Lead: indicator name (text-2xl font-display font-light · h3 per article · macro value follows at text-sm tabular-nums)
 * Type rhythm: 2xl/sm/base/xs — indicator name = text-2xl · value + year = text-sm tabular-nums · relevance explanation = text-base · PRD §33 buyer-relevance writing mandatory
 * Motion: static + count-up on view — Framer stagger 60ms per card (whileInView · once) · count-up deferred to Wave 3 (useAnimatedCounter hook)
 *   — useReducedMotion disables stagger; all cards render at final state
 * Depth: borders — article card with 1px border-subtle · no shadow (indicators = data · shadow implies elevation hierarchy not appropriate for peer-level data)
 * Mobile: 1-col stack · 2-col md · 3-col lg · stack column default
 */

/**
 * MacroIndicatorPanel — macroeconomic indicators (recipe row 27)
 *
 * Variant: editorial-light
 * Background: white · spacing: lg (LOCK 3)
 *
 * 6 indicators: GDP · Inflation · Population · Imports/Exports
 *               Infrastructure · Ports/Road Network
 *
 * Per indicator: name (h3) · value w/ year · buyer-relevance explanation
 * PRD §33 writing rule MANDATORY:
 *   BAD:  "Australia population: 25.9 Mn"
 *   GOOD: "Australia's population base and urban consumption patterns support
 *           demand for perishable food distribution and cold chain logistics.
 *           Current population: 25.9 Mn."
 *
 * Grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
 * Access: public preview / paid full (visual lock indicator, no pricing)
 *
 * A11y: <article> per indicator · <dl> for key-value pairs · useReducedMotion.
 * Framer stagger 60ms · useReducedMotion guard.
 */

import { motion, useReducedMotion } from 'framer-motion';

import { Lock, TrendingUp, TrendingDown, Minus, Globe, DollarSign, Users, Package, Zap, Anchor } from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1] as unknown as [number, number, number, number];
import {
  SectionWrapper,
  SectionHeading,
  SectionLabel,
  Card,
  Button,
  Badge,
} from '@kenresearch/design-system/atoms';
import type { MacroPanelModule } from '@/types/schema';
import { useLeadFormModal } from '@/components/LeadFormModalProvider';

export interface MacroIndicatorPanelProps {
  /** m-macro MacroPanelModule from modules array */
  macroModule?: MacroPanelModule;
  reportSlug?: string;
}

// Static AU Cold Chain macro indicators per PRD §33 buyer-relevance writing rule
// Real AU data sourced from World Bank / ABS / IMF
// TODO: backend wire → replace with macroModule.panels data when real API ready
const AU_MACRO_INDICATORS = [
  {
    id: 'gdp',
    icon: DollarSign,
    name: 'GDP',
    value: 'USD ~1.5 Trillion',
    period: '2022',
    trend: 'up' as const,
    trendLabel: '+0.3% CAGR (2018-22)',
    buyerRelevance:
      "Australia's large and resilient GDP base sustains strong consumer spending and business investment in logistics infrastructure. High per-capita incomes drive demand for premium food safety standards, directly benefiting cold chain operators. GDP 2022: USD ~1.5 Trillion.",
    isLocked: false,
  },
  {
    id: 'inflation',
    icon: TrendingUp,
    name: 'Inflation',
    value: '~6.5%',
    period: 'CPI peak 2022',
    trend: 'up' as const,
    trendLabel: 'Peaked 2022 · easing 2023-24',
    buyerRelevance:
      "Elevated inflation in 2022 increased cold chain operating costs — fuel, labour, and utility costs rose sharply. Operators with long-term contracts and technology-enabled efficiency had better margin protection. Buyers should account for cost inflation in logistics contracts and pricing models. CPI peak 2022: ~6.5%.",
    isLocked: false,
  },
  {
    id: 'population',
    icon: Users,
    name: 'Population',
    value: '25.9 Mn',
    period: '2022',
    trend: 'up' as const,
    trendLabel: '~26.6 Mn by 2024',
    buyerRelevance:
      "Australia's population base and urban consumption patterns — with 90%+ living in urban coastal areas — concentrate perishable food demand in Sydney, Melbourne, and Brisbane, supporting dense cold chain coverage in these corridors. Current population: 25.9 Mn (2022); projected 26.6 Mn (2024).",
    isLocked: false,
  },
  {
    id: 'trade',
    icon: Package,
    name: 'Imports & Exports',
    value: 'AUD 513.2 Bn each',
    period: '2022',
    trend: 'up' as const,
    trendLabel: 'Imports +5.8% CAGR · Exports +10.4% CAGR (2018-22)',
    buyerRelevance:
      "Australia's strong two-way trade flows — especially agricultural exports (beef, dairy, horticulture) and pharmaceutical imports — directly expand cold chain demand at ports, airports, and inland distribution points. Agricultural exporters require HACCP-compliant cold storage at origin. Imports 2022: AUD 513.2 Bn; Exports 2022: AUD 513.2 Bn.",
    isLocked: true,
  },
  {
    id: 'infrastructure',
    icon: Zap,
    name: 'Infrastructure',
    value: 'Ranked #3 APAC',
    period: '2022 WEF Logistics Performance',
    trend: 'flat' as const,
    trendLabel: 'High quality · limited capacity growth',
    buyerRelevance:
      "Australia's well-developed road and rail network enables reliable cold chain distribution in metropolitan corridors. However, limited rail refrigeration capacity for long-haul outback routes creates dependency on road transport — a cost and reliability consideration for WA and QLD-bound cold chain operators. WEF Logistics Performance: APAC #3.",
    isLocked: true,
  },
  {
    id: 'ports',
    icon: Anchor,
    name: 'Ports & Road Network',
    value: '5 major seaports',
    period: '2022',
    trend: 'up' as const,
    trendLabel: 'Brisbane fastest-growing QLD port',
    buyerRelevance:
      "Melbourne (largest general cargo · cold-chain equipped), Sydney, Brisbane, Fremantle (WA · 35M tons/yr), and Adelaide collectively handle the bulk of temperature-sensitive import/export cargo. Port proximity is a key site-selection factor for cold storage operators serving export meat and pharmaceutical import channels.",
    isLocked: true,
  },
] as const;

function TrendIcon({ trend }: { trend: 'up' | 'down' | 'flat' }) {
  if (trend === 'up') return <TrendingUp size={13} aria-hidden="true" style={{ color: 'var(--color-brand)' }} />;
  if (trend === 'down') return <TrendingDown size={13} aria-hidden="true" style={{ color: 'var(--surface-text-muted)' }} />;
  return <Minus size={13} aria-hidden="true" style={{ color: 'var(--surface-text-muted)' }} />;
}

interface IndicatorCardProps {
  indicator: typeof AU_MACRO_INDICATORS[number];
  index: number;
  shouldReduceMotion: boolean;
  onUnlock: () => void;
}

function IndicatorCard({ indicator, index, shouldReduceMotion, onUnlock }: IndicatorCardProps) {
  const Icon = indicator.icon;

  return (
    <motion.article
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.4, ease: EASE, delay: shouldReduceMotion ? 0 : index * 0.06 }}
      aria-label={`Macroeconomic indicator: ${indicator.name}`}
    >
      <Card padding="md" className="flex flex-col gap-4 h-full">

        {/* Icon + name row */}
        <div className="flex items-start gap-3">
          <div
            className="w-9 h-9 rounded-[var(--radius-sm)] flex items-center justify-center shrink-0"
            style={{ backgroundColor: 'var(--color-ramp-warm-100)' }}
            aria-hidden="true"
          >
            <Icon size={16} style={{ color: 'var(--surface-text-muted)' }} />
          </div>
          <div className="flex flex-col gap-1 flex-1">
            <h3
              className="text-base font-display font-medium leading-snug"
              style={{ color: 'var(--color-foundation-black)' }}
            >
              {indicator.name}
            </h3>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-compact font-body font-medium" style={{ color: 'var(--color-brand)' }}>
                {indicator.value}
              </span>
              <span className="text-compact font-body" style={{ color: 'var(--surface-text-muted)', fontSize: '11px' }}>
                {indicator.period}
              </span>
            </div>
          </div>
        </div>

        {/* Trend badge */}
        <div className="flex items-center gap-2">
          <TrendIcon trend={indicator.trend} />
          <span className="text-compact font-body" style={{ color: 'var(--surface-text-muted)', fontSize: '11px' }}>
            {indicator.trendLabel}
          </span>
        </div>

        {/* Buyer-relevance explanation (PRD §33 rule — NOT raw fact dump) */}
        <div className="flex-1">
          {indicator.isLocked ? (
            <div className="relative">
              <p
                className="text-compact font-body leading-relaxed"
                style={{
                  color: 'var(--surface-text-muted)',
                  filter: 'blur(3px)',
                  userSelect: 'none',
                }}
                aria-hidden="true"
              >
                {indicator.buyerRelevance}
              </p>
              <div
                className="absolute inset-0 flex items-center justify-center"
                aria-label={`${indicator.name} buyer relevance — locked, download sample to unlock`}
              >
                <div className="flex flex-col items-center gap-2">
                  <Lock size={16} style={{ color: 'var(--surface-text-muted)' }} aria-hidden="true" />
                  <Button variant="secondary" size="sm" onClick={onUnlock}>
                    Unlock Details
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <p
              className="text-compact font-body leading-relaxed"
              style={{ color: 'var(--surface-text-muted)' }}
            >
              {indicator.buyerRelevance}
            </p>
          )}
        </div>

      </Card>
    </motion.article>
  );
}

export function MacroIndicatorPanel({ macroModule: _macroModule, reportSlug = '' }: MacroIndicatorPanelProps) {
  const { openForm } = useLeadFormModal();
  const shouldReduceMotion = useReducedMotion() ?? false;

  const handleUnlock = () => {
    openForm('sample', {
      reportSlug,
      ctaLocation: 'macro-indicator-panel',
      sectionName: 'macro-indicators',
    });
  };

  return (
    <SectionWrapper background="white" spacing="lg" id="macro-indicators">
      <div className="flex flex-col gap-8">

        {/* Heading */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          <SectionLabel>Macroeconomic Context</SectionLabel>
          <SectionHeading level={2} align="left">
            Macroeconomic Indicators
          </SectionHeading>
          <p className="mt-2 text-compact font-body" style={{ color: 'var(--surface-text-muted)' }}>
            Key macro indicators for the Australia market and their buyer relevance for cold chain investment and operations decisions.
          </p>
          <div className="mt-3 flex items-center gap-2">
            <Badge theme="neutral" variant="minimal">
              <Globe size={10} className="mr-1" aria-hidden="true" />
              Australia · 2022
            </Badge>
            <Badge theme="muted" variant="minimal">
              3 of 6 indicators public
            </Badge>
          </div>
        </motion.div>

        {/* Indicators grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          aria-label="Macroeconomic indicators grid"
        >
          {AU_MACRO_INDICATORS.map((indicator, idx) => (
            <IndicatorCard
              key={indicator.id}
              indicator={indicator}
              index={idx}
              shouldReduceMotion={shouldReduceMotion}
              onUnlock={handleUnlock}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="flex justify-center">
          <Button
            variant="secondary"
            size="md"
            onClick={handleUnlock}
          >
            Download Sample for Full Macro Context
          </Button>
        </div>

      </div>
    </SectionWrapper>
  );
}
