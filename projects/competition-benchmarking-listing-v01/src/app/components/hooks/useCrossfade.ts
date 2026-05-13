/**
 * useCrossfade — Hook
 * Ken Bold DS v4.2
 *
 * WHAT:    Manages opacity crossfade when content changes (e.g., filter results update)
 * WHY:     Prevents jarring flash where old cards vanish and new cards pop in
 * WHERE:   Any listing page that re-renders content on filter/sort/view-mode change
 * WHEN:    Triggers on fingerprint change — dips opacity to 0 briefly, then restores
 * HOW:     Tracks a fingerprint string; on change, sets contentVisible=false for fadeOut ms,
 *          then restores. Returns contentVisible boolean + CSS transition style object.
 *
 * Returns: { contentVisible, crossfadeStyle }
 */
import { useState, useEffect, useRef } from "react";

interface UseCrossfadeOptions {
  /** Duration of the fade-out phase in ms */
  fadeOutMs?: number;
  /** Duration of the fade-in phase in ms */
  fadeInMs?: number;
  /** CSS easing for fade-in */
  fadeInEasing?: string;
  /** CSS easing for fade-out */
  fadeOutEasing?: string;
}

export function useCrossfade(
  fingerprint: string,
  options: UseCrossfadeOptions = {}
) {
  const {
    fadeOutMs = 100,
    fadeInMs = 280,
    fadeInEasing = "cubic-bezier(0.16, 1, 0.3, 1)",
    fadeOutEasing = "ease-out",
  } = options;

  const [contentVisible, setContentVisible] = useState(true);
  const prevFingerprintRef = useRef(fingerprint);

  useEffect(() => {
    if (prevFingerprintRef.current !== fingerprint) {
      prevFingerprintRef.current = fingerprint;

      // Crossfade: dip out → restore
      setContentVisible(false);
      const timer = setTimeout(() => setContentVisible(true), fadeOutMs);
      return () => clearTimeout(timer);
    }
  }, [fingerprint, fadeOutMs]);

  const crossfadeStyle = {
    opacity: contentVisible ? 1 : 0,
    transition: contentVisible
      ? `opacity ${fadeInMs}ms ${fadeInEasing}`
      : `opacity ${fadeOutMs}ms ${fadeOutEasing}`,
  };

  return { contentVisible, crossfadeStyle };
}
