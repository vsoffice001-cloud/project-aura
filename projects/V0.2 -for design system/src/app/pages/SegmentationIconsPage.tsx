import { SEGMENTATION_ICONS } from '@/app/constants/segmentation-icons';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import { useState } from 'react';

/**
 * KP 2.0 Design System - Market Segmentation Icons Showcase Page
 * 
 * Displays all 15 market segmentation themed icons from Phosphor Icons.
 * These icons are used throughout the application for segmentation cards.
 */

export function SegmentationIconsPage() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const iconDetails = [
    { name: 'ChartPie', description: 'Pie chart - market shares' },
    { name: 'ChartDonut', description: 'Donut chart - segments' },
    { name: 'ChartPieSlice', description: 'Market slice' },
    { name: 'ChartBar', description: 'Bar chart - comparisons' },
    { name: 'ChartBarHorizontal', description: 'Horizontal bar - data comparison' },
    { name: 'ChartLine', description: 'Line chart - trends' },
    { name: 'Funnel', description: 'Market funnel' },
    { name: 'FunnelSimple', description: 'Simple funnel' },
    { name: 'Target', description: 'Market targeting' },
    { name: 'CirclesThree', description: 'Segmentation circles' },
    { name: 'CirclesThreePlus', description: 'Multiple segments' },
    { name: 'Percent', description: 'Market share percentage' },
    { name: 'Strategy', description: 'Strategic segmentation' },
    { name: 'GridFour', description: 'Market grid/matrix' },
    { name: 'Graph', description: 'Analytics graph' },
  ];

  const handleCopyIcon = (index: number, iconName: string) => {
    const code = `import { ${iconName} } from '@phosphor-icons/react';

<${iconName} size={20} weight="regular" className="text-[var(--purple-500)]" />`;
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleCopyCodeBlock = (codeId: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(codeId);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const usageCode = `import { getSegmentationIconByIndex } from '@/app/constants/segmentation-icons';

// Get an icon by index (deterministic)
const Icon = getSegmentationIconByIndex(0); // Returns ChartPie

// Use in a component
<div className="size-10 rounded-lg bg-[var(--purple-100)]">
  <Icon size={20} weight="regular" className="text-[var(--purple-500)]" />
</div>`;

  const randomUsageCode = `import { getRandomSegmentationIcon } from '@/app/constants/segmentation-icons';

// Get a random icon (changes on each render)
const RandomIcon = getRandomSegmentationIcon();

// Use in a component
<div className="size-10 rounded-lg bg-[var(--purple-100)]">
  <RandomIcon size={20} weight="regular" className="text-[var(--purple-500)]" />
</div>`;

  const directImportCode = `import { SEGMENTATION_ICONS } from '@/app/constants/segmentation-icons';

// Access any icon directly by index
const ChartPieIcon = SEGMENTATION_ICONS[0];  // ChartPie
const ChartDonutIcon = SEGMENTATION_ICONS[1];  // ChartDonut

<ChartPieIcon size={20} weight="regular" className="text-[var(--purple-500)]" />`;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-[var(--purple-500)] text-white py-8">
        <div className="max-w-7xl mx-auto px-[84.375px] lg:px-[112.5px]">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </a>
          <h1 className="font-display text-4xl tracking-tight mb-4">
            Market Segmentation Icons Collection
          </h1>
          <p className="text-white/90 text-lg max-w-3xl">
            15 generic market segmentation themed icons from Phosphor Icons.
            All icons use regular/outline weight and represent data analysis, market breakdown, segments, and analytics.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-[84.375px] lg:px-[112.5px] py-16">
        {/* Overview */}
        <section className="mb-16">
          <h2 className="font-display text-2xl tracking-tight mb-4">Overview</h2>
          <p className="text-[var(--black-500)] text-base leading-relaxed mb-4">
            These icons are interchangeable and can work with ANY segmentation card content.
            They convey concepts like data analysis, market breakdown, segments, shares, and analytics.
          </p>
          <div className="bg-[var(--black-50)] rounded-[var(--radius-md)] p-6 border border-[var(--black-200)]">
            <h3 className="font-bold text-lg mb-2">Usage</h3>
            <ul className="space-y-2 text-[var(--black-500)]">
              <li>• Randomly assigned to market segmentation cards</li>
              <li>• All use regular/outline weight for consistency</li>
              <li>• Generic enough to work with any card title/content</li>
              <li>• Displayed with purple backgrounds in cards</li>
            </ul>
          </div>
        </section>

        {/* Icons Grid */}
        <section>
          <h2 className="font-display text-2xl tracking-tight mb-8">All 15 Icons</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {SEGMENTATION_ICONS.map((Icon, index) => (
              <div
                key={index}
                className="bg-white border border-[var(--black-200)] rounded-[var(--radius-md)] p-6 hover:shadow-[var(--shadow-brand-purple)] transition-all duration-300 relative group"
              >
                {/* Copy Button */}
                <button
                  onClick={() => handleCopyIcon(index, iconDetails[index].name)}
                  className="absolute top-4 right-4 p-2 rounded-md bg-white border border-[var(--black-200)] opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[var(--purple-50)] hover:border-[var(--purple-500)]"
                  title="Copy icon code"
                >
                  {copiedIndex === index ? (
                    <Check size={16} className="text-green-600" />
                  ) : (
                    <Copy size={16} className="text-[var(--black-500)]" />
                  )}
                </button>

                {/* Icon Display */}
                <div className="flex items-center justify-center mb-4">
                  <div className="size-16 rounded-lg flex items-center justify-center bg-[var(--purple-100)]">
                    <Icon size={32} weight="regular" className="text-[var(--purple-500)]" />
                  </div>
                </div>

                {/* Icon Info */}
                <div className="text-center">
                  <h3 className="font-bold text-base mb-2">
                    {iconDetails[index].name}
                  </h3>
                  <p className="text-sm text-[var(--black-500)]">
                    {iconDetails[index].description}
                  </p>
                  <div className="mt-3 pt-3 border-t border-[var(--black-100)]">
                    <code className="text-xs text-[var(--purple-500)] bg-[var(--purple-50)] px-2 py-1 rounded">
                      Index: {index}
                    </code>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Code Examples */}
        <section className="mt-16 space-y-8">
          <h2 className="font-display text-2xl tracking-tight mb-4">Code Examples</h2>
          
          {/* Example 1: Using getSegmentationIconByIndex */}
          <div className="relative">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold">Using Index-Based Selection</h3>
              <button
                onClick={() => handleCopyCodeBlock('usage', usageCode)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[var(--purple-500)] text-white hover:bg-[var(--purple-600)] transition-colors text-sm"
              >
                {copiedCode === 'usage' ? (
                  <>
                    <Check size={14} />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>
            <div className="bg-[var(--black-900)] text-white rounded-[var(--radius-md)] p-6 overflow-x-auto">
              <pre className="text-sm">
                <code>{usageCode}</code>
              </pre>
            </div>
          </div>

          {/* Example 2: Using random selection */}
          <div className="relative">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold">Using Random Selection</h3>
              <button
                onClick={() => handleCopyCodeBlock('random', randomUsageCode)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[var(--purple-500)] text-white hover:bg-[var(--purple-600)] transition-colors text-sm"
              >
                {copiedCode === 'random' ? (
                  <>
                    <Check size={14} />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>
            <div className="bg-[var(--black-900)] text-white rounded-[var(--radius-md)] p-6 overflow-x-auto">
              <pre className="text-sm">
                <code>{randomUsageCode}</code>
              </pre>
            </div>
          </div>

          {/* Example 3: Direct import */}
          <div className="relative">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold">Direct Array Access</h3>
              <button
                onClick={() => handleCopyCodeBlock('direct', directImportCode)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[var(--purple-500)] text-white hover:bg-[var(--purple-600)] transition-colors text-sm"
              >
                {copiedCode === 'direct' ? (
                  <>
                    <Check size={14} />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>
            <div className="bg-[var(--black-900)] text-white rounded-[var(--radius-md)] p-6 overflow-x-auto">
              <pre className="text-sm">
                <code>{directImportCode}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* Related Pages */}
        <section className="mt-16 pb-8">
          <h2 className="font-display text-2xl tracking-tight mb-4">Related Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="/stakeholder-icons"
              className="bg-[var(--black-50)] border border-[var(--black-200)] rounded-[var(--radius-md)] p-6 hover:border-[var(--purple-500)] transition-colors"
            >
              <h3 className="font-bold text-lg mb-2">Stakeholder Icons</h3>
              <p className="text-[var(--black-500)] text-sm">
                View the 15 stakeholder and target audience themed icons collection
              </p>
            </a>
            <a
              href="/design-system"
              className="bg-[var(--black-50)] border border-[var(--black-200)] rounded-[var(--radius-md)] p-6 hover:border-[var(--purple-500)] transition-colors"
            >
              <h3 className="font-bold text-lg mb-2">Design System</h3>
              <p className="text-[var(--black-500)] text-sm">
                Explore the complete KP 2.0 Design System documentation
              </p>
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
