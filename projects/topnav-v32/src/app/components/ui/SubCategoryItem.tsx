/**
 * SubCategoryItem Component
 * 
 * A clickable list item for subcategories with hover effect.
 * Used in dropdown panels to display nested navigation options.
 * 
 * @component
 * @example
 * ```tsx
 * <SubCategoryItem 
 *   label="Baby Care"
 *   onClick={() => navigate('/industries/consumer-products/baby-care')}
 * />
 * ```
 */

interface SubCategoryItemProps {
  /** The displayed text */
  label: string;
  /** Optional link href */
  href?: string;
  /** Click handler */
  onClick?: () => void;
  /** Additional CSS classes */
  className?: string;
}

export function SubCategoryItem({ 
  label, 
  href, 
  onClick, 
  className = '' 
}: SubCategoryItemProps) {
  const baseClasses = `
    content-stretch flex items-center px-[12px] py-[8px] relative 
    rounded-[10px] shrink-0 w-full
    transition-colors duration-300 ease-in-out
    hover:bg-[#fcfcfc]
    cursor-pointer
    ${className}
  `;

  const content = (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <span 
        className="text-[14px] leading-[16.8px] font-normal text-[#141016]"
        style={{ fontVariationSettings: "'opsz' 9" }}
      >
        {label}
      </span>
    </div>
  );

  // If href is provided, render as link
  if (href) {
    return (
      <a 
        href={href} 
        className={baseClasses}
        onClick={onClick}
      >
        {content}
      </a>
    );
  }

  // Otherwise render as button
  return (
    <button 
      onClick={onClick} 
      className={baseClasses}
    >
      {content}
    </button>
  );
}
