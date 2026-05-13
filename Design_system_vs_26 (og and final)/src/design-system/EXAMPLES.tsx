/**
 * Design System Usage Examples
 * 
 * Real-world examples of how to use design system tokens and components.
 * Copy and adapt these examples for your own components.
 */

import React from 'react';
import { 
  colors, 
  typography, 
  spacing, 
  borderRadius, 
  shadows,
  gradients,
  ColorSwatch,
  ColorSwatchGrid,
  TypeScale,
  SpacingExample,
  ComponentCard,
  ComponentGrid,
  ComponentSection,
} from '@/design-system';
import { Button } from '@/app/components/Button';

// ============================================
// EXAMPLE 1: Using Color Tokens
// ============================================

export function ColorTokenExample() {
  return (
    <div 
      style={{ 
        backgroundColor: colors.warmBg,
        borderRadius: borderRadius.large,
        padding: spacing.rem[8],
      }}
    >
      <h2 style={{ 
        fontSize: typography.size['2xl'],
        fontWeight: typography.fontWeight.bold,
        color: colors.black,
        marginBottom: spacing.rem[4],
      }}>
        Using Color Tokens
      </h2>
      <p style={{
        fontSize: typography.size.sm,
        color: `rgba(0, 0, 0, 0.7)`,
      }}>
        This card uses warmBg, black text, and proper spacing tokens.
      </p>
    </div>
  );
}

// ============================================
// EXAMPLE 2: Tailwind + Design Tokens
// ============================================

export function TailwindTokenExample() {
  return (
    <div className="bg-[#f5f2f1] rounded-[10px] p-8">
      <h2 className="text-[var(--text-2xl)] font-bold text-black mb-4">
        Mixing Tailwind with Design Tokens
      </h2>
      <p className="text-[var(--text-sm)] text-black/70">
        Use CSS variables for sizes, Tailwind classes for utilities.
      </p>
    </div>
  );
}

// ============================================
// EXAMPLE 3: Responsive Layout with Breakpoints
// ============================================

