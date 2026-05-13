/**
 * BenchmarkCard — Grid mode masonry card
 * competition-benchmarking-listing-v01
 *
 * Hybrid:
 *   - Layout shell + typography/colors mirror RS-v07 ReportCard `grid` (DS sync)
 *   - Element show/hide rotation mirrors design-system ResourceCard variants
 *     (gives masonry its rhythm — varying card heights from variant-specific element omissions)
 *
 * Variant rotation (per slot index):
 *   0  → full-featured     (image · category · title · description · date · region+comp · "Featured" tag)
 *   1  → standard          (image · category · title · description · date · region+comp)
 *   2  → minimal           (image · category · title · date)
 *   3  → category-featured (image · category · title · region+comp · "Featured" tag)
 *   4  → clean             (image · title · description)
 *   5  → latest            (image · title · description · region+comp · "Latest" tag)
 *   6  → featured-focus    (image · title · description · "Featured" tag)
 *   7+ → repeats from slot 1
 *
 * Pages info intentionally excluded — varies report-to-report (PDP only).
 * DS tokens only — no hardcoded hex/px.
 */

import { Calendar, MapPin, Users } from 'lucide-react';
import { Card } from './Card';
import { Badge } from './Badge';
import { IndustryBadge } from './molecules/IndustryBadge';
import { iconColors } from './iconColors';
import type { BenchmarkReport } from '../../lib/mock-data';

interface BenchmarkCardProps {
  report: BenchmarkReport;
  slotIndex?: number;
}

type Variant =
  | 'full-featured'
  | 'standard'
  | 'minimal'
  | 'category-featured'
  | 'clean'
  | 'latest'
  | 'featured-focus';

const VARIANT_ROTATION: Variant[] = [
  'full-featured',
  'standard',
  'minimal',
  'category-featured',
  'clean',
  'latest',
  'featured-focus',
];

/** Resolve slot → variant (slot 0 always 'full-featured', then rotate from index 1) */
function variantForSlot(slot: number): Variant {
  if (slot === 0) return 'full-featured';
  // slot 1+ rotate through indices 1..6 of VARIANT_ROTATION (skip full-featured)
  return VARIANT_ROTATION[((slot - 1) % 6) + 1];
}

