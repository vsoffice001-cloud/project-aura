/**
 * ReportCard — Organism
 *
 * Unified report card with grid + list layouts.
 * Grid: vertical stack — image → industry badge → title → meta → footer
 * List: horizontal — thumbnail left | content center | meta+CTA right
 *
 * Uses DS composites: Card, ImageWithFallback, IndustryBadge, CardMetaRow, CardFooterRow.
 * ViewToggle sets layout; SkeletonCard mirrors both variants.
 */
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { IndustryBadge } from '@/app/components/molecules/IndustryBadge';
import { CardMetaRow } from '@/app/components/molecules/CardMetaRow';
import { CardFooterRow } from '@/app/components/molecules/CardFooterRow';
import { Card } from '@/app/components/Card';
import { Button } from '@/app/components/Button';
import { TrendingUp } from 'lucide-react';
import type { ReactNode } from 'react';
import type { CardMetaVariant } from '@/app/components/molecules/CardMetaRow';

export type ReportCardLayout = 'grid' | 'list';

export interface ReportCardProps {
  id: string;
  image: string;
  title: string;
  industry: string;
  subcat?: string;
  projection?: string | null;
  region: string;
  date: string;
  onClick?: (id: string) => void;
  layout?: ReportCardLayout;
  overlayBadge?: ReactNode;
  aspectRatio?: string;
  className?: string;
  metaVariant?: CardMetaVariant;
  /** Optional description shown in list layout only */
  description?: string;
  /** Optional CTA label for list layout (default: "View Report") */
  ctaLabel?: string;
}

export function ReportCard({
  id,
  image,
  title,
  industry,
  subcat,
  projection,
  region,
  date,
  onClick,
  layout = 'grid',
  overlayBadge,
  aspectRatio = '16/9',
  className,
  metaVariant = 'A',
  description,
  ctaLabel = 'View Report',
}: ReportCardProps) {
  if (layout === 'list') {
    return (
      <Card
        hover
        className={`group cursor-pointer overflow-hidden ${className || ''}`}
        onClick={() => onClick?.(id)}
      >
        <div className="flex">
          {/* Thumbnail — fixed width, self-stretching */}
          <div className="relative w-20 sm:w-28 md:w-36 flex-shrink-0 overflow-hidden self-stretch">
            <ImageWithFallback
              src={image}
              alt={title}
              className="w-full h-full object-cover img-zoom"
            />
            {overlayBadge && (
              <div className="absolute top-1.5 left-1.5">{overlayBadge}</div>
            )}
          </div>

          {/* Main content — fills available space */}
          <div className="flex-1 min-w-0 flex flex-col py-3 px-3 sm:px-4 gap-1.5">
            <IndustryBadge>{subcat || industry}</IndustryBadge>
            <h4
              className="text-black/85 group-hover:text-black transition-colors line-clamp-2 leading-snug"
              style={{ fontSize: 'var(--text-nav)' }}
            >
              {title}
            </h4>
            {description && (
              <p
                className="text-black/45 line-clamp-1 hidden sm:block"
                style={{ fontSize: 'var(--text-xs)' }}
              >
                {description}
              </p>
            )}
            <CardMetaRow
              projection={metaVariant === 'A' ? projection : null}
              region={region}
              date={metaVariant === 'B' ? date : undefined}
              variant={metaVariant}
              className="flex items-center gap-1.5 flex-wrap mt-auto"
            />
          </div>

          {/* Right column — meta + CTA, hidden on small mobile */}
          <div className="hidden sm:flex flex-col items-end justify-between flex-shrink-0 py-3 pr-4 gap-2">
            {/* Top: date or projection */}
            <span
              className="text-black/35 whitespace-nowrap"
              style={{ fontSize: 'var(--text-xs)' }}
            >
              {date}
            </span>

            {/* Projection badge if present */}
            {projection && (
              <span
                className="flex items-center gap-1 whitespace-nowrap"
                style={{ fontSize: 'var(--text-xs)', color: 'var(--green-600)' }}
              >
                <TrendingUp className="h-3 w-3 flex-shrink-0" />
                {projection}
              </span>
            )}

            {/* Bottom: CTA button */}
            <Button
              variant="secondary"
              size="xs"
              showArrow
              onClick={() => onClick?.(id)}
            >
              {ctaLabel}
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  /* ── Grid layout (default) ─────────────────────────────── */
  return (
    <Card
      hover
      className={`group cursor-pointer overflow-hidden flex flex-col ${className || ''}`}
      onClick={() => onClick?.(id)}
    >
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio }}
      >
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-full object-cover img-zoom"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/12 to-transparent pointer-events-none" />
        {overlayBadge}
      </div>
      <div className="flex flex-col flex-1 p-4 gap-2.5">
        <IndustryBadge>{subcat || industry}</IndustryBadge>
        <h4
          className="text-black/85 group-hover:text-black transition-colors line-clamp-2 leading-snug"
          style={{ fontSize: 'var(--text-nav)' }}
        >
          {title}
        </h4>
        <CardMetaRow
          projection={metaVariant === 'A' ? projection : null}
          region={region}
          date={metaVariant === 'B' ? date : undefined}
          variant={metaVariant}
        />
        {metaVariant === 'A' && <CardFooterRow date={date} />}
      </div>
    </Card>
  );
}