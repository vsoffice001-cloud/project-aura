/**
 * ReportCard — Organism (Report Store variant)
 * Ken Bold DS v4.2
 *
 * WHAT:    Multi-variant card for market research reports (grid/list/compact/featured)
 * WHY:     Primary content unit for Report Store — displays report metadata with rich interactions
 * WHERE:   Report Store listing mode + FeaturedResearch + IndustryReportSection
 * WHEN:    Renders for each report in filtered results
 * HOW:     Dispatches to GridCard/ListCard/CompactCard/FeaturedCard based on variant prop
 *
 * NOTE: This is the REPORT STORE card. The case study ResourceCard is a separate component
 *       with different data shape and variant system.
 *
 * Data coupling: none (report data via props)
 * Props: variant, report (ReportCardData), onView, showProjection, showMeta, etc.
 */
import { type ReactNode, type CSSProperties } from 'react';
import {
  MapPin,
  Calendar,
  Table2,
  BarChart3,
  TrendingUp,
  Crown,
  ArrowRight,
} from 'lucide-react';
import { RevealImage } from './molecules/RevealImage';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { iconColors } from './iconColors';
import { Badge } from './Badge';
import { Button } from './Button';
import { IndustryBadge, CardMetaRow } from './molecules';
import { Tooltip } from './Tooltip';
import type { CardMetaVariant } from './molecules/CardMetaRow';
import { Card } from './Card';

/* ─── Data Interface ─── */
export interface ReportCardData {
  id: string;
  title: string;
  industry: string;
  subcat?: string;
  region: string;
  date: string;
  pages: number;
  tables?: number;
  figures?: number;
  downloads: string;
  projection: string;
  formats: string[];
  badge: string | null;
  image: string;
}

/* ─── Props ─── */
export type ReportCardVariant = 'grid' | 'list' | 'compact' | 'featured';

interface ReportCardProps {
  variant?: ReportCardVariant;
  report: ReportCardData;
  onView: () => void;

  /** Save/bookmark state */
  saved?: boolean;
  onToggleSave?: () => void;

  /** For compact variant: rank position (1-indexed) */
  rank?: number;

  /** Show/hide zones — defaults vary by variant */
  showProjection?: boolean;
  showMeta?: boolean;
  showSave?: boolean;
  showViewButton?: boolean;
  showEyebrow?: boolean;

  /** Override eyebrow content — defaults to industry badge only */
  eyebrow?: ReactNode;

  /** Custom className for outer wrapper */
  className?: string;

  /** Animation delay for staggered lists (ms) */
  animationDelay?: number;

  /** Meta row variant: A = projection+region, B = region+date (no projection) */
  metaVariant?: CardMetaVariant;
}

/* ─── Badge Variant Mapping ─── */
/** Maps report badge strings to DS Badge theme for on-image dark-mode usage */
function getImageBadgeTheme(badge: string): 'brand' | 'neutral' | 'warm' {
  const lower = badge.toLowerCase();
  if (lower === 'hot' || lower === 'featured') return 'brand';
  return 'neutral';
}

/** Maps report badge strings to DS Badge theme/mode for light-background contexts */
function getCardBadgeProps(badge: string): { theme: 'brand' | 'neutral' | 'warm'; mode: 'light' | 'dark' } {
  const lower = badge.toLowerCase();
  if (lower === 'hot' || lower === 'featured') return { theme: 'brand', mode: 'dark' };
  return { theme: 'neutral', mode: 'dark' };
}

/* ─── Image Badge Overrides ─── */
/**
 * Badges on image layers need HIGHER opacity backgrounds than standard dark-mode
 * (which uses ~15-20% opacity, designed for dark page backgrounds).
 * These overrides push backgrounds to ~50-70% opacity with backdrop-blur for
 * guaranteed readability over any image content.
 *
 * Overrides the --badge-* CSS custom properties that Badge.tsx sets inline.
 */
const IMAGE_BADGE_BASE: CSSProperties = {
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  textShadow: '0 1px 2px rgba(0, 0, 0, 0.4)',
} as CSSProperties;

