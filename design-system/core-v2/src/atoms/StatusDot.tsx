import { cn } from '../lib/cn';

export type StatusDotPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

export interface StatusDotProps {
  visible: boolean;
  /** Hex or CSS var token. Default: var(--color-brand-red). */
  color?: string;
  /** Diameter in px. Default: 8 */
  size?: number;
  position?: StatusDotPosition;
  /** Border color. Default: var(--color-foundation-white). */
  borderColor?: string;
}

const positionClass: Record<StatusDotPosition, string> = {
  'top-right':    '-top-[1px] -right-[1px]',
  'top-left':     '-top-[1px] -left-[1px]',
  'bottom-right': '-bottom-[1px] -right-[1px]',
  'bottom-left':  '-bottom-[1px] -left-[1px]',
};

/**
 * StatusDot — small notification/status circle absolutely positioned to parent corner.
 *
 * Use for: notification badges on Avatar, online indicator, action-needed dot.
 * Parent must be `position: relative`.
 *
 * @promotedFrom topnav-v32/src/design-system/components/StatusDot.tsx
 */
export function StatusDot({
  visible,
  color = 'var(--color-brand-red)',
  size = 8,
  position = 'top-right',
  borderColor = 'var(--color-foundation-white)',
}: StatusDotProps) {
  if (!visible) return null;
  return (
    <div
      className={cn('absolute rounded-full', positionClass[position])}
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        borderWidth: 1.5,
        borderStyle: 'solid',
        borderColor,
      }}
      aria-hidden="true"
    />
  );
}
