/**
 * TypeScale Component
 * 
 * Displays the typography scale with live examples.
 * Shows the Major Third (1.25) ratio in action.
 */

import React from 'react';
import { typography } from './tokens';

export interface TypeScaleItemProps {
  /** Token name (e.g., "--text-3xl") */
  token: string;
  /** Size in pixels */
  sizePx: number;
  /** Size in rem */
  sizeRem: string;
  /** Example text to display */
  text: string;
  /** Usage context description */
  usage?: string;
  /** HTML tag to use */
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
}

/**
 * TypeScaleItem - Single typography scale item
 */
export function TypeScaleItem({
  token,
  sizePx,
  sizeRem,
  text,
  usage,
  tag = 'p',
}: TypeScaleItemProps) {
  const Tag = tag;

  return (
    <div className="border-b border-black/10 pb-6">
      <div className="flex items-baseline justify-between mb-2">
        <p className="text-xs text-black/40">
          {token} ({sizePx}px / {sizeRem})
        </p>
        {usage && (
          <span className="text-xs text-black/40 italic">{usage}</span>
        )}
      </div>
      <Tag 
        style={{ fontSize: `var(${token})` }} 
        className="font-bold text-black"
      >
        {text}
      </Tag>
    </div>
  );
}

/**
 * TypeScale - Full typography scale showcase
 */
export interface TypeScaleProps {
  /** Show all sizes or only essential ones */
  variant?: 'full' | 'essential';
  /** Custom example text */
  exampleText?: string;
}

export function TypeScale({ 
  variant = 'essential',
  exampleText = 'The quick brown fox jumps over the lazy dog',
}: TypeScaleProps) {
  const essentialScales: TypeScaleItemProps[] = [
    {
      token: '--text-3xl',
      sizePx: typography.sizePx['3xl'],
      sizeRem: typography.size['3xl'],
      text: 'Hero Heading',
      usage: 'Hero H1 only',
      tag: 'h1',
    },
    {
      token: '--text-2xl',
      sizePx: typography.sizePx['2xl'],
      sizeRem: typography.size['2xl'],
      text: 'Section Heading',
      usage: 'Main sections H2',
      tag: 'h2',
    },
    {
      token: '--text-xl',
      sizePx: typography.sizePx.xl,
      sizeRem: typography.size.xl,
      text: 'Subsection Heading',
      usage: 'Subsections H3',
      tag: 'h3',
    },
    {
      token: '--text-lg',
      sizePx: typography.sizePx.lg,
      sizeRem: typography.size.lg,
      text: 'Card Title (2-3 cards)',
      usage: 'Large card titles',
      tag: 'h4',
    },
    {
      token: '--text-base',
      sizePx: typography.sizePx.base,
      sizeRem: typography.size.base,
      text: 'Large body text, card titles (4+ cards)',
      usage: 'Large body',
      tag: 'p',
    },
    {
      token: '--text-sm',
      sizePx: typography.sizePx.sm,
      sizeRem: typography.size.sm,
      text: 'Standard body text, descriptions, paragraphs',
      usage: 'Standard body',
      tag: 'p',
    },
  ];

  const fullScales: TypeScaleItemProps[] = [
    {
      token: '--text-5xl',
      sizePx: typography.sizePx['5xl'],
      sizeRem: typography.size['5xl'],
      text: 'Massive Heading',
      usage: 'Rare, massive impact',
      tag: 'h1',
    },
    {
      token: '--text-4xl',
      sizePx: typography.sizePx['4xl'],
      sizeRem: typography.size['4xl'],
      text: 'Extra Large Heading',
      usage: 'Special moments',
      tag: 'h1',
    },
    ...essentialScales,
    {
      token: '--text-xs',
      sizePx: typography.sizePx.xs,
      sizeRem: typography.size.xs,
      text: 'Labels, metadata, categories, section eyebrows',
      usage: 'Metadata',
      tag: 'span',
    },
  ];

  const scales = variant === 'full' ? fullScales : essentialScales;

  return (
    <div className="space-y-6">
      {scales.map((scale) => (
        <TypeScaleItem key={scale.token} {...scale} />
      ))}
    </div>
  );
}

/**
 * TypeScaleComparison - Side-by-side comparison of two type sizes
 */
export interface TypeScaleComparisonProps {
  size1: keyof typeof typography.size;
  size2: keyof typeof typography.size;
  text?: string;
}

export function TypeScaleComparison({
  size1,
  size2,
  text = 'Compare Typography',
}: TypeScaleComparisonProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-2">
        <p className="text-xs text-black/40">
          --text-{size1} ({typography.sizePx[size1]}px)
        </p>
        <p 
          style={{ fontSize: typography.size[size1] }}
          className="font-bold text-black"
        >
          {text}
        </p>
      </div>
      <div className="space-y-2">
        <p className="text-xs text-black/40">
          --text-{size2} ({typography.sizePx[size2]}px)
        </p>
        <p 
          style={{ fontSize: typography.size[size2] }}
          className="font-bold text-black"
        >
          {text}
        </p>
      </div>
    </div>
  );
}

/**
 * TypeHierarchyExample - Shows proper heading hierarchy
 */
export function TypeHierarchyExample() {
  return (
    <div className="space-y-4">
      <h1 style={{ fontSize: 'var(--text-3xl)' }} className="font-bold text-black">
        H1 - Main Heading
      </h1>
      <div className="pl-4 space-y-4">
        <h2 style={{ fontSize: 'var(--text-2xl)' }} className="font-bold text-black">
          H2 - Section Heading
        </h2>
        <div className="pl-4 space-y-4">
          <h3 style={{ fontSize: 'var(--text-xl)' }} className="font-bold text-black">
            H3 - Subsection Heading
          </h3>
          <div className="pl-4 space-y-2">
            <h4 style={{ fontSize: 'var(--text-lg)' }} className="font-bold text-black">
              H4 - Card Title
            </h4>
            <p style={{ fontSize: 'var(--text-sm)' }} className="text-black/70">
              Body text - Standard paragraph content goes here with proper hierarchy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
