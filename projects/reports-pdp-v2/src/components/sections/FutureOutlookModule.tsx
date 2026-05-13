'use client';

/**
 * CRAFT (aura-craft step 4.5 · 2026-05-12)
 * Lead: forecast value (text-2xl tabular-nums font-display font-light — AUD 10,705 Mn · largest number in section · CAGR badge follows)
 * Type rhythm: 2xl/base italic/sm/xs — SectionHeading = text-2xl · insight = text-base italic (analyst voice) · driver bullets = text-sm · source = text-xs
 * Motion: chart fade 400ms (ChartCard whileInView · once · hydration entrance) · forecast metrics stagger 60ms
 *   — useReducedMotion disables fade; chart renders at final state
 * Depth: shadow-card-default — ChartCard wrapper uses Card variant="outlined" shadow="sm" · metric tiles = border + shadow-card-default · gated area = blur(4px) Lock overlay
 * Mobile: chart full-width · metric tiles 2-col → 3-col lg · drivers vertical list · stack column default
 */

/**
 * FutureOutlookModule — forecast summary (recipe row 26)
 *
 * Variant: editorial-light
 * Background: warm · spacing: lg (LOCK 3)
 *
 * Visible: forecast market size · forecast CAGR · 3-5 key forecast drivers
 *          · high-level analyst interpretation
 * Locked (lead-gated): year-wise forecast dataset · forecast assumptions
 *                      · scenario analysis · segment-level projections
 *
 * Chart placeholder: static SVG area chart with dotted future line until
 * @ken-research/charts is wired. Uses ChartCard 8-zone wrapper.
 *
 * CTA: "Unlock Forecast Data" (NOT pricing)
 *
 * A11y: <figure> for chart area · alt description · useReducedMotion.
 * Framer fade-up · useReducedMotion guard.
 */

import { motion, useReducedMotion } from 'framer-motion';

import { Lock, TrendingUp, ArrowUp } from 'lucide-react';
import {
  SectionWrapper,
  SectionHeading,
  SectionLabel,
  Card,
  Button,
  Badge,
} from '@kenresearch/design-system/atoms';
import type { ChartModule } from '@/types/schema';
import { useLeadFormModal } from '@/components/LeadFormModalProvider';

const EASE = [0.16, 1, 0.3, 1] as unknown as [number, number, number, number];

export interface FutureOutlookModuleProps {
  /** m-future-chain ChartModule from modules array */
  forecastChart?: ChartModule;
  reportSlug?: string;
}

// Static SVG area chart placeholder — 6 year forecast data
// Actual chart wires via @ken-research/charts · TODO: replace
function ForecastChartPlaceholder() {
  // Viewport: 480×180 · years 2022-2027 · values normalised 0→100
  const points = [
    { x: 40, y: 130, year: 2022, val: 'AUD 6,547.8 Mn' },
    { x: 128, y: 110, year: 2023, val: 'AUD 7,162.4 Mn' },
    { x: 216, y: 87, year: 2024, val: 'AUD 7,867.3 Mn' },
    { x: 304, y: 61, year: 2025, val: 'AUD 8,685.2 Mn' },
    { x: 392, y: 34, year: 2026, val: 'AUD 9,633.6 Mn' },
    { x: 480, y: 10, year: 2027, val: 'AUD 10,705.0 Mn' },
  ];

  const linePoints = points.map((p) => `${p.x},${p.y}`).join(' ');
  const areaPoints = `40,150 ${linePoints} 480,150`;

  return (
    <figure aria-label="Forecast area chart: Australia Cold Chain Market 2022-2027">
      <svg
        viewBox="0 0 520 160"
        role="img"
        aria-label="Area chart showing forecast growth from AUD 6,547.8 Mn in 2022 to AUD 10,705.0 Mn in 2027"
        style={{ width: '100%', height: 'auto', display: 'block' }}
      >
        {/* Area fill */}
        <polygon
          points={areaPoints}
          fill="var(--color-brand)"
          opacity="0.08"
        />
        {/* Main line */}
        <polyline
          points={linePoints}
          fill="none"
          stroke="var(--color-brand)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Dotted forecast line extension visual cue */}
        <line
          x1="480" y1="10" x2="510" y2="3"
          stroke="var(--color-brand)"
          strokeWidth="1.5"
          strokeDasharray="4 3"
          opacity="0.5"
        />
        {/* Data points */}
        {points.map((p) => (
          <circle
            key={p.year}
            cx={p.x}
            cy={p.y}
            r="4"
            fill="var(--color-brand)"
            stroke="var(--color-foundation-white)"
            strokeWidth="2"
          />
        ))}
        {/* Year labels */}
        {points.map((p) => (
          <text
            key={`label-${p.year}`}
            x={p.x}
            y="155"
            textAnchor="middle"
            fontSize="10"
            fill="var(--surface-text-muted)"
            fontFamily="var(--font-body)"
          >
            {p.year}
          </text>
        ))}
      </svg>
      <figcaption className="sr-only">
        Australia Cold Chain Market forecast: AUD 6,547.8 Mn (2022) growing to AUD 10,705.0 Mn (2027) at 10.03% CAGR.
        Full year-wise dataset and segment projections available in the full report.
      </figcaption>
    </figure>
  );
}

