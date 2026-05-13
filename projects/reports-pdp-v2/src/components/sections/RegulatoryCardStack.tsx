'use client';

/**
 * CRAFT (aura-craft step 4.5 · 2026-05-12)
 * Lead: authority name (text-xl font-display font-medium · h3 in article · Shield icon precedes at same visual weight)
 * Type rhythm: xl/base/sm/xs — authority name = text-xl · governance area = text-base · callout pairs = text-sm dt + text-compact dd · buyer implication = text-compact italic
 * Motion: static — regulatory content = reference material · users scan not read · motion distracts from compliance lookup
 *   Framer stagger 60ms card entrance (whileInView · once) — useReducedMotion disables
 * Depth: subtle-shadows — Card border + --shadow-card-default · gated callout = blur(3px) Lock overlay · white card on white bg → shadow required
 * Mobile: 1-col stack · 2-col md · callout dl stacks vertically · stack column default
 */

/**
 * RegulatoryCardStack — 5 callouts per regulation (recipe row 26)
 *
 * Variant: editorial-light
 * Background: white · spacing: lg (LOCK 3)
 * STANDALONE section — has own SectionWrapper
 *
 * Per card: Authority · What it governs · Impacted participants · Compliance relevance · Buyer implication
 * Public: all authority names + governance areas always visible
 * Deep compliance detail: lead-gated (teaser shown, blur + sign-in CTA)
 *
 * A11y: <article> with <h3> authority name · 5 callouts as <dl> <dt> <dd>
 * Grid: grid-cols-1 md:grid-cols-2 · stagger 60ms
 * useReducedMotion mandatory
 */

import { motion, useReducedMotion } from 'framer-motion';
import { Lock, Shield } from 'lucide-react';
import {
  SectionWrapper,
  SectionHeading,
  SectionLabel,
  Card,
  Button,
} from '@kenresearch/design-system/atoms';
import type { CardGridModule, GridCard } from '@/types/schema';
import { useLeadFormModal } from '@/components/LeadFormModalProvider';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface RegulatoryCardStackProps {
  regulations: CardGridModule;
  reportSlug?: string;
}

// ─── Regulatory card ──────────────────────────────────────────────────────────

interface RegulatoryCardProps {
  card: GridCard;
  delayIndex: number;
  shouldReduceMotion: boolean;
  onUnlock: () => void;
  isDetailLocked?: boolean;
}

