'use client';

/**
 * EcosystemSection — v0.4 §07 Market Ecosystem
 *
 * @what  4-tab ecosystem section per PRD §6.5 · Cold Chain overview · Cold Storage
 *        3-tier player cards · Cold Transport · Associations & Certifications.
 *        Uses PRD §6.5 verbatim player data (public-domain market share/pallet figures).
 *
 * @why   Live page has "Market Ecosystem" header but empty content (PRD-ADDED module
 *        per §7). PRD §6.5 specifies interactive ecosystem w/ logo wall + tier groups +
 *        associations. v0.4 implements text-card pattern matching report-store tab styling.
 *
 * @when  v0.4 PDP body §07. Below Taxonomy.
 *
 * @how   DS atoms: SectionLabel (eyebrow) · ui/tabs (Radix · canonical filled-pill) ·
 *        Badge (tier + share chips) · AssociationStrip organism (tab 4).
 *        Raw cards w/ DS tokens for player tier display.
 *
 * Source: PRD V2.1 §6.5 verbatim (Lineage 12.5% · Americold 4.8% · etc).
 */

import { useState } from 'react';
import { SectionLabel, Badge } from '@kenresearch/design-system/atoms';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@kenresearch/design-system/ui/tabs';
import { TABS_LIST_PRIMARY, TABS_TRIGGER_PRIMARY } from '@/lib/tab-styles';
import { EcosystemTreemap } from './EcosystemTreemap';

interface ColdStoragePlayer {
  name: string;
  pallets: number;
  sharePct: number;
}

const TIER_1: ColdStoragePlayer[] = [
  { name: 'Lineage', pallets: 590000, sharePct: 12.5 },
];

const TIER_2: ColdStoragePlayer[] = [
  { name: 'Americold', pallets: 226000, sharePct: 4.8 },
  { name: 'NewCold Advanced Cold Logistics', pallets: 225000, sharePct: 4.8 },
  { name: 'Oxford Cold Storage', pallets: 165000, sharePct: 3.5 },
];

const TIER_3: ColdStoragePlayer[] = [
  { name: 'Linfox', pallets: 36000, sharePct: 0.8 },
  { name: 'Laverton Cold Storage', pallets: 29000, sharePct: 0.6 },
  { name: 'Karras Cold Logistics', pallets: 25350, sharePct: 0.5 },
  { name: 'Auscold Logistics', pallets: 25000, sharePct: 0.5 },
  { name: 'Swire', pallets: 24845, sharePct: 0.5 },
  { name: 'P.Pullar & Co', pallets: 23000, sharePct: 0.5 },
  { name: 'Freezex', pallets: 20000, sharePct: 0.4 },
  { name: 'Austco Polar Cold Storage', pallets: 18000, sharePct: 0.4 },
  { name: 'Altona Cold Storage', pallets: 15500, sharePct: 0.4 },
];

const COLD_TRANSPORT_PLAYERS = [
  'Lindsay Australia',
  'CTI Logistics',
  'Iceland Cold Logistics',
  'Refrigerated Roadways',
  'Thermofreeze',
  'Pakval',
  'Sands Fridge Lines',
  'NewCold Transport',
  'Berle Refrigerated Solutions',
  'Acit',
  'Emergent Cold',
  'Fridge It',
  'Hines Refrigerated Transport',
];

const ASSOCIATIONS = [
  { name: 'RWTA', label: 'Refrigerated Warehouse & Transport Association' },
  { name: 'AFCC', label: 'Australian Food Cold Chain Council' },
  { name: 'AMIC', label: 'Australian Meat Industry Council' },
  { name: 'AIP', label: 'Australian Institute of Packaging' },
  { name: 'SCLAA', label: 'Supply Chain & Logistics Association of Australia' },
  { name: 'SQF', label: 'Safe Quality Food Institute' },
  { name: 'COR', label: 'Chain of Responsibility (Heavy Vehicle National Law)' },
  { name: 'Dept of Agriculture', label: 'Australian Government · Fisheries & Forestry' },
];

// ─────────────────────────────────────────────────────────────────
// Player tier card
// ─────────────────────────────────────────────────────────────────

