'use client';

/**
 * CRAFT (aura-craft step 4.5 · 2026-05-12)
 * Section type: content-dense + tabs
 * Lead element: active tab content (logo grid card right + text summary left)
 * Support: tab bar (horizontal scroll · active = black bg white text · 44px touch)
 *   tier counts as Badge · threshold note as text-2xs · unlock CTA strip at bottom
 * Type rhythm: 2xl/base/sm/xs — SectionHeading level={2} (section lead) · tier label = text-compact font-semibold
 *   logo placeholder = text-compact font-semibold initials · caption = text-2xs font-body
 * Motion event: tab cross-fade 200ms (AnimatePresence mode="wait" · 220ms ease)
 *   — DECISION: single motion event per tab switch · content-motion only · within budget
 *   — useReducedMotion: initial:{} on motion.div · content renders at final state
 * Depth: Card variant="white" shadow="sm" on left summary · Card variant="outlined" shadow="none" on logo grid
 *   logo placeholders: border + warm bg (subtle-shadows · no shadow on 64px squares · appropriate)
 * Mobile override: tab bar horizontal scroll (snap-x · snap-mandatory) · 64px logos wrap naturally
 *   GatedTabContent = centered lock + unlock CTA · full-width card
 */

/**
 * EcosystemTierGrid — Market ecosystem player map (recipe row 11)
 *
 * Variant: editorial-light
 * Background: warm · spacing: lg (LOCK 3)
 *
 * 5 tabs:
 *   Cold Chain (overall) · Cold Storage · Cold Transport · Associations · Certifications
 *
 * Per-tab layout:
 *   Desktop: text summary (left) + logo grid card (right)
 *   Mobile: stacked
 *
 * Logo grid: 4-6 logos · normalized size · placeholder squares for now
 * Caption mandatory under each visual (a11y + SEO + AI extraction)
 *
 * Access: public basic · lead-gated full ecosystem map
 *
 * A11y: ARIA tablist · keyboard nav · 44px min touch targets
 * TODO: promote Tabs component to DS atom after sprint
 */

import { useState, useId } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Lock } from 'lucide-react';
import {
  SectionWrapper,
  SectionHeading,
  Card,
  Button,
  Badge,
} from '@kenresearch/design-system/atoms';
import type { EcosystemModule } from '@/types/schema';
import { useLeadFormModal } from '@/components/LeadFormModalProvider';

// ─── Tab definitions ─────────────────────────────────────────────────────────

const TAB_KEYS = [
  'cold-chain',
  'cold-storage',
  'cold-transport',
  'associations',
  'certifications',
] as const;
type EcoTabKey = (typeof TAB_KEYS)[number];

const TAB_LABELS: Record<EcoTabKey, string> = {
  'cold-chain': 'Cold Chain',
  'cold-storage': 'Cold Storage',
  'cold-transport': 'Cold Transport',
  associations: 'Associations',
  certifications: 'Certifications',
};

// Which tabs are gated
const GATED_TABS: EcoTabKey[] = ['associations', 'certifications'];

// ─── Logo placeholder square ─────────────────────────────────────────────────

function LogoPlaceholder({ name }: { name: string }) {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

  return (
    <div
      role="img"
      className="flex items-center justify-center rounded-[var(--radius-card)] aspect-square w-16 h-16"
      style={{
        backgroundColor: 'var(--color-ramp-warm-200)',
        border: '1px solid var(--border-soft)',
      }}
      aria-label={name}
      title={name}
    >
      <span
        className="text-compact font-body font-semibold"
        style={{ color: 'var(--surface-text-muted)' }}
        aria-hidden="true"
      >
        {initials}
      </span>
    </div>
  );
}

// ─── Tier block ──────────────────────────────────────────────────────────────

