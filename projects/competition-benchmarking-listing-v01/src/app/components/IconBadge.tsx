/**
 * IconBadge — Atom
 * Ken Bold DS v4.2
 *
 * Small rounded container holding an icon or fallback initial.
 * Domain-agnostic — reusable anywhere a compact visual indicator is needed:
 *   - Industry sector rows
 *   - Navigation items with icons
 *   - Category/topic lists
 *   - Settings items
 *
 * Visual spec:
 *   Size:       w-7 h-7 (28px) — configurable via `size` prop
 *   Radius:     var(--radius-element)
 *   Background: tinted bg at 5% opacity (configurable via `tint`)
 *   Icon size:  14px (3.5 Tailwind) — scales with container
 *
 * Accessibility:
 *   - Decorative by default (aria-hidden)
 *   - Icon color follows DS content icon convention (#806ce0)
 */
import type { ElementType, ReactNode } from "react";
import { iconColors } from "./iconColors";

export type IconBadgeSize = "sm" | "md" | "lg";

export interface IconBadgeProps {
  /** Lucide icon component or any ElementType */
  icon?: ElementType;
  /** Fallback content when no icon is provided (e.g., first letter) */
  fallback?: ReactNode;
  /** Container size preset */
  size?: IconBadgeSize;
  /** Background tint color (CSS color string, applied at 5% opacity) */
  tint?: string;
  /** Icon color override (defaults to DS content icon color) */
  iconColor?: string;
  /** Additional className */
  className?: string;
}

const SIZE_MAP: Record<IconBadgeSize, { container: string; icon: string }> = {
  sm: { container: "w-5 h-5", icon: "w-2.5 h-2.5" },
  md: { container: "w-7 h-7", icon: "w-3.5 h-3.5" },
  lg: { container: "w-9 h-9", icon: "w-4 h-4" },
};

export function IconBadge({
  icon: Icon,
  fallback,
  size = "md",
  tint = "rgba(128, 108, 224, 0.05)",
  iconColor = iconColors.content,
  className = "",
}: IconBadgeProps) {
  const { container, icon } = SIZE_MAP[size];

  return (
    <div
      className={`${container} flex-shrink-0 flex items-center justify-center ${className}`}
      style={{
        borderRadius: "var(--radius-element)",
        background: tint,
      }}
      aria-hidden="true"
    >
      {Icon ? (
        <Icon className={icon} color={iconColor} />
      ) : fallback ? (
        <span
          style={{
            fontSize: "var(--text-xs)",
            color: "var(--text-primary)",
          }}
        >
          {fallback}
        </span>
      ) : null}
    </div>
  );
}
