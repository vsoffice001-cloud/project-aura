/**
 * ColorSwatch Component
 * 
 * Reusable component for displaying color swatches with hex code and label.
 * Used in design system showcases and documentation.
 */

import React from 'react';

export interface ColorSwatchProps {
  /** Hex color code (e.g., "#000000") */
  color: string;
  /** Display name of the color (e.g., "Pure Black") */
  name: string;
  /** Optional label/category (e.g., "Primary", "Brand") */
  label?: string;
  /** Optional usage description */
  usage?: string;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Show border (useful for white colors) */
  showBorder?: boolean;
}

/**
 * ColorSwatch - Display a color with its details
 * 
 * @example
 * ```tsx
 * <ColorSwatch 
 *   color="#000000" 
 *   name="Pure Black"
 *   label="Primary"
 *   usage="Text, dark backgrounds"
 * />
 * ```
 */
export function ColorSwatch({ 
  color, 
  name, 
  label,
  usage,
  size = 'md',
  showBorder = false,
}: ColorSwatchProps) {
  const sizeClasses = {
    sm: 'h-16',
    md: 'h-24',
    lg: 'h-32',
  };

  return (
    <div className="space-y-2">
      <div 
        className={`${sizeClasses[size]} rounded-[5px] shadow-md ${showBorder ? 'border border-black/10' : ''}`}
        style={{ backgroundColor: color }}
        aria-label={`Color swatch: ${name}`}
      />
      <div>
        <p className="text-sm font-mono text-black">{color}</p>
        <p className="text-xs text-black/60">{name}</p>
        {label && (
          <span className="inline-block mt-1 px-2 py-0.5 bg-black/5 rounded text-xs text-black/70">
            {label}
          </span>
        )}
        {usage && (
          <p className="text-xs text-black/50 mt-1">{usage}</p>
        )}
      </div>
    </div>
  );
}

/**
 * ColorSwatchGrid - Grid layout for multiple color swatches
 */
export interface ColorSwatchGridProps {
  /** Array of color swatch props */
  colors: Omit<ColorSwatchProps, 'size'>[];
  /** Grid columns (responsive) */
  columns?: 2 | 3 | 4 | 5 | 6;
  /** Size for all swatches */
  size?: 'sm' | 'md' | 'lg';
}

export function ColorSwatchGrid({ 
  colors, 
  columns = 4,
  size = 'md',
}: ColorSwatchGridProps) {
  const gridColsClass = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4',
    5: 'grid-cols-2 md:grid-cols-5',
    6: 'grid-cols-3 md:grid-cols-6',
  };

  return (
    <div className={`grid ${gridColsClass[columns]} gap-4`}>
      {colors.map((colorProps, index) => (
        <ColorSwatch 
          key={`${colorProps.color}-${index}`} 
          {...colorProps}
          size={size}
        />
      ))}
    </div>
  );
}

/**
 * GradientSwatch - Display a gradient with details
 */
export interface GradientSwatchProps {
  /** CSS gradient string */
  gradient: string;
  /** Name of the gradient */
  name: string;
  /** Optional usage description */
  usage?: string;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
}

export function GradientSwatch({
  gradient,
  name,
  usage,
  size = 'md',
}: GradientSwatchProps) {
  const sizeClasses = {
    sm: 'h-16',
    md: 'h-24',
    lg: 'h-32',
  };

  return (
    <div className="space-y-3">
      <div 
        className={`${sizeClasses[size]} rounded-[5px] shadow-lg relative overflow-hidden`}
        style={{ backgroundImage: gradient }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white font-bold text-sm drop-shadow-md">
            {name}
          </span>
        </div>
      </div>
      <div>
        <code className="text-xs text-black/60 block break-all">
          {gradient}
        </code>
        {usage && (
          <p className="text-xs text-black/50 mt-1">{usage}</p>
        )}
      </div>
    </div>
  );
}