function PlayerCard({ player }: { player: ColdStoragePlayer }) {
  return (
    <article className="rounded-[var(--radius-sm,10px)] border border-[var(--black-100)] bg-[var(--color-foundation-white)] p-4 flex flex-col gap-2">
      <h4
        className="font-display font-light text-[var(--semantic-ink-strong)]"
        style={{ fontSize: '16px', lineHeight: 1.25, letterSpacing: '-0.005em' }}
      >
        {player.name}
      </h4>
      <div className="flex items-baseline gap-2">
        <span
          className="tabular-nums font-display font-light text-[var(--semantic-ink-strong)]"
          style={{ fontSize: '22px', lineHeight: 1.1 }}
        >
          {player.pallets.toLocaleString()}
        </span>
        <span className="font-body text-[11px] uppercase tracking-[0.12em] text-[var(--semantic-ink-muted)]">
          pallets
        </span>
      </div>
      <Badge variant="rounded" size="xs" theme="neutral" bordered>
        {player.sharePct.toFixed(1)}% market share
      </Badge>
    </article>
  );
}

function TierGroup({ title, totalRange, players }: { title: string; totalRange: string; players: ColdStoragePlayer[] }) {
  return (
    <div className="mb-8">
      <div className="flex items-baseline flex-wrap gap-2 mb-4">
        <h3
          className="font-display font-light text-[var(--semantic-ink-strong)]"
          style={{ fontSize: '18px', lineHeight: 1.3 }}
        >
          {title}
        </h3>
        <span className="font-body text-[12px] text-[var(--semantic-ink-muted)]">
          {totalRange}
        </span>
        <span className="font-body text-[11px] uppercase tracking-[0.12em] text-[var(--semantic-ink-muted)] ml-auto">
          {players.length} {players.length === 1 ? 'player' : 'players'}
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {players.map((p) => (
          <PlayerCard key={p.name} player={p} />
        ))}
      </div>
    </div>
  );
}

// Tab styling · canonical pill style per tab-styles.ts
// Sprint 4 · replaced underline style (Sprint 2/3 anti-pattern) w/ pill style

// ─────────────────────────────────────────────────────────────────
// Section
// ─────────────────────────────────────────────────────────────────

type StorageView = 'tiers' | 'treemap';

