/**
 * LogoButton — Clickable logo with hover/focus states
 *
 * WHY:   The logo button was 15 lines of inline JSX in NavLayout,
 *        coupling the layout template to specific sizing, hover, and focus styles.
 *        Extracting it makes the logo reusable and keeps NavLayout thin.
 * WHAT:  A button wrapping a logo component (via `children`),
 *        with subtle hover scale, opacity transition, and
 *        WCAG focus-visible ring. Sizing adapts to children content
 *        (the DS Logo component handles its own dimensions).
 * WHEN:  Always rendered as the first element in the primary nav bar.
 * WHERE: PrimaryNav organism (left section).
 * HOW:   <LogoButton onClick={() => navigate('/')}><Logo size="md" /></LogoButton>
 *
 * Props:
 *   onClick   — Navigation handler (typically navigate('/'))
 *   children  — Logo component to render inside the button (typically DS Logo)
 *   ariaLabel — Accessible label (default: "Ken Research Home")
 */

import { ReactNode } from 'react';

interface LogoButtonProps {
  onClick: () => void;
  children: ReactNode;
  ariaLabel?: string;
}

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