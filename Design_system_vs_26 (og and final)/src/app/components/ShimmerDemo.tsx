import { Download } from 'lucide-react';
import { Button } from '@/app/components/Button';

/**
 * SHIMMER EFFECT DEMO
 * ====================
 * Test page for the new shimmer gradient animation
 */

export function ShimmerDemo() {
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-normal mb-4">Shimmer Effect Demo</h1>
          <p className="text-lg text-black/70">
            Hover over buttons to see the gradient shine animation moving across them.
          </p>
        </div>

        {/* Brand Buttons with Shimmer */}
        <section className="space-y-6">
          <h2 className="text-2xl font-normal">Brand Buttons (Red) with Shimmer</h2>
          <div className="bg-gray-50 p-8 rounded-[5px]">
            <div className="flex flex-wrap gap-4">
              <Button variant="brand" size="xl" shimmer>
                Extra Large Shimmer
              </Button>
              <Button variant="brand" size="lg" shimmer showArrow>
                Large with Icon
              </Button>
              <Button variant="brand" size="md" shimmer>
                Medium Shimmer
              </Button>
              <Button variant="brand" size="sm" shimmer>
                Small Shimmer
              </Button>
            </div>
          </div>
        </section>

        {/* Primary Buttons with Shimmer */}
        <section className="space-y-6">
          <h2 className="text-2xl font-normal">Primary Buttons (Black) with Shimmer</h2>
          <div className="bg-gray-50 p-8 rounded-[5px]">
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" size="xl" shimmer>
                Extra Large Shimmer
              </Button>
              <Button variant="primary" size="lg" shimmer icon={<Download size={20} />}>
                Large with Icon
              </Button>
              <Button variant="primary" size="md" shimmer>
                Medium Shimmer
              </Button>
              <Button variant="primary" size="sm" shimmer>
                Small Shimmer
              </Button>
            </div>
          </div>
        </section>

        {/* Custom Duration */}
        <section className="space-y-6">
          <h2 className="text-2xl font-normal">Custom Shimmer Durations</h2>
          <div className="bg-gray-50 p-8 rounded-[5px]">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-black/60 mb-2">Fast (400ms)</p>
                <Button variant="brand" size="lg" shimmer shimmerDuration={400}>
                  Fast Shimmer
                </Button>
              </div>
              <div>
                <p className="text-sm text-black/60 mb-2">Default (700ms)</p>
                <Button variant="brand" size="lg" shimmer>
                  Default Shimmer
                </Button>
              </div>
              <div>
                <p className="text-sm text-black/60 mb-2">Slow (1200ms)</p>
                <Button variant="brand" size="lg" shimmer shimmerDuration={1200}>
                  Slow Shimmer
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison: With vs Without */}
        <section className="space-y-6">
          <h2 className="text-2xl font-normal">Comparison: With vs Without Shimmer</h2>
          <div className="grid grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8 rounded-[5px]">
              <h3 className="text-sm font-semibold mb-4 text-black/60">WITHOUT SHIMMER (Standard)</h3>
              <div className="space-y-4">
                <Button variant="brand" size="lg" showArrow>
                  Schedule Demo
                </Button>
                <Button variant="primary" size="lg" icon={<Download size={20} />}>
                  Download Report
                </Button>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-[5px]">
              <h3 className="text-sm font-semibold mb-4 text-black/60">WITH SHIMMER</h3>
              <div className="space-y-4">
                <Button variant="brand" size="lg" shimmer showArrow>
                  Schedule Demo
                </Button>
                <Button variant="primary" size="lg" shimmer icon={<Download size={20} />}>
                  Download Report
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Secondary & Ghost (subtle shimmer) */}
        <section className="space-y-6">
          <h2 className="text-2xl font-normal">Secondary & Ghost Variants</h2>
          <div className="grid grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8 rounded-[5px]">
              <h3 className="text-sm font-semibold mb-4 text-black/60">SECONDARY (Coral Warmth Shimmer)</h3>
              <Button variant="secondary" size="lg" shimmer>
                Secondary Button
              </Button>
            </div>

            <div className="bg-black p-8 rounded-[5px]">
              <h3 className="text-sm font-semibold mb-4 text-white/60">GHOST (Dark Background)</h3>
              <Button variant="ghost" size="lg" shimmer>
                Ghost Button
              </Button>
            </div>
          </div>
        </section>

        {/* Hero CTA Example */}
        <section className="space-y-6">
          <h2 className="text-2xl font-normal">Hero CTA Example</h2>
          <div className="bg-gradient-to-r from-gray-900 to-black p-16 rounded-[5px] text-center">
            <h3 className="text-3xl text-white mb-4">Transform Your Business Today</h3>
            <p className="text-white/70 mb-8">Join thousands of companies using our platform</p>
            <div className="flex justify-center gap-4">
              <Button variant="brand" size="lg" shimmer showArrow>
                Get Started Free
              </Button>
              <Button variant="ghost" size="lg" shimmer>
                View Demo
              </Button>
            </div>
          </div>
        </section>

        {/* Guidelines */}
        <section className="border-t-2 border-black/10 pt-8 space-y-4">
          <h2 className="text-2xl font-normal">Usage Guidelines</h2>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-green-50 border border-green-200 rounded-[5px] p-6">
              <h3 className="font-semibold text-green-900 mb-3">✅ USE Shimmer For:</h3>
              <ul className="space-y-2 text-sm text-green-900">
                <li>• Hero section CTAs</li>
                <li>• Primary conversion moments</li>
                <li>• "Get Started" / "Sign Up" buttons</li>
                <li>• Premium feature unlocks</li>
                <li>• Final step in funnels</li>
              </ul>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-[5px] p-6">
              <h3 className="font-semibold text-red-900 mb-3">⚠️ SHIMMER INTENSITY By Variant:</h3>
              <ul className="space-y-2 text-sm text-red-900">
                <li>• <strong>Brand:</strong> Bold red gradient sweep — highest visual impact</li>
                <li>• <strong>Primary:</strong> Dark metallic gradient sweep — premium feel</li>
                <li>• <strong>Secondary:</strong> Coral-50 warmth sweep — subtle, elegant</li>
                <li>• <strong>Ghost:</strong> Translucent overlay sweep — minimal presence</li>
                <li>• Shimmer is <strong>always active</strong> on every variant — core brand identity</li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-[5px] p-6 mt-6">
            <h3 className="font-semibold text-blue-900 mb-3">💡 Best Practices</h3>
            <ul className="space-y-2 text-sm text-blue-900">
              <li><strong>Limit usage:</strong> Max 1-2 shimmer buttons per page for impact</li>
              <li><strong>Size matters:</strong> Works best on <code>lg</code> and <code>xl</code> sizes</li>
              <li><strong>Pair with icons:</strong> ArrowUpRight for CTAs enhances the effect</li>
              <li><strong>Duration:</strong> 600-800ms is optimal (default 700ms)</li>
              <li><strong>Accessibility:</strong> Shimmer automatically respects <code>prefers-reduced-motion</code></li>
            </ul>
          </div>
        </section>

        {/* Code Examples */}
        <section className="space-y-4">
          <h2 className="text-2xl font-normal">Code Examples</h2>
          
          <div className="bg-black/[0.02] border border-black/8 rounded-[5px] p-6">
            <pre className="text-sm font-mono text-black/80 overflow-x-auto">
{`// Basic shimmer button
<Button variant="brand" shimmer>
  Get Started
</Button>

// With icon
<Button variant="brand" size="lg" shimmer showArrow>
  Schedule a Demo
</Button>

// Custom duration
<Button variant="primary" shimmer shimmerDuration={1000}>
  Slow Shimmer
</Button>

// Without shimmer (default)
<Button variant="brand">
  Regular Button
</Button>`}
            </pre>
          </div>
        </section>
      </div>
    </div>
  );
}