const IMAGE_BADGE_OVERRIDES: Record<string, CSSProperties> = {
  brand: {
    ...IMAGE_BADGE_BASE,
    '--badge-bg': 'rgba(176, 31, 36, 0.65)',
    '--badge-border': 'rgba(176, 31, 36, 0.8)',
    '--badge-text': 'rgba(255, 255, 255, 0.95)',
    '--badge-hover-bg': 'rgba(176, 31, 36, 0.75)',
    '--badge-hover-border': 'rgba(176, 31, 36, 0.9)',
  } as CSSProperties,
  neutral: {
    ...IMAGE_BADGE_BASE,
    '--badge-bg': 'rgba(0, 0, 0, 0.55)',
    '--badge-border': 'rgba(255, 255, 255, 0.12)',
    '--badge-text': 'rgba(255, 255, 255, 0.92)',
    '--badge-hover-bg': 'rgba(0, 0, 0, 0.65)',
    '--badge-hover-border': 'rgba(255, 255, 255, 0.2)',
  } as CSSProperties,
  warm: {
    ...IMAGE_BADGE_BASE,
    '--badge-bg': 'rgba(166, 150, 142, 0.45)',
    '--badge-border': 'rgba(166, 150, 142, 0.6)',
    '--badge-text': 'rgba(255, 255, 255, 0.9)',
    '--badge-hover-bg': 'rgba(166, 150, 142, 0.55)',
    '--badge-hover-border': 'rgba(166, 150, 142, 0.75)',
  } as CSSProperties,
  success: {
    ...IMAGE_BADGE_BASE,
    '--badge-bg': 'rgba(34, 197, 94, 0.22)',
    '--badge-border': 'rgba(34, 197, 94, 0.5)',
    '--badge-text': 'rgba(187, 247, 208, 1)',
    '--badge-hover-bg': 'rgba(34, 197, 94, 0.3)',
    '--badge-hover-border': 'rgba(34, 197, 94, 0.65)',
  } as CSSProperties,
};

/** Returns style overrides for a Badge placed on an image layer */
function getImageBadgeStyle(theme: string): CSSProperties {
  return IMAGE_BADGE_OVERRIDES[theme] || IMAGE_BADGE_BASE;
}

/* ═══════════════════════════════════════════════════════════
   GRID VARIANT — Vertical card with 16:9 image
   ═══════════════════════════════════════════════════════════ */
function GridCard({
  report,
  onView,
  showProjection = true,
  showMeta = true,
  showSave = true,
  showViewButton = true,
  showEyebrow = true,
  eyebrow,
  className = '',
  metaVariant = 'A',
}: ReportCardProps) {
  return (
    <Card
      as="article"
      hover
      className={`group relative flex flex-col cursor-pointer overflow-hidden h-full ${className}`}
      onClick={onView}
    >
      {/* ── Zone 1: Image ── */}
      <div className="relative overflow-hidden aspect-[16/9]">
        <RevealImage
          src={report.image}
          alt={report.title}
          className="w-full h-full object-cover img-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Badge — top left */}
        {report.badge && (
          <div className="absolute top-3 left-3">
            <Badge variant="rounded" size="xs" theme={getImageBadgeTheme(report.badge)} mode="dark" bordered style={getImageBadgeStyle(getImageBadgeTheme(report.badge))}>
              {report.badge}
            </Badge>
          </div>
        )}
      </div>

      {/* ── Zone 2: Content ── */}
      <div className="flex flex-col flex-1 p-4">
        {/* Eyebrow — industry badge only (no region per DS anatomy) */}
        {showEyebrow && (
          <div
            className="flex items-center gap-2 mb-2.5"
            style={{ fontSize: 'var(--text-2xs)' }}
          >
            {metaVariant === 'A' && (
              <IndustryBadge>{report.subcat || report.industry}</IndustryBadge>
            )}
          </div>
        )}

        {/* Title */}
        <h3
          className="text-black/85 leading-snug line-clamp-2 mb-2.5 group-hover:text-black transition-colors"
          style={{ fontSize: 'var(--text-nav)' }}
          title={report.title}
        >
          {report.title}
        </h3>

        {/* Inline meta row: projection · region (DS anatomy) */}
        <div className="mb-2.5">
          <CardMetaRow
            projection={metaVariant === 'A' && showProjection ? report.projection : null}
            region={report.region}
            date={metaVariant === 'B' ? report.date : undefined}
            variant={metaVariant}
          />
        </div>

        {/* Compact meta row — hide date in variant B (already in CardMetaRow) */}
        {showMeta && (
          <div
            className="flex flex-wrap items-center gap-x-3 gap-y-1 text-black/40"
            style={{ fontSize: 'var(--text-2xs)' }}
          >
            {metaVariant === 'A' && (
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" color={iconColors.utility} />
                {report.date}
              </span>
            )}
          </div>
        )}

      </div>
    </Card>
  );
}

/* ═══════════════════════════════════════════════════════════
   LIST VARIANT — Horizontal card, 2:3 portrait image
   ═══════════════════════════════════════════════════════════ */
