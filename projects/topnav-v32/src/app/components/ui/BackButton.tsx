/**
 * BackButton Component
 * 
 * A navigation button with an arrow icon used for going back to previous views.
 * Features a subtle shadow and hover effect.
 * 
 * @component
 * @example
 * ```tsx
 * <BackButton onClick={() => setSelectedIndustry(null)} />
 * ```
 */

interface BackButtonProps {
  /** Click handler for back navigation */
  onClick: () => void;
  /** Optional text label next to icon */
  label?: string;
  /** Additional CSS classes */
  className?: string;
}

export function BackButton({ onClick, label, className = '' }: BackButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        bg-[#fcfcfc] content-stretch flex items-center gap-[8px] overflow-clip 
        p-[6px] relative rounded-[5px] shrink-0
        shadow-[0px_1px_30px_-5px_rgba(128,108,224,0.2)]
        transition-opacity duration-300 ease-in-out
        hover:opacity-80
        ${className}
      `}
      aria-label={label || 'Go back'}
    >
      {/* Back Arrow Icon */}
      <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 size-[14px]">
        <svg 
          className="block size-full" 
          fill="none" 
          preserveAspectRatio="none" 
          viewBox="0 0 14 14"
        >
          <g>
            <path 
              d="M13 7H1M1 7L7 13M1 7L7 1" 
              stroke="black" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </g>
        </svg>
      </div>
      
      {/* Optional Label */}
      {label && (
        <span 
          className="text-[12px] leading-[14.4px] font-medium text-[#141016]"
          style={{ fontVariationSettings: "'opsz' 9" }}
        >
          {label}
        </span>
      )}
      
      {/* Border */}
      <div 
        aria-hidden="true" 
        className="absolute border border-[rgba(20,16,22,0.1)] border-solid inset-0 pointer-events-none rounded-[5px]" 
      />
    </button>
  );
}
