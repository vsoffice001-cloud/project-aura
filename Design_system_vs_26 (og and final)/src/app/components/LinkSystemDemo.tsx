import { Button } from '@/app/components/Button';
import { CTALink } from '@/app/components/CTALink';
import { InlineLink } from '@/app/components/InlineLink';

/**
 * LinkSystemDemo Component
 * 
 * Comprehensive demonstration of VS Design System's link and CTA patterns:
 * 1. Button - Full button component with shimmer + optional arrow
 * 2. CTALink - Unified hover text+arrow for urgency CTAs
 * 3. InlineLink - Subtle paragraph links with red underline
 */

export function LinkSystemDemo() {
  return (
    <div className="min-h-screen bg-white p-12 space-y-16">
      {/* Section 1: Buttons */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-black">Button Component</h2>
          <p className="text-gray-600">
            Reusable button system with shimmer effects (always active) and optional arrow animation (urgency only)
          </p>
        </div>

        <div className="space-y-8">
          {/* Brand Buttons */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-black">Brand Variant (Ken Bold Red)</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="brand" showArrow>
                Get Started Now
              </Button>
              <Button variant="brand">
                Without Arrow
              </Button>
              <Button variant="brand" size="md" showArrow>
                Medium Size
              </Button>
            </div>
          </div>

          {/* Primary Buttons */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-black">Primary Variant (Black)</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" showArrow>
                Submit Form
              </Button>
              <Button variant="primary">
                Standard Action
              </Button>
            </div>
          </div>

          {/* Secondary Buttons */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-black">Secondary Variant (Periwinkle 100 shimmer)</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="secondary">
                Learn More
              </Button>
              <Button variant="secondary" showArrow>
                With Arrow
              </Button>
            </div>
          </div>

          {/* Ghost Buttons */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-black">Ghost Variant</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="ghost">
                Cancel
              </Button>
              <Button variant="ghost" showArrow>
                Go Back
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: CTA Links */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-black">CTALink Component</h2>
          <p className="text-gray-600">
            Unified hover zone for text + arrow. Hover anywhere triggers both gradient text and arrow animation.
            <br />
            <strong>Use for:</strong> Forms, redirects, high-urgency actions
          </p>
        </div>

        <div className="space-y-8">
          {/* Brand CTAs */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-black">Brand CTAs (Ken Bold Red)</h3>
            <div className="flex flex-col gap-4">
              <CTALink href="/contact" variant="brand" size="lg">
                Get Started Today
              </CTALink>
              <CTALink href="/pricing" variant="brand" size="md">
                View Pricing
              </CTALink>
              <CTALink href="/demo" variant="brand" size="sm">
                Request Demo
              </CTALink>
            </div>
          </div>

          {/* Default CTAs */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-black">Default CTAs (Black)</h3>
            <div className="flex flex-col gap-4">
              <CTALink href="/learn-more" variant="default" size="lg">
                Learn More About Our Process
              </CTALink>
              <CTALink href="/resources" variant="default" size="md">
                Download Resources
              </CTALink>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Inline Links */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-black">InlineLink Component</h2>
          <p className="text-gray-600">
            Subtle paragraph links with brand red underline. NO arrows - designed for natural reading flow.
            <br />
            <strong>Use for:</strong> Cross-referencing content, internal navigation within text
          </p>
        </div>

        <div className="space-y-6">
          {/* Example Paragraphs */}
          <div className="max-w-3xl space-y-4">
            <p className="text-base text-black leading-relaxed">
              Our design system follows{' '}
              <InlineLink href="/methodology">Atomic Design methodology</InlineLink>
              {' '}to ensure consistency across all components. This approach allows us to build{' '}
              <InlineLink href="/components">reusable components</InlineLink>
              {' '}that maintain visual harmony while providing maximum flexibility.
            </p>

            <p className="text-base text-black leading-relaxed">
              The typography scale uses a{' '}
              <InlineLink href="/foundations/typography">Major Third ratio (1.25)</InlineLink>
              {' '}to create a harmonious hierarchy. All color tokens are defined in{' '}
              <InlineLink href="/foundations/colors">our color palette</InlineLink>
              {' '}which includes Ken Bold Red (#b01f24) as the primary CTA color.
            </p>

            <p className="text-base text-black leading-relaxed">
              Motion design is critical to our{' '}
              <InlineLink href="/guidelines/motion">interaction principles</InlineLink>
              . We use shimmer effects for all buttons and arrow animations exclusively for{' '}
              <InlineLink href="/patterns/urgency">urgency-based CTAs</InlineLink>
              {' '}to guide user attention appropriately.
            </p>
          </div>

          {/* Visual Comparison */}
          <div className="mt-8 p-6 bg-gray-50 rounded-[5px] space-y-4">
            <h4 className="text-lg font-semibold text-black">Visual States</h4>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Default: Black text + red underline</p>
              <p className="text-sm text-gray-600">Hover: Red text + red underline + warm-100 background</p>
              <p className="text-sm text-gray-600">
                Example: <InlineLink href="#">Hover over this link</InlineLink> to see the effect
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: When to Use What */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-black">Usage Guidelines</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Button Card */}
          <div className="p-6 border border-gray-200 rounded-[5px] space-y-3">
            <h3 className="text-lg font-semibold text-black">Button</h3>
            <p className="text-sm text-gray-600">
              Primary actions, form submissions, modal triggers
            </p>
            <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
              <li>Shimmer: Always active</li>
              <li>Arrow: Only for urgency</li>
              <li>4 variants available</li>
              <li>Full accessibility support</li>
            </ul>
          </div>

          {/* CTALink Card */}
          <div className="p-6 border border-gray-200 rounded-[5px] space-y-3">
            <h3 className="text-lg font-semibold text-black">CTALink</h3>
            <p className="text-sm text-gray-600">
              Lightweight urgency CTAs, page redirects, form entry points
            </p>
            <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
              <li>Unified hover zone</li>
              <li>Text gradient on hover</li>
              <li>Arrow animation included</li>
              <li>2 variants (brand/default)</li>
            </ul>
          </div>

          {/* InlineLink Card */}
          <div className="p-6 border border-gray-200 rounded-[5px] space-y-3">
            <h3 className="text-lg font-semibold text-black">InlineLink</h3>
            <p className="text-sm text-gray-600">
              Paragraph interlinking, cross-references, secondary navigation
            </p>
            <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
              <li>Red underline always visible</li>
              <li>Subtle warm-100 background</li>
              <li>No arrow animation</li>
              <li>Designed for reading flow</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}