export function ResponsiveLayoutExample() {
  return (
    <div className="max-w-[var(--container-content)] mx-auto px-4 sm:px-6 md:px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((item) => (
          <div 
            key={item}
            style={{
              backgroundColor: colors.white,
              borderRadius: borderRadius.large,
              padding: spacing.rem[6],
              boxShadow: shadows.md,
            }}
          >
            <h3 style={{ fontSize: typography.size.lg, fontWeight: 700 }}>
              Card {item}
            </h3>
            <p style={{ fontSize: typography.size.sm, opacity: 0.6 }}>
              Responsive grid with design tokens
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================
// EXAMPLE 4: Gradient Button with Brand Colors
// ============================================

export function GradientButtonExample() {
  return (
    <button
      style={{
        background: gradients.brandRed,
        backgroundSize: '200% 200%',
        backgroundPosition: '0% 50%',
        color: colors.white,
        padding: `${spacing.rem[3]} ${spacing.rem[6]}`,
        borderRadius: borderRadius.small,
        border: 'none',
        fontSize: typography.size.sm,
        fontWeight: typography.fontWeight.bold,
        cursor: 'pointer',
        boxShadow: shadows.brandButton.default,
        transition: 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundPosition = '100% 50%';
        e.currentTarget.style.boxShadow = shadows.brandButton.hover;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundPosition = '0% 50%';
        e.currentTarget.style.boxShadow = shadows.brandButton.default;
      }}
    >
      Brand CTA Button
    </button>
  );
}

// ============================================
// EXAMPLE 5: Feature Card with Numbered Badge
// ============================================

export function FeatureCardExample() {
  return (
    <div
      style={{
        backgroundColor: colors.warmBg,
        borderRadius: borderRadius.large,
        padding: spacing.rem[8],
        border: `1px solid rgba(0, 0, 0, 0.05)`,
      }}
    >
      {/* Number Badge */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.black,
          color: colors.white,
          width: '48px',
          height: '48px',
          borderRadius: borderRadius.small,
          fontSize: typography.size.sm,
          fontWeight: typography.fontWeight.bold,
          marginBottom: spacing.rem[4],
        }}
      >
        01
      </div>

      {/* Title */}
      <h4
        style={{
          fontSize: typography.size.xl,
          fontWeight: typography.fontWeight.bold,
          marginBottom: spacing.rem[3],
        }}
      >
        Feature Title
      </h4>

      {/* Description */}
      <p
        style={{
          fontSize: typography.size.sm,
          color: 'rgba(0, 0, 0, 0.6)',
        }}
      >
        Detailed description of the feature with proper spacing and typography.
      </p>
    </div>
  );
}

// ============================================
// EXAMPLE 6: Stats Grid Pattern
// ============================================

export function StatsGridExample() {
  const stats = [
    { value: '2.4K+', label: 'Active Users', description: 'Monthly active' },
    { value: '98%', label: 'Satisfaction', description: 'Customer rate' },
    { value: '150+', label: 'Components', description: 'Reusable elements' },
    { value: '24/7', label: 'Support', description: 'Available hours' },
  ];

  return (
    <div
      style={{
        backgroundColor: colors.warmBg,
        borderRadius: borderRadius.large,
        padding: spacing.rem[12],
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <div key={stat.label} style={{ textAlign: 'center' }}>
            <div
              style={{
                fontSize: typography.size['4xl'],
                fontWeight: typography.fontWeight.bold,
                color: colors.black,
                marginBottom: spacing.rem[2],
              }}
            >
              {stat.value}
            </div>
            <div
              style={{
                fontSize: typography.size.sm,
                fontWeight: typography.fontWeight.bold,
                color: colors.black,
                marginBottom: spacing.rem[1],
              }}
            >
              {stat.label}
            </div>
            <div
              style={{
                fontSize: typography.size.xs,
                color: 'rgba(0, 0, 0, 0.6)',
              }}
            >
              {stat.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================
// EXAMPLE 7: CTA Section Pattern
// ============================================

export function CTASectionExample() {
  return (
    <section
      style={{
        backgroundColor: colors.black,
        padding: `${spacing.rem[20]} 0`,
      }}
    >
      <div className="max-w-[var(--container-content)] mx-auto px-4 sm:px-6 md:px-8">
        <div
          style={{
            borderRadius: borderRadius.large,
            padding: spacing.rem[12],
            textAlign: 'center',
          }}
        >
          <h3
            style={{
              fontSize: typography.size['3xl'],
              fontWeight: typography.fontWeight.bold,
              color: colors.white,
              marginBottom: spacing.rem[4],
            }}
          >
            Ready to Get Started?
          </h3>
          <p
            style={{
              fontSize: typography.size.base,
              color: 'rgba(255, 255, 255, 0.7)',
              marginBottom: spacing.rem[8],
              maxWidth: '600px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            Join thousands of users who have transformed their workflow.
          </p>
          <div style={{ display: 'flex', gap: spacing.rem[4], justifyContent: 'center' }}>
            <Button variant="brand" size="lg" showArrow>
              Get Started
            </Button>
            <Button variant="ghost" size="lg">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// EXAMPLE 8: Using Design System Components
// ============================================

export function DesignSystemComponentExample() {
  return (
    <ComponentSection
      title="Button Variants"
      description="Showcase of all available button variants with usage guidelines."
      level="Example"
    >
      <ComponentGrid columns={2} gap={8}>
        <ComponentCard
          title="Brand Variant"
          variant='variant="brand"'
          usage="✅ Highest conversion priority • Maximum 1 per section"
          background="warm"
        >
          <Button variant="brand" size="lg" showArrow>
            Primary CTA
          </Button>
        </ComponentCard>

        <ComponentCard
          title="Primary Variant"
          variant='variant="primary"'
          usage="✅ Secondary important actions • Dark-to-grey gradient"
          background="warm"
        >
          <Button variant="primary" size="lg" showArrow>
            Secondary Action
          </Button>
        </ComponentCard>
      </ComponentGrid>
    </ComponentSection>
  );
}

// ============================================
// EXAMPLE 9: Color Showcase with ColorSwatch
// ============================================

export function ColorShowcaseExample() {
  return (
    <div>
      <h3 style={{ fontSize: typography.size['2xl'], marginBottom: spacing.rem[6] }}>
        Primary Color Palette
      </h3>
      
      <ColorSwatchGrid
        colors={[
          { 
            color: colors.black, 
            name: 'Pure Black',
            label: 'Primary',
            usage: 'Text, dark backgrounds, high contrast'
          },
          { 
            color: colors.white, 
            name: 'Pure White',
            label: 'Primary',
            usage: 'Light backgrounds, text on dark',
            showBorder: true
          },
          { 
            color: colors.warmBg, 
            name: 'Warm Off-White',
            label: 'Primary',
            usage: 'Highlighted sections, testimonials'
          },
          { 
            color: colors.brand.red600, 
            name: 'Ken Bold Red',
            label: 'Brand (5%)',
            usage: 'CTAs only - use sparingly'
          },
        ]}
        columns={4}
        size="md"
      />
    </div>
  );
}

// ============================================
// EXAMPLE 10: Typography Showcase
// ============================================

export function TypographyShowcaseExample() {
  return (
    <div>
      <h3 style={{ fontSize: typography.size['2xl'], marginBottom: spacing.rem[6] }}>
        Typography Scale - Major Third (1.25 Ratio)
      </h3>
      
      <TypeScale variant="essential" />
    </div>
  );
}

// ============================================
// EXAMPLE 11: Spacing in Grid Layout
// ============================================

export function SpacingGridExample() {
  return (
    <div>
      <h3 style={{ fontSize: typography.size['2xl'], marginBottom: spacing.rem[6] }}>
        Grid with gap-6 (24px)
      </h3>
      
      <SpacingExample gap={6} layout="grid" itemCount={6} />
    </div>
  );
}

// ============================================
// EXAMPLE 12: Complete Page Section
// ============================================

export function CompletePageSectionExample() {
  return (
    <section 
      className="py-20"
      style={{ backgroundColor: colors.white }}
    >
      <div className="max-w-[var(--container-content)] mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <div style={{ marginBottom: spacing.rem[12] }}>
          <span
            style={{
              fontSize: typography.size.xs,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'rgba(0, 0, 0, 0.4)',
              display: 'block',
              marginBottom: spacing.rem[2],
            }}
          >
            FEATURES
          </span>
          <h2
            style={{
              fontSize: typography.size['2xl'],
              fontWeight: typography.fontWeight.bold,
              color: colors.black,
              marginBottom: spacing.rem[3],
            }}
          >
            Key Features
          </h2>
          <p
            style={{
              fontSize: typography.size.base,
              color: 'rgba(0, 0, 0, 0.6)',
              maxWidth: '700px',
            }}
          >
            Discover the powerful features that make our platform stand out.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((num) => (
            <div
              key={num}
              style={{
                backgroundColor: colors.warmBg,
                borderRadius: borderRadius.large,
                padding: spacing.rem[8],
                border: '1px solid rgba(0, 0, 0, 0.05)',
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: colors.black,
                  color: colors.white,
                  width: '48px',
                  height: '48px',
                  borderRadius: borderRadius.small,
                  fontSize: typography.size.sm,
                  fontWeight: typography.fontWeight.bold,
                  marginBottom: spacing.rem[4],
                }}
              >
                0{num}
              </div>
              <h4
                style={{
                  fontSize: typography.size.xl,
                  fontWeight: typography.fontWeight.bold,
                  marginBottom: spacing.rem[3],
                }}
              >
                Feature Title {num}
              </h4>
              <p
                style={{
                  fontSize: typography.size.sm,
                  color: 'rgba(0, 0, 0, 0.6)',
                }}
              >
                Detailed description of the feature explaining value proposition and benefits.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// USAGE TIP COMPONENT
// ============================================

export function UsageTip({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        backgroundColor: colors.warmBg,
        border: `2px solid ${colors.black}`,
        borderRadius: borderRadius.small,
        padding: spacing.rem[4],
        marginTop: spacing.rem[4],
      }}
    >
      <div
        style={{
          fontSize: typography.size.xs,
          fontWeight: typography.fontWeight.bold,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          marginBottom: spacing.rem[2],
        }}
      >
        💡 Usage Tip
      </div>
      <div style={{ fontSize: typography.size.sm, color: 'rgba(0, 0, 0, 0.7)' }}>
        {children}
      </div>
    </div>
  );
}