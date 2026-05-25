'use client';

/**
 * CRAFT (aura-craft step 4.5 · 2026-05-12)
 * Section type: Hero
 * Lead element: H1 (display — Noto Serif · 2xl mobile / 3xl desktop · LCP element)
 * Support: 1-line product promise (text-sm/base · 0.7 opacity · DM Sans) + 3 proof bullets (tabular-nums)
 * Type rhythm: display/xl/base/xs (hero scale — largest on page; cockpit uses text-3xl for stat values)
 * Motion event: entrance stagger 60ms (left col fadeUp 500ms · right col 100ms delay) + tab cross-fade 200ms
 *   — useReducedMotion disables all · reduced state renders content at final position instantly
 * Depth: --shadow-card-default on cockpit panel (white card on warm bg · border + shadow per subtle-shadows strategy)
 * Mobile override: H1 2xl at 390px (not display) · tabs = horizontal-scroll chip row · CTAs stack vertically
 *   · trust strip wraps · cockpit panel always full-width below hero grid
 */

/**
 * ReportPDPHero — Hero cockpit (PRD §9)
 *
 * Variant: editorial-light
 * Background: warm · spacing: xl (LOCK 3)
 * Split: grid-cols-1 lg:grid-cols-[60%_40%] (recipe-locked exception)
 *
 * Left column: Breadcrumb badge chips · H1 (LCP) · promise · proof bullets · CTAs · trust strip
 * Right column: 4-tab cockpit (Market Size / Forecast / Segmentation / Competitors)
 *   Tab UI: role=tablist/div[role="tab"]/tabpanel · aria-selected · keyboard nav (ARIA §4.3.9)
 *   Mobile: horizontal-scroll chips
 *   Wave 2 wires live charts — static placeholders here
 */

import { useState, useCallback, type KeyboardEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Share2,
  ExternalLink,
  Mail,
  Link2,
  TrendingUp,
  CheckCircle2,
} from 'lucide-react';
import { Button, Badge, SectionWrapper } from '@kenresearch/design-system/atoms';
import type { HeroCockpit, Author } from '@/types/schema';
import { useLeadFormModal } from '@/components/LeadFormModalProvider';

export interface ReportPDPHeroProps {
  cockpit: HeroCockpit;
  authors: Author[];
  reportSlug: string;
}

const TAB_KEYS = ['marketSize', 'forecast', 'segmentation', 'competitors'] as const;
type TabKey = (typeof TAB_KEYS)[number];

const BADGE_THEME_MAP: Record<string, 'neutral' | 'info' | 'purple' | 'muted' | 'warm'> = {
  industry: 'neutral',
  region: 'info',
  'report-type': 'purple',
  date: 'muted',
};

// CSS token shorthands for repeated use
const TOKEN = {
  black: 'var(--color-foundation-black)',
  muted: 'var(--surface-text-muted)',
  red: 'var(--color-brand-red)',
  white: 'var(--color-foundation-white)',
  warm100: 'var(--color-ramp-warm-100)',
  warm400: 'var(--color-ramp-warm-400)',
  borderSoft: 'var(--border-soft)',
  borderDefault: 'var(--border-default)',
  radiusCard: 'var(--radius-card)',
  radiusButton: 'var(--radius-button)',
};

// ─── Share button ─────────────────────────────────────────────────────────────

