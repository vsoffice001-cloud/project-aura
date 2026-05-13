import { useRef, useState, useEffect, useCallback, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface HorizontalScrollProps {
  children: ReactNode;
  /** Background color for fade edges (must match parent bg) */
  fadeBg?: string;
  /** Gap between children (Tailwind class) */
  gap?: string;
  className?: string;
}

/**
 * Horizontal scroll container using transform-based scrolling.
 *
 * Unlike native overflow-x scrolling, this approach uses
 * `overflow-x: clip; overflow-y: visible` on the viewport so that
 * card shadows and hover-lift transforms are never clipped vertically.
 *
 * CSS spec: `overflow: clip` does NOT force the other axis to change
 * (unlike auto/hidden/scroll), so Y stays `visible`.
 *
 * Scrolling is driven by translateX on the track, with support for
 * button navigation, trackpad (wheel), touch drag, and mouse drag.
 */
export function HorizontalScroll({
  children,
  fadeBg = "white",
  gap = "gap-4",
  className = "",
}: HorizontalScrollProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Use refs for scroll position to avoid re-renders during drag/wheel
  const scrollPosRef = useRef(0);
  const maxScrollRef = useRef(0);
  const animatingRef = useRef(false);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // ── Helpers ──

  const clamp = (val: number) => Math.max(0, Math.min(maxScrollRef.current, val));

  const applyTransform = useCallback((animated: boolean) => {
    const track = trackRef.current;
    if (!track) return;
    track.style.transition = animated
      ? "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)"
      : "none";
    track.style.transform = `translateX(-${scrollPosRef.current}px)`;
  }, []);

  const updateFades = useCallback(() => {
    const pos = scrollPosRef.current;
    const max = maxScrollRef.current;
    setCanScrollLeft(pos > 2);
    setCanScrollRight(pos < max - 2);
  }, []);

  const scrollTo = useCallback(
    (pos: number, animated: boolean) => {
      scrollPosRef.current = clamp(pos);
      applyTransform(animated);
      updateFades();
    },
    [applyTransform, updateFades],
  );

  // ── Measure bounds ──

  const updateBounds = useCallback(() => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) return;
    maxScrollRef.current = Math.max(0, track.scrollWidth - viewport.clientWidth);
    // Clamp current position if bounds shrank
    if (scrollPosRef.current > maxScrollRef.current) {
      scrollTo(maxScrollRef.current, false);
    }
    updateFades();
  }, [scrollTo, updateFades]);

  useEffect(() => {
    updateBounds();
    const ro = new ResizeObserver(updateBounds);
    if (viewportRef.current) ro.observe(viewportRef.current);
    if (trackRef.current) ro.observe(trackRef.current);
    return () => ro.disconnect();
  }, [updateBounds, children]);

  // ── Button scroll ──

  const scrollByDirection = (direction: "left" | "right") => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const amount = viewport.clientWidth * 0.7;
    scrollTo(
      scrollPosRef.current + (direction === "left" ? -amount : amount),
      true,
    );
  };

  // ── Wheel (trackpad horizontal swipe) ──

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const onWheel = (e: WheelEvent) => {
      // Prefer deltaX (trackpad horizontal); ignore pure vertical scroll
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : 0;
      if (delta === 0) return;

      e.preventDefault();
      scrollTo(scrollPosRef.current + delta, false);
    };

    viewport.addEventListener("wheel", onWheel, { passive: false });
    return () => viewport.removeEventListener("wheel", onWheel);
  }, [scrollTo]);

  // ── Touch + mouse drag ──

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    let isDragging = false;
    let startX = 0;
    let startScroll = 0;
    let lastX = 0;
    let lastTime = 0;
    let velocity = 0;
    let hasMoved = false;

    const begin = (clientX: number) => {
      isDragging = true;
      hasMoved = false;
      startX = clientX;
      startScroll = scrollPosRef.current;
      lastX = clientX;
      lastTime = performance.now();
      velocity = 0;
      // Kill any running CSS transition
      const track = trackRef.current;
      if (track) {
        const computedTransform = getComputedStyle(track).transform;
        if (computedTransform && computedTransform !== "none") {
          const matrix = new DOMMatrixReadOnly(computedTransform);
          scrollPosRef.current = -matrix.m41;
          startScroll = scrollPosRef.current;
        }
        track.style.transition = "none";
      }
    };

    const move = (clientX: number) => {
      if (!isDragging) return;
      const dx = startX - clientX;
      if (Math.abs(dx) > 3) hasMoved = true;

      const now = performance.now();
      const dt = now - lastTime;
      if (dt > 0) {
        velocity = (lastX - clientX) / dt; // px/ms
      }
      lastX = clientX;
      lastTime = now;

      scrollTo(startScroll + dx, false);
    };

    const end = () => {
      if (!isDragging) return;
      isDragging = false;

      // Momentum
      if (Math.abs(velocity) > 0.2) {
        scrollTo(scrollPosRef.current + velocity * 250, true);
      }
    };

    // ── Touch events ──
    const onTouchStart = (e: TouchEvent) => begin(e.touches[0].clientX);
    const onTouchMove = (e: TouchEvent) => {
      move(e.touches[0].clientX);
      if (hasMoved) e.preventDefault(); // prevent vertical page scroll while dragging
    };
    const onTouchEnd = () => end();

    // ── Mouse events ──
    const onMouseDown = (e: MouseEvent) => {
      // Don't hijack clicks on interactive elements
      if ((e.target as HTMLElement).closest("a, button, input, select, textarea, [role='button']")) return;
      e.preventDefault();
      begin(e.clientX);
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      move(e.clientX);
    };
    const onMouseUp = () => end();

    // Prevent click if user dragged
    const onClick = (e: MouseEvent) => {
      if (hasMoved) {
        e.stopPropagation();
        e.preventDefault();
      }
    };

    viewport.addEventListener("touchstart", onTouchStart, { passive: true });
    viewport.addEventListener("touchmove", onTouchMove, { passive: false });
    viewport.addEventListener("touchend", onTouchEnd);
    viewport.addEventListener("mousedown", onMouseDown);
    viewport.addEventListener("click", onClick, true); // capture phase
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      viewport.removeEventListener("touchstart", onTouchStart);
      viewport.removeEventListener("touchmove", onTouchMove);
      viewport.removeEventListener("touchend", onTouchEnd);
      viewport.removeEventListener("mousedown", onMouseDown);
      viewport.removeEventListener("click", onClick, true);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [scrollTo]);

  return (
    <div className={`relative group/scroll ${className}`}>
      {/* Left fade + arrow */}
      {canScrollLeft && (
        <>
          <div
            className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
            style={{ background: `linear-gradient(to right, ${fadeBg}, transparent)` }}
          />
          <button
            onClick={() => scrollByDirection("left")}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full shadow-md border border-black/[0.06] opacity-0 group-hover/scroll:opacity-100 transition-all duration-300 hover:bg-white hover:shadow-lg hover:scale-105 cursor-pointer"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-4 w-4 text-black/60" />
          </button>
        </>
      )}
      {/* Right fade + arrow */}
      {canScrollRight && (
        <>
          <div
            className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
            style={{ background: `linear-gradient(to left, ${fadeBg}, transparent)` }}
          />
          <button
            onClick={() => scrollByDirection("right")}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full shadow-md border border-black/[0.06] opacity-0 group-hover/scroll:opacity-100 transition-all duration-300 hover:bg-white hover:shadow-lg hover:scale-105 cursor-pointer"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-4 w-4 text-black/60" />
          </button>
        </>
      )}

      {/* Scroll viewport — clips X only, Y stays visible for shadows */}
      <div
        ref={viewportRef}
        style={{ overflowX: "clip", overflowY: "visible" }}
      >
        <div
          ref={trackRef}
          className={`flex ${gap}`}
          style={{ cursor: "grab", willChange: "transform" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
