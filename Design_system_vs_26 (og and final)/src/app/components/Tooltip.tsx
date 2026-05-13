/**
 * Tooltip — Atom
 *
 * Portal-based tooltip that renders at document.body level,
 * so it never gets clipped by overflow:hidden parents.
 *
 * Usage:
 *   <Tooltip text="List view">
 *     <button>...</button>
 *   </Tooltip>
 */
import { useState, useRef, useCallback, useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";

interface TooltipProps {
  text: string;
  position?: "top" | "bottom";
  children: ReactNode;
  className?: string;
}

export function Tooltip({ text, position = "top", children, className }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout>>();

  if (!text) return <>{children}</>;

  const show = useCallback(() => {
    clearTimeout(hideTimer.current);
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = position === "top" ? rect.top : rect.bottom;
    setCoords({ x, y });
    setVisible(true);
  }, [position]);

  const hide = useCallback(() => {
    hideTimer.current = setTimeout(() => setVisible(false), 80);
  }, []);

  /* Reposition if scrolling while visible */
  useEffect(() => {
    if (!visible) return;
    const reposition = () => {
      if (!triggerRef.current) return;
      const rect = triggerRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = position === "top" ? rect.top : rect.bottom;
      setCoords({ x, y });
    };
    window.addEventListener("scroll", reposition, { passive: true });
    return () => window.removeEventListener("scroll", reposition);
  }, [visible, position]);

  const tooltipStyle: React.CSSProperties = {
    position: "fixed",
    left: coords.x,
    top: position === "top" ? coords.y - 8 : coords.y + 8,
    transform: position === "top"
      ? `translateX(-50%) translateY(-100%)`
      : `translateX(-50%)`,
    zIndex: 99999,
    pointerEvents: "none",
    opacity: visible ? 1 : 0,
    transition: "opacity 0.12s ease, top 0.12s ease",
  };

  const bubbleStyle: React.CSSProperties = {
    padding: "4px 8px",
    background: "rgba(0, 0, 0, 0.88)",
    color: "rgba(255, 255, 255, 0.92)",
    fontSize: "var(--badge-xs-font)",
    fontWeight: 'var(--font-weight-normal)' as any,
    lineHeight: 1.4,
    whiteSpace: "nowrap",
    borderRadius: "4px",
    letterSpacing: 0,
    textTransform: "none",
    fontFamily: "var(--font-sans)",
  };

  const arrowStyle: React.CSSProperties = {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    width: 0,
    height: 0,
    border: "4px solid transparent",
    ...(position === "top"
      ? { bottom: -4, borderTopColor: "rgba(0, 0, 0, 0.88)", borderBottom: 0 }
      : { top: -4, borderBottomColor: "rgba(0, 0, 0, 0.88)", borderTop: 0 }),
  };

  return (
    <>
      <span
        ref={triggerRef}
        className={className}
        style={{ display: "inline-flex", position: "relative" }}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
      >
        {children}
      </span>
      {visible &&
        createPortal(
          <div ref={tooltipRef} style={tooltipStyle} role="tooltip">
            <div style={{ position: "relative" }}>
              <div style={bubbleStyle}>{text}</div>
              <div style={arrowStyle} />
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