function ShareButton({
  target,
  slug,
}: {
  target: 'linkedin' | 'twitter' | 'email' | 'copy-link';
  slug: string;
}) {
  const [copied, setCopied] = useState(false);
  const url = `https://www.kenresearch.com/${slug}`;

  const handleClick = useCallback(() => {
    if (target === 'copy-link') {
      void navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
      return;
    }
    const shareUrls: Record<string, string> = {
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
      email: `mailto:?subject=Ken Research Report&body=${encodeURIComponent(url)}`,
    };
    window.open(shareUrls[target], '_blank', 'noopener,noreferrer');
  }, [target, url]);

  const icons: Record<typeof target, React.ReactNode> = {
    linkedin: <ExternalLink size={14} aria-hidden="true" />,
    twitter: <ExternalLink size={14} aria-hidden="true" />,
    email: <Mail size={14} aria-hidden="true" />,
    'copy-link': copied ? (
      <CheckCircle2 size={14} aria-hidden="true" />
    ) : (
      <Link2 size={14} aria-hidden="true" />
    ),
  };

  const labels: Record<typeof target, string> = {
    linkedin: 'Share on LinkedIn',
    twitter: 'Share on Twitter',
    email: 'Share via email',
    'copy-link': copied ? 'Link copied' : 'Copy link',
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      iconOnly
      icon={icons[target]}
      onClick={handleClick}
      ariaLabel={labels[target]}
    />
  );
}

// ─── Tab placeholder content ──────────────────────────────────────────────────

function MarketSizePlaceholder({ cockpit }: { cockpit: HeroCockpit }) {
  const tab = cockpit.tabs.marketSize;
  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs font-body uppercase tracking-wider" style={{ color: TOKEN.muted }}>
        {tab.payload.zones?.insightLine ?? 'Market grew at 9.1% CAGR 2017–2022'}
      </p>
      <div className="flex items-end gap-3 py-4">
        <div>
          <p className="text-3xl font-display font-light tabular-nums" style={{ color: TOKEN.black }}>
            AUD 6,547.8 Mn
          </p>
          <p className="text-xs mt-1" style={{ color: TOKEN.muted }}>Market size · 2022</p>
        </div>
        <TrendingUp size={20} className="mb-1 flex-shrink-0" style={{ color: TOKEN.red }} aria-hidden="true" />
      </div>
      <div
        className="h-[120px] rounded-[var(--radius-card)] flex items-center justify-center"
        style={{ backgroundColor: TOKEN.warm100, border: `1px solid ${TOKEN.borderSoft}` }}
        aria-label="Market size chart — loads after hydration"
        role="img"
      >
        <p className="text-xs" style={{ color: TOKEN.muted }}>Chart · Wave 2</p>
      </div>
      <p className="text-2xs" style={{ color: TOKEN.muted }}>Source: Ken Research analysis</p>
    </div>
  );
}

function ForecastPlaceholder({ cockpit }: { cockpit: HeroCockpit }) {
  const tab = cockpit.tabs.forecast;
  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs font-body uppercase tracking-wider" style={{ color: TOKEN.muted }}>
        {tab.payload.zones?.insightLine ?? 'AUD 10,705 Mn by 2027 @ 10.03% CAGR'}
      </p>
      <div className="flex items-end gap-3 py-4">
        <div>
          <p className="text-3xl font-display font-light tabular-nums" style={{ color: TOKEN.black }}>
            AUD 10,705.0 Mn
          </p>
          <p className="text-xs mt-1" style={{ color: TOKEN.muted }}>Forecast · 2027</p>
        </div>
        <Badge variant="pill" size="sm" theme="success" bordered>
          10.03% CAGR
        </Badge>
      </div>
      <div
        className="h-[120px] rounded-[var(--radius-card)] flex items-center justify-center"
        style={{ backgroundColor: TOKEN.warm100, border: `1px solid ${TOKEN.borderSoft}` }}
        aria-label="Forecast chart — loads after hydration"
        role="img"
      >
        <p className="text-xs" style={{ color: TOKEN.muted }}>Chart · Wave 2</p>
      </div>
      <p className="text-2xs" style={{ color: TOKEN.muted }}>Source: Ken Research analysis</p>
    </div>
  );
}

