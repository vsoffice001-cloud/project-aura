/**
 * Icon Color System - Design System VS 26
 * 
 * Semantic color classification for icons based on their purpose.
 * Every Lucide icon must use one of these two colors — no exceptions.
 * 
 * Content Icons (#806ce0 - Periwinkle):
 * - Feature icons (Sparkles, Lightbulb, Target, Zap)
 * - Metric/data icons (TrendingUp, BarChart3, PieChart)
 * - Phase/section icons (BookOpen, Layers, Building2)
 * - Content representation (FileText, Globe, Phone)
 * - Decorative bullet pointers (ChevronRight as list markers)
 * 
 * Utility Icons (#737373 - Gray):
 * - Navigation controls (ChevronLeft, ChevronRight, ChevronDown)
 * - Action buttons (X, Download, Trash2, Save)
 * - UI controls (Search, Filter, Settings, Menu)
 * - State indicators (Check, Lock, Unlock)
 * 
 * Purple (#806ce0) boundaries:
 * ✅ Icon stroke color, container backgrounds at 10% opacity, shadows at 6%
 * ❌ Solid backgrounds, full-opacity text, full-opacity borders
 * 
 * @example
 * ```tsx
 * import { iconColors } from '@/app/components/iconColors';
 * 
 * <BarChart3 color={iconColors.content} size={20} />
 * <ChevronDown color={iconColors.utility} size={20} />
 * ```
 */

export const iconColors = {
  /** Content icons — Periwinkle #806ce0 */
  content: '#806ce0',
  /** Utility icons — Gray #737373 */
  utility: '#737373',
} as const;

export type IconColorType = keyof typeof iconColors;

export function getIconColor(type: IconColorType): string {
  return iconColors[type];
}
