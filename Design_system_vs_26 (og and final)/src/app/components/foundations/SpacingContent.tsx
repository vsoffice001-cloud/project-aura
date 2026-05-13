import { DocSection } from './FoundationsHelpers';
import {
  SpacingScaleVisualization,
  MarginPaddingGuide,
  ComponentSpacingExamples,
  ListFormSpacingDemo,
  ResponsiveSpacingDemo,
  VisualRhythmDemo
} from '@/app/components/SpacingHelpers';

/**
 * SPACING CONTENT
 * ===============
 * All spacing documentation for the Foundations tab.
 */

export function SpacingContent() {
  return (
    <div className="space-y-12">
      {/* Spacing Scale */}
      <DocSection
        title="10-Step Spacing Scale"
        why="Consistent spacing creates rhythm and visual harmony. A predictable scale makes design decisions faster."
        what="Base-10 system (4px, 8px, 12px...) up to 96px for maximum flexibility"
        when="Use for margins, padding, gaps - choose from scale rather than arbitrary values"
        where="All spacing decisions throughout the design system"
      >
        <SpacingScaleVisualization />
      </DocSection>

      {/* Margin vs Padding */}
      <DocSection
        title="Margin vs Padding Decision Tree"
        why="Understanding when to use margin vs padding prevents layout issues and ensures consistency"
      >
        <MarginPaddingGuide />
      </DocSection>

      {/* Component Spacing */}
      <DocSection
        title="Component Spacing Examples"
        why="Real examples show how spacing scale applies to actual components"
      >
        <ComponentSpacingExamples />
      </DocSection>

      {/* List & Form Spacing */}
      <DocSection
        title="List & Form Spacing"
        why="Lists and forms need special spacing considerations for scanability and usability"
      >
        <ListFormSpacingDemo />
      </DocSection>

      {/* Responsive Spacing */}
      <DocSection
        title="Responsive Spacing Strategy"
        why="Spacing should adapt to screen size to maintain proportions and hierarchy"
      >
        <ResponsiveSpacingDemo />
      </DocSection>

      {/* Visual Rhythm */}
      <DocSection
        title="Visual Rhythm & Vertical Spacing"
        why="Consistent vertical rhythm creates a comfortable reading experience"
      >
        <VisualRhythmDemo />
      </DocSection>
    </div>
  );
}