function SegmentationPlaceholder({ cockpit }: { cockpit: HeroCockpit }) {
  const tab = cockpit.tabs.segmentation;
  const segments =
    'datasetPreview' in tab.payload
      ? (tab.payload as { datasetPreview?: { rows?: { cells: { columnId: string; value: string | number }[] }[] } })?.datasetPreview?.rows?.slice(0, 3)
      : [];
  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs font-body uppercase tracking-wider" style={{ color: TOKEN.muted }}>
        End-user segmentation 2022
      </p>
      {segments && segments.length > 0 && (
        <ul className="flex flex-col gap-1.5">
          {segments.map((row) => {
            const seg = row.cells.find((c) => c.columnId === 'segment')?.value ?? '';
            const share = row.cells.find((c) => c.columnId === 'share')?.value ?? 0;
            return (
              <li key={String(seg)} className="flex items-center justify-between text-sm font-body" style={{ color: TOKEN.black }}>
                <span>{String(seg)}</span>
                <span className="tabular-nums font-medium">{share}%</span>
              </li>
            );
          })}
        </ul>
      )}
      <div
        className="h-[100px] rounded-[var(--radius-card)] flex items-center justify-center"
        style={{ backgroundColor: TOKEN.warm100, border: `1px solid ${TOKEN.borderSoft}` }}
        aria-label="Segmentation chart — loads after hydration"
        role="img"
      >
        <p className="text-xs" style={{ color: TOKEN.muted }}>Donut chart · Wave 2</p>
      </div>
      <p className="text-2xs" style={{ color: TOKEN.muted }}>Source: Ken Research analysis</p>
    </div>
  );
}

