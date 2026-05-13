/**
 * CardMetaRow — Molecule
 *
 * DS-compliant inline meta row with two layout variants:
 *
 *   Variant A (default):
 *     forecast metric (TrendingUp green) · region (MapPin utility gray)
 *
 *   Variant B (compact — no projection):
 *     region (MapPin) · date (Calendar)
 *     Used when projection data is unavailable; collapses region + date
 *     into a single row so the card doesn't waste vertical space.
 *
 * This row always sits between the title and footer per the standardized
 * card anatomy: industry badge → title → **meta row** → footer (pages + date).
 */
import { TrendingUp, MapPin, Calendar } from "lucide-react";
import { iconColors } from "../iconColors";
import { Tooltip } from "../Tooltip";

export type CardMetaVariant = "A" | "B";

interface CardMetaRowProps {
  projection?: string | null;
  region: string;
  /** Optional date — rendered inline when variant is B or projection is absent */
  date?: string;
  /** A = projection + region (default), B = region + date (no projection) */
  variant?: CardMetaVariant;
  className?: string;
}

export function CardMetaRow({
  projection,
  region,
  date,
  variant = "A",
  className,
}: CardMetaRowProps) {
  // If nothing to show, return null
  if (!projection && !region && !date) return null;

  /* ── Variant B: region + date combined (projection hidden) ── */
  if (variant === "B") {
    return (
      <div
        className={className || "flex items-center gap-1.5 flex-wrap"}
        style={{ fontSize: "var(--text-2xs)" }}
      >
        {region && (
          <span className="text-black/40 flex items-center gap-1">
            <MapPin className="h-3 w-3 flex-shrink-0" color={iconColors.utility} />
            {region}
          </span>
        )}
        {region && date && <span className="text-black/15">&middot;</span>}
        {date && (
          <span className="text-black/35 flex items-center gap-1">
            <Calendar className="h-3 w-3 flex-shrink-0" color={iconColors.utility} />
            {date}
          </span>
        )}
      </div>
    );
  }

  /* ── Variant A (default): projection + region ── */
  return (
    <div
      className={className || "flex items-center gap-1.5 flex-wrap"}
      style={{ fontSize: "var(--text-2xs)" }}
    >
      {projection && (
        <Tooltip text="Projected growth rate">
          <span className="flex items-center gap-1" style={{ color: "var(--green-600)" }}>
            <TrendingUp className="h-3.5 w-3.5 flex-shrink-0" />
            {projection}
          </span>
        </Tooltip>
      )}
      {projection && region && <span className="text-black/15">&middot;</span>}
      {region && (
        <span className="text-black/40 flex items-center gap-1">
          <MapPin className="h-3 w-3 flex-shrink-0" color={iconColors.utility} />
          {region}
        </span>
      )}
    </div>
  );
}