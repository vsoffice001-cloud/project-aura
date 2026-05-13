/**
 * ConnectCardCompact Component
 * 
 * A subtle, compact version of the ConnectCard for non-intrusive subscription prompts.
 * Perfect for secondary placements where you want to offer subscription without being pushy.
 * 
 * @component
 * @example
 * ```tsx
 * <ConnectCardCompact />
 * ```
 * 
 * Features:
 * - Compact layout (reduced padding and spacing)
 * - Subtle styling (lighter background)
 * - Smaller text sizes
 * - More minimal design
 * - Same functionality as ConnectCard
 * 
 * Design Specifications:
 * - Background: #fafafa (lighter than original #fcfcfc)
 * - Border: 0.5px rgba(20,16,22,0.08) (more subtle)
 * - Shadow: Lighter shadow
 * - Padding: 16px (vs 24px original)
 * - Gap: 6px between elements (vs 8px)
 * - Title: 14px (vs 16px)
 * - Description: 11px (vs 12px)
 * - Input height: 32px (vs 35px)
 * - Button: More compact
 */

export function ConnectCardCompact() {
  return (
    <div className="bg-[#fafafa] relative rounded-[12px] shrink-0 w-full">
      {/* Border and Shadow Overlay - More Subtle */}
      <div 
        aria-hidden="true" 
        className="absolute border-[0.5px] border-[rgba(20,16,22,0.08)] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_1px_8px_0px_rgba(128,108,224,0.12)]" 
      />
      
      {/* Content - Compact Spacing */}
      <div className="flex flex-col gap-[6px] items-start p-[16px] relative w-full">
        
        {/* Title - Smaller */}
        <div className="flex flex-col items-start relative shrink-0 w-full">
          <div 
            className="flex flex-col font-nav font-medium justify-center leading-[0] relative shrink-0 text-[14px] text-black w-full"
            style={{ fontVariationSettings: "'opsz' 14" }}
          >
            <p className="leading-[20px]">Stay Updated</p>
          </div>
        </div>

        {/* Description - Smaller */}
        <div className="flex flex-col items-start relative shrink-0 w-full mb-[4px]">
          <div 
            className="flex flex-col font-nav font-normal justify-center leading-[0] relative shrink-0 text-[11px] text-black w-full"
            style={{ fontVariationSettings: "'opsz' 9" }}
          >
            <p className="leading-[16px]">Get latest insights in your inbox</p>
          </div>
        </div>

        {/* Email Input - Compact */}
        <div className="flex items-center gap-[8px] relative w-full">
          <div className="bg-white flex-1 rounded-[8px] h-[32px] relative overflow-hidden border border-[rgba(20,16,22,0.1)]">
            <input 
              type="email"
              placeholder="Your email"
              className="w-full h-full px-[10px] font-nav text-[12px] text-black placeholder:text-[#141016] placeholder:opacity-50 outline-none"
              style={{ fontVariationSettings: "'opsz' 9" }}
            />
          </div>
          
          {/* Submit Button - Compact */}
          <button 
            className="bg-gradient-to-r from-[#b01f24] via-[#eb484e] to-[#b01f24] px-[12px] h-[32px] rounded-[8px] shrink-0 hover:shadow-md transition-shadow flex items-center justify-center"
          >
            <svg 
              className="size-[14px]" 
              fill="none" 
              viewBox="0 0 14 14"
            >
              <path 
                d="M13.125 1.75L6.5625 8.3125M13.125 1.75L8.75 13.125L6.5625 8.3125M13.125 1.75L0.875 6.125L6.5625 8.3125" 
                stroke="white" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="1.2"
              />
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
}