'use client';

/**
 * MarketOverviewGenesisSection — v0.4 §04 Market Overview & Genesis
 *
 * @what  3-tab section · Overview (prose) · Genesis (timeline · ported v0.3) ·
 *        Seasonality (calendar strip · ported v0.3). Business Cycle tab DROPPED
 *        (low signal · no canonical pattern).
 *
 * @why   Per V04 master plan §3.8 + user 2026-05-20 brief B3: port v0.3
 *        GenesisTimeline + SeasonalityCalendar AS-IS. Tabbed organisation per
 *        PRD §8.6 "Break into cards: overview, market genesis, business cycle,
 *        seasonality trends."
 *
 * @when  v0.4 PDP body §04. Below Country & Infrastructure.
 *
 * @how   DS atoms: SectionLabel (eyebrow) · ui/tabs (Radix · Root + List + Trigger + Content).
 *        Project-local: GenesisTimeline · SeasonalityCalendar.
 *        Overview tab uses raw prose w/ DS tokens (DS MarketOverview organism is heavier
 *        than needed · would duplicate hero stats).
 */

import { SectionLabel } from '@kenresearch/design-system/atoms';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@kenresearch/design-system/ui/tabs';
import { TABS_LIST_PRIMARY, TABS_TRIGGER_PRIMARY } from '@/lib/tab-styles';
import { GenesisTimeline, type GenesisMilestone } from './GenesisTimeline';
import { SeasonalityCalendar, type SeasonalityMonth } from './SeasonalityCalendar';

const GENESIS_MILESTONES: GenesisMilestone[] = [
  {
    year: 1925,
    label: 'Commercial cold storage founded',
    description: 'Australian Cold Stores established in NSW — marks organised commercial cold-storage beginning.',
  },
  {
    year: 1947,
    label: 'Swire Cold Storage enters AU',
    description: 'International operator entry signals rising cross-border trade and professional cold-chain demand.',
  },
  {
    year: 1960,
    label: 'National refrigerated road network',
    description: 'Highway development enables reefer transport between metro hubs and regional producers.',
  },
  {
    year: 1985,
    label: 'Pharmaceutical cold-chain mandate',
    description: 'TGA introduces GDP guidelines for pharmaceutical temperature-control, creating compliance-driven demand.',
  },
  {
    year: 2010,
    label: 'Global 3PL consolidation',
    description: 'Americold acquires AU cold-store network; global operators begin AU footprint build-out.',
  },
  {
    year: 2016,
    label: 'Automation era begins',
    description: "Newcold opens Melbourne's first fully automated cold store — 900,000 m³ capacity, 30% cost advantage.",
  },
  {
    year: 2020,
    label: 'E-grocery cold-last-mile emerges',
    description: 'COVID-19 accelerates e-grocery adoption, creating new demand for metro-zone chilled-carrier networks.',
  },
  {
    year: 2023,
    label: 'NACC investment framework',
    description: 'National Agricultural Cold Chain Initiative funds rural cold-chain links; expands geographic coverage.',
  },
];

const SEASONALITY_MONTHS: SeasonalityMonth[] = [
  { month: 1,  level: 'peak' },
  { month: 2,  level: 'peak' },
  { month: 3,  level: 'normal' },
  { month: 4,  level: 'peak' },
  { month: 5,  level: 'peak' },
  { month: 6,  level: 'normal' },
  { month: 7,  level: 'normal' },
  { month: 8,  level: 'low' },
  { month: 9,  level: 'low' },
  { month: 10, level: 'peak' },
  { month: 11, level: 'peak' },
  { month: 12, level: 'peak' },
];

export function MarketOverviewGenesisSection() {
  return (
    <section
      id="market-overview"
      aria-labelledby="market-overview-heading"
      className="px-4 sm:px-6 lg:px-12 max-w-[1100px] mx-auto w-full scroll-mt-[120px]"
    >
      {/* Eyebrow · DS SectionLabel accent */}
      <div className="inline-flex mb-3">
        <SectionLabel background="light" variant="accent">
          Section 04 · Market Overview & Genesis
        </SectionLabel>
      </div>

      {/* H2 · serif light */}
      <h2
        id="market-overview-heading"
        className="font-display font-light text-[clamp(28px,3vw,39px)] leading-[1.15] tracking-[-0.015em] text-[var(--semantic-ink-strong)] mb-3"
      >
        How the market came to be
      </h2>

      {/* Lede */}
      <p className="font-body text-[16px] leading-[1.6] text-[var(--semantic-ink-body)] max-w-[60ch] mb-8">
        Australia&apos;s cold-chain industry evolved through pastoral exports, pharma compliance,
        3PL consolidation, e-grocery surge, and automation — each phase reshaping demand
        unit economics.
      </p>

      {/* Tabs · Sprint 4 · canonical pill style */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className={TABS_LIST_PRIMARY}>
          {[
            { v: 'overview',    label: 'Overview' },
            { v: 'genesis',     label: 'Genesis' },
            { v: 'seasonality', label: 'Seasonality' },
          ].map((t) => (
            <TabsTrigger
              key={t.v}
              value={t.v}
              className={TABS_TRIGGER_PRIMARY}
            >
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Overview tab · prose */}
        <TabsContent value="overview" className="mt-0 space-y-5 max-w-[68ch]">
          <p className="font-body text-[16px] leading-[1.7] text-[var(--semantic-ink-body)]">
            Australia&apos;s cold chain was built on the country&apos;s pastoral export economy in the
            early 20th century. Commercial cold storage emerged in New South Wales in 1925,
            establishing the organisational template for refrigerated logistics that would
            scale alongside agriculture, meat-processing, and (later) pharmaceutical demand.
          </p>
          <p className="font-body text-[16px] leading-[1.7] text-[var(--semantic-ink-body)]">
            The pharmaceutical compliance era began in 1985 when the Therapeutic Goods
            Administration mandated GDP temperature-control guidelines, creating durable
            demand from healthcare distribution. Global 3PL consolidation followed in the
            2010s as Americold and NewCold built out scale, with automation arriving in 2016
            via Newcold&apos;s Melbourne facility — 900,000 m³ capacity at a 30% cost
            advantage versus conventional storage.
          </p>
          <p className="font-body text-[16px] leading-[1.7] text-[var(--semantic-ink-body)]">
            The post-2020 chapter is digital-distribution-first: COVID accelerated e-grocery
            adoption and chilled last-mile demand; the 2023 NACC investment framework now
            funds rural cold-chain corridors, broadening geographic coverage beyond metro hubs.
          </p>
        </TabsContent>

        {/* Genesis tab · ported v0.3 timeline */}
        <TabsContent value="genesis" className="mt-0">
          <GenesisTimeline milestones={GENESIS_MILESTONES} />
        </TabsContent>

        {/* Seasonality tab · ported v0.3 calendar */}
        <TabsContent value="seasonality" className="mt-0">
          <p className="font-body text-[15px] leading-[1.6] text-[var(--semantic-ink-body)] mb-5 max-w-[60ch]">
            Demand peaks around festive consumption windows (Jan-Feb summer · Apr-May Easter ·
            Oct-Dec spring/Christmas) and dips Aug-Sep during the off-season trough.
          </p>
          <SeasonalityCalendar months={SEASONALITY_MONTHS} />
        </TabsContent>
      </Tabs>
    </section>
  );
}
