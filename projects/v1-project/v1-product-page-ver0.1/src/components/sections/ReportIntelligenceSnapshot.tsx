'use client';

/**
 * CRAFT (aura-craft step 4.5 · 2026-05-12)
 * Section type: content-dense (snapshot grid)
 * Lead element: 4-tile metric strip (market size · forecast · CAGR · players) — biggest numbers eye hits first
 * Support: segment badges + company logos (secondary visual weight) + use-case chips (tertiary)
 * Type rhythm: 2xl/lg/base/xs (content-dense scale · stat values use text-lg tabular-nums · labels text-2xs uppercase)
 * Motion event: whileInView fade-up stagger 60ms per metric tile (once · viewport -40px margin)
 *   — useReducedMotion disables stagger; renders at final state
 * Depth: Card variant="outlined" shadow="none" on metric tiles (subtle-shadows · border present · no double-shadow)
 *   Card variant="white" shadow="sm" on segments/companies cards
 * Mobile override: 2-col grid for metric tiles (grid-cols-2) · segment/company cards stack to 1-col
 */

/**
 * ReportIntelligenceSnapshot — Premium product-card summary (PRD §10)
 *
 * Variant: editorial-light
 * Background: white · spacing: lg (LOCK 3)
 * Access: public
 *
 * Public minimum (PRD §21): market size + forecast + CAGR always visible HTML text
 */

import { motion, useReducedMotion } from 'framer-motion';
import {
  BarChart3,
  TrendingUp,
  Users,
  PieChart,
  FileText,
  Phone,
  Settings,
  Download,
  Table2,
} from 'lucide-react';
import {
  SectionWrapper,
  SectionHeading,
  Card,
  Badge,
} from '@kenresearch/design-system/atoms';
import type { ReportSnapshot } from '@/types/schema';

export interface ReportIntelligenceSnapshotProps {
  snapshot: ReportSnapshot;
}

const USE_CASE_LABELS: Record<string, string> = {
  'market-entry': 'Market Entry',
  'competitive-benchmarking': 'Competitive Benchmarking',
  'investment-screening': 'Investment Screening',
  'expansion-planning': 'Expansion Planning',
  'supply-chain-strategy': 'Supply Chain Strategy',
  'procurement-planning': 'Procurement Planning',
  'product-strategy': 'Product Strategy',
  'growth-decisions': 'Growth Decisions',
};

const OUTPUT_ICONS: Record<string, React.ReactNode> = {
  pdf: <FileText size={14} aria-hidden="true" />,
  charts: <BarChart3 size={14} aria-hidden="true" />,
  tables: <Table2 size={14} aria-hidden="true" />,
  sample: <Download size={14} aria-hidden="true" />,
  'analyst-call': <Phone size={14} aria-hidden="true" />,
  customization: <Settings size={14} aria-hidden="true" />,
  excel: <Table2 size={14} aria-hidden="true" />,
};

const OUTPUT_LABELS: Record<string, string> = {
  pdf: 'PDF Report',
  charts: 'Interactive Charts',
  tables: 'Data Tables',
  sample: 'Free Sample',
  'analyst-call': 'Analyst Call',
  customization: 'Customization',
  excel: 'Excel Export',
};

