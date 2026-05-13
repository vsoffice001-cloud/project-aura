/**
 * Input Component
 * 
 * A styled input field with consistent design system styling.
 * Features border, shadow, and proper focus states.
 * 
 * @component
 * @example
 * ```tsx
 * <Input 
 *   type="email"
 *   placeholder="Enter your email"
 *   value={email}
 *   onChange={(e) => setEmail(e.target.value)}
 * />
 * ```
 * 
 * Features:
 * - Consistent styling with design system
 * - Border and shadow effects
 * - Inner shadow for depth
 * - Placeholder styling
 * - Full width by default
 * 
 * Design Specifications:
 * - Background: #fcfcfc
 * - Border: 1px rgba(20,16,22,0.1)
 * - Outer shadow: 0px 5px 9px -5px rgba(0,0,0,0.24)
 * - Inner shadow: inset 0px 0px 8px 0px rgba(220,220,220,0.4)
 * - Border radius: 10px
 * - Padding: 12px horizontal, 8px vertical
 * - Text: 12px DM Sans Regular, black
 * - Placeholder: rgba(0,0,0,0.5)
 */

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Custom CSS classes */
  className?: string;
}

export function Input({ className = '', ...props }: InputProps) {
  return (
    <div className={`flex flex-col items-start relative shrink-0 w-full ${className}`}>
      <div className="bg-[#fcfcfc] relative rounded-[10px] shadow-[0px_5px_9px_-5px_rgba(0,0,0,0.24)] shrink-0 w-full">
        <div className="overflow-hidden rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col items-start px-[12px] py-[8px] relative w-full">
            <div className="content-stretch flex h-[17px] items-center justify-center relative shrink-0 w-full">
              <input
                {...props}
                className="w-full bg-transparent border-none outline-none font-nav font-normal text-[12px] text-black placeholder:text-[rgba(0,0,0,0.5)] leading-[16.8px]"
                style={{ fontVariationSettings: "'opsz' 9" }}
              />
            </div>
            {/* Border */}
            <div className="absolute inset-0 rounded-[10px]">
              <div 
                aria-hidden="true" 
                className="absolute border border-[rgba(20,16,22,0.1)] border-solid inset-0 pointer-events-none rounded-[10px]" 
              />
            </div>
          </div>
        </div>
        {/* Inner Shadow */}
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_8px_0px_rgba(220,220,220,0.4)]" />
      </div>
    </div>
  );
}