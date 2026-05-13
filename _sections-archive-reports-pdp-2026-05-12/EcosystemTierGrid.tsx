'use client';

/**
 * EcosystemTierGrid — Row 12 — Recipe report-detail.md line 53
 * bg: warm-300 · spacing: lg · motion: Framer stagger 60ms
 * Tabs: Cold Chain · Cold Storage · Cold Transport · Associations · Certifications
 * Per tab: summary cards + locked ecosystem map (lead-gated)
 * Mobile: accordion fallback for tabs
 */

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  SectionWrapper,
  SectionHeading,
  SectionLabel,
  Card,
  Badge,
} from '@kenresearch/design-system/atoms';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { AccessLevelGate } from '@/components/AccessLevelGate';
import { useAnalytics } from '@/hooks/useAnalytics';
import type { EcosystemModule, EcosystemTier } from '@/types/schema';
import { Lock, Building2 } from 'lucide-react';

interface Props {
  ecosystems: EcosystemModule[];
}

// Tab config — recipe-locked labels (row 12 spec)
const TAB_LABELS = [
  'Cold Chain',
  'Cold Storage',
  'Cold Transport',
  'Associations',
  'Certifications',
] as const;

type TabLabel = (typeof TAB_LABELS)[number];

const MAP_GATE_ACCESS = {
  level: 'lead-gated' as const,
  ctaTrigger: 'sample' as const,
  schemaIsAccessibleForFree: false,
  paywallSelector: '.kr-paywall-ecosystem-map',
  publicPreview: {
    summaryText: 'Submit your details to view the full ecosystem map.',
  },
};

function TierCard({
  tier,
  index,
  prefersReduced,
}: {
  tier: EcosystemTier;
  index: number;
  prefersReduced: boolean | null;
}) {
  return (
    <motion.div
      initial={prefersReduced ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.35,
        ease: 'easeOut',
        delay: prefersReduced ? 0 : Math.min(index, 7) * 0.06,
      }}
    >
      <Card variant="white" padding="md" className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span
            style={{
              fontFamily: 'var(--typography-family-display)',
              fontSize: 'var(--typography-size-sm)',
              fontWeight: 600,
              color: 'var(--surface-text)',
            }}
          >
            {tier.label}
          </span>
          <Badge theme="neutral" size="sm">
            {tier.threshold ?? `${tier.count} players`}
          </Badge>
        </div>

        {tier.logos.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tier.logos.map((logo) => (
              <span
                key={logo.name}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'var(--space-1)',
                  padding: 'var(--space-1) var(--space-2)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-soft)',
                  background: 'var(--color-ramp-warm-50)',
                  fontSize: 'var(--typography-size-compact)',
                  color: 'var(--surface-text-muted)',
                }}
              >
                <Building2 size={10} aria-hidden="true" />
                {logo.name}
              </span>
            ))}
          </div>
        )}
      </Card>
    </motion.div>
  );
}

function TabContent({
  ecosystem,
  prefersReduced,
}: {
  ecosystem: EcosystemModule | null;
  prefersReduced: boolean | null;
}) {
  if (!ecosystem) {
    return (
      <div
        style={{
          padding: 'var(--space-8)',
          textAlign: 'center',
          color: 'var(--surface-text-muted)',
          fontSize: 'var(--typography-size-sm)',
        }}
      >
        No data for this segment.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
      {/* Left: tier cards (2-col on lg spans 2) */}
      <div className="lg:col-span-2 flex flex-col gap-4">
        {ecosystem.subheading && (
          <p
            style={{
              fontSize: 'var(--typography-size-sm)',
              color: 'var(--surface-text-muted)',
              marginBottom: 'var(--space-2)',
            }}
          >
            {ecosystem.subheading}
          </p>
        )}
        {ecosystem.tiers.map((tier, i) => (
          <TierCard
            key={tier.label}
            tier={tier}
            index={i}
            prefersReduced={prefersReduced}
          />
        ))}
      </div>

      {/* Right: ecosystem map — locked */}
      <div className="lg:col-span-1">
        <AccessLevelGate
          access={MAP_GATE_ACCESS}
          moduleId={`ecosystem-map-${ecosystem.id}`}
          sectionName="EcosystemTierGrid"
          fallback={
            <Card variant="white" padding="md" className="h-full min-h-[200px]">
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 'var(--space-3)',
                  minHeight: '200px',
                  textAlign: 'center',
                }}
              >
                <Lock
                  size={20}
                  aria-hidden="true"
                  style={{ color: 'var(--color-ramp-warm-500)' }}
                />
                <p
                  style={{
                    fontSize: 'var(--typography-size-sm)',
                    color: 'var(--surface-text-muted)',
                  }}
                >
                  Full ecosystem map — unlock to view
                </p>
              </div>
            </Card>
          }
        >
          <Card variant="white" padding="md" className="h-full min-h-[200px]">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '200px',
                color: 'var(--surface-text-muted)',
                fontSize: 'var(--typography-size-sm)',
              }}
            >
              Ecosystem map (Phase C)
            </div>
          </Card>
        </AccessLevelGate>
      </div>
    </div>
  );
}

