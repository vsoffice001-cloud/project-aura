'use client';

/**
 * CRAFT (aura-craft step 4.5 · 2026-05-12)
 * Lead: section heading (SectionHeading level={2} · text-2xl · analyst-led framing above logo strip)
 * Type rhythm: 2xl/lg/base/xs — SectionHeading = text-2xl · section subtitle = text-lg · company card title = text-base · descriptor = text-sm · meta = text-xs
 * Motion: logo strip horizontal scroll momentum (CSS scroll-snap) · company cards CardReveal stagger 80ms (whileInView · once) · gated matrix Lock icon fade
 *   — useReducedMotion disables card stagger; renders at final state
 * Depth: subtle-shadows on company cards (border + --shadow-card-default · hover --shadow-card-hover translateY(-2px)) · logo strip pills = border-only (warm bg, no shadow)
 * Mobile: logo strip horizontal-scroll single row · company cards 1-col stack · comparison table horizontal scroll · stack column default
 */

/**
 * CompetitorLandscapeModule — Competitor landscape (recipe row 23)
 *
 * Variant: editorial-light
 * Background: warm · spacing: lg (LOCK 3)
 * STANDALONE section — has own SectionWrapper
 *
 * Contains:
 *   - Overview text
 *   - Logo strip (horizontal-scroll mobile · wrap desktop)
 *   - Market share chart placeholder (lead-gated)
 *   - Positioning matrix placeholder (lead-gated)
 *   - Company cards grid (names + descriptions always visible · deep data gated)
 *   - CompetitorComparisonTable (nested — NO extra SectionWrapper)
 *
 * Public minimum: major player names + logos always visible
 * A11y: company cards = <article> with <h3> · logos with alt · locked rows aria-label
 * useReducedMotion mandatory
 */

import { motion, useReducedMotion } from 'framer-motion';
import { Lock } from 'lucide-react';
import {
  SectionWrapper,
  SectionHeading,
  SectionLabel,
  Button,
  Badge,
  Card,
  Divider,
} from '@kenresearch/design-system/atoms';
import { CompetitorComparisonTable } from './CompetitorComparisonTable';
import { useLeadFormModal } from '@/components/LeadFormModalProvider';
import type { MatrixModule } from '@/types/schema';

// ─── Mock-derived shape ───────────────────────────────────────────────────────

export interface CompetitorCard {
  id: string;
  name: string;
  logoUrl?: string;
  estYear?: number;
  services: string;
  pallets?: number;
  occupancyPct?: number;
  facilities?: number;
  tech?: string;
  marketSharePct?: number;
  strategicNote?: string;
}

export interface CompetitorLandscape {
  overview: string;
  totalPlayers: string;
  cards: CompetitorCard[];
  comparisonMatrix?: MatrixModule;
}

export interface CompetitorLandscapeModuleProps {
  landscape: CompetitorLandscape;
  reportSlug?: string;
}

// ─── Logo strip ──────────────────────────────────────────────────────────────

interface LogoStripProps {
  cards: CompetitorCard[];
}

