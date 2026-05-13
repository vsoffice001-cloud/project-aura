'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Check, Share2, Link, Mail, Copy, TrendingUp } from 'lucide-react';
import {
  Badge,
  Button,
  SectionWrapper,
  Divider,
} from '@kenresearch/design-system/atoms';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLeadFormModal } from '@/components/LeadFormModalProvider';
import { useAnalytics } from '@/hooks/useAnalytics';
import type { HeroCockpit, Author } from '@/types/schema';

const BADGE_THEME_MAP = {
  industry: 'neutral',
  region: 'info',
  'report-type': 'purple',
  date: 'warm',
} as const;

const SHARE_ICONS = {
  linkedin: Link,
  twitter: Link,
  email: Mail,
  'copy-link': Copy,
} as const;

const METADATA_LABELS: Record<string, string> = {
  pages: 'Pages',
  productCode: 'Product Code',
  baseYear: 'Base Year',
  historicalPeriod: 'Historical',
  forecastPeriod: 'Forecast',
  format: 'Format',
  deliveryType: 'Delivery',
};

interface ReportPDPHeroProps {
  cockpit: HeroCockpit;
  authors: Author[];
  reportSlug: string;
}

/**
 * ReportPDPHero — recipe row 3.
 * bg: warm-300 · spacing: xl · motion: Framer fade-up + tab transitions.
 * Two-column desktop (60/40), stacked mobile.
 * Left: badges · H1 · promise · proof bullets · CTAs · trust strip.
 * Right: 4-tab cockpit (chart placeholders for Phase B) + metadata dl.
 */
