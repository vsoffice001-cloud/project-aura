import {
  ChartPie,
  ChartDonut,
  ChartPieSlice,
  ChartBar,
  ChartBarHorizontal,
  ChartLine,
  Funnel,
  FunnelSimple,
  Target,
  CirclesThree,
  CirclesThreePlus,
  Percent,
  Strategy,
  GridFour,
  Graph,
} from '@phosphor-icons/react';

/**
 * KP 2.0 Design System - Market Segmentation Icons Collection
 * 
 * Collection of 15 generic Phosphor icons that represent "market segmentation" concepts.
 * These icons are interchangeable and can work with ANY segmentation card content.
 * 
 * All icons convey: data analysis, market breakdown, segments, shares, analytics
 * 
 * Usage:
 * - Randomly assign to segmentation cards
 * - All use regular/outline weight
 * - Generic enough to work with any card title/content
 */

export const SEGMENTATION_ICONS = [
  ChartPie,           // Pie chart - market shares
  ChartDonut,         // Donut chart - segments
  ChartPieSlice,      // Market slice
  ChartBar,           // Bar chart - comparisons
  ChartBarHorizontal, // Horizontal bar - data comparison
  ChartLine,          // Line chart - trends
  Funnel,             // Market funnel
  FunnelSimple,       // Simple funnel
  Target,             // Market targeting
  CirclesThree,       // Segmentation circles
  CirclesThreePlus,   // Multiple segments
  Percent,            // Market share percentage
  Strategy,           // Strategic segmentation
  GridFour,           // Market grid/matrix
  Graph,              // Analytics graph
] as const;

/**
 * Get a random icon from the segmentation icons collection
 */
export function getRandomSegmentationIcon() {
  const randomIndex = Math.floor(Math.random() * SEGMENTATION_ICONS.length);
  return SEGMENTATION_ICONS[randomIndex];
}

/**
 * Get an icon by index (deterministic assignment)
 * Useful for consistent icon assignment based on card position
 */
export function getSegmentationIconByIndex(index: number) {
  return SEGMENTATION_ICONS[index % SEGMENTATION_ICONS.length];
}