function LogoStrip({ cards }: LogoStripProps) {
  return (
    <div
      className="overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0"
      role="list"
      aria-label="Major competitor logos"
    >
      <div className="flex gap-4 min-w-max sm:min-w-0 sm:flex-wrap">
        {cards.map((card) => (
          <div
            key={card.id}
            role="listitem"
            className="flex flex-col items-center gap-1.5 shrink-0"
          >
            <div
              role="img"
              className="w-16 h-16 rounded-[var(--radius-card)] border flex items-center justify-center"
              style={{
                backgroundColor: 'var(--color-foundation-white)',
                borderColor: 'var(--border-soft)',
              }}
              aria-label={`${card.name} logo`}
            >
              {card.logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={card.logoUrl}
                  alt={`${card.name} logo`}
                  className="w-10 h-10 object-contain"
                  onError={(e) => {
                    // Fallback initials if logo fails to load
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      const initials = document.createElement('span');
                      initials.className = 'text-sm font-display font-medium';
                      initials.textContent = card.name.slice(0, 2).toUpperCase();
                      parent.appendChild(initials);
                    }
                  }}
                />
              ) : (
                <span className="text-sm font-display font-medium" style={{ color: 'var(--surface-text-muted)' }}>
                  {card.name.slice(0, 2).toUpperCase()}
                </span>
              )}
            </div>
            <span className="text-compact font-body text-center" style={{ color: 'var(--surface-text-muted)', maxWidth: '72px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {card.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Company card ─────────────────────────────────────────────────────────────

interface CompanyCardProps {
  card: CompetitorCard;
  delayIndex: number;
  shouldReduceMotion: boolean;
}

function CompanyCard({ card, delayIndex, shouldReduceMotion }: CompanyCardProps) {
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
      <article aria-label={`Competitor: ${card.name}`}>
        <Card padding="md" className="h-full flex flex-col gap-3">
          {/* Header: logo + name + est year */}
          <div className="flex items-start gap-3">
            <div
              className="w-10 h-10 rounded-[var(--radius-sm)] border flex items-center justify-center shrink-0"
              style={{
                backgroundColor: 'var(--color-ramp-warm-100)',
                borderColor: 'var(--border-soft)',
              }}
              aria-hidden="true"
            >
              <span className="text-xs font-display font-semibold" style={{ color: 'var(--surface-text-muted)' }}>
                {card.name.slice(0, 2).toUpperCase()}
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <h3 className="text-base font-display font-medium leading-tight" style={{ color: 'var(--color-foundation-black)' }}>
                {card.name}
              </h3>
              {card.estYear && (
                <span className="text-compact font-body" style={{ color: 'var(--surface-text-muted)' }}>
                  Est. {card.estYear}
                </span>
              )}
            </div>
          </div>

          {/* Services */}
          <p className="text-compact font-body leading-relaxed flex-1" style={{ color: 'var(--surface-text-muted)' }}>
            {card.services}
          </p>

          {/* Market share badge (public minimum) */}
          {card.marketSharePct !== undefined && (
            <div className="flex flex-wrap gap-2">
              <Badge theme="neutral" variant="rounded">{card.marketSharePct}% pallet share</Badge>
            </div>
          )}

          {/* Tech + facilities — partially gated */}
          {(card.tech || card.facilities) && (
            <div
              className="flex flex-col gap-1.5 pt-2"
              style={{ borderTop: '1px solid var(--border-soft)' }}
            >
              {card.facilities !== undefined && (
                <span className="text-compact font-body" style={{ color: 'var(--surface-text-muted)' }}>
                  <strong style={{ color: 'var(--color-foundation-black)' }}>Facilities:</strong> {card.facilities}
                </span>
              )}
              {card.tech && (
                <span className="text-compact font-body" style={{ color: 'var(--surface-text-muted)' }}>
                  <strong style={{ color: 'var(--color-foundation-black)' }}>Tech:</strong> {card.tech}
                </span>
              )}
            </div>
          )}

          {/* Strategic note */}
          {card.strategicNote && (
            <p
              className="text-compact font-body italic"
              style={{ color: 'var(--surface-text-muted)', borderTop: '1px solid var(--border-soft)', paddingTop: '0.5rem' }}
            >
              {card.strategicNote}
            </p>
          )}
        </Card>
      </article>
    </motion.li>
  );
}

// ─── Chart placeholder ───────────────────────────────────────────────────────

function ChartPlaceholder({ label, isLocked }: { label: string; isLocked: boolean }) {
  return (
    <div
      className="relative rounded-[var(--radius-card)] overflow-hidden"
      style={{
        backgroundColor: 'var(--color-ramp-warm-100)',
        border: '1px dashed var(--border-default)',
        minHeight: '200px',
      }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4">
        {isLocked && (
          <Lock size={20} style={{ color: 'var(--surface-text-muted)' }} aria-hidden="true" />
        )}
        <p className="text-compact font-body text-center" style={{ color: 'var(--surface-text-muted)' }}>
          {label}
        </p>
        {isLocked && (
          <span
            className="text-compact font-body"
            aria-label="Locked — sign in to unlock"
            style={{ color: 'var(--surface-text-muted)' }}
          >
            Submit form to unlock full chart
          </span>
        )}
      </div>
      {/* Blur overlay for gated state */}
      {isLocked && (
        <div
          className="absolute inset-0"
          style={{ backdropFilter: 'blur(4px)', backgroundColor: 'rgba(245,242,241,0.6)' }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function CompetitorLandscapeModule({
  landscape,
  reportSlug = '',
}: CompetitorLandscapeModuleProps) {
  const { openForm } = useLeadFormModal();
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <SectionWrapper background="warm" spacing="lg" id="competitor-landscape">
      <div className="flex flex-col gap-10">
        {/* Section heading */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div>
            <SectionLabel>Competitive Landscape</SectionLabel>
            <SectionHeading level={2} align="left">
              Competitor Analysis
            </SectionHeading>
            <p className="mt-2 text-compact font-body max-w-2xl" style={{ color: 'var(--surface-text-muted)' }}>
              {landscape.overview}
            </p>
          </div>
          <Badge theme="muted" variant="rounded" className="shrink-0">
            {landscape.totalPlayers} active players
          </Badge>
        </motion.div>

        {/* Logo strip — public */}
        <div className="flex flex-col gap-3">
          <h3 className="text-base font-display font-medium" style={{ color: 'var(--color-foundation-black)' }}>
            Major Players
          </h3>
          <LogoStrip cards={landscape.cards} />
        </div>

        <Divider />

        {/* Charts row — lead-gated */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-compact font-display font-medium" style={{ color: 'var(--surface-text-muted)' }}>
              Market Share by Pallet Positions (2022)
            </p>
            <ChartPlaceholder
              label="Market share chart — lead-gated"
              isLocked={true}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-compact font-display font-medium" style={{ color: 'var(--surface-text-muted)' }}>
              Positioning Matrix — Pallet Positions × Occupancy
            </p>
            <ChartPlaceholder
              label="Positioning matrix — lead-gated"
              isLocked={true}
            />
          </div>
        </div>

        {/* CTA to unlock charts */}
        <div className="flex justify-center">
          <Button
            variant="secondary"
            size="md"
            onClick={() =>
              openForm('analyst-call', {
                reportSlug,
                ctaLocation: 'competitor-landscape-charts',
                sectionName: 'competitor-landscape',
              })
            }
          >
            Talk to Analyst
          </Button>
        </div>

        <Divider />

        {/* Company cards grid — public */}
        <div className="flex flex-col gap-6">
          <h3 className="text-base font-display font-medium" style={{ color: 'var(--color-foundation-black)' }}>
            Company Profiles
          </h3>
          <ul
            className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6"
            aria-label="Competitor company profiles"
          >
            {landscape.cards.map((card, idx) => (
              <CompanyCard
                key={card.id}
                card={card}
                delayIndex={idx}
                shouldReduceMotion={shouldReduceMotion}
              />
            ))}
          </ul>
        </div>

        <Divider />

        {/* Comparison table — nested inside this section, no extra SectionWrapper */}
        {landscape.comparisonMatrix && (
          <CompetitorComparisonTable
            matrix={landscape.comparisonMatrix}
            reportSlug={reportSlug}
            isUnlocked={false}
          />
        )}
      </div>
    </SectionWrapper>
  );
}