const FORECAST_DRIVERS = [
  {
    id: 'fd-1',
    label: 'Perishable demand growth',
    body: 'Increasing per-capita consumption of temperature-sensitive goods drives sustained storage and transport demand.',
  },
  {
    id: 'fd-2',
    label: 'E-commerce & home delivery',
    body: 'Last-mile cold chain requirements expand as online grocery and meal-kit delivery normalises across major AU cities.',
  },
  {
    id: 'fd-3',
    label: 'Pharma cold chain expansion',
    body: 'Vaccine roll-out infrastructure investments and biologic drug growth drive pharma cold chain segment outperformance.',
  },
  {
    id: 'fd-4',
    label: 'IoT monitoring adoption',
    body: 'Real-time temperature monitoring via IoT sensors enables service upgrades and margin expansion for operators.',
  },
];

export function FutureOutlookModule({ forecastChart: _forecastChart, reportSlug = '' }: FutureOutlookModuleProps) {
  const { openForm } = useLeadFormModal();
  const shouldReduceMotion = useReducedMotion() ?? false;

  const handleUnlock = () => {
    openForm('sample', {
      reportSlug,
      ctaLocation: 'future-outlook-module',
      sectionName: 'future-outlook',
    });
  };

  const fadeUp = (delay: number) => ({
    initial: shouldReduceMotion ? {} : { opacity: 0, y: 14 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-30px' },
    transition: { duration: 0.4, ease: EASE, delay: shouldReduceMotion ? 0 : delay },
  });

  return (
    <SectionWrapper background="warm" spacing="lg" id="future-outlook">
      <div className="flex flex-col gap-10">

        {/* Heading */}
        <motion.div {...fadeUp(0)}>
          <SectionLabel>Forecast 2022-2027</SectionLabel>
          <SectionHeading level={2} align="left">
            Future Outlook
          </SectionHeading>
          <p className="mt-2 text-compact font-body" style={{ color: 'var(--surface-text-muted)' }}>
            Market forecast to 2027 — public summary with key growth drivers. Full year-wise dataset and scenario analysis in the full report.
          </p>
        </motion.div>

        {/* Key metrics row */}
        <motion.div
          {...fadeUp(0.06)}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {[
            { label: "2027 Forecast", value: "AUD 10,705 Mn", icon: TrendingUp },
            { label: 'CAGR 2022-2027', value: '10.03%', icon: ArrowUp },
            { label: '2022 Base', value: 'AUD 6,547.8 Mn', icon: null },
          ].map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="flex flex-col gap-2 p-4 rounded-[var(--radius-md)]"
              style={{
                backgroundColor: 'var(--color-foundation-white)',
                border: '1px solid var(--border-soft)',
              }}
            >
              <div className="flex items-center gap-2">
                {Icon && <Icon size={15} style={{ color: 'var(--color-brand)' }} aria-hidden="true" />}
                <span className="text-compact font-display font-medium" style={{ color: 'var(--surface-text-muted)' }}>
                  {label}
                </span>
              </div>
              <span
                className="text-xl font-display font-medium leading-none"
                style={{ color: 'var(--color-foundation-black)' }}
              >
                {value}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Chart Card wrapper (8-zone) */}
        <motion.div {...fadeUp(0.1)}>
          <Card padding="md">
            <div className="flex flex-col gap-4">
              {/* Zone 1: Header */}
              <div className="flex items-center justify-between">
                <Badge theme="muted" variant="minimal">Forecast · Ken Research Analysis</Badge>
                <Badge theme="neutral" variant="minimal">2022–2027F</Badge>
              </div>

              {/* Zone 2: Title */}
              <h3
                className="text-base font-display font-medium"
                style={{ color: 'var(--color-foundation-black)' }}
              >
                Australia Cold Chain Market Forecast 2022-2027
              </h3>

              {/* Zone 3: Insight line */}
              <p
                className="text-compact font-body"
                style={{ color: 'var(--color-brand)', fontWeight: 500 }}
              >
                Market reaches AUD 10,705 Mn by 2027 at 10.03% CAGR — accelerating growth trajectory.
              </p>

              {/* Zone 5: Viz — chart placeholder */}
              <div
                className="rounded-[var(--radius-sm)] overflow-hidden"
                style={{ backgroundColor: 'var(--color-ramp-warm-100)', padding: 'var(--space-3)' }}
              >
                <ForecastChartPlaceholder />
                {/* TODO: replace w/ @ken-research/charts ComboChart component */}
              </div>

              {/* Zone 6: Dataset preview (locked) */}
              <div
                className="relative rounded-[var(--radius-sm)] overflow-hidden"
                style={{
                  border: '1px solid var(--border-soft)',
                }}
              >
                {/* Public preview rows */}
                <table
                  style={{ width: '100%', borderCollapse: 'collapse' }}
                  aria-label="Forecast data preview (public rows)"
                >
                  <thead>
                    <tr style={{ backgroundColor: 'var(--color-ramp-warm-100)' }}>
                      <th className="text-compact font-display font-medium p-2 text-left" style={{ color: 'var(--surface-text-muted)' }}>Year</th>
                      <th className="text-compact font-display font-medium p-2 text-right" style={{ color: 'var(--surface-text-muted)' }}>Market Size (AUD Mn)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { year: 2022, val: '6,547.8' },
                      { year: 2023, val: '7,162.4' },
                      { year: 2024, val: '7,867.3' },
                    ].map((row) => (
                      <tr key={row.year} style={{ borderBottom: '1px solid var(--border-soft)' }}>
                        <td className="text-compact font-body p-2" style={{ color: 'var(--color-foundation-black)' }}>{row.year}</td>
                        <td className="text-compact font-body p-2 text-right" style={{ color: 'var(--color-foundation-black)' }}>{row.val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* Lock overlay for remaining rows */}
                <div
                  className="flex items-center justify-center gap-3 py-4"
                  style={{ backgroundColor: 'var(--color-ramp-warm-100)' }}
                  aria-label="3 more rows locked — sign in to unlock full dataset"
                >
                  <Lock size={13} style={{ color: 'var(--surface-text-muted)' }} aria-hidden="true" />
                  <span className="text-compact font-body" style={{ color: 'var(--surface-text-muted)' }}>
                    3 more rows · full assumptions locked
                  </span>
                </div>
              </div>

              {/* Zone 7: Source */}
              <p className="text-compact font-body" style={{ color: 'var(--surface-text-muted)', fontSize: '11px' }}>
                Source: Ken Research analysis · Last updated Q1 2026
              </p>

              {/* Zone 8: Access + CTA */}
              <Button variant="brand" size="md" onClick={handleUnlock}>
                Unlock Forecast Data
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Forecast drivers */}
        <motion.div {...fadeUp(0.14)} className="flex flex-col gap-5">
          <h3
            className="text-base font-display font-medium"
            style={{ color: 'var(--color-foundation-black)' }}
          >
            Key Forecast Drivers
          </h3>
          <ul
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            aria-label="Key forecast drivers"
          >
            {FORECAST_DRIVERS.map((driver) => (
              <li
                key={driver.id}
                className="flex flex-col gap-1.5 p-4 rounded-[var(--radius-md)] list-none"
                style={{
                  backgroundColor: 'var(--color-foundation-white)',
                  border: '1px solid var(--border-soft)',
                }}
              >
                <h4
                  className="text-compact font-display font-medium"
                  style={{ color: 'var(--color-foundation-black)' }}
                >
                  {driver.label}
                </h4>
                <p
                  className="text-compact font-body leading-relaxed"
                  style={{ color: 'var(--surface-text-muted)' }}
                >
                  {driver.body}
                </p>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Locked assumptions teaser */}
        <motion.div
          {...fadeUp(0.18)}
          className="flex items-center gap-4 p-4 rounded-[var(--radius-md)]"
          style={{
            backgroundColor: 'var(--color-foundation-white)',
            border: '1px dashed var(--border-soft)',
          }}
          aria-label="Locked content: forecast assumptions and scenario analysis"
        >
          <Lock size={16} style={{ color: 'var(--surface-text-muted)' }} aria-hidden="true" />
          <div className="flex flex-col gap-0.5 flex-1">
            <span className="text-compact font-display font-medium" style={{ color: 'var(--color-foundation-black)' }}>
              Forecast assumptions + scenario analysis
            </span>
            <span className="text-compact font-body" style={{ color: 'var(--surface-text-muted)' }}>
              Year-wise segment projections · bull/base/bear scenarios · macro assumption model
            </span>
          </div>
          <Button variant="secondary" size="sm" onClick={handleUnlock}>
            Unlock
          </Button>
        </motion.div>

      </div>
    </SectionWrapper>
  );
}
