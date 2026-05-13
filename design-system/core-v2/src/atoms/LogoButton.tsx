import type { ReactNode } from 'react';

export interface LogoButtonProps {
  onClick: () => void;
  children: ReactNode;
  ariaLabel?: string;
}

/**
 * LogoButton — clickable logo wrapper w/ subtle hover scale + focus ring.
 *
 * Sizing adapts to children content (Logo SVG handles its own dimensions).
 * Always rendered as first element in primary nav bar.
 *
 * @promotedFrom topnav-v32/src/app/components/navbar/atoms/LogoButton.tsx
 */
export function LogoButton({
  onClick,
  children,
  ariaLabel = 'Ken Research Home',
}: LogoButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className="
        flex items-center
        hover:opacity-90 hover:scale-[1.02]
        transition-all duration-200
        focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-[rgba(20,16,22,0.5)] focus-visible:ring-offset-2
        rounded-[3px] bg-transparent border-none cursor-pointer
      "
    >
      {children}
    </button>
  );
}
