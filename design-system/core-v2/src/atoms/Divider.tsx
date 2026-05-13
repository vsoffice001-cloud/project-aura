import { cn } from '../lib/cn';

export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerVariant = 'subtle' | 'strong';

export interface DividerProps {
  className?: string;
  orientation?: DividerOrientation;
  /** subtle = popovers (6% opacity); strong = sections (border grey). */
  variant?: DividerVariant;
}

const variantClass: Record<DividerVariant, string> = {
  subtle: 'bg-[var(--border-soft)]',
  strong: 'bg-[var(--border-default)]',
};

/**
 * Divider — horizontal or vertical separator line.
 *
 * Source of truth for all divider/separator usage.
 *
 * @promotedFrom topnav-v32/src/design-system/components/Divider.tsx
 */
export function Divider({
  className,
  orientation = 'horizontal',
  variant = 'subtle',
}: DividerProps) {
  const isHorizontal = orientation === 'horizontal';
  return (
    <div
      className={cn(
        isHorizontal ? 'h-[1px] w-full' : 'w-[1px] h-full',
        variantClass[variant],
        className,
      )}
      role="separator"
      aria-orientation={orientation}
      aria-hidden="true"
    />
  );
}
