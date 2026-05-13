/**
 * BackToTop — Molecule
 *
 * Floating button that appears after scrolling past the fold.
 * Smooth fade in/out (no hard unmount) with scale entrance.
 * Mobile: bottom-16 right-4 (clears MobileFilterBar floating pill)
 * Desktop: bottom-6 right-6 (no pill to clear)
 */
import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

interface BackToTopProps {
  /** Scroll threshold in px before the button appears */
  threshold?: number;
  className?: string;
}

export function BackToTop({ threshold = 600, className }: BackToTopProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > threshold);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return (
    <button
      aria-label="Back to top"
      title="Scroll to top"
      className={`fixed bottom-16 right-4 lg:bottom-6 lg:right-6 z-50 w-11 h-11 flex items-center justify-center bg-white text-black/70 backdrop-blur-sm cursor-pointer shadow-md border border-black/[0.06] ${className || ""}`}
      style={{
        borderRadius: "9999px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.2), 0 1px 4px rgba(0,0,0,0.1)",
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1) translateY(0)" : "scale(0.85) translateY(8px)",
        transition: "opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1), transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
        pointerEvents: visible ? "auto" : "none",
      }}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      tabIndex={visible ? 0 : -1}
    >
      <ArrowUp className="h-4 w-4" />
    </button>
  );
}
