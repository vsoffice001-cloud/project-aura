/**
 * SidebarPanel — Molecule (Container Pattern)
 * Ken Bold DS v4.1
 *
 * Reusable sticky sidebar container for:
 *   - Filter panels (Report Store)
 *   - Table of Contents (report detail pages)
 *   - Side navigation (documentation pages)
 *   - Settings panels
 *
 * Handles the container pattern:
 *   - Sticky positioning with configurable top offset
 *   - Max-height calc for viewport-fit scrolling
 *   - Elevation (border + shadow)
 *   - Header / scrollable body / footer zones
 *   - Hidden below lg breakpoint (mobile uses sheet/drawer instead)
 *
 * Visual spec:
 *   Width:     w-60 (240px), flex-shrink-0
 *   Sticky:    top: stickyTop (default 72px = header height)
 *   MaxHeight: calc(100vh - stickyTop - 16px)
 *   Border:    1px solid rgba(0,0,0,0.08)
 *   Radius:    10px (--rc-radius-card)
 *   Shadow:    0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.03)
 *   Background: white
 *   Scrollbar: hidden (.scrollbar-hide)
 */
import type { ReactNode, RefObject, CSSProperties } from "react";

export interface SidebarPanelProps {
  /** Content for the fixed header zone (e.g., "Filters" title + clear button) */
  header?: ReactNode;
  /** Scrollable body content (e.g., filter accordion sections) */
  children: ReactNode;
  /** Content for the fixed footer zone (e.g., report count) */
  footer?: ReactNode;
  /** Top offset for sticky positioning in px (default: 72 = header height) */
  stickyTop?: number;
  /** Panel width class (default: "w-60") */
  width?: string;
  /** Hide below this breakpoint (default: "lg") */
  hideBelow?: "sm" | "md" | "lg" | "xl";
  /** Additional className for the outer aside */
  className?: string;
  /** Inline style for the outer aside (use instead of arbitrary Tailwind width classes) */
  style?: CSSProperties;
  /** Ref for the scrollable body area */
  scrollRef?: RefObject<HTMLDivElement | null>;
}

export function SidebarPanel({
  header,
  children,
  footer,
  stickyTop = 72,
  width = "w-60",
  hideBelow = "lg",
  className,
  style,
  scrollRef,
}: SidebarPanelProps) {
  const hideClass =
    hideBelow === "sm"
      ? "hidden sm:block"
      : hideBelow === "md"
        ? "hidden md:block"
        : hideBelow === "xl"
          ? "hidden xl:block"
          : "hidden lg:block";

  return (
    <aside className={`${width} flex-shrink-0 ${hideClass} ${className || ""}`} style={style}>
      <div className="sticky" style={{ top: `${stickyTop}px` }}>
        <div
          className="overflow-hidden flex flex-col bg-white"
          style={{
            maxHeight: `calc(100vh - ${stickyTop + 16}px)`,
            border: "1px solid rgba(0,0,0,0.08)",
            borderRadius: "10px",
            boxShadow:
              "0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.03)",
          }}
        >
          {/* Fixed header zone */}
          {header && (
            <div
              className="flex-shrink-0"
              style={{
                borderBottom: "1px solid rgba(0,0,0,0.06)",
                background: "var(--black-50)",
              }}
            >
              {header}
            </div>
          )}

          {/* Scrollable body */}
          <div
            className="overflow-y-auto flex-1 scrollbar-hide"
            ref={scrollRef}
          >
            {children}
          </div>

          {/* Fixed footer zone */}
          {footer && (
            <div
              className="flex-shrink-0"
              style={{
                borderTop: "1px solid rgba(0,0,0,0.06)",
                background: "var(--black-50)",
              }}
            >
              {footer}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}