function TierBlock({
  label,
  count,
  threshold,
  logos,
  captionSuffix,
}: {
  label: string;
  count: number;
  threshold?: string;
  logos: { name: string; logoUrl: string }[];
  captionSuffix: string;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3 flex-wrap">
        <p
          className="text-compact font-body font-semibold"
          style={{ color: 'var(--color-foundation-black)' }}
        >
          {label}
        </p>
        <Badge theme="neutral" size="sm">
          {count} players
        </Badge>
        {threshold && (
          <span
            className="text-2xs font-body"
            style={{ color: 'var(--surface-text-muted)' }}
          >
            ({threshold})
          </span>
        )}
      </div>

      {/* Logo grid */}
      <div
        className="flex flex-wrap gap-3"
        role="list"
        aria-label={`${label} player logos`}
      >
        {logos.map((logo) => (
          <div key={logo.name} role="listitem">
            <LogoPlaceholder name={logo.name} />
          </div>
        ))}
      </div>

      {/* Caption — a11y + SEO + AI extraction */}
      <figcaption
        className="text-2xs font-body"
        style={{ color: 'var(--surface-text-muted)' }}
      >
        {label} — representative players {captionSuffix}. Source: Ken Research analysis.
      </figcaption>
    </div>
  );
}

// ─── Associations + Certifications placeholder ────────────────────────────────

function GatedTabContent({ tabKey, onUnlock }: { tabKey: EcoTabKey; onUnlock: () => void }) {
  const labelMap: Record<string, string> = {
    associations: 'Industry associations, trade bodies, and regulatory agencies for the Australian cold chain sector.',
    certifications: 'Certification bodies, quality standards, and compliance frameworks governing cold chain operations.',
  };

  return (
    <Card variant="outlined" padding="lg" shadow="none">
      <div className="flex flex-col gap-4 items-center text-center py-6">
        <Lock
          size={24}
          style={{ color: 'var(--surface-text-muted)' }}
          aria-hidden="true"
        />
        <div>
          <p
            className="text-base font-display font-light mb-1"
            style={{ color: 'var(--color-foundation-black)' }}
          >
            {TAB_LABELS[tabKey]}
          </p>
          <p
            className="text-compact font-body"
            style={{ color: 'var(--surface-text-muted)' }}
          >
            {labelMap[tabKey]}
          </p>
        </div>
        <Button variant="brand" size="md" onClick={onUnlock}>
          Unlock Full Ecosystem Map
        </Button>
      </div>
    </Card>
  );
}

// ─── EcosystemTierGrid ───────────────────────────────────────────────────────

export interface EcosystemTierGridProps {
  ecosystem: EcosystemModule[];
  reportSlug?: string;
}

