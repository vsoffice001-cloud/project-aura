/**
 * ReportGridCard — Organism
 *
 * Clean, well-spaced grid card used across all sections.
 * DS-compliant anatomy:
 *   image → industry badge → title → inline meta row (projection · region) → footer (date)
 *
 * Meta variants:
 *   A (default): projection + region in meta row, date in footer row
 *   B: region + date combined in meta row, no projection, no separate footer
 *
 * DS compliance:
 * - Border: 1px solid var(--warm-500)
 * - Border radius: var(--rc-radius-card) = 10px
 * - Hover: subtle shadow lift + image scale
 * - Generous internal padding (p-4)
 */
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { IndustryBadge } from "./IndustryBadge";
import { CardMetaRow } from "./CardMetaRow";
import { CardFooterRow } from "./CardFooterRow";
import type { ReactNode } from "react";
import type { CardMetaVariant } from "./CardMetaRow";
import { Card } from "../Card";

interface ReportGridCardProps {
  id: string;
  image: string;
  title: string;
  industry: string;
  /** Subcategory — displayed in eyebrow badge instead of industry when provided */
  subcat?: string;
  projection?: string | null;
  region: string;
  date: string;
  onClick?: (id: string) => void;
  overlayBadge?: ReactNode;
  aspectRatio?: string;
  className?: string;
  /** Meta row variant: A = projection+region, B = region+date (no projection) */
  metaVariant?: CardMetaVariant;
}

export function ReportGridCard({
  id,
  image,
  title,
  industry,
  subcat,
  projection,
  region,
  date,
  onClick,
  overlayBadge,
  aspectRatio = "16/9",
  className,
  metaVariant = "A",
}: ReportGridCardProps) {
  return (
    <Card
      hover
      className={`group cursor-pointer overflow-hidden flex flex-col ${className || ""}`}
      onClick={() => onClick?.(id)}
    >
      {/* Cover image */}
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio }}
      >
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-full object-cover img-zoom"
        />
        {/* Subtle bottom gradient for depth */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/12 to-transparent pointer-events-none" />
        {overlayBadge}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-2.5">
        {/* Industry badge (eyebrow — no region here per DS anatomy) */}
        <IndustryBadge>{subcat || industry}</IndustryBadge>

        {/* Title */}
        <h4
          className="text-black/85 group-hover:text-black transition-colors line-clamp-2 leading-snug"
          style={{ fontSize: "var(--text-nav)" }}
        >
          {title}
        </h4>

        {/* Meta row */}
        <CardMetaRow
          projection={metaVariant === "A" ? projection : null}
          region={region}
          date={metaVariant === "B" ? date : undefined}
          variant={metaVariant}
        />

        {/* Date footer — only in variant A */}
        {metaVariant === "A" && <CardFooterRow date={date} />}
      </div>
    </Card>
  );
}