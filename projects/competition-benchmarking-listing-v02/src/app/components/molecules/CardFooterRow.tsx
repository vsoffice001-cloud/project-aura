/**
 * CardFooterRow — Molecule
 *
 * Bottom row: date display with Calendar icon.
 * Pinned to bottom of card via mt-auto.
 */
import { Calendar } from "lucide-react";
import { iconColors } from "../iconColors";

interface CardFooterRowProps {
  date: string;
  className?: string;
}

export function CardFooterRow({ date, className }: CardFooterRowProps) {
  return (
    <div className={className || "flex items-center gap-2 mt-auto pt-1"}>
      <span className="flex items-center gap-1 text-black/35" style={{ fontSize: "var(--text-2xs)" }}>
        <Calendar className="h-3 w-3" color={iconColors.utility} />
        {date}
      </span>
    </div>
  );
}