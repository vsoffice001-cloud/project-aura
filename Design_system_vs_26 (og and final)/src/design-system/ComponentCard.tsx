/**
 * ComponentCard Component
 * 
 * Reusable card wrapper for showcasing design system components.
 * Provides consistent structure for examples and documentation.
 */

import React from 'react';

export interface ComponentCardProps {
  /** Card title */
  title: string;
  /** Optional subtitle or description */
  description?: string;
  /** Component variant or prop information */
  variant?: string;
  /** Usage notes or guidelines */
  usage?: string;
  /** Child components to showcase */
  children: React.ReactNode;
  /** Background color variant */
  background?: 'white' | 'warm' | 'dark';
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * ComponentCard - Showcase wrapper for design system components
 * 
 * @example
 * ```tsx
 * <ComponentCard
 *   title="Brand Button"
 *   variant='variant="brand"'
 *   usage="Highest conversion priority"
 *   background="warm"
 * >
 *   <Button variant="brand">Click Me</Button>
 * </ComponentCard>
 * ```
 */
export function ComponentCard({
  title,
  description,
  variant,
  usage,
  children,
  background = 'warm',
  size = 'md',
}: ComponentCardProps) {
  const backgroundClasses = {
    white: 'bg-white shadow-md border border-black/5',
    warm: 'bg-[#f5f2f1] border border-black/5',
    dark: 'bg-black',
  };

  const textColorClasses = {
    white: 'text-black',
    warm: 'text-black',
    dark: 'text-white',
  };

  const secondaryTextClasses = {
    white: 'text-black/60',
    warm: 'text-black/60',
    dark: 'text-white/60',
  };

  const variantTextClasses = {
    white: 'text-black/40',
    warm: 'text-black/40',
    dark: 'text-white/40',
  };

  const sizeClasses = {
    sm: 'p-6',
    md: 'p-8',
    lg: 'p-12',
  };

  return (
    <div className={`${backgroundClasses[background]} ${sizeClasses[size]} rounded-[10px]`}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-baseline justify-between mb-2">
          <h4 className={`font-bold text-lg ${textColorClasses[background]}`}>
            {title}
          </h4>
          {variant && (
            <span className={`text-xs font-mono ${variantTextClasses[background]}`}>
              {variant}
            </span>
          )}
        </div>

        {/* Description */}
        {description && (
          <p className={`text-sm ${secondaryTextClasses[background]} mb-4`}>
            {description}
          </p>
        )}

        {/* Component Showcase */}
        <div className="my-4">
          {children}
        </div>

        {/* Usage Notes */}
        {usage && (
          <p className={`text-sm ${secondaryTextClasses[background]} mt-4`}>
            {usage}
          </p>
        )}
      </div>
    </div>
  );
}

/**
 * ComponentGrid - Grid layout for multiple component cards
 */
export interface ComponentGridProps {
  /** Grid column configuration */
  columns?: 1 | 2 | 3 | 4;
  /** Gap between cards */
  gap?: 4 | 6 | 8 | 12;
  /** Child component cards */
  children: React.ReactNode;
}

export function ComponentGrid({
  columns = 2,
  gap = 8,
  children,
}: ComponentGridProps) {
  const gridColsClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  const gapClass = `gap-${gap}`;

  return (
    <div className={`grid ${gridColsClass[columns]} ${gapClass}`}>
      {children}
    </div>
  );
}

/**
 * ComponentSection - Section wrapper for design system showcases
 */
export interface ComponentSectionProps {
  /** Section title */
  title: string;
  /** Section description */
  description?: string;
  /** Level indicator (e.g., "Level 01", "Atoms") */
  level?: string;
  /** Child content */
  children: React.ReactNode;
  /** Bottom margin spacing */
  spacing?: 'sm' | 'md' | 'lg';
}

export function ComponentSection({
  title,
  description,
  level,
  children,
  spacing = 'lg',
}: ComponentSectionProps) {
  const spacingClasses = {
    sm: 'mb-12',
    md: 'mb-16',
    lg: 'mb-20',
  };

  return (
    <section className={spacingClasses[spacing]}>
      {/* Section Header */}
      <div className="mb-12">
        {level && (
          <span className="text-xs uppercase tracking-wider text-black/40 mb-2 block">
            {level}
          </span>
        )}
        <h2 className="text-4xl font-bold text-black mb-3">{title}</h2>
        {description && (
          <p className="text-base text-black/60 max-w-[var(--container-prose)]">
            {description}
          </p>
        )}
      </div>

      {/* Section Content */}
      {children}
    </section>
  );
}

/**
 * ComponentSubSection - Subsection within a main section
 */
export interface ComponentSubSectionProps {
  /** Subsection title */
  title: string;
  /** Optional description */
  description?: string;
  /** Child content */
  children: React.ReactNode;
  /** Bottom margin */
  spacing?: 'sm' | 'md' | 'lg';
}

export function ComponentSubSection({
  title,
  description,
  children,
  spacing = 'md',
}: ComponentSubSectionProps) {
  const spacingClasses = {
    sm: 'mb-8',
    md: 'mb-16',
    lg: 'mb-20',
  };

  return (
    <div className={spacingClasses[spacing]}>
      <h3 className="text-2xl font-bold text-black mb-6">{title}</h3>
      {description && (
        <p className="text-base text-black/60 mb-6 max-w-[var(--container-prose)]">
          {description}
        </p>
      )}
      {children}
    </div>
  );
}

/**
 * CodeBlock - Display code with syntax highlighting (simple version)
 */
export interface CodeBlockProps {
  /** Code content */
  code: string;
  /** Programming language */
  language?: 'tsx' | 'css' | 'typescript' | 'javascript';
  /** Show copy button */
  showCopy?: boolean;
}

export function CodeBlock({
  code,
  language = 'tsx',
}: CodeBlockProps) {
  return (
    <div className="bg-black/5 rounded-[5px] p-4 overflow-x-auto">
      <code className="text-xs text-black/70 font-mono whitespace-pre">
        {code}
      </code>
    </div>
  );
}

/**
 * PropertyTable - Display component props/properties
 */
export interface PropertyRow {
  name: string;
  type: string;
  default?: string;
  description: string;
}

export interface PropertyTableProps {
  properties: PropertyRow[];
}

export function PropertyTable({ properties }: PropertyTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-black/10">
            <th className="text-left py-2 px-3 font-bold text-black">Property</th>
            <th className="text-left py-2 px-3 font-bold text-black">Type</th>
            <th className="text-left py-2 px-3 font-bold text-black">Default</th>
            <th className="text-left py-2 px-3 font-bold text-black">Description</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((prop) => (
            <tr key={prop.name} className="border-b border-black/5">
              <td className="py-2 px-3 font-mono text-black">{prop.name}</td>
              <td className="py-2 px-3 font-mono text-black/60">{prop.type}</td>
              <td className="py-2 px-3 font-mono text-black/60">{prop.default || '-'}</td>
              <td className="py-2 px-3 text-black/70">{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * DoAndDont - Show correct and incorrect usage examples
 */
export interface DoAndDontProps {
  /** Correct usage example */
  do: {
    label?: string;
    content: React.ReactNode;
  };
  /** Incorrect usage example */
  dont: {
    label?: string;
    content: React.ReactNode;
  };
}

export function DoAndDont({ do: doExample, dont: dontExample }: DoAndDontProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* DO */}
      <div className="border-2 border-green-500/20 rounded-[10px] p-6 bg-green-500/5">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-green-600 font-bold text-sm">✓ DO</span>
          {doExample.label && (
            <span className="text-xs text-black/60">{doExample.label}</span>
          )}
        </div>
        <div>{doExample.content}</div>
      </div>

      {/* DON'T */}
      <div className="border-2 border-red-500/20 rounded-[10px] p-6 bg-red-500/5">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-red-600 font-bold text-sm">✗ DON'T</span>
          {dontExample.label && (
            <span className="text-xs text-black/60">{dontExample.label}</span>
          )}
        </div>
        <div>{dontExample.content}</div>
      </div>
    </div>
  );
}