export function EcosystemTierGrid({ ecosystem, reportSlug = '' }: EcosystemTierGridProps) {
  const [activeTab, setActiveTab] = useState<EcoTabKey>('cold-chain');
  const { openForm } = useLeadFormModal();
  const shouldReduceMotion = useReducedMotion();
  const tablistId = useId();

  // Find ecosystem modules matching each tab
  const getEcoForTab = (tab: EcoTabKey): EcosystemModule | undefined => {
    if (tab === 'cold-chain') return ecosystem.find((e) => e.scope === 'overall');
    if (tab === 'cold-storage') return ecosystem.find((e) => e.subMarketLabel === 'Cold Storage');
    if (tab === 'cold-transport') return ecosystem.find((e) => e.subMarketLabel === 'Cold Transport');
    return undefined;
  };

  const handleUnlock = () => {
    openForm('sample', {
      reportSlug,
      ctaLocation: 'ecosystem-tier-grid',
      sectionName: 'ecosystem',
    });
  };

  const isGated = GATED_TABS.includes(activeTab);
  const activeEco = getEcoForTab(activeTab);

  return (
    <SectionWrapper background="warm" spacing="lg" id="ecosystem">
      <div className="flex flex-col gap-8">
        <SectionHeading level={2} eyebrow="Market Ecosystem" align="left">
          Cold Chain Market Ecosystem
        </SectionHeading>

        {/* Tab bar */}
        <div
          role="tablist"
          aria-label="Ecosystem segments"
          className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 snap-x snap-mandatory"
          id={tablistId}
        >
          {TAB_KEYS.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <div
                key={tab}
                role="tab"
                id={`${tablistId}-tab-${tab}`}
                aria-selected={isActive}
                aria-controls={`${tablistId}-panel-${tab}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveTab(tab)}
                onKeyDown={(e) => {
                  const idx = TAB_KEYS.indexOf(tab);
                  if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    setActiveTab(TAB_KEYS[(idx + 1) % TAB_KEYS.length]);
                  }
                  if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    setActiveTab(TAB_KEYS[(idx - 1 + TAB_KEYS.length) % TAB_KEYS.length]);
                  }
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveTab(tab);
                  }
                }}
                className="snap-start shrink-0 py-2.5 px-4 rounded-full cursor-pointer transition-colors"
                style={{
                  minHeight: '44px',
                  backgroundColor: isActive ? 'var(--color-foundation-black)' : 'var(--color-foundation-white)',
                  color: isActive ? 'var(--color-foundation-white)' : 'var(--color-foundation-black)',
                  border: '1px solid var(--border-default)',
                  fontSize: '13px',
                  fontFamily: 'inherit',
                  lineHeight: '1.3',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                {TAB_LABELS[tab]}
                {GATED_TABS.includes(tab) && (
                  <Lock size={11} aria-hidden="true" style={{ opacity: 0.6 }} />
                )}
              </div>
            );
          })}
        </div>

        {/* Tab panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            role="tabpanel"
            id={`${tablistId}-panel-${activeTab}`}
            aria-labelledby={`${tablistId}-tab-${activeTab}`}
            tabIndex={0}
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? {} : { opacity: 0, y: -4 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            {isGated ? (
              <GatedTabContent tabKey={activeTab} onUnlock={handleUnlock} />
            ) : activeEco ? (
              <figure>
                {/* Desktop: text left + logo grid right */}
                <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-6 items-start">
                  {/* Left: summary */}
                  <Card variant="white" padding="lg" shadow="sm">
                    <div className="flex flex-col gap-4">
                      <h3
                        className="text-base font-display font-light"
                        style={{ color: 'var(--color-foundation-black)' }}
                      >
                        {activeEco.heading}
                      </h3>
                      {activeEco.subheading && (
                        <p
                          className="text-compact font-body"
                          style={{ color: 'var(--surface-text-muted)' }}
                        >
                          {activeEco.subheading}
                        </p>
                      )}
                      {activeEco.tiers.map((tier) => (
                        <div
                          key={tier.label}
                          className="flex items-center gap-2 py-2"
                          style={{ borderBottom: '1px solid var(--border-soft)' }}
                        >
                          <Badge theme="neutral" size="sm">
                            {tier.count}
                          </Badge>
                          <span
                            className="text-compact font-body"
                            style={{ color: 'var(--color-foundation-black)' }}
                          >
                            {tier.label}
                          </span>
                          {tier.threshold && (
                            <span
                              className="text-2xs font-body ml-auto"
                              style={{ color: 'var(--surface-text-muted)' }}
                            >
                              {tier.threshold}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* Right: logo grid */}
                  <Card variant="outlined" padding="lg" shadow="none">
                    <div className="flex flex-col gap-6">
                      {activeEco.tiers.map((tier) => (
                        <TierBlock
                          key={tier.label}
                          label={tier.label}
                          count={tier.count}
                          threshold={tier.threshold}
                          logos={tier.logos}
                          captionSuffix="by capacity tier"
                        />
                      ))}
                    </div>
                  </Card>
                </div>
              </figure>
            ) : (
              <Card variant="outlined" padding="lg" shadow="none">
                <p
                  className="text-compact font-body text-center py-4"
                  style={{ color: 'var(--surface-text-muted)' }}
                >
                  Ecosystem data for this segment coming soon.
                </p>
              </Card>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Lead-gate CTA for full map */}
        <div
          className="flex items-center justify-between gap-3 flex-wrap py-4 px-5 rounded-[var(--radius-card)]"
          style={{
            backgroundColor: 'var(--color-ramp-warm-100)',
            border: '1px solid var(--border-soft)',
          }}
        >
          <p className="text-compact font-body" style={{ color: 'var(--surface-text-muted)' }}>
            Full ecosystem map — 200+ players · associations · certifications
          </p>
          <Button variant="secondary" size="sm" onClick={handleUnlock}>
            Unlock Full Map
          </Button>
        </div>
      </div>
    </SectionWrapper>
  );
}
