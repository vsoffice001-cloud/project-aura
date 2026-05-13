/**
 * BackToTop — Molecule
 * Floating button after 600px scroll. Mobile: bottom-16 (clears MobileFilterBar).
 */
import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

interface BackToTopProps {
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
      className={`fixed bottom-16 right-4 lg:bottom-6 lg:right-6 z-50 w-10 h-10 flex items-center justify-center bg-white text-black/70 backdrop-blur-sm cursor-pointer shadow-md border border-black/[0.06] ${className || ""}`}
      style={{
        borderRadius: "var(--radius-full)",
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