function ListCard({
  report,
  onView,
  showProjection = true,
  showMeta = true,
  showSave = true,
  showViewButton = true,
  showEyebrow = true,
  eyebrow,
  className = '',
  metaVariant = 'A',
}: ReportCardProps) {
  return (
    <Card
      as="article"
      hover
      className={`group flex cursor-pointer overflow-hidden ${className}`}
      onClick={onView}
    >
      {/* Column 1: Image — portrait 2:3, edge-to-edge */}
      <div
        className="w-16 sm:w-20 flex-shrink-0 relative overflow-hidden self-stretch"
      >
        <div className="absolute inset-0">
          <RevealImage
            src={report.image}
            alt={report.title}
            className="w-full h-full object-cover img-zoom"
          />
        </div>
      </div>

      {/* Column 2: Content */}
      <div className="flex-1 min-w-0 flex flex-col py-2.5 px-3 sm:px-4">
        {/* Eyebrow — industry badge only (DS anatomy) */}
        {showEyebrow && (
          <div
            className="flex items-center gap-2 mb-1.5"
            style={{ fontSize: 'var(--text-xs)' }}
          >
            {eyebrow || (
              <IndustryBadge>{report.subcat || report.industry}</IndustryBadge>
            )}
          </div>
        )}

        {/* Title */}
        <h3
          className="text-black/80 leading-snug line-clamp-2 mb-1.5 group-hover:text-black transition-colors"
          style={{ fontSize: 'var(--text-nav)' }}
          title={report.title}
        >
          {report.title}
        </h3>

        {/* Inline meta row: projection · region (DS anatomy) */}
        <CardMetaRow
          projection={metaVariant === 'A' && showProjection ? report.projection : null}
          region={report.region}
          date={metaVariant === 'B' ? report.date : undefined}
          variant={metaVariant}
        />
      </div>

      {/* Column 3: Meta + Actions — desktop */}
      <div className="hidden sm:flex flex-col items-end flex-shrink-0 justify-between py-2.5 pr-3 sm:pr-4">
        <div className="flex flex-col items-end gap-1.5">
          {showMeta && metaVariant === 'A' && (
            <div
              className="flex items-center gap-2.5 text-black/40"
              style={{ fontSize: 'var(--text-2xs)' }}
            >
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" color={iconColors.utility} />
                {report.date}
              </span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          {showViewButton && (
            <div onClick={(e) => e.stopPropagation()}>
              <Button variant="secondary" size="xs" showArrow onClick={onView}>
                View Report
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile: inline actions */}
      <div className="flex sm:hidden flex-col items-end justify-between flex-shrink-0 py-2.5 pr-3">
        <div className="flex flex-col items-end gap-1">
          {report.badge && (
            <Badge variant="rounded" size="xs" theme={getImageBadgeTheme(report.badge)} mode="light" bordered>
              {report.badge}
            </Badge>
          )}
          {showMeta && (
            <div
              className="flex items-center gap-2 text-black/40"
              style={{ fontSize: 'var(--text-2xs)' }}
            >
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" color={iconColors.utility} />
                {report.date}
              </span>
            </div>
          )}
        </div>
        {showViewButton && (
          <div onClick={(e) => e.stopPropagation()}>
            <Button variant="secondary" size="xs" showArrow onClick={onView}>
              View
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}

/* ═══════════════════════════════════════════════════════════
   COMPACT VARIANT — Ranked list item with small thumbnail
   ═══════════════════════════════════════════════════════════ */
function CompactCard({
  report,
  onView,
  rank,
  showProjection = false,
  showMeta = true,
  className = '',
}: ReportCardProps) {
  return (
    <div
      className={`flex items-center gap-4 p-4 hover:bg-black/[0.03] transition-all cursor-pointer group ${className}`}
      onClick={onView}
    >
      {/* Rank badge */}
      {rank != null && (
        <div
          className={`w-8 h-8 flex items-center justify-center flex-shrink-0 tabular-nums ${
            rank <= 3 ? 'text-white' : 'text-black/50'
          }`}
          style={{
            fontSize: 'var(--text-xs)',
            borderRadius: 'var(--radius-element)',
            background: rank <= 3 ? 'var(--text-primary)' : 'var(--warm-300)',
          }}
        >
          {rank}
        </div>
      )}

      {/* Thumbnail */}
      <div
        className="w-12 aspect-[2/3] overflow-hidden flex-shrink-0"
        style={{
          borderRadius: 'var(--rc-radius-image)',
          border: '1px solid var(--warm-500)',
        }}
      >
        <ImageWithFallback
          src={report.image}
          alt=""
          className="w-full h-full object-cover img-zoom"
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h4
          className="text-black/80 truncate group-hover:text-black transition-colors"
          style={{ fontSize: 'var(--text-nav)' }}
          title={report.title}
        >
          {report.title}
        </h4>
        <div className="flex items-center gap-1.5 mt-1">
          <IndustryBadge>{report.industry}</IndustryBadge>
        </div>
      </div>

      {/* Meta — desktop */}
      {showMeta && (
        <div
          className="hidden sm:flex items-center gap-5 flex-shrink-0"
          style={{ fontSize: 'var(--text-xs)' }}
        >
          <span className="text-black/40 flex items-center gap-1">
            <MapPin className="h-3 w-3" color={iconColors.utility} />
            {report.region}
          </span>
          {showProjection && report.projection && (
            <span
              className="flex items-center gap-1 tabular-nums"
              style={{ color: 'var(--green-600)' }}
            >
              <TrendingUp className="h-3 w-3" />
              {report.projection}
            </span>
          )}
        </div>
      )}

      <ArrowRight className="h-4 w-4 text-black/30 group-hover:text-black transition-colors flex-shrink-0" />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   FEATURED VARIANT — Full-bleed hero overlay
   ═══════════════════════════════════════════════════════════ */
function FeaturedCard({
  report,
  onView,
  className = '',
}: ReportCardProps) {
  return (
    <article
      className={`group relative overflow-hidden cursor-pointer ${className}`}
      style={{ borderRadius: 'var(--rc-radius-card)' }}
      onClick={onView}
    >
      <ImageWithFallback
        src={report.image}
        alt={report.title}
        className="absolute inset-0 w-full h-full object-cover img-zoom"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/5" />
      <div className="absolute inset-0 p-7 flex flex-col justify-end">
        {/* Top badges — left */}
        <div className="absolute top-5 left-5 flex gap-2">
          <Badge variant="rounded" size="xs" theme="brand" mode="dark" bordered style={getImageBadgeStyle('brand')}>
            <Crown className="h-3 w-3" /> Featured
          </Badge>
          {report.badge && (
            <Badge variant="rounded" size="xs" theme={getImageBadgeTheme(report.badge)} mode="dark" bordered style={getImageBadgeStyle(getImageBadgeTheme(report.badge))}>
              {report.badge}
            </Badge>
          )}
        </div>

        {/* Top meta — right: region */}
        <div className="absolute top-5 right-5 flex items-center gap-2.5">
          <span
            className="text-white/60 flex items-center gap-1"
            style={{ fontSize: 'var(--text-xs)' }}
          >
            <MapPin className="h-3 w-3" />
            {report.region}
          </span>
        </div>

        {/* Content overlay */}
        <div className="flex items-center gap-2.5 mb-3">
          <Badge variant="rounded" size="xs" theme="neutral" mode="dark" bordered style={getImageBadgeStyle('neutral')}>
            {report.industry}
          </Badge>
          {report.projection && (
            <Badge variant="rounded" size="xs" theme="success" mode="dark" bordered uppercase={false} style={getImageBadgeStyle('success')}>
              <TrendingUp className="h-3 w-3" />
              {report.projection}
            </Badge>
          )}
        </div>

        <h3
          className="text-white mb-2 max-w-lg leading-snug"
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 'var(--font-weight-medium)',
            fontSize: 'var(--text-base)',
          }}
        >
          {report.title}
        </h3>

        <div className="flex items-center gap-4" onClick={(e) => e.stopPropagation()}>
          <Button
            variant="secondary"
            size="xs"
            background="dark"
            showArrow
            onClick={onView}
          >
            Read Report
          </Button>
        </div>
      </div>
    </article>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN EXPORT — Variant dispatcher
   ═══════════════════════════════════════════════════════════ */
export function ReportCard(props: ReportCardProps) {
  const { variant = 'grid', animationDelay } = props;

  const card = (() => {
    switch (variant) {
      case 'list':
        return <ListCard {...props} />;
      case 'compact':
        return <CompactCard {...props} />;
      case 'featured':
        return <FeaturedCard {...props} />;
      case 'grid':
      default:
        return <GridCard {...props} />;
    }
  })();

  if (animationDelay != null) {
    return (
      <div
        className="animate-[fadeUp_0.35s_ease-out_both]"
        style={{ animationDelay: `${animationDelay}ms` }}
      >
        {card}
      </div>
    );
  }

  return card;
}
