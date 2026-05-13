/**
 * StatusDot — Small notification/status indicator circle
 *
 * Design System primitive. An absolutely-positioned dot that signals
 * a status (notification, action-needed, online, etc.) on its parent.
 *
 * Promoted from: navbar/atoms/IndicatorDot.tsx
 * Consumed by:   Navbar (AuthAvatar), Notification bells, Badge counts
 *
 * @example
 * <div className="relative">
 *   <Avatar />
 *   <StatusDot visible={hasNotifications} />
 * </div>
 *
 * <StatusDot visible color="#22c55e" position="bottom-right" /> // Online indicator
 */

interface StatusDotProps {
  /** Show/hide the dot */
  visible: boolean;
  /** Dot fill color. Default: brand red #b01f24 */
  color?: string;
  /** Dot diameter in px. Default: 8 */
  size?: number;
  /** Corner positioning relative to parent. Default: 'top-right' */
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  /** Border color around the dot. Default: white */
  borderColor?: string;
}

const positionClasses = {
  'top-right': '-top-[1px] -right-[1px]',
  'top-left': '-top-[1px] -left-[1px]',
  'bottom-right': '-bottom-[1px] -right-[1px]',
  'bottom-left': '-bottom-[1px] -left-[1px]',
};

export function StatusDot({
  visible,
  color = '#b01f24',
  size = 8,
  position = 'top-right',
  borderColor = 'white',
}: StatusDotProps) {
  if (!visible) return null;

  return (
    <div
      className={`absolute ${positionClasses[position]} rounded-full`}
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
