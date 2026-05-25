'use client';

/**
 * CRAFT (aura-craft step 4.5 · 2026-05-12)
 * Lead: section heading (SectionHeading level={2} text-2xl · parent-level framing anchors all 4 children — SWOT · Drivers · ValueChain · Challenges)
 * Type rhythm: 2xl/lg/base/xs — SectionHeading = text-2xl · subtitle = text-lg · child sections use their own rhythm (no override from parent)
 * Motion: static optional stagger — Divider line between intro and children fades in (opacity 0→1 200ms) · children self-animate
 *   — useReducedMotion: parent static; children handle their own reduced-motion
 * Depth: warm bg no shadow — SectionWrapper background="warm" · no card shadow at parent level · children manage their own depth
 * Mobile: stack column · children flow below intro · stack column default
 */

/**
 * IndustryAnalysisModule — Parent wrapper for industry dynamics (recipe row 17)
 *
 * Variant: editorial-light
 * Background: warm · spacing: lg (LOCK 3)
 *
 * THIS IS A PARENT WRAPPER ONLY.
 * Renders intro/eyebrow + slot for children.
 * Wave 3 fills children: SWOTQuadrant · GrowthDriversCardGrid · ValueChainStepper · ChallengesSolutionsTable
 *
 * No SectionWrapper on children — this wrapper's SectionWrapper handles the background.
 * Children receive data-industry-child attribute for selector specificity.
 */

import { type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { SectionWrapper, SectionHeading, Divider } from '@kenresearch/design-system/atoms';

export interface IndustryAnalysisModuleProps {
  children?: ReactNode;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
}

export function IndustryAnalysisModule({
  children,
  eyebrow = 'Industry Dynamics',
  title = 'Industry Analysis',
  subtitle = 'SWOT · Growth Drivers · Value Chain · Challenges & Solutions',
}: IndustryAnalysisModuleProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <SectionWrapper background="warm" spacing="lg" id="industry-analysis">
      <div className="flex flex-col gap-8">
        {/* Intro / eyebrow */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionHeading
            level={2}
            eyebrow={eyebrow}
            align="left"
          >
            {title}
          </SectionHeading>
          {subtitle && (
            <p
              className="mt-3 text-compact font-body"
              style={{ color: 'var(--semantic-ink-body)' }}
            >
              {subtitle}
            </p>
          )}
        </motion.div>

        <Divider />

        {/* Children slot — Wave 3 fills this */}
        <div data-industry-children>
          {children ?? (
            <div
              className="py-10 rounded-[var(--radius-card)] flex items-center justify-center"
              style={{
                backgroundColor: 'var(--color-ramp-warm-100)',
                border: '1px dashed var(--border-default)',
              }}
              aria-label="Industry analysis subsections — Wave 3 placeholder"
            >
              <p
                className="text-compact font-body text-center"
                style={{ color: 'var(--surface-text-muted)' }}
              >
                Wave 3 · SWOT · Growth Drivers · Value Chain · Challenges
              </p>
            </div>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
}