// Map tab label to ecosystem module
function findEcosystem(
  ecosystems: EcosystemModule[],
  tab: TabLabel,
): EcosystemModule | null {
  if (tab === 'Cold Chain') {
    return ecosystems.find((e) => e.scope === 'overall') ?? ecosystems[0] ?? null;
  }
  if (tab === 'Cold Storage') {
    return (
      ecosystems.find(
        (e) =>
          e.subMarketLabel?.toLowerCase().includes('storage') ||
          e.tabVariant === 'cold-storage',
      ) ?? null
    );
  }
  if (tab === 'Cold Transport') {
    return (
      ecosystems.find(
        (e) =>
          e.subMarketLabel?.toLowerCase().includes('transport') ||
          e.tabVariant === 'cold-transport',
      ) ?? null
    );
  }
  // Associations / Certifications: no data yet — show empty
  return null;
}

export function EcosystemTierGrid({ ecosystems }: Props) {
  const prefersReduced = useReducedMotion();
  const dispatch = useAnalytics();
  const [activeTab, setActiveTab] = useState<TabLabel>('Cold Chain');

  const handleTabChange = (value: string) => {
    setActiveTab(value as TabLabel);
    dispatch('chart_filter_change', {
      section_name: 'EcosystemTierGrid',
      tab_name: value,
    });
  };

  return (
    <SectionWrapper
      background="warm"
      spacing="lg"
      maxWidth="wide"
      id="sec-ecosystem"
    >
      <motion.div
        initial={prefersReduced ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="inline-flex mb-3">
          <SectionLabel background="light" variant="default">
            ECOSYSTEM
          </SectionLabel>
        </div>
        <SectionHeading level={2} align="left">
          Market Ecosystem
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
          200–250 active players across cold storage and cold transport. Highly fragmented.
        </p>
      </motion.div>

      {/* Desktop tabs */}
      <div className="hidden md:block mt-8">
        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
        >
          <TabsList
            style={{
              background: 'var(--color-ramp-warm-200)',
              borderRadius: 'var(--radius-sm)',
            }}
          >
            {TAB_LABELS.map((label) => (
              <TabsTrigger
                key={label}
                value={label}
                style={{ fontSize: 'var(--typography-size-sm)' }}
              >
                {label}
              </TabsTrigger>
            ))}
          </TabsList>

          {TAB_LABELS.map((label) => (
            <TabsContent key={label} value={label}>
              <TabContent
                ecosystem={findEcosystem(ecosystems, label)}
                prefersReduced={prefersReduced}
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Mobile accordion fallback */}
      <div className="md:hidden mt-6">
        <Accordion>
          {TAB_LABELS.map((label) => (
            <AccordionItem key={label} value={label}>
              <AccordionTrigger
                onClick={() =>
                  dispatch('chart_filter_change', {
                    section_name: 'EcosystemTierGrid',
                    tab_name: label,
                  })
                }
                style={{ fontSize: 'var(--typography-size-sm)', fontWeight: 600 }}
              >
                {label}
              </AccordionTrigger>
              <AccordionContent>
                <TabContent
                  ecosystem={findEcosystem(ecosystems, label)}
                  prefersReduced={prefersReduced}
                />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </SectionWrapper>
  );
}
