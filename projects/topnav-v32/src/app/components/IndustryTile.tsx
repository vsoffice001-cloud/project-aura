/**
 * IndustryTile Component
 * 
 * A clickable tile displaying an industry with icon, label, and expand button.
 * Features hover shadow effect for visual feedback.
 * 
 * @component
 * @example
 * ```tsx
 * <IndustryTile
 *   icon={<AgricultureIcon />}
 *   label="Agriculture and Animal Care"
 *   isExpanded={selectedIndustry === 'agriculture'}
 *   onClick={() => setSelectedIndustry('agriculture')}
 * />
 * ```
 */

import { ExpandButton } from './ui';

interface IndustryTileProps {
  /** Industry icon (SVG component) */
  icon: React.ReactNode;
  /** Industry label text */
  label: string;
  /** Whether this industry is currently expanded */
  isExpanded?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Additional CSS classes */
  className?: string;
}

export function IndustryTile({ 
  icon, 
  label, 
  isExpanded = false, 
  onClick,
  className = '' 
}: IndustryTileProps) {
  return (
    <div 
      className={`
        content-stretch flex h-[33px] isolate items-center justify-between 
        relative shrink-0 w-full
        ${className}
      `}
    >
      {/* Tile Content */}
      <div className="content-stretch flex flex-col items-start relative shrink-0 z-[2]">
        <div 
          className={`
            bg-[#fcfcfc] 
            px-[12px] py-[8px] 
            rounded-[10px] 
            flex items-center gap-[8px]
            transition-shadow duration-300 ease-in-out
            cursor-pointer
            ${isExpanded ? 'shadow-[0px_1px_30px_-5px_rgba(128,108,224,0.35)]' : ''}
            hover:shadow-[0px_1px_30px_-5px_rgba(128,108,224,0.35)]
          `}
          onClick={onClick}
        >
          {/* Icon */}
          <div className="relative shrink-0 size-[16px]">
            {icon}
          </div>
          
          {/* Label */}
          <div className="content-stretch flex flex-col items-start relative shrink-0">
            <span 
              className="text-[14px] leading-[16.8px] font-normal text-[#141016] whitespace-nowrap"
              style={{ fontVariationSettings: "'opsz' 9" }}
            >
              {label}
            </span>
          </div>
        </div>
      </div>
      
      {/* Expand Button */}
      <div className="content-stretch flex flex-col items-start relative shrink-0 z-[1]">
        <ExpandButton 
          isExpanded={isExpanded}
          onClick={onClick}
        />
      </div>
    </div>
  );
}