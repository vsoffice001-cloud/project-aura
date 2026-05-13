'use client';

/**
 * CompetitorLandscapeModule — Row 22 — Recipe report-detail.md line 63
 * bg: warm-300 · spacing: lg · motion: Framer fade-up
 * Overview + logo strip + market-share chart (ChartCard) + positioning matrix
 * + company cards + comparison table (CompetitorComparisonTable sub-component).
 */

import { motion, useReducedMotion } from 'framer-motion';
import {
  SectionWrapper,
  SectionHeading,
  SectionLabel,
  Card,
  Badge,
} from '@kenresearch/design-system/atoms';
import { ChartCard } from '@/components/sections/ChartCard';
import { CompetitorComparisonTable } from '@/components/sections/CompetitorComparisonTable';
import { AccessLevelGate } from '@/components/AccessLevelGate';
import { useLeadFormModal } from '@/components/LeadFormModalProvider';
import { useAnalytics } from '@/hooks/useAnalytics';
import type { ChartModule, MatrixModule, QuadrantModule, TimelineModule } from '@/types/schema';

interface Props {
  marketShareChart: ChartModule | null;
  comparisonMatrix: MatrixModule | null;
  positioningQuadrant: QuadrantModule | null;
  competitorTimeline: TimelineModule | null;
  reportSlug: string;
}

const LEAD_GATED_ACCESS = {
  level: 'lead-gated' as const,
  ctaTrigger: 'sample' as const,
  paywallSelector: '.kr-paywall-competitor-table',
  schemaIsAccessibleForFree: false,
};

const COMPETITOR_NAMES = [
  'Lineage', 'Americold', 'NewCold Advanced', 'Oxford Cold Storage',
  'Linfox', 'Laverton Cold Storage', 'Karras Cold Logistics', 'Auscold',
];

const QUADRANT_GROUPS = ['Leaders', 'Challengers', 'Followers', 'Niche'] as const;

function getQuadrantLabel(x: number, y: number): string {
  const highX = x > 200000;
  const highY = y > 87;
  if (highX && highY) return 'Leaders';
  if (highX && !highY) return 'Challengers';
  if (!highX && highY) return 'Followers';
  return 'Niche';
}

function initials(name: string) {
  return name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
}

interface LogoChipProps { name: string }
function LogoChip({ name }: LogoChipProps) {
  return (
    <div
      style={{
        display: 'flex', alignItems: 'center', gap: 'var(--space-2)',
        padding: 'var(--space-2) var(--space-3)', borderRadius: 'var(--radius-sm)',
        border: '1px solid var(--border-soft)', background: '#ffffff',
        whiteSpace: 'nowrap', flexShrink: 0,
      }}
    >
      <div
        style={{
          width: '24px', height: '24px', borderRadius: '4px',
          background: 'var(--color-ramp-warm-200)', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          fontSize: '10px', fontWeight: 700, color: 'var(--surface-text-muted)', flexShrink: 0,
        }}
        aria-hidden="true"
      >
        {initials(name)}
      </div>
      <span style={{ fontSize: 'var(--typography-size-compact)', fontWeight: 500, color: 'var(--surface-text)' }}>
        {name}
      </span>
    </div>
  );
}

interface CompanyCardProps {
  name: string; positioning: string; marketSharePct?: string;
  index: number; prefersReduced: boolean | null;
}
function CompanyCard({ name, positioning, marketSharePct, index, prefersReduced }: CompanyCardProps) {
  return (
    <motion.div
      initial={prefersReduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4, ease: 'easeOut', delay: prefersReduced ? 0 : Math.min(index, 5) * 0.08 }}
    >
      <Card variant="white" padding="md" className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div
            style={{
              width: '40px', height: '40px', borderRadius: 'var(--radius-sm)',
              background: 'var(--color-ramp-warm-100)', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              fontSize: '12px', fontWeight: 700, color: 'var(--surface-text-muted)', flexShrink: 0,
            }}
            aria-hidden="true"
          >
            {initials(name)}
          </div>
          <h3 style={{ fontFamily: 'var(--typography-family-display)', fontSize: 'var(--typography-size-sm)', fontWeight: 600, color: 'var(--surface-text)', lineHeight: 1.3 }}>
            {name}
          </h3>
        </div>
        <p style={{ fontSize: 'var(--typography-size-compact)', color: 'var(--surface-text-muted)', lineHeight: 1.5, flexGrow: 1 }}>
          {positioning}
        </p>
        {marketSharePct && (
          <div className="pt-2 border-t border-[var(--border-soft)]">
            <Badge theme="neutral" size="sm">{marketSharePct} pallet share</Badge>
          </div>
        )}
      </Card>
    </motion.div>
  );
}