function RegulatoryCard({
  card,
  delayIndex,
  shouldReduceMotion,
  onUnlock,
  isDetailLocked = false,
}: RegulatoryCardProps) {
  const hasComplianceData = !!card.compliance;

  return (
    <motion.li
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
        delay: shouldReduceMotion ? 0 : delayIndex * 0.06,
      }}
      className="list-none"
    >
      <article
        aria-label={`Regulation: ${card.title}`}
        className="h-full"
      >
        <Card padding="md" className="flex flex-col gap-4 h-full">
          {/* Authority header */}
          <div className="flex items-start gap-3">
            <div
              className="w-9 h-9 rounded-[var(--radius-sm)] flex items-center justify-center shrink-0"
              style={{ backgroundColor: 'var(--color-ramp-periwinkle-100)' }}
              aria-hidden="true"
            >
              <Shield size={16} aria-hidden />
            </div>
            <h3
              className="text-base font-display font-medium leading-snug"
              style={{ color: 'var(--color-foundation-black)' }}
            >
              {card.title}
            </h3>
          </div>

          {/* What it governs — always public */}
          <p
            className="text-compact font-body leading-relaxed"
            style={{ color: 'var(--surface-text-muted)' }}
          >
            {card.body}
          </p>

          {/* 5-callout definition list · wrapped in positioning container for lock overlay */}
          {hasComplianceData && card.compliance ? (
            <div className="relative">
            <dl className="flex flex-col gap-2.5">
              {/* Authority */}
              <div>
                <dt className="text-compact font-display font-medium" style={{ color: 'var(--surface-text-muted)' }}>
                  Authority
                </dt>
                <dd className="text-compact font-body mt-0.5" style={{ color: 'var(--color-foundation-black)' }}>
                  {card.compliance.authority}
                </dd>
              </div>

              {/* Governed area */}
              <div>
                <dt className="text-compact font-display font-medium" style={{ color: 'var(--surface-text-muted)' }}>
                  Governs
                </dt>
                <dd className="text-compact font-body mt-0.5" style={{ color: 'var(--color-foundation-black)' }}>
                  {card.compliance.governs}
                </dd>
              </div>

              {/* Impacted participants */}
              <div
                style={{
                  filter: isDetailLocked ? 'blur(3px)' : 'none',
                  userSelect: isDetailLocked ? 'none' : 'auto',
                }}
                aria-label={isDetailLocked ? 'Locked — sign in to unlock' : undefined}
              >
                <dt className="text-compact font-display font-medium" style={{ color: 'var(--surface-text-muted)' }}>
                  Impacted participants
                </dt>
                <dd className="text-compact font-body mt-0.5" style={{ color: 'var(--color-foundation-black)' }}>
                  {isDetailLocked ? 'Sign in to view' : card.compliance.impacted}
                </dd>
              </div>

              {/* Compliance relevance */}
              <div
                style={{
                  filter: isDetailLocked ? 'blur(3px)' : 'none',
                  userSelect: isDetailLocked ? 'none' : 'auto',
                }}
                aria-label={isDetailLocked ? 'Locked — sign in to unlock' : undefined}
              >
                <dt className="text-compact font-display font-medium" style={{ color: 'var(--surface-text-muted)' }}>
                  Compliance relevance
                </dt>
                <dd className="text-compact font-body mt-0.5" style={{ color: 'var(--color-foundation-black)' }}>
                  {isDetailLocked ? 'Sign in to view' : card.compliance.relevance}
                </dd>
              </div>

              {/* Buyer implication */}
              <div
                style={{
                  filter: isDetailLocked ? 'blur(3px)' : 'none',
                  userSelect: isDetailLocked ? 'none' : 'auto',
                }}
                aria-label={isDetailLocked ? 'Locked — sign in to unlock' : undefined}
              >
                <dt className="text-compact font-display font-medium" style={{ color: 'var(--surface-text-muted)' }}>
                  Buyer implication
                </dt>
                <dd className="text-compact font-body mt-0.5" style={{ color: 'var(--color-foundation-black)' }}>
                  {isDetailLocked ? 'Sign in to view' : card.compliance.buyerImplication}
                </dd>
              </div>
            </dl>

            {/* Lock CTA overlay (sibling of dl per axe a11y) */}
            {isDetailLocked && (
              <div
                className="absolute inset-0 flex items-center justify-center"
                aria-live="polite"
              >
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={onUnlock}
                  aria-label="Sign in to unlock full compliance details"
                >
                  <Lock size={12} aria-hidden className="mr-1" />
                  Unlock details
                </Button>
              </div>
            )}
            </div>
          ) : (
            /* Fallback: no compliance object — show body + lock indicator */
            <div
              className="rounded-[var(--radius-sm)] p-3 flex items-center gap-2"
              style={{
                backgroundColor: 'var(--color-ramp-warm-100)',
                border: '1px dashed var(--border-soft)',
              }}
              aria-label="Locked — sign in to unlock full compliance details"
            >
              <Lock size={13} style={{ color: 'var(--surface-text-muted)' }} aria-hidden="true" />
              <span className="text-compact font-body" style={{ color: 'var(--surface-text-muted)' }}>
                Detailed compliance breakdown locked
              </span>
            </div>
          )}
        </Card>
      </article>
    </motion.li>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function RegulatoryCardStack({ regulations, reportSlug = '' }: RegulatoryCardStackProps) {
  const { openForm } = useLeadFormModal();
  const shouldReduceMotion = useReducedMotion() ?? false;

  if (!regulations.cards || regulations.cards.length === 0) return null;

  const handleUnlock = () => {
    openForm('sample', {
      reportSlug,
      ctaLocation: 'regulatory-card-stack',
      sectionName: 'regulatory',
    });
  };

  return (
    <SectionWrapper background="white" spacing="lg" id="regulatory-landscape">
      <div className="flex flex-col gap-8">
        {/* Heading */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionLabel>Regulatory Landscape</SectionLabel>
          <SectionHeading level={2} align="left">
            {regulations.heading ?? 'Regulatory Landscape'}
          </SectionHeading>
          <p className="mt-2 text-compact font-body" style={{ color: 'var(--surface-text-muted)' }}>
            Key regulations governing the Australia cold chain market — food safety, transport, biosecurity, and compliance obligations.
          </p>
        </motion.div>

        {/* Cards grid */}
        <ul
          className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6"
          aria-label="Regulatory landscape cards"
        >
          {regulations.cards.map((card, idx) => (
            <RegulatoryCard
              key={card.id}
              card={card}
              delayIndex={idx}
              shouldReduceMotion={shouldReduceMotion}
              onUnlock={handleUnlock}
              isDetailLocked={!card.compliance}
            />
          ))}
        </ul>

        {/* Bottom CTA */}
        <div className="flex justify-center">
          <Button
            variant="secondary"
            size="md"
            onClick={handleUnlock}
          >
            Download Sample for Full Compliance Breakdown
          </Button>
        </div>
      </div>
    </SectionWrapper>
  );
}
