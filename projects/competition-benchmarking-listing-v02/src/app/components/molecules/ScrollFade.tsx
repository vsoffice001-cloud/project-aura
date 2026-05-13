import { useRef, useState, useEffect, useCallback, type ReactNode, type CSSProperties } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ScrollFadeProps {
  children: ReactNode;
  /** Background color for fade edges — must match parent bg (default: "white") */
  fadeBg?: string;
  /** Width of fade masks in px (default: 32) */
  fadeWidth?: number;
  /** Show chevron navigation buttons on hover (default: false) */
  showButtons?: boolean;
  /** Extra className on outer wrapper */
  className?: string;
  /** Extra style on outer wrapper */
  style?: CSSProperties;
  /** Extra className on the scrollable inner container */
  innerClassName?: string;
}

/**
 * Lightweight horizontal-scroll wrapper with edge fade masks.
 *
 * Use this for tabs, tags, filter pills, and any inline content
 * that may overflow horizontally. It uses native `overflow-x: auto`
 * with a hidden scrollbar and detects scroll position via
 * `onScroll` + `ResizeObserver` to show/hide fades.
 *
 * Set `showButtons` to add hover-revealed chevron arrows for
 * mouse-friendly navigation (useful on wider tab bars).
 *
 * For card carousels that need hover-lift (overflow-y visible),
 * use `HorizontalScroll` instead.
 */
export function ScrollFade({
  children,
  fadeBg = "white",
  fadeWidth = 32,
  showButtons = false,
  className = "",
  style,
  innerClassName = "",
}: ScrollFadeProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const update = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 2);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 2);
  }, []);

  useEffect(() => {
    update();
    const el = scrollRef.current;
    if (!el) return;
    const ro = new ResizeObserver(update);
    ro.observe(el);
    if (el.firstElementChild) ro.observe(el.firstElementChild);
    return () => ro.disconnect();
  }, [update, children]);

  const scrollByAmount = useCallback((direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.6;
    el.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className={`relative ${showButtons ? "group/sf" : ""} ${className}`} style={style}>
      {/* Left fade */}
      {canScrollLeft && (
        <div
          className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none"
          style={{
            width: fadeWidth,
            background: `linear-gradient(to right, ${fadeBg}, transparent)`,
          }}
        />
      )}

      {/* Left button */}
      {showButtons && canScrollLeft && (
        <button
          onClick={() => scrollByAmount("left")}
          className="absolute left-1 top-1/2 -translate-y-1/2 z-20 w-7 h-7 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full shadow-md border border-black/[0.06] opacity-0 group-hover/sf:opacity-100 transition-all duration-300 hover:bg-white hover:shadow-lg hover:scale-105 cursor-pointer"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-3.5 w-3.5 text-black/50" />
        </button>
      )}

      {/* Right fade */}
      {canScrollRight && (
        <div
          className="absolute right-0 top-0 bottom-0 z-10 pointer-events-none"
          style={{
            width: fadeWidth,
            background: `linear-gradient(to left, ${fadeBg}, transparent)`,
          }}
        />
      )}

      {/* Right button */}
      {showButtons && canScrollRight && (
        <button
          onClick={() => scrollByAmount("right")}
          className="absolute right-1 top-1/2 -translate-y-1/2 z-20 w-7 h-7 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full shadow-md border border-black/[0.06] opacity-0 group-hover/sf:opacity-100 transition-all duration-300 hover:bg-white hover:shadow-lg hover:scale-105 cursor-pointer"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-3.5 w-3.5 text-black/50" />
        </button>
      )}

      {/* Scrollable container */}
      <div
        ref={scrollRef}
        className={`overflow-x-auto ${innerClassName}`}
        style={{ scrollbarWidth: "none" }}
        onScroll={update}
      >
        {children}
      </div>
    </div>
  );
}