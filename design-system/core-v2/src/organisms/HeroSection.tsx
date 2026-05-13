import { ChevronDown } from 'lucide-react';

/**
 * HeroSection — case-study hero w/ cinematic-dark editorial intro.
 *
 * WHY: Case-study pages need editorial hero w/ context cards · pulled-up vs blocky CTA hero.
 * WHAT: Full-bleed dark section · "CASE STUDY" eyebrow · large serif h1 · 4-card grid (Client · Industry · Region · Date) · scroll-down chevron.
 * WHEN: Top of any `/case-studies/<slug>` page · always cinematic-dark variant.
 * WHEN NOT: Report PDP (use ReportPDPHero) · Report Store home (use ReportStoreHero) · product pages (use ProductHero).
 * HOW: Static layout · scroll-to-next-section chevron · NO data props (consumer wraps for content variation).
 *
 * @promotedFrom Design_system_vs_26 OG (DS Port Phase 2, 2026-05-13)
 */
export function HeroSection() {
  const scrollToClientContext = () => {
    const element = document.getElementById('client-context');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 sm:py-14 md:py-16 flex items-center justify-center relative overflow-hidden" style={{ background: 'var(--bg-pure-black)' }}>
      {/* Minimal grid overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
      
      <div className="max-w-[var(--container-content)] mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12 relative z-10">
        {/* Case Study Label */}
        <div className="mb-6 md:mb-8">
          <span className="font-medium text-white/40 uppercase tracking-[3px]" style={{ fontSize: 'var(--text-nav)' }}>Case Study</span>
        </div>
        
        {/* Hero Title - Large & Editorial */}
        <h1 className="leading-[1.15] font-light text-white tracking-tight mb-10 sm:mb-12 md:mb-14" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.75rem, 5vw, var(--text-3xl))' }}>
          Evaluating India's Transformer Bushing Market for IPO Readiness — ₹110 Cr TAM and Competitive Positioning Insights
        </h1>

        {/* Info Cards - Card-based Design - Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12 sm:mb-14 md:mb-16">
          {/* Client Card */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-5 md:p-6 hover:bg-white/10 transition-all duration-300" style={{ borderRadius: 'var(--radius-element)' }}>
            <div className="uppercase tracking-[2px] text-white/40 font-medium mb-3 md:mb-4" style={{ fontSize: 'var(--text-xs)' }}>Client</div>
            <div className="font-normal text-white/70 leading-[1.5]" style={{ fontSize: 'var(--text-sm)' }}>Yash Highvoltage Insulators</div>
          </div>

          {/* Industry Card */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-5 md:p-6 hover:bg-white/10 transition-all duration-300" style={{ borderRadius: 'var(--radius-element)' }}>
            <div className="uppercase tracking-[2px] text-white/40 font-medium mb-3 md:mb-4" style={{ fontSize: 'var(--text-xs)' }}>Industry</div>
            <div className="font-normal text-white/70 leading-[1.5]" style={{ fontSize: 'var(--text-sm)' }}>Power Transmission • Electrical Equipment • Grid Infrastructure</div>
          </div>

          {/* Geography Card */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-5 md:p-6 hover:bg-white/10 transition-all duration-300" style={{ borderRadius: 'var(--radius-element)' }}>
            <div className="uppercase tracking-[2px] text-white/40 font-medium mb-3 md:mb-4" style={{ fontSize: 'var(--text-xs)' }}>Geography</div>
            <div className="font-normal text-white/70 leading-[1.5]" style={{ fontSize: 'var(--text-sm)' }}>India</div>
          </div>

          {/* Engagement Owner Card */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-5 md:p-6 hover:bg-white/10 transition-all duration-300" style={{ borderRadius: 'var(--radius-element)' }}>
            <div className="uppercase tracking-[2px] text-white/40 font-medium mb-3 md:mb-4" style={{ fontSize: 'var(--text-xs)' }}>Engagement Owner</div>
            <div className="font-normal text-white/70 leading-[1.5]" style={{ fontSize: 'var(--text-sm)' }}>Director – Strategy</div>
          </div>
        </div>

        {/* CTA - Now inside Hero at bottom */}
        <div className="flex justify-center">
          <button
            onClick={scrollToClientContext}
            className="group flex flex-col items-center gap-2 transition-all duration-300 focus:outline-none focus:ring-2 text-white/60 hover:text-white focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
            aria-label="Navigate to Explore the Case Study"
          >
            <span 
              className="font-medium uppercase tracking-[2px] group-hover:tracking-[2.5px] transition-all"
              style={{ fontSize: 'var(--text-xs)' }}
            >
              Explore the Case Study
            </span>
            <ChevronDown 
              className="w-5 h-5 group-hover:translate-y-1 transition-transform animate-bounce" 
              strokeWidth={1.5}
            />
          </button>
        </div>
      </div>
    </section>
  );
}