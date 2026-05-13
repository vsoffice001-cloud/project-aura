import { useState } from 'react';

interface InlineLinkProps {
  href?: string;
  children: React.ReactNode;
  openInNewTab?: boolean;
}

/**
 * InlineLink Component - Bold Black with Red Hover
 * 
 * Editorial inline link with bold styling and red hover state.
 * Matches theme hierarchy and pointer system.
 * 
 * Features:
 * - Bold black default (emphasis within text)
 * - Bold red hover (brand accent)
 * - Simple underline for clarity
 * - Opens in new tab by default
 * - Visual feedback tooltip for demo
 */
export function InlineLink({ 
  href = '#', 
  children, 
  openInNewTab = true 
}: InlineLinkProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if (href === '#') {
      e.preventDefault();
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2000);
    }
  };

  return (
    <span className="inline-link-wrapper relative">
      <a
        href={href}
        target={openInNewTab ? "_blank" : undefined}
        rel={openInNewTab ? "noopener noreferrer" : undefined}
        onClick={handleClick}
        className="inline-link relative cursor-pointer transition-all duration-200 font-semibold text-black hover:!text-[var(--brand-red)]"
        style={{
          textDecoration: 'underline',
          textDecorationColor: 'rgba(0, 0, 0, 0.3)',
          textDecorationThickness: '1px',
          textUnderlineOffset: '3px'
        }}
      >
        {children}
      </a>

      {/* Visual feedback tooltip for demo */}
      {showTooltip && (
        <span 
          className="absolute left-0 top-full mt-1 px-2 py-1 bg-black text-white text-xs rounded whitespace-nowrap z-10 animate-in fade-in duration-200"
          style={{ fontSize: '11px' }}
        >
          🔗 Link interaction (demo)
        </span>
      )}
    </span>
  );
}