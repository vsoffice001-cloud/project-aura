/**
 * Container Component
 * ===================
 * Single source of truth for all container max-widths and responsive gutters.
 * 
 * DESIGN TOKENS (from theme.css):
 * - --container-content: 1000px  (body sections)
 * - --container-nav: 1200px      (navbar, mega menu)
 * - --container-narrow: 900px    (final CTA, endorsement)
 * - --gutter-mobile: 16px → --gutter-sm: 24px → --gutter-md: 32px
 * 
 * USAGE:
 *   <Container>                         → 1000px + px-4 sm:px-6 md:px-8
 *   <Container width="nav">             → 1200px + px-4 sm:px-6 md:px-8
 *   <Container width="narrow">          → 900px + px-4 sm:px-6 md:px-8
 *   <Container noPadding>               → 1000px, no side padding
 *   <Container className="relative">    → Merges additional classes
 *   <Container as="nav">                → Renders as <nav> instead of <div>
 */

import React from 'react';

type ContainerWidth = 'content' | 'nav' | 'narrow';

interface ContainerProps {
  /** Container max-width preset. Default: 'content' (1000px) */
  width?: ContainerWidth;
  /** Disable responsive side padding (gutters). Default: false */
  noPadding?: boolean;
  /** Additional CSS classes to merge */
  className?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
  /** HTML element to render as. Default: 'div' */
  as?: React.ElementType;
  /** Children */
  children: React.ReactNode;
}

/** CSS variable map for each width preset */
const WIDTH_VARS: Record<ContainerWidth, string> = {
  content: 'var(--container-content)',   // 1000px
  nav: 'var(--container-nav)',           // 1200px
  narrow: 'var(--container-narrow)',     // 900px
};

/** 
 * Responsive gutter classes: 
 * 16px (mobile) → 24px (sm: 640px+) → 32px (md: 768px+) 
 */
const GUTTER_CLASSES = 'px-4 sm:px-6 md:px-8';

export function Container({
  width = 'content',
  noPadding = false,
  className = '',
  style,
  as: Component = 'div',
  children,
}: ContainerProps) {
  const gutterClasses = noPadding ? '' : GUTTER_CLASSES;
  
  return (
    <Component
      className={`mx-auto ${gutterClasses} ${className}`.trim()}
      style={{
        maxWidth: WIDTH_VARS[width],
        ...style,
      }}
    >
      {children}
    </Component>
  );
}
