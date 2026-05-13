/**
 * StatCard — Molecule
 *
 * DS-compliant card for Key Market Indicators / Trending Statistics.
 * Anatomy: category badge + icon → value + label → growth metric → description → CTA
 */
import { TrendingUp, BarChart3 } from "lucide-react";
import { iconColors } from "../iconColors";
import { Badge } from "../Badge";
import { Button } from "../Button";
import { Tooltip } from "../Tooltip";
import { Card } from "../Card";
import type { ReactNode } from "react";

interface StatCardProps {
  category: string;
  value: string;
  label: string;
  description: string;
  growth: string;
  metric: string;
  icon?: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function StatCard({
  category,
  value,
  label,
  description,
  growth,
  metric,
  icon,
  className,
  onClick,
}: StatCardProps) {
  return (
    <Card
      hover
      padding="sm"
      className={`cursor-pointer group flex flex-col ${className || ""}`}
      onClick={onClick}
    >
      {/* Top row: category + icon */}
      <div className="flex items-center justify-between mb-2.5">
        <Badge variant="rounded" size="xs" theme="coral" bordered>{category}</Badge>
        <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center"
          style={{ borderRadius: "var(--radius-element)", background: "rgba(128, 108, 224, 0.06)" }}>
          {icon || <BarChart3 className="h-4 w-4" color={iconColors.content} />}
        </div>
      </div>

      {/* Value */}
      <p
        className="text-black mb-0.5 tabular-nums tracking-tight"
        style={{
          fontFamily: "var(--font-serif)",
          fontWeight: 'var(--font-weight-light)' as any,
          fontSize: "var(--text-xl)",
        }}
      >
        {value}
      </p>

      {/* Label */}
      <p
        className="text-black/60 mb-2.5 group-hover:text-black/80 transition-colors"
        style={{ fontSize: "var(--text-nav)" }}
      >
        {label}
      </p>

      {/* Growth metric row */}
      <div
        className="flex items-center gap-2 mb-2"
        style={{ fontSize: "var(--text-xs)" }}
      >
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
          {growth} <Tooltip text="Compound Annual Growth Rate"><span className="text-black/35">CAGR</span></Tooltip>
        </span>
        <span className="text-black/40">{metric}</span>
      </div>

      {/* Description */}
      <p
        className="text-black/40 line-clamp-2 leading-relaxed"
        style={{ fontSize: "var(--text-xs)" }}
      >
        {description}
      </p>

      {/* Bottom CTA */}
      <div
        className="mt-auto pt-3 flex items-center justify-start"
        style={{ borderTop: "1px solid var(--black-200)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          variant="secondary"
          size="xs"
          showArrow
          onClick={() => onClick?.()}
        >
          View Reports
        </Button>
      </div>
    </Card>
  );
}