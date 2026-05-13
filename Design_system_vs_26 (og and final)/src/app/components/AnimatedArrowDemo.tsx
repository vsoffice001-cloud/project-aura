/**
 * ANIMATED ARROW DEMO
 * ====================
 * 
 * Showcase of the AnimatedArrow component in various contexts.
 * Use this as reference for implementing the arrow in your designs.
 */

import { AnimatedArrow } from './AnimatedArrow';

export function AnimatedArrowDemo() {
  return (
    <div className="min-h-screen bg-white p-12 space-y-16">
      {/* Header */}
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-normal mb-3">Animated Arrow Component</h1>
        <p className="text-lg text-black/70">
          Simple 2-arrow replacement animation for 45-degree arrows. Hover to see the animation.
        </p>
      </div>

      {/* Demo Section 1: Standalone Arrows */}
      <section className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-normal mb-6">Standalone Arrows</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Small */}
          <div className="border border-black/8 rounded-[5px] p-8 flex flex-col items-center justify-center gap-4">
            <AnimatedArrow size={16} />
            <p className="text-sm text-black/60">Small (16px)</p>
          </div>

          {/* Medium */}
          <div className="border border-black/8 rounded-[5px] p-8 flex flex-col items-center justify-center gap-4">
            <AnimatedArrow size={20} />
            <p className="text-sm text-black/60">Medium (20px)</p>
          </div>

          {/* Large */}
          <div className="border border-black/8 rounded-[5px] p-8 flex flex-col items-center justify-center gap-4">
            <AnimatedArrow size={24} />
            <p className="text-sm text-black/60">Large (24px)</p>
          </div>
        </div>
      </section>

      {/* Demo Section 2: In Buttons */}
      <section className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-normal mb-6">In Buttons</h2>
        <div className="space-y-4">
          {/* Primary Button */}
          <button className="px-6 py-3 bg-black text-white rounded-[5px] flex items-center gap-2 hover:bg-black/90 transition-colors">
            <span>View Case Study</span>
            <AnimatedArrow size={18} color="white" />
          </button>

          {/* Secondary Button */}
          <button className="px-6 py-3 bg-white text-black border border-black/20 rounded-[5px] flex items-center gap-2 hover:border-black/40 transition-colors">
            <span>Learn More</span>
            <AnimatedArrow size={18} color="black" />
          </button>

          {/* Brand Button */}
          <button 
            className="px-6 py-3 text-white rounded-[5px] flex items-center gap-2 transition-colors"
            style={{ backgroundColor: 'var(--brand-red)' }}
          >
            <span>Get Started</span>
            <AnimatedArrow size={18} color="white" />
          </button>
        </div>
      </section>

      {/* Demo Section 3: In Links */}
      <section className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-normal mb-6">In Text Links</h2>
        <div className="space-y-4">
          {/* Regular Link */}
          <a 
            href="#" 
            className="inline-flex items-center gap-2 text-black hover:underline"
            onClick={(e) => e.preventDefault()}
          >
            <span>Read the full article</span>
            <AnimatedArrow size={16} />
          </a>

          {/* Brand Color Link */}
          <a 
            href="#" 
            className="inline-flex items-center gap-2 hover:underline"
            style={{ color: 'var(--brand-red)' }}
            onClick={(e) => e.preventDefault()}
          >
            <span>View project details</span>
            <AnimatedArrow size={16} color="var(--brand-red)" />
          </a>

          {/* Large Link */}
          <a 
            href="#" 
            className="inline-flex items-center gap-2 text-xl text-black hover:underline"
            onClick={(e) => e.preventDefault()}
          >
            <span>Explore our work</span>
            <AnimatedArrow size={20} />
          </a>
        </div>
      </section>

      {/* Demo Section 4: In Cards */}
      <section className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-normal mb-6">In Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="border border-black/8 rounded-[5px] p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-2">Project Alpha</h3>
            <p className="text-black/70 mb-4">
              A comprehensive redesign of the enterprise platform focusing on user experience and performance.
            </p>
            <a 
              href="#" 
              className="inline-flex items-center gap-2 text-sm font-medium"
              style={{ color: 'var(--brand-red)' }}
              onClick={(e) => e.preventDefault()}
            >
              <span>View case study</span>
              <AnimatedArrow size={14} color="var(--brand-red)" />
            </a>
          </div>

          {/* Card 2 */}
          <div className="border border-black/8 rounded-[5px] p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-2">Project Beta</h3>
            <p className="text-black/70 mb-4">
              Mobile-first approach to deliver seamless experiences across all devices and platforms.
            </p>
            <a 
              href="#" 
              className="inline-flex items-center gap-2 text-sm font-medium"
              style={{ color: 'var(--brand-red)' }}
              onClick={(e) => e.preventDefault()}
            >
              <span>View case study</span>
              <AnimatedArrow size={14} color="var(--brand-red)" />
            </a>
          </div>
        </div>
      </section>

      {/* Demo Section 5: Color Variations */}
      <section className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-normal mb-6">Color Variations</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* Black */}
          <div className="border border-black/8 rounded-[5px] p-6 flex flex-col items-center gap-3">
            <AnimatedArrow size={20} color="#000000" />
            <p className="text-sm text-black/60">Black</p>
          </div>

          {/* Brand Red */}
          <div className="border border-black/8 rounded-[5px] p-6 flex flex-col items-center gap-3">
            <AnimatedArrow size={20} color="#b01f24" />
            <p className="text-sm text-black/60">Brand Red</p>
          </div>

          {/* Purple */}
          <div className="border border-black/8 rounded-[5px] p-6 flex flex-col items-center gap-3">
            <AnimatedArrow size={20} color="#806ce0" />
            <p className="text-sm text-black/60">Purple</p>
          </div>

          {/* Coral */}
          <div className="border border-black/8 rounded-[5px] p-6 flex flex-col items-center gap-3">
            <AnimatedArrow size={20} color="#ea7a5f" />
            <p className="text-sm text-black/60">Coral</p>
          </div>
        </div>
      </section>

      {/* Demo Section 6: On Dark Background */}
      <section className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-normal mb-6">On Dark Backgrounds</h2>
        <div className="bg-black rounded-[10px] p-12 space-y-6">
          {/* White Arrow */}
          <div className="flex items-center gap-3">
            <AnimatedArrow size={20} color="white" />
            <span className="text-white text-lg">White arrow on dark background</span>
          </div>

          {/* Link on Dark */}
          <a 
            href="#" 
            className="inline-flex items-center gap-2 text-white hover:underline"
            onClick={(e) => e.preventDefault()}
          >
            <span>Explore our services</span>
            <AnimatedArrow size={18} color="white" />
          </a>

          {/* Button on Dark */}
          <button className="px-6 py-3 bg-white text-black rounded-[5px] flex items-center gap-2 hover:bg-white/90 transition-colors">
            <span>Get in touch</span>
            <AnimatedArrow size={18} color="black" />
          </button>
        </div>
      </section>

      {/* Demo Section 7: Speed Variations */}
      <section className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-normal mb-6">Animation Speed</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Fast */}
          <div className="border border-black/8 rounded-[5px] p-8 flex flex-col items-center justify-center gap-4">
            <AnimatedArrow size={20} duration={150} />
            <p className="text-sm text-black/60">Fast (150ms)</p>
          </div>

          {/* Default */}
          <div className="border border-black/8 rounded-[5px] p-8 flex flex-col items-center justify-center gap-4">
            <AnimatedArrow size={20} duration={300} />
            <p className="text-sm text-black/60">Default (300ms)</p>
          </div>

          {/* Slow */}
          <div className="border border-black/8 rounded-[5px] p-8 flex flex-col items-center justify-center gap-4">
            <AnimatedArrow size={20} duration={500} />
            <p className="text-sm text-black/60">Slow (500ms)</p>
          </div>
        </div>
      </section>

      {/* Code Example */}
      <section className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-normal mb-6">Code Examples</h2>
        <div className="space-y-4">
          <div className="bg-black/5 rounded-[5px] p-4 font-mono text-sm">
            <p className="text-black/60 mb-2">// Basic usage</p>
            <p className="text-blue-600">&lt;AnimatedArrow /&gt;</p>
          </div>

          <div className="bg-black/5 rounded-[5px] p-4 font-mono text-sm">
            <p className="text-black/60 mb-2">// Custom size and color</p>
            <p className="text-blue-600">&lt;AnimatedArrow size={'{24}'} color=&quot;#b01f24&quot; /&gt;</p>
          </div>

          <div className="bg-black/5 rounded-[5px] p-4 font-mono text-sm">
            <p className="text-black/60 mb-2">// In a button</p>
            <p className="text-purple-600">&lt;button className=&quot;flex items-center gap-2&quot;&gt;</p>
            <p className="ml-4">Learn More</p>
            <p className="ml-4 text-blue-600">&lt;AnimatedArrow size={'{18}'} /&gt;</p>
            <p className="text-purple-600">&lt;/button&gt;</p>
          </div>

          <div className="bg-black/5 rounded-[5px] p-4 font-mono text-sm">
            <p className="text-black/60 mb-2">// Custom animation speed</p>
            <p className="text-blue-600">&lt;AnimatedArrow size={'{20}'} duration={'{500}'} /&gt;</p>
          </div>
        </div>
      </section>
    </div>
  );
}