'use client';

/**
 * CRAFT (aura-craft step 4.5 · 2026-05-12)
 * Section type: Definitions glossary
 * Lead element: term name (h3 text-base font-display font-light — each card leads with the term)
 * Support: definition body (text-compact font-body) + in-scope/excluded lists + related segment badges
 * Type rhythm: 2xl/base/sm/micro — term = text-base font-display (lead) · body = text-compact · labels = text-2xs uppercase
 *   NOTE: term at text-base rather than text-2xl (headline) — DECISION: glossary cards are dense; text-base appropriate for card H3
 *   section SectionHeading level={2} = text-2xl DS default (correct for section heading)
 * Motion event: stagger fade-up 0.07s delay per card (1 event total as group) · static otherwise
 *   — useReducedMotion disables; cards render at final state
 * Depth: Card variant="white" shadow="sm" (white card on warm bg · border present · shadow for separation)
 *   subtle-shadows depth strategy applied · no glassmorphism · no layered shadows
 * Mobile override: 1-col → md:2-col grid · in-scope/excluded lists stack naturally · badges wrap
 */

/**
 * MarketDefinitionsBlock — Glossary cards (PRD §§ recipe row 9)
 *
 * Variant: editorial-light
 * Background: warm · spacing: lg (LOCK 3)
 * Access: public
 *
 * Layout:
 *   Mobile: stacked cards (grid-cols-1)
 *   Desktop: 2-col grid (md:grid-cols-2)
 *
 * Per definition card:
 *   Term · Definition · In Scope (checklist) · Excluded (checklist) · Related Segments (badge row)
 */

import { motion, useReducedMotion } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';
import {
  SectionWrapper,
  SectionHeading,
  Card,
  Badge,
} from '@kenresearch/design-system/atoms';
import type { DefinitionsModule } from '@/types/schema';

// ─── Term data shape (superset of schema — includes scope/badge fields) ──────

export interface TermEntry {
  term: string;
  body: string;
  icon?: string;
  inScope?: string[];
  excludedScope?: string[];
  relatedSegments?: string[];
}

export interface DefinitionsModuleExtended extends Omit<DefinitionsModule, 'terms'> {
  terms: TermEntry[];
}

export interface MarketDefinitionsBlockProps {
  definitions: DefinitionsModuleExtended[];
}

// ─── DefinitionCard ──────────────────────────────────────────────────────────

function DefinitionCard({
  entry,
  delay,
}: {
  entry: TermEntry;
  delay: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <Card variant="white" padding="lg" shadow="sm">
        <div className="flex flex-col gap-4">
          {/* Term */}
          <h3
            className="text-base font-display font-light leading-snug"
            style={{ color: 'var(--color-foundation-black)' }}
          >
            {entry.term}
          </h3>

          {/* Definition body */}
          <p
            className="text-compact font-body leading-relaxed"
            style={{ color: 'var(--color-foundation-black)' }}
          >
            {entry.body}
          </p>

          {/* In Scope */}
          {entry.inScope && entry.inScope.length > 0 && (
            <div className="flex flex-col gap-1.5">
              <p
                className="text-2xs font-body font-semibold uppercase tracking-wider"
                style={{ color: 'var(--surface-text-muted)' }}
              >
                In Scope
              </p>
              <ul className="flex flex-col gap-1" role="list">
                {entry.inScope.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2
                      size={13}
                      className="shrink-0 mt-0.5"
                      style={{ color: 'var(--color-brand-red)' }}
                      aria-hidden="true"
                    />
                    <span
                      className="text-compact font-body"
                      style={{ color: 'var(--color-foundation-black)' }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Excluded */}
          {entry.excludedScope && entry.excludedScope.length > 0 && (
            <div className="flex flex-col gap-1.5">
              <p
                className="text-2xs font-body font-semibold uppercase tracking-wider"
                style={{ color: 'var(--surface-text-muted)' }}
              >
                Excluded
              </p>
              <ul className="flex flex-col gap-1" role="list">
                {entry.excludedScope.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <XCircle
                      size={13}
                      className="shrink-0 mt-0.5"
                      style={{ color: 'var(--surface-text-muted)' }}
                      aria-hidden="true"
                    />
                    <span
                      className="text-compact font-body"
                      style={{ color: 'var(--surface-text-muted)' }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Related Segments */}
          {entry.relatedSegments && entry.relatedSegments.length > 0 && (
            <div className="flex flex-col gap-1.5">
              <p
                className="text-2xs font-body font-semibold uppercase tracking-wider"
                style={{ color: 'var(--surface-text-muted)' }}
              >
                Related Segments
              </p>
              <div className="flex flex-wrap gap-1.5" role="list">
                {entry.relatedSegments.map((seg) => (
                  <div key={seg} role="listitem">
                    <Badge theme="neutral" size="sm">{seg}</Badge>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}

// ─── MarketDefinitionsBlock ──────────────────────────────────────────────────

export function MarketDefinitionsBlock({ definitions }: MarketDefinitionsBlockProps) {
  // Flatten all terms from all definition groups
  const allTerms = definitions.flatMap((defGroup) => defGroup.terms);
  // Build a heading from the first definition group label, fallback graceful
  const heading = definitions[0]?.heading ?? 'Market Definitions';

  return (
    <SectionWrapper background="warm" spacing="lg" id="market-definitions">
      <div className="flex flex-col gap-8">
        <SectionHeading level={2} eyebrow="Scope &amp; Definitions" align="left">
          {heading}
        </SectionHeading>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {allTerms.map((entry, i) => (
            <DefinitionCard
              key={entry.term}
              entry={entry}
              delay={i * 0.07}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
