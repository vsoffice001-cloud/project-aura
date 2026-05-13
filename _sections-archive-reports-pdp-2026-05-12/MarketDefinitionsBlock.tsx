'use client';

/**
 * MarketDefinitionsBlock — Row 10 — Recipe report-detail.md line 51
 * bg: warm-300 · spacing: lg · motion: Framer fade-up
 * Glossary cards: Term · Definition · In Scope · Excluded · Related Segments
 * Consumes DefinitionsModule from report.modules[] (type: 'definitions')
 */

import { motion, useReducedMotion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import {
  SectionWrapper,
  SectionHeading,
  SectionLabel,
  Card,
  Badge,
} from '@kenresearch/design-system/atoms';
import type { DefinitionsModule } from '@/types/schema';

interface Props {
  definitions: DefinitionsModule[];
}

interface TermCardProps {
  term: DefinitionsModule['terms'][number];
  index: number;
  prefersReduced: boolean | null;
}

function TermCard({ term, index, prefersReduced }: TermCardProps) {
  return (
    <motion.div
      initial={prefersReduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.4,
        ease: 'easeOut',
        delay: prefersReduced ? 0 : Math.min(index, 7) * 0.06,
      }}
    >
      <Card variant="white" padding="md" className="h-full flex flex-col gap-4">
        {/* Term heading */}
        <h3
          style={{
            fontFamily: 'var(--typography-family-display)',
            fontSize: 'var(--typography-size-base)',
            fontWeight: 600,
            color: 'var(--surface-text)',
            lineHeight: 1.3,
          }}
        >
          {term.term}
        </h3>

        {/* Definition body */}
        <p
          style={{
            fontSize: 'var(--typography-size-sm)',
            color: 'var(--surface-text-muted)',
            lineHeight: 1.65,
          }}
        >
          {term.body}
        </p>

        {/* In Scope / Excluded 2-col */}
        {((term.inScope && term.inScope.length > 0) ||
          (term.excludedScope && term.excludedScope.length > 0)) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[var(--border-soft)]">
            {term.inScope && term.inScope.length > 0 && (
              <div>
                <p
                  style={{
                    fontSize: 'var(--typography-size-compact)',
                    fontWeight: 600,
                    color: 'var(--surface-text)',
                    marginBottom: 'var(--space-1)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                  }}
                >
                  In Scope
                </p>
                <ul className="flex flex-col gap-1" role="list">
                  {term.inScope.map((item) => (
                    <li
                      key={item}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 'var(--space-1)',
                        fontSize: 'var(--typography-size-compact)',
                        color: 'var(--surface-text-muted)',
                      }}
                    >
                      <Check
                        size={12}
                        aria-hidden="true"
                        style={{
                          color: '#16a34a',
                          flexShrink: 0,
                          marginTop: '2px',
                        }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {term.excludedScope && term.excludedScope.length > 0 && (
              <div>
                <p
                  style={{
                    fontSize: 'var(--typography-size-compact)',
                    fontWeight: 600,
                    color: 'var(--surface-text)',
                    marginBottom: 'var(--space-1)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                  }}
                >
                  Excluded
                </p>
                <ul className="flex flex-col gap-1" role="list">
                  {term.excludedScope.map((item) => (
                    <li
                      key={item}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 'var(--space-1)',
                        fontSize: 'var(--typography-size-compact)',
                        color: 'var(--surface-text-muted)',
                      }}
                    >
                      <X
                        size={12}
                        aria-hidden="true"
                        style={{
                          color: 'var(--color-brand-red)',
                          flexShrink: 0,
                          marginTop: '2px',
                        }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Related segments as Badge chips — placeholder from icon field if present */}
        {term.icon && (
          <div className="flex flex-wrap gap-2 pt-2">
            <Badge theme="neutral" size="sm">
              {term.icon}
            </Badge>
          </div>
        )}
      </Card>
    </motion.div>
  );
}

export function MarketDefinitionsBlock({ definitions }: Props) {
  const prefersReduced = useReducedMotion();

  // Flatten all terms from all definition modules
  const allTerms = definitions.flatMap((def) => def.terms);

  return (
    <SectionWrapper
      background="warm"
      spacing="lg"
      maxWidth="wide"
      id="sec-definitions"
    >
      <motion.div
        initial={prefersReduced ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="inline-flex mb-3">
          <SectionLabel background="light" variant="default">
            DEFINITIONS
          </SectionLabel>
        </div>
        <SectionHeading level={2} align="left">
          Market Definitions
        </SectionHeading>
        <p
          style={{
            fontSize: 'var(--typography-size-sm)',
            color: 'var(--surface-text-muted)',
            marginTop: 'var(--space-3)',
            maxWidth: '56ch',
            lineHeight: 1.6,
          }}
        >
          Scope boundaries and key terms used throughout this report.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
        {allTerms.map((term, index) => (
          <TermCard
            key={term.term}
            term={term}
            index={index}
            prefersReduced={prefersReduced}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
