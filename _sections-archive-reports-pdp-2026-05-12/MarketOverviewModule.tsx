'use client';

/**
 * MarketOverviewModule — Row 9 — Recipe report-detail.md line 50
 * bg: white · spacing: lg · motion: Framer fade-up
 * 2-col asymmetric: 60% narrative + 40% visual anchor
 * Accepts MarketOverviewModule from schema (PRD §15)
 */

import { motion, useReducedMotion } from 'framer-motion';
import {
  SectionWrapper,
  SectionHeading,
  SectionLabel,
} from '@kenresearch/design-system/atoms';
import type { MarketOverviewModule as MarketOverviewModuleType } from '@/types/schema';

interface Props {
  overview: MarketOverviewModuleType;
}

export function MarketOverviewModule({ overview }: Props) {
  const prefersReduced = useReducedMotion();

  // Determine visual anchor type
  const anchor = overview.visualAnchor;
  const isKeyStat = anchor && 'kind' in anchor && anchor.kind === 'key-stat';
  const isInfographic = anchor && 'kind' in anchor && anchor.kind === 'infographic';
  const isChart = anchor && 'type' in anchor && anchor.type === 'chart';

  return (
    <SectionWrapper
      background="white"
      spacing="lg"
      maxWidth="wide"
      id="sec-market-overview"
    >
      <motion.div
        initial={prefersReduced ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="inline-flex mb-3">
          <SectionLabel background="light" variant="default">
            MARKET OVERVIEW
          </SectionLabel>
        </div>
        <SectionHeading level={2} align="left">
          {overview.heading ?? 'Market Overview'}
        </SectionHeading>
        {overview.insightLine && (
          <p
            style={{
              fontFamily: 'var(--typography-family-display)',
              fontSize: 'var(--typography-size-lg)',
              color: 'var(--surface-text)',
              marginTop: 'var(--space-4)',
              fontStyle: 'italic',
              borderLeft: '3px solid var(--color-brand-red)',
              paddingLeft: 'var(--space-4)',
              maxWidth: '72ch',
            }}
          >
            {overview.insightLine}
          </p>
        )}
      </motion.div>

      {/* 2-col asymmetric layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-8">
        {/* 60% — narrative */}
        <motion.div
          className="lg:col-span-3"
          initial={prefersReduced ? false : { opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
        >
          <div className="flex flex-col gap-6">
            {overview.narrativeSections.map((section) => (
              <div key={section.h3}>
                {section.h3 && (
                  <h3
                    style={{
                      fontFamily: 'var(--typography-family-display)',
                      fontSize: 'var(--typography-size-base)',
                      fontWeight: 600,
                      color: 'var(--surface-text)',
                      marginBottom: 'var(--space-2)',
                    }}
                  >
                    {section.h3}
                  </h3>
                )}
                <p
                  style={{
                    fontSize: 'var(--typography-size-sm)',
                    color: 'var(--surface-text-muted)',
                    lineHeight: 1.7,
                  }}
                >
                  {section.body}
                </p>
              </div>
            ))}
          </div>

          {overview.analystNote && (
            <div
              style={{
                marginTop: 'var(--space-6)',
                padding: 'var(--space-4)',
                borderRadius: 'var(--radius-card)',
                background: 'var(--color-ramp-warm-50)',
                border: '1px solid var(--color-ramp-warm-200)',
                fontSize: 'var(--typography-size-sm)',
                color: 'var(--surface-text-muted)',
                fontStyle: 'italic',
              }}
            >
              <span
                style={{
                  fontWeight: 600,
                  color: 'var(--surface-text)',
                  fontStyle: 'normal',
                }}
              >
                Analyst note:{' '}
              </span>
              {overview.analystNote}
            </div>
          )}
        </motion.div>

        {/* 40% — visual anchor */}
        <motion.div
          className="lg:col-span-2"
          initial={prefersReduced ? false : { opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
        >
          {isKeyStat && (
            <div
              style={{
                borderRadius: 'var(--radius-card)',
                border: '1px solid var(--border-soft)',
                background: 'var(--color-ramp-warm-50)',
                padding: 'var(--space-8)',
                textAlign: 'center',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--typography-family-display)',
                  fontSize: 'var(--typography-size-4xl, 2.25rem)',
                  fontWeight: 700,
                  color: 'var(--surface-text)',
                  lineHeight: 1,
                }}
              >
                —
              </p>
              <p
                style={{
                  fontSize: 'var(--typography-size-sm)',
                  color: 'var(--surface-text-muted)',
                  marginTop: 'var(--space-2)',
                }}
              >
                Key stat reference: {(anchor as { kind: 'key-stat'; statId: string }).statId}
              </p>
            </div>
          )}

          {isInfographic && (
            <figure>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={(anchor as { kind: 'infographic'; imageUrl: string; alt: string; caption: string }).imageUrl}
                alt={(anchor as { kind: 'infographic'; imageUrl: string; alt: string; caption: string }).alt}
                style={{
                  width: '100%',
                  borderRadius: 'var(--radius-card)',
                  border: '1px solid var(--border-soft)',
                }}
              />
              <figcaption
                style={{
                  fontSize: 'var(--typography-size-compact)',
                  color: 'var(--surface-text-muted)',
                  marginTop: 'var(--space-2)',
                }}
              >
                {(anchor as { kind: 'infographic'; imageUrl: string; alt: string; caption: string }).caption}
              </figcaption>
            </figure>
          )}

          {isChart && (
            <div
              style={{
                borderRadius: 'var(--radius-card)',
                border: '1px solid var(--border-soft)',
                background: 'var(--color-ramp-warm-50)',
                padding: 'var(--space-6)',
                minHeight: '200px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <p
                style={{
                  fontSize: 'var(--typography-size-sm)',
                  color: 'var(--surface-text-muted)',
                }}
              >
                {/* Chart wired in Phase C */}
                Chart: {(anchor as { type: 'chart'; heading?: string }).heading ?? 'Market chart'}
              </p>
            </div>
          )}

          {!anchor && (
            <div
              style={{
                borderRadius: 'var(--radius-card)',
                border: '1px solid var(--border-soft)',
                background: 'var(--color-ramp-warm-50)',
                padding: 'var(--space-8)',
                textAlign: 'center',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--typography-family-display)',
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  fontWeight: 700,
                  color: 'var(--surface-text)',
                  lineHeight: 1,
                }}
              >
                AUD 6.5 Bn
              </p>
              <p
                style={{
                  fontSize: 'var(--typography-size-sm)',
                  color: 'var(--surface-text-muted)',
                  marginTop: 'var(--space-2)',
                }}
              >
                Market size 2022
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
