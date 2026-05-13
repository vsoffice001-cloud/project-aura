/**
 * Icon Color System - Design System VS 26
 * 
 * Provides semantic color classification for icons based on their purpose.
 * This ensures visual hierarchy and consistency across the application.
 * 
 * ## Icon Classification Rules:
 * 
 * **CONTENT ICONS** (#806ce0 - Periwinkle):
 * - Feature icons (Sparkles, Lightbulb, Target, Zap)
 * - Metric/data icons (TrendingUp, BarChart3, PieChart)
 * - Phase/section icons (BookOpen, Layers, Building2)
 * - Content representation (FileText, Globe, Phone)
 * - Decorative bullet pointers (ChevronRight used as list markers)
 * 
 * **UTILITY ICONS** (#737373 - Gray):
 * - Navigation controls (ChevronLeft, ChevronRight, ChevronDown, ChevronUp)
 * - Action buttons (X, Download, Trash2, Save)
 * - UI controls (Search, Filter, Settings, Menu)
 * - State indicators (Check, Lock, Unlock)
 * - View controls (Maximize2, Minimize2, Eye, EyeOff)
 * 
 * ## Purple (#806ce0) Usage Boundaries:
 * 
 * ✅ PERMITTED:
 * - Icon stroke color via `iconColors.content`
 * - Icon container backgrounds at 10% opacity: `rgba(128, 108, 224, 0.1)`
 * - Subtle shadow tints at 6% opacity: `rgba(128, 108, 224, 0.06)`
 * 
 * ❌ PROHIBITED:
 * - Solid button/element backgrounds (use black for utility, red for CTAs)
 * - Full-opacity text color (except inside Badge.tsx internal themes)
 * - Full-opacity borders
 * 
 * @example
 * ```tsx
 * import { iconColors } from '@/design-system/iconColors';
 * 
 * // Content icon
 * <BarChart3 color={iconColors.content} size={20} />
 * 
 * // Utility icon
 * <ChevronDown color={iconColors.utility} size={20} />
 * ```
 */

export const iconColors = {
  /** 
   * Content icons - Periwinkle #806ce0
   * For features, metrics, phases, and content representation
   */
  content: '#806ce0',
  
  /** 
   * Utility icons - Gray #737373
   * For navigation, controls, actions, and UI elements
   */
  utility: '#737373',
} as const;

/**
 * Type for icon color classification
 */
export type IconColorType = keyof typeof iconColors;

/**
 * Helper to get icon color by type
 */
export function getIconColor(type: IconColorType): string {
  return iconColors[type];
}