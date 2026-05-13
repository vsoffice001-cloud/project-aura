/**
 * DataHighlightCard — Molecule
 *
 * DS-compliant card for Daily Data Highlights section.
 * Anatomy: time + icon → value → title → growth badge → source + arrow footer
 */
import { TrendingUp, Zap, ArrowRight } from "lucide-react";
import { iconColors } from "../iconColors";
import { Tooltip } from "../Tooltip";
import { Card } from "../Card";
import type { ReactNode } from "react";

interface DataHighlightCardProps {
  value: string;
  title: string;
  source: string;
  growth: string;
  time: string;
  icon?: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function DataHighlightCard({
  value,
  title,
  source,
  growth,
  time,
  icon,
  className,
  onClick,
}: DataHighlightCardProps) {
  return (
    <Card
      hover
      className={`cursor-pointer group flex flex-col ${className || ""}`}
      style={{ padding: '14px' }}
      onClick={onClick}
    >
      {/* Top row: time + icon */}
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-black/40" style={{ fontSize: "var(--text-xs)" }}>{time}</span>
        {icon || <Zap className="h-3.5 w-3.5" color={iconColors.content} />}
      </div>

      {/* Value */}
      <p
        className="text-black mb-0.5 tabular-nums"
        style={{
          fontFamily: "var(--font-serif)",
          fontWeight: 'var(--font-weight-light)' as any,
          fontSize: "var(--text-base)",
        }}
      >
        {value}
      </p>

      {/* Title */}
      <p
        className="text-black/70 mb-1.5 leading-snug group-hover:text-black transition-colors"
        style={{ fontSize: "var(--text-xs)" }}
      >
        {title}
      </p>

      {/* Growth badge */}
      <div className="flex items-center gap-2 mb-3" style={{ fontSize: "var(--text-xs)" }}>
        <Tooltip text="Growth rate">
          <span
            className="inline-flex items-center gap-1 px-1.5 py-0.5"
            style={{
              color: "var(--green-700, #15803d)",
              background: "rgba(22, 163, 74, 0.08)",
              borderRadius: "var(--radius-element)",
              fontSize: "var(--text-xs)",
            }}
          >
            <TrendingUp className="h-3 w-3" />
            {growth}
          </span>
        </Tooltip>
      </div>

      {/* Footer: source + arrow */}
      <div
        className="mt-auto pt-2.5 flex items-center justify-between"
        style={{ borderTop: "1px solid var(--black-200)" }}
      >
        <span className="text-black/40" style={{ fontSize: "var(--text-xs)" }}>{source}</span>
        <ArrowRight className="h-3 w-3 text-black/20 group-hover:text-black/50 transition-colors" />
      </div>
    </Card>
  );
}