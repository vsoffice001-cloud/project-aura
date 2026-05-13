/**
 * SectionLabel Component
 * 
 * A label component following the GitHub repo design system pattern.
 * Supports two styles: plain text labels and outlined pill labels.
 * 
 * @example
 * // Plain text variant (dark background)
 * <SectionLabel background="dark">
 *   CASE STUDY
 * </SectionLabel>
 * 
 * @example
 * // Plain text variant (light background)
 * <SectionLabel background="light">
 *   CHALLENGES
 * </SectionLabel>
 * 
 * @example
 * // Pill variant with shimmer (light background)
 * <SectionLabel style="pill" background="light">
 *   STEP 1
 * </SectionLabel>
 * 
 * @example
 * // Pill variant with shimmer (dark background)
 * <SectionLabel style="pill" background="dark">
 *   OBJECTIVE 01
 * </SectionLabel>
 * 
 * @example
 * // With pulse animation (text style only)
 * <SectionLabel background="dark" pulse>
 *   New Report Available
 * </SectionLabel>
 * 
 * @example
 * // With icon (text style only)
 * <SectionLabel background="light" icon={<Sparkles />}>
 *   Premium Content
 * </SectionLabel>
 * 
 * @example
 * // Accent color (red)
 * <SectionLabel background="light" variant="accent">
 *   CHAPTER 1 - INDUSTRY ANALYSIS
 * </SectionLabel>
 */

import { motion } from "motion/react";
import { ReactNode } from "react";
import { typography } from "../tokens";

export interface SectionLabelProps {
  /** Label text content */
  children: ReactNode;
  
  /** Style variant */
  style?: "text" | "pill";
  
  /** Background context - determines text/border color */
  background?: "dark" | "light";
  
  /** Visual variant */
  variant?: "default" | "accent";
  
  /** Optional icon element (Lucide icon) - only for text style */
  icon?: ReactNode;
  
  /** Enable pulsing dot animation - only for text style */
  pulse?: boolean;
  
  /** Additional CSS classes */
  className?: string;
}

/**
 * SectionLabel - Section identifier with text or pill style
 * 
 * Follows the design system pattern found in:
 * - SampleReportPreview.tsx (CHAPTER labels)
 * - ExtendedTOC.tsx (section labels)
 * - HeroSection.tsx (status labels)
 * - ResearchMethodology.tsx (STEP labels)
 */
export function SectionLabel({
  children,
  style = "text",
  background = "light",
  variant = "default",
  icon,
  pulse = false,
  className = "",
}: SectionLabelProps) {
  
  // Text color based on background and variant
  const textColor = {
    dark: {
      default: "text-white/80",
      accent: "text-[#ff6b6b]", // Warm coral for dark backgrounds
    },
    light: {
      default: "text-[#737373]", // Neutral gray
      accent: "text-[#b01f24]",  // Ken Bold Red
    },
  }[background][variant];

  // Border color for pill style
  const borderColor = {
    dark: {
      default: "border-white/20",
      accent: "border-[#ff6b6b]/30",
    },
    light: {
      default: "border-[#737373]/30",
      accent: "border-[#b01f24]/30",
    },
  }[background][variant];

  // Pulse dot color based on background
  const pulseColor = background === "dark" ? "#ff6b6b" : "#b01f24";

  // Render pill style
  if (style === "pill") {
    return (
      <div className={`relative inline-block overflow-hidden rounded-full ${className}`}>
        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 -translate-x-full"
          animate={{
            translateX: ["-100%", "100%"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 1,
          }}
          style={{
            background: background === "dark" 
              ? "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)"
              : "linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.05), transparent)",
          }}
        />
        
        {/* Pill container */}
        <span 
          className={`
            relative
            inline-flex
            items-center
            justify-center
            font-sans
            px-4
            py-1.5
            font-semibold
            tracking-[0.2em]
            uppercase
            ${textColor}
            border
            ${borderColor}
            rounded-full
            bg-transparent
          `.trim().replace(/\s+/g, ' ')}
          style={{ fontSize: typography.size.xs }}
        >
          {children}
        </span>
      </div>
    );
  }

  // Render text style (default)
  return (
    <p 
      className={`
        font-sans
        font-semibold 
        tracking-[0.2em] 
        uppercase 
        ${textColor}
        flex 
        items-center 
        gap-2
        ${className}
      `.trim().replace(/\s+/g, ' ')}
      style={{ fontSize: typography.size.sm }}
    >
      {/* Pulse dot animation */}
      {pulse && (
        <motion.span 
          className="relative flex h-2.5 w-2.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.span 
            className="absolute inline-flex h-full w-full rounded-full opacity-75"
            style={{ backgroundColor: pulseColor }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.75, 0, 0.75],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <span 
            className="relative inline-flex h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: pulseColor }}
          />
        </motion.span>
      )}

      {/* Icon */}
      {icon && !pulse && (
        <span className="inline-flex h-3.5 w-3.5">
          {icon}
        </span>
      )}

      {/* Label text */}
      <span style={{ fontSize: typography.size.xs }}>{children}</span>
    </p>
  );
}