/** Element show/hide config per variant — mirrors DS ResourceCard pattern */
const VARIANT_CONFIG: Record<Variant, {
  showCategory: boolean;
  showDescription: boolean;
  showDate: boolean;
  showRegionComp: boolean;
  showFeaturedTag: boolean;
  showLatestTag: boolean;
}> = {
  'full-featured':     { showCategory: true,  showDescription: true,  showDate: true,  showRegionComp: true,  showFeaturedTag: true,  showLatestTag: false },
  'standard':          { showCategory: true,  showDescription: true,  showDate: true,  showRegionComp: true,  showFeaturedTag: false, showLatestTag: false },
  'minimal':           { showCategory: true,  showDescription: false, showDate: true,  showRegionComp: false, showFeaturedTag: false, showLatestTag: false },
  'category-featured': { showCategory: true,  showDescription: false, showDate: false, showRegionComp: true,  showFeaturedTag: true,  showLatestTag: false },
  'clean':             { showCategory: false, showDescription: true,  showDate: false, showRegionComp: false, showFeaturedTag: false, showLatestTag: false },
  'latest':            { showCategory: false, showDescription: true,  showDate: false, showRegionComp: true,  showFeaturedTag: false, showLatestTag: true  },
  'featured-focus':    { showCategory: false, showDescription: true,  showDate: false, showRegionComp: false, showFeaturedTag: true,  showLatestTag: false },
};

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export function BenchmarkCard({ report, slotIndex = 0 }: BenchmarkCardProps) {
  const variant = variantForSlot(slotIndex);
  const cfg = VARIANT_CONFIG[variant];

  return (
    <Card
      as="article"
      hover
      className="group relative flex flex-col cursor-pointer overflow-hidden h-full"
      onClick={() => { window.location.href = `/research/competition-benchmarking/${report.slug}`; }}
    >
      {/* Image — RS canonical 16:9 */}
      <div className="relative overflow-hidden aspect-[16/9]">
        <img
          src={report.thumbnailUrl}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="w-full h-full object-cover img-zoom"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.40) 0%, transparent 60%)' }}
        />

        {/* Image overlay badge — ResourceCard CardBadge pattern + RS IMAGE_BADGE_OVERRIDES alpha for legibility.
           WHY: Default dark-mode badge alpha is 15-20% — fails over busy images.
           WHAT: Glassmorphism wrapper (~65% black bg, 24px blur, 1px white border) + minimal inner Badge (white text, 10px, semibold, text-shadow halo).
           WHEN: Any badge overlaid on a card image (vs sitting on flat surface).
           WHERE: Top-left of image. Brand variant for "Featured" (red 0.65 bg). Neutral for "Latest" (black 0.65 bg). */}
        {cfg.showFeaturedTag && (
          <div
            className="absolute top-3 left-3 inline-block"
            style={{
              background: 'rgba(176, 31, 36, 0.65)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              borderRadius: '5px',
              border: '1px solid rgba(176, 31, 36, 0.8)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.1)',
              zIndex: 10,
            }}
          >
            <Badge
              variant="minimal"
              size="xs"
              theme="brand"
              mode="dark"
              className="text-white font-semibold uppercase tracking-[1.2px]"
              style={{
                fontSize: '10px',
                padding: '6px 12px',
                textShadow: '0 1px 2px rgba(0,0,0,0.5)',
              }}
            >
              Featured
            </Badge>
          </div>
        )}
        {cfg.showLatestTag && (
          <div
            className="absolute top-3 left-3 inline-block"
            style={{
              background: 'rgba(0, 0, 0, 0.65)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              borderRadius: '5px',
              border: '1px solid rgba(255, 255, 255, 0.10)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.1)',
              zIndex: 10,
            }}
          >
            <Badge
              variant="minimal"
              size="xs"
              theme="neutral"
              mode="dark"
              className="text-white font-semibold uppercase tracking-[1.2px]"
              style={{
                fontSize: '10px',
                padding: '6px 12px',
                textShadow: '0 1px 2px rgba(0,0,0,0.5)',
              }}
            >
              Latest
            </Badge>
          </div>
        )}
      </div>

      {/* Content — RS p-4 */}
      <div className="flex flex-col flex-1 p-4">
        {/* Eyebrow — IndustryBadge (text-2xs uppercase 0.4 alpha) */}
        {cfg.showCategory && (
          <div className="flex items-center gap-2 mb-2.5" style={{ fontSize: 'var(--text-2xs)' }}>
            <IndustryBadge>{report.industry}</IndustryBadge>
          </div>
        )}

        {/* Title — text-nav, 0.85 alpha, line-clamp-2, hover→text-primary */}
        <h3
          className="leading-snug line-clamp-2 mb-2.5 transition-colors group-hover:text-black"
          style={{
            fontSize: 'var(--text-nav)',
            color: 'rgba(0,0,0,0.85)',
          }}
          title={report.title}
        >
          {report.title}
        </h3>

        {/* Description — text-2xs, 0.55 alpha, line-clamp-2 */}
        {cfg.showDescription && (
          <p
            className="leading-relaxed line-clamp-2 mb-2.5"
            style={{
              fontSize: 'var(--text-2xs)',
              color: 'rgba(0,0,0,0.55)',
            }}
          >
            {report.description}
          </p>
        )}

        {/* Region + competitors meta */}
        {cfg.showRegionComp && (
          <div
            className="flex items-center gap-1.5 flex-wrap mb-2.5"
            style={{ fontSize: 'var(--text-2xs)' }}
          >
            <span className="flex items-center gap-1" style={{ color: 'rgba(0,0,0,0.40)' }}>
              <MapPin className="h-3 w-3 flex-shrink-0" color={iconColors.utility} />
              {report.region}
            </span>
            <span style={{ color: 'rgba(0,0,0,0.15)' }}>·</span>
            <span className="flex items-center gap-1" style={{ color: 'rgba(0,0,0,0.35)' }}>
              <Users className="h-3 w-3 flex-shrink-0" color={iconColors.utility} />
              {report.competitorSetSize} competitors
            </span>
          </div>
        )}

        {/* Date footer — text-2xs 0.40 alpha + Calendar icon */}
        {cfg.showDate && (
          <div
            className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-auto"
            style={{ fontSize: 'var(--text-2xs)', color: 'rgba(0,0,0,0.40)' }}
          >
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" color={iconColors.utility} />
              {formatDate(report.publishedDate)}
            </span>
          </div>
        )}
      </div>
    </Card>
  );
}
