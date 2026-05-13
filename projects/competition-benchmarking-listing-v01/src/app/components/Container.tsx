/**
 * Container Component — Ken Bold DS v3.2
 * Semantic width wrapper with 5 presets.
 * Consumes --padding-mobile/tablet/desktop responsive tokens.
 */
import type { ReactNode, CSSProperties } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  maxWidth?: 'page' | 'content' | 'narrow' | 'prose' | 'compact';
  style?: CSSProperties;
}

const maxWidthMap = {
  page: 'var(--container-page)',
  content: 'var(--container-content)',
  narrow: 'var(--container-narrow)',
  prose: 'var(--container-prose)',
  compact: 'var(--container-compact)',
};

export function Container({
  children,
  className = '',
  maxWidth = 'content',
  style,
}: ContainerProps) {
  return (
    <div
      className={`mx-auto container-padding ${className}`}
      style={{ maxWidth: maxWidthMap[maxWidth], ...style }}
    >
      {children}
    </div>
  );
}