import React from 'react';

/**
 * LABEL COMPONENT - Design System v3.0 (Form-Only)
 * =================================================
 * Semantic <label> component exclusively for form inputs.
 * 
 * IMPORTANT SCOPE CHANGE (v3.0):
 * The "section" variant has been REMOVED. Section headers now live in
 * Badge.tsx as SectionLabel wrapper. This eliminates the overlap where
 * two components (Label and Badge) served the same purpose.
 * 
 * WHERE THINGS LIVE NOW:
 * - Form labels       -> Label.tsx (this file) -> documented on Components > Form Inputs page
 * - Section headers   -> Badge.tsx SectionLabel -> documented on Components > Badges & Section Labels page
 * - Chapter headers   -> Badge.tsx (pattern)    -> documented on Components > Badges & Section Labels page
 * 
 * WHY THIS EXISTS:
 * - Provide clear, accessible context for form inputs
 * - Establish consistent form label hierarchy
 * - Improve accessibility with semantic <label> + htmlFor association
 * - Support required field indicators and helper text
 * 
 * WHAT:
 * - 3 variants: default, secondary, required
 * - Required field asterisk indicator
 * - Optional helper text below the label
 * - Semantic HTML <label> element with htmlFor
 * 
 * WHEN:
 * - Use 'default' for standard form input labels (most common)
 * - Use 'secondary' for less important labels, optional fields
 * - Use 'required' (or required prop) to indicate mandatory fields
 * 
 * HOW:
 * - Always pair with form inputs using htmlFor
 * - Keep label text concise and descriptive
 * - Use helperText for additional guidance (e.g., "3-20 characters")
 * 
 * IMPORTANT - FOR SECTION HEADERS, USE BADGE INSTEAD:
 * import { SectionLabel } from '@/app/components/Badge';
 * <SectionLabel theme="brand">KEY INSIGHTS</SectionLabel>
 */

export type LabelVariant = 'default' | 'secondary' | 'required';

interface LabelProps {
  children: React.ReactNode;
  /** Associates label with a form input via id */
  htmlFor?: string;
  /** Visual variant (default: 'default') */
  variant?: LabelVariant;
  /** Shows red asterisk for mandatory fields */
  required?: boolean;
  /** Descriptive text below the label */
  helperText?: string;
  /** Additional CSS classes */
  className?: string;
}

const variantStyles: Record<LabelVariant, string> = {
  // Default form label - 16px, medium weight, full black
  default: 'text-black font-medium',
  
  // Secondary label - less emphasis for optional/supporting fields
  secondary: 'text-black/70 font-normal',
  
  // Required field label - same as default but with asterisk
  required: 'text-black font-medium',
};

export function Label({
  children,
  htmlFor,
  variant = 'default',
  required = false,
  helperText,
  className = '',
}: LabelProps) {
  const variantClass = variantStyles[variant];
  const isRequired = required || variant === 'required';

  return (
    <div className={`mb-2 ${className}`}>
      <label
        htmlFor={htmlFor}
        className={`
          block mb-1.5
          select-none
          ${variantClass}
        `}
        style={{ fontSize: 'var(--text-sm)' }} // 16px
      >
        {children}
        {isRequired && (
          <span className="text-[var(--brand-red)] ml-1" aria-label="required">
            *
          </span>
        )}
      </label>
      {helperText && (
        <p className="text-xs text-black/60 mt-1">
          {helperText}
        </p>
      )}
    </div>
  );
}

/**
 * DESIGN TOKENS USED:
 * ------------------
 * Colors:
 * - Black: #000000 - Default labels
 * - Black/70: rgba(0,0,0,0.7) - Secondary labels
 * - Black/60: rgba(0,0,0,0.6) - Helper text
 * - Brand Red: var(--brand-red) #b01f24 - Required asterisk
 * 
 * Typography:
 * - var(--text-sm): 16px - All label variants
 * - var(--text-xs): 12.8px - Helper text
 * 
 * Spacing:
 * - mb-1.5: 6px (label to input gap)
 * - mb-2: 8px (container bottom margin)
 * - mt-1: 4px (helper text top margin)
 */

/**
 * USAGE EXAMPLES:
 * --------------
 * 
 * // Standard form label
 * <Label htmlFor="email">Email Address</Label>
 * <input id="email" type="email" />
 * 
 * // Required field
 * <Label htmlFor="password" required>Password</Label>
 * <input id="password" type="password" />
 * 
 * // With helper text
 * <Label 
 *   htmlFor="username" 
 *   helperText="Choose a unique username (3-20 characters)"
 * >
 *   Username
 * </Label>
 * <input id="username" type="text" />
 * 
 * // Secondary label (optional field)
 * <Label htmlFor="bio" variant="secondary">
 *   Bio (Optional)
 * </Label>
 * <textarea id="bio" />
 * 
 * // Required variant (alternative to required prop)
 * <Label htmlFor="phone" variant="required">Phone Number</Label>
 * <input id="phone" type="tel" />
 */

/**
 * ACCESSIBILITY:
 * -------------
 * - Uses semantic <label> element (not <span> or <div>)
 * - htmlFor attribute creates programmatic link to input
 * - Required fields marked with aria-label="required" on asterisk
 * - Helper text provides additional context for screen readers
 * 
 * Screen reader announcements:
 * - "Email Address, required, edit text"
 * - "Password, required, secure edit text"
 * - Helper text read after label content
 * 
 * MIGRATION NOTE:
 * If you were using <Label variant="section">, migrate to:
 * import { SectionLabel } from '@/app/components/Badge';
 * <SectionLabel theme="brand">YOUR SECTION TITLE</SectionLabel>
 */

/**
 * COMPLETE FORM EXAMPLE:
 * ---------------------
 * <form>
 *   <Label htmlFor="name" required>Full Name</Label>
 *   <input 
 *     id="name" 
 *     type="text" 
 *     className="w-full px-4 py-2 border border-black/10 rounded"
 *   />
 * 
 *   <Label 
 *     htmlFor="email" 
 *     required
 *     helperText="We'll never share your email"
 *   >
 *     Email Address
 *   </Label>
 *   <input 
 *     id="email" 
 *     type="email" 
 *     className="w-full px-4 py-2 border border-black/10 rounded"
 *   />
 * 
 *   <Label htmlFor="bio" variant="secondary" helperText="Optional - tell us about yourself">
 *     Bio
 *   </Label>
 *   <textarea 
 *     id="bio" 
 *     className="w-full px-4 py-2 border border-black/10 rounded"
 *   />
 * 
 *   <Button variant="primary" type="submit">Submit</Button>
 * </form>
 */
