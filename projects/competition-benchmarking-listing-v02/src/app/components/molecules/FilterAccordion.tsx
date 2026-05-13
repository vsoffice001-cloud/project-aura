/**
 * FilterAccordion — Molecule
 * Ken Bold DS v4.1
 *
 * Unified collapsible section for filter panels (desktop sidebar + mobile sheet).
 * Replaces the two duplicated FilterSection implementations.
 *
 * Two visual variants:
 *   "sidebar"  — Compact, icon in bordered box, uppercase label, chevron-right rotates
 *   "sheet"    — Spacious, icon in tinted circle, normal-case label, chevron-down rotates
 *
 * Supports disabled state with lock icon and hint text (e.g., "Select an industry first").
 *
 * Visual spec — Sidebar variant:
 *   Header:   px-4 py-3, icon in 24×24 bordered box, uppercase --text-2xs 0.08em tracking
 *   Active:   bg rgba(0,0,0,0.025), count badge (black pill, badge-xs-font)
 *   Disabled: 55% opacity, Lock icon, not-allowed cursor, hint text below
 *   Expand:   maxHeight 0→600px, opacity 0→1, 200ms transition
 *
 * Visual spec — Sheet variant:
 *   Header:   px-4 py-3.5, icon in 28×28 tinted circle, normal --text-nav
 *   Active:   count in gray pill (rgba(0,0,0,0.08))
 *   Expand:   maxHeight 0→600px, opacity 0→1, 300ms cubic-bezier
 */
import type { ReactNode } from "react";
import { ChevronRight, ChevronDown, Lock } from "lucide-react";
import { iconColors } from "../iconColors";
import { Tooltip } from "../Tooltip";

export type FilterAccordionVariant = "sidebar" | "sheet";

export interface FilterAccordionProps {
  icon: ReactNode;
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  count?: number;
  children: ReactNode;
  disabled?: boolean;
  disabledHint?: string;
  variant?: FilterAccordionVariant;
  className?: string;
}

export function FilterAccordion({
  icon,
  label,
  isOpen,
  onToggle,
  count,
  children,
  disabled,
  disabledHint,
  variant = "sidebar",
  className,
}: FilterAccordionProps) {
  const hasActive = count != null && count > 0;

  if (variant === "sheet") {
    return (
      <div
        style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}
        className={className}
      >
        {/* Section header — tappable */}
        <button
          className="w-full flex items-center gap-2.5 py-3.5 px-4 active:bg-black/[0.02] transition-colors"
          onClick={onToggle}
        >
          <div
            className="w-7 h-7 flex items-center justify-center flex-shrink-0"
            style={{
              borderRadius: "var(--radius-element)",
              background: "rgba(0,0,0,0.03)",
            }}
          >
            {icon}
          </div>
          <span
            className="flex-1 text-left text-black/70"
            style={{ fontSize: "var(--text-nav)" }}
          >
            {label}
          </span>
          {hasActive && (
            <span
              className="min-w-[20px] h-[20px] px-1.5 rounded-full flex items-center justify-center tabular-nums"
              style={{
                fontSize: "10px",
                background: "rgba(0,0,0,0.08)",
                color: "var(--text-primary)",
                fontWeight: 600,
              }}
            >
              {count}
            </span>
          )}
          <ChevronDown
            className="h-4 w-4 text-black/30 flex-shrink-0 transition-transform"
            style={{
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            }}
          />
        </button>

        {/* Collapsible content */}
        <div
          style={{
            maxHeight: isOpen ? "600px" : "0px",
            opacity: isOpen ? 1 : 0,
            overflow: "hidden",
            transition:
              "max-height 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease",
          }}
        >
          <div className="flex flex-wrap gap-2 px-4 pb-4">{children}</div>
        </div>
      </div>
    );
  }

  // Sidebar variant (default)
  return (
    <div
      style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}
      className={className}
    >
      <button
        className="w-full flex items-center gap-2.5 px-4 py-3 transition-all duration-150"
        style={{
          background: disabled
            ? "rgba(0,0,0,0.015)"
            : hasActive
              ? "rgba(0,0,0,0.025)"
              : isOpen
                ? "rgba(0,0,0,0.015)"
                : "transparent",
          opacity: disabled ? 0.55 : 1,
          cursor: disabled ? "not-allowed" : "pointer",
        }}
        onMouseEnter={(e) => {
          if (!disabled)
            (e.currentTarget as HTMLElement).style.background =
              "rgba(0,0,0,0.04)";
        }}
        onMouseLeave={(e) => {
          if (!disabled)
            (e.currentTarget as HTMLElement).style.background = hasActive
              ? "rgba(0,0,0,0.025)"
              : isOpen
                ? "rgba(0,0,0,0.015)"
                : "transparent";
        }}
        onClick={() => {
          if (!disabled) onToggle();
        }}
      >
        <div
          className="w-6 h-6 flex items-center justify-center flex-shrink-0 transition-all"
          style={{
            borderRadius: "var(--radius-element)",
            border: hasActive
              ? "1px solid rgba(0,0,0,0.2)"
              : "1px solid rgba(0,0,0,0.08)",
            background: hasActive ? "rgba(0,0,0,0.04)" : "white",
          }}
        >
          {icon}
        </div>
        <span
          className="flex-1 text-left tracking-[0.08em] uppercase transition-colors"
          style={{
            fontSize: "var(--text-2xs)",
            color: hasActive ? "rgba(0,0,0,0.7)" : "rgba(0,0,0,0.45)",
          }}
        >
          {label}
        </span>
        {disabled && (
          <Lock className="h-3 w-3 flex-shrink-0" color="rgba(0,0,0,0.2)" />
        )}
        {hasActive && !disabled && (
          <Tooltip text={`${count} selected`} position="top">
            <span
              className="min-w-5 h-5 px-1 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0"
              style={{ fontSize: "var(--badge-xs-font)" }}
            >
              {count}
            </span>
          </Tooltip>
        )}
        {!disabled && (
          <div
            className="w-5 h-5 flex items-center justify-center flex-shrink-0 transition-transform"
            style={{
              transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
            }}
          >
            <ChevronRight className="h-3 w-3" color={iconColors.utility} />
          </div>
        )}
      </button>

      {/* Disabled hint */}
      {disabled && disabledHint && (
        <div className="px-4 pb-2.5" style={{ marginTop: "-4px" }}>
          <p
            style={{
              fontSize: "var(--text-2xs)",
              color: "rgba(0,0,0,0.3)",
              lineHeight: "1.4",
            }}
          >
            {disabledHint}
          </p>
        </div>
      )}

      {/* Collapsible content */}
      {!disabled && (
        <div
          className="overflow-hidden transition-all duration-200"
          style={{
            maxHeight: isOpen ? "600px" : "0px",
            opacity: isOpen ? 1 : 0,
          }}
        >
          <div className="pb-0">{children}</div>
        </div>
      )}
    </div>
  );
}