function CompetitorsPlaceholder({ cockpit }: { cockpit: HeroCockpit }) {
  const logos = cockpit.tabs.competitors.payload.logos;
  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs font-body uppercase tracking-wider" style={{ color: TOKEN.muted }}>
        Key players · Australia Cold Chain
      </p>
      <div className="flex flex-wrap gap-2">
        {logos.map((co) => (
          <div
            key={co.name}
            className="flex h-8 items-center justify-center rounded-[var(--radius-button)] px-3"
            style={{
              backgroundColor: TOKEN.white,
              border: `1px solid ${TOKEN.borderSoft}`,
            }}
            title={co.name}
          >
            <span className="text-xs font-body font-medium" style={{ color: TOKEN.black }}>
              {co.name}
            </span>
          </div>
        ))}
      </div>
      <div
        className="h-[80px] rounded-[var(--radius-card)] flex items-center justify-center"
        style={{ backgroundColor: TOKEN.warm100, border: `1px solid ${TOKEN.borderSoft}` }}
        aria-label="Positioning matrix — lead-gated"
        role="img"
      >
        <p className="text-xs" style={{ color: TOKEN.muted }}>Market share chart · Wave 2</p>
      </div>
      <p className="text-2xs" style={{ color: TOKEN.muted }}>
        200–250 players · Highly fragmented
      </p>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function ReportPDPHero({ cockpit, authors, reportSlug }: ReportPDPHeroProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('marketSize');
  const shouldReduceMotion = useReducedMotion();
  const { openForm } = useLeadFormModal();

  const analyst = authors.find((a) => a.id === cockpit.trustStrip.authorId) ?? authors[0];

  const TAB_LABELS: Record<TabKey, string> = {
    marketSize: cockpit.tabs.marketSize.label,
    forecast: cockpit.tabs.forecast.label,
    segmentation: cockpit.tabs.segmentation.label,
    competitors: cockpit.tabs.competitors.label,
  };

  // Keyboard navigation — ARIA tablist pattern
  const handleTabKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>, key: TabKey) => {
      const idx = TAB_KEYS.indexOf(key);
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        setActiveTab(TAB_KEYS[(idx + 1) % TAB_KEYS.length]);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setActiveTab(TAB_KEYS[(idx - 1 + TAB_KEYS.length) % TAB_KEYS.length]);
      } else if (e.key === 'Home') {
        e.preventDefault();
        setActiveTab(TAB_KEYS[0]);
      } else if (e.key === 'End') {
        e.preventDefault();
        setActiveTab(TAB_KEYS[TAB_KEYS.length - 1]);
      }
    },
    [],
  );

  const fadeUp = shouldReduceMotion
    ? {}
    : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };

  return (
    <SectionWrapper background="warm" spacing="xl" id="hero" className="min-h-[50vh] sm:min-h-[55vh] flex items-center">
      <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-10 lg:gap-16 items-start">
        {/* ── LEFT COLUMN ────────────────────────────────────── */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-5"
        >
          {/* Badge chips row */}
          <div className="flex flex-wrap gap-2" aria-label="Report categories">
            {cockpit.badges.map((b) => (
              <Badge
                key={b.label}
                variant="pill"
                size="xs"
                theme={BADGE_THEME_MAP[b.theme] ?? 'neutral'}
                bordered
              >
                {b.label}
              </Badge>
            ))}
          </div>

          {/* H1 — LCP element · Major Third scale (legacy parity 2026-05-14) */}
          <h1
            className="text-[1.953rem] sm:text-[2.441rem] md:text-[3.052rem] font-display font-light leading-[1.2] tracking-[-0.02em]"
            style={{ color: TOKEN.black }}
            id="report-title"
          >
            {cockpit.h1}
          </h1>

          {/* Product promise */}
          <p
            className="text-sm sm:text-base font-body leading-relaxed"
            style={{ opacity: 0.7, color: TOKEN.black }}
          >
            {cockpit.promise}
          </p>

          {/* Research proof bullets */}
          <ul className="flex flex-col gap-2" aria-label="Key research figures">
            {cockpit.proofBullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-2.5">
                <CheckCircle2
                  size={16}
                  className="mt-0.5 flex-shrink-0"
                  style={{ color: TOKEN.red }}
                  aria-hidden="true"
                />
                <span
                  className="text-compact font-body tabular-nums"
                  style={{ color: TOKEN.black }}
                >
                  {bullet}
                </span>
              </li>
            ))}
          </ul>

          {/* CTAs — 44px min touch targets */}
          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <Button
              variant="brand"
              size="md"
              animatedArrow
              onClick={() =>
                openForm('sample', {
                  reportSlug,
                  ctaLocation: 'hero-primary',
                  sectionName: 'hero',
                })
              }
            >
              {cockpit.ctas.primary.label}
            </Button>
            <Button
              variant="secondary"
              size="md"
              onClick={() =>
                openForm('analyst-call', {
                  reportSlug,
                  ctaLocation: 'hero-secondary',
                  sectionName: 'hero',
                })
              }
            >
              {cockpit.ctas.secondary.label}
            </Button>
          </div>

          {/* Trust strip */}
          <div
            className="flex flex-wrap items-center gap-3 pt-2 border-t"
            style={{ borderTopColor: TOKEN.borderSoft }}
          >
            {/* Analyst initials avatar */}
            <div className="flex items-center gap-2.5">
              <div
                className="h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-body font-bold"
                style={{ backgroundColor: TOKEN.warm400, color: TOKEN.black }}
                aria-hidden="true"
              >
                {analyst
                  ? analyst.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .slice(0, 2)
                      .toUpperCase()
                  : 'KR'}
              </div>
              <div className="flex flex-col">
                <span
                  className="text-compact font-body font-medium"
                  style={{ color: TOKEN.black }}
                >
                  {analyst?.name ?? 'Ken Research Analyst'}
                </span>
                <span className="text-2xs" style={{ color: TOKEN.muted }}>
                  {analyst?.role ?? 'Senior Analyst'}
                </span>
              </div>
            </div>
            <div
              className="hidden sm:block h-4 w-px"
              style={{ backgroundColor: TOKEN.borderDefault }}
              aria-hidden="true"
            />
            <span className="text-2xs" style={{ color: TOKEN.muted }}>
              {cockpit.trustStrip.lastUpdatedDisplay}
            </span>
            <div
              className="hidden sm:block h-4 w-px"
              style={{ backgroundColor: TOKEN.borderDefault }}
              aria-hidden="true"
            />
            {/* Share icons */}
            <div className="flex items-center gap-1.5" aria-label="Share this report">
              <Share2 size={12} style={{ color: TOKEN.muted }} aria-hidden="true" />
              {cockpit.trustStrip.shareTargets.map((t) => (
                <ShareButton key={t} target={t} slug={reportSlug} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── RIGHT COLUMN — Tab cockpit (sticky on desktop · keeps price/CTAs in view) ─────────────────────── */}
        <motion.div
          {...(shouldReduceMotion ? {} : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } })}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:sticky lg:top-24 lg:self-start"
        >
          {/* Tab strip — horizontal scroll on mobile */}
          <div
            className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 pb-1"
            style={{ scrollbarWidth: 'none' }}
          >
            <div
              role="tablist"
              aria-label="Report data views"
              className="flex gap-1 min-w-max sm:min-w-0 sm:grid sm:grid-cols-4"
            >
              {TAB_KEYS.map((key) => (
                // role="tab" on div — ARIA §4.3.9 permits interactive role on any element w/ tabIndex
                // DS Button doesn't expose role/aria-selected/tabIndex for tablist semantics
                <div
                  key={key}
                  role="tab"
                  id={`hero-tab-${key}`}
                  aria-selected={activeTab === key}
                  aria-controls={`hero-panel-${key}`}
                  tabIndex={activeTab === key ? 0 : -1}
                  onClick={() => setActiveTab(key)}
                  onKeyDown={(e) => handleTabKeyDown(e, key)}
                  className="cursor-pointer px-3 py-2 text-compact font-body font-medium rounded-t-[var(--radius-button)] transition-all duration-150 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 border-b-2 border-transparent"
                  style={{
                    color: activeTab === key ? TOKEN.black : TOKEN.muted,
                    borderBottomColor: activeTab === key ? TOKEN.red : 'transparent',
                    outlineColor: TOKEN.red,
                  }}
                >
                  {TAB_LABELS[key]}
                </div>
              ))}
            </div>
          </div>

          {/* Tab panels */}
          <div
            className="rounded-b-[var(--radius-card)] rounded-tr-[var(--radius-card)] p-5"
            style={{
              backgroundColor: TOKEN.white,
              border: `1px solid ${TOKEN.borderSoft}`,
            }}
          >
            {TAB_KEYS.map((key) => (
              <div
                key={key}
                role="tabpanel"
                id={`hero-panel-${key}`}
                aria-labelledby={`hero-tab-${key}`}
                hidden={activeTab !== key}
                tabIndex={0}
              >
                {activeTab === key && (
                  <motion.div
                    key={key}
                    initial={shouldReduceMotion ? {} : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {key === 'marketSize' && <MarketSizePlaceholder cockpit={cockpit} />}
                    {key === 'forecast' && <ForecastPlaceholder cockpit={cockpit} />}
                    {key === 'segmentation' && <SegmentationPlaceholder cockpit={cockpit} />}
                    {key === 'competitors' && <CompetitorsPlaceholder cockpit={cockpit} />}
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          {/* Hero metadata strip */}
          <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1">
            {[
              { term: 'Pages', val: String(cockpit.metadata.pages) },
              { term: 'Product code', val: cockpit.metadata.productCode },
              { term: 'Base year', val: String(cockpit.metadata.baseYear) },
              { term: 'Forecast', val: cockpit.metadata.forecastPeriod },
              { term: 'Format', val: cockpit.metadata.format.toUpperCase() },
              { term: 'Delivery', val: cockpit.metadata.deliveryType },
            ].map(({ term, val }) => (
              <div key={term} className="flex gap-1.5 items-baseline">
                <dt className="text-2xs shrink-0" style={{ color: TOKEN.muted }}>{term}:</dt>
                <dd className="text-2xs font-medium truncate" style={{ color: TOKEN.black }}>
                  {val}
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