const TOTAL_PALLETS = 4_870_150;

export function CompetitorLandscapeModule({
  marketShareChart, comparisonMatrix, positioningQuadrant, reportSlug,
}: Props) {
  const prefersReduced = useReducedMotion();
  const { openForm } = useLeadFormModal();
  const dispatch = useAnalytics();

  const handleUnlock = () => {
    dispatch('lead_wall_triggered', { section_name: 'CompetitorLandscapeModule', access_level: 'lead-gated' });
    openForm('sample', { reportSlug, sectionName: 'CompetitorLandscapeModule' });
  };

  const companyCards = comparisonMatrix?.rows.slice(0, 6).map((row) => {
    const nameCell = row.cells.find((c) => c.columnId === 'name');
    const servicesCell = row.cells.find((c) => c.columnId === 'services');
    const palletsCell = row.cells.find((c) => c.columnId === 'pallets');
    const pallets = Number(palletsCell?.value ?? 0);
    const sharePct = pallets > 0 ? ((pallets / TOTAL_PALLETS) * 100).toFixed(1) + '%' : undefined;
    return { name: String(nameCell?.value ?? ''), positioning: String(servicesCell?.value ?? ''), marketSharePct: sharePct };
  }) ?? [];

  const positioningGroups: Record<string, { label: string }[]> = { Leaders: [], Challengers: [], Followers: [], Niche: [] };
  positioningQuadrant?.points?.forEach((p) => {
    const group = getQuadrantLabel(p.x, p.y);
    positioningGroups[group].push({ label: p.label });
  });

  const fadeUp = (delay: number) => ({
    initial: prefersReduced ? (false as const) : ({ opacity: 0, y: 20 } as const),
    whileInView: { opacity: 1, y: 0 } as const,
    viewport: { once: true, margin: '-60px' as const },
    transition: { duration: 0.45, ease: 'easeOut' as const, delay: prefersReduced ? 0 : delay },
  });

  return (
    <SectionWrapper background="warm" spacing="lg" maxWidth="wide" id="sec-competitor-landscape">
      {/* Header */}
      <motion.div {...fadeUp(0)}>
        <div className="inline-flex mb-3">
          <SectionLabel background="light" variant="default">COMPETITIVE LANDSCAPE</SectionLabel>
        </div>
        <SectionHeading level={2} align="left">Competitive Landscape</SectionHeading>
      </motion.div>

      {/* 1. Overview */}
      <motion.div {...fadeUp(0.1)} style={{ marginTop: 'var(--space-8)' }}>
        <Card variant="white" padding="lg">
          <p style={{ fontSize: 'var(--typography-size-sm)', color: 'var(--surface-text-muted)', lineHeight: 1.7, maxWidth: '68ch' }}>
            The Australia cold chain market is highly fragmented with 200–250 operators.
            Lineage leads by pallet positions (12.5% share), followed by Americold and NewCold
            Advanced at 4.8% each. The remaining 66.9% is split among regional and local
            operators — creating consolidation opportunity at the mid-market tier.
          </p>
        </Card>
      </motion.div>

      {/* 2. Logo strip */}
      <motion.div {...fadeUp(0.15)} style={{ marginTop: 'var(--space-6)' }}>
        <p style={{ fontSize: 'var(--typography-size-compact)', fontWeight: 600, color: 'var(--surface-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 'var(--space-3)' }}>
          Key Players
        </p>
        <div style={{ overflowX: 'auto', paddingBottom: 'var(--space-2)' }} role="list" aria-label="Key competitors">
          <div style={{ display: 'flex', gap: 'var(--space-2)', minWidth: 'max-content' }}>
            {COMPETITOR_NAMES.map((name) => (
              <div key={name} role="listitem"><LogoChip name={name} /></div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* 3. Market-share chart */}
      {marketShareChart && (
        <motion.div {...fadeUp(0.1)} style={{ marginTop: 'var(--space-8)' }}>
          <ChartCard module={marketShareChart} reportSlug={reportSlug} />
        </motion.div>
      )}

      {/* 4. Positioning matrix */}
      {positioningQuadrant && (
        <motion.div {...fadeUp(0.1)} style={{ marginTop: 'var(--space-8)' }}>
          <div className="inline-flex mb-4">
            <SectionLabel background="light" variant="default">MARKET POSITIONING</SectionLabel>
          </div>
          <p style={{ fontSize: 'var(--typography-size-compact)', color: 'var(--surface-text-muted)', marginBottom: 'var(--space-4)' }}>
            {positioningQuadrant.axes?.x} × {positioningQuadrant.axes?.y}
          </p>
          <div style={{ overflowX: 'auto' }}>
            <div style={{ minWidth: '520px' }} className="grid grid-cols-2 gap-3">
              {QUADRANT_GROUPS.map((groupLabel) => (
                <Card key={groupLabel} variant="white" padding="md" className="flex flex-col gap-2">
                  <p style={{ fontSize: 'var(--typography-size-compact)', fontWeight: 700, color: 'var(--surface-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {groupLabel}
                  </p>
                  {positioningGroups[groupLabel].length > 0 ? (
                    <ul className="flex flex-col gap-1" role="list">
                      {positioningGroups[groupLabel].map((p) => (
                        <li key={p.label} style={{ fontSize: 'var(--typography-size-compact)', color: 'var(--surface-text)', lineHeight: 1.5 }}>{p.label}</li>
                      ))}
                    </ul>
                  ) : (
                    <p style={{ fontSize: 'var(--typography-size-compact)', color: 'var(--surface-text-muted)', fontStyle: 'italic' }}>No players mapped</p>
                  )}
                </Card>
              ))}
            </div>
          </div>
          <div style={{ marginTop: 'var(--space-4)' }}>
            <AccessLevelGate
              access={LEAD_GATED_ACCESS}
              moduleId="positioning-analysis"
              sectionName="CompetitorLandscapeModule"
              fallback={
                <div style={{ padding: 'var(--space-4)', borderRadius: 'var(--radius-sm)', background: 'var(--color-ramp-warm-100)', border: '1px solid var(--color-ramp-warm-300)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
                  <p style={{ fontSize: 'var(--typography-size-sm)', color: 'var(--surface-text-muted)' }}>
                    Full positioning analysis available on form submission.
                  </p>
                  <button
                    type="button" onClick={handleUnlock}
                    style={{ padding: 'var(--space-2) var(--space-4)', borderRadius: 'var(--radius-button)', border: 'none', background: 'var(--color-brand-red)', color: '#ffffff', fontSize: 'var(--typography-size-sm)', fontWeight: 500, cursor: 'pointer', minHeight: '44px', flexShrink: 0, transition: 'background-color 0.2s ease' }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-brand-red-dark, #8a1519)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-brand-red)'; }}
                  >
                    Unlock full analysis
                  </button>
                </div>
              }
            >
              <p style={{ fontSize: 'var(--typography-size-sm)', color: 'var(--surface-text-muted)', padding: 'var(--space-4)' }}>Full positioning analysis unlocked.</p>
            </AccessLevelGate>
          </div>
        </motion.div>
      )}

      {/* 5. Company cards */}
      {companyCards.length > 0 && (
        <motion.div {...fadeUp(0.05)} style={{ marginTop: 'var(--space-8)' }}>
          <div className="inline-flex mb-4">
            <SectionLabel background="light" variant="default">PLAYER PROFILES</SectionLabel>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {companyCards.map((company, index) => (
              <CompanyCard key={company.name} {...company} index={index} prefersReduced={prefersReduced} />
            ))}
          </div>
        </motion.div>
      )}

      {/* 6. Comparison table */}
      {comparisonMatrix && (
        <motion.div {...fadeUp(0.05)} style={{ marginTop: 'var(--space-8)' }}>
          <div className="inline-flex mb-4">
            <SectionLabel background="light" variant="default">COMPARISON TABLE</SectionLabel>
          </div>
          <CompetitorComparisonTable
            matrix={comparisonMatrix}
            reportSlug={reportSlug}
            onUnlock={handleUnlock}
          />
        </motion.div>
      )}
    </SectionWrapper>
  );
}
