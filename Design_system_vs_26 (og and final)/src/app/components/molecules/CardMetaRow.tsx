/**
 * CardMetaRow — Molecule
 *
 * DS-compliant inline meta row with two layout variants:
 *   A (default): projection (TrendingUp green) · region (MapPin gray)
 *   B (compact):  region (MapPin) · date (Calendar)
 */
import { TrendingUp, MapPin, Calendar } from "lucide-react";
import { iconColors } from '@/app/components/iconColors';
import { Tooltip } from '@/app/components/Tooltip';

export type CardMetaVariant = "A" | "B";

interface CardMetaRowProps {
  projection?: string | null;
  region: string;
  date?: string;
  variant?: CardMetaVariant;
  className?: string;
}

export function CardMetaRow({ projection, region, date, variant = "A", className }: CardMetaRowProps) {
  if (!projection && !region && !date) return null;

  if (variant === "B") {
    return (
      <div className={className || "flex items-center gap-1.5 flex-wrap"} style={{ fontSize: "var(--text-xs)" }}>
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

  return (
    <div className={className || "flex items-center gap-1.5 flex-wrap"} style={{ fontSize: "var(--text-xs)" }}>
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