export function ReportPDPHero({ cockpit, authors, reportSlug }: ReportPDPHeroProps) {
  const prefersReduced = useReducedMotion();
  const { openForm } = useLeadFormModal();
  const dispatch = useAnalytics();
  const [activeTab, setActiveTab] = useState('marketSize');

  const author = authors[0];

  const fadeUp = prefersReduced
    ? {}
    : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 } };

  const handlePrimaryCTA = () => {
    dispatch('sample_cta_click', { cta_location: 'hero', section_name: 'ReportPDPHero' });
    openForm('sample', { reportSlug, ctaLocation: 'hero', sectionName: 'ReportPDPHero' });
  };

  const handleSecondaryCTA = () => {
    dispatch('analyst_cta_click', { cta_location: 'hero', section_name: 'ReportPDPHero' });
    openForm('analyst-call', { reportSlug, ctaLocation: 'hero', sectionName: 'ReportPDPHero' });
  };

  const handleTabChange = (next: string) => {
    dispatch('hero_chart_interaction', {
      tab_name: next,
      previous_tab: activeTab,
      section_name: 'ReportPDPHero',
    });
    setActiveTab(next);
  };

  const meta = cockpit.metadata;
  const metaRows: { key: string; value: string }[] = [
    { key: 'pages', value: `${meta.pages} pages` },
    { key: 'productCode', value: meta.productCode },
    { key: 'baseYear', value: String(meta.baseYear) },
    { key: 'historicalPeriod', value: meta.historicalPeriod },
    { key: 'forecastPeriod', value: meta.forecastPeriod },
    { key: 'format', value: meta.format.toUpperCase() },
    { key: 'deliveryType', value: meta.deliveryType },
  ];

  return (
    <SectionWrapper background="warm" spacing="xl" id="pdp-hero">
      <div className="grid lg:grid-cols-[3fr_2fr] gap-10 lg:gap-16 items-start">
        {/* LEFT — copy + CTAs */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="space-y-6"
        >
          {/* Breadcrumb chips */}
          <div className="flex flex-wrap gap-2">
            {cockpit.badges.map((b) => (
              <Badge
                key={b.label}
                theme={BADGE_THEME_MAP[b.theme]}
                variant="pill"
                size="sm"
              >
                {b.label}
              </Badge>
            ))}
          </div>

          {/* H1 — single on page */}
          <h1
            className="font-light leading-[1.05] tracking-tight"
            style={{
              fontFamily: 'var(--typography-family-display)',
              fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
            }}
          >
            {cockpit.h1}
          </h1>

          {/* Product promise */}
          <p
            className="text-[var(--typography-size-base)] font-[var(--typography-family-body)] leading-relaxed"
            style={{ opacity: 0.7 }}
          >
            {cockpit.promise}
          </p>

          {/* Research proof bullets */}
          <ul className="space-y-2" role="list">
            {cockpit.proofBullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-2">
                <Check
                  className="h-4 w-4 mt-0.5 shrink-0 text-[var(--color-brand-red)]"
                  strokeWidth={2}
                  aria-hidden
                />
                <span className="text-[var(--typography-size-compact)] font-[var(--typography-family-body)] tabular-nums leading-snug">
                  {bullet}
                </span>
              </li>
            ))}
          </ul>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 pt-2">
            <Button
              variant="brand"
              size="lg"
              onClick={handlePrimaryCTA}
              aria-label={cockpit.ctas.primary.label}
            >
              {cockpit.ctas.primary.label}
            </Button>
            <Button
              variant="ghost"
              size="lg"
              onClick={handleSecondaryCTA}
              aria-label={cockpit.ctas.secondary.label}
            >
              {cockpit.ctas.secondary.label}
            </Button>
          </div>

          {/* Trust strip */}
          {author && (
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <div className="flex items-center gap-3">
                {/* Author portrait initials — Avatar DS atom is nav-specific; plain div used here */}
                <div
                  className="h-8 w-8 rounded-full flex items-center justify-center text-[var(--typography-size-xs)] font-semibold font-[var(--typography-family-body)]"
                  style={{ backgroundColor: 'var(--color-ramp-warm-300)', color: 'var(--surface-text-muted)' }}
                  aria-hidden
                >
                  {author.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="text-[var(--typography-size-compact)] font-[var(--typography-family-body)] font-medium leading-snug">
                    {author.name}
                  </p>
                  <p
                    className="text-[var(--typography-size-xs)] font-[var(--typography-family-body)] leading-snug"
                    style={{ opacity: 0.6 }}
                  >
                    {author.role}
                  </p>
                </div>
              </div>
              <Divider orientation="vertical" />
              <p
                className="text-[var(--typography-size-xs)] font-[var(--typography-family-body)]"
                style={{ opacity: 0.6 }}
              >
                {cockpit.trustStrip.lastUpdatedDisplay}
              </p>
              <Divider orientation="vertical" />
              <div className="flex items-center gap-2" aria-label="Share">
                <Share2 className="h-3.5 w-3.5" style={{ opacity: 0.5 }} aria-hidden />
                {cockpit.trustStrip.shareTargets.map((target) => {
                  const Icon = SHARE_ICONS[target];
                  if (!Icon) return null;
                  return (
                    <button
                      key={target}
                      type="button"
                      aria-label={`Share via ${target}`}
                      className="p-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-red)] transition-opacity duration-150 hover:opacity-100"
                      style={{ opacity: 0.5 }}
                    >
                      <Icon className="h-3.5 w-3.5" aria-hidden />
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </motion.div>

        {/* RIGHT — tab cockpit */}
        <motion.aside
          {...fadeUp}
          transition={{ duration: 0.5, delay: prefersReduced ? 0 : 0.15, ease: 'easeOut' }}
        >
          <Tabs
            value={activeTab}
            onValueChange={handleTabChange}
            className="w-full"
          >
            <TabsList
              role="tablist"
              aria-label="Market intelligence tabs"
              className="w-full grid grid-cols-4 mb-4 overflow-x-auto"
            >
              {Object.entries(cockpit.tabs).map(([key, tab]) => (
                <TabsTrigger
                  key={key}
                  value={key}
                  aria-selected={activeTab === key}
                  className="whitespace-nowrap px-2"
                  style={{ fontSize: 'var(--typography-size-xs)' }}
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(cockpit.tabs).map(([key, tab]) => (
              <TabsContent key={key} value={key} role="tabpanel" aria-label={tab.label}>
                <div
                  className="rounded-[var(--radius-card)] border border-[var(--border-default)] bg-[var(--color-foundation-white)] p-6"
                  style={{ minHeight: '18rem' }}
                >
                  {/* Chart placeholder — Phase B wires real ChartCard here */}
                  <div className="flex flex-col items-center justify-center h-full gap-3" style={{ minHeight: '16rem' }}>
                    <TrendingUp
                      className="h-8 w-8 text-[var(--color-accent-purple)]"
                      strokeWidth={1.5}
                      aria-hidden
                    />
                    <p className="text-[var(--typography-size-sm)] text-[var(--surface-text-muted)] text-center">
                      {tab.label} chart — Phase B
                    </p>
                    {tab.payload && 'zones' in tab.payload && tab.payload.zones?.insightLine && (
                      <p className="text-[var(--typography-size-compact)] font-[var(--typography-family-body)] text-center" style={{ opacity: 0.7 }}>
                        {tab.payload.zones.insightLine}
                      </p>
                    )}
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>

          {/* Hero metadata block */}
          <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3">
            {metaRows.map(({ key, value }) => (
              <div key={key} className="flex flex-col gap-0.5">
                <dt
                  className="text-[var(--typography-size-xs)] uppercase tracking-wider font-[var(--typography-family-body)] font-semibold"
                  style={{ opacity: 0.5 }}
                >
                  {METADATA_LABELS[key]}
                </dt>
                <dd className="text-[var(--typography-size-compact)] font-[var(--typography-family-body)] font-medium">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </motion.aside>
      </div>
    </SectionWrapper>
  );
}
