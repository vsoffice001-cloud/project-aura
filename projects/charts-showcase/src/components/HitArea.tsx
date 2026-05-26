'use client';

/**
 * HitArea · 44×44 touch-target wrapper for small icon buttons.
 *
 * WHY  · WCAG 2.5.5 requires minimum 44×44px touch target area.
 *        Small visual buttons (DS Button xs = 28px) fail this requirement.
 *        Invisible wrapper provides 44px hit area without changing visual density.
 * WHAT · Transparent inline-flex span that enforces min-width/height 44×44px.
 *        Inner content renders at its natural visual size.
 * WHEN · Any icon-only or small text button where visual size < 44px.
 * WHEN NOT · Buttons already ≥44px (sm/md/lg/xl DS sizes). Form inputs.
 *
 * @module charts-showcase/components/HitArea
 */

import type { ReactNode } from 'react';

interface HitAreaProps {
  children: ReactNode;
  className?: string;
}

export function HitArea({ children, className = '' }: HitAreaProps) {
  return (
    <span
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ minWidth: '44px', minHeight: '44px' }}
    >
      {children}
    </span>
  );
}