export function ReportIntelligenceSnapshot({ snapshot }: ReportIntelligenceSnapshotProps) {
  const shouldReduceMotion = useReducedMotion();

  const metrics = [
    {
      id: 'market-size',
      icon: <BarChart3 size={20} aria-hidden="true" />,
      label: 'Market Size',
      value: `${snapshot.marketSize.unit} ${snapshot.marketSize.value.toLocaleString('en-AU')}`,
      sub: String(snapshot.marketSize.year),
    },
    {
      id: 'forecast',
      icon: <TrendingUp size={20} aria-hidden="true" />,
      label: 'Forecast',
      value: `${snapshot.forecast.unit} ${snapshot.forecast.value.toLocaleString('en-AU')}`,
      sub: String(snapshot.forecast.year),
    },
    {
      id: 'cagr',
      icon: <BarChart3 size={20} aria-hidden="true" />,
      label: 'CAGR',
      value: `${snapshot.forecast.cagr}%`,
      sub: snapshot.forecast.period,
    },
    {
      id: 'players',
      icon: <Users size={20} aria-hidden="true" />,
      label: 'Players',
      value: `${snapshot.majorCompanies.lockedFullCount ?? 200}+`,
      sub: 'active operators',
    },
  ];

  return (
    <SectionWrapper background="white" spacing="lg" id="intelligence-snapshot">
      <div className="flex flex-col gap-8">
        <SectionHeading level={2} eyebrow="Report Intelligence" align="left">
          What this report covers
        </SectionHeading>

        {/* Key metrics strip — public minimum */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4" role="list" aria-label="Key market metrics">
          {metrics.map((m, i) => (
            <motion.div
              key={m.id}
              role="listitem"
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            >
              <Card variant="outlined" padding="md" shadow="none">
                <div className="flex flex-col gap-2">
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-button)]"
                    style={{ backgroundColor: 'var(--color-ramp-warm-200)' }}
                    aria-hidden="true"
                  >
                    <span style={{ color: 'var(--color-brand-red)' }}>{m.icon}</span>
                  </div>
                  <div>
                    <p className="text-2xs uppercase tracking-wider font-body mb-1"
                      style={{ color: 'var(--surface-text-muted)' }}>
                      {m.label}
                    </p>
                    {/* Public minimum — visible HTML text */}
                    <p className="text-lg font-display font-light tabular-nums leading-tight"
                      style={{ color: 'var(--color-foundation-black)' }}>
                      {m.value}
                    </p>
                    <p className="text-2xs mt-0.5" style={{ color: 'var(--surface-text-muted)' }}>
                      {m.sub}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Segments + Companies */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <Card variant="white" padding="md" shadow="sm">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <PieChart size={16} style={{ color: 'var(--color-brand-red)' }} aria-hidden="true" />
                  <h3 className="text-compact font-body font-semibold"
                    style={{ color: 'var(--color-foundation-black)' }}>
                    Primary segments covered
                  </h3>
                </div>
                {/* Public HTML text — never gated */}
                <ul className="flex flex-wrap gap-1.5" aria-label="Market segments">
                  {snapshot.segments.primary.map((seg) => (
                    <li key={seg}>
                      <Badge
                        variant="rounded"
                        size="sm"
                        theme={seg === snapshot.segments.dominant ? 'brand' : 'neutral'}
                        bordered
                      >
                        {seg}
                        {seg === snapshot.segments.dominant && ' ★'}
                      </Badge>
                    </li>
                  ))}
                </ul>
                {snapshot.segments.dominant && (
                  <p className="text-2xs" style={{ color: 'var(--surface-text-muted)' }}>
                    ★ Dominant segment: {snapshot.segments.dominant}
                  </p>
                )}
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
          >
            <Card variant="white" padding="md" shadow="sm">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Users size={16} style={{ color: 'var(--color-brand-red)' }} aria-hidden="true" />
                  <h3 className="text-compact font-body font-semibold"
                    style={{ color: 'var(--color-foundation-black)' }}>
                    Major companies profiled
                  </h3>
                </div>
                {/* Company names — public minimum */}
                <ul className="flex flex-wrap gap-1.5" aria-label="Major market players">
                  {snapshot.majorCompanies.logos.map((co) => (
                    <li key={co.name}>
                      <Badge variant="rounded" size="sm" theme="muted" bordered>
                        {co.name}
                      </Badge>
                    </li>
                  ))}
                  {snapshot.majorCompanies.lockedFullCount && (
                    <li>
                      <Badge variant="rounded" size="sm" theme="purple" bordered>
                        +{snapshot.majorCompanies.lockedFullCount - snapshot.majorCompanies.logos.length} more
                      </Badge>
                    </li>
                  )}
                </ul>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Buyer use cases */}
        <div className="flex flex-col gap-3">
          <p className="text-xs uppercase tracking-wider font-body font-semibold"
            style={{ color: 'var(--surface-text-muted)' }}>
            This report supports
          </p>
          <ul className="flex flex-wrap gap-2" aria-label="Buyer use cases">
            {snapshot.buyerUseCases.map((uc) => (
              <li key={uc}>
                <Badge variant="pill" size="sm" theme="neutral" bordered>
                  {USE_CASE_LABELS[uc] ?? uc}
                </Badge>
              </li>
            ))}
          </ul>
        </div>

        {/* Available outputs */}
        <div className="flex flex-col gap-3">
          <p className="text-xs uppercase tracking-wider font-body font-semibold"
            style={{ color: 'var(--surface-text-muted)' }}>
            Available with this report
          </p>
          <ul className="flex flex-wrap gap-2" aria-label="Report outputs">
            {snapshot.availableOutputs.map((out) => (
              <li key={out} className="flex items-center gap-1.5">
                <span style={{ color: 'var(--color-brand-red)' }}>{OUTPUT_ICONS[out]}</span>
                <span className="text-compact font-body" style={{ color: 'var(--color-foundation-black)' }}>
                  {OUTPUT_LABELS[out] ?? out}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionWrapper>
  );
}