export function EcosystemSection() {
  const [storageView, setStorageView] = useState<StorageView>('tiers');

  return (
    <section
      id="ecosystem"
      aria-labelledby="ecosystem-heading"
      className="px-4 sm:px-6 lg:px-12 max-w-[1100px] mx-auto w-full scroll-mt-[120px]"
    >
      <div className="inline-flex mb-3">
        <SectionLabel background="light" variant="accent">
          Section 07 · Market Ecosystem
        </SectionLabel>
      </div>

      <h2
        id="ecosystem-heading"
        className="font-display font-light text-[clamp(28px,3vw,39px)] leading-[1.15] tracking-[-0.015em] text-[var(--semantic-ink-strong)] mb-3"
      >
        Who operates the Australia cold chain
      </h2>

      <p className="font-body text-[16px] leading-[1.6] text-[var(--semantic-ink-body)] max-w-[60ch] mb-8">
        A fragmented landscape of 200–250 cold transportation and storage players · global 3PLs scaling fast while domestic specialists hold regional niches.
      </p>

      <Tabs defaultValue="cold-chain" className="w-full">
        <TabsList className={TABS_LIST_PRIMARY}>
          {[
            { v: 'cold-chain',    label: 'Cold Chain Overview' },
            { v: 'cold-storage',  label: 'Cold Storage Players' },
            { v: 'cold-transport', label: 'Cold Transport Players' },
            { v: 'associations',  label: 'Associations & Certifications' },
          ].map((t) => (
            <TabsTrigger key={t.v} value={t.v} className={TABS_TRIGGER_PRIMARY}>
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Tab 1 · Cold Chain Overview */}
        <TabsContent value="cold-chain" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <article className="rounded-[var(--radius-sm,10px)] border border-[var(--black-100)] bg-[var(--color-foundation-white)] p-5">
              <p className="uppercase tracking-[0.12em] text-[var(--semantic-ink-muted)] mb-2" style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 600 }}>
                Total players
              </p>
              <p className="font-display font-light text-[var(--semantic-ink-strong)] tabular-nums" style={{ fontSize: '32px', lineHeight: 1.1 }}>
                200–250
              </p>
              <p className="font-body text-[13px] text-[var(--semantic-ink-body)] mt-2 leading-[1.5]">
                Cold transportation and storage operators serving Australia.
              </p>
            </article>
            <article className="rounded-[var(--radius-sm,10px)] border border-[var(--black-100)] bg-[var(--color-foundation-white)] p-5">
              <p className="uppercase tracking-[0.12em] text-[var(--semantic-ink-muted)] mb-2" style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 600 }}>
                Top 4 share
              </p>
              <p className="font-display font-light text-[var(--semantic-ink-strong)] tabular-nums" style={{ fontSize: '32px', lineHeight: 1.1 }}>
                25.6%
              </p>
              <p className="font-body text-[13px] text-[var(--semantic-ink-body)] mt-2 leading-[1.5]">
                Combined market share of Lineage, Americold, NewCold, Oxford.
              </p>
            </article>
            <article className="rounded-[var(--radius-sm,10px)] border border-[var(--black-100)] bg-[var(--color-foundation-white)] p-5">
              <p className="uppercase tracking-[0.12em] text-[var(--semantic-ink-muted)] mb-2" style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 600 }}>
                Long tail
              </p>
              <p className="font-display font-light text-[var(--semantic-ink-strong)] tabular-nums" style={{ fontSize: '32px', lineHeight: 1.1 }}>
                66.9%
              </p>
              <p className="font-body text-[13px] text-[var(--semantic-ink-body)] mt-2 leading-[1.5]">
                Held by smaller domestic + regional operators — fragmented opportunity.
              </p>
            </article>
          </div>
          <p className="font-body text-[14px] text-[var(--semantic-ink-body)] italic mt-6">
            Switch to <strong className="text-[var(--semantic-ink-strong)] not-italic font-medium">Cold Storage Players</strong> for the full tier breakdown by pallet capacity.
          </p>
        </TabsContent>

        {/* Tab 2 · Cold Storage Players · view toggle (Tiers cards · TreeMap) */}
        <TabsContent value="cold-storage" className="mt-0">
          {/* View toggle */}
          <div className="flex items-center gap-1 mb-6 border border-[var(--black-100)] rounded-[var(--radius-xs,5px)] p-1 self-start w-fit">
            {[
              { v: 'tiers' as const,   label: 'Tier cards' },
              { v: 'treemap' as const, label: 'Treemap' },
            ].map((opt) => (
              <button
                key={opt.v}
                type="button"
                onClick={() => setStorageView(opt.v)}
                aria-pressed={storageView === opt.v}
                className={`px-3 py-1.5 rounded-[var(--radius-xs,3px)] transition-colors font-body text-[13px] font-medium ${
                  storageView === opt.v
                    ? 'bg-[var(--color-foundation-black)] text-white'
                    : 'bg-transparent text-[var(--semantic-ink-body)] hover:text-[var(--semantic-ink-strong)]'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {storageView === 'tiers' ? (
            <>
              <TierGroup title="Tier 1" totalRange="> 200,000 pallets" players={TIER_1} />
              <TierGroup title="Tier 2" totalRange="15,000–200,000 pallets" players={TIER_2} />
              <TierGroup title="Tier 3" totalRange="< 15,000 pallets" players={TIER_3} />
            </>
          ) : (
            <EcosystemTreemap />
          )}
        </TabsContent>

        {/* Tab 3 · Cold Transport Players · simple card grid */}
        <TabsContent value="cold-transport" className="mt-0">
          <p className="font-body text-[14px] text-[var(--semantic-ink-body)] italic mb-5">
            13 named cold-transport operators · pallet/share data deferred to content team.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {COLD_TRANSPORT_PLAYERS.map((name) => (
              <article
                key={name}
                className="rounded-[var(--radius-sm,10px)] border border-[var(--black-100)] bg-[var(--color-foundation-white)] p-4 text-center"
              >
                <h4
                  className="font-display font-light text-[var(--semantic-ink-strong)]"
                  style={{ fontSize: '14px', lineHeight: 1.3 }}
                >
                  {name}
                </h4>
              </article>
            ))}
          </div>
        </TabsContent>

        {/* Tab 4 · Associations & Certifications · card grid */}
        <TabsContent value="associations" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3">
            {ASSOCIATIONS.map((a) => (
              <article
                key={a.name}
                className="rounded-[var(--radius-sm,10px)] border border-[var(--black-100)] bg-[var(--color-foundation-white)] p-4 flex items-baseline gap-3"
              >
                <span
                  className="font-display font-light text-[var(--semantic-ink-strong)] shrink-0"
                  style={{ fontSize: '15px', lineHeight: 1.3 }}
                >
                  {a.name}
                </span>
                <span className="font-body text-[13px] leading-[1.5] text-[var(--semantic-ink-body)]">
                  {a.label}
                </span>
              </article>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}
